// ================================================================
// builders/habit.js — 카테고리 페이지 공통 빌더 (범용)
// 변경 빈도: 낮음 (페이지 데이터는 data/subjects/*.js에서 수정, 이 파일은 렌더링 로직)
// 의존:
//   - config.js (SITE_NAME, SITE_DOMAIN, FORM_URL, KAKAO_URL, PHONE)
//   - layout.js (HEADER_CSS, HEADER_HTML, FOOTER_HTML, FLOAT_CSS, FLOAT_HTML)
//   - utils.js (getPageDates, buildBreadcrumbJsonLd, buildSocialMeta, buildShareButtons)
//   - data/subjects/_meta.js (SUBJECT_CATEGORY_META)
//   - builders/pages.js (build404Page)
//
// ⚠️ 함수명은 "Korean"이지만 실제로는 6과목 모두의 카테고리 페이지를 처리하는 범용 빌더
//   - 호출 예: buildKoreanHabitPage("timing", "habit", "english")
//   - 호출 예: buildKoreanHabitPage("naesin", "exam", "math")
//   - 호출 예: buildKoreanHabitPage("guide", "grammar", "korean")
//   - 회화 페이지도 이 함수로 처리: buildKoreanHabitPage("toeic", "cert", "english_lang")
//
// 함수:
//   - buildKoreanHabitPage(itemKey, categoryKey, subjectKey)
//     → SUBJECT_CATEGORY_META에서 카테고리 데이터 조회 → 표준 템플릿으로 렌더링
//     → phases / areas / tiers / mistakes / checklist 5개 섹션 구조
// ================================================================

import { SITE_NAME, SITE_DOMAIN, FORM_URL, KAKAO_URL, PHONE } from '../config.js';
import { HEADER_CSS, HEADER_HTML, FOOTER_HTML, FLOAT_CSS, FLOAT_HTML } from '../layout.js';
import { getPageDates, buildBreadcrumbJsonLd, buildSocialMeta, buildShareButtons } from '../utils.js';
import { SUBJECT_CATEGORY_META } from '../data/subjects/_meta.js';
import { build404Page } from './pages.js';


// ── 카테고리 페이지 공통 빌더 (모든 과목·카테고리 처리) ───────
export function buildKoreanHabitPage(habitKey, categoryKey = "habit", subjectKey = "korean") {
  const subjectMeta = SUBJECT_CATEGORY_META[subjectKey];
  if (!subjectMeta) return build404Page();
  const meta = subjectMeta[categoryKey];
  if (!meta) return build404Page();
  const dataSource = meta.data();
  const data = dataSource[habitKey];
  if (!data) return build404Page();

  // 경로 prefix 분기 (제2외국어 회화는 /language/, 그 외는 /study/)
  const pathPrefix = subjectMeta.pathPrefix || `/study/${subjectKey}`;
  const canonical = `${SITE_DOMAIN}${pathPrefix}/${categoryKey}/${habitKey}/`;
  const breadcrumbCategory = meta.label;
  const subjectName = subjectMeta.name;
  // breadcrumb 분기
  const bcHubLabel = subjectMeta.breadcrumbHubLabel || "과목별 공부법";
  const bcHubUrl = subjectMeta.breadcrumbHubUrl || "/study/";
  const bcSubjectLabel = subjectMeta.breadcrumbSubjectLabel || subjectName;
  const bcSubjectUrl = subjectMeta.breadcrumbSubjectUrl || `/study/${subjectKey}/`;

  // 페이지별 의사 갱신일 (SEO 최신성)
  const slugForDate = `${subjectKey}-${categoryKey}-${habitKey}`;
  const dates = getPageDates(slugForDate);

  // HTML 빌드
  let phasesHtml = "";
  for (const [step, name, desc] of data.phases) {
    phasesHtml += `<div class="phase-card"><div class="phase-period">${step}</div><div class="phase-name">${name}</div><div class="phase-desc">${desc}</div></div>`;
  }

  let areasHtml = "";
  for (const a of data.areas) {
    areasHtml += `<div class="area-item"><div class="area-name">${a.name}</div><div class="area-body">${a.body}</div></div>`;
  }

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
    relatedHtml += `<a href="${r.href}" class="related-item"><div class="related-icon">📚</div><div class="related-label">${r.label}</div><div class="related-arrow">→</div></a>`;
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
  <title>${data.tag} | ${SITE_NAME}</title>
  <meta name="description" content="${data.tag} 가이드. ${data.intro.body.substring(0, 100)}... 제나쌤 스터디핏 1:1 맞춤 과외.">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${data.tag} | ${SITE_NAME}">
  <meta property="og:description" content="${data.tag} 가이드.">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${SITE_DOMAIN}/images/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta property="article:published_time" content="${dates.publishedISO}">
  <meta property="article:modified_time" content="${dates.modifiedISO}">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${data.tag} | ${SITE_NAME}",
    "datePublished": "${dates.publishedISO}",
    "dateModified": "${dates.modifiedISO}",
    "author": {"@type": "Person", "name": "이수진"},
    "publisher": {"@type": "Organization", "name": "${SITE_NAME}", "url": "${SITE_DOMAIN}"},
    "mainEntityOfPage": {"@type": "WebPage", "@id": "${canonical}"}
  }
  </script>
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
    .phase-note{margin-top:10px;padding:10px 12px;background:#faf5ff;border:1px solid #f0e6fc;border-radius:6px;font-size:.76rem;color:#7b2fa8;line-height:1.6;word-break:keep-all}

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
      .phase-note{font-size:.8rem;padding:12px 14px;margin-top:12px}
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

<div class="hero">
  <div class="hero-badge">${data.badge}</div>
  <h1>${data.h1}</h1>
  <div class="hero-sub">${data.sub}</div>
</div>

<div class="breadcrumb">
  <a href="${bcHubUrl}">${bcHubLabel}</a> &gt; <a href="${bcSubjectUrl}">${bcSubjectLabel}</a> &gt; ${breadcrumbCategory} &gt; ${data.breadcrumb}
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
    <div class="sec-label">🎯 ${data.phaseTitle}</div>
    <div class="sec-title">${data.phaseSub}</div>
    <div class="phase-grid">${phasesHtml}</div>
    ${data.phaseNote ? `<div class="phase-note">${data.phaseNote}</div>` : ""}
  </div>

  <div class="sec">
    <div class="sec-label">📖 ${data.areaTitle}</div>
    <div class="sec-title">핵심 영역별 가이드</div>
    <div>${areasHtml}</div>
  </div>

  <div class="sec">
    <div class="sec-label-pink">🌱 ${data.tierTitle}</div>
    <div class="sec-title">상황별 맞춤 처방</div>
    <div>${tiersHtml}</div>
  </div>

  <div class="sec">
    <div class="sec-label-red">⚠️ 자주 하는 실수</div>
    <div class="sec-title">가장 흔한 함정 TOP 3</div>
    <div>${mistakesHtml}</div>
  </div>

  <div class="sec">
    <div class="sec-label">📅 ${data.checklistTitle}</div>
    <div class="sec-title">${data.checklistSub}</div>
    <div>${checklistHtml}</div>
  </div>

  <div class="sec">
    <div class="sec-label">❓ 궁금한 점</div>
    <div class="sec-title">자주 묻는 질문</div>
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
