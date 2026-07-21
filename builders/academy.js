// ================================================================
// builders/academy.js — 학원 페이지 빌더
// 변경 빈도: 중간 (학원 소개·지점 데이터 추가 시)
// 의존:
//   - config.js (SITE_NAME, SITE_DOMAIN, FORM_URL, KAKAO_URL, PHONE, ACADEMY_READY)
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
// 후기 추가/수정: ACADEMY_REVIEWS 배열에서 객체 추가/수정/삭제만 하면 됨
//   { branch: "지점명", grade: "학년", subject: "과목", text: "후기 본문" }
//
// 지점별 수업료 추가/수정: PRICING_GROUPS 배열에서 그룹별 데이터 수정
// ================================================================

import { SITE_NAME, SITE_DOMAIN, FORM_URL, KAKAO_URL, PHONE, ACADEMY_READY } from '../config.js';
import { HEADER_CSS, HEADER_HTML, FOOTER_HTML, FLOAT_CSS, FLOAT_HTML } from '../layout.js';
import { ACADEMY_CENTERS } from '../data/academy/centers.js';


// ── 후기 데이터 (추가/수정 시 이 배열만 수정) ───────────────────
const ACADEMY_REVIEWS = [
  {
    branch: "신도림점",
    grade: "고등",
    subject: "영어",
    text: "6등급에서 1등급으로 성적 올랐습니다. 문법과 모의고사로 기본 학습을 다지고, 시험 2주전부터는 다양한 학교의 기출문제를 풀어본 것이 도움이 되었습니다."
  },
  {
    branch: "복산점",
    grade: "중등",
    subject: "영어",
    text: "중간고사 40점에서 80점으로 향상했는데, 선생님의 맞춤 학습과 세심한 지도, 자기주도학습을 세운 덕분이라고 생각합니다."
  },
  {
    branch: "반월당점",
    grade: "중3",
    subject: "국어",
    text: "학원 다니면서 스스로 계획을 세우고 실천하는 습관이 생겼고, 부족한 과목에 대한 자신감도 생겼어요. 선생님과 소통을 통해 공부에 대한 태도가 달라지고, 자존감과 목표의식이 높아졌습니다."
  },
  {
    branch: "화정점",
    grade: "초등",
    subject: "영어",
    text: "코칭 수업을 하면서 나 자신을 점점 알아가고, 앞으로 어떻게 공부를 해야 할지 알 수 있어서 좋았습니다."
  },
  {
    branch: "종암점",
    grade: "중등",
    subject: "국어",
    text: "평소 시험기간에 계획을 세우지 않고 무작정 공부했는데, 학원을 만나면서 시험 기간 계획을 세우기 시작했습니다. 계획을 잘 따르고, 차근차근 풀었더니 예전보다 더 좋은 성적을 얻어 기쁘고 뿌듯했습니다."
  },
  {
    branch: "동탄호수점",
    grade: "고등",
    subject: "수학",
    text: "학생 개인적으로 잘 봐주시고, 학습코칭센터 이름에 맞게 평일 정규 수업뿐만 아니라, 주말 개별 수업이나 코칭 시간, 시험 기간 자습의 부족한 부분을 보충할 수 있는 환경 제공해 주십니다."
  },
  {
    branch: "마포점",
    grade: "초등",
    subject: "국어",
    text: "처음에는 코칭이라는 걸 잘 몰랐지만, 매주 목요일 1시간씩, 10개월 동안 하면서 익숙해졌고, 코칭 선생님이 주시는 새로운 주제의 문제를 이해할 수 있게 되었습니다."
  },
  {
    branch: "동래점",
    grade: "중등",
    subject: "영어",
    text: "학원에서 백지 노트 학습 방법이 가장 좋았는데, 각 단원이 끝날 때마다 배운 내용을 한 번 더 떠올리며 종이에 적음으로써 머릿속에 기억이 더 오래 남게 되는 것 같습니다."
  },
  {
    branch: "화정점",
    grade: "고등",
    subject: "수학",
    text: "처음에는 수학 성적만 바라고 공부해서 '플래너는 왜 쓰는 거지'라고 생각했는데, 점점 플래너를 적고 시간표대로 실행하면서 공부에 대한 효율을 높이고 계획을 지키는 것에 대해서 기분이 좋아졌어요."
  },
];


// ── 수업료 그룹 데이터 (추가/수정 시 이 배열만 수정) ────────────
const PRICING_GROUPS = [
  {
    regions: "서울 전지점 · 위례점 · 위례창곡점 · 미금점 · 영통점 · 동탄호수점 · 동탄목동점",
    frequencies: ["주 3회", "주 4회", "주 5회"],
    prices: [
      ["230,000", "247,000", "280,000"], // 주 3회: 초·중·고
      ["300,000", "322,000", "365,000"], // 주 4회
      ["370,000", "397,000", "450,000"], // 주 5회
    ],
  },
  {
    regions: "서울 외 지점",
    frequencies: ["주 3회", "주 4회", "주 5회"],
    prices: [
      ["200,000", "217,000", "250,000"],
      ["260,000", "282,000", "325,000"],
      ["320,000", "347,000", "400,000"],
    ],
  },
  {
    regions: "송도점 · 병점점 · 삼산점 · 청라점",
    frequencies: ["주 1회", "주 2회", "주 3회"],
    prices: [
      ["140,000", "152,000", "175,000"],
      ["260,000", "282,000", "325,000"],
      ["380,000", "412,000", "475,000"],
    ],
  },
];


// ── 후기 슬라이드 HTML 생성 ─────────────────────────────────────
function renderReviewSlides() {
  return ACADEMY_REVIEWS.map(r => `
          <div class="review-slide">
            <div class="review-card">
              <div class="review-head">
                <span class="review-stars">★★★★★</span>
                <span class="review-branch">${r.branch}</span>
              </div>
              <div class="review-tags">
                <span class="review-tag">${r.grade}</span>
                <span class="review-tag subject">${r.subject}</span>
              </div>
              <p class="review-text">"${r.text}"</p>
            </div>
          </div>`).join('\n');
}


// ── 수업료 테이블 HTML 생성 ─────────────────────────────────────
function renderPricingTables() {
  return PRICING_GROUPS.map(g => {
    const rows = g.frequencies.map((freq, i) => `
              <tr><td>${freq}</td><td>${g.prices[i][0]}</td><td>${g.prices[i][1]}</td><td>${g.prices[i][2]}</td></tr>`).join('');
    return `
        <div class="price-block">
          <p class="price-region">${g.regions}</p>
          <table class="price-table">
            <thead><tr><th></th><th>초등</th><th>중등</th><th>고등</th></tr></thead>
            <tbody>${rows}
            </tbody>
          </table>
        </div>`;
  }).join('\n');
}


// ── 학원 소개 페이지 CSS ────────────────────────────────────────
const ACADEMY_INTRO_CSS = `
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Noto Sans KR',sans-serif;background:white;color:#1a1a1a;line-height:1.6}
  .acm-wrap{max-width:1040px;margin:0 auto}
  .acm-eyebrow{display:inline-block;color:#e87a3c;font-size:12px;font-weight:700;letter-spacing:1.5px;margin-bottom:10px}
  .acm-h2{font-size:26px;font-weight:800;color:#1e4d3a;line-height:1.4;margin:0;letter-spacing:-0.5px}
  .acm-h2 .accent{color:#e87a3c}
  .acm-sub{font-size:14px;color:#5f5e5a;margin:12px 0 0;line-height:1.7}
  .grid-3{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px}
  .grid-2{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;align-items:center}

  /* HERO */
  .academy-hero{background:linear-gradient(135deg,#1e4d3a 0%,#2f7556 100%);padding:64px 24px 72px;text-align:center;color:white;position:relative;overflow:hidden}
  .academy-hero::before{content:'';position:absolute;top:-40px;right:-40px;width:200px;height:200px;background:rgba(232,122,60,.08);border-radius:50%}
  .academy-hero::after{content:'';position:absolute;bottom:-60px;left:-60px;width:240px;height:240px;background:rgba(255,255,255,.04);border-radius:50%}
  .academy-hero-inner{position:relative;max-width:800px;margin:0 auto}
  .academy-hero-badge{display:inline-block;background:rgba(232,122,60,.18);border:1px solid rgba(232,122,60,.4);border-radius:100px;padding:6px 18px;font-size:12px;font-weight:500;letter-spacing:.5px;margin-bottom:22px;color:#ffd9b8}
  .academy-hero h1{font-size:32px;font-weight:800;line-height:1.35;margin:0 0 18px;letter-spacing:-0.5px;color:white}
  .academy-hero h1 .hl{color:#ffb380}
  .academy-hero p.lead{font-size:15px;line-height:1.7;opacity:.92;margin:0 0 30px}
  .academy-hero p.lead .sm{font-size:13px;opacity:.75}
  .hero-btns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:14px}
  .hero-btn-primary{background:#e87a3c;color:white;padding:14px 28px;border-radius:100px;font-weight:700;font-size:14px;text-decoration:none;box-shadow:0 4px 16px rgba(232,122,60,.4);display:inline-flex;align-items:center;gap:6px}
  .hero-btn-secondary{background:rgba(255,255,255,.12);color:white;padding:14px 26px;border-radius:100px;font-weight:600;font-size:14px;text-decoration:none;border:1.5px solid rgba(255,255,255,.35);display:inline-flex;align-items:center;gap:6px}
  .hero-note{font-size:12px;opacity:.72;margin:14px 0 0}

  /* 신뢰지표 */
  .trust-section{background:#faf7f2;padding:48px 24px}
  .trust-grid{max-width:900px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px}
  .trust-card{background:white;border:1px solid #ebe5d8;border-radius:14px;padding:22px 12px;text-align:center}
  .trust-card .ico{font-size:28px;margin-bottom:6px}
  .trust-card .num{font-size:22px;font-weight:800;color:#1e4d3a}
  .trust-card .lbl{font-size:12px;color:#5f5e5a;margin-top:4px}

  /* WHY */
  .why-section{background:white;padding:64px 24px 72px}
  .why-wrap{max-width:900px;margin:0 auto}
  .why-header{text-align:center;margin-bottom:44px}
  .why-card{background:white;border:1px solid #ebe5d8;border-radius:16px;padding:28px 20px}
  .why-card-badge{display:inline-block;background:#e6f0eb;color:#1e4d3a;font-size:11px;font-weight:700;letter-spacing:1px;padding:4px 10px;border-radius:6px;margin-bottom:14px}
  .why-card h3{font-size:16px;font-weight:700;color:#1e4d3a;margin:0 0 10px;line-height:1.5}
  .why-card p{font-size:13px;color:#5f5e5a;line-height:1.7;margin:0}
  .why-card strong{color:#1e4d3a}

  /* 와와 학습 시스템 */
  .wawa-section{background:#faf7f2;padding:56px 20px 64px}
  .wawa-header{text-align:center;margin-bottom:36px}
  .wawa-tabs{display:flex;gap:8px;margin-bottom:24px;background:white;border-radius:14px;padding:8px;border:1px solid #ebe5d8}
  .wawa-tab{flex:1;padding:14px 12px;border:none;background:transparent;cursor:pointer;border-radius:10px;font-family:inherit;font-weight:700;color:#5f5e5a;transition:all .2s;text-align:center}
  .wawa-tab:hover{background:#faf7f2;color:#1e4d3a}
  .wawa-tab.active{background:linear-gradient(135deg,#1e4d3a 0%,#2f7556 100%);color:white;box-shadow:0 2px 8px rgba(30,77,58,.25)}
  .wawa-tab .tab-en{display:block;font-size:10px;letter-spacing:1px;opacity:.75;margin-bottom:2px}
  .wawa-tab .tab-ko{display:block;font-size:15px}
  .wawa-content{background:white;border-radius:18px;border:1px solid #ebe5d8;overflow:hidden;display:grid;grid-template-columns:1fr 1fr;gap:0}
  .wawa-image{aspect-ratio:4/3;overflow:hidden;background:#faf7f2}
  .wawa-image img{width:100%;height:100%;object-fit:cover;display:block}
  .wawa-info{padding:36px 32px;display:flex;flex-direction:column;justify-content:center}
  .wawa-info-eyebrow{font-size:11px;font-weight:700;color:#e87a3c;letter-spacing:1.2px;margin-bottom:8px}
  .wawa-info-title{font-size:22px;font-weight:800;color:#1e4d3a;line-height:1.4;margin:0 0 14px;letter-spacing:-0.5px}
  .wawa-info-desc{font-size:14px;color:#444;line-height:1.75;margin:0 0 18px;font-weight:500}
  .wawa-info-desc strong{color:#1e4d3a;font-weight:700}
  .wawa-info-list{padding-top:16px;border-top:1px solid #f0ece3;font-size:13px;color:#5f5e5a;line-height:1.9}
  .wawa-panel{display:none}
  .wawa-panel.active{display:contents}

  /* Why 학습코칭학원 비교표 */
  .compare-box{background:white;border-radius:18px;padding:32px 24px;border:1px solid #ebe5d8;margin-top:40px}
  .compare-header{text-align:center;margin-bottom:24px}
  .compare-badge{display:inline-block;background:#fde8d4;color:#b45309;font-size:11px;font-weight:700;letter-spacing:1.5px;padding:5px 14px;border-radius:100px;margin-bottom:12px}
  .compare-title{font-size:18px;font-weight:800;color:#1e4d3a;line-height:1.5;margin:0}
  .compare-title .accent{color:#e87a3c}
  .compare-table{width:100%;border-collapse:collapse;background:white;border-radius:12px;overflow:hidden;border:1px solid #ebe5d8;font-size:13px}
  .compare-table thead th{padding:16px 12px;font-size:14px;font-weight:800;text-align:center;background:#faf7f2;border-bottom:2px solid #ebe5d8;line-height:1.4}
  .compare-table thead th.col-vs{background:#1e4d3a;color:white;font-size:13px}
  .compare-table thead th.col-bad{color:#888780}
  .compare-table thead th.col-good{color:#1e4d3a}
  .compare-table tbody td{padding:14px;vertical-align:middle;border-bottom:1px solid #f5f1e8;line-height:1.6}
  .compare-table tbody tr:last-child td{border-bottom:none}
  .compare-table tbody td.cell-bad{text-align:right;color:#5f5e5a;font-size:12.5px}
  .compare-table tbody td.cell-bad em{color:#1a1a1a;font-style:normal;font-weight:700}
  .compare-table tbody td.cell-label{text-align:center;background:#faf7f2;color:#1e4d3a;font-weight:800;font-size:13px;width:60px}
  .compare-table tbody td.cell-good{text-align:left;color:#1a1a1a;font-weight:500;font-size:12.5px}
  .compare-table tbody td.cell-good em{color:#e87a3c;font-style:normal;font-weight:700}

  /* 4C 프로세스 */
  .fourc-section{background:white;padding:64px 20px 72px}
  .fourc-header{text-align:center;margin-bottom:36px}
  .fourc-intro{max-width:720px;margin:0 auto 44px;text-align:center}
  .fourc-intro p{font-size:14.5px;color:#444;line-height:1.9;margin:0;font-weight:500}
  .fourc-intro p + p{margin-top:14px;font-size:14px;color:#5f5e5a;font-weight:400}
  .fourc-intro .hl-orange{color:#e87a3c;font-weight:700}
  .fourc-intro .hl-green{color:#1e4d3a;font-weight:700}
  .fourc-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;align-items:stretch}
  .fourc-card{background:white;border:1px solid #ebe5d8;border-radius:18px;padding:32px 24px 28px;text-align:center;transition:transform .2s,box-shadow .2s;display:flex;flex-direction:column;align-items:center}
  .fourc-card:hover{transform:translateY(-3px);box-shadow:0 6px 24px rgba(30,77,58,.08)}
  .fourc-ico-wrap{display:inline-flex;align-items:center;justify-content:center;width:64px;height:64px;background:linear-gradient(135deg,#faf7f2 0%,#f0ece3 100%);border-radius:18px;margin-bottom:16px;font-size:30px;border:1px solid #ebe5d8;flex-shrink:0}
  .fourc-en{font-size:11px;font-weight:800;color:#e87a3c;letter-spacing:1.5px;margin-bottom:4px;height:16px;line-height:16px}
  .fourc-name{font-size:19px;font-weight:800;color:#1e4d3a;margin:0 0 14px;letter-spacing:-0.3px;height:28px;line-height:28px}
  .fourc-divider{width:100%;height:1px;border-top:1px dashed #ebe5d8;margin-bottom:14px}
  .fourc-desc{font-size:13px;color:#5f5e5a;line-height:1.65;margin:0;flex:1;display:flex;align-items:center;justify-content:center}

  /* CURRICULUM */
  .curr-section-wrap{background:#faf7f2;padding:64px 20px}
  .curr-header{text-align:center;margin-bottom:36px}
  .curr-section{display:flex;flex-direction:column;gap:20px}
  .curr-card{background:white;border-radius:20px;padding:36px 32px;border:1px solid #ebe5d8;position:relative;overflow:hidden}
  .curr-card::before{content:'';position:absolute;top:0;left:0;width:100%;height:5px;background:linear-gradient(90deg,#1e4d3a 0%,#2f7556 100%)}
  .curr-card.accent::before{background:linear-gradient(90deg,#e87a3c 0%,#ffb380 100%)}
  .curr-card-header{text-align:center;margin-bottom:28px}
  .curr-card-title{font-size:28px;font-weight:800;color:#1e4d3a;letter-spacing:-0.8px;margin:0 0 8px;display:inline-flex;align-items:center;gap:12px}
  .curr-card-title .ico{display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;background:#faf7f2;border-radius:14px;font-size:24px}
  .curr-card-sub{font-size:14.5px;color:#5f5e5a;margin:0;font-weight:500}
  .grade-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}
  .grade-card{background:#faf7f2;border-radius:16px;padding:24px 22px;border:1px solid #ebe5d8;transition:all .2s}
  .grade-card:hover{background:white;border-color:#c9bfa8;box-shadow:0 4px 14px rgba(30,77,58,.06)}
  .grade-card-name{font-size:18px;font-weight:800;color:#1e4d3a;margin:0 0 16px;padding-bottom:14px;border-bottom:2px solid #e6f0eb;display:flex;align-items:center;gap:10px}
  .grade-card-name .emoji{font-size:24px;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;background:white;border-radius:10px}
  .grade-card-points{list-style:none;padding:0;margin:0;font-size:13.5px;color:#444;line-height:1.9;font-weight:500}
  .grade-card-points li{padding-left:16px;position:relative}
  .grade-card-points li::before{content:'✓';position:absolute;left:0;color:#e87a3c;font-weight:800;font-size:12px;top:2px}
  .subject-chips{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px}
  .subject-chip-lg{background:#faf7f2;color:#1e4d3a;padding:20px 10px;border-radius:14px;text-align:center;font-weight:800;font-size:17px;border:1.5px solid #ebe5d8;transition:all .15s}
  .subject-chip-lg:hover{background:#e87a3c;color:white;border-color:#e87a3c;transform:translateY(-2px)}

  /* 지점 찾기 배너 */
  .branch-section{padding:56px 20px}
  .branch-cta{background:linear-gradient(135deg,#1e4d3a 0%,#2f7556 100%);border-radius:24px;padding:48px 32px;position:relative;overflow:hidden;box-shadow:0 10px 40px rgba(30,77,58,.18)}
  .branch-cta::before{content:'';position:absolute;top:-60px;right:-60px;width:240px;height:240px;background:rgba(232,122,60,.1);border-radius:50%}
  .branch-cta::after{content:'';position:absolute;bottom:-80px;left:-80px;width:280px;height:280px;background:rgba(255,255,255,.05);border-radius:50%}
  .branch-cta-inner{position:relative;max-width:720px;margin:0 auto;text-align:center}
  .branch-cta-badge{display:inline-block;background:rgba(232,122,60,.22);border:1px solid rgba(232,122,60,.4);border-radius:100px;padding:6px 16px;font-size:11.5px;font-weight:600;letter-spacing:1px;margin-bottom:18px;color:#ffd9b8}
  .branch-cta-title{font-size:26px;font-weight:800;color:white;line-height:1.4;margin:0 0 12px;letter-spacing:-0.5px}
  .branch-cta-title .hl{color:#ffb380}
  .branch-cta-desc{font-size:14px;color:rgba(255,255,255,.88);line-height:1.75;margin:0 0 26px}
  .branch-cta-btn{display:inline-flex;align-items:center;gap:8px;background:#e87a3c;color:white;padding:16px 36px;border-radius:100px;font-size:15px;font-weight:800;text-decoration:none;box-shadow:0 4px 16px rgba(232,122,60,.35)}

  /* FAQ */
  .faq-section{background:#faf7f2;padding:64px 20px 72px}
  .faq-header{text-align:center;margin-bottom:36px}
  .faq-item{background:white;border:1px solid #ebe5d8;border-radius:12px;margin-bottom:10px;overflow:hidden}
  .faq-q{display:flex;justify-content:space-between;align-items:center;padding:18px 22px;font-size:14.5px;font-weight:700;color:#1e4d3a}
  .faq-q::after{content:'−';font-size:22px;color:#e87a3c;font-weight:400}
  .faq-a{padding:16px 22px 20px;font-size:13.5px;color:#5f5e5a;line-height:1.8;border-top:1px dashed #ebe5d8}
  .faq-a strong{color:#1e4d3a}

  /* 수업료 테이블 */
  .price-block{margin-top:16px}
  .price-block + .price-block{margin-top:24px}
  .price-region{font-size:15px;color:#1e4d3a;font-weight:800;margin:0 0 10px;line-height:1.5;padding:10px 14px;background:#f0ece3;border-radius:8px;border-left:4px solid #1e4d3a}
  .price-table{width:100%;border-collapse:collapse;font-size:12.5px;background:white;border:1px solid #ebe5d8;border-radius:8px;overflow:hidden}
  .price-table th{background:#faf7f2;color:#1e4d3a;font-weight:700;padding:10px 8px;text-align:center;border-bottom:1px solid #ebe5d8;font-size:12px}
  .price-table td{padding:10px 8px;text-align:center;color:#444;border-bottom:1px solid #f5f1e8}
  .price-table tr:last-child td{border-bottom:none}
  .price-table th:first-child,.price-table td:first-child{font-weight:700;color:#1e4d3a;background:#fafaf7}

  /* 후기 슬라이드 */
  .reviews-section{background:white;padding:64px 20px 72px}
  .reviews-header{text-align:center;margin-bottom:36px}
  .reviews-container{position:relative}
  .reviews-viewport{overflow:hidden;margin:0 -8px}
  .reviews-track{display:flex;transition:transform .4s ease;will-change:transform}
  .review-slide{flex:0 0 calc(33.333% - 16px);margin:0 8px}
  .review-card{background:white;border-radius:14px;padding:24px 22px;border:1px solid #ebe5d8;height:100%;display:flex;flex-direction:column}
  .review-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
  .review-stars{color:#e87a3c;font-size:13px;letter-spacing:1px}
  .review-branch{background:linear-gradient(135deg,#1e4d3a 0%,#2f7556 100%);color:white;font-size:11.5px;font-weight:800;padding:4px 11px;border-radius:6px;letter-spacing:-0.3px}
  .review-tags{display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap}
  .review-tag{background:#faf7f2;color:#1e4d3a;font-size:11.5px;font-weight:700;padding:4px 10px;border-radius:100px;border:1px solid #ebe5d8}
  .review-tag.subject{background:#fde8d4;color:#b45309;border-color:#fac98d}
  .review-text{font-size:13px;color:#333;line-height:1.75;margin:0;font-weight:500;flex:1;padding-top:12px;border-top:1px dashed #ebe5d8}
  .reviews-controls{display:flex;justify-content:center;align-items:center;gap:16px;margin-top:28px}
  .review-arrow{width:40px;height:40px;border-radius:50%;background:white;border:1px solid #c9bfa8;color:#1e4d3a;cursor:pointer;font-size:18px;font-weight:700;display:flex;align-items:center;justify-content:center;transition:all .2s;font-family:inherit}
  .review-arrow:hover{background:#1e4d3a;color:white;border-color:#1e4d3a}
  .review-arrow:disabled{opacity:.4;cursor:not-allowed}
  .review-arrow:disabled:hover{background:white;color:#1e4d3a;border-color:#c9bfa8}
  .review-dots{display:flex;gap:6px}
  .review-dot{width:8px;height:8px;border-radius:50%;background:#d4cab3;border:none;cursor:pointer;padding:0;transition:all .2s}
  .review-dot.active{background:#e87a3c;width:24px;border-radius:4px}

  /* 최종 CTA */
  .cta-section{background:white;padding:56px 20px 64px}
  .cta-banner{background:linear-gradient(135deg,#1e4d3a 0%,#2f7556 100%);border-radius:24px;padding:56px 32px;position:relative;overflow:hidden;box-shadow:0 10px 40px rgba(30,77,58,.18)}
  .cta-banner::before{content:'';position:absolute;top:-60px;right:-60px;width:240px;height:240px;background:rgba(232,122,60,.1);border-radius:50%}
  .cta-banner::after{content:'';position:absolute;bottom:-80px;left:-80px;width:280px;height:280px;background:rgba(255,255,255,.05);border-radius:50%}
  .cta-banner-inner{position:relative;max-width:720px;margin:0 auto;text-align:center}
  .cta-badge{display:inline-block;background:rgba(232,122,60,.22);border:1px solid rgba(232,122,60,.4);border-radius:100px;padding:6px 16px;font-size:11.5px;font-weight:600;letter-spacing:1px;margin-bottom:18px;color:#ffd9b8}
  .cta-title{font-size:28px;font-weight:800;color:white;line-height:1.4;margin:0 0 14px;letter-spacing:-0.5px}
  .cta-title .hl{color:#ffb380}
  .cta-desc{font-size:14px;color:rgba(255,255,255,.88);line-height:1.75;margin:0 0 30px}
  .cta-btn-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;max-width:600px;margin:0 auto}
  .cta-btn-primary{background:#e87a3c;color:white;padding:22px 16px;border-radius:14px;text-decoration:none;display:block;box-shadow:0 4px 16px rgba(232,122,60,.35)}
  .cta-btn-secondary{background:rgba(255,255,255,.12);color:white;padding:22px 16px;border-radius:14px;text-decoration:none;display:block;border:1px solid rgba(255,255,255,.3)}
  .cta-btn-icon{font-size:26px;margin-bottom:8px}
  .cta-btn-label{font-size:15px;font-weight:800}

  /* 반응형 */
  @media (max-width:900px){
    .review-slide{flex:0 0 calc(50% - 16px)}
  }
  @media (max-width:767px){
    .wawa-content{grid-template-columns:1fr}
    .wawa-info{padding:24px 20px}
    .wawa-tab .tab-ko{font-size:13px}
    .cta-banner,.branch-cta{padding:36px 24px;border-radius:18px}
    .cta-title{font-size:22px}
    .branch-cta-title{font-size:20px}
  }
  @media (max-width:600px){
    .compare-table thead th{padding:12px 6px;font-size:11.5px}
    .compare-table tbody td{padding:12px 8px;font-size:11.5px}
    .compare-table tbody td.cell-label{width:44px;font-size:12px}
    .fourc-cards{grid-template-columns:repeat(2,1fr);gap:12px}
    .fourc-card{padding:24px 14px 22px}
    .fourc-ico-wrap{width:52px;height:52px;font-size:24px;margin-bottom:12px}
    .fourc-name{font-size:16px;height:24px;line-height:24px}
    .fourc-desc{font-size:12px}
    .curr-card{padding:28px 22px}
    .curr-card-title{font-size:22px}
    .curr-card-title .ico{width:40px;height:40px;font-size:20px}
    .grade-grid{grid-template-columns:1fr}
    .review-slide{flex:0 0 calc(100% - 16px)}
  }

  /* 푸터 (layout.js의 FOOTER_HTML 스타일링) */
  footer{background:#370558;color:rgba(255,255,255,.7);text-align:center;padding:32px 24px;font-size:13px;line-height:1.7;margin-top:0}
  footer p{margin:0}
  footer a{color:rgba(255,255,255,.6);text-decoration:none}
  footer a:hover{color:white}
`;


// ================================================================
// ── 학원 위치 안내 페이지 (location) ────────────────────────────
// ================================================================
//
// 시·도 데이터 추가/수정: ACADEMY_LOCATION_SIDOS 배열만 수정하면 됨
//   - count 합산은 자동(ACADEMY_LOCATION_TOTAL)
//   - 광역 묶음: 충청도(충남+충북), 대전·세종, 경상도(경북+경남), 제주·강원
//   - 추후 분리 가능하도록 sub 배열에 원본 시·도 보존
// ================================================================

const ACADEMY_LOCATION_SIDOS = [
  // Row 1
  { slug: "seoul",          name: "서울",      icon: "🌆",  count: 24,  desc: "15개 구",         sub: ["서울"] },
  { slug: "incheon",        name: "인천",      icon: "🌉",  count: 10,  desc: "8개 구",          sub: ["인천"] },
  { slug: "gyeonggi",       name: "경기",      icon: "🌿",  count: 100, desc: "22개 시·군",      sub: ["경기"] },
  { slug: "chungcheong",    name: "충청도",    icon: "🍑",  count: 12,  desc: "충남 6·충북 6",   sub: ["충남", "충북"] },
  // Row 2
  { slug: "daejeon-sejong", name: "대전·세종", icon: "🏢",  count: 10,  desc: "대전 9·세종 1",   sub: ["대전", "세종"] },
  { slug: "gwangju",        name: "광주",      icon: "🌸",  count: 6,   desc: "3개 구",          sub: ["광주"] },
  { slug: "jeonbuk",        name: "전북",      icon: "🌾",  count: 3,   desc: "전주 외",         sub: ["전북"] },
  { slug: "daegu",          name: "대구",      icon: "🍎",  count: 16,  desc: "7개 구",          sub: ["대구"] },
  // Row 3
  { slug: "ulsan",          name: "울산",      icon: "⚙️",  count: 4,   desc: "남구·북구",       sub: ["울산"] },
  { slug: "busan",          name: "부산",      icon: "🐟",  count: 5,   desc: "동래·해운대 외",  sub: ["부산"] },
  { slug: "gyeongsang",     name: "경상도",    icon: "🍇",  count: 8,   desc: "경북 5·경남 3",   sub: ["경북", "경남"] },
  { slug: "jeju-gangwon",   name: "제주·강원", icon: "🌺",  count: 7,   desc: "강원 6·제주 1",   sub: ["강원", "제주"] },
];

// 전체 지점 수 자동 합산 (히어로 카피·신뢰지표·메타 description에 사용)
const ACADEMY_LOCATION_TOTAL = ACADEMY_LOCATION_SIDOS.reduce((sum, s) => sum + s.count, 0);


// ── 학원 위치 허브 페이지 CSS ──────────────────────────────────
// ACADEMY_INTRO_CSS의 .trust-section / .trust-card / .cta-section / .cta-banner / .cta-btn-* 토큰 재사용
const ACADEMY_LOCATION_HUB_CSS = `
  /* 위치 허브 - 컨테이너 */
  .loc-wrap{max-width:1040px;margin:0 auto}

  /* 위치 허브 - 브래드크럼 */
  .loc-breadcrumb{background:#f5f1e8;padding:10px 24px;font-size:12px;color:#5f5e5a}
  .loc-breadcrumb a{color:#5f5e5a;text-decoration:none}
  .loc-breadcrumb a:hover{color:#1e4d3a}
  .loc-breadcrumb .current{color:#1e4d3a;font-weight:700}
  .loc-breadcrumb .sep{margin:0 6px;color:#b4b2a9}

  /* 위치 허브 - 히어로 (학원 소개와 동일 컬러 시스템) */
  .loc-hero{background:linear-gradient(135deg,#1e4d3a 0%,#2f7556 100%);padding:64px 24px 56px;text-align:center;color:white;position:relative;overflow:hidden}
  .loc-hero::before{content:'';position:absolute;top:-40px;right:-40px;width:200px;height:200px;background:rgba(232,122,60,.08);border-radius:50%}
  .loc-hero::after{content:'';position:absolute;bottom:-60px;left:-60px;width:240px;height:240px;background:rgba(255,255,255,.04);border-radius:50%}
  .loc-hero-inner{position:relative;max-width:800px;margin:0 auto}
  .loc-hero-eyebrow{display:inline-block;color:#ffd9b8;font-size:12px;font-weight:700;letter-spacing:2px;margin-bottom:14px}
  .loc-hero h1{font-size:32px;font-weight:800;line-height:1.35;margin:0 0 16px;letter-spacing:-0.5px;color:white}
  .loc-hero h1 .hl{color:#ffb380}
  .loc-hero p.loc-hero-sub{font-size:15px;line-height:1.7;opacity:.92;margin:0}

  /* 위치 허브 - 시·도 카드 그리드 */
  .loc-sidos-section{background:white;padding:56px 24px 32px}
  .loc-sidos-header{max-width:1040px;margin:0 auto 24px}
  .loc-sidos-header-top{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px}
  .loc-sidos-title{font-size:20px;font-weight:800;color:#1e4d3a;letter-spacing:-0.3px;margin:0}
  .loc-sidos-count{font-size:12px;color:#888780}
  .loc-sidos-desc{font-size:14px;color:#5f5e5a;line-height:1.7;margin:0}

  .loc-sidos-grid{max-width:1040px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
  .loc-sido-card{display:block;background:white;border:1px solid #ebe5d8;border-left:4px solid #1e4d3a;border-radius:0 12px 12px 0;padding:18px 18px 16px;text-decoration:none;color:inherit;transition:transform .15s ease,box-shadow .15s ease,border-color .15s ease}
  .loc-sido-card:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(30,77,58,.12);border-color:#2f7556}
  .loc-sido-card-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
  .loc-sido-card-name{font-size:16px;font-weight:800;color:#1a1a1a;letter-spacing:-0.3px}
  .loc-sido-card-name .ico{margin-right:4px}
  .loc-sido-card-badge{background:#e8f0eb;color:#0d3527;border:1px solid #2f7556;font-size:13px;font-weight:800;padding:3px 11px;border-radius:100px;min-width:42px;text-align:center}
  .loc-sido-card-desc{font-size:12px;color:#888780;line-height:1.5}

  /* 반응형 */
  @media (max-width: 900px){
    .loc-sidos-grid{grid-template-columns:repeat(2,1fr);gap:10px}
    .loc-sido-card{padding:14px 14px 12px}
    .loc-sido-card-name{font-size:14px}
    .loc-sido-card-badge{font-size:12px;padding:2px 9px}
  }
  @media (max-width: 768px){
    .loc-hero{padding:48px 20px 40px}
    .loc-hero h1{font-size:24px}
    .loc-hero p.loc-hero-sub{font-size:13px}
    .loc-sidos-section{padding:40px 16px 24px}
    .loc-sidos-title{font-size:17px}
    .loc-sidos-desc{font-size:12.5px}
    .loc-sido-card-desc{font-size:11px}
  }
  @media (max-width: 480px){
    .loc-sidos-grid{gap:8px}
    .loc-sido-card{padding:12px 12px 10px}
    .loc-sido-card-name{font-size:13px}
    .loc-breadcrumb{padding:8px 16px;font-size:11px}
  }
`;


// ================================================================
// ── 시·도별 페이지 (/academy/location/{sido}/) ───────────────────
// ================================================================
//
// 카드 디자인 결정사항:
//   - 시·군·구 6열 그리드 (가나다 순), 모바일 3열
//   - 첫 진입 시 가나다 순 첫 시·군 자동 선택
//   - 카드 3열 (데스크톱), 1열 (모바일)
//   - 카드 정보: 지점명·NEW·위치·과목(한 줄)·버튼
//   - 미운영 과목은 표시 안 함
//   - 버튼: "상세보기" / "상담신청" padding 8px (모바일 9px)
// ================================================================

const ACADEMY_LOCATION_SIDO_CSS = `
  /* 시·도별 페이지 - 컨테이너 */
  .loc-sido-wrap{max-width:1040px;margin:0 auto}

  /* 시·도별 페이지 - 히어로 */
  .loc-sido-hero{background:linear-gradient(135deg,#1e4d3a 0%,#2f7556 100%);padding:48px 24px 44px;position:relative;overflow:hidden;color:#fff}
  .loc-sido-hero::before{content:'';position:absolute;top:-40px;right:-40px;width:200px;height:200px;background:rgba(232,122,60,.08);border-radius:50%}
  .loc-sido-hero::after{content:'';position:absolute;bottom:-60px;left:-60px;width:240px;height:240px;background:rgba(255,255,255,.04);border-radius:50%}
  .loc-sido-hero-inner{max-width:1040px;margin:0 auto;position:relative;display:flex;justify-content:space-between;align-items:flex-end;gap:20px}
  .loc-sido-hero-text{flex:1}
  .loc-sido-hero-eyebrow{font-size:11px;color:#ffd9b8;letter-spacing:2px;margin-bottom:8px;font-weight:600}
  .loc-sido-hero h1{font-size:30px;font-weight:700;margin:0 0 10px;line-height:1.3;color:#fff;letter-spacing:-0.5px}
  .loc-sido-hero h1 .ico{display:inline-block;color:initial;filter:none}
  .loc-sido-hero-sub{font-size:14px;color:rgba(255,255,255,0.9);line-height:1.6;margin:0}
  .loc-sido-hero-count{text-align:right;flex-shrink:0}
  .loc-sido-hero-num{font-size:48px;font-weight:700;color:#ffd9b8;line-height:1}
  .loc-sido-hero-num-label{font-size:13px;color:rgba(255,255,255,0.85);margin-top:4px;display:block}

  /* 시·군·구 탭 영역 */
  .loc-tabs-section{background:#faf7f2;padding:24px 24px 20px}
  .loc-tabs-inner{max-width:1040px;margin:0 auto}
  .loc-tabs-label{font-size:12px;color:#888;margin-bottom:10px;letter-spacing:0.5px}
  .loc-tabs-grid{display:grid;grid-template-columns:repeat(6, 1fr);gap:6px}
  .loc-tab{background:#fff;color:#1e4d3a;border:1px solid #d8d0bf;font-size:12px;padding:8px 6px;border-radius:16px;text-align:center;cursor:pointer;transition:all .15s ease;font-family:inherit;line-height:1.3}
  .loc-tab:hover{border-color:#2f7556;background:#f5f1e8}
  .loc-tab.active{background:#1e4d3a;color:#fff;border-color:#1e4d3a;font-weight:600}

  /* 선택된 시·군 헤더 */
  .loc-sgheader-section{padding:28px 24px 16px}
  .loc-sgheader-inner{max-width:1040px;margin:0 auto}
  .loc-sgheader-top{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px}
  .loc-sgheader-title{font-size:20px;font-weight:700;color:#1e4d3a;margin:0;letter-spacing:-0.3px}
  .loc-sgheader-count{font-size:12px;color:#888}
  .loc-sgheader-desc{font-size:13px;color:#5f5e5a;line-height:1.6;margin:0}

  /* 지점 카드 그리드 */
  .loc-cards-section{padding:0 24px 28px}
  .loc-cards-inner{max-width:1040px;margin:0 auto}
  .loc-cards-grid{display:grid;grid-template-columns:repeat(3, 1fr);gap:12px}

  /* 시·군·구 패널 (탭 콘텐츠) */
  .loc-panel{display:none}
  .loc-panel.active{display:block}

  /* 지점 카드 */
  .loc-card{background:#fff;border:1px solid #d8d0bf;border-left:3px solid #1e4d3a;border-radius:0 8px 8px 0;padding:16px;transition:transform .15s ease,box-shadow .15s ease}
  .loc-card:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(30,77,58,.12)}
  .loc-card-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
  .loc-card-name{font-size:15px;font-weight:700;color:#1a1a1a;letter-spacing:-0.2px}
  .loc-card-brand{font-size:12px;font-weight:500;color:#888;letter-spacing:0}
  .loc-card-new{background:#fff4ec;color:#a8501f;border:1px solid #e87a3c;font-size:9px;padding:2px 7px;border-radius:4px;font-weight:600;letter-spacing:0.5px}
  .loc-card-addr{display:flex;align-items:flex-start;gap:5px;margin-bottom:12px;font-size:11px;color:#5f5e5a;line-height:1.5}
  .loc-card-addr-icon{color:#888;flex-shrink:0}
  .loc-card-subjects{display:flex;gap:3px;flex-wrap:nowrap;margin-bottom:12px}
  .loc-card-subj{background:#e8f0eb;color:#0d3527;font-size:11px;padding:3px 7px;border-radius:4px;font-weight:600;line-height:1.4}
  .loc-card-actions{display:flex;gap:6px;padding-top:12px;border-top:1px solid #ebe5d8}
  .loc-card-btn{flex:1;text-align:center;font-size:11px;padding:8px 0;border-radius:6px;font-weight:600;text-decoration:none;cursor:pointer;font-family:inherit;border:none;transition:all .15s ease}
  .loc-card-btn-detail{background:#fff;color:#1e4d3a;border:1px solid #1e4d3a}
  .loc-card-btn-detail:hover{background:#f5f1e8}
  .loc-card-btn-apply{background:#1e4d3a;color:#fff}
  .loc-card-btn-apply:hover{background:#2f7556}

  /* 학원 → 과외 자연스러운 유도 */
  .loc-tutoring-section{padding:0 24px 24px}
  .loc-tutoring-inner{max-width:1040px;margin:0 auto}
  .loc-tutoring-box{background:#faf7f2;border:1px solid #ebe5d8;border-radius:10px;padding:20px 22px}
  .loc-tutoring-flex{display:flex;align-items:flex-start;gap:14px}
  .loc-tutoring-icon{font-size:26px;flex-shrink:0}
  .loc-tutoring-content{flex:1}
  .loc-tutoring-title{font-size:14px;font-weight:600;color:#1e4d3a;margin:0 0 4px;letter-spacing:-0.2px}
  .loc-tutoring-desc{font-size:12px;color:#5f5e5a;line-height:1.6;margin:0 0 12px}
  .loc-tutoring-links{display:grid;grid-template-columns:repeat(6, 1fr);gap:6px}
  .loc-tutoring-link{background:#fff;border:1px solid #d8d0bf;padding:7px 4px;border-radius:14px;font-size:11px;color:#5f5e5a;text-decoration:none;text-align:center;line-height:1.3;transition:all .15s ease}
  .loc-tutoring-link:hover{border-color:#2f7556;color:#1e4d3a;background:#f5f1e8}

  /* 하단 CTA (학원 외 상담) */
  .loc-cta-section{padding:0 24px 32px}
  .loc-cta-inner{max-width:1040px;margin:0 auto}
  .loc-cta-banner{background:linear-gradient(135deg,#1e4d3a 0%,#2f7556 100%);color:#fff;padding:30px 24px;border-radius:14px;text-align:center}
  .loc-cta-title{font-size:17px;font-weight:600;margin:0 0 6px;color:#fff;letter-spacing:-0.2px}
  .loc-cta-desc{font-size:12px;color:rgba(255,255,255,0.95);margin:0 0 18px;line-height:1.7}
  .loc-cta-btns{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
  .loc-cta-btn{padding:10px 22px;border-radius:20px;font-size:13px;font-weight:600;text-decoration:none;transition:all .15s ease}
  .loc-cta-btn-primary{background:#e87a3c;color:#fff}
  .loc-cta-btn-primary:hover{background:#d66b30}
  .loc-cta-btn-secondary{background:#fff;color:#1e4d3a}
  .loc-cta-btn-secondary:hover{background:#f5f1e8}

  /* 반응형: 태블릿 */
  @media (max-width: 900px){
    .loc-cards-grid{grid-template-columns:repeat(2, 1fr)}
    .loc-tabs-grid{grid-template-columns:repeat(4, 1fr)}
  }

  /* 반응형: 모바일 */
  @media (max-width: 640px){
    .loc-sido-hero{padding:32px 20px 28px}
    .loc-sido-hero-inner{flex-direction:row;align-items:flex-end}
    .loc-sido-hero h1{font-size:22px}
    .loc-sido-hero-sub{font-size:12px}
    .loc-sido-hero-num{font-size:34px}
    .loc-sido-hero-num-label{font-size:11px}
    .loc-tabs-section{padding:18px 16px 14px}
    .loc-tabs-grid{grid-template-columns:repeat(3, 1fr);gap:5px}
    .loc-tab{font-size:11px;padding:7px 4px}
    .loc-sgheader-section{padding:20px 16px 12px}
    .loc-sgheader-title{font-size:17px}
    .loc-sgheader-desc{font-size:12px}
    .loc-cards-section{padding:0 16px 20px}
    .loc-cards-grid{grid-template-columns:1fr;gap:10px}
    .loc-card{padding:14px}
    .loc-card-name{font-size:14px}
    .loc-card-addr{font-size:11px}
    .loc-card-subj{font-size:11px;padding:3px 8px}
    .loc-card-btn{font-size:11px;padding:9px 0}
    .loc-tutoring-section{padding:0 16px 18px}
    .loc-tutoring-box{padding:16px}
    .loc-tutoring-flex{gap:10px}
    .loc-tutoring-title{font-size:13px}
    .loc-tutoring-desc{font-size:11px}
    .loc-tutoring-links{grid-template-columns:repeat(3, 1fr);gap:4px}
    .loc-tutoring-link{font-size:10px;padding:6px 4px}
    .loc-cta-section{padding:0 16px 24px}
    .loc-cta-banner{padding:22px 16px}
    .loc-cta-title{font-size:15px}
    .loc-cta-desc{font-size:11px}
    .loc-cta-btns{flex-direction:column;gap:8px}
    .loc-cta-btn{padding:12px 0;font-size:12px}
  }
`;


// ── 시·도별 페이지 자바스크립트 (시·군·구 탭 전환) ────────────────
const ACADEMY_LOCATION_SIDO_JS = `
  // 시·군·구 탭 클릭 시 해당 시·군 카드만 표시
  document.querySelectorAll('.loc-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const target = this.dataset.sigungu;
      if (!target) return;
      // 탭 active 상태 토글
      document.querySelectorAll('.loc-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      // 패널 전환
      document.querySelectorAll('.loc-panel').forEach(p => p.classList.remove('active'));
      const targetPanel = document.getElementById('panel-' + target);
      if (targetPanel) targetPanel.classList.add('active');
      // 헤더 텍스트 변경
      const sgTitleEl = document.getElementById('loc-sg-title');
      const sgCountEl = document.getElementById('loc-sg-count');
      const sgDescEl = document.getElementById('loc-sg-desc');
      const sgData = window.LOC_SG_META && window.LOC_SG_META[target];
      if (sgData) {
        if (sgTitleEl) sgTitleEl.textContent = '📍 ' + sgData.name;
        if (sgCountEl) sgCountEl.textContent = sgData.count + '개 센터';
        if (sgDescEl) sgDescEl.textContent = sgData.desc;
      }
      // URL 해시 갱신 (북마크 가능)
      try {
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, '', '#' + target);
        }
      } catch(e) {
        // iframe 등 보안 제약 환경에서는 무시
      }
    });
  });

  // URL 해시로 진입 시 해당 탭 자동 선택
  if (window.location.hash) {
    const hashSg = window.location.hash.substring(1);
    const tabBtn = document.querySelector('.loc-tab[data-sigungu="' + hashSg + '"]');
    if (tabBtn) tabBtn.click();
  }

  // 상담신청 버튼 → 폼 팝업 모달 열기
  document.querySelectorAll('.loc-card-btn-apply').forEach(btn => {
    btn.addEventListener('click', function() {
      const branch = this.dataset.branch || '';
      window.openAcademyFormModal(branch);
    });
  });
`;


// ================================================================
// ── 상담 폼 팝업 모달 (단계 2-2) ────────────────────────────────
// ================================================================
//
// 폼 흐름:
//   1. 카드 [상담신청] 클릭 → window.openAcademyFormModal(branch) 호출
//   2. 모달 표시 + 지점명 자동 입력
//   3. 사용자가 폼 작성 (학년 2단계 선택, 다음 주소 API 등)
//   4. [문의 제출하기] 클릭 → fetch로 Google Apps Script 호출
//   5. 응답 받으면 완료 메시지 표시
//
// Google Apps Script URL: 메모리의 배포된 웹앱 URL
// 폼 데이터 구조 (Apps Script로 전송):
//   { branch, name, grade, phone, address, subjects, message }
// ================================================================

// 폼 모달 Apps Script 엔드포인트
const ACADEMY_FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbzR_AgYtBhk5PayCDZLNJzBIHqhBa4RH0ks23qwaai8ZtyendMzTa7OFEN11HWJGnE/exec";


// ── 폼 모달 CSS ──────────────────────────────────────────────────
const ACADEMY_FORM_MODAL_CSS = `
  /* 모달 오버레이 (배경 어두움) */
  .acm-modal-overlay{
    display:none;
    position:fixed;top:0;left:0;width:100%;height:100%;
    background:rgba(30,77,58,0.5);backdrop-filter:blur(4px);
    z-index:9999;
    align-items:center;justify-content:center;
    padding:20px;
    overflow-y:auto;
  }
  .acm-modal-overlay.active{display:flex}

  /* 모달 박스 */
  .acm-modal{
    background:#fff;
    max-width:520px;width:100%;
    max-height:90vh;
    border-radius:14px;
    overflow:hidden;
    box-shadow:0 12px 40px rgba(0,0,0,0.25);
    display:flex;flex-direction:column;
    animation:acmFadeIn .25s ease-out;
  }
  @keyframes acmFadeIn{
    from{opacity:0;transform:translateY(10px)}
    to{opacity:1;transform:translateY(0)}
  }

  /* 모달 헤더 */
  .acm-modal-head{
    background:linear-gradient(135deg,#1e4d3a 0%,#2f7556 100%);
    color:#fff;
    padding:18px 22px;
    display:flex;justify-content:space-between;align-items:center;
    flex-shrink:0;
  }
  .acm-modal-head-text{display:flex;align-items:center;gap:10px}
  .acm-modal-head-icon{font-size:18px}
  .acm-modal-head-title{font-size:16px;font-weight:700;line-height:1.3}
  .acm-modal-head-sub{font-size:11px;opacity:0.9;margin-top:3px}
  .acm-modal-close{
    background:transparent;border:none;color:#fff;opacity:0.7;
    font-size:22px;cursor:pointer;padding:0;line-height:1;
    transition:opacity .15s ease;
  }
  .acm-modal-close:hover{opacity:1}

  /* 안내문 */
  .acm-modal-notice{
    background:#faf7f2;
    padding:13px 22px;
    border-bottom:1px solid #e8dfca;
    font-size:12px;color:#5f5e5a;line-height:1.6;
    flex-shrink:0;
  }

  /* 폼 본문 (스크롤 영역) */
  .acm-modal-body{
    padding:20px 22px;
    overflow-y:auto;
    flex:1;
  }
  .acm-field{margin-bottom:16px}
  .acm-label{
    display:block;font-size:12px;font-weight:600;color:#1a1a1a;
    margin-bottom:5px;letter-spacing:-0.1px;
  }
  .acm-label-branch{color:#1e4d3a}
  .acm-label-required::after{
    content:'*';color:#e87a3c;margin-left:3px;font-weight:700;
  }
  .acm-label-optional{
    font-weight:400;color:#888;font-size:11px;margin-left:5px;
  }

  /* 지점명 (읽기 전용 스타일) */
  .acm-branch-display{
    background:#e8f0eb;
    border:1px solid #2f7556;
    padding:10px 13px;
    border-radius:6px;
    font-size:13px;color:#0d3527;
    font-weight:500;
  }

  /* 일반 입력 */
  .acm-input{
    width:100%;
    border:1px solid #d8d0bf;
    padding:10px 13px;
    border-radius:6px;
    font-size:13px;color:#1a1a1a;
    font-family:inherit;
    transition:border-color .15s ease;
    -webkit-appearance:none;
    box-sizing:border-box;
  }
  .acm-input:focus{outline:none;border-color:#1e4d3a}
  .acm-input::placeholder{color:#aaa}

  /* textarea */
  .acm-textarea{
    width:100%;
    border:1px solid #d8d0bf;
    padding:10px 13px;
    border-radius:6px;
    font-size:13px;color:#1a1a1a;
    font-family:inherit;
    min-height:70px;
    resize:vertical;
    box-sizing:border-box;
  }
  .acm-textarea:focus{outline:none;border-color:#1e4d3a}

  /* 학년 2단계 선택 */
  .acm-grade-level{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:6px;
    margin-bottom:6px;
  }
  .acm-grade-num{
    display:grid;
    gap:5px;
  }
  .acm-grade-num.cols-6{grid-template-columns:repeat(6,1fr)}
  .acm-grade-num.cols-3{grid-template-columns:repeat(3,1fr)}
  .acm-grade-btn{
    background:#fff;
    color:#1e4d3a;
    border:1px solid #d8d0bf;
    padding:9px 0;
    border-radius:6px;
    font-size:13px;
    cursor:pointer;
    font-family:inherit;
    text-align:center;
    transition:all .15s ease;
  }
  .acm-grade-btn:hover{border-color:#2f7556;background:#f5f1e8}
  .acm-grade-btn.active.level{background:#1e4d3a;color:#fff;border-color:#1e4d3a;font-weight:600}
  .acm-grade-btn.active.num{background:#e87a3c;color:#fff;border-color:#e87a3c;font-weight:600}
  .acm-grade-num-hidden{display:none}
  .acm-grade-display{
    font-size:11px;color:#888;margin-top:5px;font-style:italic;min-height:14px;
  }

  /* 주소 검색 */
  .acm-addr-row{display:flex;gap:6px;margin-bottom:6px}
  .acm-addr-row .acm-input{flex:1}
  .acm-addr-search-btn{
    background:#1e4d3a;color:#fff;
    border:none;padding:10px 14px;
    border-radius:6px;font-size:12px;font-weight:600;
    cursor:pointer;
    white-space:nowrap;
    font-family:inherit;
    transition:background .15s ease;
  }
  .acm-addr-search-btn:hover{background:#2f7556}

  /* 과목 체크박스 그리드 */
  .acm-subjects{
    display:grid;
    grid-template-columns:repeat(5,1fr);
    gap:6px;
  }
  .acm-subj-btn{
    background:#fff;
    color:#5f5e5a;
    border:1px solid #d8d0bf;
    padding:9px 0;
    border-radius:6px;
    font-size:12px;
    cursor:pointer;
    font-family:inherit;
    text-align:center;
    transition:all .15s ease;
    line-height:1.3;
    white-space:nowrap;
  }
  .acm-subj-btn:hover{border-color:#2f7556}
  .acm-subj-btn.active{
    background:#e8f0eb;color:#0d3527;
    border-color:#2f7556;font-weight:600;
  }

  /* 개인정보 동의 */
  .acm-privacy-box{
    background:#faf7f2;
    border:1px solid #e8dfca;
    border-radius:6px;
    padding:11px 13px;
    margin-bottom:10px;
    font-size:11px;color:#5f5e5a;line-height:1.7;
  }
  .acm-privacy-box b{color:#1e4d3a}
  .acm-privacy-check{
    display:flex;align-items:center;gap:7px;
    font-size:12px;color:#1a1a1a;cursor:pointer;
  }
  .acm-privacy-check input[type="checkbox"]{
    width:16px;height:16px;
    accent-color:#1e4d3a;
    cursor:pointer;
  }

  /* 모달 하단 버튼 */
  .acm-modal-foot{
    padding:14px 22px 18px;
    border-top:1px solid #e8dfca;
    display:flex;gap:8px;
    flex-shrink:0;
  }
  .acm-btn{
    flex:1;
    padding:12px 0;
    border-radius:7px;
    font-size:13px;font-weight:600;
    cursor:pointer;text-align:center;
    font-family:inherit;border:none;
    transition:all .15s ease;
  }
  .acm-btn-cancel{
    flex:1;
    background:#fff;color:#5f5e5a;
    border:1px solid #d8d0bf;
  }
  .acm-btn-cancel:hover{background:#f5f1e8;border-color:#aaa}
  .acm-btn-submit{
    flex:2;
    background:#e87a3c;color:#fff;
  }
  .acm-btn-submit:hover{background:#d66b30}
  .acm-btn-submit:disabled{
    background:#d8c4a8;cursor:not-allowed;
  }

  /* 제출 완료 메시지 */
  .acm-success{
    display:none;
    text-align:center;
    padding:60px 22px;
  }
  .acm-success.active{display:block}
  .acm-success-icon{font-size:48px;margin-bottom:14px}
  .acm-success-title{
    font-size:18px;font-weight:700;color:#1e4d3a;
    margin:0 0 10px;line-height:1.4;
  }
  .acm-success-desc{
    font-size:13px;color:#5f5e5a;line-height:1.7;
    margin:0 0 22px;
  }
  .acm-success-btn{
    background:#1e4d3a;color:#fff;
    border:none;
    padding:11px 32px;
    border-radius:7px;
    font-size:13px;font-weight:600;
    cursor:pointer;font-family:inherit;
  }
  .acm-success-btn:hover{background:#2f7556}

  /* 모바일 반응형 */
  @media (max-width:640px){
    .acm-modal-overlay{padding:0;align-items:stretch}
    .acm-modal{
      max-width:100%;max-height:100vh;height:100%;
      border-radius:0;
    }
    .acm-modal-head{padding:16px 18px}
    .acm-modal-head-title{font-size:15px}
    .acm-modal-notice{padding:11px 18px;font-size:11px}
    .acm-modal-body{padding:16px 18px}
    .acm-field{margin-bottom:14px}
    .acm-label{font-size:11px}
    .acm-input,.acm-textarea{font-size:12px;padding:9px 11px}
    .acm-branch-display{font-size:12px;padding:9px 11px}
    .acm-grade-btn{font-size:12px;padding:8px 0}
    .acm-subj-btn{font-size:11px;padding:8px 0}
    .acm-subjects{grid-template-columns:repeat(3,1fr)}
    .acm-modal-foot{padding:12px 18px 16px}
    .acm-btn{padding:13px 0;font-size:12px}
    .acm-privacy-box{font-size:10px}
  }
`;


// ── 폼 모달 HTML (페이지에 1개만 삽입 - 공통) ────────────────────
const ACADEMY_FORM_MODAL_HTML = `
<div class="acm-modal-overlay" id="acmModal" role="dialog" aria-modal="true" aria-labelledby="acmModalTitle">
  <div class="acm-modal">

    <!-- 헤더 -->
    <div class="acm-modal-head">
      <div class="acm-modal-head-text">
        <span class="acm-modal-head-icon">📝</span>
        <div>
          <div class="acm-modal-head-title" id="acmModalTitle">상담 신청</div>
          <div class="acm-modal-head-sub" id="acmModalBranchSub">지점 선택됨</div>
        </div>
      </div>
      <button class="acm-modal-close" id="acmModalClose" type="button" aria-label="닫기">✕</button>
    </div>

    <!-- 안내문 -->
    <div class="acm-modal-notice">
      문의 사항 및 상담 예약 신청은 아래 작성해주시면 확인 후 상담 예약 도와드리겠습니다.
    </div>

    <!-- 폼 본문 -->
    <form class="acm-modal-body" id="acmForm" novalidate>
      <!-- 지점명 (자동 입력) -->
      <div class="acm-field">
        <label class="acm-label acm-label-branch">지점명</label>
        <div class="acm-branch-display" id="acmBranchDisplay">지점 선택됨</div>
        <input type="hidden" name="branch" id="acmBranchInput">
      </div>

      <!-- 학생 이름 -->
      <div class="acm-field">
        <label class="acm-label acm-label-required" for="acmName">학생 이름</label>
        <input type="text" class="acm-input" id="acmName" name="name" placeholder="홍길동" required>
      </div>

      <!-- 학년 (2단계 버튼) -->
      <div class="acm-field">
        <label class="acm-label acm-label-required">학년</label>
        <div class="acm-grade-level" id="acmGradeLevel">
          <button type="button" class="acm-grade-btn level" data-level="초등">초등</button>
          <button type="button" class="acm-grade-btn level" data-level="중등">중등</button>
          <button type="button" class="acm-grade-btn level" data-level="고등">고등</button>
        </div>
        <div class="acm-grade-num acm-grade-num-hidden" id="acmGradeNum"></div>
        <div class="acm-grade-display" id="acmGradeDisplay"></div>
        <input type="hidden" name="grade" id="acmGradeInput">
      </div>

      <!-- 연락처 -->
      <div class="acm-field">
        <label class="acm-label acm-label-required" for="acmPhone">연락처</label>
        <input type="tel" class="acm-input" id="acmPhone" name="phone" placeholder="010-0000-0000" required>
      </div>

      <!-- 거주 주소 (다음 API) -->
      <div class="acm-field">
        <label class="acm-label acm-label-required">거주 주소</label>
        <div class="acm-addr-row">
          <input type="text" class="acm-input" id="acmAddress1" name="address1" placeholder="도로명 주소 (검색 버튼 클릭)" readonly>
          <button type="button" class="acm-addr-search-btn" id="acmAddrSearch">🔍 검색</button>
        </div>
        <input type="text" class="acm-input" id="acmAddress2" name="address2" placeholder="상세 주소 (예: 101동 502호)">
      </div>

      <!-- 수업 신청 과목 (5개) -->
      <div class="acm-field">
        <label class="acm-label">
          수업 신청 과목
          <span class="acm-label-optional">(다중 선택)</span>
        </label>
        <div class="acm-subjects" id="acmSubjects">
          <button type="button" class="acm-subj-btn" data-subject="국어">국어</button>
          <button type="button" class="acm-subj-btn" data-subject="영어">영어</button>
          <button type="button" class="acm-subj-btn" data-subject="수학">수학</button>
          <button type="button" class="acm-subj-btn" data-subject="과학">과학</button>
          <button type="button" class="acm-subj-btn" data-subject="사회·한국사">사회·한국사</button>
        </div>
      </div>

      <!-- 문의 내용 -->
      <div class="acm-field">
        <label class="acm-label" for="acmMessage">문의 내용</label>
        <textarea class="acm-textarea" id="acmMessage" name="message" placeholder="문의하실 내용을 자유롭게 작성해주세요"></textarea>
      </div>

      <!-- 개인정보 동의 -->
      <div class="acm-field">
        <div class="acm-privacy-box">
          <b>수집 항목:</b> 이름, 학년/나이, 연락처, 거주주소, 문의내용<br>
          <b>수집 목적:</b> 학습 상담 및 센터 안내<br>
          <b>보유 기간:</b> 상담 완료 후 1년
        </div>
        <label class="acm-privacy-check">
          <input type="checkbox" id="acmPrivacy" required>
          <span>개인정보 수집 및 이용에 동의합니다 <span style="color:#e87a3c">*</span></span>
        </label>
      </div>
    </form>

    <!-- 하단 버튼 -->
    <div class="acm-modal-foot" id="acmModalFoot">
      <button type="button" class="acm-btn acm-btn-cancel" id="acmCancel">취소</button>
      <button type="button" class="acm-btn acm-btn-submit" id="acmSubmit">문의 제출하기</button>
    </div>

    <!-- 제출 완료 메시지 -->
    <div class="acm-success" id="acmSuccess">
      <div class="acm-success-icon">✅</div>
      <h3 class="acm-success-title">설문 참여해주셔서 감사합니다.</h3>
      <p class="acm-success-desc">상담 내용 확인 후 바로 연락드리겠습니다.</p>
      <button type="button" class="acm-success-btn" id="acmSuccessClose">닫기</button>
    </div>

  </div>
</div>

<!-- 다음 주소 API 스크립트 -->
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
`;


// ── 폼 모달 JS ───────────────────────────────────────────────────
const ACADEMY_FORM_MODAL_JS = `
(function() {
  const APPS_SCRIPT_URL = "${ACADEMY_FORM_ENDPOINT}";

  // 모달 열기 (전역 함수 - 카드 버튼에서 호출)
  window.openAcademyFormModal = function(branchText) {
    const modal = document.getElementById('acmModal');
    if (!modal) return;
    // 지점명 자동 입력
    const branchDisplay = document.getElementById('acmBranchDisplay');
    const branchInput = document.getElementById('acmBranchInput');
    const branchSub = document.getElementById('acmModalBranchSub');
    if (branchDisplay) branchDisplay.textContent = branchText;
    if (branchInput) branchInput.value = branchText;
    if (branchSub) branchSub.textContent = branchText;
    // 폼 초기화
    resetForm();
    // 모달 표시
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    const modal = document.getElementById('acmModal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function resetForm() {
    const form = document.getElementById('acmForm');
    if (form) form.reset();
    // 학년 초기화
    document.querySelectorAll('.acm-grade-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('acmGradeNum').className = 'acm-grade-num acm-grade-num-hidden';
    document.getElementById('acmGradeDisplay').textContent = '';
    document.getElementById('acmGradeInput').value = '';
    // 과목 초기화
    document.querySelectorAll('.acm-subj-btn').forEach(b => b.classList.remove('active'));
    // 완료 화면 숨김, 폼 본문 표시
    document.getElementById('acmSuccess').classList.remove('active');
    document.getElementById('acmForm').style.display = '';
    document.getElementById('acmModalFoot').style.display = '';
    // 제출 버튼 활성화
    const submitBtn = document.getElementById('acmSubmit');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = '문의 제출하기';
    }
  }

  // 닫기 버튼들
  document.getElementById('acmModalClose')?.addEventListener('click', closeModal);
  document.getElementById('acmCancel')?.addEventListener('click', closeModal);
  document.getElementById('acmSuccessClose')?.addEventListener('click', closeModal);

  // 오버레이 클릭 시 닫기 (모달 박스 외부 클릭)
  document.getElementById('acmModal')?.addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });

  // ESC 키로 닫기
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });

  // 학년 2단계 - 1단계 학교급 클릭
  document.querySelectorAll('.acm-grade-btn.level').forEach(btn => {
    btn.addEventListener('click', function() {
      const level = this.dataset.level;
      // 1단계 active
      document.querySelectorAll('.acm-grade-btn.level').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      // 2단계 버튼 그룹 생성
      const numContainer = document.getElementById('acmGradeNum');
      numContainer.innerHTML = '';
      const max = (level === '초등') ? 6 : 3;
      numContainer.className = 'acm-grade-num ' + (max === 6 ? 'cols-6' : 'cols-3');
      for (let i = 1; i <= max; i++) {
        const numBtn = document.createElement('button');
        numBtn.type = 'button';
        numBtn.className = 'acm-grade-btn num';
        numBtn.dataset.num = i;
        numBtn.textContent = i + '학년';
        numBtn.addEventListener('click', function() {
          document.querySelectorAll('.acm-grade-btn.num').forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          const num = this.dataset.num;
          const finalGrade = level + ' ' + num + '학년';
          document.getElementById('acmGradeDisplay').textContent = '선택: ' + finalGrade;
          document.getElementById('acmGradeInput').value = finalGrade;
        });
        numContainer.appendChild(numBtn);
      }
      // 2단계 보이기
      // 이전 선택 초기화
      document.getElementById('acmGradeDisplay').textContent = '';
      document.getElementById('acmGradeInput').value = '';
    });
  });

  // 과목 체크박스 토글
  document.querySelectorAll('.acm-subj-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  });

  // 다음 주소 API 호출
  document.getElementById('acmAddrSearch')?.addEventListener('click', function() {
    if (typeof daum === 'undefined' || !daum.Postcode) {
      alert('주소 검색 서비스를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.');
      return;
    }
    new daum.Postcode({
      oncomplete: function(data) {
        const fullAddr = data.roadAddress || data.jibunAddress;
        document.getElementById('acmAddress1').value = fullAddr;
        // 상세주소 입력칸에 포커스
        document.getElementById('acmAddress2').focus();
      }
    }).open();
  });

  // 폼 제출
  document.getElementById('acmSubmit')?.addEventListener('click', async function() {
    // 폼 검증
    const name = document.getElementById('acmName').value.trim();
    const grade = document.getElementById('acmGradeInput').value.trim();
    const phone = document.getElementById('acmPhone').value.trim();
    const address1 = document.getElementById('acmAddress1').value.trim();
    const address2 = document.getElementById('acmAddress2').value.trim();
    const privacy = document.getElementById('acmPrivacy').checked;

    if (!name) { alert('학생 이름을 입력해주세요.'); document.getElementById('acmName').focus(); return; }
    if (!grade) { alert('학년을 선택해주세요.'); return; }
    if (!phone) { alert('연락처를 입력해주세요.'); document.getElementById('acmPhone').focus(); return; }
    if (!address1) { alert('거주 주소를 검색해주세요.'); return; }
    if (!privacy) { alert('개인정보 수집 및 이용에 동의해주세요.'); return; }

    // 수업 신청 과목 수집
    const subjects = [];
    document.querySelectorAll('.acm-subj-btn.active').forEach(btn => {
      subjects.push(btn.dataset.subject);
    });

    // 제출 데이터
    const fullAddress = address2 ? (address1 + ' ' + address2) : address1;
    const data = {
      branch:   document.getElementById('acmBranchInput').value,
      name:     name,
      grade:    grade,
      phone:    phone,
      address:  fullAddress,
      subjects: subjects.join(', '),
      message:  document.getElementById('acmMessage').value.trim()
    };

    // 제출 버튼 비활성화 + 로딩
    const submitBtn = document.getElementById('acmSubmit');
    submitBtn.disabled = true;
    submitBtn.textContent = '제출 중...';

    // Apps Script 호출
    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',  // Apps Script는 CORS 미지원이므로 no-cors 사용
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'text/plain' }  // no-cors에서는 'text/plain' 또는 'application/x-www-form-urlencoded'만 허용
      });
      // no-cors는 응답을 읽을 수 없지만 요청은 성공한 것으로 간주
      // 완료 화면 표시
      document.getElementById('acmForm').style.display = 'none';
      document.getElementById('acmModalFoot').style.display = 'none';
      document.getElementById('acmSuccess').classList.add('active');
    } catch (error) {
      alert('제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.\\n계속 문제가 발생하면 카카오톡으로 문의해주세요.');
      submitBtn.disabled = false;
      submitBtn.textContent = '문의 제출하기';
    }
  });

})();
`;


// ================================================================
// ── 지점 상세 페이지 CSS (/academy/center/{slug}/) ──────────────
// ================================================================
const ACADEMY_CENTER_CSS = `
  /* 센터 페이지 컨테이너 */
  .ctr-wrap{max-width:1040px;margin:0 auto}
  .ctr-section{padding:0 24px 28px}
  .ctr-section-inner{max-width:1040px;margin:0 auto}
  .ctr-h2{font-size:19px;font-weight:700;color:#1e4d3a;margin:0 0 6px;letter-spacing:-0.3px}
  .ctr-sub{font-size:12px;color:#888;margin:0 0 16px;line-height:1.6}

  /* 히어로 */
  .ctr-hero{background:linear-gradient(135deg,#1e4d3a 0%,#2f7556 100%);color:#fff;padding:48px 24px 44px;position:relative;overflow:hidden}
  .ctr-hero::before{content:'';position:absolute;top:-40px;right:-40px;width:200px;height:200px;background:rgba(232,122,60,.08);border-radius:50%}
  .ctr-hero::after{content:'';position:absolute;bottom:-60px;left:-60px;width:240px;height:240px;background:rgba(255,255,255,.04);border-radius:50%}
  .ctr-hero-inner{max-width:1040px;margin:0 auto;position:relative}
  .ctr-hero-eyebrow{font-size:11px;color:#ffd9b8;letter-spacing:2px;margin-bottom:8px;font-weight:600}
  .ctr-hero-title-row{display:flex;align-items:center;gap:12px;margin-bottom:18px;flex-wrap:wrap}
  .ctr-hero h1{font-size:30px;font-weight:700;margin:0;line-height:1.3;color:#fff;letter-spacing:-0.5px}
  .ctr-hero-brand{font-size:15px;font-weight:500;color:rgba(255,255,255,0.85)}
  .ctr-hero-new{background:#fff4ec;color:#a8501f;border:1px solid #e87a3c;font-size:10px;padding:3px 9px;border-radius:4px;font-weight:600;letter-spacing:0.5px}
  .ctr-hero-btns{display:flex;gap:10px;justify-content:flex-start;flex-wrap:wrap;align-items:center}
  .ctr-hero-btn{display:inline-block;background:#e87a3c;color:#fff;padding:12px 26px;border:none;border-radius:24px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;text-decoration:none;transition:background .15s ease}
  .ctr-hero-btn:hover{background:#d66b30}
  .ctr-hero-btn-fee{display:inline-flex;align-items:center;gap:6px;background:transparent;color:#fff;padding:11px 24px;border:1.5px solid rgba(255,255,255,.85);border-radius:24px;font-size:14px;font-weight:600;font-family:inherit;text-decoration:none;transition:background .15s ease,border-color .15s ease}
  .ctr-hero-btn-fee:hover{background:rgba(255,255,255,.14);border-color:#fff}
  .ctr-hero-btn-fee-ext{font-size:12px;opacity:.9}

  /* 학원 정보 (지도 + 정보) */
  .ctr-info-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;align-items:stretch}
  .ctr-map-box{display:flex;flex-direction:column;gap:0;border-radius:10px;overflow:hidden;border:1px solid #d4ddd7}
  .ctr-map-canvas{width:100%;flex:1;min-height:200px;background:#eef2f0;z-index:1}
  .ctr-map-loading{display:flex;align-items:center;justify-content:center;height:100%;min-height:200px;background:linear-gradient(135deg,#f0f4f2 0%,#e6ede9 100%);color:#7a8a82;font-size:12px;gap:8px}
  .ctr-map-btns{display:flex;gap:0;border-top:1px solid #d4ddd7}
  .ctr-map-btn{flex:1;padding:11px 0;text-align:center;font-size:12px;font-weight:600;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:5px;transition:background .15s ease}
  .ctr-map-btn-naver{background:#03c75a;color:#fff}
  .ctr-map-btn-naver:hover{background:#02b350}
  .ctr-map-btn-kakao{background:#fee500;color:#3c1e1e}
  .ctr-map-btn-kakao:hover{background:#f5dc00}
  .ctr-map-btn .mlogo{width:16px;height:16px;border-radius:3px;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:11px}
  .ctr-map-btn-naver .mlogo{background:#fff;color:#03c75a}
  .ctr-map-btn-kakao .mlogo{background:#3c1e1e;color:#fee500}
  .ctr-info-list{display:flex;flex-direction:column;gap:9px}
  .ctr-info-item{background:#fff;border:1px solid #ebe5d8;border-radius:10px;padding:13px 15px;flex:1;display:flex;flex-direction:column;justify-content:center}
  .ctr-info-label{font-size:10px;color:#888;margin-bottom:3px}
  .ctr-info-value{font-size:12px;color:#1a1a1a;line-height:1.5}

  /* 수업 가능 학년 카드 */
  .ctr-grade-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
  .ctr-grade-card{border-radius:10px;padding:15px}
  .ctr-grade-card.elem{background:#e6f1fb}
  .ctr-grade-card.middle{background:#e1f5ee}
  .ctr-grade-card.high{background:#faece7}
  .ctr-grade-card-title{font-size:12px;font-weight:700;margin-bottom:10px}
  .ctr-grade-card.elem .ctr-grade-card-title{color:#0c447c}
  .ctr-grade-card.middle .ctr-grade-card-title{color:#085041}
  .ctr-grade-card.high .ctr-grade-card-title{color:#712b13}
  .ctr-grade-range{margin-bottom:8px}
  .ctr-grade-range:last-child{margin-bottom:0}
  .ctr-grade-range-label{font-size:9px;margin-bottom:3px;opacity:0.85}
  .ctr-grade-card.elem .ctr-grade-range-label{color:#0c447c}
  .ctr-grade-card.middle .ctr-grade-range-label{color:#085041}
  .ctr-grade-card.high .ctr-grade-range-label{color:#712b13}
  .ctr-grade-chips{display:flex;gap:3px;flex-wrap:wrap}
  .ctr-grade-chip{background:#fff;font-size:10px;padding:2px 7px;border-radius:3px;font-weight:600}
  .ctr-grade-card.elem .ctr-grade-chip{color:#0c447c}
  .ctr-grade-card.middle .ctr-grade-chip{color:#085041}
  .ctr-grade-card.high .ctr-grade-chip{color:#712b13}
  .ctr-grade-empty{font-size:11px;color:#aaa;font-style:italic}

  /* 인근 학교 */
  .ctr-school-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
  .ctr-school-card{border-radius:10px;padding:15px}
  .ctr-school-card.elem{border:1px solid #e6f1fb;background:#fafcff}
  .ctr-school-card.middle{border:1px solid #e1f5ee;background:#fafffd}
  .ctr-school-card.high{border:1px solid #faece7;background:#fffbfa}
  .ctr-school-title{font-size:12px;font-weight:700;margin-bottom:9px}
  .ctr-school-card.elem .ctr-school-title{color:#0c447c}
  .ctr-school-card.middle .ctr-school-title{color:#085041}
  .ctr-school-card.high .ctr-school-title{color:#712b13}
  .ctr-school-chips{display:flex;flex-wrap:wrap;gap:4px}
  .ctr-school-chip{font-size:10px;padding:3px 9px;border-radius:4px}
  .ctr-school-card.elem .ctr-school-chip{background:#e6f1fb;color:#0c447c}
  .ctr-school-card.middle .ctr-school-chip{background:#e1f5ee;color:#085041}
  .ctr-school-card.high .ctr-school-chip{background:#faece7;color:#712b13}
  .ctr-school-empty{font-size:11px;color:#aaa;font-style:italic}

  /* 공통 콘텐츠 구분선 */
  .ctr-common-divider{padding:16px 24px;background:#faf7f2;border-top:1px solid #e8dfca;border-bottom:1px solid #e8dfca;text-align:center;font-size:11px;color:#aaa;letter-spacing:0.5px}

  /* FAQ */
  .ctr-faq-box{background:#fff;border:1px solid #ebe5d8;border-radius:10px;overflow:hidden}
  .ctr-faq-item{border-bottom:1px solid #f0eadb}
  .ctr-faq-item:last-child{border-bottom:none}
  .ctr-faq-q{padding:16px 18px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;gap:10px}
  .ctr-faq-q-text{font-size:13.5px;font-weight:700;color:#1e4d3a;line-height:1.4}
  .ctr-faq-toggle{font-size:18px;color:#e87a3c;flex-shrink:0;transition:transform .2s ease}
  .ctr-faq-a{padding:0 18px;max-height:0;overflow:hidden;transition:max-height .3s ease,padding .3s ease}
  .ctr-faq-item.open .ctr-faq-a{padding:0 18px 16px;max-height:600px}
  .ctr-faq-item.open .ctr-faq-toggle{transform:rotate(45deg)}
  .ctr-faq-a-text{font-size:13px;color:#5f5e5a;line-height:1.8}
  .ctr-faq-a-text strong{color:#1e4d3a}

  /* 수업료 표 */
  .ctr-price-notice{font-size:10.5px;color:#888;line-height:1.7;margin-bottom:12px;background:#faf7f2;padding:11px 13px;border-radius:6px}
  .ctr-price-table{width:100%;border-collapse:collapse;font-size:11.5px}
  .ctr-price-table th{background:#1e4d3a;color:#fff;padding:8px;font-weight:600}
  .ctr-price-table td{padding:8px;text-align:center;border-bottom:1px solid #ebe5d8}
  .ctr-price-table tr:last-child td{border-bottom:none}
  .ctr-price-table .freq-cell{background:#f5f1e8;font-weight:600;color:#1e4d3a}
  .ctr-price-unit{font-size:9px;color:#aaa;margin-top:6px;text-align:right}

  /* CTA */
  .ctr-cta{background:linear-gradient(135deg,#1e4d3a 0%,#2f7556 100%);color:#fff;padding:30px 24px;border-radius:14px;text-align:center}
  .ctr-cta-title{font-size:17px;font-weight:600;margin:0 0 6px;color:#fff}
  .ctr-cta-desc{font-size:12px;color:rgba(255,255,255,0.95);margin:0 0 18px;line-height:1.7}
  .ctr-cta-btns{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
  .ctr-cta-btn{padding:10px 22px;border-radius:20px;font-size:13px;font-weight:600;text-decoration:none;cursor:pointer;border:none;font-family:inherit;transition:all .15s ease}
  .ctr-cta-btn-primary{background:#e87a3c;color:#fff}
  .ctr-cta-btn-primary:hover{background:#d66b30}
  .ctr-cta-btn-secondary{background:#fff;color:#1e4d3a}
  .ctr-cta-btn-secondary:hover{background:#f5f1e8}

  /* 같은 시군구 다른 학원 */
  .ctr-others-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
  .ctr-other-card{background:#fff;border:1px solid #d8d0bf;border-left:3px solid #1e4d3a;border-radius:0 8px 8px 0;padding:13px 14px;transition:transform .15s ease,box-shadow .15s ease}
  .ctr-other-card:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(30,77,58,.1)}
  .ctr-other-name{font-size:13px;font-weight:700;color:#1a1a1a;margin-bottom:5px}
  .ctr-other-brand{font-size:11px;font-weight:500;color:#888}
  .ctr-other-addr{font-size:10px;color:#5f5e5a;margin-bottom:9px;line-height:1.4}
  .ctr-other-link{font-size:11px;color:#1e4d3a;font-weight:600;text-decoration:none}
  .ctr-others-more{text-align:center;padding-top:14px}
  .ctr-others-more-btn{display:inline-block;background:#1e4d3a;color:#fff;font-size:12px;padding:9px 22px;border-radius:20px;font-weight:600;text-decoration:none;transition:background .15s ease}
  .ctr-others-more-btn:hover{background:#2f7556}

  /* 1:1 과외 배너 (시·도 페이지와 동일 스타일 재사용) */

  /* 반응형: 태블릿 */
  @media (max-width:900px){
    .ctr-grade-grid,.ctr-school-grid,.ctr-others-grid{grid-template-columns:1fr 1fr}
  }

  /* 반응형: 모바일 */
  @media (max-width:640px){
    .ctr-hero{padding:32px 18px}
    .ctr-hero h1{font-size:24px}
    .ctr-hero-btns{flex-direction:column;gap:8px}
    .ctr-hero-btn{display:block;width:100%;text-align:center}
    .ctr-hero-btn-fee{width:100%;justify-content:center;box-sizing:border-box}
    .ctr-section{padding:0 16px 20px}
    .ctr-h2{font-size:16px}
    .ctr-info-grid{grid-template-columns:1fr}
    .ctr-map-canvas{height:180px;flex:none}
    .ctr-info-item{flex:none}
    .ctr-grade-grid,.ctr-school-grid,.ctr-others-grid{grid-template-columns:1fr}
    .ctr-cta{padding:22px 16px}
    .ctr-cta-title{font-size:15px}
    .ctr-cta-btns{flex-direction:column}
    .ctr-cta-btn{padding:12px 0}
    .ctr-price-table{font-size:10.5px}
    .ctr-price-table th,.ctr-price-table td{padding:6px 4px}
    .ctr-faq-q-text{font-size:12.5px}
  }
`;


// ── 학원 소개 페이지 자바스크립트 ───────────────────────────────
const ACADEMY_INTRO_JS = `
  // 와와 학습 시스템 탭 토글
  document.querySelectorAll('.wawa-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const target = this.dataset.tab;
      document.querySelectorAll('.wawa-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      document.querySelectorAll('.wawa-panel').forEach(p => p.classList.remove('active'));
      document.querySelector('.wawa-panel[data-panel="' + target + '"]').classList.add('active');
    });
  });

  // 후기 슬라이드 캐러셀
  (function() {
    const track = document.getElementById('reviewsTrack');
    if (!track) return;
    const prevBtn = document.getElementById('reviewPrev');
    const nextBtn = document.getElementById('reviewNext');
    const dotsContainer = document.getElementById('reviewDots');
    const slides = track.querySelectorAll('.review-slide');
    const totalSlides = slides.length;
    
    let currentIndex = 0;
    let perView = 3;
    
    function updatePerView() {
      const w = window.innerWidth;
      if (w <= 600) perView = 1;
      else if (w <= 900) perView = 2;
      else perView = 3;
    }
    
    function totalPages() {
      return Math.max(1, totalSlides - perView + 1);
    }
    
    function renderDots() {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalPages(); i++) {
        const dot = document.createElement('button');
        dot.className = 'review-dot' + (i === currentIndex ? ' active' : '');
        dot.setAttribute('aria-label', '후기 ' + (i + 1) + '번째');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      }
    }
    
    function update() {
      const slideWidth = slides[0].offsetWidth + 16;
      track.style.transform = 'translateX(-' + (currentIndex * slideWidth) + 'px)';
      document.querySelectorAll('.review-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= totalPages() - 1;
    }
    
    function goTo(index) {
      currentIndex = Math.max(0, Math.min(index, totalPages() - 1));
      update();
    }
    
    prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
    nextBtn.addEventListener('click', () => goTo(currentIndex + 1));
    
    function init() {
      updatePerView();
      if (currentIndex >= totalPages()) currentIndex = totalPages() - 1;
      renderDots();
      update();
    }
    
    window.addEventListener('resize', init);
    init();
  })();
`;


// ================================================================
// ── 공통 콘텐츠 섹션 함수 (소개 페이지 + 센터 페이지 공용) ────────
// ================================================================
// 소개 페이지와 지점 상세 페이지에서 동일하게 사용하는 4개 섹션.
// 한 곳만 수정하면 양쪽에 자동 반영됨.
//   - getWhySection()        : Why 학습코칭학원
//   - getWawaSystemSection() : 와와 학습 시스템 (탭 + 비교표)
//   - getFourCSection()      : 4C 프로세스
//   - getCurriculumSection() : CURRICULUM (옵션으로 과목 칩 제외 가능)
// ================================================================

function getWhySection() {
  return `
<section class="why-section">
  <div class="why-wrap">
    <div class="why-header">
      <div class="acm-eyebrow">WHY LEARNING COACHING</div>
      <h2 class="acm-h2">다른 학원과 근본적으로 다른<br><span class="accent">특별한 학원</span></h2>
      <p class="acm-sub">단순한 진도 관리가 아닌, 공부하는 법부터 가르칩니다.<br>학생 스스로 학습의 주도권을 갖도록 체계적으로 코칭합니다.</p>
    </div>
    <div class="grid-3">
      <div class="why-card">
        <div class="why-card-badge">POINT 01</div>
        <h3>학생 맞춤 코칭 시스템</h3>
        <p>학생 개별 진단으로 학습 유형과 취약점을 분석합니다. 학생 현재 상황을 파악해 <strong>개인별 맞춤 지도</strong>가 가능합니다.</p>
      </div>
      <div class="why-card">
        <div class="why-card-badge">POINT 02</div>
        <h3>자기주도학습 코칭</h3>
        <p>학생 스스로 계획하고 실행할 수 있도록 <strong>학습 습관과 메타인지</strong>를 길러줍니다.</p>
      </div>
      <div class="why-card">
        <div class="why-card-badge">POINT 03</div>
        <h3>학습, 그 이상의 밀착관리</h3>
        <p>성적뿐 아니라 일상 소통, 학부모 피드백을 통해 학습 습관·리듬·감정 변화까지 살핍니다. <strong>학교생활·학원·학습</strong>의 선순환을 만듭니다.</p>
      </div>
    </div>
  </div>
</section>`;
}

function getWawaSystemSection() {
  return `
<section class="wawa-section">
  <div class="acm-wrap">
    <div class="wawa-header">
      <div class="acm-eyebrow">와와 학습 시스템</div>
      <h2 class="acm-h2">오랜 노하우로 만들어진<br><span class="accent">학습코칭학원 시스템</span></h2>
      <p class="acm-sub">학습 · 계획 · 생활까지 체계적으로 지도합니다.</p>
    </div>

    <div class="wawa-tabs" role="tablist">
      <button class="wawa-tab active" data-tab="plan" role="tab">
        <span class="tab-en">PLAN · 01</span>
        <span class="tab-ko">📋 플랜 관리</span>
      </button>
      <button class="wawa-tab" data-tab="learn" role="tab">
        <span class="tab-en">LEARN · 02</span>
        <span class="tab-ko">✏️ 학습 관리</span>
      </button>
      <button class="wawa-tab" data-tab="care" role="tab">
        <span class="tab-en">CARE · 03</span>
        <span class="tab-ko">💬 생활 관리</span>
      </button>
    </div>

    <div class="wawa-content">
      <div class="wawa-panel active" data-panel="plan">
        <div class="wawa-image"><img src="/images/academy/plan-care.jpg" alt="학습코칭학원 플랜 관리 - 실제 학습 플래너 운영 모습" loading="lazy"></div>
        <div class="wawa-info">
          <div class="wawa-info-eyebrow">PLAN · 01</div>
          <h3 class="wawa-info-title">플랜 관리</h3>
          <p class="wawa-info-desc">공부하라 말하지 않고, <strong>스스로 계획하게</strong> 만듭니다.</p>
          <div class="wawa-info-list">· 주간·월간 목표 공동 수립<br>· 계획-실행-점검 반복 사이클<br>· 자기주도학습 핵심 역량 강화</div>
        </div>
      </div>
      <div class="wawa-panel" data-panel="learn">
        <div class="wawa-image"><img src="/images/academy/learn-care.jpg" alt="학습코칭학원 학습 관리 - 1:1 학습 코칭 진행 모습" loading="lazy"></div>
        <div class="wawa-info">
          <div class="wawa-info-eyebrow">LEARN · 02</div>
          <h3 class="wawa-info-title">학습 관리</h3>
          <p class="wawa-info-desc">진도가 아닌, <strong>완전한 이해</strong>를 목표로 합니다.</p>
          <div class="wawa-info-list">· 수준별 맞춤 교재·커리큘럼<br>· 오답노트·약점은 반복 학습으로 보완<br>· 완전 이해까지 1:1 코칭</div>
        </div>
      </div>
      <div class="wawa-panel" data-panel="care">
        <div class="wawa-image"><img src="/images/academy/life-care.jpg" alt="학습코칭학원 생활 관리 - 자기주도학습 공간 모습" loading="lazy"></div>
        <div class="wawa-info">
          <div class="wawa-info-eyebrow">CARE · 03</div>
          <h3 class="wawa-info-title">생활 관리</h3>
          <p class="wawa-info-desc">수업 시간 너머, <strong>생활 습관</strong>까지 함께 봅니다.</p>
          <div class="wawa-info-list">· 학부모 정기 피드백 리포트<br>· 학생 일상·심리 상태 모니터링<br>· 학교생활-학습 선순환 지원</div>
        </div>
      </div>
    </div>

    <div class="compare-box">
      <div class="compare-header">
        <div class="compare-badge">Why 학습코칭학원</div>
        <h3 class="compare-title">일반 학원 수업과 <span class="accent">학습코칭학원 개인별 맞춤 수업</span>의 차이</h3>
      </div>
      <table class="compare-table">
        <thead>
          <tr><th class="col-bad">일반 학원 수업</th><th class="col-vs">비교</th><th class="col-good">학습코칭학원<br>개인별 맞춤 수업</th></tr>
        </thead>
        <tbody>
          <tr><td class="cell-bad">이해보다 빠른 <em>진도 위주</em></td><td class="cell-label">학습</td><td class="cell-good">이해하지 못하는 부분 <em>반복 학습</em></td></tr>
          <tr><td class="cell-bad">교과서와 다른 <em>정해진 학원교재 사용</em></td><td class="cell-label">교재</td><td class="cell-good">진도와 교재를 학생에게 <em>맞춤 설정</em></td></tr>
          <tr><td class="cell-bad"><em>집체 교육</em>으로 맞춤 학습 불가</td><td class="cell-label">맞춤</td><td class="cell-good">학생의 현재 상황을 파악해 <em>개인별 맞춤 지도</em></td></tr>
          <tr><td class="cell-bad">수업 시간 중 <em>개별 질문 불가</em></td><td class="cell-label">질문</td><td class="cell-good">그때 그때 모르는 부분은 <em>언제든지 질문</em></td></tr>
          <tr><td class="cell-bad"><em>별도의 상담 불가</em></td><td class="cell-label">상담</td><td class="cell-good">정기적 미팅·담당 선생님을 통한 <em>개별 학습코칭</em></td></tr>
          <tr><td class="cell-bad">진단도구가 없거나 <em>별도 비용 부담</em></td><td class="cell-label">진단</td><td class="cell-good">모든 회원에게 자체 개발 <em>진단도구 제공·활용</em></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>`;
}

function getFourCSection() {
  return `
<section class="fourc-section">
  <div class="acm-wrap">
    <div class="fourc-header">
      <div class="acm-eyebrow">4C 프로세스</div>
      <h2 class="acm-h2">개별 맞춤 <span class="accent">학습 시스템</span></h2>
    </div>
    <div class="fourc-intro">
      <p>학습코칭학원만의 <span class="hl-orange">4C 프로세스</span>를 통해<br>학생 개개인의 학습 특성과 장단점을 정확히 분석하고,<br>최적의 맞춤 학습 솔루션을 제공합니다.</p>
      <p>철저한 관리와 맞춤 코칭으로 <span class="hl-green">자기주도 학습 습관</span>을 기르고,<br>학습의 질을 지속적으로 향상시킵니다.</p>
    </div>
    <div class="fourc-cards">
      <div class="fourc-card">
        <div class="fourc-ico-wrap">🔍</div>
        <div class="fourc-en">CHECK</div>
        <h3 class="fourc-name">맞춤진단</h3>
        <div class="fourc-divider"></div>
        <p class="fourc-desc">학생의 학습 성향 · 상태 · 능력 파악</p>
      </div>
      <div class="fourc-card">
        <div class="fourc-ico-wrap">📖</div>
        <div class="fourc-en">CURRICULUM</div>
        <h3 class="fourc-name">맞춤처방</h3>
        <div class="fourc-divider"></div>
        <p class="fourc-desc">학생별 최적화된 지도방법·커리큘럼 처방</p>
      </div>
      <div class="fourc-card">
        <div class="fourc-ico-wrap">💬</div>
        <div class="fourc-en">CONSULTING</div>
        <h3 class="fourc-name">맞춤상담</h3>
        <div class="fourc-divider"></div>
        <p class="fourc-desc">정기적인 상담을 통해 학생의 상황과 변화 파악</p>
      </div>
      <div class="fourc-card">
        <div class="fourc-ico-wrap">🎯</div>
        <div class="fourc-en">COACHING</div>
        <h3 class="fourc-name">맞춤지도</h3>
        <div class="fourc-divider"></div>
        <p class="fourc-desc">학생 개인별 처방에 맞는 맞춤지도</p>
      </div>
    </div>
  </div>
</section>`;
}

// includeSubjects: true=과목 칩 포함(소개 페이지), false=과목 칩 제외(센터 페이지)
function getCurriculumSection(includeSubjects = true) {
  const subjectsCard = includeSubjects ? `
      <div class="curr-card accent">
        <div class="curr-card-header">
          <h3 class="curr-card-title"><span class="ico">📚</span><span>학습과목</span></h3>
          <p class="curr-card-sub">전과목 내신 전문 · 학교별 맞춤 수업</p>
        </div>
        <div class="subject-chips">
          <div class="subject-chip-lg">국어</div>
          <div class="subject-chip-lg">영어</div>
          <div class="subject-chip-lg">수학</div>
          <div class="subject-chip-lg">과학</div>
          <div class="subject-chip-lg">사회</div>
          <div class="subject-chip-lg">한국사</div>
        </div>
      </div>` : '';

  return `
<section class="curr-section-wrap">
  <div class="acm-wrap">
    <div class="curr-header">
      <div class="acm-eyebrow">CURRICULUM</div>
      <h2 class="acm-h2">초·중·고 전과목<br><span class="accent">소수정예 · 개별지도 · 내신전문</span></h2>
      <p class="acm-sub">※ 지점별 수업 과목·학년이 상이할 수 있습니다.</p>
    </div>

    <div class="curr-section">
      <div class="curr-card">
        <div class="curr-card-header">
          <h3 class="curr-card-title"><span class="ico">🎓</span><span>학습대상</span></h3>
          <p class="curr-card-sub">초등부터 고등까지, 학년과 수준에 맞춘 집중 관리!</p>
        </div>
        <div class="grade-grid">
          <div class="grade-card">
            <h4 class="grade-card-name"><span class="emoji">🎒</span>초등학생</h4>
            <ul class="grade-card-points">
              <li>자기주도학습 시작 시기</li>
              <li>공부 습관 만들기</li>
              <li>학습 흥미와 관심 유도</li>
            </ul>
          </div>
          <div class="grade-card">
            <h4 class="grade-card-name"><span class="emoji">📚</span>중학생</h4>
            <ul class="grade-card-points">
              <li>동기부여 및 공부 방법 찾기</li>
              <li>내신 대비 &amp; 수행 평가 집중 플랜</li>
              <li>고등 준비 로드맵</li>
            </ul>
          </div>
          <div class="grade-card">
            <h4 class="grade-card-name"><span class="emoji">🎓</span>고등학생</h4>
            <ul class="grade-card-points">
              <li>내신 &amp; 모의고사 대비</li>
              <li>목표에 맞는 공부 방향 설정</li>
              <li>입시 로드맵</li>
            </ul>
          </div>
        </div>
      </div>
${subjectsCard}
    </div>
  </div>
</section>`;
}


// ── 학원 소개 페이지 (/academy/intro/) ─────────────────────────
export function buildAcademyIntroPage() {
  // 출시 전이면 준비중 페이지로 폴백
  if (!ACADEMY_READY.intro) {
    return buildAcademyComingSoonPage("학원소개", "intro");
  }

  const canonical = `${SITE_DOMAIN}/academy/intro/`;
  const titleTag = `학습코칭학원 소개 | ${SITE_NAME}`;
  const description = `초·중·고 전과목 소수정예 개별지도 학습코칭학원. 30년 노하우의 와와 학습 시스템과 4C 프로세스로 자기주도학습 습관을 길러드립니다. 전국 200+ 지점.`;

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titleTag}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${titleTag}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${SITE_DOMAIN}/images/og-image.png">
  <meta property="og:url" content="${canonical}">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;800&display=swap" rel="stylesheet">
  <style>
    ${HEADER_CSS}
    ${FLOAT_CSS}
    ${ACADEMY_INTRO_CSS}
  </style>
</head>
<body>
${HEADER_HTML}

<!-- 1. HERO -->
<section class="academy-hero">
  <div class="academy-hero-inner">
    <div class="academy-hero-badge">
      <span style="margin-right:6px;">✦</span>학습코칭학원 · 30년 노하우
    </div>
    <h1>
      노하우를 담아낸<br>
      <span class="hl">차별화된 시스템</span>,<br>
      개인별 맞춤 학원
    </h1>
    <p class="lead">
      초·중·고 전과목 · 소수정예 · 개별지도 · 내신전문<br>
      <span class="sm">단순한 진도 학원이 아닌, 공부하는 방법부터 가르치는 학습코칭학원입니다.</span>
    </p>
    <div class="hero-btns">
      <a href="#cta" class="hero-btn-primary">📝 무료 상담 신청</a>
      <a href="tel:${PHONE.replace(/-/g, '')}" class="hero-btn-secondary">📞 전화 상담</a>
      <a href="#branch" class="hero-btn-secondary">📍 가까운 지점 찾기</a>
    </div>
    <p class="hero-note">
      상담은 예약제로 운영됩니다. 문의 주시면 확인 후 안내 도와드리겠습니다.
    </p>
  </div>
</section>

<!-- 2. 신뢰지표 -->
<section class="trust-section">
  <div class="trust-grid">
    <div class="trust-card"><div class="ico">🏆</div><div class="num">30년</div><div class="lbl">학습코칭 노하우</div></div>
    <div class="trust-card"><div class="ico">🏫</div><div class="num">200+</div><div class="lbl">전국 직영 센터</div></div>
    <div class="trust-card"><div class="ico">⭐</div><div class="num">96.7%</div><div class="lbl">학습 만족도</div></div>
    <div class="trust-card"><div class="ico">📊</div><div class="num">1:1</div><div class="lbl">개별 학습 분석</div></div>
  </div>
</section>

<!-- 3~6. 공통 콘텐츠 (Why · 와와시스템 · 4C · CURRICULUM) -->
${getWhySection()}
${getWawaSystemSection()}
${getFourCSection()}
${getCurriculumSection(true)}

<!-- 7. 지점 찾기 -->
<section id="branch" class="branch-section">
  <div class="acm-wrap">
    <div class="branch-cta">
      <div class="branch-cta-inner">
        <div class="branch-cta-badge">📍 가까운 지점 찾기</div>
        <h2 class="branch-cta-title">우리 동네 <span class="hl">학습코칭학원</span>은 어디에 있을까요?</h2>
        <p class="branch-cta-desc">전국 200+ 지점 · 지점별 수업 과목·학년·시간을 한눈에 확인하세요.</p>
        <a href="/academy/location/" class="branch-cta-btn">지점 찾기 →</a>
      </div>
    </div>
  </div>
</section>

<!-- 8. FAQ -->
<section class="faq-section">
  <div class="acm-wrap" style="max-width:760px;">
    <div class="faq-header">
      <div class="acm-eyebrow">FAQ</div>
      <h2 class="acm-h2">자주 묻는 <span class="accent">질문</span></h2>
      <p class="acm-sub">상담 전 궁금하신 점을 먼저 확인하세요.</p>
    </div>

    <div class="faq-item">
      <div class="faq-q">상담은 어떻게 진행되나요?</div>
      <div class="faq-a">상담은 <strong>예약제</strong>로 진행됩니다.<br>상담 문의하시면 순차적으로 연락드려 상담 예약 드리며, 세부 일정은 지점을 통해서 안내받으실 수 있습니다.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">수업료는 어떻게 될까요?</div>
      <div class="faq-a">
        수업료는 <strong>지역·학년·수업 횟수·과목</strong>에 따라 다를 수 있습니다.<br>자세한 교육비는 학원 내방 상담하여 안내 받으실 수 있습니다.
${renderPricingTables()}
      </div>
    </div>

    <div class="faq-item">
      <div class="faq-q">어떤 학년부터 수강할 수 있나요?</div>
      <div class="faq-a">초등학교 1학년부터 고등학교 3학년 학생까지 가능합니다.<br>지점별로 수업 과목과 학년이 다를 수 있어 상담 시 확인 해 드립니다.</div>
    </div>

    <div class="faq-item">
      <div class="faq-q">학원 차량이 운행 되나요?</div>
      <div class="faq-a">안전상의 이유로 차량은 운행하지 않습니다.</div>
    </div>
  </div>
</section>

<!-- 9. 후기 슬라이드 -->
<section class="reviews-section">
  <div class="acm-wrap">
    <div class="reviews-header">
      <div class="acm-eyebrow">REAL REVIEWS</div>
      <h2 class="acm-h2">달라진 아이들의 <span class="accent">진짜 이야기</span></h2>
    </div>

    <div class="reviews-container">
      <div class="reviews-viewport">
        <div class="reviews-track" id="reviewsTrack">
${renderReviewSlides()}
        </div>
      </div>

      <div class="reviews-controls">
        <button class="review-arrow" id="reviewPrev" aria-label="이전 후기">‹</button>
        <div class="review-dots" id="reviewDots"></div>
        <button class="review-arrow" id="reviewNext" aria-label="다음 후기">›</button>
      </div>
    </div>
  </div>
</section>

<!-- 10. 최종 CTA -->
<section id="cta" class="cta-section">
  <div class="acm-wrap">
    <div class="cta-banner">
      <div class="cta-banner-inner">
        <div class="cta-badge">✦ 무료 상담 신청</div>
        <h2 class="cta-title">아이의 공부, <span class="hl">함께 고민해 드릴게요</span></h2>
        <p class="cta-desc">상담은 예약제로 운영됩니다.<br>아래로 문의 주시면 확인 후 상담 예약 도와드리겠습니다.</p>
        <div class="cta-btn-grid">
          <a href="${FORM_URL}" target="_blank" class="cta-btn-primary">
            <div class="cta-btn-icon">📝</div>
            <div class="cta-btn-label">무료 상담 신청</div>
          </a>
          <a href="${KAKAO_URL}" target="_blank" class="cta-btn-secondary">
            <div class="cta-btn-icon">💬</div>
            <div class="cta-btn-label">카카오톡 상담</div>
          </a>
          <a href="tel:${PHONE.replace(/-/g, '')}" class="cta-btn-secondary">
            <div class="cta-btn-icon">📞</div>
            <div class="cta-btn-label">전화 문의</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

${FOOTER_HTML}
${FLOAT_HTML}

<script>
${ACADEMY_INTRO_JS}
</script>

</body>
</html>`;
}


// ── 학원 위치 안내 허브 (/academy/location/) ───────────────────
export function buildAcademyLocationHubPage() {
  // 출시 전이면 준비중 페이지로 폴백
  if (!ACADEMY_READY.location) {
    return buildAcademyComingSoonPage("학원 위치 안내", "location");
  }

  const canonical = `${SITE_DOMAIN}/academy/location/`;
  const titleTag = `전국 학원 위치 안내 | ${SITE_NAME}`;
  const description = `전국 ${ACADEMY_LOCATION_TOTAL}개 학습코칭학원 센터 위치를 시·도별로 안내합니다. 우리 동네 가까운 1:1 학습코칭 센터를 찾아보세요. 서울·인천·경기·대구·부산 등 전국 운영.`;

  // 시·도 카드 HTML 생성
  const sidoCards = ACADEMY_LOCATION_SIDOS.map(sido => `
    <a href="/academy/location/${sido.slug}/" class="loc-sido-card">
      <div class="loc-sido-card-top">
        <div class="loc-sido-card-name"><span class="ico">${sido.icon}</span>${sido.name}</div>
        <div class="loc-sido-card-badge">${sido.count}</div>
      </div>
      <div class="loc-sido-card-desc">${sido.desc}</div>
    </a>`).join('');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titleTag}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${titleTag}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${SITE_DOMAIN}/images/og-image.png">
  <meta property="og:url" content="${canonical}">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;800&display=swap" rel="stylesheet">
  <style>
    ${HEADER_CSS}
    ${FLOAT_CSS}
    ${ACADEMY_INTRO_CSS}
    ${ACADEMY_LOCATION_HUB_CSS}
  </style>
</head>
<body>
${HEADER_HTML}

<!-- 브래드크럼 -->
<nav class="loc-breadcrumb" aria-label="현재 위치">
  <a href="/">홈</a><span class="sep">›</span>
  <a href="/academy/intro/">학원</a><span class="sep">›</span>
  <span class="current">위치 안내</span>
</nav>

<!-- 1. HERO -->
<section class="loc-hero">
  <div class="loc-hero-inner">
    <div class="loc-hero-eyebrow">ACADEMY LOCATION</div>
    <h1>전국 학습코칭학원<br><span class="hl">센터 찾기</span></h1>
    <p class="loc-hero-sub">전국 ${ACADEMY_LOCATION_TOTAL}개 센터에서 운영하는 특별한 학원을 만나보세요</p>
  </div>
</section>

<!-- 2. 신뢰지표 (학원 소개와 동일 패턴) -->
<section class="trust-section">
  <div class="trust-grid">
    <div class="trust-card"><div class="ico">🏆</div><div class="num">30년</div><div class="lbl">학습코칭 노하우</div></div>
    <div class="trust-card"><div class="ico">🏫</div><div class="num">${ACADEMY_LOCATION_TOTAL}</div><div class="lbl">전국 센터</div></div>
    <div class="trust-card"><div class="ico">⭐</div><div class="num">96.7%</div><div class="lbl">학습 만족도</div></div>
    <div class="trust-card"><div class="ico">📊</div><div class="num">1:1</div><div class="lbl">개별 학습 분석</div></div>
  </div>
</section>

<!-- 3. 시·도별 센터 안내 -->
<section class="loc-sidos-section">
  <div class="loc-sidos-header">
    <div class="loc-sidos-header-top">
      <h2 class="loc-sidos-title">📍 시·도별 센터 안내</h2>
      <div class="loc-sidos-count">총 ${ACADEMY_LOCATION_TOTAL}개 센터</div>
    </div>
    <p class="loc-sidos-desc">지역을 선택하면 해당 시·도의 센터 정보를 확인할 수 있습니다.</p>
  </div>
  <div class="loc-sidos-grid">${sidoCards}
  </div>
</section>

<!-- 4. 최종 CTA (학원 소개와 동일 패턴) -->
<section id="cta" class="cta-section">
  <div class="acm-wrap">
    <div class="cta-banner">
      <div class="cta-banner-inner">
        <div class="cta-badge">✦ 무료 상담 신청</div>
        <h2 class="cta-title">우리 동네 센터 <span class="hl">상담 받고 싶다면</span></h2>
        <p class="cta-desc">상담 문의 주시면 가까운 센터 상담 안내 드립니다.<br>상담은 예약제로 운영됩니다.</p>
        <div class="cta-btn-grid">
          <a href="${FORM_URL}" target="_blank" rel="noopener" class="cta-btn-primary">
            <div class="cta-btn-icon">📝</div>
            <div class="cta-btn-label">무료 상담 신청</div>
          </a>
          <a href="${KAKAO_URL}" target="_blank" rel="noopener" class="cta-btn-secondary">
            <div class="cta-btn-icon">💬</div>
            <div class="cta-btn-label">카카오톡 상담</div>
          </a>
          <a href="tel:${PHONE.replace(/-/g, '')}" class="cta-btn-secondary">
            <div class="cta-btn-icon">📞</div>
            <div class="cta-btn-label">전화 상담</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

${FOOTER_HTML}
${FLOAT_HTML}

</body>
</html>`;
}


// ── 시도별 지점 목록 (/academy/location/{sido}/) ───────────────
//
// 광역 묶음 슬러그: "chungcheong"(충남+충북), "daejeon-sejong",
//                  "gyeongsang"(경북+경남), "jeju-gangwon"(강원+제주)
//
// 카드는 시·군·구 단위로 그룹핑하여 탭으로 보여줌.
// 첫 진입 시: 가나다 순 첫 시·군이 자동 활성화.
// ================================================================
export function buildAcademyLocationSidoPage(sido) {
  if (!ACADEMY_READY.location) {
    return buildAcademyComingSoonPage(`${sido} 학원 위치`, "location");
  }

  // 시·도 메타 데이터 찾기
  const sidoData = ACADEMY_LOCATION_SIDOS.find(s => s.slug === sido);
  if (!sidoData) {
    return buildAcademyComingSoonPage("학원 위치 안내", "location");
  }

  // ── 광역 묶음에 속하는 시·도들의 한글명 매핑 ──
  // sub 배열에 든 한글 시·도명들로 ACADEMY_CENTERS 필터링
  const targetSidoNames = sidoData.sub || [sidoData.name];

  // 해당 시·도 지점들만 필터링
  const centers = ACADEMY_CENTERS.filter(c => targetSidoNames.includes(c.sidoName));

  // 시·군·구별 그룹핑 (가나다 순 정렬)
  const sigunguGroups = {};
  centers.forEach(c => {
    // sigungu 없으면(세종 등 단층제) 시·도명 + "시"로 대체
    const sg = c.sigungu || (c.sidoName + '시');
    if (!sigunguGroups[sg]) {
      sigunguGroups[sg] = [];
    }
    sigunguGroups[sg].push(c);
  });
  const sortedSigungu = Object.keys(sigunguGroups).sort((a, b) => a.localeCompare(b, 'ko'));

  if (sortedSigungu.length === 0) {
    return buildAcademyComingSoonPage(`${sidoData.name} 학원 위치`, "location");
  }

  const firstSigungu = sortedSigungu[0]; // 가나다 순 첫 시·군 = 기본 활성화

  // ── SEO 메타 ──
  const canonical = `${SITE_DOMAIN}/academy/location/${sido}/`;
  const titleTag = `${sidoData.name} 학원 위치 안내 | ${sidoData.count}개 센터 | ${SITE_NAME}`;
  const description = `${sidoData.name} 지역 ${sidoData.count}개 학습코칭학원 센터 안내. ${sortedSigungu.slice(0, 5).join('·')} 등에서 1:1 학습코칭 운영. 우리 동네 가까운 센터를 찾아보세요.`;

  // ── 시·군·구 탭 HTML ──
  const tabsHtml = sortedSigungu.map((sg, idx) => {
    const count = sigunguGroups[sg].length;
    const isActive = idx === 0 ? 'active' : '';
    // 시·군·구 한글 → 슬러그 (간단한 매핑, 영문 슬러그를 가져옴)
    // centers에서 sigungu 값으로 첫 번째 지점 슬러그를 가져와 sigungu 부분 추출
    const sample = sigunguGroups[sg][0];
    // sample.slug 형식: "sido-sigungu-name..."
    // sigungu 슬러그는 두 번째 토큰
    const slugParts = sample.slug.split('-');
    const sgSlug = slugParts[1] || sg.replace(/[시군구]/g, '');
    return `<button class="loc-tab ${isActive}" data-sigungu="${sgSlug}" type="button">${sg} ${count}</button>`;
  }).join('\n      ');

  // ── 시·군·구별 메타 데이터 (JS에서 헤더 갱신용) ──
  const sgMeta = {};
  sortedSigungu.forEach(sg => {
    const sample = sigunguGroups[sg][0];
    const slugParts = sample.slug.split('-');
    const sgSlug = slugParts[1] || sg.replace(/[시군구]/g, '');
    const count = sigunguGroups[sg].length;
    const desc = `${sg}에 위치한 학습코칭학원입니다.`;
    sgMeta[sgSlug] = { name: sg, count, desc };
  });

  // ── 시·군·구별 카드 패널 HTML ──
  const panelsHtml = sortedSigungu.map((sg, idx) => {
    const sample = sigunguGroups[sg][0];
    const slugParts = sample.slug.split('-');
    const sgSlug = slugParts[1] || sg.replace(/[시군구]/g, '');
    const isActive = idx === 0 ? 'active' : '';
    
    // 시·군·구 내 지점들을 가나다 순 정렬
    const cardsInGroup = [...sigunguGroups[sg]].sort((a, b) => a.name.localeCompare(b.name, 'ko'));
    
    const cardsHtml = cardsInGroup.map(c => {
      // 카드 표시용 주소: 시·군·구 빼고 동·도로명만
      // 예: "경기 고양시 일산서구 산현로17번길 23" → "일산서구 산현로17번길 23"
      let displayAddr = c.address;
      const addrParts = c.address.split(/\s+/);
      if (addrParts.length >= 3) {
        // 첫 두 토큰(시도+시군구)을 제거
        displayAddr = addrParts.slice(2).join(' ');
        // 너무 길면 자름 (앞 50자)
        if (displayAddr.length > 50) {
          displayAddr = displayAddr.substring(0, 47) + '...';
        }
      }

      // 수업 과목 (운영 중인 것만 표시 - subjects의 각 키에 배열이 있으면 운영)
      const activeSubjects = [];
      const subjectLabels = {
        korean: '국어', english: '영어', math: '수학', science: '과학', social: '사회'
      };
      Object.keys(subjectLabels).forEach(key => {
        if (c.subjects[key] && c.subjects[key].length > 0) {
          activeSubjects.push(subjectLabels[key]);
        }
      });
      const subjectsChips = activeSubjects.map(s =>
        `<span class="loc-card-subj">${s}</span>`
      ).join('');

      // NEW 뱃지
      const newBadge = c.isNew
        ? `<span class="loc-card-new">NEW</span>`
        : '';

      // 브랜드 표시 라벨 (와와는 표시 안 함, 나머지만 표시)
      const brandLabels = {
        modu: "모두",
        gloride: "글로리드",
        wplus: "W+"
      };
      const brandSuffix = brandLabels[c.brand]
        ? ` <span class="loc-card-brand">(${brandLabels[c.brand]})</span>`
        : "";

      return `
        <article class="loc-card">
          <div class="loc-card-head">
            <h3 class="loc-card-name">${c.name}${brandSuffix}</h3>
            ${newBadge}
          </div>
          <div class="loc-card-addr">
            <span class="loc-card-addr-icon">📍</span>
            <span>${displayAddr}</span>
          </div>
          <div class="loc-card-subjects">${subjectsChips}</div>
          <div class="loc-card-actions">
            <a href="/academy/center/${c.slug}/" class="loc-card-btn loc-card-btn-detail">상세보기</a>
            <button class="loc-card-btn loc-card-btn-apply" data-branch="${c.name} (${c.sidoName} ${c.sigungu})" type="button">상담신청</button>
          </div>
        </article>`;
    }).join('');

    return `
      <div class="loc-panel ${isActive}" id="panel-${sgSlug}">
        <div class="loc-cards-grid">${cardsHtml}
        </div>
      </div>`;
  }).join('\n');

  // ── 첫 시·군 헤더 정보 ──
  const firstSgMeta = sgMeta[Object.keys(sgMeta)[0]];

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titleTag}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${titleTag}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${SITE_DOMAIN}/images/og-image.png">
  <meta property="og:url" content="${canonical}">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    ${HEADER_CSS}
    ${FLOAT_CSS}
    ${ACADEMY_INTRO_CSS}
    ${ACADEMY_LOCATION_HUB_CSS}
    ${ACADEMY_LOCATION_SIDO_CSS}
    ${ACADEMY_FORM_MODAL_CSS}
  </style>
</head>
<body>
${HEADER_HTML}

<!-- 브래드크럼 -->
<nav class="loc-breadcrumb" aria-label="현재 위치">
  <a href="/">홈</a><span class="sep">›</span>
  <a href="/academy/intro/">학원</a><span class="sep">›</span>
  <a href="/academy/location/">위치 안내</a><span class="sep">›</span>
  <span class="current">${sidoData.name}</span>
</nav>

<!-- 1. 시·도 히어로 -->
<section class="loc-sido-hero">
  <div class="loc-sido-hero-inner">
    <div class="loc-sido-hero-text">
      <div class="loc-sido-hero-eyebrow">${sido.toUpperCase()}</div>
      <h1><span class="ico">${sidoData.icon}</span> ${sidoData.name} 학습코칭학원</h1>
      <p class="loc-sido-hero-sub">${sortedSigungu.length}개 시·군·구에서 운영하는 1:1 학습코칭 센터</p>
    </div>
    <div class="loc-sido-hero-count">
      <div class="loc-sido-hero-num">${sidoData.count}</div>
      <span class="loc-sido-hero-num-label">센터</span>
    </div>
  </div>
</section>

<!-- 2. 시·군·구 탭 (가나다 순 6열 그리드) -->
<section class="loc-tabs-section">
  <div class="loc-tabs-inner">
    <div class="loc-tabs-label">📍 시·군·구 선택 (가나다 순)</div>
    <div class="loc-tabs-grid">
      ${tabsHtml}
    </div>
  </div>
</section>

<!-- 3. 선택된 시·군 헤더 (JS로 갱신) -->
<section class="loc-sgheader-section">
  <div class="loc-sgheader-inner">
    <div class="loc-sgheader-top">
      <h2 class="loc-sgheader-title" id="loc-sg-title">📍 ${firstSgMeta.name}</h2>
      <div class="loc-sgheader-count" id="loc-sg-count">${firstSgMeta.count}개 센터</div>
    </div>
    <p class="loc-sgheader-desc" id="loc-sg-desc">${firstSgMeta.desc}</p>
  </div>
</section>

<!-- 4. 시·군·구별 지점 카드 (탭 패널) -->
<section class="loc-cards-section">
  <div class="loc-cards-inner">
    ${panelsHtml}
  </div>
</section>

<!-- 5. 학원 → 과외 자연스러운 유도 (6과목) -->
<section class="loc-tutoring-section">
  <div class="loc-tutoring-inner">
    <div class="loc-tutoring-box">
      <div class="loc-tutoring-flex">
        <div class="loc-tutoring-icon">📚</div>
        <div class="loc-tutoring-content">
          <div class="loc-tutoring-title">학원에서 운영하지 않는 과목도 1:1 과외로 가능합니다</div>
          <div class="loc-tutoring-desc">전국 어디서나 가능한 맞춤 과외 — 한국사를 포함한 6과목 운영</div>
          <div class="loc-tutoring-links">
            <a href="/study/korean/" class="loc-tutoring-link">국어 →</a>
            <a href="/study/english/" class="loc-tutoring-link">영어 →</a>
            <a href="/study/math/" class="loc-tutoring-link">수학 →</a>
            <a href="/study/science/" class="loc-tutoring-link">과학 →</a>
            <a href="/study/social/" class="loc-tutoring-link">사회 →</a>
            <a href="/study/history/" class="loc-tutoring-link">한국사 →</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 6. 하단 CTA (학원 외 통합 상담 - 네이버 폼) -->
<section class="loc-cta-section">
  <div class="loc-cta-inner">
    <div class="loc-cta-banner">
      <h2 class="loc-cta-title">학원 외에도 상담이 필요하시다면</h2>
      <p class="loc-cta-desc">상담 후 무료 시범수업까지! 부담없이 연락주세요</p>
      <div class="loc-cta-btns">
        <a href="${FORM_URL}" target="_blank" rel="noopener" class="loc-cta-btn loc-cta-btn-primary">📝 통합 상담 신청</a>
        <a href="${KAKAO_URL}" target="_blank" rel="noopener" class="loc-cta-btn loc-cta-btn-secondary">💬 카카오톡</a>
        <a href="tel:${PHONE.replace(/-/g, '')}" class="loc-cta-btn loc-cta-btn-secondary">📞 전화 상담</a>
      </div>
    </div>
  </div>
</section>

${FOOTER_HTML}
${FLOAT_HTML}

<!-- 상담 폼 팝업 모달 -->
${ACADEMY_FORM_MODAL_HTML}

<script>
  // 시·군·구 메타 데이터 (탭 전환 시 헤더 갱신용)
  window.LOC_SG_META = ${JSON.stringify(sgMeta)};
  ${ACADEMY_LOCATION_SIDO_JS}
  ${ACADEMY_FORM_MODAL_JS}
</script>

</body>
</html>`;
}


// ── 지점 상세 페이지 (/academy/center/{slug}/) ─────────────────
//
// 12개 섹션:
//   1. 히어로 (지점명+NEW+상담신청)
//   2. 학원 정보 (네이버 지도 + 주소·명칭·등록번호)
//   3. 수업 가능 학년 (학년 범위별 과목 카드)
//   4. 인근 학교 (초·중·고)
//   5~8. 공통 콘텐츠 (와와시스템·Why·4C·CURRICULUM)
//   9. FAQ (수업료·과목요약·상담·차량)
//   10. CTA
//   11. 같은 시군구 다른 학원 (0개면 숨김)
//   12. 1:1 과외 배너
// ================================================================
export function buildAcademyCenterPage(slug) {
  if (!ACADEMY_READY.location) {
    return buildAcademyComingSoonPage("학원 지점 상세", "location");
  }

  // 지점 찾기
  const center = ACADEMY_CENTERS.find(c => c.slug === slug);
  if (!center) {
    return buildAcademyComingSoonPage("학원 지점 상세", "location");
  }

  const c = center;
  const brandLabels = { modu: "모두", gloride: "글로리드", wplus: "W+" };
  const brandSuffix = brandLabels[c.brand] ? ` (${brandLabels[c.brand]})` : "";

  // ── 주소에서 상세(건물명) 분리 ──
  // address 예: "경기 고양시 일산서구 산현로17번길 23  은행프라자 4층"
  const addressFull = c.address;

  // ── 네이버 지도 링크 (개별 링크 우선, 없으면 주소 검색) ──
  const mapUrl = c.naverMapUrl
    || `https://map.naver.com/v5/search/${encodeURIComponent(c.address)}`;

  // ── 과목 라벨 ──
  const SUBJ_LABELS = { korean: "국어", english: "영어", math: "수학", science: "과학", social: "사회" };
  const GRADE_ORDER = ["초1","초2","초3","초4","초5","초6","중1","중2","중3","고1","고2","고3"];

  // ── 학년 범위별 과목 그룹핑 (수업 가능 학년 카드용) ──
  // 각 학교급(초·중·고)에서, 학년별로 가능한 과목을 모아 범위로 압축
  function buildGradeLevelData(levelPrefix, levelGrades) {
    // levelGrades: ["초1","초2",...,"초6"] 또는 중/고
    // 각 학년마다 가능 과목 리스트 구하기
    const gradeSubjects = {}; // "초1" → ["국어","영어",...]
    levelGrades.forEach(g => {
      const subs = [];
      Object.keys(SUBJ_LABELS).forEach(key => {
        if (c.subjects[key] && c.subjects[key].includes(g)) {
          subs.push(SUBJ_LABELS[key]);
        }
      });
      gradeSubjects[g] = subs;
    });
    // 연속된 학년 중 과목 구성이 같은 것끼리 묶기
    const ranges = [];
    let curStart = null, curSubs = null;
    levelGrades.forEach((g, idx) => {
      const subs = gradeSubjects[g];
      const subsKey = subs.join(",");
      if (subs.length === 0) {
        // 과목 없는 학년 → 현재 범위 종료
        if (curStart !== null) {
          ranges.push({ start: curStart, end: levelGrades[idx-1], subs: curSubs });
          curStart = null; curSubs = null;
        }
        return;
      }
      if (curStart === null) {
        curStart = g; curSubs = subs;
      } else if (subsKey !== curSubs.join(",")) {
        // 과목 구성 바뀜 → 이전 범위 종료, 새 범위 시작
        ranges.push({ start: curStart, end: levelGrades[idx-1], subs: curSubs });
        curStart = g; curSubs = subs;
      }
    });
    if (curStart !== null) {
      ranges.push({ start: curStart, end: levelGrades[levelGrades.length-1], subs: curSubs });
    }
    return ranges;
  }

  const elemRanges = buildGradeLevelData("초", ["초1","초2","초3","초4","초5","초6"]);
  const middleRanges = buildGradeLevelData("중", ["중1","중2","중3"]);
  const highRanges = buildGradeLevelData("고", ["고1","고2","고3"]);

  // 범위 표시용 텍스트 ("초1" → "초1", 시작=끝이면 단일)
  function rangeLabel(r) {
    return r.start === r.end ? r.start : `${r.start}~${r.end}`;
  }

  // 학년 카드 HTML 생성
  function gradeCardHtml(levelClass, levelIcon, levelName, ranges) {
    if (ranges.length === 0) {
      return `<div class="ctr-grade-card ${levelClass}">
        <div class="ctr-grade-card-title">${levelIcon} ${levelName}</div>
        <div class="ctr-grade-empty">운영하지 않습니다</div>
      </div>`;
    }
    const rangesHtml = ranges.map(r => `
        <div class="ctr-grade-range">
          <div class="ctr-grade-range-label">${rangeLabel(r)}</div>
          <div class="ctr-grade-chips">${r.subs.map(s => `<span class="ctr-grade-chip">${s}</span>`).join('')}</div>
        </div>`).join('');
    return `<div class="ctr-grade-card ${levelClass}">
        <div class="ctr-grade-card-title">${levelIcon} ${levelName}</div>${rangesHtml}
      </div>`;
  }

  const gradeCardsHtml =
    gradeCardHtml("elem", "🎒", "초등", elemRanges) +
    gradeCardHtml("middle", "📚", "중등", middleRanges) +
    gradeCardHtml("high", "🎓", "고등", highRanges);

  // ── 인근 학교 카드 ──
  function schoolCardHtml(levelClass, levelIcon, levelName, schools) {
    if (!schools || schools.length === 0) {
      return `<div class="ctr-school-card ${levelClass}">
        <div class="ctr-school-title">${levelIcon} ${levelName} (0개)</div>
        <div class="ctr-school-empty">정보 없음</div>
      </div>`;
    }
    const chips = schools.map(s => `<span class="ctr-school-chip">${s}</span>`).join('');
    return `<div class="ctr-school-card ${levelClass}">
        <div class="ctr-school-title">${levelIcon} ${levelName} (${schools.length}개)</div>
        <div class="ctr-school-chips">${chips}</div>
      </div>`;
  }

  const hasSchools = (c.targets.elem.length + c.targets.middle.length + c.targets.high.length) > 0;
  const schoolCardsHtml =
    schoolCardHtml("elem", "🎒", "초등", c.targets.elem) +
    schoolCardHtml("middle", "📚", "중등", c.targets.middle) +
    schoolCardHtml("high", "🎓", "고등", c.targets.high);

  // ── FAQ Q2: 과목/학년 요약 자동 문장 ──
  // 한국어 조사 자동 처리 (받침 유무에 따라)
  function josa(word, type) {
    const lastChar = word.charCodeAt(word.length - 1);
    const hasJongseong = (lastChar >= 0xAC00 && lastChar <= 0xD7A3)
      ? (lastChar - 0xAC00) % 28 !== 0
      : false;
    if (type === '은는') return hasJongseong ? '은' : '는';
    if (type === '을를') return hasJongseong ? '을' : '를';
    if (type === '이가') return hasJongseong ? '이' : '가';
    return '';
  }
  // 과목별 학년 범위를 모아서 자연스러운 문장 생성
  function subjectSummary() {
    // 과목별 (시작~끝) 범위 구하기
    const subjRanges = {}; // "국어" → "초1~고3"
    Object.keys(SUBJ_LABELS).forEach(key => {
      const grades = c.subjects[key];
      if (grades && grades.length > 0) {
        // GRADE_ORDER 기준 정렬
        const sorted = grades.slice().sort((a,b) => GRADE_ORDER.indexOf(a) - GRADE_ORDER.indexOf(b));
        const first = sorted[0], last = sorted[sorted.length-1];
        // 학년 표기 변환 (초1 → 초등 1학년)
        const label = (g) => {
          const lv = g[0] === '초' ? '초등' : g[0] === '중' ? '중등' : '고등';
          return `${lv} ${g.slice(1)}학년`;
        };
        const range = first === last ? label(first) : `${label(first)}부터 ${label(last)}까지`;
        subjRanges[SUBJ_LABELS[key]] = range;
      }
    });

    // 같은 범위끼리 과목 묶기
    const rangeToSubjs = {}; // "초등 1학년부터 고등 3학년까지" → ["국어","영어","수학"]
    Object.keys(subjRanges).forEach(subj => {
      const r = subjRanges[subj];
      if (!rangeToSubjs[r]) rangeToSubjs[r] = [];
      rangeToSubjs[r].push(subj);
    });

    // 문장 조립
    const parts = Object.keys(rangeToSubjs).map(r => {
      const subjs = rangeToSubjs[r];
      const subjText = subjs.join('·');
      return `<strong>${subjText}</strong>${josa(subjs[subjs.length-1], '을를')} ${r}`;
    });

    if (parts.length === 0) {
      return `${c.name}의 수업 과목은 상담 시 안내해 드립니다.`;
    }
    return `${c.name}${josa(c.name, '은는')} ${parts.join(', ')} 수업하고 있습니다. 학생별 수준에 맞춘 1:1 맞춤 학습코칭으로 진행되며, 자세한 과목·학년은 상담 시 안내해 드립니다.`;
  }

  // ── FAQ Q1: 수업료 그룹 가격표 ──
  const priceGroup = PRICING_GROUPS[c.pricingGroup - 1] || PRICING_GROUPS[1];
  const priceNotice = `※ 수업료는 학년, 수업 횟수, 과목에 따라 달라질 수 있습니다.<br>※ 자세한 교육비는 내방 상담 후 안내받으실 수 있습니다.<br>※ 학생 학업 수준에 맞는 수업 시간으로 상담 드리며, 학생 상황에 따라 횟수 및 수업료가 상이합니다.`;

  const priceRowsHtml = priceGroup.frequencies.map((freq, i) => `
            <tr>
              <td class="freq-cell">${freq}</td>
              <td>${priceGroup.prices[i][0]}</td>
              <td>${priceGroup.prices[i][1]}</td>
              <td>${priceGroup.prices[i][2]}</td>
            </tr>`).join('');

  const priceTableHtml = `
          <div class="ctr-price-notice">${priceNotice}</div>
          <table class="ctr-price-table">
            <thead>
              <tr><th></th><th>초등</th><th>중등</th><th>고등</th></tr>
            </thead>
            <tbody>${priceRowsHtml}
            </tbody>
          </table>
          <div class="ctr-price-unit">단위: 원 / 월</div>`;

  // ── 같은 시군구 다른 학원 (현재 지점 제외, 0개면 숨김) ──
  const otherCenters = ACADEMY_CENTERS.filter(o =>
    o.sigungu === c.sigungu && o.sidoName === c.sidoName && o.slug !== c.slug
  ).slice(0, 3);

  let othersSectionHtml = '';
  if (otherCenters.length > 0) {
    const otherCardsHtml = otherCenters.map(o => {
      const oBrand = brandLabels[o.brand] ? ` <span class="ctr-other-brand">(${brandLabels[o.brand]})</span>` : '';
      // 주소 간략화 (시군구 다음 부분)
      const oAddrParts = o.address.split(/\s+/);
      const oShortAddr = oAddrParts.slice(2, 4).join(' ');
      return `
        <a href="/academy/center/${o.slug}/" class="ctr-other-card" style="text-decoration:none;display:block">
          <div class="ctr-other-name">${o.name}${oBrand}</div>
          <div class="ctr-other-addr">📍 ${oShortAddr}</div>
          <span class="ctr-other-link">자세히 보기 →</span>
        </a>`;
    }).join('');

    othersSectionHtml = `
<section class="ctr-section">
  <div class="ctr-section-inner">
    <h2 class="ctr-h2">🏆 ${c.sigungu} 다른 학원</h2>
    <p class="ctr-sub">${c.name}${josa(c.name, '은는') === '은' ? '과' : '와'} 가까운 ${c.sigungu} 내 학습코칭학원입니다.</p>
    <div class="ctr-others-grid">${otherCardsHtml}
    </div>
    <div class="ctr-others-more">
      <a href="/academy/location/${getSidoSlugForCenter(c)}/#${getSigunguSlug(c)}" class="ctr-others-more-btn">${c.sigungu} 전체 학원 보기 →</a>
    </div>
  </div>
</section>`;
  }

  // ── 1:1 과외 배너 (시·도 페이지와 동일) ──
  const tutoringBannerHtml = `
<section class="ctr-section">
  <div class="ctr-section-inner">
    <div class="loc-tutoring-box">
      <div class="loc-tutoring-flex">
        <div class="loc-tutoring-icon">📚</div>
        <div class="loc-tutoring-content">
          <div class="loc-tutoring-title">학원에서 운영하지 않는 과목도 1:1 과외로 가능합니다</div>
          <div class="loc-tutoring-desc">전국 어디서나 가능한 맞춤 과외 — 한국사를 포함한 6과목 운영</div>
          <div class="loc-tutoring-links">
            <a href="/study/korean/" class="loc-tutoring-link">국어 →</a>
            <a href="/study/english/" class="loc-tutoring-link">영어 →</a>
            <a href="/study/math/" class="loc-tutoring-link">수학 →</a>
            <a href="/study/science/" class="loc-tutoring-link">과학 →</a>
            <a href="/study/social/" class="loc-tutoring-link">사회 →</a>
            <a href="/study/history/" class="loc-tutoring-link">한국사 →</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;

  // ── SEO 메타 ──
  const canonical = `${SITE_DOMAIN}/academy/center/${c.slug}/`;
  const schoolsForDesc = [...c.targets.elem, ...c.targets.middle, ...c.targets.high].slice(0, 3).join('·');
  const titleTag = `${c.name} | ${c.sidoName} ${c.sigungu} 학습코칭학원 | ${SITE_NAME}`;
  const description = `${c.sidoName} ${c.sigungu} ${c.name} 학습코칭학원. ${schoolsForDesc ? schoolsForDesc + ' 등 ' : ''}인근 학교 학생들의 1:1 맞춤 학습코칭. 초·중·고 개별지도, 내신 전문.`;

  // ── 페이지 HTML ──
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titleTag}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${titleTag}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${SITE_DOMAIN}/images/og-image.png">
  <meta property="og:url" content="${canonical}">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  <style>
    ${HEADER_CSS}
    ${FLOAT_CSS}
    ${ACADEMY_INTRO_CSS}
    ${ACADEMY_LOCATION_HUB_CSS}
    ${ACADEMY_LOCATION_SIDO_CSS}
    ${ACADEMY_CENTER_CSS}
    ${ACADEMY_FORM_MODAL_CSS}
  </style>
</head>
<body>
${HEADER_HTML}

<!-- 브래드크럼 -->
<nav class="loc-breadcrumb" aria-label="현재 위치">
  <a href="/">홈</a><span class="sep">›</span>
  <a href="/academy/intro/">학원</a><span class="sep">›</span>
  <a href="/academy/location/">위치 안내</a><span class="sep">›</span>
  <a href="/academy/location/${getSidoSlugForCenter(c)}/">${c.sidoName}</a><span class="sep">›</span>
  <span class="current">${c.name}</span>
</nav>

<!-- 1. 히어로 -->
<section class="ctr-hero">
  <div class="ctr-hero-inner">
    <div class="ctr-hero-eyebrow">ACADEMY CENTER</div>
    <div class="ctr-hero-title-row">
      <h1>🏆 ${c.name}${brandSuffix ? `<span class="ctr-hero-brand">${brandSuffix}</span>` : ''} 학습코칭학원</h1>
      ${c.isNew ? '<span class="ctr-hero-new">NEW</span>' : ''}
    </div>
    <div class="ctr-hero-btns">
      <button class="ctr-hero-btn" onclick="window.openAcademyFormModal('${c.name}${brandSuffix} (${c.sidoName} ${c.sigungu})')">📝 ${c.name} 상담신청</button>
      ${c.feeUrl ? `<a class="ctr-hero-btn-fee" href="${c.feeUrl}" target="_blank" rel="noopener noreferrer">🧾 교습비 안내 <span class="ctr-hero-btn-fee-ext">↗</span></a>` : ''}
    </div>
  </div>
</section>

<!-- 2. 학원 정보 -->
<section class="ctr-section" style="padding-top:24px">
  <div class="ctr-section-inner">
    <h2 class="ctr-h2">📋 학원 정보</h2>
    <div class="ctr-info-grid">
      <div class="ctr-map-box">
        <div id="ctrMap" class="ctr-map-canvas" data-address="${c.address.replace(/"/g, '&quot;')}" data-name="${c.name}">
          <div class="ctr-map-loading">🗺 지도를 불러오는 중...</div>
        </div>
        <div class="ctr-map-btns">
          <a href="${mapUrl}" target="_blank" rel="noopener" class="ctr-map-btn ctr-map-btn-naver"><span class="mlogo">N</span> 네이버 지도</a>
          <a href="https://map.kakao.com/link/search/${encodeURIComponent(c.address)}" target="_blank" rel="noopener" class="ctr-map-btn ctr-map-btn-kakao"><span class="mlogo">K</span> 카카오맵</a>
        </div>
      </div>
      <div class="ctr-info-list">
        <div class="ctr-info-item">
          <div class="ctr-info-label">📍 주소</div>
          <div class="ctr-info-value">${addressFull}</div>
        </div>
        <div class="ctr-info-item">
          <div class="ctr-info-label">🏢 학원 명칭</div>
          <div class="ctr-info-value">${c.eduOffice}</div>
        </div>
        <div class="ctr-info-item">
          <div class="ctr-info-label">✅ 교육지원청 등록번호</div>
          <div class="ctr-info-value">${c.eduRegNo}</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 3. 수업 가능 학년 -->
<section class="ctr-section">
  <div class="ctr-section-inner">
    <h2 class="ctr-h2">📚 수업 가능 학년</h2>
    <p class="ctr-sub">${c.name}에서 운영 중인 과목과 가능 학년입니다.</p>
    <div class="ctr-grade-grid">${gradeCardsHtml}
    </div>
  </div>
</section>

<!-- 4. 인근 학교 -->
<section class="ctr-section">
  <div class="ctr-section-inner">
    <h2 class="ctr-h2">🏫 인근 학교</h2>
    <p class="ctr-sub">${c.name}에 다니는 학생들이 재학 중인 인근 학교입니다.<br>기재된 학교 외에 다른 학교도 수업 가능합니다.</p>
    <div class="ctr-school-grid">${schoolCardsHtml}
    </div>
  </div>
</section>

<!-- 공통 콘텐츠 구분 -->
<div class="ctr-common-divider">━━━ 학습코칭학원 소개 ━━━</div>

<!-- 5. 와와 학습 시스템 -->
${getWawaSystemSection()}

<!-- 6. Why 학습코칭학원 -->
${getWhySection()}

<!-- 7. 4C 프로세스 -->
${getFourCSection()}

<!-- 8. CURRICULUM (과목 제외) -->
${getCurriculumSection(false)}

<!-- 9. FAQ -->
<section class="ctr-section" style="padding-top:24px">
  <div class="ctr-section-inner">
    <h2 class="ctr-h2">❓ 자주 묻는 질문</h2>
    <div class="ctr-faq-box">
      <div class="ctr-faq-item open">
        <div class="ctr-faq-q">
          <span class="ctr-faq-q-text">Q. 수업료는 어떻게 되나요?</span>
          <span class="ctr-faq-toggle">−</span>
        </div>
        <div class="ctr-faq-a">
          <div class="ctr-faq-a-text">${priceTableHtml}</div>
        </div>
      </div>
      <div class="ctr-faq-item open">
        <div class="ctr-faq-q">
          <span class="ctr-faq-q-text">Q. ${c.name}${josa(c.name, '은는')} 어떤 과목을 수업하나요?</span>
          <span class="ctr-faq-toggle">−</span>
        </div>
        <div class="ctr-faq-a">
          <div class="ctr-faq-a-text">${subjectSummary()}</div>
        </div>
      </div>
      <div class="ctr-faq-item open">
        <div class="ctr-faq-q">
          <span class="ctr-faq-q-text">Q. 상담은 어떻게 진행되나요?</span>
          <span class="ctr-faq-toggle">−</span>
        </div>
        <div class="ctr-faq-a">
          <div class="ctr-faq-a-text">상담은 <strong>예약제</strong>로 진행됩니다. 상담 문의하시면 순차적으로 연락드려 상담 예약을 도와드리며, 세부 일정은 지점을 통해 안내받으실 수 있습니다.</div>
        </div>
      </div>
      <div class="ctr-faq-item open">
        <div class="ctr-faq-q">
          <span class="ctr-faq-q-text">Q. 학원 차량이 운행되나요?</span>
          <span class="ctr-faq-toggle">−</span>
        </div>
        <div class="ctr-faq-a">
          <div class="ctr-faq-a-text">안전상의 이유로 <strong>차량은 운행하지 않습니다.</strong></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 10. CTA -->
<section class="ctr-section">
  <div class="ctr-section-inner">
    <div class="ctr-cta">
      <h2 class="ctr-cta-title">${c.name} 상담 받고 싶다면</h2>
      <p class="ctr-cta-desc">상담 후 무료 시범수업까지! 부담없이 연락주세요</p>
      <div class="ctr-cta-btns">
        <button class="ctr-cta-btn ctr-cta-btn-primary" onclick="window.openAcademyFormModal('${c.name}${brandSuffix} (${c.sidoName} ${c.sigungu})')">📝 ${c.name} 상담신청</button>
        <a href="${KAKAO_URL}" target="_blank" rel="noopener" class="ctr-cta-btn ctr-cta-btn-secondary">💬 카카오톡</a>
        <a href="tel:${PHONE.replace(/-/g, '')}" class="ctr-cta-btn ctr-cta-btn-secondary">📞 전화 상담</a>
      </div>
    </div>
  </div>
</section>

<!-- 11. 같은 시군구 다른 학원 (0개면 숨김) -->
${othersSectionHtml}

<!-- 12. 1:1 과외 배너 -->
${tutoringBannerHtml}

${FOOTER_HTML}
${FLOAT_HTML}

<!-- 상담 폼 팝업 모달 -->
${ACADEMY_FORM_MODAL_HTML}

<!-- Leaflet (OpenStreetMap) -->
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
  // OSM 지도 초기화 (주소 → 좌표 자동 변환)
  (function() {
    const mapEl = document.getElementById('ctrMap');
    if (!mapEl || typeof L === 'undefined') return;
    const address = mapEl.dataset.address;
    const name = mapEl.dataset.name;

    function initMap(lat, lon, zoom) {
      mapEl.innerHTML = '';  // 로딩 메시지 제거
      const map = L.map('ctrMap', { scrollWheelZoom: false }).setView([lat, lon], zoom);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 19
      }).addTo(map);
      L.marker([lat, lon]).addTo(map).bindPopup(name).openPopup();
    }

    // Nominatim 지오코딩 (브라우저에서 호출)
    fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(address) + '&limit=1&countrycodes=kr', {
      headers: { 'Accept-Language': 'ko' }
    })
    .then(r => r.json())
    .then(data => {
      if (data && data.length > 0) {
        initMap(parseFloat(data[0].lat), parseFloat(data[0].lon), 16);
      } else {
        // 상세주소 실패 시 시·군·구로 재시도
        const broaderAddr = address.split(/\\s+/).slice(0, 2).join(' ');
        return fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(broaderAddr) + '&limit=1&countrycodes=kr')
          .then(r => r.json())
          .then(d2 => {
            if (d2 && d2.length > 0) {
              initMap(parseFloat(d2[0].lat), parseFloat(d2[0].lon), 14);
            } else {
              mapEl.innerHTML = '<div class="ctr-map-loading">지도를 표시할 수 없습니다.<br>아래 버튼으로 위치를 확인해주세요.</div>';
            }
          });
      }
    })
    .catch(() => {
      mapEl.innerHTML = '<div class="ctr-map-loading">지도를 불러올 수 없습니다.<br>아래 버튼으로 위치를 확인해주세요.</div>';
    });
  })();

  // FAQ 아코디언
  document.querySelectorAll('.ctr-faq-q').forEach(q => {
    q.addEventListener('click', function() {
      const item = this.closest('.ctr-faq-item');
      item.classList.toggle('open');
      const toggle = this.querySelector('.ctr-faq-toggle');
      if (toggle) toggle.textContent = item.classList.contains('open') ? '−' : '+';
    });
  });

  // 와와 학습 시스템 탭 토글
  document.querySelectorAll('.wawa-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const target = this.dataset.tab;
      document.querySelectorAll('.wawa-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      document.querySelectorAll('.wawa-panel').forEach(p => p.classList.remove('active'));
      const panel = document.querySelector('.wawa-panel[data-panel="' + target + '"]');
      if (panel) panel.classList.add('active');
    });
  });

  ${ACADEMY_FORM_MODAL_JS}
</script>

</body>
</html>`;
}

// 센터 객체에서 시·도 슬러그(광역 묶음 고려) 구하기
function getSidoSlugForCenter(c) {
  // 광역 묶음 매핑
  const GROUPED = {
    "충남": "chungcheong", "충북": "chungcheong",
    "대전": "daejeon-sejong", "세종": "daejeon-sejong",
    "경북": "gyeongsang", "경남": "gyeongsang",
    "강원": "jeju-gangwon", "제주": "jeju-gangwon",
  };
  return GROUPED[c.sidoName] || c.sido;
}

// 센터 객체에서 시·군·구 슬러그 구하기 (slug의 두 번째 토큰)
function getSigunguSlug(c) {
  const parts = c.slug.split('-');
  return parts[1] || '';
}


// ── 준비중 안내 페이지 (출시 전 폴백) ───────────────────────────
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
</body>
</html>`;
}
