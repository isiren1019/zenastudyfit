// ================================================================
// builders/pages.js — 메인/지역 목록/404 페이지 빌더
// 변경 빈도: 중간 (메인 페이지·지역 페이지 디자인 변경 시)
// 의존:
//   - config.js (SITE_NAME, SITE_DOMAIN, CITY_ORDER, FORM_URL, KAKAO_URL, PHONE)
//   - layout.js (HEADER_CSS, HEADER_HTML, FOOTER_HTML, FLOAT_CSS, FLOAT_HTML)
//   - data/areas.js (AREAS)
//
// 함수:
//   - buildMainPage()    — 메인 페이지 (히어로/통계/수업찾기 8카드/CTA)
//   - buildRegionsPage() — 전국 지역 목록 페이지 (시도→시→구→동 3단계 토글)
//   - build404Page()     — 404 에러 페이지
// ================================================================

import { SITE_NAME, SITE_DOMAIN, CITY_ORDER, FORM_URL, KAKAO_URL, PHONE } from '../config.js';
import { HEADER_CSS, HEADER_HTML, FOOTER_HTML, FLOAT_CSS, FLOAT_HTML } from '../layout.js';
import { AREAS } from '../data/areas.js';


// ── 메인 페이지 ───────────────────────────────────────────────
export function buildMainPage() {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>전국 방문·화상 과외 전문 | ${SITE_NAME}</title>
  <meta name="description" content="베테랑 선생님의 1:1 맞춤 과외. 초·중·고 전과목 내신 전문. 무료 시범수업 신청 가능.">
  <link rel="canonical" href="${SITE_DOMAIN}/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="전국 방문·화상 과외 전문 | ${SITE_NAME}">
  <meta property="og:image" content="${SITE_DOMAIN}/images/og-image.png">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;800&display=swap" rel="stylesheet">
  <style>
    ${HEADER_CSS}
    ${FLOAT_CSS}
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Noto Sans KR',sans-serif;background:#fff;color:#1a0a24;line-height:1.7}
    .hero{background:linear-gradient(140deg,#370558,#510580,#7b2fa8);color:white;padding:60px 24px;text-align:center}
    .hero-badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);border-radius:20px;font-size:.78rem;font-weight:700;padding:5px 16px;margin-bottom:16px}
    .hero h1{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;line-height:1.4;margin-bottom:10px;color:white}
    .hero p{font-size:.95rem;opacity:.85;margin-bottom:28px}
    .hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
    .btn-pink{background:linear-gradient(135deg,#e8439a,#ff6fc1);color:white;padding:13px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;box-shadow:0 4px 14px rgba(232,67,154,.4)}
    .btn-outline-w{background:transparent;color:white;padding:13px 28px;border-radius:50px;font-weight:700;font-size:.95rem;border:1.5px solid rgba(255,255,255,.5);text-decoration:none}
    .stats{background:#370558;padding:24px}
    .stats-inner{max-width:900px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center}
    .stat-num{font-size:1.6rem;font-weight:800;color:white}
    .stat-label{font-size:.75rem;color:rgba(255,255,255,.6);margin-top:4px}
    .sec{max-width:900px;margin:0 auto;padding:52px 24px}
    .sec-label{display:inline-block;font-size:.72rem;font-weight:700;color:#7b2fa8;background:#f0e6fc;padding:4px 12px;border-radius:20px;margin-bottom:10px}
    .sec-title{font-size:clamp(1.4rem,3vw,2rem);font-weight:800;color:#1a0a24;line-height:1.4;margin-bottom:8px}
    .sec-sub{font-size:.9rem;color:#666;line-height:1.8;margin-bottom:32px}
    .sec-divider{border:none;border-top:1px solid #f0e6fc;margin:0}
    .diag-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px}
    .diag-card{background:#faf5ff;border:1px solid #e8d6f5;border-radius:14px;padding:20px}
    .diag-num{font-size:.75rem;font-weight:800;color:#7b2fa8;margin-bottom:8px}
    .diag-title{font-size:.95rem;font-weight:800;color:#370558;margin-bottom:6px}
    .diag-desc{font-size:.82rem;color:#666;line-height:1.6}
    .sys-step{display:flex;gap:16px;align-items:flex-start;padding:16px 0;border-bottom:1px solid #f0e6fc}
    .sys-step:last-child{border-bottom:none}
    .step-num{width:36px;height:36px;border-radius:50%;background:#510580;color:white;font-size:.88rem;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
    .step-title{font-size:.95rem;font-weight:800;color:#370558;margin-bottom:4px}
    .step-desc{font-size:.82rem;color:#666;line-height:1.6}
    .teacher-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px}
    .teacher-card{background:#faf5ff;border:1px solid #e8d6f5;border-radius:14px;padding:20px}
    .teacher-icon{font-size:1.8rem;margin-bottom:10px}
    .teacher-title{font-size:.95rem;font-weight:800;color:#370558;margin-bottom:6px}
    .teacher-desc{font-size:.82rem;color:#666;line-height:1.6}
    /* 수업 찾기 */
    .find-tabs{display:flex;justify-content:center;gap:8px;margin:20px 0 24px;flex-wrap:wrap}
    .find-tab{background:white;color:#370558;border:1.5px solid #e8d6f5;border-radius:50px;padding:10px 22px;font-size:.88rem;font-weight:700;cursor:pointer;font-family:inherit;transition:all .15s}
    .find-tab:hover{border-color:#510580;background:#faf5ff}
    .find-tab-active{background:#510580;color:white;border-color:#510580}
    .find-tab-active:hover{background:#370558;border-color:#370558}
    .find-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;max-width:900px;margin:0 auto}
    .find-grid-subject{grid-template-columns:repeat(2,1fr)}
    .find-card{display:flex;align-items:center;gap:10px;padding:14px 18px;background:white;border:1px solid #e8d6f5;border-radius:10px;text-decoration:none;color:#370558;font-weight:700;transition:all .15s}
    .find-card:hover{border-color:#510580;background:#faf5ff;transform:translateY(-1px)}
    .find-icon{font-size:1.1rem;flex-shrink:0}
    .find-name{font-size:.92rem}
    .img-banner{position:relative;height:280px;overflow:hidden}
    .img-banner img{width:100%;height:100%;object-fit:cover;filter:brightness(.5)}
    .img-overlay{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;color:white}
    .img-overlay-title{font-size:clamp(1.4rem,3vw,2rem);font-weight:800;line-height:1.4;margin-bottom:10px}
    .img-overlay-sub{font-size:.9rem;opacity:.85}
    .review-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px}
    .review-card{background:white;border:1px solid #e8d6f5;border-radius:14px;padding:20px}
    .review-badge{display:inline-block;font-size:.72rem;font-weight:700;color:#510580;background:#f0e6fc;padding:3px 10px;border-radius:20px;margin-bottom:10px}
    .review-text{font-size:.85rem;color:#370558;line-height:1.7;margin-bottom:12px;font-style:italic}
    .review-author{font-size:.75rem;color:#9b6cc0;font-weight:700}
    .cta-sec{background:linear-gradient(140deg,#370558,#510580);padding:60px 24px;text-align:center}
    .cta-sec h2{font-size:clamp(1.4rem,3vw,2rem);font-weight:800;color:white;margin-bottom:10px}
    .cta-sec p{font-size:.9rem;color:rgba(255,255,255,.75);margin-bottom:28px}
    .cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
    .cta-phone{background:white;color:#510580;font-size:.95rem;font-weight:800;padding:13px 22px;border-radius:50px;text-decoration:none}
    .cta-kakao{background:#FEE500;color:#3A1D1D;font-size:.95rem;font-weight:800;padding:13px 22px;border-radius:50px;text-decoration:none;display:inline-flex;align-items:center;gap:6px}
    .cta-form{background:linear-gradient(135deg,#e8439a,#ff6fc1);color:white;font-size:.95rem;font-weight:800;padding:13px 22px;border-radius:50px;text-decoration:none}
    footer{background:#370558;color:rgba(255,255,255,.45);text-align:center;padding:24px;font-size:.78rem;line-height:1.8}
    footer p{color:rgba(255,255,255,.45);margin:2px 0}
    footer a{color:rgba(255,255,255,.6);text-decoration:none}
    @media(max-width:600px){.stats-inner{grid-template-columns:repeat(2,1fr)}.hero-btns,.cta-btns{flex-direction:column;align-items:center}}
    @media(min-width:768px){
      .find-grid{grid-template-columns:repeat(6,1fr);gap:10px}
      .find-grid-subject{grid-template-columns:repeat(4,1fr);max-width:960px}
      .find-card{padding:16px 20px}
      .find-icon{font-size:1.2rem}
      .find-name{font-size:1rem}
    }
  </style>
</head>
<body>
${HEADER_HTML}
<div class="hero">
  <div class="hero-badge">전국 방문 · 화상 과외 전문</div>
  <h1>우리 아이 성적 향상,<br>베테랑 선생님과 함께</h1>
  <p>전문 선생님의 1:1 맞춤 수업 · 초·중·고 전과목 내신 전문</p>
  <div class="hero-btns">
    <a href="${FORM_URL}" class="btn-pink" target="_blank">📝 체험신청</a>
    <a href="/regions/" class="btn-outline-w">지역별 과외 찾기 →</a>
  </div>
</div>
<div class="stats">
  <div class="stats-inner">
    <div><div class="stat-num">1:1</div><div class="stat-label">완전 맞춤 수업</div></div>
    <div><div class="stat-num">전과목</div><div class="stat-label">초·중·고 전과목</div></div>
    <div><div class="stat-num">방문·화상</div><div class="stat-label">수업 방식 선택</div></div>
    <div><div class="stat-num">무료</div><div class="stat-label">시범수업 제공</div></div>
  </div>
</div>

<!-- 진단 검사 -->
<div style="background:#fff">
<div class="sec">
  <div class="sec-label">진단 검사</div>
  <div class="sec-title">우리 아이의 학습 상태,<br>정확하게 파악하고 있나요?</div>
  <div class="sec-sub">표면적인 성적만으로는 진짜 문제를 알 수 없습니다.<br>상담 전 학습 진단으로 맞춤 학습 방향을 설계해 드립니다.</div>
  <div class="diag-grid">
    <div class="diag-card"><div class="diag-num">01</div><div class="diag-title">학습 수준 진단</div><div class="diag-desc">현재 학습 수준과 취약 단원을 정확히 파악합니다</div></div>
    <div class="diag-card"><div class="diag-num">02</div><div class="diag-title">학습 성향 분석</div><div class="diag-desc">아이에 맞는 최적의 학습 방법을 찾습니다</div></div>
    <div class="diag-card"><div class="diag-num">03</div><div class="diag-title">목표 설정 상담</div><div class="diag-desc">내신·수능 목표에 맞는 단기·장기 플랜을 수립합니다</div></div>
    <div class="diag-card"><div class="diag-num">04</div><div class="diag-title">선생님 매칭</div><div class="diag-desc">진단 결과를 바탕으로 최적의 선생님을 배정합니다</div></div>
  </div>
</div>
</div>

<hr class="sec-divider">

<!-- 학습 시스템 -->
<div style="background:#faf5ff">
<div class="sec">
  <div class="sec-label">학습 시스템</div>
  <div class="sec-title">수업 시작부터 성적 향상까지<br>체계적인 5단계 관리</div>
  <div class="sec-sub">단순한 과외가 아닙니다. 처음부터 끝까지 책임지는 시스템입니다.</div>
  <div class="sys-step"><div class="step-num">1</div><div><div class="step-title">무료 상담 · 진단</div><div class="step-desc">학생의 현재 수준, 목표 성적, 학습 성향을 파악합니다</div></div></div>
  <div class="sys-step"><div class="step-num">2</div><div><div class="step-title">선생님 매칭</div><div class="step-desc">진단 결과에 맞는 검증된 전담 선생님을 배정합니다</div></div></div>
  <div class="sys-step"><div class="step-num">3</div><div><div class="step-title">무료 시범수업</div><div class="step-desc">첫 수업은 무료로 진행, 수업 방향을 확인하고 결정합니다</div></div></div>
  <div class="sys-step"><div class="step-num">4</div><div><div class="step-title">맞춤 커리큘럼 수업</div><div class="step-desc">학생 목표에 맞는 커리큘럼으로 매주 체계적으로 수업합니다</div></div></div>
  <div class="sys-step"><div class="step-num">5</div><div><div class="step-title">정기 피드백 · 성적 관리</div><div class="step-desc">수업 후 학부모님께 학습 현황을 피드백, 성적 향상을 함께 관리합니다</div></div></div>
</div>
</div>

<hr class="sec-divider">

<!-- 선생님 자질 -->
<div style="background:#fff">
<div class="sec">
  <div class="sec-label">선생님 자질 · 역량</div>
  <div class="sec-title">아무 선생님이 아닙니다<br>검증된 베테랑 선생님입니다</div>
  <div class="sec-sub">제나쌤 스터디핏의 선생님은 까다로운 검증 과정을 통과한 분들입니다.</div>
  <div class="teacher-grid">
    <div class="teacher-card"><div class="teacher-icon">🎓</div><div class="teacher-title">학력 · 경력 검증</div><div class="teacher-desc">출신 대학, 전공, 과외 경력을 꼼꼼히 확인합니다</div></div>
    <div class="teacher-card"><div class="teacher-icon">📋</div><div class="teacher-title">수업 역량 평가</div><div class="teacher-desc">실제 수업 방식과 설명력을 직접 평가합니다</div></div>
    <div class="teacher-card"><div class="teacher-icon">💬</div><div class="teacher-title">소통 능력</div><div class="teacher-desc">학생·학부모와의 원활한 소통 능력을 중요시합니다</div></div>
    <div class="teacher-card"><div class="teacher-icon">🔄</div><div class="teacher-title">선생님 교체 보장</div><div class="teacher-desc">수업이 맞지 않으면 언제든 선생님을 교체해 드립니다</div></div>
  </div>
</div>
</div>

<!-- 수업 찾기 -->
<div style="background:#faf5ff">
<div class="sec">
  <div class="sec-label">FIND YOUR CLASS</div>
  <div class="sec-title">수업 찾기</div>
  <div class="sec-sub">원하는 카테고리를 선택하세요</div>
  <div class="find-tabs">
    <button class="find-tab find-tab-active" data-tab="region">📍 지역별 과외</button>
    <button class="find-tab" data-tab="subject">📚 과목별 과외</button>
  </div>
  <div class="find-grid find-grid-region" id="find-region">
    <a href="/regions/#city-서울특별시" class="find-card"><span class="find-icon">🔸</span><span class="find-name">서울</span></a>
    <a href="/regions/#city-경기도" class="find-card"><span class="find-icon">🔸</span><span class="find-name">경기</span></a>
    <a href="/regions/#city-인천광역시" class="find-card"><span class="find-icon">🔸</span><span class="find-name">인천</span></a>
    <a href="/regions/#city-부산광역시" class="find-card"><span class="find-icon">🔸</span><span class="find-name">부산</span></a>
    <a href="/regions/#city-대구광역시" class="find-card"><span class="find-icon">🔸</span><span class="find-name">대구</span></a>
    <a href="/regions/#city-대전광역시" class="find-card"><span class="find-icon">🔸</span><span class="find-name">대전</span></a>
    <a href="/regions/#city-광주광역시" class="find-card"><span class="find-icon">🔸</span><span class="find-name">광주</span></a>
    <a href="/regions/#city-울산광역시" class="find-card"><span class="find-icon">🔸</span><span class="find-name">울산</span></a>
    <a href="/regions/#city-세종시" class="find-card"><span class="find-icon">🔸</span><span class="find-name">세종</span></a>
    <a href="/regions/#city-강원도" class="find-card"><span class="find-icon">🔸</span><span class="find-name">강원</span></a>
    <a href="/regions/#city-충청북도" class="find-card"><span class="find-icon">🔸</span><span class="find-name">충북</span></a>
    <a href="/regions/#city-충청남도" class="find-card"><span class="find-icon">🔸</span><span class="find-name">충남</span></a>
    <a href="/regions/#city-전라북도" class="find-card"><span class="find-icon">🔸</span><span class="find-name">전북</span></a>
    <a href="/regions/#city-전라남도" class="find-card"><span class="find-icon">🔸</span><span class="find-name">전남</span></a>
    <a href="/regions/#city-경상북도" class="find-card"><span class="find-icon">🔸</span><span class="find-name">경북</span></a>
    <a href="/regions/#city-경상남도" class="find-card"><span class="find-icon">🔸</span><span class="find-name">경남</span></a>
    <a href="/regions/#city-제주도" class="find-card"><span class="find-icon">🔸</span><span class="find-name">제주</span></a>
  </div>
  <div class="find-grid find-grid-subject" id="find-subject" style="display:none">
    <a href="/study/korean/" class="find-card"><span class="find-icon">📖</span><span class="find-name">국어</span></a>
    <a href="/study/english/" class="find-card"><span class="find-icon">🌍</span><span class="find-name">영어</span></a>
    <a href="/study/math/" class="find-card"><span class="find-icon">📐</span><span class="find-name">수학</span></a>
    <a href="/study/science/" class="find-card"><span class="find-icon">🔬</span><span class="find-name">과학</span></a>
    <a href="/study/social/" class="find-card"><span class="find-icon">🗺️</span><span class="find-name">사회</span></a>
    <a href="/study/history/" class="find-card"><span class="find-icon">📜</span><span class="find-name">한국사</span></a>
    <a href="/coding/" class="find-card"><span class="find-icon">💻</span><span class="find-name">코딩</span></a>
    <a href="/self-study/" class="find-card"><span class="find-icon">📋</span><span class="find-name">자기주도학습</span></a>
  </div>
</div>
</div>
<script>
(function(){
  var tabs = document.querySelectorAll('.find-tab');
  tabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      tabs.forEach(function(t){ t.classList.remove('find-tab-active'); });
      tab.classList.add('find-tab-active');
      var target = tab.getAttribute('data-tab');
      document.getElementById('find-region').style.display = (target === 'region') ? '' : 'none';
      document.getElementById('find-subject').style.display = (target === 'subject') ? '' : 'none';
    });
  });
})();
</script>

<!-- 이미지 배너 -->
<div class="img-banner">
  <img src="/images/main-banner.jpg" alt="공부하는 학생">
  <div class="img-overlay">
    <div class="img-overlay-title">우리 아이의 성적,<br>지금 바로 바꿀 수 있습니다</div>
    <div class="img-overlay-sub">베테랑 선생님과 1:1 맞춤 수업으로 시작하세요</div>
  </div>
</div>

<!-- 수업 후기 -->
<div style="background:#faf5ff">
<div class="sec">
  <div class="sec-label">수업 후기</div>
  <div class="sec-title">실제 수강생 후기로<br>직접 확인하세요</div>
  <div class="sec-sub">수강생 가족분들의 솔직한 후기입니다.</div>
  <div class="review-grid">
    <div class="review-card"><div class="review-badge">중3 · 수학</div><div class="review-text">"수학을 포기했던 아이가 선생님 만나고 3개월 만에 60점대에서 90점대로 올랐어요."</div><div class="review-author">남양주시 학부모</div></div>
    <div class="review-card"><div class="review-badge">고1 · 영어</div><div class="review-text">"내신 준비를 체계적으로 도와주셔서 처음으로 영어 1등급 받았습니다."</div><div class="review-author">구리시 학부모</div></div>
    <div class="review-card"><div class="review-badge">초5 · 국어</div><div class="review-text">"선생님이 흥미롭게 수업해 주셔서 책 읽는 걸 좋아하게 됐어요!"</div><div class="review-author">서울 강동구 학부모</div></div>
  </div>
</div>
</div>

<div class="cta-sec">
  <h2>지금 바로 무료 상담 받으세요</h2>
  <p>상담 후 무료 시범수업까지 — 부담 없이 시작하세요</p>
  <div class="cta-btns">
    <a href="tel:${PHONE}" class="cta-phone">📞 전화</a>
    <a href="${KAKAO_URL}" target="_blank" class="cta-kakao">
      <svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.7 1.644 5.08 4.148 6.538L5.2 20.4a.3.3 0 0 0 .438.328l4.07-2.7A11.4 11.4 0 0 0 12 18.6c5.523 0 10-3.477 10-7.8S17.523 3 12 3z" fill="#3A1D1D"/></svg>
      카카오톡
    </a>
    <a href="${FORM_URL}" target="_blank" class="cta-form">📝 체험신청</a>
  </div>
</div>
${FOOTER_HTML}
${FLOAT_HTML}
</body>
</html>`;
}

// ── 지역 페이지 (전국 시도→구→동) ────────────────────────────
export function buildRegionsPage() {
  // 시도 → 시(구 포함) → 구 → 동 3단계 구조로 그룹화
  // gu가 "고양시 덕양구" 형태면 → si="고양시", gu="덕양구"
  // gu가 "강남구" 형태면 → si=null, gu="강남구"

  const cityMap = {}; // city → siMap
  // siMap: si → guMap (si가 없으면 "__direct__" 키 사용)
  // guMap: gu → Set(dongs)

  for (const [city, gu, dong] of AREAS) {
    if (!cityMap[city]) cityMap[city] = {};
    let si, realGu;
    if (gu.includes(' ')) {
      const parts = gu.split(' ');
      si = parts[0];
      realGu = parts[1];
    } else {
      si = '__direct__';
      realGu = gu;
    }
    if (!cityMap[city][si]) cityMap[city][si] = {};
    if (!cityMap[city][si][realGu]) cityMap[city][si][realGu] = new Set();
    cityMap[city][si][realGu].add(dong);
  }

  const sortedCities = [...Object.keys(cityMap)].sort((a, b) => {
    const ai = CITY_ORDER.indexOf(a);
    const bi = CITY_ORDER.indexOf(b);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  let cityBlocksHtml = "";

  for (const city of sortedCities) {
    const siMap = cityMap[city];
    const cityKey = city.replace(/ /g, "_");

    // 전체 ㄱㄴㄷ 정렬 — __direct__ 안의 gu와 si 합쳐서 정렬
    const allItems = []; // {label, type: 'direct'|'si', si, guMap}
    for (const [gu, dongs] of Object.entries(siMap.__direct__ || {})) {
      allItems.push({ label: gu, type: 'direct', gu, dongs });
    }
    for (const si of Object.keys(siMap).filter(s => s !== '__direct__')) {
      allItems.push({ label: si, type: 'si', si, guMap: siMap[si] });
    }
    allItems.sort((a, b) => a.label.localeCompare(b.label));

    let siPillsHtml = "";
    let siAreasHtml = "";
    let totalCount = 0;

    for (const item of allItems) {
      totalCount++;
      if (item.type === 'direct') {
        const { gu, dongs } = item;
        const guKey = `${cityKey}_${gu.replace(/ /g, "_")}`;
        const dongArr = Array.from(dongs).sort();
        // 동이 1개이고 gu와 이름이 같으면 (거창군→거창군 등) 바로 페이지 링크
        if (dongArr.length === 1 && dongArr[0] === gu) {
          const href = `/${city}-${gu}-${gu}-중등-수학-과외/`.replace(/ /g, "-");
          siPillsHtml += `<a href="${href}" class="gu-pill" data-city="${city}" data-gu="${gu}" data-dong="${gu}" style="text-decoration:none;display:inline-block">${gu}</a>`;
        } else {
          siPillsHtml += `<button class="gu-pill" onclick="toggleDong('${cityKey}','${guKey}')" id="pill_${guKey}">${gu}</button>`;
          let dongChips = "";
          for (const dong of dongArr) {
            const href = `/${city}-${gu}-${dong}-중등-수학-과외/`.replace(/ /g, "-");
            dongChips += `<a href="${href}" class="dong-chip" data-city="${city}" data-gu="${gu}" data-dong="${dong}">${dong}</a>`;
          }
          siAreasHtml += `<div class="dong-area" id="dong_${guKey}" style="display:none">
  <div class="dong-area-header">
    <span class="dong-area-title">${gu} · 동/읍/면 선택</span>
    <span class="dong-area-close" onclick="closeDong('${cityKey}','${guKey}')">닫기 ✕</span>
  </div>
  <div class="dong-chips">${dongChips}</div>
</div>`;
        }
      } else {
        const { si, guMap } = item;
        const siKey = `${cityKey}_${si.replace(/ /g, "_")}`;
        siPillsHtml += `<button class="si-pill" onclick="toggleSi('${cityKey}','${siKey}')" id="sipill_${siKey}">${si}</button>`;
        let guPillsHtml2 = "";
        let dongAreasHtml2 = "";
        for (const [gu, dongs] of Object.entries(guMap).sort((a,b) => a[0].localeCompare(b[0]))) {
          const guKey = `${siKey}_${gu.replace(/ /g, "_")}`;
          guPillsHtml2 += `<button class="gu-pill2" onclick="toggleDong2('${siKey}','${guKey}')" id="pill2_${guKey}">${gu}</button>`;
          let dongChips = "";
          for (const dong of Array.from(dongs).sort()) {
            const fullGu = si + ' ' + gu;
            const href = `/${city}-${fullGu}-${dong}-중등-수학-과외/`.replace(/ /g, "-");
            dongChips += `<a href="${href}" class="dong-chip" data-city="${city}" data-gu="${fullGu}" data-dong="${dong}">${dong}</a>`;
          }
          dongAreasHtml2 += `<div class="dong-area2" id="dong2_${guKey}" style="display:none">
  <div class="dong-area-header">
    <span class="dong-area-title">${si} ${gu} · 동/읍/면 선택</span>
    <span class="dong-area-close" onclick="closeDong2('${siKey}','${guKey}')">닫기 ✕</span>
  </div>
  <div class="dong-chips">${dongChips}</div>
</div>`;
        }
        siAreasHtml += `<div class="si-area" id="siarea_${siKey}" style="display:none">
  <div class="gu-pills2">${guPillsHtml2}</div>
  ${dongAreasHtml2}
</div>`;
      }
    }

    cityBlocksHtml += `<div class="city-block" id="city-${city}" data-city="${city}">
  <div class="city-header">
    <span class="city-name">${city}</span>
    <span class="city-count">${totalCount}개 구/시</span>
  </div>
  <div class="city-body">
    <div class="gu-pills">${siPillsHtml}</div>
    ${siAreasHtml}
  </div>
</div>`;
  }

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>지역별 과외 찾기 | ${SITE_NAME}</title>
  <meta name="description" content="전국 방문·화상 과외 전문. 베테랑 선생님의 초·중·고 전과목 내신 맞춤 수업.">
  <link rel="canonical" href="${SITE_DOMAIN}/regions/">
  <meta property="og:image" content="${SITE_DOMAIN}/images/og-image.png">
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
    .filter-bar{background:white;padding:12px 20px;border-bottom:1px solid #e8d6f5;display:flex;gap:10px;align-items:center;flex-wrap:wrap;position:sticky;top:57px;z-index:100}
    .filter-label{font-size:.78rem;font-weight:700;color:#7b2fa8}
    .filter-select{border:1px solid #e8d6f5;border-radius:8px;padding:6px 10px;font-size:.82rem;color:#370558;background:white;cursor:pointer}
    .filter-search{border:1px solid #e8d6f5;border-radius:8px;padding:6px 12px;font-size:.82rem;color:#370558;flex:1;min-width:120px}
    .main-wrap{max-width:960px;margin:0 auto;padding:20px 16px}
    .city-block{background:white;border-radius:14px;border:1px solid #e8d6f5;margin-bottom:12px;overflow:hidden}
    .city-header{display:flex;justify-content:space-between;align-items:center;padding:13px 18px;background:#faf5ff;border-bottom:1px solid #f0e6fc}
    .city-name{font-size:.95rem;font-weight:800;color:#370558}
    .city-count{font-size:.72rem;color:#9b6cc0}
    .city-body{padding:14px 18px}
    .gu-pills{display:flex;flex-wrap:wrap;gap:8px}
    .si-pill,.gu-pill{background:#f0e6fc;border:1px solid #d4b8f5;border-radius:10px;padding:8px 18px;font-size:.88rem;font-weight:700;color:#510580;cursor:pointer;transition:all .15s}
    .si-pill:hover,.si-pill.active,.gu-pill:hover,.gu-pill.active{background:#510580;color:white;border-color:#510580}
    .si-area{margin-top:10px;padding:12px 14px;background:#f7f3fb;border-radius:10px;border:1px solid #e8d6f5;display:none}
    .gu-pills2{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:4px}
    .gu-pill2{background:#f0e6fc;border:1px solid #d4b8f5;border-radius:10px;padding:8px 18px;font-size:.88rem;font-weight:700;color:#510580;cursor:pointer;transition:all .15s}
    .gu-pill2:hover,.gu-pill2.active{background:#510580;color:white;border-color:#510580}
    .dong-area,.dong-area2{margin-top:10px;background:white;border-radius:10px;padding:12px 14px;border:1px solid #e8d6f5;display:none}
    .dong-area-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
    .dong-area-title{font-size:.82rem;font-weight:700;color:#510580}
    .dong-area-close{font-size:.75rem;color:#9b6cc0;cursor:pointer;padding:2px 8px;border-radius:6px;background:#f0e6fc}
    .dong-chips{display:flex;flex-wrap:wrap;gap:6px}
    .dong-chip{background:#faf5ff;border:1px solid #e8d6f5;border-radius:8px;padding:6px 13px;font-size:.82rem;color:#370558;text-decoration:none;transition:all .15s;white-space:nowrap}
    .dong-chip:hover{background:#510580;color:white;border-color:#510580}
    footer{background:#370558;color:rgba(255,255,255,.45);text-align:center;padding:20px;font-size:.75rem;line-height:1.8;margin-top:20px}
    footer p{color:rgba(255,255,255,.45);margin:2px 0}
    footer a{color:rgba(255,255,255,.6);text-decoration:none}
    footer a{color:rgba(255,255,255,.6);text-decoration:none}
  </style>
</head>
<body>
${HEADER_HTML}
<div class="hero">
  <h1>지역별 과외 찾기</h1>
  <p>원하는 지역을 선택하고 과목과 학년을 고르세요</p>
</div>
<div class="filter-bar">
  <span class="filter-label">학년</span>
  <select id="sel-grade" class="filter-select">
    <option value="">전체</option>
    <option>초등</option><option>중등</option><option>고등</option>
  </select>
  <span class="filter-label">과목</span>
  <select id="sel-subject" class="filter-select">
    <option value="">전체</option>
    <option>국어</option><option>영어</option><option>수학</option><option>과학</option><option>사회</option><option>한국사</option>
  </select>
  <input type="text" id="search-input" class="filter-search" placeholder="🔍 지역 검색...">
</div>
<div class="main-wrap" id="cityContainer">
${cityBlocksHtml}
</div>
${FOOTER_HTML}
${FLOAT_HTML}
<script>
function closeAll(cityKey) {
  document.querySelectorAll('[id^="siarea_' + cityKey + '"]').forEach(el => { el.style.display = 'none'; });
  document.querySelectorAll('[id^="sipill_' + cityKey + '"]').forEach(el => { el.classList.remove('active'); });
  document.querySelectorAll('[id^="dong_' + cityKey + '"]').forEach(el => { el.style.display = 'none'; });
  document.querySelectorAll('[id^="pill_' + cityKey + '"]').forEach(el => { el.classList.remove('active'); });
}
function toggleSi(cityKey, siKey) {
  const area = document.getElementById('siarea_' + siKey);
  const pill = document.getElementById('sipill_' + siKey);
  const isOpen = area.style.display !== 'none';
  closeAll(cityKey);
  if (!isOpen) { area.style.display = 'block'; pill.classList.add('active'); }
}
function toggleDong2(siKey, guKey) {
  const area = document.getElementById('dong2_' + guKey);
  const pill = document.getElementById('pill2_' + guKey);
  const isOpen = area.style.display !== 'none';
  document.querySelectorAll('[id^="dong2_' + siKey + '"]').forEach(el => { el.style.display = 'none'; });
  document.querySelectorAll('[id^="pill2_' + siKey + '"]').forEach(el => { el.classList.remove('active'); });
  if (!isOpen) { area.style.display = 'block'; pill.classList.add('active'); updateDongLinks(); }
}
function closeDong2(siKey, guKey) {
  document.getElementById('dong2_' + guKey).style.display = 'none';
  document.getElementById('pill2_' + guKey).classList.remove('active');
}
function toggleDong(cityKey, guKey) {
  const area = document.getElementById('dong_' + guKey);
  const pill = document.getElementById('pill_' + guKey);
  const isOpen = area.style.display !== 'none';
  closeAll(cityKey);
  if (!isOpen) { area.style.display = 'block'; pill.classList.add('active'); updateDongLinks(); }
}
function closeDong(cityKey, guKey) {
  document.getElementById('dong_' + guKey).style.display = 'none';
  document.getElementById('pill_' + guKey).classList.remove('active');
}
function updateDongLinks() {
  const grade = document.getElementById('sel-grade').value || '중등';
  const subject = document.getElementById('sel-subject').value || '수학';
  document.querySelectorAll('.dong-chip, a.gu-pill[data-dong]').forEach(chip => {
    const city = chip.dataset.city;
    const gu = chip.dataset.gu;
    const dong = chip.dataset.dong;
    if (city && gu && dong) {
      const href = '/' + city + '-' + gu + '-' + dong + '-' + grade + '-' + subject + '-과외/';
      chip.setAttribute('href', href.replace(/ /g, '-'));
    }
  });
}
document.getElementById('sel-grade').addEventListener('change', updateDongLinks);
document.getElementById('sel-subject').addEventListener('change', updateDongLinks);
document.getElementById('search-input').addEventListener('input', function() {
  const q = this.value.trim().toLowerCase();
  document.querySelectorAll('.city-block').forEach(block => {
    block.style.display = q === '' || block.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
});

// URL 해시(#city-시도이름)로 진입 시 해당 시도로 자동 스크롤 + 강조
(function(){
  function scrollToCity(){
    var hash = window.location.hash;
    if (!hash || !hash.startsWith('#city-')) return;
    var target = document.querySelector(decodeURIComponent(hash));
    if (!target) return;
    // 약간의 지연으로 sticky filter-bar 고려
    setTimeout(function(){
      // sticky 헤더(.site-header) + filter-bar 높이만큼 offset
      var header = document.querySelector('.site-header');
      var filterBar = document.querySelector('.filter-bar');
      var offset = 0;
      if (header) offset += header.offsetHeight;
      if (filterBar) offset += filterBar.offsetHeight;
      offset += 12; // 여유 공간
      var rect = target.getBoundingClientRect();
      var targetY = window.pageYOffset + rect.top - offset;
      window.scrollTo({top: targetY, behavior: 'smooth'});
      // 강조 효과: 잠깐 핑크 테두리·그림자
      target.style.transition = 'box-shadow .3s, border-color .3s';
      target.style.boxShadow = '0 0 0 3px #e8439a, 0 8px 20px rgba(232,67,154,.3)';
      target.style.borderColor = '#e8439a';
      setTimeout(function(){
        target.style.boxShadow = '';
        target.style.borderColor = '';
      }, 2500);
    }, 100);
  }
  scrollToCity();
  window.addEventListener('hashchange', scrollToCity);
})();
</script>
</body>
</html>`;
}

// ── 404 페이지 ────────────────────────────────────────────────
export function build404Page() {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>페이지를 찾을 수 없습니다 | ${SITE_NAME}</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;800&display=swap" rel="stylesheet">
  <style>
    ${HEADER_CSS}
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Noto Sans KR',sans-serif;background:#f7f3fb;color:#1a0a24;text-align:center;padding:60px 24px}
    h1{font-size:4rem;font-weight:800;color:#510580;margin-bottom:16px;margin-top:40px}
    p{font-size:1rem;color:#666;margin-bottom:28px}
    .btn-home{background:linear-gradient(135deg,#e8439a,#ff6fc1);color:white;padding:12px 28px;border-radius:50px;font-weight:700;text-decoration:none;display:inline-block}
  </style>
</head>
<body>
${HEADER_HTML}
<h1>404</h1>
<p>페이지를 찾을 수 없습니다.</p>
<a href="/" class="btn-home">홈으로 돌아가기</a>
</body>
</html>`;
}
