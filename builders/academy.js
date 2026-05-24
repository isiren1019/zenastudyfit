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
  { slug: "seoul",          name: "서울",      icon: "🏙",  count: 24,  desc: "15개 구",         sub: ["서울"] },
  { slug: "incheon",        name: "인천",      icon: "🌉",  count: 10,  desc: "8개 구",          sub: ["인천"] },
  { slug: "gyeonggi",       name: "경기",      icon: "🌿",  count: 100, desc: "22개 시·군",      sub: ["경기"] },
  { slug: "chungcheong",    name: "충청도",    icon: "🏞",  count: 12,  desc: "충남 6·충북 6",   sub: ["충남", "충북"] },
  // Row 2
  { slug: "daejeon-sejong", name: "대전·세종", icon: "🏢",  count: 10,  desc: "대전 9·세종 1",   sub: ["대전", "세종"] },
  { slug: "gwangju",        name: "광주",      icon: "🌸",  count: 6,   desc: "3개 구",          sub: ["광주"] },
  { slug: "jeonbuk",        name: "전북",      icon: "🌾",  count: 3,   desc: "전주 외",         sub: ["전북"] },
  { slug: "daegu",          name: "대구",      icon: "🍎",  count: 16,  desc: "7개 구",          sub: ["대구"] },
  // Row 3
  { slug: "ulsan",          name: "울산",      icon: "⚙️",  count: 4,   desc: "남구·북구",       sub: ["울산"] },
  { slug: "busan",          name: "부산",      icon: "🐟",  count: 5,   desc: "동래·해운대 외",  sub: ["부산"] },
  { slug: "gyeongsang",     name: "경상도",    icon: "🍎",  count: 8,   desc: "경북 5·경남 3",   sub: ["경북", "경남"] },
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

<!-- 3. WHY -->
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
</section>

<!-- 4. 와와 학습 시스템 -->
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
</section>

<!-- 5. 4C 프로세스 -->
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
</section>

<!-- 6. CURRICULUM -->
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
      </div>
    </div>
  </div>
</section>

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
export function buildAcademyLocationSidoPage(sido) {
  if (!ACADEMY_READY.location) {
    return buildAcademyComingSoonPage(`${sido} 학원 위치`, "location");
  }
  // TODO: 해당 시도의 지점 카드 목록
  return buildAcademyComingSoonPage(`${sido} 학원 위치`, "location");
}


// ── 지점 상세 페이지 (/academy/center/{slug}/) ─────────────────
export function buildAcademyCenterPage(slug) {
  if (!ACADEMY_READY.location) {
    return buildAcademyComingSoonPage("학원 지점 상세", "location");
  }
  // TODO: 지점명·등록번호·주소·과목·학교·학원비·상담 CTA
  return buildAcademyComingSoonPage("학원 지점 상세", "location");
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
