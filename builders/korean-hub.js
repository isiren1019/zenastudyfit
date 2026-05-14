// ================================================================
// builders/korean-hub.js — 국어 별도 시스템 빌더
// 변경 빈도: 높음 (메모리 기록 다음 작업: 국어 문법 8개, 문학 작품 분석 6개 등)
// 의존:
//   - config.js (SITE_NAME, SITE_DOMAIN, FORM_URL, KAKAO_URL, PHONE)
//   - layout.js (HEADER_CSS, HEADER_HTML, FOOTER_HTML, FLOAT_CSS, FLOAT_HTML)
//   - utils.js (getPageDates, buildBreadcrumbJsonLd, buildSocialMeta, buildShareButtons)
//   - data/subjects/_meta.js (GRADE_SUBJECT_META)
//   - builders/pages.js (build404Page) — 잘못된 키 폴백용
//
// ⚠️ 메모리 기록: "국어는 buildKoreanHubPage()의 별도 함수 시스템 — 다른 5과목과 다른 구조"
//   - KOREAN_CATEGORIES 데이터 (함수 내부 const)
//   - KOREAN_PAGE_READY 매핑 (함수 내부 const, 활성 페이지만 클릭 가능)
//
// 함수 (3개):
//   - buildKoreanHubPage()                          — 국어 허브 (/study/korean/) — 11개 영역 75개 가이드
//   - buildKoreanGradeHigh3Page()                   — 고3 국어 (특별 페이지, 시기별 4단계 + 영역별 + 등급별)
//   - buildKoreanGradePage(gradeKey, subjectKey)    — 학년별 페이지 (사실은 범용 — 6과목 모두 처리)
//
// 새 카테고리/페이지 추가 시:
//   1. data/subjects/korean.js에 데이터 추가
//   2. 이 파일의 KOREAN_CATEGORIES + KOREAN_PAGE_READY 업데이트
//   3. builders/sitemap.js 의 sitemap-static에 URL 추가
// ================================================================

import { SITE_NAME, SITE_DOMAIN, FORM_URL, KAKAO_URL, PHONE, STUDY_READY } from '../config.js';
import { HEADER_CSS, HEADER_HTML, FOOTER_HTML, FLOAT_CSS, FLOAT_HTML } from '../layout.js';
import { getPageDates, buildBreadcrumbJsonLd, buildSocialMeta, buildShareButtons } from '../utils.js';
import { GRADE_SUBJECT_META } from '../data/subjects/_meta.js';
import { build404Page } from './pages.js';


// ── 국어 허브 페이지 (11개 영역 75개 가이드) ──────────────────
export function buildKoreanHubPage() {
  const canonical = `${SITE_DOMAIN}/study/korean/`;
  const titleTag = `국어 공부법 — 11개 영역 75개 가이드 | ${SITE_NAME}`;
  const description = `국어 독해력·문해력·문법·문학·글쓰기·어휘·고전문학·시험대비·수행평가·학년별 로드맵·학습습관까지 11개 영역 75개 가이드. 제나쌤 스터디핏 국어 1:1 맞춤 과외.`;

  // 11개 대분류 + 75개 세부 페이지 데이터
  const KOREAN_CATEGORIES = [
    {
      key: "grade", name: "학년별 학습 로드맵", isNew: true, count: 14, highlight: true,
      items: [
        ["elem1", "초1"],
        ["elem2", "초2"],
        ["elem3", "초3"],
        ["elem4", "초4"],
        ["elem5", "초5"],
        ["elem6", "초6"],
        ["pre-mid1", "예비 중1"],
        ["mid1", "중1"],
        ["mid2", "중2"],
        ["mid3", "중3"],
        ["pre-high1", "예비 고1"],
        ["high1", "고1"],
        ["high2", "고2"],
        ["high3", "고3"],
      ]
    },
    {
      key: "habit", name: "학습 습관 & 공부법", isNew: true, count: 5,
      items: [
        ["timing", "국어 공부 시간 관리"],
        ["notes", "오답노트 작성법"],
        ["self", "자기주도 국어 학습"],
        ["reading", "독서 습관 만들기"],
        ["slump", "국어 슬럼프 극복법"],
      ]
    },
    {
      key: "perform", name: "수행평가 & 서술형", isNew: true, count: 2,
      items: [
        ["descriptive", "서술형"],
        ["assessment", "수행평가 대비"],
      ]
    },
    {
      key: "exam", name: "시험 대비", isNew: false, count: 6,
      items: [
        ["suneung", "수능 국어 대비"],
        ["mock", "모의고사 대비"],
        ["naesin", "내신 시험 대비"],
        ["past", "기출문제 분석"],
        ["insert", "문장 삽입 유형"],
        ["order", "문장 순서 유형"],
      ]
    },
    {
      key: "literacy", name: "문해력 강화", isNew: true, count: 6,
      items: [
        ["vocab", "어휘력 기반 문해력"],
        ["info", "비문학 문해력"],
        ["context", "문학 문해력"],
        ["daily", "일상 문해력"],
        ["digital", "디지털 문해력"],
        ["diagnose", "학년별 문해력 진단법"],
      ]
    },
    {
      key: "grammar", name: "문법 완벽 정복", isNew: false, count: 8,
      items: [
        ["guide", "문법 완벽 가이드"],
        ["parts", "품사 정리"],
        ["spelling", "맞춤법 마스터"],
        ["honorific", "경어법 정리"],
        ["practice", "문법 실전 연습"],
        ["components", "문장 성분 이해"],
        ["spacing", "띄어쓰기 규칙"],
        ["mistakes", "자주 틀리는 문법"],
      ]
    },
    {
      key: "vocab", name: "어휘력", isNew: true, count: 4,
      items: [
        ["method", "어휘 학습법"],
        ["sino", "한자어 이해"],
        ["idiom", "관용어·속담"],
        ["synonym", "유의어·반의어"],
      ]
    },
    {
      key: "reading", name: "독해력 향상", isNew: false, count: 8,
      items: [
        ["skill", "독해력 향상 비법"],
        ["nonfiction", "비문학 읽기 전략"],
        ["intensive", "정독 연습법"],
        ["speed", "속독 훈련법"],
        ["theme", "주제 파악하기"],
        ["inference", "추론 능력 기르기"],
        ["detail", "세부 내용 파악"],
        ["blank", "빈칸 추론 연습"],
      ]
    },
    {
      key: "writing", name: "글쓰기 실력 향상", isNew: true, count: 8,
      items: [
        ["basic", "글쓰기 기초"],
        ["diary", "일기·생활문"],
        ["book-report", "독후감·서평"],
        ["argument", "논설문"],
        ["summary", "요약·정리"],
        ["essay", "자기소개서·수필"],
        ["creative", "창작 글쓰기"],
        ["revision", "글 다듬기"],
      ]
    },
    {
      key: "literature", name: "문학 작품 분석", isNew: true, count: 6,
      items: [
        ["guide", "문학 분석 가이드"],
        ["poem", "시 분석법"],
        ["novel", "소설 분석법"],
        ["modern-poem", "현대시 이해"],
        ["modern-novel", "현대소설 이해"],
        ["criticism", "문학 비평 기초"],
      ]
    },
    {
      key: "classic", name: "고전문학 심화", isNew: false, count: 7,
      items: [
        ["intro", "고전문학 개론"],
        ["sijo", "시조 이해하기"],
        ["gasa", "가사 이해하기"],
        ["hyangga", "향가 이해하기"],
        ["pansori", "판소리 이해하기"],
        ["folklore", "설화와 민담"],
        ["history", "고전문학사"],
      ]
    },
  ];

  // 11개 대분류 섹션 HTML 생성
  // 출시 완료된 세부 페이지 (key/slug 조합으로 매칭)
  const KOREAN_PAGE_READY = {
    "grade/high3": "/study/korean/grade/high3/",
    "grade/elem1": "/study/korean/grade/elem1/",
    "grade/elem2": "/study/korean/grade/elem2/",
    "grade/elem3": "/study/korean/grade/elem3/",
    "grade/elem4": "/study/korean/grade/elem4/",
    "grade/elem5": "/study/korean/grade/elem5/",
    "grade/elem6": "/study/korean/grade/elem6/",
    "grade/pre-mid1": "/study/korean/grade/pre-mid1/",
    "grade/mid1": "/study/korean/grade/mid1/",
    "grade/mid2": "/study/korean/grade/mid2/",
    "grade/mid3": "/study/korean/grade/mid3/",
    "grade/pre-high1": "/study/korean/grade/pre-high1/",
    "grade/high1": "/study/korean/grade/high1/",
    "grade/high2": "/study/korean/grade/high2/",
    "habit/timing": "/study/korean/habit/timing/",
    "habit/notes": "/study/korean/habit/notes/",
    "habit/self": "/study/korean/habit/self/",
    "habit/reading": "/study/korean/habit/reading/",
    "habit/slump": "/study/korean/habit/slump/",
    "perform/descriptive": "/study/korean/perform/descriptive/",
    "perform/assessment": "/study/korean/perform/assessment/",
    "exam/suneung": "/study/korean/exam/suneung/",
    "exam/mock": "/study/korean/exam/mock/",
    "exam/naesin": "/study/korean/exam/naesin/",
    "exam/past": "/study/korean/exam/past/",
    "exam/insert": "/study/korean/exam/insert/",
    "exam/order": "/study/korean/exam/order/",
    "literacy/vocab": "/study/korean/literacy/vocab/",
    "literacy/info": "/study/korean/literacy/info/",
    "literacy/context": "/study/korean/literacy/context/",
    "literacy/daily": "/study/korean/literacy/daily/",
    "literacy/digital": "/study/korean/literacy/digital/",
    "literacy/diagnose": "/study/korean/literacy/diagnose/",
    "reading/skill": "/study/korean/reading/skill/",
    "reading/nonfiction": "/study/korean/reading/nonfiction/",
    "reading/intensive": "/study/korean/reading/intensive/",
    "reading/detail": "/study/korean/reading/detail/",
    "reading/speed": "/study/korean/reading/speed/",
    "reading/theme": "/study/korean/reading/theme/",
    "reading/inference": "/study/korean/reading/inference/",
    "reading/blank": "/study/korean/reading/blank/",
    "grammar/guide": "/study/korean/grammar/guide/",
    "grammar/parts": "/study/korean/grammar/parts/",
    "grammar/spelling": "/study/korean/grammar/spelling/",
    "grammar/honorific": "/study/korean/grammar/honorific/",
    "grammar/practice": "/study/korean/grammar/practice/",
    "grammar/components": "/study/korean/grammar/components/",
    "grammar/spacing": "/study/korean/grammar/spacing/",
    "grammar/mistakes": "/study/korean/grammar/mistakes/",
    "writing/basic": "/study/korean/writing/basic/",
    "writing/diary": "/study/korean/writing/diary/",
    "writing/book-report": "/study/korean/writing/book-report/",
    "writing/argument": "/study/korean/writing/argument/",
    "writing/summary": "/study/korean/writing/summary/",
    "writing/essay": "/study/korean/writing/essay/",
    "writing/creative": "/study/korean/writing/creative/",
    "writing/revision": "/study/korean/writing/revision/",
    "literature/guide": "/study/korean/literature/guide/",
    "literature/poem": "/study/korean/literature/poem/",
    "literature/novel": "/study/korean/literature/novel/",
    "literature/modern-poem": "/study/korean/literature/modern-poem/",
    "literature/modern-novel": "/study/korean/literature/modern-novel/",
    "literature/criticism": "/study/korean/literature/criticism/",
    "vocab/method": "/study/korean/vocab/method/",
    "vocab/sino": "/study/korean/vocab/sino/",
    "vocab/idiom": "/study/korean/vocab/idiom/",
    "vocab/synonym": "/study/korean/vocab/synonym/",
  };

  let categoriesHtml = "";
  for (const cat of KOREAN_CATEGORIES) {
    const newBadge = cat.isNew ? `<span class="cat-new-badge">NEW</span>` : "";
    const sectionClass = cat.highlight ? "sec sec-grade-roadmap" : "sec";
    let itemsHtml = "";
    for (const [slug, label] of cat.items) {
      const readyKey = `${cat.key}/${slug}`;
      const readyHref = KOREAN_PAGE_READY[readyKey];
      if (readyHref) {
        // 출시된 페이지: 실제 링크
        itemsHtml += `<a href="${readyHref}" class="cat-item"><span>${label}</span><span class="cat-arrow">→</span></a>`;
      } else {
        // 준비중
        itemsHtml += `<span class="cat-item cat-item-soon"><span>${label}</span><span class="nav-badge-soon">준비중</span></span>`;
      }
    }
    categoriesHtml += `<div class="${sectionClass}"><div class="cat-head"><div class="cat-title">${cat.name}${newBadge}</div><div class="cat-count">${cat.count}개</div></div><div class="cat-grid">${itemsHtml}</div></div>`;
  }

  // 다른 과목 5개 + 코딩 카드
  const OTHER_SUBJECTS = [
    ["english","🌍","영어"],
    ["math","📐","수학"],
    ["science","🔬","과학"],
    ["social","🗺️","사회"],
    ["history","📜","한국사"],
  ];
  let otherSubjectsHtml = "";
  for (const [key, icon, name] of OTHER_SUBJECTS) {
    if (STUDY_READY[key]) {
      otherSubjectsHtml += `<a href="/study/${key}/" class="other-subj-card"><div class="other-subj-icon">${icon}</div><div class="other-subj-name">${name}</div></a>`;
    } else {
      otherSubjectsHtml += `<span class="other-subj-card other-subj-card-soon"><div class="other-subj-icon">${icon}</div><div class="other-subj-name">${name}<span class="nav-badge-soon" style="margin-left:3px">준비중</span></div></span>`;
    }
  }
  // 코딩 카드 추가 (실제 페이지 있음)
  otherSubjectsHtml += `<a href="/coding/" class="other-subj-card other-subj-card-coding"><div class="other-subj-icon">💻</div><div class="other-subj-name">코딩</div></a>`;

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
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${SITE_DOMAIN}/images/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;800&display=swap" rel="stylesheet">
  <style>
    ${HEADER_CSS}
    ${FLOAT_CSS}
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Noto Sans KR',sans-serif;background:#fff;color:#1a0a24;line-height:1.7;word-break:keep-all}
    .wrap{max-width:1100px;margin:0 auto}
    .sec{padding:24px 16px;border-bottom:1px solid #f0f0f0}
    .sec-grade-roadmap{background:#fdfafe}
    .sec-label{display:inline-block;font-size:.72rem;font-weight:700;color:#7b2fa8;background:#f5eefe;padding:4px 12px;border-radius:20px;margin-bottom:8px}
    .sec-title{font-size:clamp(1rem,3vw,1.4rem);font-weight:800;color:#370558;line-height:1.45;margin-bottom:8px}
    .sec-body{font-size:.88rem;color:#444;line-height:1.85;max-width:800px}

    .hero{background:linear-gradient(135deg,#370558,#510580,#7b2fa8);color:white;padding:36px 20px;text-align:center}
    .hero-badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);border-radius:20px;font-size:.78rem;font-weight:700;padding:4px 14px;margin-bottom:12px}
    .hero h1{font-size:clamp(1.5rem,4.5vw,2.4rem);font-weight:800;line-height:1.4;margin-bottom:6px;color:white}
    .hero-stat{font-size:.85rem;opacity:.85}

    /* 국어 과외 안내 */
    .intro-cta-section{padding:24px 16px;border-bottom:1px solid #f0f0f0}
    .intro-cta-section .sec-body{max-width:none}
    .trust-badges{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:14px 0}
    .trust-badge{text-align:center;padding:12px 8px;border:1px solid #e8d6f5;border-radius:8px}
    .trust-badge-title{font-size:.85rem;font-weight:700;color:#510580;margin-bottom:3px}
    .trust-badge-desc{font-size:.72rem;color:#888;line-height:1.5}
    .process-label{font-size:.85rem;font-weight:700;color:#370558;margin-bottom:8px;margin-top:14px}
    .process-list{display:grid;gap:6px}
    .process-item{display:flex;gap:10px;padding:10px 12px;border:1px solid #f0e6fc;border-radius:6px;align-items:flex-start}
    .process-num{width:22px;height:22px;border-radius:50%;background:#510580;color:white;font-size:.72rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
    .process-title{font-size:.85rem;font-weight:700;color:#370558}
    .process-desc{font-size:.75rem;color:#666;line-height:1.6}

    /* 검색창 */
    .search-box{background:white;border:1px solid #e8d6f5;border-radius:8px;padding:11px 14px;display:flex;align-items:center;gap:8px}
    .search-icon{font-size:1rem;color:#c9a3e8}
    .search-input{flex:1;border:none;outline:none;font-size:.85rem;color:#370558;background:transparent;font-family:inherit}
    .search-input::placeholder{color:#999}

    /* 11개 카테고리 */
    .cat-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
    .cat-title{font-size:1rem;font-weight:800;color:#370558;display:flex;align-items:center;gap:6px}
    .cat-new-badge{font-size:.65rem;background:#fde8f1;color:#e8439a;padding:2px 7px;border-radius:8px;font-weight:700;margin-left:4px}
    .cat-count{font-size:.72rem;color:#9b6cc0;background:#f5eefe;padding:3px 9px;border-radius:10px;font-weight:700}
    .cat-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px}
    .cat-item{display:flex;align-items:center;justify-content:space-between;padding:9px 12px;border:1px solid #f0e6fc;border-radius:6px;background:white;font-size:.82rem;color:#370558;font-weight:700;text-decoration:none;transition:all .12s}
    .cat-item:hover{border-color:#510580;background:#faf5ff}
    .cat-arrow{font-size:.78rem;color:#c9a3e8}
    .cat-item-soon{cursor:not-allowed;opacity:.55;background:#fafafa}
    .cat-item-soon:hover{border-color:#f0e6fc;background:#fafafa}

    /* 다른 과목 */
    .other-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:10px}
    .other-subj-card{padding:12px 6px;border:1px solid #f0e6fc;border-radius:6px;text-align:center;text-decoration:none;display:block;background:white}
    .other-subj-card:hover{border-color:#510580;background:#faf5ff}
    .other-subj-card-soon{cursor:not-allowed;opacity:.6;background:#fafafa}
    .other-subj-card-soon:hover{border-color:#f0e6fc;background:#fafafa}
    .other-subj-card-coding{background:#faf5ff}
    .other-subj-icon{font-size:1.4rem}
    .other-subj-name{font-size:.78rem;color:#370558;font-weight:700;margin-top:4px}
    .all-study-banner{display:block;padding:14px;background:linear-gradient(135deg,#faf5ff,#f5eefe);border:1.5px solid #e8439a;border-radius:8px;text-decoration:none}
    .all-study-row{display:flex;align-items:center;gap:12px}
    .all-study-icon{font-size:1.7rem}
    .all-study-text{flex:1}
    .all-study-title{font-size:.92rem;font-weight:800;color:#370558;margin-bottom:2px}
    .all-study-desc{font-size:.76rem;color:#666}
    .all-study-arrow{font-size:1.1rem;color:#e8439a}

    /* CTA */
    .cta-sec{background:linear-gradient(135deg,#370558,#510580);padding:32px 20px;text-align:center}
    .cta-sec h2{font-size:clamp(1.2rem,3.5vw,1.7rem);font-weight:800;color:white;margin-bottom:6px}
    .cta-sub{font-size:.85rem;color:rgba(255,255,255,.75);margin-bottom:16px}
    .cta-btns{display:flex;gap:6px;justify-content:center;flex-wrap:nowrap;max-width:100%}
    .cta-phone{background:white;color:#510580;font-size:.78rem;font-weight:700;padding:9px 14px;border-radius:50px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;white-space:nowrap;flex-shrink:1}
    .cta-kakao{background:#FEE500;color:#3A1D1D;font-size:.78rem;font-weight:700;padding:9px 14px;border-radius:50px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;white-space:nowrap;flex-shrink:1}
    .cta-form{background:#e8439a;color:white;font-size:.78rem;font-weight:700;padding:9px 14px;border-radius:50px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;white-space:nowrap;flex-shrink:1}

    /* PC */
    @media(min-width:768px){
      .sec, .intro-cta-section{padding:36px 40px}
      .hero{padding:60px 40px}
      .trust-badges{grid-template-columns:repeat(4,1fr);gap:12px}
      .trust-badge{padding:16px 10px}
      .trust-badge-title{font-size:.95rem}
      .trust-badge-desc{font-size:.78rem}
      .process-list{grid-template-columns:repeat(4,1fr);gap:12px}
      .process-item{flex-direction:column;align-items:center;text-align:center;padding:14px 12px;gap:8px}
      .process-num{margin-top:0}
      .process-title{font-size:.88rem}
      .process-desc{font-size:.78rem}
      .cat-grid{grid-template-columns:repeat(4,1fr);gap:8px}
      .cat-item{padding:11px 14px;font-size:.85rem}
      .other-grid{grid-template-columns:repeat(6,1fr);gap:10px}
      .other-subj-card{padding:18px 10px}
      .other-subj-icon{font-size:1.7rem}
      .other-subj-name{font-size:.88rem;margin-top:6px}
      .all-study-banner{padding:18px 24px}
      .all-study-icon{font-size:2rem}
      .all-study-title{font-size:1.05rem}
      .all-study-desc{font-size:.82rem}
      .cta-sec{padding:60px 40px}
      .cta-btns{gap:10px}
      .cta-phone,.cta-kakao,.cta-form{font-size:.95rem;padding:13px 26px;gap:6px}
      .cat-title{font-size:1.1rem}
    }

    footer{background:#370558;color:rgba(255,255,255,.45);text-align:center;padding:20px;font-size:.75rem;line-height:1.8}
    footer p{color:rgba(255,255,255,.45);margin:2px 0}
    footer a{color:rgba(255,255,255,.6);text-decoration:none}
    footer a{color:rgba(255,255,255,.6);text-decoration:none}
  </style>
</head>
<body>
${HEADER_HTML}

<div class="hero">
  <div class="hero-badge">과목별 공부법 가이드</div>
  <h1>📖 국어 공부법</h1>
  <div class="hero-stat">11개 영역 · 75개 가이드</div>
</div>

<div class="wrap">

  <div class="intro-cta-section">
    <div class="sec-label">📋 국어 과외 안내</div>
    <div class="sec-title">제나쌤 스터디핏의 국어 과외</div>
    <div class="sec-body">국어는 모든 과목의 기초가 되는 독해력을 키우는 과목입니다. 비문학 독해, 문학 감상, 서술형 작성까지 단계별 훈련이 필요해요. 제나쌤 스터디핏은 학생 수준을 진단한 뒤, 학년·목표에 맞는 1:1 맞춤 커리큘럼으로 수업합니다.</div>

    <div class="trust-badges">
      <div class="trust-badge"><div class="trust-badge-title">방문·화상</div><div class="trust-badge-desc">집에서 편하게</div></div>
      <div class="trust-badge"><div class="trust-badge-title">검증된 선생님</div><div class="trust-badge-desc">전문 경력 매칭</div></div>
      <div class="trust-badge"><div class="trust-badge-title">무료 상담</div><div class="trust-badge-desc">시범수업 가능</div></div>
      <div class="trust-badge"><div class="trust-badge-title">맞춤 커리큘럼</div><div class="trust-badge-desc">진단 후 설계</div></div>
    </div>

    <div class="process-label">수업 진행 방식</div>
    <div class="process-list">
      <div class="process-item"><div class="process-num">1</div><div><div class="process-title">무료 상담 & 진단</div><div class="process-desc">실력과 목표 파악, 선생님 매칭</div></div></div>
      <div class="process-item"><div class="process-num">2</div><div><div class="process-title">시범 수업</div><div class="process-desc">선생님과 학생의 합 확인</div></div></div>
      <div class="process-item"><div class="process-num">3</div><div><div class="process-title">커리큘럼 설계</div><div class="process-desc">내신·수능 맞춤 학습 계획</div></div></div>
      <div class="process-item"><div class="process-num">4</div><div><div class="process-title">정규 수업 & 리포트</div><div class="process-desc">학습 현황 학부모 공유</div></div></div>
    </div>
  </div>

  <div class="sec">
    <div class="search-box">
      <span class="search-icon">🔍</span>
      <input type="text" class="search-input" placeholder="독해력, 문법, 수능 국어 등 검색" id="korean-search">
    </div>
  </div>

  ${categoriesHtml}

  <div class="sec">
    <div class="sec-title">📚 다른 과목 공부법</div>
    <div class="other-grid">${otherSubjectsHtml}</div>
    <a href="/self-study/" class="all-study-banner"><div class="all-study-row"><div class="all-study-icon">📋</div><div class="all-study-text"><div class="all-study-title">전과목 공부법</div><div class="all-study-desc">자기주도학습 · 플랜 관리 · 공부 습관</div></div><div class="all-study-arrow">→</div></div></a>
  </div>

</div>

<div class="cta-sec">
  <h2>지금 바로 무료 상담 받으세요</h2>
  <div class="cta-sub">상담 후 무료 시범수업까지 — 부담 없이 시작하세요</div>
  <div class="cta-btns">
    <a href="tel:${PHONE}" class="cta-phone">📞 전화</a>
    <a href="${KAKAO_URL}" target="_blank" class="cta-kakao">💬 카카오톡</a>
    <a href="${FORM_URL}" target="_blank" class="cta-form">📝 체험신청</a>
  </div>
</div>

${FLOAT_HTML}

${FOOTER_HTML}

<script>
// 검색 기능 (간단)
(function(){
  var input = document.getElementById('korean-search');
  if(!input) return;
  input.addEventListener('input', function(e){
    var q = e.target.value.toLowerCase().trim();
    var items = document.querySelectorAll('.cat-item');
    items.forEach(function(it){
      var t = it.textContent.toLowerCase();
      it.style.display = (q === '' || t.indexOf(q) !== -1) ? '' : 'none';
    });
  });
})();
</script>

</body>
</html>`;
}

// ── 고3 국어 특별 페이지 (수능 D-day 전략) ────────────────────
export function buildKoreanGradeHigh3Page() {
  // BUG FIX: 원본 worker.js에서는 subjectKey/subjectName 변수가 정의되지 않은 채
  // 빵부스러기 HTML에서 참조되어 호출 시 ReferenceError가 발생했음.
  // 함수명(buildKoreanGradeHigh3Page)과 일치하도록 'korean'/'국어'로 하드코딩.
  const subjectKey = "korean";
  const subjectName = "국어";

  const canonical = `${SITE_DOMAIN}/study/korean/grade/high3/`;
  const titleTag = `고3 국어 공부법 — 수능 D-day 전략 | ${SITE_NAME}`;
  const description = `고3 국어 시기별 학습법(3~5월/6~8월/9~10월/11월)·영역별 전략(독서/문학/화작/언매)·목표 등급별 맞춤 가이드·실수 TOP 3·D-100 체크리스트. 제나쌤 스터디핏 1:1 맞춤 과외.`;

  // ③ 시기별 4단계
  const PHASES = [
    { period: "3~5월", name: "기초 정비기", desc: "개념 정비 + 기출 1회독" },
    { period: "6~8월", name: "집중 강화기", desc: "6월 모평 분석·약점 보완" },
    { period: "9~10월", name: "실전 감각기", desc: "9월 모평·실전 모의" },
    { period: "11월", name: "컨디셔닝", desc: "실전 모드·마무리" },
  ];

  // ④ 영역별 공부법
  const AREAS_DATA = [
    {
      icon: "📖", name: "독서 (비문학)",
      body: "가장 까다로운 영역입니다. 긴 지문에서 핵심 정보를 빠르게 추출하는 훈련이 핵심이에요. 매일 1~2지문을 시간 재고 풀고, 틀린 문제는 답이 아니라 지문 구조부터 다시 분석합니다. \"왜 이 선지가 답이고 저 선지는 함정인가\"를 글로 정리해보면 실력이 눈에 띄게 올라갑니다."
    },
    {
      icon: "📖", name: "문학",
      body: "EBS 연계 작품 정독이 우선입니다. 화자·정서·표현법을 정리하고, 작품별 핵심 키워드를 노트에 정리해두세요. 다만 EBS만 보면 낯선 작품이 나왔을 때 무너집니다. 매주 1~2개씩 비연계 작품도 분석하는 훈련이 1등급의 갈림길이에요."
    },
    {
      icon: "📖", name: "화법과 작문",
      body: "선택과목 중 비교적 안정적인 점수가 가능한 영역입니다. 기출 5개년을 풀면서 함정 선지 패턴을 익히는 게 가장 빠른 길이에요. 출제 유형이 정형화되어 있어 시간을 줄이고 정답률을 올릴 수 있습니다."
    },
    {
      icon: "📖", name: "언어와 매체",
      body: "문법 개념이 탄탄하면 표준점수에서 크게 유리합니다. 9품사·문장 성분·음운 변동을 체계적으로 정리하세요. 매체 부분은 기출만 충실히 풀어도 충분합니다. 다만 문법 개념이 부족하다면 화작이 더 안전한 선택이에요."
    },
  ];

  // ⑤ 목표 등급별 전략
  const TIERS = [
    {
      class: "tier-gold", num: "1", label: "1등급 목표",
      body: "고난도 문항 정복이 핵심입니다. 비문학 1지문 6분 컷, 문학 변별 문항 대비, 언매 문법 실수 제로 만들기. 평소 모의고사 96점 이상을 안정적으로 유지해야 1등급 안정권입니다."
    },
    {
      class: "tier-purple", num: "2", label: "2등급 목표",
      body: "실수 줄이기가 우선입니다. 시간 배분 연습·EBS 연계 완벽 대비·자주 틀리는 유형 5개 집중 분석. 아는 문제를 반드시 맞히는 습관이 2등급에서 1등급으로 가는 다리예요."
    },
    {
      class: "tier-blue", num: "3", label: "3등급 목표",
      body: "기출 3개년 회독·핵심 개념 빈틈 메우기·문학 작품 50선 정독으로 안정권 진입을 노립니다. 과욕보다 현재 수준에서 확실하게 풀 수 있는 문제를 늘리는 게 더 빠른 길이에요."
    },
    {
      class: "tier-gray", num: "下", label: "하위권 (4등급 이하)",
      body: "기초 독해력 회복이 먼저입니다. 중3~고1 수준부터 다시 점검하세요. 하루 1지문 정독 + 수능 특강 천천히 따라가기. 한꺼번에 무리하지 말고, 매일 1시간씩이라도 꾸준한 게 가장 빠른 길입니다."
    },
  ];

  // ⑥ 실수 TOP 3
  const MISTAKES = [
    {
      title: "문제만 풀고 분석은 안 한다",
      body: "기출은 풀이가 아니라 분석이 80%입니다. 왜 틀렸는지를 모르면 같은 실수를 반복해요. 풀이에 1시간을 쓴다면, 분석에 2시간을 써야 합니다."
    },
    {
      title: "EBS만 믿고 기출을 소홀히",
      body: "EBS 연계는 작품 친숙도일 뿐, 점수를 만드는 건 결국 기출 분석입니다. EBS는 80%, 기출은 20% 시간을 쓰고 있다면 비율을 거꾸로 바꿔야 해요."
    },
    {
      title: "시간 안 재고 푼다",
      body: "실전은 80분에 45문항입니다. 시간 압박 없이 푸는 풀이는 모의고사에서 무용지물이에요. 매주 1회는 반드시 80분 타이머로 실전처럼 풀어야 합니다."
    },
  ];

  // ⑦ D-100 체크리스트
  const CHECKLIST = [
    "6월·9월 모평 오답 3회독 완료",
    "취약 영역 집중 보강 (주 5회)",
    "실전 모의고사 주 1회 (오전 8시 40분)",
    "EBS 수특·수완 연계 작품 정리",
    "컨디션·수면 패턴 시험 시간 맞추기",
  ];

  // ⑧ FAQ
  const FAQS = [
    {
      q: "고3 시작인데 1등급 가능한가요?",
      a: "현재 3등급 이상이면 충분히 가능합니다. 기출 분석 + 약점 영역 집중 보강을 6개월간 꾸준히 한 학생들 중에 1등급으로 진입한 사례가 많아요. 핵심은 \"약점이 무엇인지 정확히 아는 것\"입니다."
    },
    {
      q: "인강 vs 과외, 뭐가 좋을까요?",
      a: "자기주도가 잘 되는 학생은 인강이 효율적이고, 분석·관리가 약한 학생은 과외가 빠릅니다. 특히 고3 후반기에는 1:1 피드백이 점수를 만들어요. 모의고사 점수가 정체된다면 과외를 고려해보세요."
    },
    {
      q: "모의고사 점수가 안 올라요.",
      a: "유형별 약점 진단이 먼저입니다. 단순히 더 풀기보다, 어디서 시간을 잃는지·어떤 함정에 자주 빠지는지 분석해야 정체기를 깨뜨릴 수 있어요. 풀이 양보다 분석의 질이 점수를 만듭니다."
    },
    {
      q: "화작/언매 어느 게 유리한가요?",
      a: "목표 등급에 따라 다릅니다. 1등급 목표라면 언매(표준점수↑), 안정권 목표라면 화작(체감 난도↓)이 일반적이에요. 다만 본인이 더 잘 푸는 영역이 무엇인지 모의고사로 비교해본 뒤 결정하세요."
    },
  ];

  // ⑨ 관련 페이지 (모두 준비중이므로 카드만 노출, 클릭 시 /study/korean/ 로 이동)
  const RELATED = [
    { icon: "📚", label: "고2 국어 공부법", href: "/study/korean/" },
    { icon: "🎯", label: "수능 국어 대비", href: "/study/korean/" },
    { icon: "📊", label: "모의고사 대비", href: "/study/korean/" },
    { icon: "📖", label: "비문학 읽기 전략", href: "/study/korean/" },
    { icon: "📝", label: "서술형 답안 작성법", href: "/study/korean/" },
  ];

  // ⑩ 태그
  const TAGS = ["고3국어", "수능국어", "비문학", "문학", "1등급전략", "수능대비"];

  // HTML 빌드
  let phasesHtml = "";
  for (const p of PHASES) {
    phasesHtml += `<div class="phase-card"><div class="phase-period">${p.period}</div><div class="phase-name">${p.name}</div><div class="phase-desc">${p.desc}</div></div>`;
  }

  let areasHtml = "";
  for (const a of AREAS_DATA) {
    areasHtml += `<div class="area-item"><div class="area-name">${a.name}</div><div class="area-body">${a.body}</div></div>`;
  }

  let tiersHtml = "";
  for (const t of TIERS) {
    tiersHtml += `<div class="tier-card ${t.class}"><div class="tier-head"><div class="tier-num">${t.num}</div><div class="tier-label">${t.label}</div></div><div class="tier-body">${t.body}</div></div>`;
  }

  let mistakesHtml = "";
  let mistakeNum = 1;
  for (const m of MISTAKES) {
    mistakesHtml += `<div class="mistake-item"><div class="mistake-num">${mistakeNum}</div><div><div class="mistake-title">${m.title}</div><div class="mistake-body">${m.body}</div></div></div>`;
    mistakeNum++;
  }

  let checklistHtml = "";
  for (const c of CHECKLIST) {
    checklistHtml += `<div class="check-item"><div class="check-box"></div><div class="check-text">${c}</div></div>`;
  }

  let faqsHtml = "";
  for (const f of FAQS) {
    faqsHtml += `<div class="faq-item"><div class="faq-q">Q. ${f.q}</div><div class="faq-a">${f.a}</div></div>`;
  }

  let relatedHtml = "";
  for (const r of RELATED) {
    relatedHtml += `<a href="${r.href}" class="related-item"><div class="related-icon">${r.icon}</div><div class="related-label">${r.label}</div><div class="related-arrow">→</div></a>`;
  }

  let tagsHtml = "";
  for (const t of TAGS) {
    tagsHtml += `<span class="tag-item">#${t}</span>`;
  }

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titleTag}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${titleTag}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${SITE_DOMAIN}/images/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;800&display=swap" rel="stylesheet">
  <style>
    ${HEADER_CSS}
    ${FLOAT_CSS}
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Noto Sans KR',sans-serif;background:#fff;color:#1a0a24;line-height:1.7;word-break:keep-all}
    .wrap{max-width:760px;margin:0 auto}
    .sec{padding:24px 16px;border-bottom:1px solid #f0f0f0}
    .sec-label{display:inline-block;font-size:.72rem;font-weight:700;color:#7b2fa8;background:#f5eefe;padding:4px 12px;border-radius:20px;margin-bottom:8px}
    .sec-label-pink{display:inline-block;font-size:.72rem;font-weight:700;color:#e8439a;background:#fde8f1;padding:4px 12px;border-radius:20px;margin-bottom:8px}
    .sec-label-red{display:inline-block;font-size:.72rem;font-weight:700;color:#d32f2f;background:#ffebee;padding:4px 12px;border-radius:20px;margin-bottom:8px}
    .sec-title{font-size:clamp(1rem,3vw,1.4rem);font-weight:800;color:#370558;line-height:1.45;margin-bottom:14px}
    .sec-body{font-size:.92rem;color:#444;line-height:1.85}

    /* 히어로 */
    .hero{background:linear-gradient(135deg,#370558,#510580,#7b2fa8);color:white;padding:36px 20px;text-align:center}
    .hero-badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);border-radius:20px;font-size:.78rem;font-weight:700;padding:4px 14px;margin-bottom:12px}
    .hero h1{font-size:clamp(1.5rem,4.5vw,2.2rem);font-weight:800;line-height:1.4;margin-bottom:6px;color:white}
    .hero-sub{font-size:.85rem;opacity:.85;margin-top:6px}

    /* 빵부스러기 */
    .breadcrumb{padding:14px 16px;font-size:.78rem;color:#888;background:#fafafa;border-bottom:1px solid #f0f0f0}
    .breadcrumb a{color:#7b2fa8;text-decoration:none}
    .breadcrumb a:hover{text-decoration:underline}

    /* ③ 시기별 카드 */
    .phase-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
    .phase-card{padding:14px;border:1px solid #e8d6f5;border-radius:8px;background:white;word-break:keep-all}
    .phase-period{font-size:.72rem;color:#7b2fa8;font-weight:700;margin-bottom:4px}
    .phase-name{font-size:.92rem;font-weight:800;color:#370558;margin-bottom:4px;word-break:keep-all}
    .phase-desc{font-size:.78rem;color:#666;line-height:1.6;word-break:keep-all}

    /* ④ 영역별 공부법 */
    .area-item{border-left:3px solid #510580;padding:10px 14px;margin-bottom:14px}
    .area-item:last-child{margin-bottom:0}
    .area-name{font-size:.95rem;font-weight:800;color:#370558;margin-bottom:6px}
    .area-body{font-size:.86rem;color:#555;line-height:1.85}

    /* ⑤ 목표 등급별 */
    .tier-card{padding:14px;border-radius:8px;margin-bottom:8px;border:1px solid;border-left-width:3px}
    .tier-card:last-child{margin-bottom:0}
    .tier-gold{border-color:#f0e0a0;border-left-color:#ffb300;background:white}
    .tier-purple{border-color:#d4b8e8;border-left-color:#8e24aa;background:white}
    .tier-blue{border-color:#b8d4ee;border-left-color:#1976d2;background:white}
    .tier-gray{border-color:#d0d0d0;border-left-color:#616161;background:white}
    .tier-head{display:flex;align-items:center;gap:8px;margin-bottom:6px}
    .tier-num{width:24px;height:24px;border-radius:50%;color:white;display:flex;align-items:center;justify-content:center;font-size:.78rem;font-weight:700;flex-shrink:0}
    .tier-gold .tier-num{background:#ffb300}
    .tier-purple .tier-num{background:#8e24aa}
    .tier-blue .tier-num{background:#1976d2}
    .tier-gray .tier-num{background:#616161;font-size:.7rem}
    .tier-label{font-size:.92rem;font-weight:800}
    .tier-gold .tier-label{color:#6d4c00}
    .tier-purple .tier-label{color:#4a148c}
    .tier-blue .tier-label{color:#0d47a1}
    .tier-gray .tier-label{color:#212121}
    .tier-body{font-size:.84rem;color:#555;line-height:1.85}

    /* ⑥ 실수 TOP 3 */
    .mistake-item{display:flex;gap:12px;padding:12px;border:1px solid #f5d4d4;border-radius:6px;margin-bottom:8px}
    .mistake-item:last-child{margin-bottom:0}
    .mistake-num{font-size:1.1rem;font-weight:800;color:#e8439a;min-width:22px;line-height:1.5}
    .mistake-title{font-size:.92rem;font-weight:800;color:#370558;margin-bottom:4px}
    .mistake-body{font-size:.82rem;color:#555;line-height:1.85}

    /* ⑦ 체크리스트 */
    .check-item{display:flex;gap:10px;padding:10px 12px;border:1px solid #e8d6f5;border-radius:6px;margin-bottom:6px;align-items:center}
    .check-item:last-child{margin-bottom:0}
    .check-box{width:16px;height:16px;border:1.5px solid #510580;border-radius:3px;flex-shrink:0}
    .check-text{font-size:.85rem;color:#370558;font-weight:700}

    /* ⑧ FAQ */
    .faq-item{padding:14px 0;border-bottom:1px solid #f0e6fc}
    .faq-item:last-child{border-bottom:none;padding-bottom:0}
    .faq-q{font-size:.92rem;font-weight:800;color:#370558;margin-bottom:6px}
    .faq-a{font-size:.84rem;color:#555;line-height:1.85}

    /* ⑨ 관련 페이지 */
    .related-item{display:flex;align-items:center;gap:10px;padding:12px 14px;border:1px solid #f0e6fc;border-radius:6px;margin-bottom:6px;text-decoration:none;background:white;transition:all .12s}
    .related-item:last-child{margin-bottom:0}
    .related-item:hover{border-color:#510580;background:#faf5ff}
    .related-icon{font-size:1.1rem;flex-shrink:0}
    .related-label{flex:1;font-size:.88rem;font-weight:700;color:#370558}
    .related-arrow{font-size:.95rem;color:#c9a3e8}

    /* ⑩ 태그 */
    .tags-wrap{display:flex;flex-wrap:wrap;gap:6px}
    .tag-item{font-size:.78rem;padding:5px 12px;background:white;border:1px solid #e8d6f5;color:#370558;border-radius:14px;font-weight:700}

    /* ⑪ CTA (통일) */
    .cta-sec{background:linear-gradient(135deg,#370558,#510580);padding:32px 20px;text-align:center}
    .cta-sec h2{font-size:clamp(1.2rem,3.5vw,1.7rem);font-weight:800;color:white;margin-bottom:6px}
    .cta-sub{font-size:.85rem;color:rgba(255,255,255,.75);margin-bottom:16px}
    .cta-btns{display:flex;gap:6px;justify-content:center;flex-wrap:nowrap;max-width:100%}
    .cta-phone{background:white;color:#510580;font-size:.78rem;font-weight:700;padding:9px 14px;border-radius:50px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;white-space:nowrap;flex-shrink:1}
    .cta-kakao{background:#FEE500;color:#3A1D1D;font-size:.78rem;font-weight:700;padding:9px 14px;border-radius:50px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;white-space:nowrap;flex-shrink:1}
    .cta-form{background:#e8439a;color:white;font-size:.78rem;font-weight:700;padding:9px 14px;border-radius:50px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;white-space:nowrap;flex-shrink:1}

    @media(min-width:768px){
      .sec{padding:40px}
      .hero{padding:60px 40px}
      .breadcrumb{padding:16px 40px}
      .phase-grid{grid-template-columns:repeat(4,1fr);gap:12px}
      .phase-card{padding:18px}
      .phase-name{font-size:1rem}
      .phase-desc{font-size:.82rem}
      .tier-card{padding:18px}
      .tier-num{width:28px;height:28px;font-size:.85rem}
      .tier-label{font-size:1rem}
      .tier-body{font-size:.9rem}
      .area-item{padding:12px 18px;margin-bottom:18px}
      .area-name{font-size:1.05rem}
      .area-body{font-size:.92rem}
      .mistake-item{padding:16px}
      .mistake-title{font-size:1rem}
      .mistake-body{font-size:.88rem}
      .faq-q{font-size:1rem}
      .faq-a{font-size:.9rem}
      .related-item{padding:14px 18px}
      .cta-sec{padding:60px 40px}
      .cta-btns{gap:10px}
      .cta-phone,.cta-kakao,.cta-form{font-size:.95rem;padding:13px 26px;gap:6px}
    }

    footer{background:#370558;color:rgba(255,255,255,.45);text-align:center;padding:20px;font-size:.75rem;line-height:1.8}
    footer p{color:rgba(255,255,255,.45);margin:2px 0}
    footer a{color:rgba(255,255,255,.6);text-decoration:none}
    footer a{color:rgba(255,255,255,.6);text-decoration:none}
  </style>
</head>
<body>
${HEADER_HTML}

<div class="hero">
  <div class="hero-badge">학년별 로드맵 · 고등 3학년</div>
  <h1>고3 국어 공부법<br>수능 D-day 전략</h1>
  <div class="hero-sub">시기별 학습법 · 영역별 전략 · 등급별 맞춤</div>
</div>

<div class="breadcrumb">
  <a href="/study/">과목별 공부법</a> &gt; <a href="/study/${subjectKey}/">${subjectName}</a> &gt; 학년별 로드맵 &gt; 고3
</div>

<div class="wrap">

  <div class="sec">
    <div class="sec-label">📌 시작하며</div>
    <div class="sec-title">고3 국어, 왜 지금이 가장 중요한가</div>
    <div class="sec-body">고3 국어는 1·2학년 때처럼 새로운 개념을 익히는 시기가 아닙니다. 그동안 쌓은 실력을 점수로 바꾸는 단계예요. 같은 1년이지만, 어떤 순서로 약점을 보완하느냐에 따라 결과가 크게 달라집니다. 늦었다고 포기하기엔 충분히 가능성이 있고, 안일하게 보내기엔 너무 짧은 시간 — 그래서 전략이 필요합니다.</div>
  </div>

  <div class="sec">
    <div class="sec-label">🎯 시기별 전략</div>
    <div class="sec-title">고3 1년 학습 로드맵</div>
    <div class="phase-grid">${phasesHtml}</div>
  </div>

  <div class="sec">
    <div class="sec-label">📖 영역별 공부법</div>
    <div class="sec-title">수능 국어 4개 영역 학습 전략</div>
    <div>${areasHtml}</div>
  </div>

  <div class="sec">
    <div class="sec-label-pink">🏆 목표 등급별 전략</div>
    <div class="sec-title">현재 위치에서 1등급 끌어올리기</div>
    <div>${tiersHtml}</div>
  </div>

  <div class="sec">
    <div class="sec-label-red">⚠️ 흔히 하는 실수</div>
    <div class="sec-title">고3이 가장 많이 빠지는 함정 TOP 3</div>
    <div>${mistakesHtml}</div>
  </div>

  <div class="sec">
    <div class="sec-label">📅 D-100 체크리스트</div>
    <div class="sec-title">수능 100일 전, 반드시 점검</div>
    <div>${checklistHtml}</div>
  </div>

  <div class="sec">
    <div class="sec-label">❓ 궁금한 점</div>
    <div class="sec-title">고3 국어 자주 묻는 질문</div>
    <div>${faqsHtml}</div>
  </div>

  <div class="sec">
    <div class="sec-label">🔗 관련 페이지</div>
    <div class="sec-title">함께 보면 좋은 가이드</div>
    <div>${relatedHtml}</div>
  </div>

  <div class="sec">
    <div class="sec-label">🏷️ 태그</div>
    <div class="tags-wrap">${tagsHtml}</div>
  </div>

</div>

<div class="cta-sec">
  <h2>지금 바로 무료 상담 받으세요</h2>
  <div class="cta-sub">상담 후 무료 시범수업까지 — 부담 없이 시작하세요</div>
  <div class="cta-btns">
    <a href="tel:${PHONE}" class="cta-phone">📞 전화</a>
    <a href="${KAKAO_URL}" target="_blank" class="cta-kakao">💬 카카오톡</a>
    <a href="${FORM_URL}" target="_blank" class="cta-form">📝 체험신청</a>
  </div>
</div>

${FLOAT_HTML}

${FOOTER_HTML}

</body>
</html>`;
}

// ── 학년별 페이지 (범용 — 6과목 모두 처리, 기본 subjectKey='korean') ──
export function buildKoreanGradePage(gradeKey, subjectKey = "korean") {
  const meta = GRADE_SUBJECT_META[subjectKey];
  if (!meta) return build404Page();
  const dataSource = meta.data();
  if (!dataSource) return build404Page();
  const data = dataSource[gradeKey];
  if (!data) return build404Page();

  const canonical = `${SITE_DOMAIN}/study/${subjectKey}/grade/${gradeKey}/`;
  const subjectName = meta.name;
  const titleTag = `${data.tag} ${subjectName} 공부법 — ${data.intro.title.split(',')[1] ? data.intro.title.split(',')[1].trim() : data.intro.title} | ${SITE_NAME}`;
  const description = `${data.tag} ${subjectName} 공부법 가이드. ${data.intro.body.substring(0, 100)}... 제나쌤 스터디핏 1:1 맞춤 과외.`;

  // 페이지별 의사 갱신일 (SEO 최신성)
  const slugForDate = `${subjectKey}-grade-${gradeKey}`;
  const dates = getPageDates(slugForDate);

  // JSON-LD BreadcrumbList
  const breadcrumbItems = [
    { name: "홈", url: `${SITE_DOMAIN}/` },
    { name: "과목별 공부법", url: `${SITE_DOMAIN}/study/` },
    { name: subjectName, url: `${SITE_DOMAIN}/study/${subjectKey}/` },
    { name: "학년별 로드맵", url: `${SITE_DOMAIN}/study/${subjectKey}/` },
    { name: data.tag, url: canonical },
  ];
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(breadcrumbItems);

  // HTML 빌드
  let phasesHtml = "";
  for (const [period, name, desc] of data.phases) {
    phasesHtml += `<div class="phase-card"><div class="phase-period">${period}</div><div class="phase-name">${name}</div><div class="phase-desc">${desc}</div></div>`;
  }

  let areasHtml = "";
  for (const a of data.areas) {
    areasHtml += `<div class="area-item"><div class="area-name">${a.name}</div><div class="area-body">${a.body}</div></div>`;
  }

  // 수준별 카드 (3개 - 학년별로 색상 동일하게)
  const tierClasses = ["tier-card-green", "tier-card-blue", "tier-card-purple", "tier-card-orange"];
  const tierIcons = ["🌱", "🌿", "🌳", "🌟"];
  let tiersHtml = "";
  for (let i = 0; i < data.tiers.length; i++) {
    const t = data.tiers[i];
    const idx = i % tierClasses.length;
    tiersHtml += `<div class="tier-card ${tierClasses[idx]}"><div class="tier-head"><div class="tier-icon">${tierIcons[idx]}</div><div class="tier-label">${t.label}</div></div><div class="tier-body">${t.body}</div></div>`;
  }

  let mistakesHtml = "";
  let mistakeNum = 1;
  for (const m of data.mistakes) {
    mistakesHtml += `<div class="mistake-item"><div class="mistake-num">${mistakeNum}</div><div><div class="mistake-title">${m.title}</div><div class="mistake-body">${m.body}</div></div></div>`;
    mistakeNum++;
  }

  let checklistHtml = "";
  for (const c of data.checklist) {
    checklistHtml += `<div class="check-item"><div class="check-box"></div><div class="check-text">${c}</div></div>`;
  }

  let faqsHtml = "";
  for (const f of data.faqs) {
    faqsHtml += `<div class="faq-item"><div class="faq-q">Q. ${f.q}</div><div class="faq-a">${f.a}</div></div>`;
  }

  let relatedHtml = "";
  for (const r of data.related) {
    relatedHtml += `<a href="${r.href}" class="related-item"><div class="related-icon">📖</div><div class="related-label">${r.label}</div><div class="related-arrow">→</div></a>`;
  }

  let tagsHtml = "";
  for (const t of data.tags) {
    tagsHtml += `<span class="tag-item">#${t}</span>`;
  }

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.tag} ${subjectName} 공부법 | ${SITE_NAME}</title>
  <meta name="description" content="${data.tag} ${subjectName} 공부법 가이드. 시기별 학습법, 영역별 전략, 수준별 맞춤 가이드, 자주 하는 실수와 체크리스트까지. 제나쌤 스터디핏 1:1 맞춤 과외.">
  <link rel="canonical" href="${canonical}">
  ${buildSocialMeta({ title: `${data.tag} ${subjectName} 공부법 | ${SITE_NAME}`, description: `${data.tag} ${subjectName} 공부법 가이드. 시기별 학습법, 영역별 전략, 수준별 맞춤 가이드, 자주 하는 실수와 체크리스트까지.`, canonical, ogType: "article", imageAlt: `${data.tag} ${subjectName} 공부법 가이드` })}
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;800&display=swap" rel="stylesheet">
  <style>
    ${HEADER_CSS}
    ${FLOAT_CSS}
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Noto Sans KR',sans-serif;background:#fff;color:#1a0a24;line-height:1.7;word-break:keep-all}
    .wrap{max-width:760px;margin:0 auto}
    .sec{padding:24px 16px;border-bottom:1px solid #f0f0f0}
    .sec-label{display:inline-block;font-size:.72rem;font-weight:700;color:#7b2fa8;background:#f5eefe;padding:4px 12px;border-radius:20px;margin-bottom:8px}
    .sec-label-pink{display:inline-block;font-size:.72rem;font-weight:700;color:#e8439a;background:#fde8f1;padding:4px 12px;border-radius:20px;margin-bottom:8px}
    .sec-label-red{display:inline-block;font-size:.72rem;font-weight:700;color:#d32f2f;background:#ffebee;padding:4px 12px;border-radius:20px;margin-bottom:8px}
    .sec-title{font-size:clamp(1rem,3vw,1.4rem);font-weight:800;color:#370558;line-height:1.45;margin-bottom:14px}
    .sec-body{font-size:.92rem;color:#444;line-height:1.85}

    .hero{background:linear-gradient(135deg,#370558,#510580,#7b2fa8);color:white;padding:36px 20px;text-align:center}
    .hero-badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);border-radius:20px;font-size:.78rem;font-weight:700;padding:4px 14px;margin-bottom:12px}
    .hero h1{font-size:clamp(1.5rem,4.5vw,2.2rem);font-weight:800;line-height:1.4;margin-bottom:6px;color:white}
    .hero-sub{font-size:.85rem;opacity:.85;margin-top:6px}

    .breadcrumb{padding:14px 16px;font-size:.78rem;color:#888;background:#fafafa;border-bottom:1px solid #f0f0f0}
    .breadcrumb a{color:#7b2fa8;text-decoration:none}
    .breadcrumb a:hover{text-decoration:underline}

    .phase-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
    .phase-card{padding:14px;border:1px solid #e8d6f5;border-radius:8px;background:white;word-break:keep-all}
    .phase-period{font-size:.72rem;color:#7b2fa8;font-weight:700;margin-bottom:4px}
    .phase-name{font-size:.92rem;font-weight:800;color:#370558;margin-bottom:4px;word-break:keep-all}
    .phase-desc{font-size:.78rem;color:#666;line-height:1.6;word-break:keep-all}

    .area-item{border-left:3px solid #510580;padding:10px 14px;margin-bottom:14px}
    .area-item:last-child{margin-bottom:0}
    .area-name{font-size:.95rem;font-weight:800;color:#370558;margin-bottom:6px}
    .area-body{font-size:.86rem;color:#555;line-height:1.85}

    .tier-card{padding:14px;border-radius:8px;margin-bottom:8px;border:1px solid;border-left-width:3px;background:white}
    .tier-card:last-child{margin-bottom:0}
    .tier-card-green{border-color:#c8e6c9;border-left-color:#4caf50}
    .tier-card-blue{border-color:#bbdefb;border-left-color:#2196f3}
    .tier-card-purple{border-color:#e1bee7;border-left-color:#9c27b0}
    .tier-card-orange{border-color:#ffe0b2;border-left-color:#ff9800}
    .tier-head{display:flex;align-items:center;gap:8px;margin-bottom:6px}
    .tier-icon{font-size:1.1rem;flex-shrink:0}
    .tier-label{font-size:.92rem;font-weight:800;color:#370558}
    .tier-body{font-size:.84rem;color:#555;line-height:1.85}

    .mistake-item{display:flex;gap:12px;padding:12px;border:1px solid #f5d4d4;border-radius:6px;margin-bottom:8px}
    .mistake-item:last-child{margin-bottom:0}
    .mistake-num{font-size:1.1rem;font-weight:800;color:#e8439a;min-width:22px;line-height:1.5}
    .mistake-title{font-size:.92rem;font-weight:800;color:#370558;margin-bottom:4px}
    .mistake-body{font-size:.82rem;color:#555;line-height:1.85}

    .check-item{display:flex;gap:10px;padding:10px 12px;border:1px solid #e8d6f5;border-radius:6px;margin-bottom:6px;align-items:center}
    .check-item:last-child{margin-bottom:0}
    .check-box{width:16px;height:16px;border:1.5px solid #510580;border-radius:3px;flex-shrink:0}
    .check-text{font-size:.85rem;color:#370558;font-weight:700}

    .faq-item{padding:14px 0;border-bottom:1px solid #f0e6fc}
    .faq-item:last-child{border-bottom:none;padding-bottom:0}
    .faq-q{font-size:.92rem;font-weight:800;color:#370558;margin-bottom:6px}
    .faq-a{font-size:.84rem;color:#555;line-height:1.85}

    .related-item{display:flex;align-items:center;gap:10px;padding:12px 14px;border:1px solid #f0e6fc;border-radius:6px;margin-bottom:6px;text-decoration:none;background:white;transition:all .12s}
    .related-item:last-child{margin-bottom:0}
    .related-item:hover{border-color:#510580;background:#faf5ff}
    .related-icon{font-size:1.1rem;flex-shrink:0}
    .related-label{flex:1;font-size:.88rem;font-weight:700;color:#370558}
    .related-arrow{font-size:.95rem;color:#c9a3e8}

    .tags-wrap{display:flex;flex-wrap:wrap;gap:6px}
    .tag-item{font-size:.78rem;padding:5px 12px;background:white;border:1px solid #e8d6f5;color:#370558;border-radius:14px;font-weight:700}

    .cta-sec{background:linear-gradient(135deg,#370558,#510580);padding:32px 20px;text-align:center}
    .cta-sec h2{font-size:clamp(1.2rem,3.5vw,1.7rem);font-weight:800;color:white;margin-bottom:6px}
    .cta-sub{font-size:.85rem;color:rgba(255,255,255,.75);margin-bottom:16px}
    .cta-btns{display:flex;gap:6px;justify-content:center;flex-wrap:nowrap;max-width:100%}
    .cta-phone{background:white;color:#510580;font-size:.78rem;font-weight:700;padding:9px 14px;border-radius:50px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;white-space:nowrap;flex-shrink:1}
    .cta-kakao{background:#FEE500;color:#3A1D1D;font-size:.78rem;font-weight:700;padding:9px 14px;border-radius:50px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;white-space:nowrap;flex-shrink:1}
    .cta-form{background:#e8439a;color:white;font-size:.78rem;font-weight:700;padding:9px 14px;border-radius:50px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;white-space:nowrap;flex-shrink:1}

    @media(min-width:768px){
      .sec{padding:40px}
      .hero{padding:60px 40px}
      .breadcrumb{padding:16px 40px}
      .phase-grid{grid-template-columns:repeat(4,1fr);gap:12px}
      .phase-card{padding:18px}
      .phase-name{font-size:1rem}
      .phase-desc{font-size:.82rem}
      .tier-card{padding:18px}
      .tier-icon{font-size:1.3rem}
      .tier-label{font-size:1rem}
      .tier-body{font-size:.9rem}
      .area-item{padding:12px 18px;margin-bottom:18px}
      .area-name{font-size:1.05rem}
      .area-body{font-size:.92rem}
      .mistake-item{padding:16px}
      .mistake-title{font-size:1rem}
      .mistake-body{font-size:.88rem}
      .faq-q{font-size:1rem}
      .faq-a{font-size:.9rem}
      .related-item{padding:14px 18px}
      .cta-sec{padding:60px 40px}
      .cta-btns{gap:10px}
      .cta-phone,.cta-kakao,.cta-form{font-size:.95rem;padding:13px 26px;gap:6px}
    }

    footer{background:#370558;color:rgba(255,255,255,.45);text-align:center;padding:20px;font-size:.75rem;line-height:1.8}
    footer p{color:rgba(255,255,255,.45);margin:2px 0}
    footer a{color:rgba(255,255,255,.6);text-decoration:none}
    footer a{color:rgba(255,255,255,.6);text-decoration:none}
  </style>
</head>
<body>
${HEADER_HTML}
${breadcrumbJsonLd}

<div class="hero">
  <div class="hero-badge">${data.badge}</div>
  <h1>${data.h1}</h1>
  <div class="hero-sub">${data.sub}</div>
</div>

<div class="breadcrumb">
  <a href="/study/">과목별 공부법</a> &gt; <a href="/study/${subjectKey}/">${subjectName}</a> &gt; 학년별 로드맵 &gt; ${data.breadcrumb}
</div>

<div style="max-width:760px;margin:0 auto;display:flex;align-items:center;gap:8px;padding:6px 16px;font-size:.7rem;color:#999;border-bottom:1px solid #f5eefe">
  <span>📅 최종 업데이트: ${dates.modifiedKR}</span>
  <span style="color:#ddd">|</span>
  <span>최초 게시: ${dates.publishedKR}</span>
</div>

<div class="wrap">

  <div class="sec">
    <div class="sec-label">📌 시작하며</div>
    <div class="sec-title">${data.intro.title}</div>
    <div class="sec-body">${data.intro.body}</div>
  </div>

  <div class="sec">
    <div class="sec-label">🎯 시기별 전략</div>
    <div class="sec-title">${data.tag} 1년 학습 흐름</div>
    <div class="phase-grid">${phasesHtml}</div>
  </div>

  <div class="sec">
    <div class="sec-label">📖 영역별 공부법</div>
    <div class="sec-title">${data.tag} ${subjectName} 핵심 학습 영역</div>
    <div>${areasHtml}</div>
  </div>

  <div class="sec">
    <div class="sec-label-pink">🌱 우리 아이 수준별 전략</div>
    <div class="sec-title">상황별 맞춤 가이드</div>
    <div>${tiersHtml}</div>
  </div>

  <div class="sec">
    <div class="sec-label-red">⚠️ 부모님이 자주 하는 실수</div>
    <div class="sec-title">${data.tag}에서 가장 흔한 함정 TOP 3</div>
    <div>${mistakesHtml}</div>
  </div>

  <div class="sec">
    <div class="sec-label">📅 ${data.checklistTitle}</div>
    <div class="sec-title">${data.checklistSub}</div>
    <div>${checklistHtml}</div>
  </div>

  <div class="sec">
    <div class="sec-label">❓ 궁금한 점</div>
    <div class="sec-title">${data.tag} ${subjectName} 자주 묻는 질문</div>
    <div>${faqsHtml}</div>
  </div>

  <div class="sec">
    <div class="sec-label">🔗 관련 페이지</div>
    <div class="sec-title">함께 보면 좋은 가이드</div>
    <div>${relatedHtml}</div>
  </div>

  <div class="sec">
    <div class="sec-label">🏷️ 태그</div>
    <div class="tags-wrap">${tagsHtml}</div>
  </div>

</div>

<div class="cta-sec">
  <h2>지금 바로 무료 상담 받으세요</h2>
  <div class="cta-sub">상담 후 무료 시범수업까지 — 부담 없이 시작하세요</div>
  <div class="cta-btns">
    <a href="tel:${PHONE}" class="cta-phone">📞 전화</a>
    <a href="${KAKAO_URL}" target="_blank" class="cta-kakao">💬 카카오톡</a>
    <a href="${FORM_URL}" target="_blank" class="cta-form">📝 체험신청</a>
  </div>
</div>

${buildShareButtons(`${data.tag} ${subjectName} 공부법 | ${SITE_NAME}`, canonical)}

${FLOAT_HTML}

${FOOTER_HTML}

</body>
</html>`;
}
