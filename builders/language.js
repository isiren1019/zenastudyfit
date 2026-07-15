// ================================================================
// builders/language.js — 회화/코딩/자기주도학습 페이지 빌더
// 변경 빈도: 중간 (메모리 기록 다음 작업: 코딩 과목 페이지 확장)
// 의존:
//   - config.js (SITE_NAME, SITE_DOMAIN, FORM_URL, KAKAO_URL, PHONE, CODING_FORM_URL)
//   - layout.js (HEADER_CSS, HEADER_HTML, FOOTER_HTML, FLOAT_CSS, FLOAT_HTML)
//   - utils.js (buildShareButtons)
//
// ⚠️ 회화 데이터는 함수 내부에 인라인 LANG_META로 정의되어 있습니다
//   - 외부 SUBJECT_CATEGORY_META를 import하지 않음 (각 언어별 디자인 톤이 달라서 인라인 유지)
//   - 영어/일본어/중국어 메타가 모두 같은 LANG_META 객체 안에 있음
//   - 새 회화 카테고리 추가 시 이 파일의 LANG_META를 수정 (Phase 4 중국어 작업 영역)
//
// 함수 (3개):
//   - buildLanguagePage(lang)    — 회화 메인 (lang: 'english'/'japanese'/'chinese')
//   - buildCodingPage()           — 코딩 페이지 (/coding/) — 자바스크립트·파이썬
//   - buildSelfStudyPage()        — 자기주도학습 코칭 (/self-study/)
// ================================================================

import { SITE_NAME, SITE_DOMAIN, FORM_URL, KAKAO_URL, PHONE, CODING_FORM_URL } from '../config.js';
import { HEADER_CSS, HEADER_HTML, FOOTER_HTML, FLOAT_CSS, FLOAT_HTML } from '../layout.js';
import { buildShareButtons } from '../utils.js';
import { LANGUAGE_HUB_CATEGORIES, LANGUAGE_PAGE_READY, CODING_HUB_CATEGORIES, CODING_PAGE_READY } from '../data/subjects/_meta.js';


// ── 회화 메인 페이지 (영어/일본어/중국어) ─────────────────────
export function buildLanguagePage(lang) {
  const LANG_META = {
    english: {
      title: "영어",
      emoji: "🇺🇸",
      badge: "English Speaking",
      color1: "#1e4d8c", color2: "#3370c4", colorLight: "#e8f0ff", colorMid: "#3370c4",
      heroTitle: "영어 회화 과외<br>원어민처럼 말하는 법, 1:1로 배워요",
      heroDesc: "기초 생활 영어부터 비즈니스 영어·수능 영어 말하기까지. 발음·표현·유창성을 한 번에 잡는 맞춤 회화 수업.",
      intro: "영어 회화는 문법책이 아닌 실제 대화로 늘어요. 한국에서 영어 말하기가 어려운 이유는 연습 기회가 없어서예요. 1:1 영어 회화 과외에서는 학생의 현재 수준과 목표에 맞는 주제로 매 수업 실전 회화를 연습해요. 발음 교정·표현 확장·자연스러운 대화 흐름까지 체계적으로 잡아줘요. 기초 생활 영어부터 비즈니스 영어, 수능 말하기 수행평가, 여행 영어까지 목적에 맞는 커리큘럼으로 단기간에 실력 향상을 경험할 수 있어요.",
      target: ["상황별 회화", "비즈니스 회화", "인증시험 대비", "영어 맞춤 수업"],
      targetDesc: ["왕초보부터 고급까지 레벨별 맞춤 수업.", "취업·이직 준비, 프레젠테이션, 실무 영어.", "토익·토플·아이엘츠·오픽 인증시험 대비.", "문법·에세이·국제학교 맞춤 특화 수업."],
      courses: [
        { icon: "🗣️", level: "기초", title: "기초 생활 영어 회화", desc: "일상에서 바로 쓸 수 있는 기초 표현 마스터. 자기소개·날씨·쇼핑·식당 영어부터.", tags: ["기초 발음", "생활 표현", "자기소개"] },
        { icon: "📞", level: "중급", title: "중급 대화 영어 회화", desc: "원어민과 자연스러운 대화를 위한 표현 확장. 감정 표현·의견 말하기·이유 설명.", tags: ["의견 표현", "감정 영어", "대화 흐름"] },
        { icon: "💼", level: "고급", title: "비즈니스 영어 회화", desc: "이메일 작성·미팅·프레젠테이션·협상까지 비즈니스 현장 영어.", tags: ["이메일", "미팅 영어", "프레젠테이션"] },
        { icon: "🎓", level: "수험", title: "수능·수행평가 말하기", desc: "영어 수행평가 스피킹·내신 말하기 대비. 발음 교정 + 시험 형식 완벽 대비.", tags: ["수행평가", "내신 말하기", "발음 교정"] },
        { icon: "✈️", level: "여행", title: "여행 영어 회화", desc: "공항·호텔·레스토랑·관광지에서 당황하지 않는 실전 여행 영어.", tags: ["여행 표현", "공항", "호텔 영어"] },
        { icon: "🎤", level: "발음", title: "발음 교정 집중 클래스", desc: "한국인이 자주 틀리는 발음 집중 교정. 자음·모음·강세·억양 체계적으로.", tags: ["발음 교정", "강세", "억양"] },
      ],
      reasons: ["원어민 발음 목표보다 명확한 전달력 우선", "매 수업 실전 대화 연습 — 이론 최소화", "학생 관심 주제로 회화 연습 — 흥미 유지", "수행평가·면접·여행 목적별 맞춤 수업"],
      cats: [
        { icon:"🎯", key:"skill",   title:"영역별 학습",   desc:"발음·문법·말하기·듣기·독해", tags:["발음","문법","말하기","듣기","독해"], count:5 },
        { icon:"📊", key:"level",   title:"수준별 과정",   desc:"입문·초급·중급·고급",         tags:["입문","초급","중급","고급"], count:4 },
        { icon:"🏆", key:"cert",    title:"자격증 대비",   desc:"토익·토플·오픽·아이엘츠",     tags:["토익","토플","오픽","아이엘츠"], count:4 },
        { icon:"💼", key:"biz",     title:"비즈니스 영어", desc:"이메일·미팅·협상·프레젠테이션", tags:["이메일","미팅","협상","프레젠테이션"], count:4 },
        { icon:"✈️", key:"purpose", title:"목적별 수업",   desc:"여행·면접·취업·에세이",        tags:["여행","면접","취업","에세이"], count:4 },
        { icon:"🎓", key:"school",  title:"내신/진학/유학", desc:"내신·듣기평가·수행평가·외고·유학", tags:["내신","듣기평가","수행평가","국제학교","외고","유학"], count:6 },
      ],
      cta: "영어 회화 무료 체험 신청",
      url: "/language/english/",
      canonical: "language/english",
    },
    japanese: {
      title: "일본어",
      emoji: "🇯🇵",
      badge: "Japanese Speaking",
      color1: "#1a3a2a", color2: "#2d6a4a", colorLight: "#d1fae5", colorMid: "#2d6a4a",
      heroTitle: "일본어 회화 과외<br>히라가나부터 자연스러운 일본어까지",
      heroDesc: "입문 히라가나·가타카나부터 JLPT 대비·여행 일본어·비즈니스 일본어까지. 1:1 맞춤 일본어 회화 수업.",
      intro: "일본어는 한국어와 어순이 비슷해서 배우기 가장 유리한 외국어예요. 발음도 규칙적이라 단기간에 회화 기초를 잡을 수 있어요. 1:1 일본어 회화 과외에서는 히라가나 완성 → 기초 회화 → JLPT 목표 레벨까지 체계적으로 학습해요. 드라마·애니메이션 표현부터 여행 일본어, 비즈니스 일본어까지 목적에 맞게 수업을 구성해요. 존댓말(敬語)부터 자연스러운 구어체 표현까지 균형 있게 배울 수 있어요.",
      target: ["레벨별 맞춤 회화", "애니메이션 과정", "비즈니스·취미·여행", "인증시험 대비"],
      targetDesc: ["입문부터 고급 일본어 회화까지 레벨별 맞춤 수업.", "일본 애니메이션을 통한 흥미로운 일본어 수업.", "상황별 회원 맞춤 수업 — 비즈니스·취미·여행 가능.", "JPT·JLPT 체계적인 시험 준비 및 합격 전략."],
      courses: [
        { icon: "あ", level: "입문", title: "히라가나·가타카나 완성", desc: "일본어 문자 체계 완성. 히라가나·가타카나 읽기·쓰기 + 기초 인사 표현.", tags: ["히라가나", "가타카나", "기초 인사"] },
        { icon: "🗣️", level: "초급", title: "기초 일본어 회화", desc: "자기소개·쇼핑·식당·길 묻기 등 일상 기초 회화. 일본어 어순 완성.", tags: ["기초 회화", "일상 표현", "어순 이해"] },
        { icon: "📺", level: "중급", title: "중급 일본어 회화", desc: "드라마·애니메이션 표현 + 존댓말(敬語) 완성. 자연스러운 대화 흐름.", tags: ["존댓말", "드라마 일본어", "표현 확장"] },
        { icon: "📝", level: "자격증", title: "JLPT 대비 (N5~N1)", desc: "목표 레벨별 어휘·문법·독해·청해 체계적 준비. 합격 전략 맞춤 수업.", tags: ["JLPT", "N5~N1", "자격증"] },
        { icon: "✈️", level: "여행", title: "여행 일본어 회화", desc: "공항·신칸센·료칸·편의점·관광지에서 바로 쓰는 실전 여행 일본어.", tags: ["여행 일본어", "실전 표현", "공항·호텔"] },
        { icon: "💼", level: "비즈니스", title: "비즈니스 일본어", desc: "일본 기업 문화 이해 + 이메일·회의·전화 응대까지 비즈니스 일본어.", tags: ["비즈니스", "이메일", "경어"] },
      ],
      reasons: ["한국어와 어순이 같아 가장 빨리 배우는 외국어", "히라가나 2주 완성 — 빠른 시작 보장", "JLPT 레벨별 목표 달성 전략 제공", "K-콘텐츠·여행·취업 목적별 맞춤 커리큘럼"],
      cats: [
        { icon:"🎯", key:"skill",   title:"영역별 학습",    desc:"히라가나·한자·발음·회화·청해",  tags:["히라가나","한자","발음","회화","청해"], count:5 },
        { icon:"🏆", key:"cert",    title:"자격증 대비",    desc:"JLPT N1~N5, JPT",              tags:["N5","N4","N3","N2","N1","JPT"], count:5 },
        { icon:"📊", key:"level",   title:"수준별 과정",    desc:"입문·초급·중급·고급",          tags:["입문","초급","중급","고급"], count:4 },
        { icon:"✈️", key:"purpose", title:"목적별 수업",    desc:"여행·애니·J-POP·면접·자소서",   tags:["여행","애니","J-POP","면접","자소서"], count:5 },
        { icon:"💼", key:"biz",     title:"비즈니스 일본어", desc:"이메일·상담·경어(敬語) 집중",   tags:["이메일","상담","경어"], count:3 },
        { icon:"🎓", key:"school",  title:"내신/진학/유학", desc:"제2외국어 내신·수행평가·일본 유학", tags:["내신","수행평가","일본 유학"], count:3 },
      ],
      cta: "일본어 회화 무료 체험 신청",
      url: "/language/japanese/",
      canonical: "language/japanese",
    },
    chinese: {
      title: "중국어",
      emoji: "🇨🇳",
      badge: "Chinese Speaking",
      color1: "#5a0a0a", color2: "#a01818", colorLight: "#fee2e2", colorMid: "#a01818",
      heroTitle: "중국어 회화 과외<br>성조부터 자연스러운 중국어 회화까지",
      heroDesc: "병음·성조 기초부터 HSK 대비·여행 중국어·비즈니스 중국어까지. 1:1 맞춤 중국어 회화 수업.",
      intro: "중국어는 한자 문화권인 한국인에게 어휘 습득이 유리한 외국어예요. 성조가 처음엔 어렵지만 1:1 과외에서 집중 교정하면 빠르게 잡을 수 있어요. 병음 완성 → 기초 회화 → HSK 목표 레벨까지 단계별로 체계적으로 학습해요. 중국 드라마·뉴스 표현부터 여행 중국어, 비즈니스 중국어까지 목적에 맞게 커리큘럼을 구성해요. 중국어 특유의 문장 구조와 표현법을 실제 대화 속에서 자연스럽게 익힐 수 있어요.",
      target: ["수준별 회화", "상황별 회화", "비즈니스 회화", "인증시험 대비"],
      targetDesc: ["기초부터 고급까지 레벨별 맞춤 수업.", "여행·드라마·일상 성조 및 병음 마스터.", "업무·면접·프레젠테이션 실전 중국어.", "HSK·TCS·HSKK 체계적인 시험 준비 및 전략."],
      courses: [
        { icon: "拼", level: "입문", title: "병음·성조 완성", desc: "중국어의 핵심인 병음 읽기와 4성 발음 집중 교정. 기초 인사 표현 완성.", tags: ["병음", "성조", "발음 교정"] },
        { icon: "🗣️", level: "초급", title: "기초 중국어 회화", desc: "자기소개·쇼핑·식당·교통 등 일상 기초 회화. 중국어 어순 완성.", tags: ["기초 회화", "일상 표현", "어순"] },
        { icon: "📺", level: "중급", title: "중급 중국어 회화", desc: "드라마·뉴스 표현 + 자연스러운 대화 흐름. 표현력 확장.", tags: ["드라마 중국어", "표현 확장", "회화 유창성"] },
        { icon: "📝", level: "자격증", title: "HSK 대비 (1~6급)", desc: "목표 급수별 어휘·문법·독해·청해 체계적 준비. 합격 전략 맞춤 수업.", tags: ["HSK", "1~6급", "자격증"] },
        { icon: "✈️", level: "여행", title: "여행 중국어 회화", desc: "공항·호텔·시장·관광지에서 바로 쓰는 실전 여행 중국어.", tags: ["여행 중국어", "실전 표현", "공항·호텔"] },
        { icon: "💼", level: "비즈니스", title: "비즈니스 중국어", desc: "중국 비즈니스 문화 이해 + 이메일·회의·협상까지 비즈니스 중국어.", tags: ["비즈니스", "이메일", "협상 중국어"] },
      ],
      reasons: ["한자 어휘 기반으로 단어 습득이 빠름", "성조 발음 1:1 집중 교정 — 빠른 기초 완성", "HSK 급수별 목표 달성 전략 제공", "여행·취업·비즈니스 목적별 맞춤 커리큘럼"],
      cats: [
        { icon:"🎯", key:"skill",   title:"영역별 학습",    desc:"성조·병음·문법·회화·청해",      tags:["성조","병음","문법","회화","청해"], count:5 },
        { icon:"📊", key:"level",   title:"수준별 과정",    desc:"입문·초급·중급·고급",           tags:["입문","초급","중급","고급"], count:4 },
        { icon:"🏆", key:"cert",    title:"자격증 대비",    desc:"HSK 1~6·HSKK·TCS",             tags:["HSK1~2","HSK3~4","HSK5~6","HSKK","TCS"], count:5 },
        { icon:"💼", key:"biz",     title:"비즈니스 중국어", desc:"기업문화·실무·미팅·협상",        tags:["기업문화","실무","미팅","협상"], count:4 },
        { icon:"✈️", key:"purpose", title:"목적별 수업",    desc:"여행·면접·취업·드라마",          tags:["여행","면접","취업","드라마"], count:4 },
        { icon:"🎓", key:"school",  title:"내신/진학/유학", desc:"내신대비·수행평가·외고·유학",     tags:["내신대비","수행평가","외고","유학"], count:4 },
      ],
      cta: "중국어 회화 무료 체험 신청",
      url: "/language/chinese/",
      canonical: "language/chinese",
    },
  };

  const m = LANG_META[lang];
  if (!m) return buildNotFoundPage();

  const coursesHtml = m.courses.map((c,i) => `
    <div style="background:${m.colorLight};border:1px solid ${m.colorMid}22;border-radius:14px;padding:20px;display:flex;gap:16px;align-items:flex-start">
      <div style="width:44px;height:44px;border-radius:50%;background:${m.colorMid};color:white;font-size:1rem;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0">${c.icon}</div>
      <div style="flex:1">
        <div style="font-size:.68rem;font-weight:700;color:${m.colorMid};margin-bottom:3px">${c.level}</div>
        <div style="font-size:.95rem;font-weight:800;color:${m.color1};margin-bottom:6px">${c.title}</div>
        <div style="font-size:.82rem;color:#555;line-height:1.75;margin-bottom:10px">${c.desc}</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px">${c.tags.map(t=>`<span style="font-size:.7rem;background:white;color:${m.colorMid};padding:3px 10px;border-radius:20px;border:1px solid ${m.colorMid}44">${t}</span>`).join("")}</div>
      </div>
    </div>`).join("");

  const targetHtml = m.target.map((t,i) => `
    <div style="background:linear-gradient(135deg,${m.color1},${m.color2});border-radius:14px;padding:22px 16px;text-align:center">
      <div style="font-size:1rem;font-weight:800;color:white;margin-bottom:8px">${t}</div>
      <div style="font-size:.78rem;color:rgba(255,255,255,.8);line-height:1.6">${m.targetDesc[i]}</div>
    </div>`).join("");

  const reasonsHtml = m.reasons.map(r => `
    <div style="display:flex;align-items:flex-start;gap:12px;padding:14px 0;border-bottom:1px solid ${m.colorLight}">
      <div style="width:22px;height:22px;border-radius:50%;background:${m.colorMid};color:white;font-size:.7rem;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px">✓</div>
      <div style="font-size:.88rem;color:#333;line-height:1.65">${r}</div>
    </div>`).join("");

  // 카테고리 섹션 그리드 (각 카테고리 → 하위 페이지 카드들 직접 렌더)
  const langCategories = LANGUAGE_HUB_CATEGORIES[lang] || [];
  const langReadyMap = LANGUAGE_PAGE_READY[lang] || {};
  const totalLangPages = langCategories.reduce((sum, c) => sum + c.count, 0);

  const categoriesHtml = langCategories.map(cat => {
    const itemsHtml = cat.items.map(([slug, label]) => {
      const readyKey = `${cat.key}/${slug}`;
      const href = langReadyMap[readyKey];
      if (href) {
        return `<a href="${href}" class="lang-cat-item"><span class="lang-cat-label">${label}</span><span class="lang-cat-arrow">→</span></a>`;
      } else {
        return `<span class="lang-cat-item lang-cat-item-soon"><span class="lang-cat-label">${label}</span><span class="lang-cat-soon-badge">준비중</span></span>`;
      }
    }).join("");

    const highlightClass = cat.highlight ? " lang-cat-card-highlight" : "";
    const newBadge = cat.isNew ? `<span class="lang-cat-new">NEW</span>` : "";

    return `
    <div class="lang-cat-card${highlightClass}">
      <div class="lang-cat-head">
        <div class="lang-cat-title">${cat.name}${newBadge}</div>
        <div class="lang-cat-count">${cat.count}개</div>
      </div>
      <div class="lang-cat-grid">${itemsHtml}</div>
    </div>`;
  }).join("");


  const title = `${m.title} 과외 | 1:1 맞춤 ${m.title} 수업 | ${SITE_NAME}`;
  const desc = `${m.title} 기초부터 자격증까지. 1:1 맞춤 ${m.title} 수업으로 단기간에 실력을 올려요. 무료 체험 수업 신청 가능.`;
  const canonical = `${SITE_DOMAIN}/${m.canonical}/`;

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:image" content="${SITE_DOMAIN}/images/og-image.png">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;800&display=swap" rel="stylesheet">
  <style>
    ${HEADER_CSS}
    ${FLOAT_CSS}
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Noto Sans KR',sans-serif;background:#fff;color:#1a0a24;line-height:1.7}
    .wrap{max-width:860px;margin:0 auto;padding:0 20px}
    .sec{padding:48px 0}
    .sec-label{display:inline-block;font-size:.72rem;font-weight:700;color:${m.colorMid};background:${m.colorLight};padding:4px 12px;border-radius:20px;margin-bottom:10px}
    .sec-title{font-size:clamp(1.25rem,3vw,1.65rem);font-weight:800;color:#1a0a24;line-height:1.4;margin-bottom:8px}
    .sec-body{font-size:.88rem;color:#555;line-height:1.85}
    .hero{background:linear-gradient(140deg,${m.color1},${m.color2});color:white;padding:52px 24px;text-align:center}
    .hero-badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);border-radius:20px;font-size:.78rem;font-weight:700;padding:5px 16px;margin-bottom:14px}
    .hero h1{font-size:clamp(1.5rem,4vw,2.2rem);font-weight:800;line-height:1.45;margin-bottom:10px;color:white}
    .hero p{font-size:.92rem;opacity:.85;margin-bottom:28px;color:white}
    .hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
    .btn-w{background:white;color:${m.color1};padding:13px 28px;border-radius:50px;font-weight:700;font-size:.92rem;text-decoration:none}
    .btn-outline-w{background:transparent;color:white;padding:13px 28px;border-radius:50px;font-weight:700;font-size:.92rem;border:1.5px solid rgba(255,255,255,.5);text-decoration:none}
    .target-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
    .course-list{display:flex;flex-direction:column;gap:12px}
    /* 언어 회화 카테고리 섹션 그리드 */
    .lang-cat-card{background:white;border:1px solid #eee;border-radius:14px;padding:18px;margin-bottom:14px}
    .lang-cat-card-highlight{border-color:${m.colorMid};background:linear-gradient(135deg,${m.colorLight} 0%,white 60%)}
    .lang-cat-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid #f0f0f0}
    .lang-cat-title{font-size:1rem;font-weight:800;color:${m.color1};display:flex;align-items:center;gap:8px;word-break:keep-all}
    .lang-cat-new{display:inline-block;font-size:.62rem;font-weight:800;color:white;background:${m.colorMid};padding:2px 7px;border-radius:20px;letter-spacing:.05em}
    .lang-cat-count{font-size:.72rem;font-weight:700;color:${m.colorMid};background:${m.colorLight};padding:3px 10px;border-radius:20px;flex-shrink:0;white-space:nowrap}
    .lang-cat-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:6px}
    .lang-cat-item{display:flex;justify-content:space-between;align-items:center;padding:11px 13px;background:#fafafa;border:0.5px solid #eee;border-radius:8px;text-decoration:none;color:#222;transition:background .15s,border-color .15s}
    .lang-cat-item:hover{background:${m.colorLight};border-color:${m.colorMid}}
    .lang-cat-label{font-size:.85rem;font-weight:600;word-break:keep-all;line-height:1.4}
    .lang-cat-arrow{font-size:.78rem;color:${m.colorMid};font-weight:700;flex-shrink:0;margin-left:6px}
    .lang-cat-item-soon{background:#f5f5f5;color:#999;cursor:default}
    .lang-cat-item-soon:hover{background:#f5f5f5;border-color:#eee}
    .lang-cat-soon-badge{font-size:.65rem;font-weight:700;color:#999;background:white;padding:2px 8px;border-radius:20px;border:0.5px solid #ddd;flex-shrink:0;margin-left:6px}
    footer{background:#370558;color:rgba(255,255,255,.45);text-align:center;padding:24px;font-size:.78rem;line-height:1.8}
    @media(max-width:600px){.target-grid{grid-template-columns:1fr}.hero-btns{flex-direction:column;align-items:center}.lang-cat-grid{grid-template-columns:1fr}}
  </style>
</head>
<body>
${HEADER_HTML}
<div class="hero">
  <div class="wrap">
    <div class="hero-badge">${m.emoji} ${m.badge}</div>
    <h1>${m.heroTitle}</h1>
    <p>${m.heroDesc}</p>
    <div class="hero-btns">
      <a href="tel:${PHONE}" class="btn-w">📞 전화 상담</a>
      <a href="${FORM_URL}" target="_blank" class="btn-outline-w">📝 무료 체험 신청</a>
    </div>
  </div>
</div>
<div class="wrap">

  <div class="sec">
    <div class="sec-label">소개</div>
    <div class="sec-title">${m.title} 1:1 회화 수업</div>
    <div class="sec-body">${m.intro}</div>
  </div>

  <hr style="border:none;border-top:1px solid #f0e6fc">

  <div class="sec">
    <div class="sec-label">수업 대상</div>
    <div class="sec-title">누구에게 맞는 수업인가요?</div>
    <div class="target-grid" style="margin-top:16px">${targetHtml}</div>
  </div>

  <hr style="border:none;border-top:1px solid #f0e6fc">

  <div class="sec">
    <div class="sec-label">WHY CHOOSE US</div>
    <div class="sec-title">${m.title} 회화 수업의 특징</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:14px;margin-top:20px">
      <div style="background:${m.colorLight};border:1px solid ${m.colorMid}33;border-radius:14px;padding:22px 16px;text-align:center">
        <div style="width:52px;height:52px;border-radius:50%;background:${m.colorMid}22;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:1.5rem">📞</div>
        <div style="font-size:.9rem;font-weight:800;color:${m.color1};margin-bottom:6px">전화·화상 수업</div>
        <div style="font-size:.78rem;color:#555;line-height:1.6">이동 없이 어디서든 수업 가능. 짧은 시간도 효율적으로</div>
      </div>
      <div style="background:${m.colorLight};border:1px solid ${m.colorMid}33;border-radius:14px;padding:22px 16px;text-align:center">
        <div style="width:52px;height:52px;border-radius:50%;background:${m.colorMid}22;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:1.5rem">👩‍🏫</div>
        <div style="font-size:.9rem;font-weight:800;color:${m.color1};margin-bottom:6px">1:1 전담 강사</div>
        <div style="font-size:.78rem;color:#555;line-height:1.6">한 명의 전담 강사가 처음부터 끝까지 책임 지도</div>
      </div>
      <div style="background:${m.colorLight};border:1px solid ${m.colorMid}33;border-radius:14px;padding:22px 16px;text-align:center">
        <div style="width:52px;height:52px;border-radius:50%;background:${m.colorMid}22;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:1.5rem">📋</div>
        <div style="font-size:.9rem;font-weight:800;color:${m.color1};margin-bottom:6px">맞춤 커리큘럼</div>
        <div style="font-size:.78rem;color:#555;line-height:1.6">수준과 목표에 따라 완전히 개인화된 학습 계획</div>
      </div>
      <div style="background:${m.colorLight};border:1px solid ${m.colorMid}33;border-radius:14px;padding:22px 16px;text-align:center">
        <div style="width:52px;height:52px;border-radius:50%;background:${m.colorMid}22;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:1.5rem">🎁</div>
        <div style="font-size:.9rem;font-weight:800;color:${m.color1};margin-bottom:6px">무료 체험 1회</div>
        <div style="font-size:.78rem;color:#555;line-height:1.6">첫 수업은 무료로 체험 후 수강 여부 결정 가능</div>
      </div>
    </div>
  </div>

  <hr style="border:none;border-top:1px solid #f0e6fc">

  <div class="sec">
    <div class="sec-label">수업 커리큘럼</div>
    <div class="sec-title">${m.title} 수업 과정</div>
    <div style="font-size:.85rem;color:#777;margin-bottom:20px">목적과 수준에 따라 원하는 과정을 선택해요. 1:1 상담 후 최적 커리큘럼을 제안해드려요.</div>
    <div class="course-list">${coursesHtml}</div>
  </div>

  <div class="sec">
    <div class="sec-label">수업 가이드</div>
    <div class="sec-title">${m.title} 회화 — 6개 영역 ${totalLangPages}개 가이드</div>
    <div style="font-size:.85rem;color:#777;margin-bottom:20px">원하는 목적과 수준에 맞는 가이드를 골라보세요. 클릭하면 자세한 학습법으로 이동합니다.</div>
    ${categoriesHtml}
  </div>

  <hr style="border:none;border-top:1px solid #f0e6fc">

  <hr style="border:none;border-top:1px solid #f0e6fc">

  <div class="sec">
    <div class="sec-label">HOW IT WORKS</div>
    <div class="sec-title">수업 방식 &amp; 진행 순서</div>
    <div style="font-size:.88rem;color:#555;margin-bottom:28px">짧고 집중적인 수업으로 꾸준히 실력을 쌓아 드립니다.</div>
    <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:24px">
      <div style="background:${m.colorLight};border:2px solid ${m.colorMid};border-radius:16px;padding:24px 28px;text-align:center;min-width:130px">
        <div style="font-size:2.4rem;font-weight:800;color:${m.colorMid};line-height:1">20<span style="font-size:1.1rem">분</span></div>
        <div style="font-size:.78rem;color:#555;margin-top:6px">짧지만 팩트있는</div>
        <div style="display:inline-block;background:${m.colorMid};color:white;font-size:.7rem;font-weight:700;padding:3px 12px;border-radius:20px;margin-top:8px">주 2회 / 3회 / 5회</div>
      </div>
      <div style="background:${m.colorLight};border:2px solid ${m.colorMid};border-radius:16px;padding:24px 28px;text-align:center;min-width:130px">
        <div style="font-size:2.4rem;font-weight:800;color:${m.colorMid};line-height:1">30<span style="font-size:1.1rem">분</span></div>
        <div style="font-size:.78rem;color:#555;margin-top:6px">집중있게 확실한</div>
        <div style="display:inline-block;background:${m.colorMid};color:white;font-size:.7rem;font-weight:700;padding:3px 12px;border-radius:20px;margin-top:8px">주 2회 / 3회 / 5회</div>
      </div>
    </div>
    <div style="background:${m.colorLight};border:1.5px dashed ${m.colorMid};border-radius:14px;padding:16px 20px;text-align:center;margin-bottom:28px;font-size:.88rem;font-weight:700;color:${m.color1}">
      🎁 1회 무료 테스트! 상담 후 수강 여부를 결정하세요.
    </div>
    <div style="font-size:.82rem;font-weight:700;color:#555;text-align:center;margin-bottom:16px">상담 / 수업 진행 순서</div>
    <div style="display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:8px">
      <div style="text-align:center">
        <div style="width:76px;height:76px;border-radius:50%;border:2.5px solid ${m.colorMid};background:white;display:flex;align-items:center;justify-content:center;margin:0 auto 6px;font-size:.78rem;font-weight:800;color:${m.colorMid};line-height:1.3;text-align:center;padding:8px">수업 문의<br>전화 상담</div>
        <div style="font-size:.68rem;color:#888">카카오·전화</div>
      </div>
      <div style="font-size:1.2rem;color:${m.colorMid}">→</div>
      <div style="text-align:center">
        <div style="width:76px;height:76px;border-radius:50%;border:2.5px solid ${m.colorMid};background:${m.colorLight};display:flex;align-items:center;justify-content:center;margin:0 auto 6px;font-size:.78rem;font-weight:800;color:${m.colorMid};line-height:1.3;text-align:center;padding:8px">학생 맞춤<br>교사 배정</div>
        <div style="font-size:.68rem;color:#888">1:1 전담 강사</div>
      </div>
      <div style="font-size:1.2rem;color:${m.colorMid}">→</div>
      <div style="text-align:center">
        <div style="width:76px;height:76px;border-radius:50%;border:2.5px solid ${m.colorMid};background:white;display:flex;align-items:center;justify-content:center;margin:0 auto 6px;font-size:.78rem;font-weight:800;color:${m.colorMid};line-height:1.3;text-align:center;padding:8px">무료<br>체험 수업</div>
        <div style="font-size:.68rem;color:#888">1회 무료</div>
      </div>
      <div style="font-size:1.2rem;color:${m.colorMid}">→</div>
      <div style="text-align:center">
        <div style="width:76px;height:76px;border-radius:50%;border:2.5px solid ${m.colorMid};background:${m.colorLight};display:flex;align-items:center;justify-content:center;margin:0 auto 6px;font-size:.78rem;font-weight:800;color:${m.colorMid};line-height:1.3;text-align:center;padding:8px">수업 일정<br>조율</div>
        <div style="font-size:.68rem;color:#888">맞춤 스케줄</div>
      </div>
    </div>
  </div>

  <hr style="border:none;border-top:1px solid #f0e6fc">

</div>

<div class="wrap">
  <div style="background:linear-gradient(135deg,${m.color1},${m.color2});border-radius:16px;padding:32px 24px;margin-top:0;text-align:center">
    <h2 style="font-size:1.25rem;font-weight:800;color:white;margin-bottom:8px">${m.cta}</h2>
    <p style="font-size:.88rem;color:rgba(255,255,255,.8);margin-bottom:22px">첫 수업 무료 체험 · 부담 없이 시작하세요</p>
    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      <a href="tel:${PHONE}" style="background:white;color:${m.color1};font-size:.92rem;font-weight:800;padding:11px 22px;border-radius:50px;text-decoration:none">📞 전화</a>
      <a href="${KAKAO_URL}" target="_blank" style="background:#FEE500;color:#3A1D1D;font-size:.92rem;font-weight:800;padding:11px 22px;border-radius:50px;text-decoration:none">💬 카카오톡</a>
      <a href="${FORM_URL}" target="_blank" style="background:rgba(255,255,255,.15);border:1.5px solid rgba(255,255,255,.5);color:white;font-size:.92rem;font-weight:800;padding:11px 22px;border-radius:50px;text-decoration:none">📝 체험 신청</a>
    </div>
  </div>

  ${buildShareButtons(title, canonical)}

  ${lang === "english" ? `<div style="margin-top:8px;margin-bottom:16px">
    <div style="font-size:.75rem;font-weight:700;color:#555;margin-bottom:10px;text-align:center;letter-spacing:.04em">학교 영어 내신·수능 대비가 필요하다면?</div>
    <a href="/study/english/" style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px;background:#faf5ff;border:1px solid #d4b8f5;border-radius:12px;text-decoration:none;transition:filter .15s" onmouseover="this.style.filter='brightness(.97)'" onmouseout="this.style.filter='none'">
      <div style="display:flex;align-items:center;gap:12px">
        <div style="width:36px;height:36px;border-radius:50%;background:#510580;display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0">📖</div>
        <div>
          <div style="font-size:.88rem;font-weight:800;color:#370558">영어 과목 공부법 — 학년별·내신·수능·수행평가</div>
          <div style="font-size:.73rem;color:#7b2fa8;margin-top:2px">학년별 로드맵 · 문법 · 독해 · 어휘 · 시험 대비 71개 가이드</div>
        </div>
      </div>
      <div style="font-size:.9rem;color:#510580;font-weight:700">→</div>
    </a>
  </div>` : ""}

  <div style="margin-bottom:40px">
    <div style="font-size:.75rem;font-weight:700;color:#999;margin-bottom:12px;text-align:center;letter-spacing:.04em">다른 언어 회화 수업도 확인해보세요</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      ${lang !== "english" ? `<a href="/language/english/" style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px;background:${m.colorLight};border:1px solid ${m.colorMid}44;border-radius:12px;text-decoration:none;transition:filter .15s" onmouseover="this.style.filter='brightness(.95)'" onmouseout="this.style.filter='none'"><div style="display:flex;align-items:center;gap:12px"><div style="width:36px;height:36px;border-radius:50%;background:${m.colorMid};display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0">🇺🇸</div><div><div style="font-size:.88rem;font-weight:800;color:${m.color1}">영어 회화 과외</div><div style="font-size:.73rem;color:${m.colorMid};margin-top:2px">생활·비즈니스·수능·여행 영어</div></div></div><div style="font-size:.9rem;color:${m.colorMid};font-weight:700">→</div></a>` : ""}
      ${lang !== "japanese" ? `<a href="/language/japanese/" style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px;background:${m.colorLight};border:1px solid ${m.colorMid}44;border-radius:12px;text-decoration:none;transition:filter .15s" onmouseover="this.style.filter='brightness(.95)'" onmouseout="this.style.filter='none'"><div style="display:flex;align-items:center;gap:12px"><div style="width:36px;height:36px;border-radius:50%;background:${m.colorMid};display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0">🇯🇵</div><div><div style="font-size:.88rem;font-weight:800;color:${m.color1}">일본어 회화 과외</div><div style="font-size:.73rem;color:${m.colorMid};margin-top:2px">히라가나·JLPT·여행·비즈니스 일본어</div></div></div><div style="font-size:.9rem;color:${m.colorMid};font-weight:700">→</div></a>` : ""}
      ${lang !== "chinese" ? `<a href="/language/chinese/" style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px;background:${m.colorLight};border:1px solid ${m.colorMid}44;border-radius:12px;text-decoration:none;transition:filter .15s" onmouseover="this.style.filter='brightness(.95)'" onmouseout="this.style.filter='none'"><div style="display:flex;align-items:center;gap:12px"><div style="width:36px;height:36px;border-radius:50%;background:${m.colorMid};display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0">🇨🇳</div><div><div style="font-size:.88rem;font-weight:800;color:${m.color1}">중국어 회화 과외</div><div style="font-size:.73rem;color:${m.colorMid};margin-top:2px">병음·HSK·여행·비즈니스 중국어</div></div></div><div style="font-size:.9rem;color:${m.colorMid};font-weight:700">→</div></a>` : ""}
    </div>
  </div>
</div>
${FOOTER_HTML}
${FLOAT_HTML}
</body>
</html>`;
}

// ── 코딩 페이지 (자바스크립트·파이썬) ─────────────────────────
export function buildCodingPage() {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>코딩 교육 | ${SITE_NAME}</title>
  <meta name="description" content="초·중·고 1:1 맞춤 화상 코딩 수업. 자바스크립트 앱창작부터 파이썬 데이터사이언스까지.">
  <link rel="canonical" href="${SITE_DOMAIN}/coding/">
  <meta property="og:image" content="${SITE_DOMAIN}/images/og-image.png">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;800&display=swap" rel="stylesheet">
  <style>
    ${HEADER_CSS}
    ${FLOAT_CSS}
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Noto Sans KR',sans-serif;background:#fff;color:#1a0a24;line-height:1.7}
    .wrap{max-width:860px;margin:0 auto;padding:0 20px}
    .sec{padding:52px 0}
    .sec-label{display:inline-block;font-size:.72rem;font-weight:700;color:#2a7fff;background:#e8f0ff;padding:4px 12px;border-radius:20px;margin-bottom:10px}
    .sec-title{font-size:clamp(1.3rem,3vw,1.7rem);font-weight:800;color:#1a0a24;line-height:1.4;margin-bottom:8px}
    .sec-sub{font-size:.88rem;color:#666;line-height:1.8;margin-bottom:28px}
    .divider{border:none;border-top:1px solid #f0f0f5;margin:0}
    .hero{background:linear-gradient(140deg,#0a1a3a,#1a3a6a,#2a5aa8);color:white;padding:52px 24px;text-align:center}
    .hero-badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);border-radius:20px;font-size:.78rem;font-weight:700;padding:5px 16px;margin-bottom:14px}
    .hero h1{font-size:clamp(1.6rem,4vw,2.4rem);font-weight:800;line-height:1.45;margin-bottom:10px;color:white}
    .hero p{font-size:.95rem;opacity:.85;margin-bottom:28px;color:white}
    .hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
    .btn-blue{background:linear-gradient(135deg,#2a7fff,#5ba3ff);color:white;padding:13px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none}
    .btn-outline-w{background:transparent;color:white;padding:13px 28px;border-radius:50px;font-weight:700;font-size:.95rem;border:1.5px solid rgba(255,255,255,.5);text-decoration:none}
    .why-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:14px}
    .why-card{background:#f0f5ff;border-radius:14px;padding:20px 16px;border:1px solid #d0e0ff;text-align:center}
    .why-icon{font-size:2rem;margin-bottom:10px}
    .why-title{font-size:.9rem;font-weight:800;color:#1a3a6a;margin-bottom:6px}
    .why-desc{font-size:.78rem;color:#555;line-height:1.6}
    .target-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
    .target-card{background:linear-gradient(135deg,#1a3a6a,#2a5aa8);border-radius:14px;padding:24px 16px;text-align:center}
    .target-icon{font-size:2.2rem;margin-bottom:12px}
    .target-grade{font-size:1.05rem;font-weight:800;color:white;margin-bottom:8px}
    .target-desc{font-size:.78rem;color:rgba(255,255,255,.8);line-height:1.6}
    .feature-steps{display:flex;flex-direction:column;gap:16px}
    .step-item{display:flex;gap:18px;align-items:flex-start;padding:22px;background:#f8faff;border-radius:14px;border:1px solid #e0eaff}
    .step-num{width:40px;height:40px;border-radius:50%;background:#2a7fff;color:white;font-size:.9rem;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
    .step-title{font-size:.95rem;font-weight:800;color:#1a3a6a;margin-bottom:5px}
    .step-desc{font-size:.83rem;color:#555;line-height:1.75}
    .curr-tabs{display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap}
    .curr-tab{padding:8px 20px;border-radius:20px;font-size:.82rem;font-weight:700;border:1.5px solid #d0e0ff;background:white;color:#2a7fff;cursor:pointer}
    .curr-tab.active{background:#2a7fff;color:white;border-color:#2a7fff}
    .curr-list{display:flex;flex-direction:column;gap:12px}
    .curr-item{background:#f8faff;border:1px solid #e0eaff;border-radius:14px;overflow:hidden}
    .curr-item-header{display:flex;align-items:flex-start;gap:14px;padding:18px}
    .curr-icon{width:38px;height:38px;border-radius:50%;background:#2a7fff;color:white;font-size:.85rem;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
    .curr-level{font-size:.72rem;font-weight:700;color:#2a7fff;margin-bottom:3px}
    .curr-title{font-size:.92rem;font-weight:800;color:#1a3a6a;margin-bottom:6px}
    .curr-desc{font-size:.8rem;color:#555;line-height:1.75}
    .curr-tags{padding:0 18px 16px 70px;display:flex;flex-wrap:wrap;gap:5px}
    .curr-tag{font-size:.72rem;background:#e8f0ff;color:#1a3a6a;padding:3px 10px;border-radius:20px;border:1px solid #d0e0ff}
    .cta-sec{background:linear-gradient(140deg,#0a1a3a,#1a3a6a);padding:52px 24px;text-align:center}
    .coding-cat-grid{display:grid;grid-template-columns:1fr;gap:12px}
    .coding-cat-card{border:1px solid #d8e2f0;border-radius:12px;overflow:hidden;background:white}
    .coding-cat-head{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:#f4f8fd;border-bottom:1px solid #e4ecf7}
    .coding-cat-name{font-size:.9rem;font-weight:800;color:#0a1a3a}
    .coding-cat-count{font-size:.72rem;font-weight:700;color:#1a3a6a;background:#dbe7f7;border-radius:10px;padding:2px 9px}
    .coding-cat-items{display:grid;grid-template-columns:1fr 1fr;gap:0}
    .coding-cat-item{display:block;padding:11px 14px;font-size:.82rem;color:#2a4a7a;text-decoration:none;border-bottom:1px solid #f0f5fb;border-right:1px solid #f0f5fb;transition:background .12s;word-break:keep-all}
    .coding-cat-item:hover{background:#f4f8fd}
    .coding-cat-item.disabled{color:#a8b8cc;cursor:default}
    .cta-sec h2{font-size:clamp(1.2rem,3vw,1.6rem);font-weight:800;color:white;margin-bottom:10px}
    .cta-sec p{font-size:.9rem;color:rgba(255,255,255,.75);margin-bottom:28px}
    .cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
    .cta-phone{background:white;color:#1a3a6a;font-size:.95rem;font-weight:800;padding:13px 22px;border-radius:50px;text-decoration:none}
    .cta-kakao{background:#FEE500;color:#3A1D1D;font-size:.95rem;font-weight:800;padding:13px 22px;border-radius:50px;text-decoration:none}
    .cta-form{background:linear-gradient(135deg,#2a7fff,#5ba3ff);color:white;font-size:.95rem;font-weight:800;padding:13px 22px;border-radius:50px;text-decoration:none}
    footer{background:#0a1a3a;color:rgba(255,255,255,.45);text-align:center;padding:24px;font-size:.78rem;line-height:1.8}
    footer p{color:rgba(255,255,255,.45);margin:2px 0}
    footer a{color:rgba(255,255,255,.6);text-decoration:none}
    @media(max-width:600px){.target-grid{grid-template-columns:1fr}.hero-btns,.cta-btns{flex-direction:column;align-items:center}.coding-cat-items{grid-template-columns:1fr}}
    @media(min-width:900px){.coding-cat-grid{grid-template-columns:1fr 1fr}.coding-cat-items{grid-template-columns:1fr 1fr}}
  </style>
</head>
<body>
${HEADER_HTML}
<div class="hero">
  <div class="hero-badge">초·중·고 1:1 맞춤 화상 코딩</div>
  <h1>코딩, 지금 시작해야 할<br>가장 중요한 이유</h1>
  <p>AI 시대에 꼭 필요한 코딩 능력 · 자바스크립트부터 파이썬까지</p>
  <div class="hero-btns">
    <a href="${CODING_FORM_URL}" target="_blank" class="btn-blue">📝 무료 체험 신청하기</a>
    <a href="tel:${PHONE}" class="btn-outline-w">📞 전화</a>
  </div>
</div>
<div class="wrap">
  <section class="sec">
    <div class="sec-label">코딩이 필요한 이유</div>
    <div class="sec-title">지금 코딩을 배워야 하는 이유</div>
    <div class="sec-sub">2026년, 코딩은 선택이 아닌 필수입니다.<br>미래 직업의 60% 이상이 코딩 능력을 요구합니다.</div>
    <div class="why-grid">
      <div class="why-card"><div class="why-icon">🤖</div><div class="why-title">AI 시대 필수 역량</div><div class="why-desc">AI와 함께 일하기 위해 컴퓨팅 사고력은 필수입니다</div></div>
      <div class="why-card"><div class="why-icon">🧠</div><div class="why-title">논리적 사고력 향상</div><div class="why-desc">문제를 분석하고 해결하는 컴퓨팅 사고력을 키웁니다</div></div>
      <div class="why-card"><div class="why-icon">🚀</div><div class="why-title">창의적 문제 해결</div><div class="why-desc">아이디어를 직접 구현하는 과정에서 창의력과 자신감이 생깁니다</div></div>
      <div class="why-card"><div class="why-icon">🎓</div><div class="why-title">입시 · 취업 경쟁력</div><div class="why-desc">소프트웨어 중심 대학, 기업 취업 시 코딩 필수</div></div>
    </div>
  </section>
  <hr class="divider">
  <section class="sec">
    <div class="sec-label">수업 대상</div>
    <div class="sec-title">초·중·고 전학년 맞춤 수업 제공</div>
    <div class="sec-sub">학년과 수준에 맞는 커리큘럼으로 누구나 시작할 수 있어요.</div>
    <div class="target-grid">
      <div class="target-card"><div class="target-icon">🎨</div><div class="target-grade">초등학생</div><div class="target-desc">코딩 흥미 유발 및<br>컴퓨터 사고 이해</div></div>
      <div class="target-card"><div class="target-icon">📚</div><div class="target-grade">중학생</div><div class="target-desc">파이썬 기초 · 알고리즘<br>정보 교과 내신 대비</div></div>
      <div class="target-card"><div class="target-icon">🎯</div><div class="target-grade">고등학생</div><div class="target-desc">파이썬 심화 · 정보 내신<br>대입 포트폴리오</div></div>
    </div>
  </section>
  <hr class="divider">
  <section class="sec">
    <div class="sec-label">1:1 코딩 수업의 특별한 점</div>
    <div class="sec-title">제나쌤 코딩 수업이 다른 이유</div>
    <div class="feature-steps">
      <div class="step-item"><div class="step-num">1</div><div><div class="step-title">학생 수준에 딱 맞는 1:1 맞춤 커리큘럼</div><div class="step-desc">무료 시범수업을 통해 학생의 현재 수준과 관심사를 파악합니다. 코딩의 기본 개념과 동작의 원리를 쉽게 이해할 수 있도록 맞춤 수업으로 진행됩니다.</div></div></div>
      <div class="step-item"><div class="step-num">2</div><div><div class="step-title">전문 코딩 선생님의 실시간 화상 수업</div><div class="step-desc">녹화 강의가 아닌 선생님과 실시간으로 소통하는 화상 수업입니다. 크롬 브라우저만 있다면 언제 어디서나 수업 가능합니다.</div></div></div>
      <div class="step-item"><div class="step-num">3</div><div><div class="step-title">차별화된 시스템을 통한 자기주도학습 습관</div><div class="step-desc">학습 단계 종료 후 테스트를 통해 부족한 부분을 보완하고, 매 시간 수업 피드백으로 성취도를 파악합니다.</div></div></div>
      <div class="step-item"><div class="step-num">4</div><div><div class="step-title">실제 결과물을 만드는 프로젝트 중심 수업</div><div class="step-desc">배운 내용을 게임, 앱, 웹사이트로 직접 만들어봅니다. 완성된 프로젝트는 포트폴리오로 활용 가능합니다.</div></div></div>
    </div>
  </section>
  <hr class="divider">
  <section class="sec">
    <div class="sec-label">단계별 커리큘럼</div>
    <div class="sec-title">2가지 과정, 5단계 체계적 학습</div>
    <div class="sec-sub">자바스크립트 앱창작 과정과 파이썬 데이터사이언스 과정 중 선택하세요.</div>
    <div class="curr-tabs">
      <div class="curr-tab active" onclick="showCurr('js',this)">📱 앱창작 (자바스크립트)</div>
      <div class="curr-tab" onclick="showCurr('py',this)">💻 데이터사이언스 (파이썬)</div>
    </div>
    <div id="curr-js" class="curr-list">
      <div class="curr-item"><div class="curr-item-header"><div class="curr-icon">L1</div><div><div class="curr-level">Lv.1 · 프로그래밍 개념 입문</div><div class="curr-title">코딩의 시작, 텍스트 언어로 앱 만들기</div><div class="curr-desc">코딩이 필요한 이유를 이해하고, 기초 프로그래밍 개념을 익혀요.</div></div></div><div class="curr-tags"><span class="curr-tag">API 사용(기본)</span><span class="curr-tag">API 사용(심화)</span></div></div>
      <div class="curr-item"><div class="curr-item-header"><div class="curr-icon">L2</div><div><div class="curr-level">Lv.2 · 프로그래밍 개념 기초</div><div class="curr-title">주요 개념으로 다양한 앱 스스로 제작</div><div class="curr-desc">순차, 반복, 선택 구조 등 주요 개념을 정확하게 이해해요.</div></div></div><div class="curr-tags"><span class="curr-tag">변수, 조건</span><span class="curr-tag">복제, 함수, 배열(기본)</span></div></div>
      <div class="curr-item"><div class="curr-item-header"><div class="curr-icon">L3</div><div><div class="curr-level">Lv.3 · 프로그래밍 개념 심화</div><div class="curr-title">복잡한 앱을 효율적인 방법으로 제작</div><div class="curr-desc">복제, 함수, 배열 등 심화 개념으로 효율적인 문제 해결을 해요.</div></div></div><div class="curr-tags"><span class="curr-tag">복제, 함수, 배열, 반복(심화)</span></div></div>
      <div class="curr-item"><div class="curr-item-header"><div class="curr-icon">L4</div><div><div class="curr-level">Lv.4 · 프로그래밍 응용 기초</div><div class="curr-title">실제 개발 방법과 알고리즘으로 아이디어 표현</div><div class="curr-desc">실제 개발에 사용되는 알고리즘을 익혀 아이디어를 표현해요.</div></div></div><div class="curr-tags"><span class="curr-tag">변수, 조건, 함수, 반복(응용)</span></div></div>
      <div class="curr-item"><div class="curr-item-header"><div class="curr-icon">L5</div><div><div class="curr-level">Lv.5 · 프로그래밍 응용 심화</div><div class="curr-title">심화 개념 활용, 나만의 앱 완성</div><div class="curr-desc">심화 개념이 복잡하게 얽힌 앱을 제작하고 포트폴리오를 완성해요.</div></div></div><div class="curr-tags"><span class="curr-tag">함수, 반복, 복제(심화)</span></div></div>
    </div>
    <div id="curr-py" class="curr-list" style="display:none">
      <div class="curr-item"><div class="curr-item-header"><div class="curr-icon">L1</div><div><div class="curr-level">Lv.1 · 데이터 분석 기초</div><div class="curr-title">파이썬 기초 문법으로 데이터 분석력 키우기</div><div class="curr-desc">변수, 자료형, 제어문 등 파이썬 기초를 배우며 데이터를 다뤄요.</div></div></div><div class="curr-tags"><span class="curr-tag">변수, 자료형, 제어문</span><span class="curr-tag">자료형(딕셔너리, 튜플)</span></div></div>
      <div class="curr-item"><div class="curr-item-header"><div class="curr-icon">L2</div><div><div class="curr-level">Lv.2 · 데이터 분석 심화</div><div class="curr-title">함수와 모듈로 프로그래밍 효율성 높이기</div><div class="curr-desc">함수와 모듈을 활용해 복잡한 문제를 효율적으로 해결해요.</div></div></div><div class="curr-tags"><span class="curr-tag">사용자 정의 함수</span><span class="curr-tag">모듈 활용</span></div></div>
      <div class="curr-item"><div class="curr-item-header"><div class="curr-icon">L3</div><div><div class="curr-level">Lv.3 · 자료구조 기초</div><div class="curr-title">클래스와 자료구조·알고리즘 구현</div><div class="curr-desc">클래스, 스택, 큐, 그래프 자료구조를 익히고 알고리즘을 구현해요.</div></div></div><div class="curr-tags"><span class="curr-tag">클래스, 해시함수</span><span class="curr-tag">스택, 큐, 그래프</span></div></div>
      <div class="curr-item"><div class="curr-item-header"><div class="curr-icon">L4</div><div><div class="curr-level">Lv.4 · 자료구조 심화</div><div class="curr-title">재귀·정렬·탐색 알고리즘으로 효율적 프로그래밍</div><div class="curr-desc">재귀, 정렬, 탐색 알고리즘 원리를 이해하고 구현해요.</div></div></div><div class="curr-tags"><span class="curr-tag">트리, 재귀 정렬</span><span class="curr-tag">DFS 탐색</span></div></div>
      <div class="curr-item"><div class="curr-item-header"><div class="curr-icon">L5</div><div><div class="curr-level">Lv.5 · 인공지능 기초</div><div class="curr-title">빅데이터·AI 기초, 데이터 시각화·분석</div><div class="curr-desc">라이브러리로 데이터를 시각화·분석하고 AI 기초를 이해해요.</div></div></div><div class="curr-tags"><span class="curr-tag">데이터 시각화</span><span class="curr-tag">인공지능, 머신러닝</span></div></div>
    </div>
  </section>
</div>

<!-- 코딩 세부 가이드 (카테고리 카드) -->
<div class="wrap">
  <section class="sec">
    <div class="sec-label">세부 가이드</div>
    <div class="sec-title">관심 분야별 코딩 가이드</div>
    <div class="sec-sub">언어·대상·분야·입시·목적별로 정리한 ${Object.keys(CODING_PAGE_READY).length}개 가이드를 확인해 보세요.</div>
    <div class="coding-cat-grid">
      ${CODING_HUB_CATEGORIES.map(cat => `
      <div class="coding-cat-card">
        <div class="coding-cat-head">
          <span class="coding-cat-name">${cat.name}</span>
          <span class="coding-cat-count">${cat.count}</span>
        </div>
        <div class="coding-cat-items">
          ${cat.items.map(([key, label]) => {
            const href = CODING_PAGE_READY[`${cat.key}/${key}`];
            return href
              ? `<a href="${href}" class="coding-cat-item">${label}</a>`
              : `<span class="coding-cat-item disabled">${label}</span>`;
          }).join("")}
        </div>
      </div>`).join("")}
    </div>
  </section>
</div>

<div class="cta-sec">
  <h2>지금 바로 무료 체험 신청하세요</h2>
  <p>첫 수업은 무료 · 부담 없이 경험해 보세요</p>
  <div class="cta-btns">
    <a href="tel:${PHONE}" class="cta-phone">📞 전화</a>
    <a href="${KAKAO_URL}" target="_blank" class="cta-kakao">💬 카카오톡</a>
    <a href="${CODING_FORM_URL}" target="_blank" class="cta-form">📝 체험신청</a>
  </div>
</div>
${FOOTER_HTML}
${FLOAT_HTML}
<script>
function showCurr(type, el) {
  document.querySelectorAll('.curr-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('curr-js').style.display = type === 'js' ? 'flex' : 'none';
  document.getElementById('curr-py').style.display = type === 'py' ? 'flex' : 'none';
}
</script>
</body>
</html>`;
}

// ── 자기주도학습 코칭 페이지 ──────────────────────────────────
export function buildSelfStudyPage() {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>자기주도학습 코칭 | ${SITE_NAME}</title>
  <meta name="description" content="초등 5학년~고등 1:1 화상 자기주도학습 코칭. 공부 방법부터 바꿉니다.">
  <link rel="canonical" href="${SITE_DOMAIN}/self-study/">
  <meta property="og:image" content="${SITE_DOMAIN}/images/og-image.png">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;800&display=swap" rel="stylesheet">
  <style>
    ${HEADER_CSS}
    ${FLOAT_CSS}
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Noto Sans KR',sans-serif;background:#fff;color:#1a0a24;line-height:1.7}
    .wrap{max-width:860px;margin:0 auto;padding:0 20px}
    .sec{padding:52px 0}
    .sec-label{display:inline-block;font-size:.72rem;font-weight:700;color:#7b2fa8;background:#f0e6fc;padding:4px 12px;border-radius:20px;margin-bottom:10px}
    .sec-title{font-size:clamp(1.3rem,3vw,1.7rem);font-weight:800;color:#1a0a24;line-height:1.4;margin-bottom:8px}
    .sec-sub{font-size:.88rem;color:#666;line-height:1.8;margin-bottom:28px}
    .divider{border:none;border-top:1px solid #f0e6fc;margin:0}
    .hero{background:linear-gradient(140deg,#1a0a24,#370558,#510580);color:white;padding:52px 24px;text-align:center}
    .hero-badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);border-radius:20px;font-size:.78rem;font-weight:700;padding:5px 16px;margin-bottom:14px}
    .hero h1{font-size:clamp(1.5rem,4vw,2.2rem);font-weight:800;line-height:1.45;margin-bottom:10px;color:white}
    .hero p{font-size:.95rem;opacity:.85;margin-bottom:20px;color:white}
    .hero-info{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:24px}
    .hero-info-item{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:10px;padding:10px 18px;font-size:.85rem;color:white}
    .hero-info-item span{font-weight:700;display:block;font-size:.72rem;opacity:.7;margin-bottom:3px}
    .hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
    .btn-pink{background:linear-gradient(135deg,#e8439a,#ff6fc1);color:white;padding:13px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none}
    .btn-outline-w{background:transparent;color:white;padding:13px 28px;border-radius:50px;font-weight:700;font-size:.95rem;border:1.5px solid rgba(255,255,255,.5);text-decoration:none}
    .recommend-list{display:flex;flex-direction:column;gap:10px}
    .recommend-card{background:#faf5ff;border:1px solid #e8d6f5;border-radius:12px;padding:14px 18px;display:flex;align-items:center;gap:12px}
    .rec-icon{font-size:1.3rem;flex-shrink:0}
    .rec-text{font-size:.88rem;color:#370558;line-height:1.6;font-weight:700}
    .coaching-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
    .coaching-card{background:white;border:1px solid #e8d6f5;border-radius:14px;padding:22px 18px}
    .coaching-icon{font-size:1.8rem;margin-bottom:12px}
    .coaching-badge{display:inline-block;font-size:.72rem;font-weight:700;color:#510580;background:#f0e6fc;padding:3px 10px;border-radius:20px;margin-bottom:8px}
    .coaching-title{font-size:.95rem;font-weight:800;color:#370558;margin-bottom:8px}
    .coaching-desc{font-size:.83rem;color:#555;line-height:1.7}
    .coaching-tags{margin-top:10px;display:flex;flex-wrap:wrap;gap:5px}
    .coaching-tag{font-size:.72rem;background:#faf5ff;color:#7b2fa8;padding:3px 9px;border-radius:20px;border:1px solid #e8d6f5}
    .process-item{display:flex;gap:16px;align-items:flex-start;padding:20px 0;border-bottom:1px solid #f0e6fc}
    .process-item:last-child{border-bottom:none}
    .process-num{width:38px;height:38px;border-radius:50%;background:#510580;color:white;font-size:.9rem;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
    .process-title{font-size:.95rem;font-weight:800;color:#370558;margin-bottom:5px}
    .process-desc{font-size:.83rem;color:#555;line-height:1.7}
    .review-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
    .review-card{background:#faf5ff;border:1px solid #e8d6f5;border-radius:14px;padding:22px 20px}
    .review-quote{font-size:.9rem;font-weight:800;color:#370558;margin-bottom:12px;line-height:1.5}
    .review-quote::before{content:'"';color:#e8439a;font-size:1.2rem;font-weight:800}
    .review-quote::after{content:'"';color:#e8439a;font-size:1.2rem;font-weight:800}
    .review-desc{font-size:.8rem;color:#555;line-height:1.8;margin-bottom:14px}
    .review-author{font-size:.75rem;color:#9b6cc0;font-weight:700}
    .cta-sec{background:linear-gradient(140deg,#1a0a24,#370558);padding:52px 24px;text-align:center}
    .cta-sec h2{font-size:clamp(1.2rem,3vw,1.6rem);font-weight:800;color:white;margin-bottom:10px}
    .cta-sec p{font-size:.9rem;color:rgba(255,255,255,.75);margin-bottom:28px}
    .cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
    .cta-phone{background:white;color:#510580;font-size:.95rem;font-weight:800;padding:13px 22px;border-radius:50px;text-decoration:none}
    .cta-kakao{background:#FEE500;color:#3A1D1D;font-size:.95rem;font-weight:800;padding:13px 22px;border-radius:50px;text-decoration:none}
    .cta-form{background:linear-gradient(135deg,#e8439a,#ff6fc1);color:white;font-size:.95rem;font-weight:800;padding:13px 22px;border-radius:50px;text-decoration:none}
    footer{background:#1a0a24;color:rgba(255,255,255,.45);text-align:center;padding:24px;font-size:.78rem;line-height:1.8}
    footer p{color:rgba(255,255,255,.45);margin:2px 0}
    footer a{color:rgba(255,255,255,.6);text-decoration:none}
    @media(max-width:600px){.coaching-grid,.review-grid{grid-template-columns:1fr}.hero-btns,.cta-btns{flex-direction:column;align-items:center}}
  </style>
</head>
<body>
${HEADER_HTML}
<div class="hero">
  <div class="hero-badge">초등 5학년 ~ 고등 1:1 화상 코칭</div>
  <h1>성적이 오르지 않는 이유,<br>공부 방법을 모르기 때문입니다.</h1>
  <p>스스로 공부하는 힘을 키우는 1:1 맞춤 자기주도학습 코칭</p>
  <div class="hero-info">
    <div class="hero-info-item"><span>대상</span>초등 5학년 ~ 고등</div>
    <div class="hero-info-item"><span>방식</span>1:1 화상 수업</div>
    <div class="hero-info-item"><span>기간</span>월 단위 (주 1회 60분~)</div>
  </div>
  <div class="hero-btns">
    <a href="${FORM_URL}" target="_blank" class="btn-pink">📝 체험신청</a>
    <a href="tel:${PHONE}" class="btn-outline-w">📞 전화</a>
  </div>
</div>
<div class="wrap">
  <section class="sec">
    <div class="sec-label">이런 학생에게 추천해요</div>
    <div class="sec-title">성적 오르지 않는 아이,<br>원인부터 알아야 합니다.</div>
    <div class="sec-sub">공부 시간은 많은데 성적이 오르지 않는다면, 공부법부터 바꿔야 합니다.</div>
    <div class="recommend-list">
      <div class="recommend-card"><div class="rec-icon">📖</div><div class="rec-text">공부는 하고 싶은데 어떻게 해야 할지 모르는 학생</div></div>
      <div class="recommend-card"><div class="rec-icon">⏰</div><div class="rec-text">오래 앉아있지만 성적이 오르지 않는 학생</div></div>
      <div class="recommend-card"><div class="rec-icon">📅</div><div class="rec-text">플래너·시간관리가 안 되고 계획 실천이 어려운 학생</div></div>
      <div class="recommend-card"><div class="rec-icon">🎯</div><div class="rec-text">자기주도 학습 능력과 공부 습관을 키우고 싶은 학생</div></div>
      <div class="recommend-card"><div class="rec-icon">😰</div><div class="rec-text">시험만 되면 불안하고 멘탈 관리가 어려운 학생</div></div>
      <div class="recommend-card"><div class="rec-icon">🔍</div><div class="rec-text">진로가 막막하고 목표 설정이 안 되는 학생</div></div>
    </div>
  </section>
  <hr class="divider">
  <section class="sec">
    <div class="sec-label">4가지 맞춤 코칭</div>
    <div class="sec-title">공부의 구도를 바꾸는<br>4가지 코칭 프로그램</div>
    <div class="sec-sub">학습 습관부터 진로·멘탈까지, 성적 향상의 근본을 바꿉니다.</div>
    <div class="coaching-grid">
      <div class="coaching-card"><div class="coaching-icon">📋</div><div class="coaching-badge">해빗 코칭</div><div class="coaching-title">습관을 잡아주는 코칭</div><div class="coaching-desc">공부 습관과 생활 습관을 함께 잡아줍니다.</div><div class="coaching-tags"><span class="coaching-tag">공부 습관</span><span class="coaching-tag">플래너 관리</span></div></div>
      <div class="coaching-card"><div class="coaching-icon">📚</div><div class="coaching-badge">스터디 코칭</div><div class="coaching-title">나만의 학습법을 찾는 코칭</div><div class="coaching-desc">과목별 최적의 공부법과 시험 전략을 관리합니다.</div><div class="coaching-tags"><span class="coaching-tag">과목별 공부법</span><span class="coaching-tag">시험 전략</span></div></div>
      <div class="coaching-card"><div class="coaching-icon">🗺️</div><div class="coaching-badge">커리어 코칭</div><div class="coaching-title">진로를 찾아가는 코칭</div><div class="coaching-desc">강점과 관심사를 바탕으로 진로를 탐색하고 목표를 설정합니다.</div><div class="coaching-tags"><span class="coaching-tag">진로 탐색</span><span class="coaching-tag">대입 로드맵</span></div></div>
      <div class="coaching-card"><div class="coaching-icon">💚</div><div class="coaching-badge">감정 코칭</div><div class="coaching-title">멘탈까지 케어하는 코칭</div><div class="coaching-desc">시험 불안, 스트레스를 해소하고 긍정적인 동기를 만들어드립니다.</div><div class="coaching-tags"><span class="coaching-tag">스트레스 관리</span><span class="coaching-tag">동기부여</span></div></div>
    </div>
  </section>
  <hr class="divider">
  <section class="sec">
    <div class="sec-label">수업 진행 과정</div>
    <div class="sec-title">이렇게 진행됩니다</div>
    <div class="process-item"><div class="process-num">1</div><div><div class="process-title">스타트체크 — 학습 현황 진단</div><div class="process-desc">학습 습관, 공부 방법, 정서 상태를 진단하고 맞춤 커리큘럼을 설계합니다.</div></div></div>
    <div class="process-item"><div class="process-num">2</div><div><div class="process-title">목표 설정 — 단기/장기 플랜 수립</div><div class="process-desc">현재 상태와 목표를 확인하고 현실적인 학습 계획을 세웁니다.</div></div></div>
    <div class="process-item"><div class="process-num">3</div><div><div class="process-title">1:1 화상 코칭 수업 진행</div><div class="process-desc">매주 1회 60분, 전담 코치와 1:1로 진행합니다.</div></div></div>
    <div class="process-item"><div class="process-num">4</div><div><div class="process-title">피드백 & 성장 관리</div><div class="process-desc">매 수업 후 학부모님께 피드백을 제공하고 꾸준한 성장을 확인합니다.</div></div></div>
  </section>
  <hr class="divider">
  <section class="sec">
    <div class="sec-label">수업 후기</div>
    <div class="sec-title">자기주도학습 코칭이 가져온 놀라운 효과</div>
    <div class="review-grid">
      <div class="review-card"><div class="review-quote">드디어 혼자 공부를 해요</div><div class="review-desc">공부해라 잔소리 하다가 하루가 갔었는데 이제 나쁜 엄마에서 탈출한 기분입니다.</div><div class="review-author">김소O 회원 학부모</div></div>
      <div class="review-card"><div class="review-quote">어떤 걸 준비해야 하는지 알겠어요</div><div class="review-desc">막상 고등학생이 되니 준비할 게 너무 많더라구요... 지금은 코치님이 있어서 너무 다행이에요.</div><div class="review-author">정지O 회원</div></div>
      <div class="review-card"><div class="review-quote">계획은 세워도 실천할 줄을 몰랐는데</div><div class="review-desc">코치님이 지속적으로 소통해 주시니까 학교 숙제며 학원 숙제며 이제 곧잘 하고 있어요.</div><div class="review-author">주경O 회원 학부모</div></div>
      <div class="review-card"><div class="review-quote">훨씬 여유로워 보이는데 성적은 올랐어요</div><div class="review-desc">미루는 시간이 없어지니 예민하던 아이가 여유로워졌어요.</div><div class="review-author">장민O 회원 학부모</div></div>
    </div>
  </section>
</div>
<div class="cta-sec">
  <h2>지금 바로 무료 상담 받으세요</h2>
  <p>공부법부터 바꾸면 성적이 달라집니다</p>
  <div class="cta-btns">
    <a href="tel:${PHONE}" class="cta-phone">📞 전화</a>
    <a href="${KAKAO_URL}" target="_blank" class="cta-kakao">💬 카카오톡</a>
    <a href="${FORM_URL}" target="_blank" class="cta-form">📝 체험신청</a>
  </div>
</div>
${FOOTER_HTML}
${FLOAT_HTML}
</body>
</html>`;
}
