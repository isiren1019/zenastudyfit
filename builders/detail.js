// ================================================================
// builders/detail.js — 지역×학년×과목 상세 페이지 빌더
// 변경 빈도: 중간 (가장 많이 호출되는 페이지 — 메인 SEO 타깃)
// 의존:
//   - config.js (SITE_NAME, SITE_DOMAIN, FORM_URL, KAKAO_URL, PHONE)
//   - layout.js (HEADER_CSS, HEADER_HTML, FOOTER_HTML, FLOAT_CSS, FLOAT_HTML)
//   - utils.js (getDisplaySubject, regionVars, seededRandom, getPageDates, buildBreadcrumbJsonLd, buildSocialMeta, buildShareButtons)
//   - content-pools.js (makeIntro, makeBody, makeConclusion, makeFeatures, FIXED_FAQ)
//   - builders/_helpers.js (buildGradeRoadmapCards)
//
// 함수:
//   - buildDetailPage(city, gu, dong, grade, subject, slug)
//     → 약 54,414개 페이지의 핵심 빌더 (3,024 지역 × 3 학년 × 6 과목)
//     → 시드 기반 결정적 콘텐츠 생성 (같은 슬러그는 항상 같은 HTML)
//
// 라우팅:
//   /{시도}-{시군구}-{동}-{학년}-{과목}-과외/
//   예: /서울특별시-강남구-대치동-고등-수학-과외/
// ================================================================

import { SITE_NAME, SITE_DOMAIN, FORM_URL, KAKAO_URL, PHONE } from '../config.js';
import { HEADER_CSS, HEADER_HTML, FOOTER_HTML, FLOAT_CSS, FLOAT_HTML } from '../layout.js';
import {
  getDisplaySubject, regionVars, seededRandom, getPageDates,
  buildBreadcrumbJsonLd, buildSocialMeta, buildShareButtons, pickJosa
} from '../utils.js';
import { makeIntro, makeBody, makeConclusion, makeFeatures, FIXED_FAQ } from '../content-pools.js';
import { buildGradeRoadmapCards } from './_helpers.js';
import { SCHOOLS_ELEM, SCHOOLS_MIDDLE, SCHOOLS_HIGH } from '../data/schools.js';
import { ACADEMY_CENTERS } from '../data/academy/centers.js';


// ── 지역 고유 정보용 헬퍼 (SEO 차별화) ────────────────────────
// 시·도 정식명(schools.js) → 축약명(centers.js) 매핑
const SIDO_SHORT_MAP = {
  "서울특별시": "서울", "경기도": "경기", "인천광역시": "인천", "부산광역시": "부산",
  "대구광역시": "대구", "대전광역시": "대전", "광주광역시": "광주", "울산광역시": "울산",
  "세종시": "세종", "세종특별자치시": "세종", "강원도": "강원", "강원특별자치도": "강원",
  "충청북도": "충북", "충청남도": "충남", "전라북도": "전북", "전북특별자치도": "전북",
  "전라남도": "전남", "경상북도": "경북", "경상남도": "경남",
  "제주도": "제주", "제주특별자치도": "제주",
};

// 시·군·구 정규화: 라우팅이 넘기는 gu는 "용인시 수지구"처럼 시+구가 붙어 있음.
// 학교·학원 데이터는 "용인시"(시 단위)만 저장하므로 구(區)를 떼어 시 단위로 맞춤.
// - "용인시 수지구" → "용인시"  (공백으로 분리, 첫 토막=시)
// - "강남구"        → "강남구"  (단일 토막이면 그대로)
// - "태백시"        → "태백시"
function normSigungu(gu) {
  const parts = String(gu).trim().split(/\s+/);
  return parts.length > 1 ? parts[0] : gu;
}

// 같은 시·군·구 학교를 현재 학년 우선으로 최대 max개 (시드 결정적)
// guNorm: normSigungu로 정규화된 시·군·구명
function getLocalSchools(city, guNorm, grade, rngPick, max = 6) {
  const LV_BY_GRADE = { "초등": "초등", "중등": "중등", "고등": "고등" };
  const primaryLv = LV_BY_GRADE[grade] || "중등";
  const buckets = {
    "초등": SCHOOLS_ELEM, "중등": SCHOOLS_MIDDLE, "고등": SCHOOLS_HIGH,
  };
  const collect = (lv) => {
    const out = [];
    for (const row of buckets[lv]) {
      if (row[0] === city && row[1] === guNorm) out.push({ name: row[2], level: lv });
    }
    return out;
  };
  // 학년 순서: 현재 학년 → 나머지
  const order = [primaryLv, ...["초등", "중등", "고등"].filter(l => l !== primaryLv)];
  let pool = [];
  for (const lv of order) pool = pool.concat(collect(lv));
  // 시드 셔플 (현재 학년 우선을 유지하려면 학년 그룹 내부만 섞음)
  const grouped = {};
  for (const it of pool) (grouped[it.level] = grouped[it.level] || []).push(it);
  let result = [];
  for (const lv of order) {
    const arr = grouped[lv] || [];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rngPick() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    result = result.concat(arr);
    if (result.length >= max) break;
  }
  return result.slice(0, max);
}

// 같은 시·군·구 학원 지점 (지점명 중복 제거, 브랜드명 노출 X)
// guNorm: normSigungu로 정규화된 시·군·구명
function getLocalCenters(city, guNorm) {
  const short = SIDO_SHORT_MAP[city];
  if (!short) return [];
  const seen = new Set();
  const out = [];
  for (const c of ACADEMY_CENTERS) {
    if (c.sidoName === short && c.sigungu === guNorm) {
      if (!seen.has(c.name)) { seen.add(c.name); out.push(c); }
    }
  }
  return out;
}

const SCHOOL_LV_ICON = { "초등": "🌱", "중등": "📗", "고등": "🎓" };


// ── 지역×학년×과목 상세 페이지 ────────────────────────────────
export function buildDetailPage(city, gu, dong, grade, subject, slug) {
  const dispSubject = getDisplaySubject(subject, grade);
  const canonical = `${SITE_DOMAIN}/${slug}/`;
  // 단일 지역(시·시·시) 또는 시·구·구 패턴에서 중복 제거
  const reg = regionVars(city, gu, dong);
  const titleRegion = (gu === dong) ? `${city} ${gu}` : `${city} ${gu} ${dong}`;

  // seeded rng (title/description 분산에도 사용하므로 먼저 정의)
  const seedVal = slug.split("").reduce((a,c,i) => (a + c.charCodeAt(0) * (i+1)) % 2147483647, 0);
  const rng = seededRandom(seedVal);

  // ── title / description 패턴 분산 (SEO 자기잠식 방지) ──────────
  // 같은 학년·과목이라도 지역(슬러그)마다 다른 title이 나오도록 시드로 분산.
  // 시드 기반이라 같은 페이지는 항상 같은 title (결정적).
  // ⚠️ 본문(makeIntro 등)의 rng 흐름을 건드리지 않도록 별도 rng 사용
  //    (메인 rng를 여기서 소비하면 기존 5만 페이지 본문이 전부 바뀜)
  const rngMeta = seededRandom((seedVal * 131 + 7) % 2147483647);
  const shortRegion = (gu === dong) ? gu : dong;   // 검색결과 잘림 방지용 축약(동 우선)

  const GRADE_PHRASES = {
    "초등": ["기초 완성", "흥미·습관", "1:1 맞춤", "눈높이"],
    "중등": ["내신 대비", "기초 완성", "1:1 맞춤", "성적 향상"],
    "고등": ["내신·수능 대비", "1:1 맞춤", "기초~심화", "실전 대비"],
  };
  const phrasePool = GRADE_PHRASES[grade] || GRADE_PHRASES["중등"];
  const gradePhrase = phrasePool[Math.floor(rngMeta() * phrasePool.length)];

  // {r}=축약지역, {g}=학년, {s}=과목, {p}=학년별 수식어구
  const TITLE_PATTERNS = [
    `{r} {g} {s} 과외 | ${SITE_NAME}`,
    `{r} {g} {s} 과외 - {p} | 제나쌤 스터디핏`,
    `{r} {s} 과외 {g} - {p} | 제나쌤 스터디핏`,
    `{g} {s} 과외 {r} | ${SITE_NAME}`,
    `{r} {g} {s} 1:1 과외 | 제나쌤 스터디핏`,
    `{r} {g} {s} 과외 선생님 | 제나쌤 스터디핏`,
    `{r} {g} {s} 과외 추천 | ${SITE_NAME}`,
    `{r} {s} 1:1 맞춤 과외 {g} | 제나쌤 스터디핏`,
    `{r} {g} {s} {p} 과외 | 제나쌤 스터디핏`,
    `{g} {s} 과외 - {r} {p} | 제나쌤 스터디핏`,
    `{r} {g} {s} 전문 과외 | ${SITE_NAME}`,
    `{r} {s} 과외 {g} 맞춤 | 제나쌤 스터디핏`,
  ];
  const titlePat = TITLE_PATTERNS[Math.floor(rngMeta() * TITLE_PATTERNS.length)];
  const titleTag = titlePat
    .replace(/\{r\}/g, shortRegion)
    .replace(/\{g\}/g, grade)
    .replace(/\{s\}/g, dispSubject)
    .replace(/\{p\}/g, gradePhrase);

  // {full}=전체지역, {g}=학년, {ds}=표시과목, {dsj}=과목+조사, {rs}=짧은지역
  const DESC_PATTERNS = [
    `{full} {g} {ds} 과외 전문. {rs} 인근 베테랑 선생님이 {g} {dsj} 1:1로 지도합니다. 내신·수능 대비, 기초부터 심화까지 맞춤 수업. 무료 상담 가능.`,
    `{full} {g} {ds} 1:1 맞춤 과외. {rs} 지역 {g} 학생을 위한 {ds} 수업으로 기초부터 차근차근. 방문·화상 모두 가능. 무료 시범수업 신청하세요.`,
    `{rs}에서 {g} {ds} 과외를 찾으신다면 ${SITE_NAME}. {g} 눈높이 1:1 {ds} 수업으로 성적 향상을 돕습니다. 내신·서술형 대비. 무료 상담 가능.`,
    `{full} {g} {ds} 과외, 어디서 시작할지 고민이신가요? {rs} 인근 선생님이 {g} {dsj} 1:1 맞춤으로 지도합니다. 학생별 커리큘럼. 방문·화상. 무료 시범수업.`,
    `{full} {g} {ds} 전문 과외. {rs} 학생 맞춤 1:1 수업으로 {ds} 개념부터 실전까지 탄탄하게. 내신·수능 대비. 지금 무료 상담 받아보세요.`,
    `${SITE_NAME}가 {rs}에서 {g} {ds} 과외를 도와드립니다. {g} 수준별 1:1 {ds} 수업, 기초 보충부터 심화까지. 방문·화상 선택 가능. 무료 상담.`,
  ];
  const descPat = DESC_PATTERNS[Math.floor(rngMeta() * DESC_PATTERNS.length)];
  const description = descPat
    .replace(/\{full\}/g, titleRegion)
    .replace(/\{dsj\}/g, dispSubject + pickJosa(dispSubject, "을", "를"))
    .replace(/\{ds\}/g, dispSubject)
    .replace(/\{g\}/g, grade)
    .replace(/\{rs\}/g, reg.region_short);

  // 페이지별 의사 갱신일 (SEO 최신성)
  const dates = getPageDates(slug);

  // JSON-LD BreadcrumbList (검색엔진용 구조화 데이터)
  const breadcrumbItems = [
    { name: "홈", url: `${SITE_DOMAIN}/` },
    { name: "지역별 과외", url: `${SITE_DOMAIN}/regions/` },
    { name: city, url: `${SITE_DOMAIN}/regions/${encodeURIComponent(city)}/` },
  ];
  if (gu !== dong) {
    breadcrumbItems.push({ name: `${gu} ${dong}`, url: canonical });
  } else {
    breadcrumbItems.push({ name: gu, url: canonical });
  }
  breadcrumbItems.push({ name: `${grade} ${dispSubject} 과외`, url: canonical });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(breadcrumbItems);

  const [introTitle, introBody] = makeIntro(rng, city, gu, dong, grade, subject);
  const [bodyTitle, bodyBody] = makeBody(rng, city, gu, dong, grade, subject);
  const [conclusionTitle, conclusionBody] = makeConclusion(rng, city, gu, dong, grade, subject);
  const features = makeFeatures(rng, subject, grade);

  const ALL_SUBJECTS = ["국어","영어","수학","과학","사회","한국사"];
  const SUBJECT_ICONS = {"국어":"📖","영어":"🌍","수학":"📐","과학":"🔬","사회":"🗺️","한국사":"📜"};
  const SUBJECT_DESC = {"국어":"독해 · 논술","영어":"문법 · 독해","수학":"개념 · 문제풀이","과학":"개념 · 원리","사회":"흐름 · 암기","한국사":"흐름 · 사건 · 암기"};
  const SUBJECT_LIST_DESC = {"국어":"독해력 · 문학 · 비문학 · 서술형 대비","영어":"문법 · 독해 · 어휘 · 내신 대비","수학":"개념 이해 · 유형 · 실전 문제풀이","과학":"개념 · 원리 이해 · 실험 정리 · 서술형","사회":"흐름 · 맥락 · 암기 전략","한국사":"시대별 흐름 · 주요 사건 · 암기 전략"};

  const relatedSubjects = ALL_SUBJECTS.filter(s => s !== subject);
  let pool = [...relatedSubjects];
  if (subject === "사회" && pool.includes("한국사")) pool = pool.filter(s => s !== "한국사");
  else if (subject === "한국사" && pool.includes("사회")) pool = pool.filter(s => s !== "사회");
  else if (pool.includes("사회") && pool.includes("한국사")) {
    pool = pool.filter(s => s !== (rng() > 0.5 ? "사회" : "한국사"));
  }
  for (let i = pool.length-1; i>0; i--) {
    const j = Math.floor(rng()*(i+1));
    [pool[i],pool[j]] = [pool[j],pool[i]];
  }


  let listHtml = "";
  for (const s of relatedSubjects) {
    const disp = getDisplaySubject(s, grade);
    const icon = SUBJECT_ICONS[s]||"📚";
    const listDesc = SUBJECT_LIST_DESC[s]||"";
    const href = `/${city}-${gu}-${dong}-${grade}-${s}-과외/`.replace(/ /g,"-");
    listHtml += `<a href="${href}" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #f0e6fc;text-decoration:none;background:white;transition:background .12s" onmouseover="this.style.background='#faf5ff'" onmouseout="this.style.background='white'"><div style="display:flex;align-items:center;gap:10px"><div style="width:30px;height:30px;border-radius:50%;background:#f0e6fc;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">${icon}</div><div><div style="font-size:.85rem;font-weight:700;color:#370558">${grade} ${disp} 과외</div><div style="font-size:.72rem;color:#9b6cc0;margin-top:2px">${listDesc}</div></div></div><div style="font-size:.85rem;color:#c9a3e8;flex-shrink:0">→</div></a>`;
  }
  listHtml += `<a href="/self-study/" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #f0e6fc;text-decoration:none;background:white;transition:background .12s" onmouseover="this.style.background='#faf5ff'" onmouseout="this.style.background='white'"><div style="display:flex;align-items:center;gap:10px"><div style="width:30px;height:30px;border-radius:50%;background:#f0e6fc;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">📋</div><div><div style="font-size:.85rem;font-weight:700;color:#370558">공부 습관 완성 과외</div><div style="font-size:.72rem;color:#9b6cc0;margin-top:2px">과목별 공부법 · 플랜 관리 · 자기주도학습</div></div></div><div style="font-size:.85rem;color:#c9a3e8;flex-shrink:0">→</div></a>`;
  listHtml += `<a href="/coding/" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;text-decoration:none;background:white;transition:background .12s" onmouseover="this.style.background='#faf5ff'" onmouseout="this.style.background='white'"><div style="display:flex;align-items:center;gap:10px"><div style="width:30px;height:30px;border-radius:50%;background:#f0e6fc;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">💻</div><div><div style="font-size:.85rem;font-weight:700;color:#370558">AI 시대 코딩 과외</div><div style="font-size:.72rem;color:#9b6cc0;margin-top:2px">자바스크립트 · 파이썬을 통한 컴퓨팅 사고력</div></div></div><div style="font-size:.85rem;color:#c9a3e8;flex-shrink:0">→</div></a>`;

  // ── 학년 스위처: 같은 지역·같은 과목의 다른 학년 링크 ─────────────
  // SEO 핵심 — 지역축 초등·고등 페이지의 고아(orphan) 상태를 해소.
  // 기존엔 같은 학년의 다른 과목만 링크 → 초등/고등 페이지로 진입 경로가 없었음.
  // 이제 3개 학년이 서로를 링크하여 어느 학년으로 진입해도 전 학년 도달 가능.
  const GRADE_SWITCH = ["초등", "중등", "고등"];
  const GRADE_SW_ICON = { "초등": "🌱", "중등": "📗", "고등": "🎓" };
  const shortRegionSw = (gu === dong) ? gu : dong;
  let gradeSwitchHtml = "";
  for (const g of GRADE_SWITCH) {
    if (g === grade) continue;   // 현재 학년 제외
    const dispG = getDisplaySubject(subject, g);
    const gHref = `/${city}-${gu}-${dong}-${g}-${subject}-과외/`.replace(/ /g, "-");
    const gIcon = GRADE_SW_ICON[g] || "📚";
    gradeSwitchHtml += `<a href="${gHref}" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #f0e6fc;text-decoration:none;background:white;transition:background .12s" onmouseover="this.style.background='#faf5ff'" onmouseout="this.style.background='white'"><div style="display:flex;align-items:center;gap:10px"><div style="width:30px;height:30px;border-radius:50%;background:#f0e6fc;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">${gIcon}</div><div><div style="font-size:.85rem;font-weight:700;color:#370558">${shortRegionSw} ${g} ${dispG} 과외</div><div style="font-size:.72rem;color:#9b6cc0;margin-top:2px">${g} 눈높이 맞춤 1:1 ${dispG} 수업</div></div></div><div style="font-size:.85rem;color:#c9a3e8;flex-shrink:0">→</div></a>`;
  }


  // ── 지역 고유 정보: 인근 학교 + 학원 지점 (SEO 콘텐츠 차별화) ─────
  // 같은 시·군·구 학교(현재 학년 우선 6개)와 학원 지점(있을 때만).
  // 별도 rng(rngLocal)로 뽑아 기존 본문 rng 흐름을 건드리지 않음.
  const rngLocal = seededRandom((seedVal * 251 + 13) % 2147483647);
  const guNorm = normSigungu(gu);            // "용인시 수지구" → "용인시" (데이터 매칭용)
  const localSchools = getLocalSchools(city, guNorm, grade, rngLocal, 6);
  const localCenters = getLocalCenters(city, guNorm);
  const guLabel = guNorm;                     // 섹션 제목엔 시 단위명 사용 (예: 용인시)

  // 학교 섹션 HTML (학교가 있을 때만)
  let localSchoolsHtml = "";
  if (localSchools.length > 0) {
    let rows = "";
    const LV_PREFIX = { "초등": "초", "중등": "중", "고등": "고" };
    for (const sc of localSchools) {
      const icon = SCHOOL_LV_ICON[sc.level] || "🏫";
      const lvPre = LV_PREFIX[sc.level] || "중";
      const href = `/school/${lvPre}-${city}-${guNorm}-${sc.name}-${subject}-과외/`.replace(/ /g, "-");
      rows += `<a href="${href}" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #f0e6fc;text-decoration:none;background:white;transition:background .12s" onmouseover="this.style.background='#faf5ff'" onmouseout="this.style.background='white'"><div style="display:flex;align-items:center;gap:10px"><div style="width:30px;height:30px;border-radius:50%;background:#f0e6fc;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">${icon}</div><div><div style="font-size:.85rem;font-weight:700;color:#370558">${sc.name} ${dispSubject} 과외</div><div style="font-size:.72rem;color:#9b6cc0;margin-top:2px">${sc.name} 내신·${grade} ${dispSubject} 맞춤 1:1</div></div></div><div style="font-size:.85rem;color:#c9a3e8;flex-shrink:0">→</div></a>`;
    }
    const schoolsHubHref = `/schools/${city}/`.replace(/ /g, "-");
    localSchoolsHtml = `
  <!-- 인근 학교별 과외 (시·군·구 매칭, SEO 차별화) -->
  <div style="background:white;border:1px solid #e8d6f5;border-radius:14px;overflow:hidden;margin-top:10px;margin-bottom:10px">
    <div style="padding:13px 16px;border-bottom:1px solid #f0e6fc;background:#faf5ff;display:flex;align-items:center;justify-content:space-between">
      <span style="font-size:.88rem;font-weight:700;color:#370558">${guLabel} 학교별 ${dispSubject} 과외</span>
      <span style="font-size:.72rem;color:#9b6cc0">우리 학교 내신 →</span>
    </div>
    ${rows}
    <a href="${schoolsHubHref}" style="display:block;padding:11px 16px;text-align:center;font-size:.78rem;font-weight:700;color:#7b2fa8;text-decoration:none;background:#faf5ff">${city} 전체 학교 보기 →</a>
  </div>`;
  }

  // 학원 지점 섹션 HTML (지점이 있을 때만, 브랜드명 노출 X)
  let localCentersHtml = "";
  if (localCenters.length > 0) {
    let rows = "";
    for (const c of localCenters) {
      const href = `/academy/center/${c.slug}/`;
      rows += `<a href="${href}" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #f0e6fc;text-decoration:none;background:white;transition:background .12s" onmouseover="this.style.background='#f5fbf7'" onmouseout="this.style.background='white'"><div style="display:flex;align-items:center;gap:10px"><div style="width:30px;height:30px;border-radius:50%;background:#e5f3ea;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">🏫</div><div><div style="font-size:.85rem;font-weight:700;color:#1e4d3a">${c.name} 학습코칭</div><div style="font-size:.72rem;color:#5a8f72;margin-top:2px">${c.sigungu} 소재 · 방문 학습코칭 상담 가능</div></div></div><div style="font-size:.85rem;color:#8fc0a3;flex-shrink:0">→</div></a>`;
    }
    localCentersHtml = `
  <!-- 인근 학습코칭 지점 (시·군·구 매칭, 있을 때만) -->
  <div style="background:white;border:1px solid #cfe6d8;border-radius:14px;overflow:hidden;margin-top:10px;margin-bottom:10px">
    <div style="padding:13px 16px;border-bottom:1px solid #e0efe6;background:#f5fbf7;display:flex;align-items:center;justify-content:space-between">
      <span style="font-size:.88rem;font-weight:700;color:#1e4d3a">${guLabel} 인근 학습코칭 지점</span>
      <span style="font-size:.72rem;color:#5a8f72">방문 학습코칭 →</span>
    </div>
    ${rows}
  </div>`;
  }

  let featuresHtml = "";
  for (const [icon, title, desc] of features) {
    featuresHtml += `<div class="feature-item"><div class="feature-icon">${icon}</div><div><div class="feature-title">${title}</div><div class="feature-desc">${desc}</div></div></div>`;
  }

  let faqHtml = "";
  for (const [q, a] of FIXED_FAQ) {
    faqHtml += `<div class="faq-item"><div class="faq-q">Q. ${q}</div><div class="faq-a">${a}</div></div>`;
  }

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titleTag}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  ${buildSocialMeta({ title: titleTag, description, canonical, ogType: "article", imageAlt: `${titleRegion} ${grade} ${dispSubject} 과외` })}
  <meta property="article:published_time" content="${dates.publishedISO}">
  <meta property="article:modified_time" content="${dates.modifiedISO}">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${titleTag.replace(/"/g, '\\"')}",
    "datePublished": "${dates.publishedISO}",
    "dateModified": "${dates.modifiedISO}",
    "author": {"@type": "Person", "name": "이수진"},
    "publisher": {"@type": "Organization", "name": "${SITE_NAME}", "url": "${SITE_DOMAIN}"},
    "mainEntityOfPage": {"@type": "WebPage", "@id": "${canonical}"}
  }
  </script>
  ${breadcrumbJsonLd}
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;800&display=swap" rel="stylesheet">
  <style>
    ${HEADER_CSS}
    ${FLOAT_CSS}
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Noto Sans KR',sans-serif;background:#fff;color:#1a0a24;line-height:1.7}
    .wrap{max-width:680px;margin:0 auto;padding:0 16px 32px}
    .hero{background:linear-gradient(135deg,#370558,#510580,#7b2fa8);color:white;padding:36px 20px;text-align:center}
    .hero-badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);border-radius:20px;font-size:.72rem;font-weight:700;padding:4px 14px;margin-bottom:12px}
    .hero h1{font-size:clamp(1.4rem,4vw,2rem);font-weight:800;line-height:1.4;margin-bottom:8px;color:white}
    .hero-sub{font-size:.85rem;opacity:.85;margin-bottom:20px}
    .hero-btns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
    .btn-white{background:white;color:#510580;padding:11px 20px;border-radius:50px;font-weight:700;font-size:.88rem;text-decoration:none}
    .btn-kakao{background:#FEE500;color:#3A1D1D;padding:11px 20px;border-radius:50px;font-weight:700;font-size:.88rem;text-decoration:none}
    .sec{background:white;border-radius:0;padding:24px 0;margin-top:0;border:none;border-bottom:1px solid #f0e6fc}
    .sec:last-of-type{border-bottom:none}
    .sec-label{font-size:.7rem;font-weight:700;color:#7b2fa8;background:#f0e6fc;display:inline-block;padding:3px 10px;border-radius:20px;margin-bottom:8px}
    .sec-title{font-size:1rem;font-weight:800;color:#370558;margin-bottom:10px;line-height:1.5}
    .sec-body{font-size:.85rem;color:#444;line-height:1.85}
    .feature-item{display:flex;gap:12px;align-items:flex-start;padding:10px 0;border-bottom:1px solid #f5eefe}
    .feature-item:last-child{border-bottom:none}
    .feature-icon{width:36px;height:36px;min-width:36px;background:#f0e6fc;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:1.1rem}
    .feature-title{font-size:.88rem;font-weight:700;color:#370558;margin-bottom:3px}
    .feature-desc{font-size:.78rem;color:#666;line-height:1.6}
    .faq-item{padding:14px 0;border-bottom:1px solid #f5eefe}
    .faq-item:last-child{border-bottom:none}
    .faq-q{font-size:.88rem;font-weight:700;color:#370558;margin-bottom:6px}
    .faq-a{font-size:.82rem;color:#555;line-height:1.75}
    .cta-sec{background:linear-gradient(135deg,#370558,#510580);border-radius:16px;padding:24px 20px;margin-top:24px;text-align:center}
    .cta-sec h2{font-size:1.1rem;font-weight:800;color:white;margin-bottom:6px}
    .cta-sec p{font-size:.82rem;color:rgba(255,255,255,.75);margin-bottom:16px}
    .cta-btns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
    .cta-phone{background:white;color:#510580;font-size:.88rem;font-weight:700;padding:10px 18px;border-radius:50px;text-decoration:none}
    .cta-kakao{background:#FEE500;color:#3A1D1D;font-size:.88rem;font-weight:700;padding:10px 18px;border-radius:50px;text-decoration:none}
    .cta-form{background:linear-gradient(135deg,#e8439a,#ff6fc1);color:white;font-size:.88rem;font-weight:700;padding:10px 18px;border-radius:50px;text-decoration:none}
    footer{background:#370558;color:rgba(255,255,255,.45);text-align:center;padding:20px;font-size:.75rem;line-height:1.8;margin-top:0}
    footer p{color:rgba(255,255,255,.45);margin:2px 0}
    footer a{color:rgba(255,255,255,.6);text-decoration:none}
    footer a{color:rgba(255,255,255,.6);text-decoration:none}
    @media(max-width:600px){.hero-btns,.cta-btns{flex-direction:column;align-items:center}}
  </style>
</head>
<body>
${HEADER_HTML}
<div class="hero">
  <div class="hero-badge">${gu === dong ? gu : `${gu} · ${dong}`} 전문</div>
  <h1>${gu === dong ? gu : `${gu} ${dong}`}<br>${grade} ${dispSubject} 과외</h1>
  <p class="hero-sub">방문/화상 수업 · 내신/수능 맞춤 · 무료 시범수업 가능</p>
  <div class="hero-btns">
    <a href="${FORM_URL}" target="_blank" class="btn-white">📝 체험신청</a>
    <a href="${KAKAO_URL}" target="_blank" class="btn-kakao">💬 카카오톡</a>
  </div>
</div>

<div class="wrap">
  <nav style="padding:10px 0;font-size:.75rem;color:#9b6cc0">
    <a href="/" style="color:#9b6cc0;text-decoration:none">홈</a> &gt;
    <a href="/regions/" style="color:#9b6cc0;text-decoration:none">${city}</a> &gt;
    ${grade} ${dispSubject} 과외
  </nav>

  <div style="display:flex;align-items:center;gap:8px;padding:6px 0;font-size:.7rem;color:#999;border-bottom:1px solid #f5eefe">
    <span>📅 최종 업데이트: ${dates.modifiedKR}</span>
    <span style="color:#ddd">|</span>
    <span>최초 게시: ${dates.publishedKR}</span>
  </div>

  <!-- 서론 -->
  <div class="sec">
    <div class="sec-label">과외 소개</div>
    <div class="sec-title">${introTitle}</div>
    <div class="sec-body">${introBody}</div>
  </div>

  <!-- 수업 특징 -->
  <div class="sec">
    <div class="sec-label">수업 특징</div>
    <div class="sec-title">제나쌤스터디핏 과외가 다른 이유</div>
    ${featuresHtml}
  </div>

  <!-- 본론 -->
  <div class="sec">
    <div class="sec-label">수업 안내</div>
    <div class="sec-title">${bodyTitle}</div>
    <div class="sec-body">${bodyBody}</div>
  </div>

  ${buildGradeRoadmapCards(grade, subject)}

  <!-- 이미지 그리드 -->
  <div style="margin-top:24px;display:flex;flex-direction:column;gap:12px">
    <img src="/images/study-01-desk.jpg" alt="${dong} ${grade} ${subject} 과외 수업 사진" loading="lazy" style="width:100%;height:auto;border-radius:10px;border:1px solid #e8d6f5;display:block">
    <img src="/images/study-02-book.jpg" alt="${dong} ${grade} ${subject} 과외 수업 사진" loading="lazy" style="width:100%;height:auto;border-radius:10px;border:1px solid #e8d6f5;display:block">
    <img src="/images/study-03-writing.jpg" alt="${dong} ${grade} ${subject} 과외 수업 사진" loading="lazy" style="width:100%;height:auto;border-radius:10px;border:1px solid #e8d6f5;display:block">
    <img src="/images/study-04-tutoring.jpg" alt="${dong} ${grade} ${subject} 과외 수업 사진" loading="lazy" style="width:100%;height:auto;border-radius:10px;border:1px solid #e8d6f5;display:block">
    <img src="/images/study-05-whiteboard.jpg" alt="${dong} ${grade} ${subject} 과외 수업 사진" loading="lazy" style="width:100%;height:auto;border-radius:10px;border:1px solid #e8d6f5;display:block">
    <img src="/images/study-06-math.jpg" alt="${dong} ${grade} ${subject} 과외 수업 사진" loading="lazy" style="width:100%;height:auto;border-radius:10px;border:1px solid #e8d6f5;display:block">
    <img src="/images/study-07-english.jpg" alt="${dong} ${grade} ${subject} 과외 수업 사진" loading="lazy" style="width:100%;height:auto;border-radius:10px;border:1px solid #e8d6f5;display:block">
    <img src="/images/study-08-korean.jpg" alt="${dong} ${grade} ${subject} 과외 수업 사진" loading="lazy" style="width:100%;height:auto;border-radius:10px;border:1px solid #e8d6f5;display:block">
    <img src="/images/study-09-science.jpg" alt="${dong} ${grade} ${subject} 과외 수업 사진" loading="lazy" style="width:100%;height:auto;border-radius:10px;border:1px solid #e8d6f5;display:block">
    <img src="/images/study-10-social.jpg" alt="${dong} ${grade} ${subject} 과외 수업 사진" loading="lazy" style="width:100%;height:auto;border-radius:10px;border:1px solid #e8d6f5;display:block">
    <img src="/images/study-11-result.jpg" alt="${dong} ${grade} ${subject} 과외 수업 사진" loading="lazy" style="width:100%;height:auto;border-radius:10px;border:1px solid #e8d6f5;display:block">
    <img src="/images/study-12-feedback.jpg" alt="${dong} ${grade} ${subject} 과외 수업 사진" loading="lazy" style="width:100%;height:auto;border-radius:10px;border:1px solid #e8d6f5;display:block">
    <img src="/images/study-13-smile.jpg" alt="${dong} ${grade} ${subject} 과외 수업 사진" loading="lazy" style="width:100%;height:auto;border-radius:10px;border:1px solid #e8d6f5;display:block">
  </div>

  <!-- 결론 -->
  <div class="sec">
    <div class="sec-label">마무리</div>
    <div class="sec-title">${conclusionTitle}</div>
    <div class="sec-body">${conclusionBody}</div>
  </div>

  <!-- FAQ -->
  <div style="background:#faf5ff;border-radius:14px;padding:20px;margin-top:24px;border:1px solid #e8d6f5">
    <div class="sec-label">자주 묻는 질문</div>
    <div class="sec-title">과외 신청 전 궁금한 점</div>
    ${faqHtml}
  </div>

  <!-- CTA -->
  <div class="cta-sec">
    <h2>지금 바로 무료 상담받으세요</h2>
    <p>${gu === dong ? gu : `${gu} ${dong}`} ${grade} ${dispSubject} 과외 — 빠른 상담, 맞춤 배정</p>
    <div class="cta-btns">
      <a href="tel:${PHONE}" class="cta-phone">📞 전화</a>
      <a href="${KAKAO_URL}" target="_blank" class="cta-kakao">💬 카카오톡</a>
      <a href="${FORM_URL}" target="_blank" class="cta-form">📝 체험신청</a>
    </div>
  </div>

  ${buildShareButtons(titleTag, canonical)}

  <!-- 학년 스위처: 같은 지역 다른 학년 (고아 페이지 해소 + 내부링크 강화) -->
  <div style="background:white;border:1px solid #e8d6f5;border-radius:14px;overflow:hidden;margin-top:10px;margin-bottom:10px">
    <div style="padding:13px 16px;border-bottom:1px solid #f0e6fc;background:#faf5ff;display:flex;align-items:center;justify-content:space-between">
      <span style="font-size:.88rem;font-weight:700;color:#370558">${shortRegionSw} 다른 학년 ${dispSubject} 과외</span>
      <span style="font-size:.72rem;color:#9b6cc0">학년별 맞춤 →</span>
    </div>
    ${gradeSwitchHtml}
  </div>
${localSchoolsHtml}
${localCentersHtml}

  <!-- 리스트형 관련 과목 -->
  <div style="background:white;border:1px solid #e8d6f5;border-radius:14px;overflow:hidden;margin-top:10px;margin-bottom:48px">
    <div style="padding:13px 16px;border-bottom:1px solid #f0e6fc;background:#faf5ff;display:flex;align-items:center;justify-content:space-between">
      <span style="font-size:.88rem;font-weight:700;color:#370558">${dong} ${grade} 다른 과목 과외</span>
      <span style="font-size:.72rem;color:#9b6cc0">클릭해서 바로 확인 →</span>
    </div>
    ${listHtml}
  </div>
</div>

${FOOTER_HTML}
${FLOAT_HTML}
</body>
</html>`;
}
