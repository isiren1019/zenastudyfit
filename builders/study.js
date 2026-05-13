// ================================================================
// builders/study.js — 5과목 공부법 통합 시스템 빌더
// 변경 빈도: 중간 (과목 추가/허브 디자인 변경 시)
// 의존:
//   - config.js (SITE_NAME, SITE_DOMAIN, FORM_URL, KAKAO_URL, PHONE)
//   - layout.js (HEADER_CSS, HEADER_HTML, FOOTER_HTML, FLOAT_CSS, FLOAT_HTML)
//   - data/subjects/_meta.js (SUBJECT_HUB_DATA)
//   - builders/pages.js (build404Page) — 잘못된 subjectKey 폴백용
//
// 함수 (3개):
//   - buildStudyMainPage()                        — 6과목 공부법 메인 (/study/)
//   - buildSubjectHubPage(subjectKey)             — 과목 허브 (/study/{subject}/) — 5과목용
//   - buildStudyComingSoonPage(subjectName, key)  — 준비중 페이지
//
// ⚠️ 국어는 별도 시스템:
//   - 국어 허브:    builders/korean-hub.js — buildKoreanHubPage
//   - 국어 학년별:  builders/korean-hub.js — buildKoreanGradePage, buildKoreanGradeHigh3Page
//   - 학습 습관:    builders/habit.js — buildKoreanHabitPage (모든 과목 공통)
// ================================================================

import { SITE_NAME, SITE_DOMAIN, FORM_URL, KAKAO_URL, PHONE, STUDY_READY } from '../config.js';
import { HEADER_CSS, HEADER_HTML, FOOTER_HTML, FLOAT_CSS, FLOAT_HTML } from '../layout.js';
import { SUBJECT_HUB_DATA } from '../data/subjects/_meta.js';
import { build404Page } from './pages.js';


// ── 과목별 공부법 메인 페이지 ─────────────────────────────────
export function buildStudyMainPage() {
  const canonical = `${SITE_DOMAIN}/study/`;
  const titleTag = `과목별 공부법 — 국·영·수·사·과 공부 방법 | ${SITE_NAME}`;
  const description = `국어·영어·수학·과학·사회·한국사 6과목 학습법과 초등·중등·고등 학년별 공부 전략을 한눈에. 제나쌤 스터디핏의 과목별·학년별 맞춤 공부법 가이드.`;

  const SUBJECT_DATA = [
    { key: "korean",  icon: "📖", name: "국어",   areas: 11, count: 75, desc: "독해력은 모든 과목의 기초. 비문학·문학·문법·서술형까지 학년별 단계 학습이 필요합니다.", tags: ["문해력","서술형","비문학"] },
    { key: "english", icon: "🌍", name: "영어",   areas: 11, count: 70, desc: "어휘·문법·독해의 균형이 1등급을 만듭니다. 내신과 수능 동시 대비 전략이 필요합니다.", tags: ["문법","독해","어휘"] },
    { key: "math",    icon: "📐", name: "수학",   areas: 11, count: 70, desc: "개념→유형→실전 3단계로 완성. 오답 분석과 반복이 진짜 점수를 만듭니다.", tags: ["개념","유형","오답노트"] },
    { key: "science", icon: "🔬", name: "과학",   areas: 11, count: 70, desc: "암기보다 원리 이해가 우선. 실험과 교과 개념을 함께 정리하면 서술형도 강해집니다.", tags: ["개념원리","실험해석","물화생지"] },
    { key: "social",  icon: "🗺️", name: "사회",   areas: 11, count: 70, desc: "방대한 내용을 구조화해 정리. 흐름과 맥락 이해로 암기량을 자연스럽게 줄입니다.", tags: ["시사","구조화","맥락파악"] },
    { key: "history", icon: "📜", name: "한국사", areas: 11, count: 70, desc: "시대별 흐름을 먼저 잡고 사건을 연결. 인과관계 이해가 점수를 만드는 핵심입니다.", tags: ["시대흐름","인과관계","수능필수"] },
  ];

  const GRADE_DATA = [
    {
      icon: "🎒", name: "초등", badge: "기초·습관",
      desc: "학습 흥미와 기초 개념 형성기. 독서·연산·영어 노출이 핵심이며, 자기주도 학습 습관 형성이 가장 중요합니다.",
      subjects: [
        ["📖", "국어", "독서·받아쓰기·일기"],
        ["🌍", "영어", "노출·파닉스·기초 회화"],
        ["📐", "수학", "연산 정확도·문장제"],
      ]
    },
    {
      icon: "📚", name: "중등", badge: "내신·전환",
      desc: "내신 첫 시험 대비기. 중2 수학·영어가 분기점이며, 고등 선행과 학습량 적응이 관건이 되는 시기입니다.",
      subjects: [
        ["📖", "국어", "비문학·문법 기초"],
        ["🌍", "영어", "문법 체계·내신 독해"],
        ["📐", "수학", "개념 이해·서술형"],
      ]
    },
    {
      icon: "🎓", name: "고등", badge: "수능·내신",
      desc: "수능과 내신 동시 대비기. 목표 등급별 전략 차별화가 필수이며, 수능 영역별 집중 학습이 진행됩니다.",
      subjects: [
        ["📖", "국어", "비문학·문학 심화"],
        ["🌍", "영어", "수능 독해·EBS 연계"],
        ["📐", "수학", "미적분·확통 선택"],
      ]
    },
  ];

  // ③ 과목별 가이드 바로가기 카드 HTML
  let guideCardsHtml = "";
  for (const s of SUBJECT_DATA) {
    const ready = STUDY_READY[s.key];
    if (ready) {
      guideCardsHtml += `<a href="/study/${s.key}/" class="guide-card"><div class="guide-icon">${s.icon}</div><div class="guide-name">${s.name}</div><div class="guide-meta">${s.areas}영역 · ${s.count}개</div></a>`;
    } else {
      guideCardsHtml += `<span class="guide-card guide-card-soon"><div class="guide-icon">${s.icon}</div><div class="guide-name">${s.name}<span class="nav-badge-soon" style="margin-left:4px">준비중</span></div><div class="guide-meta">곧 공개됩니다</div></span>`;
    }
  }

  // ④ 과목별 학습법 한눈에 카드 HTML
  let summaryCardsHtml = "";
  for (const s of SUBJECT_DATA) {
    let tagsHtml = "";
    for (const t of s.tags) {
      tagsHtml += `<span class="summary-tag">#${t}</span>`;
    }
    const ready = STUDY_READY[s.key];
    if (ready) {
      summaryCardsHtml += `<a href="/study/${s.key}/" class="summary-card"><div class="summary-head"><div class="summary-icon">${s.icon}</div><div class="summary-name">${s.name}</div><div class="summary-arrow">→</div></div><div class="summary-desc">${s.desc}</div><div class="summary-tags">${tagsHtml}</div></a>`;
    } else {
      summaryCardsHtml += `<span class="summary-card summary-card-soon"><div class="summary-head"><div class="summary-icon">${s.icon}</div><div class="summary-name">${s.name}<span class="nav-badge-soon" style="margin-left:6px">준비중</span></div></div><div class="summary-desc">${s.desc}</div><div class="summary-tags">${tagsHtml}</div></span>`;
    }
  }

  // ⑤ 학년별 학습 전략 카드 HTML
  let gradeCardsHtml = "";
  for (const g of GRADE_DATA) {
    let subjLines = "";
    for (const [icon, name, hint] of g.subjects) {
      subjLines += `<div class="grade-subj-line">${icon} ${name} — ${hint}</div>`;
    }
    gradeCardsHtml += `<div class="grade-card"><div class="grade-head"><div class="grade-name">${g.icon} ${g.name}</div><div class="grade-badge">${g.badge}</div></div><div class="grade-desc">${g.desc}</div><div class="grade-subjects">${subjLines}</div></div>`;
  }

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
    .sec{padding:32px 20px;border-bottom:1px solid #f0f0f0}
    .sec-grade{background:#fdfafe}
    .sec-label{display:inline-block;font-size:.72rem;font-weight:700;color:#7b2fa8;background:#f5eefe;padding:4px 12px;border-radius:20px;margin-bottom:10px}
    .sec-label-pink{display:inline-block;font-size:.72rem;font-weight:700;color:#e8439a;background:#fde8f1;padding:4px 12px;border-radius:20px;margin-bottom:10px}
    .sec-title{font-size:clamp(1.1rem,3vw,1.5rem);font-weight:800;color:#370558;line-height:1.45;margin-bottom:14px}
    .sec-body{font-size:.92rem;color:#444;line-height:1.85;max-width:800px}

    .hero{background:linear-gradient(135deg,#370558,#510580,#7b2fa8);color:white;padding:48px 24px;text-align:center}
    .hero-badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);border-radius:20px;font-size:.78rem;font-weight:700;padding:5px 16px;margin-bottom:14px}
    .hero h1{font-size:clamp(1.5rem,4.5vw,2.4rem);font-weight:800;line-height:1.4;margin-bottom:8px;color:white}
    .hero-sub{font-size:clamp(.95rem,2.5vw,1.15rem);margin-bottom:10px;opacity:.95}
    .hero-stat{font-size:.85rem;opacity:.85}

    .guide-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:14px}
    .guide-card{padding:16px 8px;border:1px solid #f0e6fc;border-radius:8px;text-align:center;text-decoration:none;display:block;background:white;transition:all .15s}
    .guide-card:hover{border-color:#510580;background:#faf5ff}
    .guide-card-soon{cursor:not-allowed;opacity:.6;background:#fafafa}
    .guide-card-soon:hover{border-color:#f0e6fc;background:#fafafa}
    .guide-icon{font-size:1.5rem}
    .guide-name{font-size:.92rem;color:#370558;font-weight:700;margin-top:6px}
    .guide-meta{font-size:.7rem;color:#888;margin-top:2px}
    .all-study-banner{display:block;padding:16px;background:linear-gradient(135deg,#faf5ff,#f5eefe);border:1.5px solid #e8439a;border-radius:8px;text-decoration:none}
    .all-study-row{display:flex;align-items:center;gap:12px}
    .all-study-icon{font-size:1.7rem}
    .all-study-text{flex:1}
    .all-study-title{font-size:.92rem;font-weight:800;color:#370558;margin-bottom:2px}
    .all-study-desc{font-size:.78rem;color:#666}
    .all-study-arrow{font-size:1.1rem;color:#e8439a}

    .summary-grid{display:grid;grid-template-columns:1fr;gap:8px}
    .summary-card{padding:14px;border:1px solid #e8d6f5;border-radius:8px;text-decoration:none;display:block;background:white;transition:all .15s}
    .summary-card:hover{border-color:#510580;background:#faf5ff}
    .summary-card-soon{cursor:not-allowed;opacity:.6;background:#fafafa}
    .summary-card-soon:hover{border-color:#e8d6f5;background:#fafafa}
    .summary-head{display:flex;align-items:center;gap:8px;margin-bottom:6px}
    .summary-icon{font-size:1.3rem}
    .summary-name{font-size:.95rem;font-weight:700;color:#370558}
    .summary-arrow{font-size:.85rem;color:#c9a3e8;margin-left:auto}
    .summary-desc{font-size:.83rem;color:#555;line-height:1.7;margin-bottom:8px}
    .summary-tags{display:flex;flex-wrap:wrap;gap:4px}
    .summary-tag{font-size:.72rem;padding:3px 9px;background:#f5eefe;color:#7b2fa8;border-radius:12px}

    .grade-grid{display:grid;grid-template-columns:1fr;gap:10px}
    .grade-card{padding:16px;border:1px solid #f0e6fc;border-radius:8px;background:white}
    .grade-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
    .grade-name{font-size:.95rem;font-weight:700;color:#370558}
    .grade-badge{font-size:.72rem;color:#7b2fa8;background:#f5eefe;padding:3px 10px;border-radius:12px}
    .grade-desc{font-size:.83rem;color:#555;line-height:1.8;margin-bottom:10px}
    .grade-subjects{padding-top:10px;border-top:1px solid #f0e6fc;font-size:.78rem;color:#7b2fa8}
    .grade-subj-line{margin-bottom:4px}
    .grade-subj-line:last-child{margin-bottom:0}

    .cta-sec{background:linear-gradient(135deg,#370558,#510580);padding:36px 20px;text-align:center}
    .cta-sec h2{font-size:clamp(1.2rem,3.5vw,1.7rem);font-weight:800;color:white;margin-bottom:6px}
    .cta-sub{font-size:.85rem;color:rgba(255,255,255,.75);margin-bottom:18px}
    .cta-btns{display:flex;gap:6px;justify-content:center;flex-wrap:nowrap;max-width:100%}
    .cta-phone{background:white;color:#510580;font-size:.78rem;font-weight:700;padding:9px 14px;border-radius:50px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;white-space:nowrap;flex-shrink:1}
    .cta-kakao{background:#FEE500;color:#3A1D1D;font-size:.78rem;font-weight:700;padding:9px 14px;border-radius:50px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;white-space:nowrap;flex-shrink:1}
    .cta-form{background:#e8439a;color:white;font-size:.78rem;font-weight:700;padding:9px 14px;border-radius:50px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;white-space:nowrap;flex-shrink:1}

    @media(min-width:768px){
      .sec{padding:48px 40px}
      .guide-grid{grid-template-columns:repeat(6,1fr);gap:10px}
      .guide-card{padding:20px 10px}
      .guide-icon{font-size:1.8rem}
      .guide-name{font-size:1rem;margin-top:8px}
      .summary-grid{grid-template-columns:repeat(3,1fr);gap:12px}
      .summary-card{padding:18px}
      .summary-icon{font-size:1.5rem}
      .summary-name{font-size:1.05rem}
      .summary-desc{font-size:.9rem;margin-bottom:10px}
      .summary-tag{font-size:.78rem;padding:3px 10px}
      .grade-grid{grid-template-columns:repeat(3,1fr);gap:12px}
      .grade-card{padding:22px}
      .grade-name{font-size:1.05rem}
      .grade-desc{font-size:.9rem;margin-bottom:12px}
      .hero{padding:72px 40px}
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
  <div class="hero-badge">${SITE_NAME}</div>
  <h1>📚 과목별 공부법</h1>
  <div class="hero-sub">국·영·수·사·과 공부 방법</div>
  <div class="hero-stat">6과목 · 11개 영역 · 400+ 가이드</div>
</div>

<div class="wrap">

  <div class="sec">
    <div class="sec-label">📖 시작하며</div>
    <div class="sec-title">과목마다 공부법은 다릅니다</div>
    <div class="sec-body">국어는 독해력, 영어는 문법·어휘, 수학은 개념과 유형 — 과목마다 핵심이 다르고, 학년이 올라갈수록 전략도 달라져야 합니다. 제나쌤 스터디핏은 과목별·학년별 맞춤 공부법으로 학생을 지도합니다.</div>
  </div>

  <div class="sec">
    <div class="sec-label">📚 과목별 가이드 바로가기</div>
    <div class="sec-title">각 과목 선택시 세부 내용을 살펴볼 수 있습니다</div>
    <div class="guide-grid">${guideCardsHtml}</div>
    <a href="/self-study/" class="all-study-banner"><div class="all-study-row"><div class="all-study-icon">📋</div><div class="all-study-text"><div class="all-study-title">전과목 공부법</div><div class="all-study-desc">자기주도학습 · 플랜 관리 · 공부 습관</div></div><div class="all-study-arrow">→</div></div></a>
  </div>

  <div class="sec">
    <div class="sec-label">🎯 과목별 학습법 한눈에</div>
    <div class="sec-title">과목별 핵심 전략</div>
    <div class="summary-grid">${summaryCardsHtml}</div>
  </div>

  <div class="sec sec-grade">
    <div class="sec-label-pink">📅 학년별 학습 전략</div>
    <div class="sec-title">학년이 바뀌면 전략도 달라집니다</div>
    <div class="grade-grid">${gradeCardsHtml}</div>
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

// ── 과목별 허브 페이지 (5과목 통합 시스템) ────────────────────
export function buildSubjectHubPage(subjectKey) {
  const data = SUBJECT_HUB_DATA[subjectKey];
  if (!data) return build404Page();

  const canonical = `${SITE_DOMAIN}/study/${subjectKey}/`;
  const totalPages = data.categories.reduce((sum, c) => sum + c.count, 0);
  const titleTag = `${data.name} 공부법 — ${data.categories.length}개 영역 ${totalPages}개 가이드 | ${SITE_NAME}`;
  const description = `${data.name} ${data.categories.map(c => c.name).join("·")} 등 ${data.categories.length}개 영역 ${totalPages}개 가이드. 제나쌤 스터디핏 ${data.name} 1:1 맞춤 과외.`;

  // 카테고리 카드 HTML 생성
  // 활성 페이지 매핑 (URL이 실제로 존재하는 페이지만 클릭 가능)
  const SUBJECT_PAGE_READY = {
    "english": {
      "grade/elem1": "/study/english/grade/elem1/",
      "grade/elem2": "/study/english/grade/elem2/",
      "grade/elem3": "/study/english/grade/elem3/",
      "grade/elem4": "/study/english/grade/elem4/",
      "grade/elem5": "/study/english/grade/elem5/",
      "grade/elem6": "/study/english/grade/elem6/",
      "grade/pre-mid1": "/study/english/grade/pre-mid1/",
      "grade/mid1": "/study/english/grade/mid1/",
      "grade/mid2": "/study/english/grade/mid2/",
      "grade/mid3": "/study/english/grade/mid3/",
      "grade/pre-high1": "/study/english/grade/pre-high1/",
      "grade/high1": "/study/english/grade/high1/",
      "grade/high2": "/study/english/grade/high2/",
      "grade/high3": "/study/english/grade/high3/",
      "exam/naesin": "/study/english/exam/naesin/",
      "exam/past": "/study/english/exam/past/",
      "exam/mock": "/study/english/exam/mock/",
      "exam/order": "/study/english/exam/order/",
      "exam/insert": "/study/english/exam/insert/",
      "exam/suneung": "/study/english/exam/suneung/",
      "habit/timing": "/study/english/habit/timing/",
      "habit/notes": "/study/english/habit/notes/",
      "habit/self": "/study/english/habit/self/",
      "habit/routine": "/study/english/habit/routine/",
      "habit/slump": "/study/english/habit/slump/",
      "perform/descriptive": "/study/english/perform/descriptive/",
      "perform/assessment": "/study/english/perform/assessment/",
      "vocab/basic": "/study/english/vocab/basic/",
      "vocab/intermediate": "/study/english/vocab/intermediate/",
      "vocab/advanced": "/study/english/vocab/advanced/",
      "vocab/idiom": "/study/english/vocab/idiom/",
      "vocab/phrasal": "/study/english/vocab/phrasal/",
      "vocab/roots": "/study/english/vocab/roots/",
      "grammar/guide": "/study/english/grammar/guide/",
      "grammar/tense": "/study/english/grammar/tense/",
      "grammar/passive": "/study/english/grammar/passive/",
      "grammar/relative": "/study/english/grammar/relative/",
      "grammar/conjunction": "/study/english/grammar/conjunction/",
      "grammar/clause": "/study/english/grammar/clause/",
      "grammar/conditional": "/study/english/grammar/conditional/",
      "grammar/mistakes": "/study/english/grammar/mistakes/",
      "reading/skill": "/study/english/reading/skill/",
      "reading/theme": "/study/english/reading/theme/",
      "reading/inference": "/study/english/reading/inference/",
      "reading/detail": "/study/english/reading/detail/",
      "reading/blank": "/study/english/reading/blank/",
      "reading/title": "/study/english/reading/title/",
      "reading/context": "/study/english/reading/context/",
      "reading/speed": "/study/english/reading/speed/",
    },
    "math": {
      "grade/elem1": "/study/math/grade/elem1/",
      "grade/elem2": "/study/math/grade/elem2/",
      "grade/elem3": "/study/math/grade/elem3/",
      "grade/elem4": "/study/math/grade/elem4/",
      "grade/elem5": "/study/math/grade/elem5/",
      "grade/elem6": "/study/math/grade/elem6/",
      "grade/pre-mid1": "/study/math/grade/pre-mid1/",
      "grade/mid1": "/study/math/grade/mid1/",
      "grade/mid2": "/study/math/grade/mid2/",
      "grade/mid3": "/study/math/grade/mid3/",
      "grade/pre-high1": "/study/math/grade/pre-high1/",
      "grade/high1": "/study/math/grade/high1/",
      "grade/high2": "/study/math/grade/high2/",
      "grade/high3": "/study/math/grade/high3/",
      "exam/naesin": "/study/math/exam/naesin/",
      "exam/past": "/study/math/exam/past/",
      "exam/killer": "/study/math/exam/killer/",
      "exam/time": "/study/math/exam/time/",
      "exam/mock": "/study/math/exam/mock/",
      "exam/suneung": "/study/math/exam/suneung/",
      "habit/timing": "/study/math/habit/timing/",
      "habit/notes": "/study/math/habit/notes/",
      "habit/self": "/study/math/habit/self/",
      "habit/routine": "/study/math/habit/routine/",
      "habit/slump": "/study/math/habit/slump/",
      "perform/descriptive": "/study/math/perform/descriptive/",
      "perform/assessment": "/study/math/perform/assessment/",
      "concept/basic": "/study/math/concept/basic/",
      "concept/algebra": "/study/math/concept/algebra/",
      "concept/function": "/study/math/concept/function/",
      "concept/geometry": "/study/math/concept/geometry/",
      "concept/probability": "/study/math/concept/probability/",
      "concept/limit": "/study/math/concept/limit/",
      "concept/derivative": "/study/math/concept/derivative/",
      "concept/integral": "/study/math/concept/integral/",
      "type/equation": "/study/math/type/equation/",
      "type/inequality": "/study/math/type/inequality/",
      "type/graph": "/study/math/type/graph/",
      "type/proof": "/study/math/type/proof/",
      "type/max-min": "/study/math/type/max-min/",
      "type/sequence": "/study/math/type/sequence/",
      "type/case": "/study/math/type/case/",
      "type/application": "/study/math/type/application/",
      "suneung/common": "/study/math/suneung/common/",
      "suneung/calculus": "/study/math/suneung/calculus/",
      "suneung/statistics": "/study/math/suneung/statistics/",
      "suneung/geometry": "/study/math/suneung/geometry/",
      "suneung/choice": "/study/math/suneung/choice/",
      "suneung/strategy": "/study/math/suneung/strategy/",
      "mistake/pattern": "/study/math/mistake/pattern/",
      "mistake/calculation": "/study/math/mistake/calculation/",
      "mistake/careless": "/study/math/mistake/careless/",
      "mistake/misread": "/study/math/mistake/misread/",
      "mistake/check": "/study/math/mistake/check/",
      "high/calculus-basic": "/study/math/high/calculus-basic/",
      "high/calculus-advanced": "/study/math/high/calculus-advanced/",
      "high/statistics-basic": "/study/math/high/statistics-basic/",
      "high/statistics-advanced": "/study/math/high/statistics-advanced/",
      "high/geometry-basic": "/study/math/high/geometry-basic/",
      "high/geometry-advanced": "/study/math/high/geometry-advanced/",
    },
    "science": {
      "grade/elem1": "/study/science/grade/elem1/",
      "grade/elem2": "/study/science/grade/elem2/",
      "grade/elem3": "/study/science/grade/elem3/",
      "grade/elem4": "/study/science/grade/elem4/",
      "grade/elem5": "/study/science/grade/elem5/",
      "grade/elem6": "/study/science/grade/elem6/",
      "grade/pre-mid1": "/study/science/grade/pre-mid1/",
      "grade/mid1": "/study/science/grade/mid1/",
      "grade/mid2": "/study/science/grade/mid2/",
      "grade/mid3": "/study/science/grade/mid3/",
      "grade/pre-high1": "/study/science/grade/pre-high1/",
      "grade/high1": "/study/science/grade/high1/",
      "grade/high2": "/study/science/grade/high2/",
      "grade/high3": "/study/science/grade/high3/",
      "exam/naesin": "/study/science/exam/naesin/",
      "exam/calculation": "/study/science/exam/calculation/",
      "exam/graph": "/study/science/exam/graph/",
      "exam/past": "/study/science/exam/past/",
      "exam/mock": "/study/science/exam/mock/",
      "exam/suneung": "/study/science/exam/suneung/",
      "biology/cell": "/study/science/biology/cell/",
      "biology/genetics": "/study/science/biology/genetics/",
      "biology/ecology": "/study/science/biology/ecology/",
      "biology/body": "/study/science/biology/body/",
      "biology/microbiology": "/study/science/biology/microbiology/",
      "biology/practice": "/study/science/biology/practice/",
      "physics/mechanics": "/study/science/physics/mechanics/",
      "physics/energy": "/study/science/physics/energy/",
      "physics/electricity": "/study/science/physics/electricity/",
      "physics/wave": "/study/science/physics/wave/",
      "physics/modern": "/study/science/physics/modern/",
      "physics/practice": "/study/science/physics/practice/",
      "habit/timing": "/study/science/habit/timing/",
      "habit/notes": "/study/science/habit/notes/",
      "habit/self": "/study/science/habit/self/",
      "habit/routine": "/study/science/habit/routine/",
      "habit/slump": "/study/science/habit/slump/",
      "perform/descriptive": "/study/science/perform/descriptive/",
      "perform/assessment": "/study/science/perform/assessment/",
      "chemistry/atom": "/study/science/chemistry/atom/",
      "chemistry/bond": "/study/science/chemistry/bond/",
      "chemistry/reaction": "/study/science/chemistry/reaction/",
      "chemistry/acid": "/study/science/chemistry/acid/",
      "chemistry/organic": "/study/science/chemistry/organic/",
      "chemistry/practice": "/study/science/chemistry/practice/",
      "earth/astronomy": "/study/science/earth/astronomy/",
      "earth/geology": "/study/science/earth/geology/",
      "earth/atmosphere": "/study/science/earth/atmosphere/",
      "earth/ocean": "/study/science/earth/ocean/",
      "earth/climate": "/study/science/earth/climate/",
      "earth/practice": "/study/science/earth/practice/",
      "integrated/overview": "/study/science/integrated/overview/",
      "integrated/matter": "/study/science/integrated/matter/",
      "integrated/system": "/study/science/integrated/system/",
      "integrated/evolution": "/study/science/integrated/evolution/",
      "integrated/environment": "/study/science/integrated/environment/",
      "integrated/future": "/study/science/integrated/future/",
    },
    "history": {
      "grade/elem1": "/study/history/grade/elem1/",
      "grade/elem2": "/study/history/grade/elem2/",
      "grade/elem3": "/study/history/grade/elem3/",
      "grade/elem4": "/study/history/grade/elem4/",
      "grade/elem5": "/study/history/grade/elem5/",
      "grade/elem6": "/study/history/grade/elem6/",
      "grade/pre-mid1": "/study/history/grade/pre-mid1/",
      "grade/mid1": "/study/history/grade/mid1/",
      "grade/mid2": "/study/history/grade/mid2/",
      "grade/mid3": "/study/history/grade/mid3/",
      "grade/pre-high1": "/study/history/grade/pre-high1/",
      "grade/high1": "/study/history/grade/high1/",
      "grade/high2": "/study/history/grade/high2/",
      "grade/high3": "/study/history/grade/high3/",
      "exam/naesin": "/study/history/exam/naesin/",
      "exam/timeline": "/study/history/exam/timeline/",
      "exam/material": "/study/history/exam/material/",
      "exam/past": "/study/history/exam/past/",
      "exam/mock": "/study/history/exam/mock/",
      "exam/suneung": "/study/history/exam/suneung/",
      "cert/overview": "/study/history/cert/overview/",
      "cert/basic": "/study/history/cert/basic/",
      "cert/intermediate": "/study/history/cert/intermediate/",
      "cert/timeline": "/study/history/cert/timeline/",
      "cert/material": "/study/history/cert/material/",
      "cert/strategy": "/study/history/cert/strategy/",
      "period/prehistoric": "/study/history/period/prehistoric/",
      "period/gojoseon": "/study/history/period/gojoseon/",
      "period/samguk": "/study/history/period/samguk/",
      "period/nambukguk": "/study/history/period/nambukguk/",
      "period/goryeo": "/study/history/period/goryeo/",
      "period/joseon": "/study/history/period/joseon/",
      "period/opening": "/study/history/period/opening/",
      "period/colonial": "/study/history/period/colonial/",
      "period/modern": "/study/history/period/modern/",
      "habit/timing": "/study/history/habit/timing/",
      "habit/notes": "/study/history/habit/notes/",
      "habit/self": "/study/history/habit/self/",
      "habit/routine": "/study/history/habit/routine/",
      "habit/slump": "/study/history/habit/slump/",
      "perform/descriptive": "/study/history/perform/descriptive/",
      "perform/assessment": "/study/history/perform/assessment/",
    },
    "social": {
      "grade/elem1": "/study/social/grade/elem1/",
      "grade/elem2": "/study/social/grade/elem2/",
      "grade/elem3": "/study/social/grade/elem3/",
      "grade/elem4": "/study/social/grade/elem4/",
      "grade/elem5": "/study/social/grade/elem5/",
      "grade/elem6": "/study/social/grade/elem6/",
      "grade/pre-mid1": "/study/social/grade/pre-mid1/",
      "grade/mid1": "/study/social/grade/mid1/",
      "grade/mid2": "/study/social/grade/mid2/",
      "grade/mid3": "/study/social/grade/mid3/",
      "grade/pre-high1": "/study/social/grade/pre-high1/",
      "grade/high1": "/study/social/grade/high1/",
      "grade/high2": "/study/social/grade/high2/",
      "grade/high3": "/study/social/grade/high3/",
      "exam/naesin": "/study/social/exam/naesin/",
      "exam/graph": "/study/social/exam/graph/",
      "exam/case": "/study/social/exam/case/",
      "exam/past": "/study/social/exam/past/",
      "exam/mock": "/study/social/exam/mock/",
      "exam/suneung": "/study/social/exam/suneung/",
      "habit/timing": "/study/social/habit/timing/",
      "habit/notes": "/study/social/habit/notes/",
      "habit/self": "/study/social/habit/self/",
      "habit/routine": "/study/social/habit/routine/",
      "habit/slump": "/study/social/habit/slump/",
      "perform/descriptive": "/study/social/perform/descriptive/",
      "perform/assessment": "/study/social/perform/assessment/",
      "perform/debate": "/study/social/perform/debate/",
      "society/theory": "/study/social/society/theory/",
      "society/culture": "/study/social/society/culture/",
      "society/change": "/study/social/society/change/",
      "society/issues": "/study/social/society/issues/",
      "society/practice": "/study/social/society/practice/",
      "ethics/thought": "/study/social/ethics/thought/",
      "ethics/modern": "/study/social/ethics/modern/",
      "ethics/bioethics": "/study/social/ethics/bioethics/",
      "ethics/environmental": "/study/social/ethics/environmental/",
      "ethics/practice": "/study/social/ethics/practice/",
    },
  };
  const readyMap = SUBJECT_PAGE_READY[subjectKey] || {};

  let categoriesHtml = "";
  for (const cat of data.categories) {
    const newBadge = cat.isNew ? `<span class="cat-new">NEW</span>` : "";
    const highlight = cat.highlight ? " cat-highlight" : "";

    // 영어 과목 허브 준비중 항목 → 회화 콘텐츠 페이지 크로스링크 맵
    // 정밀 매핑: 콘텐츠 있는 항목은 콘텐츠 페이지로 직접 연결, 없는 항목은 메인 허브로
    const ENGLISH_CROSS_LINKS = {
      // 회화 (Speaking) — 콘텐츠 매칭
      "speaking/basic":        "/language/english/skill/pronunciation/", // 기초 회화 → 발음부터
      "speaking/daily":        "/language/english/skill/speaking/",      // 일상 회화 → 말하기 유창성
      "speaking/pronunciation":"/language/english/skill/pronunciation/", // 발음 교정 → 발음 페이지
      "speaking/fluency":      "/language/english/skill/speaking/",      // 유창성 → 말하기 유창성
      "speaking/roleplay":     "/language/english/skill/speaking/",      // 롤플레이 → 말하기 (롤플레이 다룸)
      // 듣기 (Listening) — 콘텐츠 매칭
      "listening/basic":       "/language/english/skill/listening/",     // 기초 듣기 → 듣기 훈련
      "listening/dictation":   "/language/english/skill/listening/",     // 받아쓰기 → 듣기 훈련
      "listening/pronunciation":"/language/english/skill/pronunciation/",// 발음·연음 → 발음 교정
      "listening/accent":      "/language/english/skill/listening/",     // 다양한 억양 → 듣기 훈련
      "listening/test":        "/language/english/",                     // 시험 듣기 → 메인 허브 (콘텐츠 X)
      // 작문 (Writing) — 콘텐츠 미작성, 메인 허브로
      "writing/essay":         "/language/english/",                     // 에세이 → 메인 허브 (purpose/essay 미작성)
      "writing/letter":        "/language/english/",                     // 편지·이메일 → 메인 허브 (biz/email 미작성)
      "writing/intro":         "/language/english/",                     // 자기소개서 → 메인 허브
      // 공인영어시험 (Cert) — 콘텐츠 직접 매칭
      "cert/toeic":            "/language/english/cert/toeic/",          // TOEIC → 토익 페이지
      "cert/toefl":            "/language/english/cert/toefl/",          // TOEFL → 토플 페이지
      "cert/ielts":            "/language/english/cert/ielts/",          // IELTS → 아이엘츠 페이지
      "cert/opic":             "/language/english/cert/opic/",           // OPIc → 오픽 페이지
      "cert/toeic-speaking":   "/language/english/cert/toeic/",          // 토익 스피킹 → 토익 페이지 (가장 가까움)
      "cert/comparison":       "/language/english/",                     // 공인시험 비교 → 메인 허브 (콘텐츠 X)
    };

    let itemsHtml = "";
    for (const [slug, label] of cat.items) {
      const readyKey = `${cat.key}/${slug}`;
      const href = readyMap[readyKey];
      if (href) {
        itemsHtml += `<a href="${href}" class="cat-item"><span>${label}</span><span class="cat-arrow">→</span></a>`;
      } else if (subjectKey === "english" && ENGLISH_CROSS_LINKS[readyKey]) {
        itemsHtml += `<a href="${ENGLISH_CROSS_LINKS[readyKey]}" class="cat-item cat-item-cross"><span>${label}</span><span class="cat-arrow" style="font-size:.65rem;color:#3370c4">회화↗</span></a>`;
      } else {
        itemsHtml += `<span class="cat-item cat-item-soon"><span>${label}</span><span class="nav-badge-soon">준비중</span></span>`;
      }
    }

    categoriesHtml += `
    <div class="cat-card${highlight}">
      <div class="cat-head">
        <div class="cat-title">${cat.name}${newBadge}</div>
        <div class="cat-count">${cat.count}개</div>
      </div>
      <div class="cat-grid">${itemsHtml}</div>
    </div>`;
  }

  // 다른 과목 공부법 카드 (현재 과목 제외)
  const ALL_SUBJECTS = [
    ["korean","📖","국어"],
    ["english","🌍","영어"],
    ["math","📐","수학"],
    ["science","🔬","과학"],
    ["social","🗺️","사회"],
    ["history","📜","한국사"],
  ];
  let otherSubjectsHtml = "";
  for (const [key, icon, name] of ALL_SUBJECTS) {
    if (key === subjectKey) continue; // 현재 과목 제외
    if (STUDY_READY[key]) {
      otherSubjectsHtml += `<a href="/study/${key}/" class="other-subj-card"><div class="other-subj-icon">${icon}</div><div class="other-subj-name">${name}</div></a>`;
    } else {
      otherSubjectsHtml += `<span class="other-subj-card other-subj-card-soon"><div class="other-subj-icon">${icon}</div><div class="other-subj-name">${name}<span class="nav-badge-soon" style="margin-left:3px">준비중</span></div></span>`;
    }
  }
  // 코딩 카드 추가
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
    .sec-label{display:inline-block;font-size:.72rem;font-weight:700;color:#7b2fa8;background:#f5eefe;padding:4px 12px;border-radius:20px;margin-bottom:8px}
    .sec-grade-roadmap{background:#fdfafe}
    .sec-title{font-size:clamp(1rem,3vw,1.4rem);font-weight:800;color:#370558;line-height:1.45;margin-bottom:8px}
    .sec-body{font-size:.88rem;color:#444;line-height:1.85;max-width:800px}

    .hero{background:linear-gradient(135deg,#370558,#510580,#7b2fa8);color:white;padding:36px 20px;text-align:center}
    .hero-badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);border-radius:20px;font-size:.78rem;font-weight:700;padding:4px 14px;margin-bottom:12px}
    .hero h1{font-size:clamp(1.5rem,4.5vw,2.4rem);font-weight:800;line-height:1.4;margin-bottom:6px;color:white}
    .hero-stat{font-size:.85rem;opacity:.85}

    /* 과목 과외 안내 */
    .intro-cta-section{padding:24px 16px;border-bottom:1px solid #f0f0f0}
    .intro-cta-section .sec-body{max-width:none}
    .trust-badges{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:14px 0}
    .trust-badge{padding:12px 10px;border:1px solid #e8d6f5;border-radius:8px;text-align:center;background:#fafafa}
    .trust-badge-title{font-size:.85rem;font-weight:800;color:#370558;margin-bottom:3px}
    .trust-badge-desc{font-size:.72rem;color:#666;line-height:1.5}
    .process-label{font-size:.85rem;font-weight:700;color:#370558;margin-bottom:8px;margin-top:14px}
    .process-list{display:grid;gap:6px}
    .process-item{display:flex;gap:10px;padding:10px 12px;border:1px solid #f0e6fc;border-radius:6px;align-items:flex-start}
    .process-num{width:22px;height:22px;border-radius:50%;background:#510580;color:white;font-size:.72rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
    .process-title{font-size:.85rem;font-weight:700;color:#370558}
    .process-desc{font-size:.75rem;color:#666;line-height:1.6}

    .breadcrumb{padding:14px 16px;font-size:.78rem;color:#888;background:#fafafa;border-bottom:1px solid #f0f0f0}
    .breadcrumb a{color:#7b2fa8;text-decoration:none}
    .breadcrumb a:hover{text-decoration:underline}

    .cat-card{padding:20px 16px;border-bottom:1px solid #f0f0f0}
    .cat-card.cat-highlight{background:#fdfafe;border-left:3px solid #510580}
    .cat-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
    .cat-title{font-size:1.05rem;font-weight:800;color:#370558;display:flex;align-items:center;gap:8px}
    .cat-new{font-size:.62rem;font-weight:700;color:#e8439a;background:#fde8f1;padding:2px 7px;border-radius:10px}
    .cat-count{font-size:.78rem;color:#7b2fa8;font-weight:700;background:#f5eefe;padding:3px 10px;border-radius:12px}
    .cat-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px}
    .cat-item{display:flex;align-items:center;justify-content:space-between;padding:9px 12px;border:1px solid #f0e6fc;border-radius:6px;background:white;font-size:.82rem;color:#370558;font-weight:700;text-decoration:none;transition:all .12s}
    .cat-item:hover{border-color:#510580;background:#faf5ff}
    .cat-arrow{font-size:.95rem;color:#e8439a}
    .cat-item-soon{cursor:not-allowed;opacity:.55;background:#fafafa}
    .cat-item-soon:hover{border-color:#f0e6fc;background:#fafafa}
    .cat-item-cross{background:#f0f6ff;border-color:#c8dff8}
    .cat-item-cross:hover{background:#e0eeff;border-color:#3370c4}
    .nav-badge-soon{display:inline-block;font-size:.6rem;color:#999;background:#e8e8e8;padding:1px 6px;border-radius:8px;margin-left:3px}

    /* 다른 과목 공부법 */
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
      .intro-cta-section{padding:36px 40px}
      .cat-card{padding:30px 40px}
      .cat-title{font-size:1.2rem}
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
      .trust-badges{grid-template-columns:repeat(4,1fr)}
      .process-list{grid-template-columns:repeat(4,1fr);gap:12px}
      .process-title{font-size:.92rem}
      .process-desc{font-size:.78rem}
      .cta-sec{padding:60px 40px}
      .cta-btns{gap:10px}
      .cta-phone,.cta-kakao,.cta-form{font-size:.95rem;padding:13px 26px;gap:6px}
    }

    footer{background:#370558;color:rgba(255,255,255,.45);text-align:center;padding:20px;font-size:.75rem;line-height:1.8}
    footer p{color:rgba(255,255,255,.45);margin:2px 0}
    footer a{color:rgba(255,255,255,.6);text-decoration:none}
  </style>
</head>
<body>
${HEADER_HTML}

<div class="hero">
  <div class="hero-badge">${data.icon} ${data.name} 공부법</div>
  <h1>${data.name} 공부법 가이드</h1>
  <div class="hero-stat">${data.categories.length}개 영역 · ${totalPages}개 가이드</div>
</div>

<div class="breadcrumb">
  <a href="/study/">과목별 공부법</a> &gt; ${data.name}
</div>

<div class="wrap">

  <div class="intro-cta-section">
    <div class="sec-label">📖 ${data.name} 과외 안내</div>
    <div class="sec-title">${data.introTitle}</div>
    <div class="sec-body">${data.introBody}</div>
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

  ${categoriesHtml}

  <div class="sec">
    <div class="sec-title">📚 다른 과목 공부법</div>
    <div class="other-grid">${otherSubjectsHtml}</div>
    <a href="/self-study/" class="all-study-banner"><div class="all-study-row"><div class="all-study-icon">📋</div><div class="all-study-text"><div class="all-study-title">전과목 공부법</div><div class="all-study-desc">자기주도학습 · 플랜 관리 · 공부 습관</div></div><div class="all-study-arrow">→</div></div></a>
  </div>

</div>

<div class="cta-sec">
  <h2>${data.name}, 막히는 영역부터 빠르게 잡으세요</h2>
  <div class="cta-sub">진단 → 약점 보강 → 1등급. 무료 상담으로 시작하세요.</div>
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

// ── 과목 준비중 페이지 ────────────────────────────────────────
export function buildStudyComingSoonPage(subjectName, subjectKey) {
  const SUBJECT_ICONS = { korean:"📖", english:"🌍", math:"📐", science:"🔬", social:"🗺️", history:"📜" };
  const icon = SUBJECT_ICONS[subjectKey] || "📚";
  const titleTag = `${subjectName} 공부법 — 준비중 | ${SITE_NAME}`;
  const description = `${subjectName} 공부법 페이지를 준비 중입니다. 곧 만나보실 수 있습니다.`;

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titleTag}</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="noindex">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;800&display=swap" rel="stylesheet">
  <style>
    ${HEADER_CSS}
    ${FLOAT_CSS}
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Noto Sans KR',sans-serif;background:#fff;color:#1a0a24;line-height:1.7}
    .soon-wrap{max-width:600px;margin:0 auto;padding:60px 24px;text-align:center}
    .soon-icon{font-size:4rem;margin-bottom:20px}
    .soon-badge{display:inline-block;font-size:.78rem;font-weight:700;color:#7b2fa8;background:#f5eefe;padding:5px 14px;border-radius:20px;margin-bottom:14px}
    .soon-title{font-size:clamp(1.4rem,4vw,2rem);font-weight:800;color:#370558;margin-bottom:12px;line-height:1.4}
    .soon-desc{font-size:.95rem;color:#666;margin-bottom:32px;line-height:1.8}
    .soon-card{background:#faf5ff;border:1px solid #e8d6f5;border-radius:14px;padding:24px 20px;margin-bottom:28px;text-align:left}
    .soon-card-title{font-size:.95rem;font-weight:800;color:#370558;margin-bottom:10px}
    .soon-card-text{font-size:.86rem;color:#555;line-height:1.8}
    .soon-actions{display:flex;flex-direction:column;gap:8px;align-items:stretch;max-width:340px;margin:0 auto}
    .soon-btn{padding:13px 20px;border-radius:50px;font-weight:700;font-size:.92rem;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:6px}
    .soon-btn-primary{background:linear-gradient(135deg,#e8439a,#ff6fc1);color:white}
    .soon-btn-secondary{background:white;color:#510580;border:1.5px solid #e8d6f5}
    .soon-back{margin-top:18px;font-size:.85rem;color:#888;text-decoration:none}
    footer{background:#370558;color:rgba(255,255,255,.45);text-align:center;padding:20px;font-size:.75rem;line-height:1.8;margin-top:40px}
    footer p{color:rgba(255,255,255,.45);margin:2px 0}
    footer a{color:rgba(255,255,255,.6);text-decoration:none}
  </style>
</head>
<body>
${HEADER_HTML}
<div class="soon-wrap">
  <div class="soon-icon">${icon}</div>
  <div class="soon-badge">⏳ 준비중</div>
  <h1 class="soon-title">${subjectName} 공부법<br>페이지를 준비하고 있습니다</h1>
  <p class="soon-desc">학년별·영역별 ${subjectName} 학습 가이드를<br>꼼꼼하게 만들어 곧 공개해 드릴게요.</p>

  <div class="soon-card">
    <div class="soon-card-title">📌 먼저 만나보고 싶다면?</div>
    <div class="soon-card-text">제나쌤 스터디핏의 ${subjectName} 1:1 맞춤 과외로 학생 수준에 딱 맞는 학습 전략을 받아보세요. 무료 상담을 통해 ${subjectName} 학습 방향을 함께 잡아드립니다.</div>
  </div>

  <div class="soon-actions">
    <a href="${FORM_URL}" target="_blank" class="soon-btn soon-btn-primary">📝 ${subjectName} 무료 상담 신청</a>
    <a href="${KAKAO_URL}" target="_blank" class="soon-btn soon-btn-secondary">💬 카카오톡 상담</a>
  </div>

  <a href="/study/" class="soon-back">← 과목별 공부법 메인으로</a>
</div>

${FLOAT_HTML}

${FOOTER_HTML}

</body>
</html>`;
}
