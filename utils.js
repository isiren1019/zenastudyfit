// ================================================================
// utils.js — 순수 헬퍼 함수 모음
// 변경 빈도: 매우 낮음 (한 번 만들어두면 거의 안 건드림)
// 이 파일은 다른 어떤 파일도 import하지 않음 (의존성 없음)
// ================================================================

import { SITE_NAME, SITE_DOMAIN, SITE_LAUNCH_DATE } from './config.js';

// ── 한국어 조사 처리 ──────────────────────────────────────────
// 한글 마지막 글자에 받침이 있는지 확인 (이/가, 을/를 등 조사 선택용)
export function hasJongseong(word) {
  if (!word) return false;
  const lastChar = word.charCodeAt(word.length - 1);
  // 한글 음절 영역(가-힣)인지 확인
  if (lastChar < 0xAC00 || lastChar > 0xD7A3) {
    // 한글이 아니면 영문/숫자: 보수적으로 받침 있음 처리 (대부분 자음으로 끝남)
    // 다만 모음으로 끝나는 영단어가 있으니 false가 더 안전한 편
    return false;
  }
  return (lastChar - 0xAC00) % 28 !== 0;
}

// 마지막 글자가 'ㄹ' 받침인지 (로/으로 처리용)
export function endsWithRieul(word) {
  if (!word) return false;
  const lastChar = word.charCodeAt(word.length - 1);
  if (lastChar < 0xAC00 || lastChar > 0xD7A3) return false;
  return (lastChar - 0xAC00) % 28 === 8; // 'ㄹ' 받침
}

export function pickJosa(word, withJong, withoutJong) {
  return hasJongseong(word) ? withJong : withoutJong;
}

// ── 템플릿 문자열 변수 치환 (조사 자동 처리 포함) ─────────────
export function fmt(str, vars) {
  // 1. {key:josaA/josaB} 패턴 처리 - 변수 뒤에 조사 자동 선택
  // 예: {subject:을/를} → 한글 받침에 따라 "을" 또는 "를"
  // 예: {dong:로/으로} → ㄹ 받침은 "로", 다른 받침은 "으로"
  let result = str.replace(/\{(\w+):([^/}]+)\/([^}]+)\}/g, (_, k, withJong, withoutJong) => {
    const value = vars[k];
    if (value === undefined) return `{${k}:${withJong}/${withoutJong}}`;
    // 으로/로 특수 처리: 받침 없거나 ㄹ 받침이면 "로", 다른 받침은 "으로"
    if ((withJong === '으로' && withoutJong === '로') || (withJong === '로' && withoutJong === '으로')) {
      return value + (hasJongseong(value) && !endsWithRieul(value) ? '으로' : '로');
    }
    return value + pickJosa(value, withJong, withoutJong);
  });

  // 2. 일반 변수 치환
  result = result.replace(/\{(\w+)\}/g, (_, k) => vars[k] !== undefined ? vars[k] : `{${k}}`);

  // 3. 동일 지역명 중복 제거 (예: "계룡시 계룡시" → "계룡시", "계룡시 · 계룡시" → "계룡시")
  if (vars.gu && vars.dong && vars.gu === vars.dong) {
    const escGu = vars.gu.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    result = result.replace(new RegExp(escGu + '\\s*[·]?\\s*' + escGu, 'g'), vars.gu);
  }
  if (vars.city && vars.gu && vars.city === vars.gu) {
    const escCity = vars.city.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    result = result.replace(new RegExp(escCity + '\\s*[·]?\\s*' + escCity, 'g'), vars.city);
  }

  return result;
}

// ── 지역명 표시용 헬퍼 ────────────────────────────────────────
// 단일 지역(시·시·시) vs 다단계 지역(시·구·동) 구분
export function regionVars(city, gu, dong) {
  const isSingle = (city === gu && gu === dong) || (gu === dong);
  return {
    region_full: isSingle ? gu : `${gu} ${dong}`,        // 전체 표시 (예: "계룡시" / "강남구 대치동")
    region_short: dong || gu,                             // 짧은 표시 (예: "계룡시" / "대치동")
    region_wide: gu,                                      // 넓은 표시 (예: "계룡시" / "강남구")
  };
}

// ── 시드 기반 랜덤 (페이지마다 결정적 콘텐츠 생성) ─────────────
export function seededRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function() {
    s = s * 16807 % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function pickS(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

export function pickSeeded(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

// ── 표시용 과목명 변환 (고등 과학→통합과학, 사회→통합사회) ─────
export function getDisplaySubject(subj, grade) {
  if (grade === "고등") {
    if (subj === "과학") return "통합과학";
    if (subj === "사회") return "통합사회";
  }
  return subj;
}

// ── 콘텐츠 기준일 (앵커) — 수동 관리 ─────────────────────────────
// ⚠️ 2026-08-24 수정 배경
//   이전 버전은 getPageDates가 new Date() (= 오늘)를 기준으로 날짜를 만들어서
//   같은 페이지의 "최종 업데이트"가 매일 하루씩 뒤로 밀렸음.
//   콘텐츠는 그대로인데 사이트맵과 페이지가 함께 "매일 갱신됨"이라고 신고하는
//   상태였고, 검색엔진이 이 신호를 불신하게 되는 원인이 됨.
//   → 고정 앵커 기준으로 전환. 같은 페이지는 언제 요청해도 같은 날짜를 반환.
//
// 📌 이 날짜를 바꿔야 할 때 / 바꾸지 말아야 할 때
//   O 바꾼다: 페이지 구성 자체가 달라지는 대규모 개편
//            (예: 본문 섹션 교체, FAQ·특징 카드 분리, 레이아웃 전면 수정)
//   X 안 바꾼다: 일반 배포, 페이지 몇 개 추가, 버그 수정, 데이터 소량 변경
//   애매하면 바꾸지 않는 쪽이 안전함 (거짓 신선도보다 낡은 날짜가 나음)
export const CONTENT_ANCHOR_DATE = new Date("2026-07-16T00:00:00Z");

// ── 페이지별 갱신일 생성 ──────────────────────────────────────────
// 앵커 날짜를 기준으로 시드 기반 분산. 같은 페이지 = 항상 같은 날짜(고정).
export function getPageDates(slug) {
  // slug를 시드로 0~59 사이 오프셋 생성 (페이지마다 다른 날짜로 분산)
  const seed = slug.split("").reduce((a,c,i) => (a + c.charCodeAt(0) * (i+1)) % 2147483647, 0);
  const offset = seed % 60; // 0~59일 분산

  // dateModified: 앵커로부터 (offset)일 전 — 오늘 날짜에 의존하지 않음
  const modified = new Date(CONTENT_ANCHOR_DATE);
  modified.setDate(modified.getDate() - offset);

  // datePublished: dateModified로부터 90~180일 전 (시드로 결정)
  const pubOffset = 90 + (seed % 90); // 90~179일 추가
  const published = new Date(modified);
  published.setDate(published.getDate() - pubOffset);

  // 사이트 시작일보다 이전이면 시작일로 보정
  if (published < SITE_LAUNCH_DATE) {
    published.setTime(SITE_LAUNCH_DATE.getTime());
  }

  return {
    publishedISO: published.toISOString(),       // 2026-01-15T00:00:00.000Z (메타 태그용)
    modifiedISO: modified.toISOString(),         // 2026-04-10T00:00:00.000Z (메타 태그용)
    publishedKR: formatKoreanDate(published),    // 2026.01.15 (본문 표시용)
    modifiedKR: formatKoreanDate(modified),      // 2026.04.10 (본문 표시용)
  };
}

export function formatKoreanDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

// ── JSON-LD BreadcrumbList 생성 (SEO 구조화 데이터) ──────────────
// items: [{name: "홈", url: "https://..."}, ...]
export function buildBreadcrumbJsonLd(items) {
  const itemList = items.map((item, idx) => {
    const obj = {
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
    };
    // 마지막 항목(현재 페이지)은 url 생략 가능 (있어도 됨, 명확성 위해 모두 포함)
    if (item.url) obj.item = item.url;
    return obj;
  });
  return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": ${JSON.stringify(itemList, null, 2).replace(/\n/g, '\n  ')}
}
</script>`;
}

// ── 통합 og/twitter 메타 태그 생성 (소셜 공유 최적화) ──────────────
export function buildSocialMeta({ title, description, canonical, ogType = "article", imageUrl = null, imageAlt = null }) {
  const img = imageUrl || `${SITE_DOMAIN}/images/og-image.png`;
  const alt = (imageAlt || title).replace(/"/g, '&quot;');
  const safeTitle = title.replace(/"/g, '&quot;');
  const safeDesc = description.replace(/"/g, '&quot;');
  return `<meta property="og:type" content="${ogType}">
  <meta property="og:title" content="${safeTitle}">
  <meta property="og:description" content="${safeDesc}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${img}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${alt}">
  <meta property="og:site_name" content="${SITE_NAME}">
  <meta property="og:locale" content="ko_KR">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${safeTitle}">
  <meta name="twitter:description" content="${safeDesc}">
  <meta name="twitter:image" content="${img}">`;
}

// ── 공유 버튼 컴포넌트 (링크 복사 + 네이티브 공유) ─────────────────
// shareTitle: 공유 시 제목 (Web Share API용)
// shareUrl: 공유할 URL (canonical)
export function buildShareButtons(shareTitle, shareUrl) {
  const safeTitle = shareTitle.replace(/'/g, "\\'").replace(/"/g, '&quot;');
  return `<div class="share-wrap" style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;padding:16px 0">
  <button onclick="(function(){const u='${shareUrl}';if(navigator.share){navigator.share({title:'${safeTitle}',url:u}).catch(()=>{});}else{navigator.clipboard.writeText(u).then(()=>{const b=event.target;const o=b.innerHTML;b.innerHTML='✅ 복사됨';setTimeout(()=>{b.innerHTML=o;},1800);});}})()" style="background:white;border:1.5px solid #510580;color:#510580;font-size:.82rem;font-weight:700;padding:8px 16px;border-radius:50px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;font-family:inherit">📤 공유하기</button>
  <button onclick="(function(){const u='${shareUrl}';navigator.clipboard.writeText(u).then(()=>{const b=event.target;const o=b.innerHTML;b.innerHTML='✅ 복사됨';setTimeout(()=>{b.innerHTML=o;},1800);}).catch(()=>{const t=document.createElement('textarea');t.value=u;document.body.appendChild(t);t.select();document.execCommand('copy');document.body.removeChild(t);const b=event.target;const o=b.innerHTML;b.innerHTML='✅ 복사됨';setTimeout(()=>{b.innerHTML=o;},1800);});})()" style="background:white;border:1.5px solid #e8439a;color:#e8439a;font-size:.82rem;font-weight:700;padding:8px 16px;border-radius:50px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;font-family:inherit">📋 링크 복사</button>
</div>`;
}

// ── 과목명 → 영문 키 매핑 (URL/내부 키용) ─────────────────────
export const SUBJECT_KEY_MAP = {
  "국어": "korean", "영어": "english", "수학": "math",
  "과학": "science", "사회": "social", "한국사": "history",
};

export const LEVEL_GRADES = {
  "초등": ["elem1", "elem2", "elem3", "elem4", "elem5", "elem6", "pre-mid1"],
  "중등": ["pre-mid1", "mid1", "mid2", "mid3", "pre-high1"],
  "고등": ["pre-high1", "high1", "high2", "high3"],
};

export const GRADE_ICONS = {
  "elem1": "1️⃣", "elem2": "2️⃣", "elem3": "3️⃣", "elem4": "4️⃣", "elem5": "5️⃣", "elem6": "6️⃣",
  "pre-mid1": "⚡", "mid1": "1️⃣", "mid2": "2️⃣", "mid3": "3️⃣",
  "pre-high1": "⚡", "high1": "1️⃣", "high2": "2️⃣", "high3": "3️⃣",
};
