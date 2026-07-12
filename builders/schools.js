// ================================================================
// builders/schools.js — 학교 관련 페이지 빌더 (4개)
// 변경 빈도: 중간 (학교 페이지 디자인 변경, SEO 차별화 작업 시)
// 의존:
//   - config.js (SITE_NAME, SITE_DOMAIN, FORM_URL, KAKAO_URL, PHONE)
//   - layout.js (HEADER_CSS, HEADER_HTML, FOOTER_HTML, FLOAT_CSS, FLOAT_HTML)
//   - utils.js (seededRandom, getPageDates, buildBreadcrumbJsonLd, buildSocialMeta, buildShareButtons)
//   - content-pools.js (makeFeatures)
//   - data/schools.js (SCHOOLS_ELEM, SCHOOLS_MIDDLE, SCHOOLS_HIGH)
//   - builders/_helpers.js (buildGradeRoadmapCards)
//
// 함수 (4개):
//   - buildSchoolsPage()                                  — 학교 메인 (시도 카드 그리드)
//   - buildSchoolsSidoPage(sido)                          — 시도별 학교 목록 (시군구 토글)
//   - buildSchoolPage(sido, sigungu, schoolName, level)   — 학교 상세 (과목 카드)
//   - buildSchoolSubjectPage(sido, sigungu, schoolName, subject, level) — 학교×과목 상세
//
// 라우팅:
//   /schools/                                                전체
//   /schools/{시도}/                                         시도별
//   /school/{초중고}-{시도}-{시군구}-{학교명}/               학교별
//   /school/{초중고}-{시도}-{시군구}-{학교명}-{과목}-과외/  학교×과목별
//
// ⚠️ 메모리에 기록된 SEO 차별화 프로젝트 진행 시 이 파일 수정 영역:
//   - 자체 운영 학원 200개 지점 좌표 기반 거리 계산
//   - 과목별·학년별 수업 가능 여부 매칭 표시 (브랜드명 X, 지점명만)
// ================================================================

import { SITE_NAME, SITE_DOMAIN, FORM_URL, KAKAO_URL, PHONE } from '../config.js';
import { HEADER_CSS, HEADER_HTML, FOOTER_HTML, FLOAT_CSS, FLOAT_HTML } from '../layout.js';
import { seededRandom, getPageDates, buildBreadcrumbJsonLd, buildSocialMeta, buildShareButtons } from '../utils.js';
import { makeFeatures, FIXED_FAQ } from '../content-pools.js';
import { SCHOOLS_ELEM, SCHOOLS_MIDDLE, SCHOOLS_HIGH } from '../data/schools.js';
import { AREAS } from '../data/areas.js';
import { buildGradeRoadmapCards } from './_helpers.js';


// ── 학교 → 지역 페이지 매칭 (SEO: 학교 신뢰도를 지역 페이지로 전달) ─────
// 학교 데이터는 시·군·구가 "용인시"(시 단위)까지만 있음.
// areas의 gu는 "용인시 수지구"(시+구)이므로, sigungu로 시작하는 지역을 모두 후보로.
// - "용인시" → "용인시", "용인시 기흥구", "용인시 수지구", "용인시 처인구" 소속 동 전부
// - "강남구" → "강남구" 소속 동 전부
// 시드 셔플로 대표 max개 추출 (결정적).
// ⚠️ 학교 데이터에 동(洞) 정보가 없어 시 단위 매칭이 한계. 동 정보 추가 시 정밀화 가능.
function getSchoolAreas(sido, sigungu, rngPick, max = 10) {
  const pool = AREAS.filter(([s, gu]) =>
    s === sido && (gu === sigungu || gu.startsWith(sigungu + " "))
  );
  const arr = [...pool];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rngPick() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return { picked: arr.slice(0, max), total: pool.length };
}

// 학교 레벨 → 지역 페이지에 걸 대표 학년
const SCHOOL_LEVEL_GRADE = { "초등": "초등", "중등": "중등", "고등": "고등" };


// ── 학교 메인 페이지 (시도 카드) ──────────────────────────────
export function buildSchoolsPage() {
  const CITY_ORDER_S = ["서울특별시","경기도","인천광역시","부산광역시","대구광역시","대전광역시","광주광역시","울산광역시"];

  // 시도별 학교 수 집계
  const sidoCounts = {};
  for (const [sido] of [...SCHOOLS_ELEM, ...SCHOOLS_MIDDLE, ...SCHOOLS_HIGH]) {
    sidoCounts[sido] = (sidoCounts[sido] || 0) + 1;
  }
  const sortedSidos = Object.keys(sidoCounts).sort((a, b) => {
    const ai = CITY_ORDER_S.indexOf(a), bi = CITY_ORDER_S.indexOf(b);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  let sidoCardsHtml = "";
  for (const sido of sortedSidos) {
    const href = `/schools/${sido}/`.replace(/ /g, "-");
    sidoCardsHtml += `<a href="${href}" class="sido-card">
  <div class="sido-name">${sido}</div>
  <div class="sido-count">${sidoCounts[sido].toLocaleString()}개 학교</div>
</a>`;
  }

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>학교별 과외 찾기 | ${SITE_NAME}</title>
  <meta name="description" content="전국 초·중·고등학교별 1:1 맞춤 과외. 시도를 선택하고 우리 학교 내신 전문 선생님을 찾아보세요.">
  <link rel="canonical" href="${SITE_DOMAIN}/schools/">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;800&display=swap" rel="stylesheet">
  <style>
    ${HEADER_CSS}
    ${FLOAT_CSS}
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Noto Sans KR',sans-serif;background:#fff;color:#1a0a24}
    .hero{background:linear-gradient(140deg,#370558,#510580);color:white;padding:40px 24px;text-align:center}
    .hero h1{font-size:clamp(1.4rem,3vw,2rem);font-weight:800;color:white;margin-bottom:8px}
    .hero p{font-size:.88rem;opacity:.85}
    .main-wrap{max-width:960px;margin:0 auto;padding:24px 16px}
    .sec-title{font-size:1rem;font-weight:800;color:#370558;margin-bottom:16px}
    .sido-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px}
    .sido-card{background:white;border:1px solid #e8d6f5;border-radius:14px;padding:20px 16px;text-align:center;text-decoration:none;transition:all .15s;display:block}
    .sido-card:hover{background:#510580;border-color:#510580}
    .sido-card:hover .sido-name{color:white}
    .sido-card:hover .sido-count{color:rgba(255,255,255,.75)}
    .sido-name{font-size:.95rem;font-weight:800;color:#370558;margin-bottom:6px}
    .sido-count{font-size:.78rem;color:#9b6cc0}
    footer{background:#370558;color:rgba(255,255,255,.45);text-align:center;padding:20px;font-size:.75rem;line-height:1.8;margin-top:20px}
    footer p{color:rgba(255,255,255,.45);margin:2px 0}
    footer a{color:rgba(255,255,255,.6);text-decoration:none}
    footer a{color:rgba(255,255,255,.6);text-decoration:none}
  </style>
</head>
<body>
${HEADER_HTML}
<div class="hero">
  <h1>학교별 과외 찾기</h1>
  <p>지역을 선택하면 초·중·고등학교를 한번에 찾아보세요</p>
</div>
<div class="main-wrap">
  <div class="sec-title">시도 선택</div>
  <div class="sido-grid">${sidoCardsHtml}</div>
</div>
${FOOTER_HTML}
${FLOAT_HTML}
</body>
</html>`;
}

// ── 시도별 학교 목록 페이지 (시군구 토글) ─────────────────────
export function buildSchoolsSidoPage(sido) {
  const CITY_ORDER_S = ["서울특별시","경기도","인천광역시","부산광역시","대구광역시","대전광역시","광주광역시","울산광역시"];

  // 해당 시도의 시군구 → {elem, middle, high} 그룹화
  const map = {};
  const addSchools = (arr, level) => {
    for (const [s, sigungu, name] of arr) {
      if (s !== sido) continue;
      if (!map[sigungu]) map[sigungu] = {elem:[], middle:[], high:[]};
      map[sigungu][level].push(name);
    }
  };
  addSchools(SCHOOLS_ELEM, 'elem');
  addSchools(SCHOOLS_MIDDLE, 'middle');
  addSchools(SCHOOLS_HIGH, 'high');

  const sortedSigus = Object.keys(map).sort((a,b) => a.localeCompare(b));
  const totalCount = [...SCHOOLS_ELEM, ...SCHOOLS_MIDDLE, ...SCHOOLS_HIGH]
    .filter(([s]) => s === sido).length;

  let siguPillsHtml = "";
  let panelsHtml = "";

  for (const sigungu of sortedSigus) {
    const schools = map[sigungu];
    const siguKey = sigungu.replace(/ /g, "_");
    const total = schools.elem.length + schools.middle.length + schools.high.length;
    siguPillsHtml += `<button class="sg-pill" onclick="togglePanel('${siguKey}')" id="spill_${siguKey}">${sigungu} <span class="sg-count">${total}</span></button>`;

    let sectionsHtml = "";
    if (schools.elem.length > 0) {
      let chips = "";
      for (const name of schools.elem.sort((a,b)=>a.localeCompare(b))) {
        const href = `/school/초-${sido}-${sigungu}-${name}/`.replace(/ /g, "-").replace(/[?#&=+%]/g,"");
        chips += `<a href="${href}" class="school-chip"><span>${name}</span><span class="chip-arr">→</span></a>`;
      }
      sectionsHtml += `<div class="level-section"><div class="level-label lbl-e">🏫 초등학교 ${schools.elem.length}개</div><div class="school-grid">${chips}</div></div>`;
    }
    if (schools.middle.length > 0) {
      let chips = "";
      for (const name of schools.middle.sort((a,b)=>a.localeCompare(b))) {
        const href = `/school/중-${sido}-${sigungu}-${name}/`.replace(/ /g, "-").replace(/[?#&=+%]/g,"");
        chips += `<a href="${href}" class="school-chip"><span>${name}</span><span class="chip-arr">→</span></a>`;
      }
      sectionsHtml += `<div class="level-section"><div class="level-label lbl-m">📚 중학교 ${schools.middle.length}개</div><div class="school-grid">${chips}</div></div>`;
    }
    if (schools.high.length > 0) {
      let chips = "";
      for (const name of schools.high.sort((a,b)=>a.localeCompare(b))) {
        const href = `/school/고-${sido}-${sigungu}-${name}/`.replace(/ /g, "-").replace(/[?#&=+%]/g,"");
        chips += `<a href="${href}" class="school-chip"><span>${name}</span><span class="chip-arr">→</span></a>`;
      }
      sectionsHtml += `<div class="level-section"><div class="level-label lbl-h">🎓 고등학교 ${schools.high.length}개</div><div class="school-grid">${chips}</div></div>`;
    }

    panelsHtml += `<div class="school-panel" id="panel_${siguKey}" style="display:none">
  <div class="panel-header">
    <span class="panel-title">${sigungu} 학교 과외</span>
    <span class="panel-close" onclick="closePanel('${siguKey}')">닫기 ✕</span>
  </div>
  ${sectionsHtml}
</div>`;
  }

  const canonical = `${SITE_DOMAIN}/schools/${sido}/`.replace(/ /g, "-");
  const title = `${sido} 학교별 과외 | ${sido} 초·중·고 내신 전문 | ${SITE_NAME}`;
  const description = `${sido} 지역 초등학교·중학교·고등학교 내신 전문 1:1 맞춤 과외. 학교를 선택하면 해당 학교 전문 선생님을 바로 연결해 드립니다.`;

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;800&display=swap" rel="stylesheet">
  <style>
    ${HEADER_CSS}
    ${FLOAT_CSS}
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Noto Sans KR',sans-serif;background:#fff;color:#1a0a24}
    .hero{background:linear-gradient(140deg,#370558,#510580);color:white;padding:36px 24px;text-align:center}
    .hero h1{font-size:clamp(1.3rem,3vw,1.8rem);font-weight:800;color:white;margin-bottom:6px}
    .hero p{font-size:.85rem;opacity:.85}
    .main-wrap{max-width:960px;margin:0 auto;padding:20px 16px}
    .breadcrumb{font-size:.75rem;color:#9b6cc0;padding:10px 0;margin-bottom:4px}
    .breadcrumb a{color:#9b6cc0;text-decoration:none}
    .search-bar{margin-bottom:16px}
    .search-input{border:1px solid #e8d6f5;border-radius:8px;padding:8px 14px;font-size:.85rem;color:#370558;width:100%;max-width:360px}
    .sg-pills{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:4px}
    .sg-pill{background:#f0e6fc;border:1px solid #d4b8f5;border-radius:10px;padding:8px 16px;font-size:.85rem;font-weight:700;color:#510580;cursor:pointer;transition:all .15s;display:flex;align-items:center;gap:6px}
    .sg-pill:hover,.sg-pill.active{background:#510580;color:white;border-color:#510580}
    .sg-count{font-size:.72rem;font-weight:400;opacity:.75}
    .school-panel{margin-top:12px;background:white;border-radius:12px;padding:16px;border:1px solid #e8d6f5}
    .panel-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
    .panel-title{font-size:.9rem;font-weight:800;color:#370558}
    .panel-close{font-size:.75rem;color:#9b6cc0;cursor:pointer;padding:2px 8px;border-radius:6px;background:#f0e6fc}
    .level-section{margin-bottom:14px}
    .level-section:last-child{margin-bottom:0}
    .level-label{display:inline-flex;align-items:center;gap:5px;font-size:.75rem;font-weight:700;padding:4px 12px;border-radius:20px;margin-bottom:8px}
    .lbl-e{background:#e8f5e9;color:#2e7d32}
    .lbl-m{background:#e3f2fd;color:#1565c0}
    .lbl-h{background:#fce4ec;color:#c62828}
    .school-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:6px}
    .school-chip{background:#faf5ff;border:1px solid #e8d6f5;border-radius:8px;padding:7px 12px;font-size:.82rem;color:#370558;text-decoration:none;display:flex;align-items:center;justify-content:space-between;gap:6px;transition:all .15s}
    .school-chip:hover{background:#510580;color:white;border-color:#510580}
    .school-chip:hover .chip-arr{color:white}
    .chip-arr{font-size:.78rem;color:#c9a3e8;flex-shrink:0}
    footer{background:#370558;color:rgba(255,255,255,.45);text-align:center;padding:20px;font-size:.75rem;line-height:1.8;margin-top:20px}
    footer p{color:rgba(255,255,255,.45);margin:2px 0}
    footer a{color:rgba(255,255,255,.6);text-decoration:none}
    footer a{color:rgba(255,255,255,.6);text-decoration:none}
    @media(max-width:480px){.school-grid{grid-template-columns:1fr}}
  </style>
</head>
<body>
${HEADER_HTML}
<div class="hero">
  <h1>${sido} 학교별 과외</h1>
  <p>${sido} 초·중·고등학교 ${totalCount.toLocaleString()}개 · 내신 전문 1:1 맞춤 과외</p>
</div>
<div class="main-wrap">
  <div class="breadcrumb">
    <a href="/">홈</a> &gt; <a href="/schools/">학교별 과외</a> &gt; ${sido}
  </div>
  <div class="search-bar">
    <input class="search-input" id="school-search" placeholder="🔍 학교명 검색...">
  </div>
  <div class="sg-pills" id="sg-pills">${siguPillsHtml}</div>
  <div id="panels-wrap">${panelsHtml}</div>
</div>
${FOOTER_HTML}
${FLOAT_HTML}
<script>
function togglePanel(key) {
  const panel = document.getElementById('panel_' + key);
  const pill = document.getElementById('spill_' + key);
  const isOpen = panel.style.display !== 'none';
  document.querySelectorAll('.school-panel').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.sg-pill').forEach(el => el.classList.remove('active'));
  if (!isOpen) { panel.style.display = 'block'; pill.classList.add('active'); panel.scrollIntoView({behavior:'smooth',block:'nearest'}); }
}
function closePanel(key) {
  document.getElementById('panel_' + key).style.display = 'none';
  document.getElementById('spill_' + key).classList.remove('active');
}
document.getElementById('school-search').addEventListener('input', function() {
  const q = this.value.trim().toLowerCase();
  if (!q) {
    document.querySelectorAll('.sg-pill').forEach(el => el.style.display = '');
    return;
  }
  document.querySelectorAll('.sg-pill').forEach(pill => {
    const key = pill.id.replace('spill_', '');
    const panel = document.getElementById('panel_' + key);
    const matches = panel && panel.textContent.toLowerCase().includes(q);
    pill.style.display = matches ? '' : 'none';
    if (matches && panel.style.display === 'none') {
      panel.style.display = 'block';
      pill.classList.add('active');
    }
  });
});
<\/script>
</body>
</html>`;
}

// ── 학교 상세 페이지 (과목 카드) ──────────────────────────────
export function buildSchoolPage(sido, sigungu, schoolName, level="중등") {
  const SUBJECTS_KO = ["국어","영어","수학","과학","사회","한국사","자기주도학습","코딩"];
  const SUBJECT_ICONS = {"국어":"📖","영어":"🌍","수학":"📐","과학":"🔬","사회":"🗺️","한국사":"📜","자기주도학습":"📋","코딩":"💻"};
  const SUBJECT_DESC = {"국어":"독해·논술·문학","영어":"문법·독해·어휘","수학":"개념·유형·문제풀이","과학":"개념·원리·서술형","사회":"흐름·맥락·암기","한국사":"시대흐름·사건·암기","자기주도학습":"공부법·플랜·습관관리","코딩":"자바스크립트·파이썬"};
  const SUBJECT_LINKS = {
    "자기주도학습": "/self-study/",
    "코딩": "/coding/",
  };

  const levelPrefix = level === "고등" ? "고" : level === "초등" ? "초" : "중";
  const schoolTypeLabel = level === "고등" ? "고등학교" : level === "초등" ? "초등학교" : "중학교";
  const canonical = `${SITE_DOMAIN}/school/${levelPrefix}-${sido}-${sigungu}-${schoolName}/`.replace(/ /g, "-").replace(/[?#&=+%]/g,"").replace(/[?#&=+%]/g,"");
  const title = `${schoolName} 과외 | ${sigungu} ${schoolTypeLabel} 내신 전문 | ${SITE_NAME}`;
  const description = `${schoolName} 학생을 위한 1:1 맞춤 과외. ${sigungu} 내신 전문 선생님이 국어·영어·수학·과학·사회·한국사 과목별로 지도합니다. 무료 상담 가능.`;

  // seeded rng for deterministic content
  const seedVal = schoolName.split("").reduce((a,c,i) => (a + c.charCodeAt(0) * (i+1)) % 2147483647, 0);
  const rng = seededRandom(seedVal);

  // 페이지별 의사 갱신일 (SEO 최신성)
  const slugForDate = `${levelPrefix}-${sido}-${sigungu}-${schoolName}`;
  const dates = getPageDates(slugForDate);

  // JSON-LD BreadcrumbList
  const breadcrumbItems = [
    { name: "홈", url: `${SITE_DOMAIN}/` },
    { name: "학교별 과외", url: `${SITE_DOMAIN}/schools/` },
    { name: sido, url: `${SITE_DOMAIN}/schools/${encodeURIComponent(sido)}/` },
    { name: schoolName, url: canonical },
  ];
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(breadcrumbItems);

  // 과외 소개 본문 (랜덤)
  const introBodies = [
    `${schoolName} 학생이라면 내신 시험 일정에 맞춘 체계적인 준비가 필요합니다. 과외 전문 선생님은 ${schoolName} 출제 경향과 학교 교육과정을 꼼꼼히 분석하여 맞춤 커리큘럼을 설계합니다. 방문 또는 화상 수업으로 학생에게 편한 환경에서 집중 지도를 받을 수 있습니다.`,
    `${sigungu}에 위치한 ${schoolName}의 내신 시험을 준비하고 있다면, 학교 교육과정에 특화된 1:1 과외가 가장 효과적입니다. 단순한 문제 풀이가 아닌 개념 이해부터 서술형 대비까지, 전 과목을 체계적으로 관리해 드립니다.`,
    `${schoolName} 중간고사·기말고사 준비, 혼자 하기 막막하셨나요? 과외 전문 선생님이 ${schoolName} 내신 출제 패턴을 분석하여 핵심만 짚어드립니다. 첫 상담에서 학생의 현재 수준과 목표를 파악하고, 시험 일정에 맞춰 역설계된 커리큘럼으로 시작합니다.`,
  ];
  const introBody = introBodies[Math.floor(rng() * introBodies.length)];

  // 수업 안내 본문 (랜덤)
  const bodyBodies = [
    `${schoolName} 내신 과외는 시험 6주 전부터 단원별 개념 정리 → 학교 기출 분석 → 실전 모의고사 순으로 진행합니다. 특히 서술형 문제는 배점이 크기 때문에 답안 작성법을 별도로 훈련합니다. 매 수업 후 오답노트를 함께 작성하며 약점을 체계적으로 보완하고, 수업 내용은 카카오톡으로 학부모님께 공유합니다.`,
    `수업은 학생의 현재 실력 진단부터 시작합니다. 취약한 단원을 먼저 집중 보완한 뒤, ${schoolName} 내신 출제 경향에 맞춰 유형별 문제 풀이를 반복합니다. 시험 2주 전에는 전 범위 모의고사를 풀고 오답 분석으로 마무리합니다. 방문 수업은 학생이 편안한 환경에서 집중할 수 있어 효과가 높습니다.`,
    `${schoolName} 선생님들의 출제 스타일과 자주 나오는 유형을 파악하여 수업을 설계합니다. 교과서 핵심 개념 → 내신 기출 유형 → 서술형 훈련 3단계로 진행하며, 매 수업마다 10분 미니 테스트로 학습 성취도를 확인합니다. 학부모님께는 주 1회 학습 현황 리포트를 제공합니다.`,
  ];
  const bodyBody = bodyBodies[Math.floor(rng() * bodyBodies.length)];

  // 마무리 본문 (랜덤)
  const conclusionBodies = [
    `${schoolName} 내신 성적을 올리는 가장 빠른 방법은 학교 출제 경향을 잘 아는 선생님과 함께하는 것입니다. 지금 무료 상담을 신청하시면 학생의 현재 수준에 맞는 수업 계획을 바로 제안해 드립니다. 첫 수업은 무료 시범수업으로 진행하며, 수업이 마음에 드신 후 결정하셔도 됩니다.`,
    `${sigungu} ${schoolName} 학생을 위한 전문 과외 선생님이 준비되어 있습니다. 과목별 전문 선생님 매칭부터 시험 일정 관리까지 처음부터 끝까지 책임지고 지도합니다. 무료 상담 후 시범수업을 통해 선생님과 궁합을 확인하고 시작하세요.`,
    `성적 향상의 첫걸음은 지금 바로 시작할 수 있습니다. ${schoolName} 내신 대비 무료 상담을 신청하시면 48시간 이내에 담당 선생님 매칭 결과를 안내해 드립니다. 방문 수업과 화상 수업 모두 가능하며, 학생 스케줄에 맞게 유연하게 조정됩니다.`,
  ];
  const conclusionBody = conclusionBodies[Math.floor(rng() * conclusionBodies.length)];

  // 수업 특징 (4개 랜덤 선택)
  const features = makeFeatures(rng, "전과목", level);

  let featuresHtml = "";
  for (const [icon, title2, desc] of features) {
    featuresHtml += `<div class="feature-item"><div class="feature-icon">${icon}</div><div><div class="feature-title">${title2}</div><div class="feature-desc">${desc}</div></div></div>`;
  }

  // FAQ
  let faqHtml = "";
  for (const [q, a] of FIXED_FAQ) {
    faqHtml += `<div class="faq-item"><div class="faq-q">Q. ${q}</div><div class="faq-a">${a}</div></div>`;
  }

  // 과목 카드
  let subjectCards = "";
  for (const subj of SUBJECTS_KO) {
    const icon = SUBJECT_ICONS[subj];
    const desc = SUBJECT_DESC[subj];
    // 자기주도학습/코딩은 외부 폼으로, 나머지는 과목별 페이지로
    const href = SUBJECT_LINKS[subj]
      ? SUBJECT_LINKS[subj]
      : `/school/${levelPrefix}-${sido}-${sigungu}-${schoolName}-${subj}-과외/`.replace(/ /g, "-").replace(/[?#&=+%]/g,"");
    subjectCards += `<a href="${href}" style="background:white;border:1px solid #e8d6f5;border-radius:14px;padding:20px 16px;text-decoration:none;display:flex;flex-direction:column;align-items:center;gap:8px;transition:all .15s;color:inherit" onmouseover="this.style.background='#510580';this.querySelectorAll('.sc-name,.sc-desc').forEach(el=>{el.style.color='white'})" onmouseout="this.style.background='white';this.querySelectorAll('.sc-name').forEach(el=>{el.style.color='#370558'});this.querySelectorAll('.sc-desc').forEach(el=>{el.style.color='#9b6cc0'})">
  <div style="font-size:1.8rem">${icon}</div>
  <div class="sc-name" style="font-size:.95rem;font-weight:800;color:#370558">${subj}</div>
  <div class="sc-desc" style="font-size:.75rem;color:#9b6cc0;text-align:center">${desc}</div>
  <div style="margin-top:4px;background:#510580;color:white;font-size:.75rem;font-weight:700;padding:4px 12px;border-radius:20px">수업문의 →</div>
</a>`;
  }

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  ${buildSocialMeta({ title, description, canonical, ogType: "article", imageAlt: `${schoolName} 내신 전문 1:1 과외` })}
  <meta property="article:published_time" content="${dates.publishedISO}">
  <meta property="article:modified_time" content="${dates.modifiedISO}">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${title.replace(/"/g, '\\"')}",
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
    .wrap{max-width:680px;margin:0 auto;padding:0 16px 48px}
    .hero{background:linear-gradient(135deg,#370558,#510580,#7b2fa8);color:white;padding:36px 20px;text-align:center}
    .hero-badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);border-radius:20px;font-size:.72rem;font-weight:700;padding:4px 14px;margin-bottom:12px}
    .hero h1{font-size:clamp(1.4rem,4vw,2rem);font-weight:800;line-height:1.4;margin-bottom:8px;color:white}
    .hero-sub{font-size:.85rem;opacity:.85;margin-bottom:20px}
    .hero-btns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
    .btn-white{background:white;color:#510580;padding:11px 20px;border-radius:50px;font-weight:700;font-size:.88rem;text-decoration:none}
    .btn-kakao{background:#FEE500;color:#3A1D1D;padding:11px 20px;border-radius:50px;font-weight:700;font-size:.88rem;text-decoration:none}
    .sec{background:white;padding:24px 0;border-bottom:1px solid #f0e6fc}
    .sec-label{font-size:.7rem;font-weight:700;color:#7b2fa8;background:#f0e6fc;display:inline-block;padding:3px 10px;border-radius:20px;margin-bottom:8px}
    .sec-title{font-size:1rem;font-weight:800;color:#370558;margin-bottom:10px;line-height:1.5}
    .sec-body{font-size:.85rem;color:#444;line-height:1.85}
    .feature-item{display:flex;gap:12px;align-items:flex-start;padding:10px 0;border-bottom:1px solid #f5eefe}
    .feature-item:last-child{border-bottom:none}
    .feature-icon{width:36px;height:36px;min-width:36px;background:#f0e6fc;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:1.1rem}
    .feature-title{font-size:.88rem;font-weight:700;color:#370558;margin-bottom:3px}
    .feature-desc{font-size:.78rem;color:#666;line-height:1.6}
    .subject-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:16px}
    .faq-item{padding:18px 0;border-bottom:1px solid #f0e6fc}
    .faq-item:last-child{border-bottom:none}
    .faq-q{font-size:.92rem;font-weight:800;color:#370558;margin-bottom:8px}
    .faq-a{font-size:.85rem;color:#444;line-height:1.85}
    .cta-sec{background:linear-gradient(135deg,#370558,#510580);border-radius:16px;padding:24px 20px;margin-top:24px;text-align:center}
    .cta-sec h2{font-size:1.1rem;font-weight:800;color:white;margin-bottom:6px}
    .cta-sec p{font-size:.82rem;color:rgba(255,255,255,.75);margin-bottom:16px}
    .cta-btns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
    .cta-phone{background:white;color:#510580;font-size:.88rem;font-weight:700;padding:10px 18px;border-radius:50px;text-decoration:none}
    .cta-kakao{background:#FEE500;color:#3A1D1D;font-size:.88rem;font-weight:700;padding:10px 18px;border-radius:50px;text-decoration:none}
    .cta-form{background:linear-gradient(135deg,#e8439a,#ff6fc1);color:white;font-size:.88rem;font-weight:700;padding:10px 18px;border-radius:50px;text-decoration:none}
    footer{background:#370558;color:rgba(255,255,255,.45);text-align:center;padding:20px;font-size:.75rem;line-height:1.8}
    footer p{color:rgba(255,255,255,.45);margin:2px 0}
    footer a{color:rgba(255,255,255,.6);text-decoration:none}
    footer a{color:rgba(255,255,255,.6);text-decoration:none}
    @media(max-width:480px){.subject-grid{grid-template-columns:repeat(2,1fr)}.hero-btns,.cta-btns{flex-direction:column;align-items:center}}
  </style>
</head>
<body>
${HEADER_HTML}
<div class="hero">
  <div class="hero-badge">${sigungu} ${schoolTypeLabel} 내신 전문</div>
  <h1>${schoolName}<br>과목별 1:1 맞춤 과외</h1>
  <p class="hero-sub">내신 시험 대비 · 방문/화상 수업 · 무료 시범수업</p>
  <div class="hero-btns">
    <a href="${FORM_URL}" target="_blank" class="btn-white">📝 체험신청</a>
    <a href="${KAKAO_URL}" target="_blank" class="btn-kakao">💬 카카오톡</a>
  </div>
</div>

<div class="wrap">
  <nav style="padding:10px 0;font-size:.75rem;color:#9b6cc0">
    <a href="/" style="color:#9b6cc0;text-decoration:none">홈</a> &gt;
    <a href="/schools/" style="color:#9b6cc0;text-decoration:none">학교별 과외</a> &gt;
    ${schoolName}
  </nav>

  <div style="display:flex;align-items:center;gap:8px;padding:6px 0;font-size:.7rem;color:#999;border-bottom:1px solid #f5eefe">
    <span>📅 최종 업데이트: ${dates.modifiedKR}</span>
    <span style="color:#ddd">|</span>
    <span>최초 게시: ${dates.publishedKR}</span>
  </div>

  <!-- 과외 소개 -->
  <div class="sec">
    <div class="sec-label">과외 소개</div>
    <div class="sec-title">${schoolName} 내신, 지금 바로 잡아드립니다</div>
    <div class="sec-body">${introBody}</div>
  </div>

  <!-- 수업 특징 -->
  <div class="sec">
    <div class="sec-label">수업 특징</div>
    <div class="sec-title">제나쌤스터디핏 과외가 다른 이유</div>
    ${featuresHtml}
  </div>

  <!-- 수업 안내 -->
  <div class="sec">
    <div class="sec-label">수업 안내</div>
    <div class="sec-title">${schoolName} 내신 대비, 이렇게 진행합니다</div>
    <div class="sec-body">${bodyBody}</div>
  </div>

  <!-- 과목 선택 -->
  <div class="sec">
    <div class="sec-label">과목 선택</div>
    <div class="sec-title">${schoolName} 어떤 과목이 필요하세요?</div>
    <div class="sec-body">${schoolName} 내신에 특화된 과목별 전문 선생님이 준비되어 있습니다. 원하는 과목을 선택하세요.</div>
    <div class="subject-grid">${subjectCards}</div>
  </div>

  <!-- 마무리 -->
  <div class="sec">
    <div class="sec-label">마무리</div>
    <div class="sec-title">${schoolName} 내신 1등급, 지금 시작하세요</div>
    <div class="sec-body">${conclusionBody}</div>
  </div>

  <!-- FAQ -->
  <div style="padding:24px 0;border-bottom:1px solid #f0e6fc">
    <div class="sec-label">자주 묻는 질문</div>
    <div class="sec-title" style="margin-top:8px">과외 신청 전 궁금한 점</div>
    ${faqHtml}
  </div>

  <!-- CTA -->
  <div class="cta-sec">
    <h2>지금 바로 무료 상담받으세요</h2>
    <p>${schoolName} 내신 전문 선생님 — 빠른 상담, 맞춤 배정</p>
    <div class="cta-btns">
      <a href="tel:${PHONE}" class="cta-phone">📞 전화</a>
      <a href="${KAKAO_URL}" target="_blank" class="cta-kakao">💬 카카오톡</a>
      <a href="${FORM_URL}" target="_blank" class="cta-form">📝 체험신청</a>
    </div>
  </div>

  ${buildShareButtons(title, canonical)}

</div>
${FOOTER_HTML}
${FLOAT_HTML}
</body>
</html>`;
}

// ── 학교×과목 상세 페이지 ─────────────────────────────────────
export function buildSchoolSubjectPage(sido, sigungu, schoolName, subject, level="중등") {
  const SUBJECT_ICONS = {"국어":"📖","영어":"🌍","수학":"📐","과학":"🔬","사회":"🗺️","한국사":"📜"};
  const SUBJECT_TRAIT = {
    "국어": "국어는 문학·비문학·서술형 전 영역을 균형 있게 준비해야 합니다.",
    "영어": "영어는 문법·독해·어휘를 체계적으로 쌓아야 내신에서 강해집니다.",
    "수학": "수학은 개념 이해 없이 문제 풀이만 반복하면 실력이 정체됩니다.",
    "과학": "과학은 암기보다 원리 이해가 선행되어야 서술형에서도 강해집니다.",
    "사회": "사회는 방대한 내용을 구조화해서 정리하는 것이 핵심입니다.",
    "한국사": "한국사는 시대별 흐름을 먼저 잡고 세부 사건을 연결해야 합니다.",
  };
  const icon = SUBJECT_ICONS[subject] || "📚";
  const trait = SUBJECT_TRAIT[subject] || "";
  const levelPrefix = level === "고등" ? "고" : level === "초등" ? "초" : "중";
  const schoolTypeLabel = level === "고등" ? "고등학교" : level === "초등" ? "초등학교" : "중학교";
  const canonical = `${SITE_DOMAIN}/school/${levelPrefix}-${sido}-${sigungu}-${schoolName}-${subject}-과외/`.replace(/ /g, "-").replace(/[?#&=+%]/g,"");
  const title = `${schoolName} ${subject} 과외 | ${sigungu} ${schoolTypeLabel} 내신 | ${SITE_NAME}`;
  const description = `${schoolName} ${subject} 내신 전문 1:1 과외. ${sigungu} ${schoolName} 학생을 위한 맞춤 ${subject} 수업. 무료 상담 가능.`;

  const seedVal = (schoolName + subject).split("").reduce((a,c,i) => (a + c.charCodeAt(0) * (i+1)) % 2147483647, 0);
  const rng = seededRandom(seedVal);
  const features = makeFeatures(rng, subject, level);

  // 페이지별 의사 갱신일 (SEO 최신성)
  const slugForDate = `${levelPrefix}-${sido}-${sigungu}-${schoolName}-${subject}`;
  const dates = getPageDates(slugForDate);

  // JSON-LD BreadcrumbList
  const schoolMainCanonical = `${SITE_DOMAIN}/school/${levelPrefix}-${sido}-${sigungu}-${schoolName}/`.replace(/ /g, "-").replace(/[?#&=+%]/g,"").replace(/[?#&=+%]/g,"");
  const breadcrumbItems = [
    { name: "홈", url: `${SITE_DOMAIN}/` },
    { name: "학교별 과외", url: `${SITE_DOMAIN}/schools/` },
    { name: sido, url: `${SITE_DOMAIN}/schools/${encodeURIComponent(sido)}/` },
    { name: schoolName, url: schoolMainCanonical },
    { name: `${subject} 과외`, url: canonical },
  ];
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(breadcrumbItems);
  let featuresHtml = "";
  for (const [fi, ft, fd] of features) {
    featuresHtml += `<div class="feature-item"><div class="feature-icon">${fi}</div><div><div class="feature-title">${ft}</div><div class="feature-desc">${fd}</div></div></div>`;
  }
  let faqHtml = "";
  for (const [q, a] of FIXED_FAQ) {
    faqHtml += `<div class="faq-item"><div class="faq-q">Q. ${q}</div><div class="faq-a">${a}</div></div>`;
  }

  // 다른 과목 배너 (현재 과목 제외)
  const ALL_SUBJ_BANNER = [
    ["국어","📖","독해력 · 문학 · 비문학 · 서술형 대비"],
    ["영어","🌍","문법 · 독해 · 어휘 · 내신 대비"],
    ["수학","📐","개념 이해 · 유형 · 실전 문제풀이"],
    ["과학","🔬","개념 · 원리 이해 · 실험 정리 · 서술형"],
    ["사회","🗺️","흐름 · 맥락 · 암기 전략"],
    ["한국사","📜","시대별 흐름 · 주요 사건 · 암기 전략"],
    ["자기주도학습","📋","과목별 공부법 · 플랜 관리 · 자기주도학습"],
    ["코딩","💻","자바스크립트 · 파이썬을 통한 컴퓨팅 사고력"],
  ];
  const filteredBanner = ALL_SUBJ_BANNER.filter(([s]) => s !== subject);
  let otherSubjectsHtml = "";
  for (let i = 0; i < filteredBanner.length; i++) {
    const [s, icon, desc] = filteredBanner[i];
    const href = s === "자기주도학습"
      ? "/self-study/"
      : s === "코딩"
        ? "/coding/"
        : `/school/${levelPrefix}-${sido}-${sigungu}-${schoolName}-${s}-과외/`.replace(/ /g, "-").replace(/[?#&=+%]/g,"").replace(/[?#&=+%]/g,"");
    const label = s === "자기주도학습" ? "공부 습관 완성" : s === "코딩" ? "AI 시대 코딩" : level + " " + s + " 과외";
    otherSubjectsHtml += `<a href="${href}" style="background:white;border:1px solid #e8d6f5;border-radius:12px;padding:14px 10px;text-decoration:none;display:flex;flex-direction:column;align-items:center;gap:6px;color:inherit;transition:all .15s" onmouseover="this.style.background='#510580';this.style.borderColor='#510580';this.querySelectorAll('.osc-name,.osc-desc').forEach(el=>el.style.color='white');this.querySelector('.osc-icon-bg').style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='white';this.style.borderColor='#e8d6f5';this.querySelector('.osc-name').style.color='#370558';this.querySelector('.osc-desc').style.color='#9b6cc0';this.querySelector('.osc-icon-bg').style.background='#f0e6fc'">
  <div class="osc-icon-bg" style="width:42px;height:42px;border-radius:50%;background:#f0e6fc;display:flex;align-items:center;justify-content:center;font-size:1.2rem;transition:background .15s">${icon}</div>
  <div class="osc-name" style="font-size:.82rem;font-weight:800;color:#370558;text-align:center;line-height:1.3">${label}</div>
  <div class="osc-desc" style="font-size:.66rem;color:#9b6cc0;text-align:center;line-height:1.4;margin-top:-2px">${desc}</div>
</a>`;
  }

  // ── 학교 → 지역 페이지 링크 섹션 (SEO: 학교 신뢰도를 지역으로 전달) ─────
  // 별도 rng(rngArea)로 대표 지역을 뽑아 기존 콘텐츠 흐름과 분리.
  const rngArea = seededRandom((seedVal * 167 + 29) % 2147483647);
  const areaGrade = SCHOOL_LEVEL_GRADE[level] || "중등";
  const { picked: schoolAreas, total: schoolAreaTotal } = getSchoolAreas(sido, sigungu, rngArea, 10);
  let schoolAreasHtml = "";
  if (schoolAreas.length > 0) {
    let rows = "";
    for (const [s, gu, dong] of schoolAreas) {
      const href = `/${s}-${gu}-${dong}-${areaGrade}-${subject}-과외/`.replace(/ /g, "-");
      // 표시명: 구가 있으면 "수지구 풍덕천동", 시=구=동이면 "태백시"
      const areaLabel = (gu === dong)
        ? gu
        : (gu.includes(" ") ? gu.split(" ").slice(1).join(" ") + " " + dong : gu + " " + dong);
      rows += `<a href="${href}" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #f0e6fc;text-decoration:none;background:white;transition:background .12s" onmouseover="this.style.background='#faf5ff'" onmouseout="this.style.background='white'"><div style="display:flex;align-items:center;gap:10px"><div style="width:30px;height:30px;border-radius:50%;background:#f0e6fc;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">📍</div><div><div style="font-size:.85rem;font-weight:700;color:#370558">${areaLabel} ${areaGrade} ${subject} 과외</div><div style="font-size:.72rem;color:#9b6cc0;margin-top:2px">${areaLabel} 방문·화상 1:1 ${subject} 수업</div></div></div><div style="font-size:.85rem;color:#c9a3e8;flex-shrink:0">→</div></a>`;
    }
    // 전체 지역이 노출 개수보다 많을 때만 "전체 보기" 링크
    const moreLink = (schoolAreaTotal > schoolAreas.length)
      ? `<a href="/regions/" style="display:block;padding:11px 16px;text-align:center;font-size:.78rem;font-weight:700;color:#7b2fa8;text-decoration:none;background:#faf5ff">${sigungu} 전체 지역 과외 보기 →</a>`
      : "";
    schoolAreasHtml = `
  <!-- 학교 → 지역 페이지 링크 (SEO 상호링크) -->
  <div style="background:white;border:1px solid #e8d6f5;border-radius:14px;overflow:hidden;margin-top:24px;margin-bottom:8px">
    <div style="padding:13px 16px;border-bottom:1px solid #f0e6fc;background:#faf5ff;display:flex;align-items:center;justify-content:space-between">
      <span style="font-size:.88rem;font-weight:700;color:#370558">${sigungu} 지역별 ${subject} 과외</span>
      <span style="font-size:.72rem;color:#9b6cc0">동네 방문·화상 →</span>
    </div>
    ${rows}
    ${moreLink}
  </div>`;
  }

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  ${buildSocialMeta({ title, description, canonical, ogType: "article", imageAlt: `${schoolName} ${subject} 내신 전문 1:1 과외` })}
  <meta property="article:published_time" content="${dates.publishedISO}">
  <meta property="article:modified_time" content="${dates.modifiedISO}">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${title.replace(/"/g, '\\"')}",
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
    ${HEADER_CSS}${FLOAT_CSS}
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Noto Sans KR',sans-serif;background:#fff;color:#1a0a24;line-height:1.7}
    .wrap{max-width:680px;margin:0 auto;padding:0 16px 48px}
    .hero{background:linear-gradient(135deg,#370558,#510580,#7b2fa8);color:white;padding:36px 20px;text-align:center}
    .hero-badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);border-radius:20px;font-size:.72rem;font-weight:700;padding:4px 14px;margin-bottom:12px}
    .hero h1{font-size:clamp(1.3rem,4vw,1.9rem);font-weight:800;line-height:1.4;margin-bottom:8px;color:white}
    .hero-sub{font-size:.85rem;opacity:.85;margin-bottom:20px}
    .hero-btns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
    .btn-white{background:white;color:#510580;padding:11px 20px;border-radius:50px;font-weight:700;font-size:.88rem;text-decoration:none}
    .btn-kakao{background:#FEE500;color:#3A1D1D;padding:11px 20px;border-radius:50px;font-weight:700;font-size:.88rem;text-decoration:none}
    .sec{padding:24px 0;border-bottom:1px solid #f0e6fc}
    .sec-label{font-size:.7rem;font-weight:700;color:#7b2fa8;background:#f0e6fc;display:inline-block;padding:3px 10px;border-radius:20px;margin-bottom:8px}
    .sec-title{font-size:1rem;font-weight:800;color:#370558;margin-bottom:10px;line-height:1.5}
    .sec-body{font-size:.85rem;color:#444;line-height:1.85}
    .feature-item{display:flex;gap:12px;align-items:flex-start;padding:10px 0;border-bottom:1px solid #f5eefe}
    .feature-item:last-child{border-bottom:none}
    .feature-icon{width:36px;height:36px;min-width:36px;background:#f0e6fc;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:1.1rem}
    .feature-title{font-size:.88rem;font-weight:700;color:#370558;margin-bottom:3px}
    .feature-desc{font-size:.78rem;color:#666;line-height:1.6}
    .faq-item{padding:18px 0;border-bottom:1px solid #f0e6fc}
    .faq-item:last-child{border-bottom:none}
    .faq-q{font-size:.92rem;font-weight:800;color:#370558;margin-bottom:8px}
    .faq-a{font-size:.85rem;color:#444;line-height:1.85}
    .cta-sec{background:linear-gradient(135deg,#370558,#510580);border-radius:16px;padding:24px 20px;margin-top:24px;text-align:center}
    .cta-sec h2{font-size:1.1rem;font-weight:800;color:white;margin-bottom:6px}
    .cta-sec p{font-size:.82rem;color:rgba(255,255,255,.75);margin-bottom:16px}
    .cta-btns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
    .cta-phone{background:white;color:#510580;font-size:.88rem;font-weight:700;padding:10px 18px;border-radius:50px;text-decoration:none}
    .cta-kakao{background:#FEE500;color:#3A1D1D;font-size:.88rem;font-weight:700;padding:10px 18px;border-radius:50px;text-decoration:none}
    .cta-form{background:linear-gradient(135deg,#e8439a,#ff6fc1);color:white;font-size:.88rem;font-weight:700;padding:10px 18px;border-radius:50px;text-decoration:none}
    .other-subj-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
    @media(max-width:600px){.other-subj-grid{grid-template-columns:repeat(2,1fr);gap:10px}}
    footer{background:#370558;color:rgba(255,255,255,.45);text-align:center;padding:20px;font-size:.75rem;line-height:1.8}
    footer p{color:rgba(255,255,255,.45);margin:2px 0}
    footer a{color:rgba(255,255,255,.6);text-decoration:none}
    footer a{color:rgba(255,255,255,.6);text-decoration:none}
    @media(max-width:600px){.hero-btns,.cta-btns{flex-direction:column;align-items:center}}
  </style>
</head>
<body>
${HEADER_HTML}
<div class="hero">
  <div class="hero-badge">${sigungu} · ${schoolTypeLabel}</div>
  <h1>${icon} ${schoolName}<br>${level} ${subject} 내신 과외</h1>
  <p class="hero-sub">학교 출제 경향 분석 · 1:1 맞춤 수업 · 무료 시범수업</p>
  <div class="hero-btns">
    <a href="${FORM_URL}" target="_blank" class="btn-white">📝 체험신청</a>
    <a href="${KAKAO_URL}" target="_blank" class="btn-kakao">💬 카카오톡</a>
  </div>
</div>
<div class="wrap">
  <nav style="padding:10px 0;font-size:.75rem;color:#9b6cc0">
    <a href="/" style="color:#9b6cc0;text-decoration:none">홈</a> &gt;
    <a href="/schools/" style="color:#9b6cc0;text-decoration:none">학교별 과외</a> &gt;
    <a href="/school/${levelPrefix}-${sido}-${sigungu}-${schoolName}/".replace(/ /g,"-") style="color:#9b6cc0;text-decoration:none">${schoolName}</a> &gt;
    ${subject}
  </nav>

  <div style="display:flex;align-items:center;gap:8px;padding:6px 0;font-size:.7rem;color:#999;border-bottom:1px solid #f5eefe">
    <span>📅 최종 업데이트: ${dates.modifiedKR}</span>
    <span style="color:#ddd">|</span>
    <span>최초 게시: ${dates.publishedKR}</span>
  </div>

  <div class="sec">
    <div class="sec-label">과외 소개</div>
    <div class="sec-title">${schoolName} ${subject} 내신, 제대로 준비하는 법</div>
    <div class="sec-body">${trait} ${schoolName} ${subject} 내신 시험은 학교 선생님의 출제 스타일을 파악하는 것이 핵심입니다. 과외 전문 선생님이 ${schoolName} ${subject} 기출 경향을 분석하고 시험 일정에 맞춘 커리큘럼으로 내신 성적을 끌어올려 드립니다.</div>
  </div>

  <div class="sec">
    <div class="sec-label">수업 특징</div>
    <div class="sec-title">제나쌤스터디핏 과외가 다른 이유</div>
    ${featuresHtml}
  </div>

  <div class="sec">
    <div class="sec-label">수업 안내</div>
    <div class="sec-title">${schoolName} ${subject} 수업, 이렇게 진행합니다</div>
    <div class="sec-body">${schoolName} ${subject} 내신 과외는 시험 6주 전부터 단원별 개념 정리 → 학교 기출 분석 → 실전 모의고사 순으로 진행합니다. 서술형 문제는 답안 작성법을 별도로 훈련하고, 매 수업 후 오답노트를 함께 작성하며 약점을 체계적으로 보완합니다. 수업 내용은 매 회 학부모님께 카카오톡으로 공유해 드립니다.</div>
  </div>

  ${buildGradeRoadmapCards(level, subject)}

  <!-- 이미지 그리드 -->
  <div style="margin-top:24px;display:flex;flex-direction:column;gap:12px">
    <img src="/images/study-01-desk.jpg" alt="${schoolName} ${subject} 과외 수업 사진" loading="lazy" style="width:100%;height:auto;border-radius:10px;border:1px solid #e8d6f5;display:block">
    <img src="/images/study-02-book.jpg" alt="${schoolName} ${subject} 과외 수업 사진" loading="lazy" style="width:100%;height:auto;border-radius:10px;border:1px solid #e8d6f5;display:block">
    <img src="/images/study-03-writing.jpg" alt="${schoolName} ${subject} 과외 수업 사진" loading="lazy" style="width:100%;height:auto;border-radius:10px;border:1px solid #e8d6f5;display:block">
    <img src="/images/study-04-tutoring.jpg" alt="${schoolName} ${subject} 과외 수업 사진" loading="lazy" style="width:100%;height:auto;border-radius:10px;border:1px solid #e8d6f5;display:block">
    <img src="/images/study-05-whiteboard.jpg" alt="${schoolName} ${subject} 과외 수업 사진" loading="lazy" style="width:100%;height:auto;border-radius:10px;border:1px solid #e8d6f5;display:block">
    <img src="/images/study-06-math.jpg" alt="${schoolName} ${subject} 과외 수업 사진" loading="lazy" style="width:100%;height:auto;border-radius:10px;border:1px solid #e8d6f5;display:block">
    <img src="/images/study-07-english.jpg" alt="${schoolName} ${subject} 과외 수업 사진" loading="lazy" style="width:100%;height:auto;border-radius:10px;border:1px solid #e8d6f5;display:block">
    <img src="/images/study-08-korean.jpg" alt="${schoolName} ${subject} 과외 수업 사진" loading="lazy" style="width:100%;height:auto;border-radius:10px;border:1px solid #e8d6f5;display:block">
    <img src="/images/study-09-science.jpg" alt="${schoolName} ${subject} 과외 수업 사진" loading="lazy" style="width:100%;height:auto;border-radius:10px;border:1px solid #e8d6f5;display:block">
    <img src="/images/study-10-social.jpg" alt="${schoolName} ${subject} 과외 수업 사진" loading="lazy" style="width:100%;height:auto;border-radius:10px;border:1px solid #e8d6f5;display:block">
    <img src="/images/study-11-result.jpg" alt="${schoolName} ${subject} 과외 수업 사진" loading="lazy" style="width:100%;height:auto;border-radius:10px;border:1px solid #e8d6f5;display:block">
    <img src="/images/study-12-feedback.jpg" alt="${schoolName} ${subject} 과외 수업 사진" loading="lazy" style="width:100%;height:auto;border-radius:10px;border:1px solid #e8d6f5;display:block">
    <img src="/images/study-13-smile.jpg" alt="${schoolName} ${subject} 과외 수업 사진" loading="lazy" style="width:100%;height:auto;border-radius:10px;border:1px solid #e8d6f5;display:block">
  </div>

  <div class="sec">
    <div class="sec-label">마무리</div>
    <div class="sec-title">${schoolName} ${subject} 1등급, 지금 시작하세요</div>
    <div class="sec-body">${schoolName} ${subject} 내신 성적을 올리는 가장 빠른 방법은 학교 출제 경향을 잘 아는 선생님과 함께하는 것입니다. 지금 무료 상담을 신청하시면 학생의 현재 수준에 맞는 수업 계획을 바로 제안해 드립니다. 첫 수업은 무료 시범수업으로 진행하며, 수업이 마음에 드신 후 결정하셔도 됩니다.</div>
  </div>

  <div style="padding:24px 0;border-bottom:1px solid #f0e6fc">
    <div class="sec-label">자주 묻는 질문</div>
    <div class="sec-title" style="margin-top:8px">과외 신청 전 궁금한 점</div>
    ${faqHtml}
  </div>

  <!-- 다른 과목 배너 (카드형 그리드) -->
  <div style="margin-top:24px;margin-bottom:8px">
    <div style="font-size:.88rem;font-weight:700;color:#370558;margin-bottom:4px">${schoolName} 다른 과목 과외</div>
    <div style="font-size:.72rem;color:#9b6cc0;margin-bottom:12px">학생에게 필요한 다른 과목도 확인해보세요</div>
    <div class="other-subj-grid">${otherSubjectsHtml}</div>
  </div>
${schoolAreasHtml}

  <div class="cta-sec">
    <h2>지금 바로 무료 상담받으세요</h2>
    <p>${schoolName} ${subject} 내신 전문 선생님 — 빠른 상담, 맞춤 배정</p>
    <div class="cta-btns">
      <a href="tel:${PHONE}" class="cta-phone">📞 전화</a>
      <a href="${KAKAO_URL}" target="_blank" class="cta-kakao">💬 카카오톡</a>
      <a href="${FORM_URL}" target="_blank" class="cta-form">📝 체험신청</a>
    </div>
  </div>

  ${buildShareButtons(title, canonical)}
</div>
${FOOTER_HTML}
${FLOAT_HTML}
</body>
</html>`;
}
