// ================================================================
// builders/academy.js — 학원 페이지 빌더
// 변경 빈도: 중간 (학원 소개·지점 데이터 추가 시)
// 의존:
//   - config.js (SITE_NAME, SITE_DOMAIN, FORM_URL, KAKAO_URL, PHONE, ACADEMY_READY, CITY_ORDER)
//   - layout.js (HEADER_CSS, HEADER_HTML, FOOTER_HTML, FLOAT_CSS, FLOAT_HTML)
//
// 함수 (5개):
//   - buildAcademyIntroPage()          — 학원 소개 (/academy/intro/)
//   - buildAcademyLocationHubPage()    — 시도별 허브 (/academy/location/)
//   - buildAcademyLocationSidoPage()   — 시도별 지점 목록 (/academy/location/{sido}/)
//   - buildAcademyCenterPage()         — 지점 상세 (/academy/center/{slug}/)
//   - buildAcademyComingSoonPage()     — 준비중 안내 (출시 전 모든 라우트 폴백)
//
// 출시 상태 제어: config.js의 ACADEMY_READY 객체
//   - ACADEMY_READY.intro    → false면 buildAcademyComingSoonPage 폴백
//   - ACADEMY_READY.location → false면 buildAcademyComingSoonPage 폴백
//
// ⚠️ 데이터 의존:
//   - 학원 지점 데이터(data/academies.js)는 별도 추가 예정
//   - 데이터 추가 전까지는 ACADEMY_READY를 false로 유지하여 준비중 페이지만 노출
// ================================================================

import { SITE_NAME, SITE_DOMAIN, FORM_URL, KAKAO_URL, PHONE, ACADEMY_READY } from '../config.js';
import { HEADER_CSS, HEADER_HTML, FOOTER_HTML, FLOAT_CSS, FLOAT_HTML } from '../layout.js';


// ── 학원 소개 페이지 (/academy/intro/) ─────────────────────────
export function buildAcademyIntroPage() {
  // 출시 전이면 준비중 페이지로 폴백
  if (!ACADEMY_READY.intro) {
    return buildAcademyComingSoonPage("학원소개", "intro");
  }

  // TODO: 실제 학원 소개 페이지 콘텐츠 (운영 방식·특장점·후기·상담 폼)
  // ACADEMY_READY.intro = true 로 변경하기 전에 콘텐츠 완성 필요
  return buildAcademyComingSoonPage("학원소개", "intro");
}


// ── 학원 위치 안내 허브 (/academy/location/) ───────────────────
export function buildAcademyLocationHubPage() {
  // 출시 전이면 준비중 페이지로 폴백
  if (!ACADEMY_READY.location) {
    return buildAcademyComingSoonPage("학원 위치 안내", "location");
  }

  // TODO: 시도별 지점 카드 그리드 (전국 N개 센터)
  // 학원 지점 데이터(data/academies.js) 받은 후 구현
  return buildAcademyComingSoonPage("학원 위치 안내", "location");
}


// ── 시도별 지점 목록 (/academy/location/{sido}/) ───────────────
export function buildAcademyLocationSidoPage(sido) {
  // 출시 전이면 준비중 페이지로 폴백
  if (!ACADEMY_READY.location) {
    return buildAcademyComingSoonPage(`${sido} 학원 위치`, "location");
  }

  // TODO: 해당 시도의 지점 카드 목록 (주소·과목·인근 학교)
  // 학원 지점 데이터(data/academies.js) 받은 후 구현
  return buildAcademyComingSoonPage(`${sido} 학원 위치`, "location");
}


// ── 지점 상세 페이지 (/academy/center/{slug}/) ─────────────────
export function buildAcademyCenterPage(slug) {
  // 출시 전이면 준비중 페이지로 폴백
  if (!ACADEMY_READY.location) {
    return buildAcademyComingSoonPage("학원 지점 상세", "location");
  }

  // TODO: 지점명·등록번호·주소·과목·학교·학원비·상담 CTA
  // 학원 지점 데이터(data/academies.js) 받은 후 구현
  return buildAcademyComingSoonPage("학원 지점 상세", "location");
}


// ── 준비중 안내 페이지 (모든 학원 라우트의 폴백) ───────────────
export function buildAcademyComingSoonPage(pageName, type) {
  const canonical = `${SITE_DOMAIN}/academy/${type === "intro" ? "intro" : "location"}/`;
  const titleTag = `${pageName} (준비중) | ${SITE_NAME}`;
  const description = `${SITE_NAME} 학원 페이지를 준비하고 있습니다. 곧 공개됩니다. 궁금하신 점은 카카오톡 또는 전화로 문의해 주세요.`;

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titleTag}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  <meta name="robots" content="noindex,follow">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${titleTag}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${SITE_DOMAIN}/images/og-image.png">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;800&display=swap" rel="stylesheet">
  <style>
    ${HEADER_CSS}
    ${FLOAT_CSS}
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Noto Sans KR',sans-serif;background:#fff;color:#1a0a24;line-height:1.7}
    .soon-hero{background:linear-gradient(140deg,#370558,#510580,#7b2fa8);color:white;padding:80px 24px 60px;text-align:center}
    .soon-badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);border-radius:20px;font-size:.78rem;font-weight:700;padding:5px 16px;margin-bottom:18px}
    .soon-hero h1{font-size:clamp(1.6rem,3.5vw,2.4rem);font-weight:800;line-height:1.4;margin-bottom:14px;color:white}
    .soon-hero p{font-size:1rem;opacity:.88;margin-bottom:30px;max-width:600px;margin-left:auto;margin-right:auto}
    .soon-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
    .btn-pink{background:linear-gradient(135deg,#e8439a,#ff6fc1);color:white;padding:13px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;box-shadow:0 4px 14px rgba(232,67,154,.4)}
    .btn-outline-w{background:transparent;color:white;padding:13px 28px;border-radius:50px;font-weight:700;font-size:.95rem;border:1.5px solid rgba(255,255,255,.5);text-decoration:none}
    .soon-body{max-width:760px;margin:0 auto;padding:48px 24px}
    .soon-card{background:#faf5ff;border:1px solid #e8d6f5;border-radius:16px;padding:32px 28px;margin-bottom:24px}
    .soon-card h2{font-size:1.2rem;color:#510580;font-weight:800;margin-bottom:12px}
    .soon-card p{color:#444;font-size:.95rem;line-height:1.7}
    .soon-link-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-top:20px}
    .soon-link{display:flex;align-items:center;gap:10px;padding:14px;background:white;border:1px solid #e8d6f5;border-radius:12px;text-decoration:none;color:#370558;font-weight:700;font-size:.88rem;transition:all .15s}
    .soon-link:hover{border-color:#510580;background:#faf5ff}
    .soon-link-icon{font-size:1.3rem}
    footer{background:#370558;color:rgba(255,255,255,.7);text-align:center;padding:32px 24px;font-size:.82rem}
    footer a:hover{color:white !important}
  </style>
</head>
<body>
${HEADER_HTML}
<section class="soon-hero">
  <div class="soon-badge">🚧 페이지 준비중</div>
  <h1>${pageName} 페이지를<br>준비하고 있어요</h1>
  <p>더 좋은 안내를 위해 콘텐츠를 정리하고 있습니다.<br>궁금하신 점은 아래 채널로 편하게 문의해 주세요.</p>
  <div class="soon-btns">
    <a href="${FORM_URL}" target="_blank" class="btn-pink">📝 무료 상담 신청</a>
    <a href="${KAKAO_URL}" target="_blank" class="btn-outline-w">💬 카카오톡 상담</a>
  </div>
</section>

<section class="soon-body">
  <div class="soon-card">
    <h2>📞 바로 문의하기</h2>
    <p>학원 운영·수업·지점 위치 등 어떤 질문이든 편하게 연락 주세요.<br>친절하게 안내해 드립니다.</p>
    <div class="soon-link-grid">
      <a href="tel:${PHONE}" class="soon-link"><span class="soon-link-icon">📞</span><span>전화 ${PHONE}</span></a>
      <a href="${KAKAO_URL}" target="_blank" class="soon-link"><span class="soon-link-icon">💬</span><span>카카오톡 채널</span></a>
      <a href="${FORM_URL}" target="_blank" class="soon-link"><span class="soon-link-icon">📝</span><span>상담 신청 폼</span></a>
    </div>
  </div>

  <div class="soon-card">
    <h2>🔍 다른 서비스 둘러보기</h2>
    <p>${SITE_NAME}는 1:1 맞춤 과외 서비스도 함께 운영하고 있습니다.</p>
    <div class="soon-link-grid">
      <a href="/regions/" class="soon-link"><span class="soon-link-icon">📍</span><span>지역별 과외</span></a>
      <a href="/schools/" class="soon-link"><span class="soon-link-icon">🏫</span><span>학교별 과외</span></a>
      <a href="/study/" class="soon-link"><span class="soon-link-icon">📚</span><span>과목별 공부법</span></a>
      <a href="/" class="soon-link"><span class="soon-link-icon">🏠</span><span>메인으로</span></a>
    </div>
  </div>
</section>

${FOOTER_HTML}
${FLOAT_HTML}
<style>${FLOAT_CSS}</style>
</body>
</html>`;
}
