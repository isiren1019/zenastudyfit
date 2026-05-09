// ================================================================
// layout.js — 전 페이지 공통 UI 레이아웃
// 변경 빈도: 낮음 (네비게이션 메뉴 추가/수정 시에만 건드림)
// 의존: config.js (SITE_NAME, PHONE, FORM_URL, KAKAO_URL, STUDY_READY)
// ================================================================

import { SITE_NAME, PHONE, FORM_URL, KAKAO_URL, STUDY_READY } from './config.js';

// ── 공통 헤더 CSS ────────────────────────────────────────────
export const HEADER_CSS = `
  .site-header{background:white;padding:13px 24px;border-bottom:2px solid #e8d6f5;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:200;box-shadow:0 2px 12px rgba(81,5,128,.06)}
  .site-logo{font-size:1.05rem;font-weight:800;color:#510580;text-decoration:none}
  .site-nav{display:flex;gap:10px;align-items:center}
  .nav-item{position:relative}
  .nav-link{font-size:.85rem;color:#444;padding:7px 12px;border-radius:8px;cursor:pointer;display:flex;align-items:center;gap:4px;text-decoration:none;white-space:nowrap;font-weight:700;background:none;border:none}
  .nav-link:hover{background:#f5eefe;color:#510580}
  .nav-arrow{font-size:.6rem;color:#aaa;transition:transform .2s;display:inline-block}
  .nav-arrow.open{transform:rotate(180deg);color:#510580}
  .nav-dropdown{display:none;position:absolute;top:calc(100% + 6px);left:0;background:white;border:1px solid #e8d6f5;border-radius:12px;min-width:210px;overflow:hidden;z-index:300;box-shadow:0 4px 16px rgba(81,5,128,.10)}
  .nav-dropdown.open{display:block}
  .nav-dropdown-item{display:flex;align-items:center;gap:10px;padding:11px 14px;font-size:.82rem;color:#370558;text-decoration:none;border-bottom:1px solid #f5eefe;transition:background .12s}
  .nav-dropdown-item:last-child{border-bottom:none}
  .nav-dropdown-item:hover{background:#faf5ff}
  .nav-dropdown-icon{width:26px;height:26px;border-radius:6px;background:#f0e6fc;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0}
  .nav-dropdown-title{font-size:.82rem;font-weight:700;color:#370558}
  .nav-dropdown-sub{font-size:.7rem;color:#9b6cc0;margin-top:1px}
  .nav-badge-soon{font-size:.65rem;background:#f0e6fc;color:#7b2fa8;padding:1px 6px;border-radius:10px;margin-left:4px;font-weight:700}
  .nav-cta-btn{background:linear-gradient(135deg,#e8439a,#ff6fc1);color:white !important;font-size:.82rem;font-weight:700;padding:8px 16px;border-radius:50px;text-decoration:none;white-space:nowrap;box-shadow:0 3px 12px rgba(232,67,154,.35)}
  .hamburger{display:none;background:none;border:none;cursor:pointer;padding:6px;border-radius:8px;color:#510580;font-size:1.4rem;line-height:1}
  .mobile-menu{display:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:500;background:rgba(0,0,0,.4)}
  .mobile-menu-panel{position:absolute;top:0;right:0;width:75%;max-width:300px;height:100%;background:white;padding:20px;overflow-y:auto;box-shadow:-4px 0 20px rgba(81,5,128,.15)}
  .mobile-menu-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid #f0e6fc}
  .mobile-menu-logo{font-size:.95rem;font-weight:800;color:#510580}
  .mobile-menu-close{background:none;border:none;font-size:1.3rem;cursor:pointer;color:#888;padding:4px}
  .mobile-menu-item{display:block;padding:13px 4px;font-size:.95rem;font-weight:700;color:#370558;text-decoration:none;border-bottom:1px solid #f5eefe}
  .mobile-menu-item:last-child{border-bottom:none}
  .mobile-menu-sub{display:block;padding:10px 16px;font-size:.85rem;color:#510580;text-decoration:none;background:#faf5ff;border-radius:8px;margin:4px 0}
  .mobile-menu-sub:hover{background:#f0e6fc}
  .mobile-menu-cta{display:block;margin-top:20px;background:linear-gradient(135deg,#e8439a,#ff6fc1);color:white;font-size:.9rem;font-weight:700;padding:13px;border-radius:50px;text-align:center;text-decoration:none}
  @media(max-width:600px){
    .nav-plain{display:none !important}
    .nav-cta-btn{display:none !important}
    .hamburger{display:flex;align-items:center;justify-content:center}
  }
`;

// ── 공통 헤더 HTML (네비게이션, 모바일 메뉴, 토글 JS 포함) ──────
export const HEADER_HTML = `<header class="site-header">
  <a href="/" class="site-logo">🎓 ${SITE_NAME}</a>
  <nav class="site-nav">
    <div class="nav-item">
      <span class="nav-link nav-plain" onclick="toggleDropdown(event,'navDropdown','navArrow')" style="cursor:pointer">일대일 과외 <span class="nav-arrow" id="navArrow">▾</span></span>
      <div class="nav-dropdown" id="navDropdown">
        <a href="/regions/" class="nav-dropdown-item">
          <div class="nav-dropdown-icon">📍</div>
          <div>
            <div class="nav-dropdown-title">지역별 과외</div>
            <div class="nav-dropdown-sub">동네 방문 · 화상 수업</div>
          </div>
        </a>
        <a href="/schools/" class="nav-dropdown-item">
          <div class="nav-dropdown-icon">🏫</div>
          <div>
            <div class="nav-dropdown-title">학교별 과외</div>
            <div class="nav-dropdown-sub">학교 내신 전문 대비</div>
          </div>
        </a>
      </div>
    </div>
    <div class="nav-item">
      <span class="nav-link nav-plain" onclick="toggleDropdown(event,'subjectDropdown','subjectArrow')" style="cursor:pointer">과목별 <span class="nav-arrow" id="subjectArrow">▾</span></span>
      <div class="nav-dropdown" id="subjectDropdown">
        <a href="/study/" class="nav-dropdown-item">
          <div class="nav-dropdown-icon">📚</div>
          <div>
            <div class="nav-dropdown-title">과목별 공부법</div>
            <div class="nav-dropdown-sub">국·영·수·사·과 가이드</div>
          </div>
        </a>
        ${[
          ["korean","📖","국어"],
          ["english","🌍","영어"],
          ["math","📐","수학"],
          ["science","🔬","과학"],
          ["social","🗺️","사회"],
          ["history","📜","한국사"],
        ].map(([key,icon,name]) => STUDY_READY[key]
          ? `<a href="/study/${key}/" class="nav-dropdown-item"><div class="nav-dropdown-icon">${icon}</div><div><div class="nav-dropdown-title">${name}</div></div></a>`
          : `<span class="nav-dropdown-item" style="cursor:not-allowed;opacity:.55"><div class="nav-dropdown-icon">${icon}</div><div><div class="nav-dropdown-title">${name}<span class="nav-badge-soon">준비중</span></div></div></span>`
        ).join("")}
      </div>
    </div>
    <div class="nav-item">
      <span class="nav-link nav-plain" onclick="toggleDropdown(event,'langDropdown','langArrow')" style="cursor:pointer">제2외국어 <span class="nav-arrow" id="langArrow">▾</span></span>
      <div class="nav-dropdown" id="langDropdown">
        <a href="/language/english/" class="nav-dropdown-item">
          <div class="nav-dropdown-icon">🇺🇸</div>
          <div>
            <div class="nav-dropdown-title">영어 회화</div>
            <div class="nav-dropdown-sub">생활·비즈니스·수험 영어</div>
          </div>
        </a>
        <a href="/language/japanese/" class="nav-dropdown-item">
          <div class="nav-dropdown-icon">🇯🇵</div>
          <div>
            <div class="nav-dropdown-title">일본어 회화</div>
            <div class="nav-dropdown-sub">입문·JLPT·여행·비즈니스</div>
          </div>
        </a>
        <a href="/language/chinese/" class="nav-dropdown-item">
          <div class="nav-dropdown-icon">🇨🇳</div>
          <div>
            <div class="nav-dropdown-title">중국어 회화</div>
            <div class="nav-dropdown-sub">입문·HSK·여행·비즈니스</div>
          </div>
        </a>
      </div>
    </div>
    <a href="/self-study/" class="nav-link nav-plain">자기주도학습</a>
    <a href="/coding/" class="nav-link nav-plain">코딩</a>
    <a href="${FORM_URL}" target="_blank" class="nav-cta-btn">📝 무료 상담 신청</a>
    <button class="hamburger" onclick="openMobileMenu()" aria-label="메뉴">☰</button>
  </nav>
</header>

<div class="mobile-menu" id="mobileMenu" onclick="closeMobileMenuOutside(event)">
  <div class="mobile-menu-panel">
    <div class="mobile-menu-header">
      <span class="mobile-menu-logo">🎓 ${SITE_NAME}</span>
      <button class="mobile-menu-close" onclick="closeMobileMenu()">✕</button>
    </div>
    <div style="font-size:.72rem;color:#9b6cc0;font-weight:700;margin-bottom:8px;padding:0 4px">일대일 과외</div>
    <a href="/regions/" class="mobile-menu-sub">📍 지역별 과외</a>
    <a href="/schools/" class="mobile-menu-sub">🏫 학교별 과외</a>
    <div style="font-size:.72rem;color:#9b6cc0;font-weight:700;margin:16px 0 8px;padding:0 4px">과목별 공부법</div>
    <a href="/study/" class="mobile-menu-sub">📚 과목별 공부법 메인</a>
    ${[
      ["korean","📖","국어"],
      ["english","🌍","영어"],
      ["math","📐","수학"],
      ["science","🔬","과학"],
      ["social","🗺️","사회"],
      ["history","📜","한국사"],
    ].map(([key,icon,name]) => STUDY_READY[key]
      ? `<a href="/study/${key}/" class="mobile-menu-sub">${icon} ${name}</a>`
      : `<span class="mobile-menu-sub" style="cursor:not-allowed;opacity:.55">${icon} ${name}<span class="nav-badge-soon">준비중</span></span>`
    ).join("")}
    <div style="font-size:.72rem;color:#9b6cc0;font-weight:700;margin:16px 0 8px;padding:0 4px">제2외국어 회화</div>
    <a href="/language/english/" class="mobile-menu-sub">🇺🇸 영어 회화</a>
    <a href="/language/japanese/" class="mobile-menu-sub">🇯🇵 일본어 회화</a>
    <a href="/language/chinese/" class="mobile-menu-sub">🇨🇳 중국어 회화</a>
    <a href="/self-study/" class="mobile-menu-item" style="margin-top:8px">자기주도학습</a>
    <a href="/coding/" class="mobile-menu-item">코딩</a>
    <a href="${FORM_URL}" target="_blank" class="mobile-menu-cta">📝 무료 상담 신청</a>
  </div>
</div>
<script>
function toggleDropdown(e,dropId,arrowId){
  e.stopPropagation();
  var allDrops=document.querySelectorAll('.nav-dropdown');
  var allArrows=document.querySelectorAll('.nav-arrow');
  var d=document.getElementById(dropId);
  var a=document.getElementById(arrowId);
  for(var i=0;i<allDrops.length;i++){if(allDrops[i]!==d)allDrops[i].classList.remove('open');}
  for(var i=0;i<allArrows.length;i++){if(allArrows[i]!==a)allArrows[i].classList.remove('open');}
  d.classList.toggle('open');
  a.classList.toggle('open');
}
document.addEventListener('click',function(){
  var allDrops=document.querySelectorAll('.nav-dropdown');
  var allArrows=document.querySelectorAll('.nav-arrow');
  for(var i=0;i<allDrops.length;i++)allDrops[i].classList.remove('open');
  for(var i=0;i<allArrows.length;i++)allArrows[i].classList.remove('open');
});
function openMobileMenu(){document.getElementById('mobileMenu').style.display='block';document.body.style.overflow='hidden'}
function closeMobileMenu(){document.getElementById('mobileMenu').style.display='none';document.body.style.overflow=''}
function closeMobileMenuOutside(e){if(e.target===document.getElementById('mobileMenu'))closeMobileMenu()}
</script>`;

// ── 공통 푸터 HTML ────────────────────────────────────────────
export const FOOTER_HTML = `<footer>
  <p>${SITE_NAME} · 이수진 · ${PHONE} · aquarai@naver.com</p>
  <p style="margin-top:8px">COPYRIGHT &copy; 제나쌤스터디핏. All Rights Reserved.
    &nbsp;│&nbsp;<a href="/privacy/" style="color:rgba(255,255,255,.6);text-decoration:none">개인정보처리방침</a>
    &nbsp;│&nbsp;<a href="/terms/" style="color:rgba(255,255,255,.6);text-decoration:none">이용약관</a>
  </p>
</footer>`;

// ── 플로팅 상담 버튼 HTML (전화·카카오톡·신청 폼) ──────────────
export const FLOAT_HTML = `<div class="float-wrap">
  <a href="${FORM_URL}" target="_blank" class="float-btn form">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
    <span class="float-label">무료 체험 신청</span>
  </a>
  <a href="${KAKAO_URL}" target="_blank" class="float-btn kakao">
    <svg width="26" height="26" viewBox="0 0 24 24"><path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.7 1.644 5.08 4.148 6.538L5.2 20.4a.3.3 0 0 0 .438.328l4.07-2.7A11.4 11.4 0 0 0 12 18.6c5.523 0 10-3.477 10-7.8S17.523 3 12 3z" fill="#3A1D1D"/></svg>
    <span class="float-label">카카오톡 상담</span>
  </a>
  <a href="tel:${PHONE}" class="float-btn phone">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6.29 6.29l.98-.98a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    <span class="float-label">전화 상담</span>
  </a>
</div>`;

// ── 플로팅 버튼 CSS ──────────────────────────────────────────
export const FLOAT_CSS = `
  .float-wrap{position:fixed;bottom:28px;right:20px;display:flex;flex-direction:column;align-items:center;gap:12px;z-index:400}
  .float-btn{width:54px;height:54px;border-radius:50%;display:flex;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 4px 16px rgba(0,0,0,.2);transition:transform .15s;position:relative}
  .float-btn:hover{transform:translateY(-3px)}
  .float-btn.form{background:#22c55e}
  .float-btn.kakao{background:#FEE500}
  .float-btn.phone{background:#4f1787}
  .float-label{position:absolute;right:62px;background:rgba(30,10,40,.85);color:white;font-size:.7rem;font-weight:700;padding:4px 10px;border-radius:20px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .2s}
  .float-btn:hover .float-label{opacity:1}
  @media(max-width:600px){
    .float-wrap{bottom:20px;right:14px;gap:10px}
    .float-btn{width:50px;height:50px}
    .float-label{display:none}
  }
`;
