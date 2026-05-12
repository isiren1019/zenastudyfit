// ================================================================
// worker.js — Cloudflare Workers 메인 라우터
// 역할: URL을 받아 적절한 빌더 함수를 호출하여 HTML 응답 반환
//
// 분할 구조 (총 27개 파일):
//   - config.js, utils.js, layout.js, content-pools.js, slug.js (공통 5)
//   - data/areas.js, data/schools.js (전국 정보 2)
//   - data/subjects/_meta.js + 9개 과목 (10)
//   - builders/ × 9 (빌더 9)
//   - worker.js (이 파일, 라우터)
//
// 변경 빈도: 낮음 (URL 라우팅 추가 시에만 수정)
// ================================================================

// ── 공통 인프라 ─────────────────────────────────────────────
import { SITE_NAME, SITE_DOMAIN, GRADES, STUDY_READY, CITY_ORDER } from './config.js';
import { VALID_SLUGS, parseSlug } from './slug.js';

// ── 데이터 (라우터에서 직접 페이지 존재 여부 판단용) ────────
import { AREAS } from './data/areas.js';
import { SCHOOLS_ELEM, SCHOOLS_MIDDLE, SCHOOLS_HIGH } from './data/schools.js';
import { GRADE_SUBJECT_META, SUBJECT_HUB_DATA } from './data/subjects/_meta.js';
import {
  KOREAN_EXAM_DATA, KOREAN_GRAMMAR_DATA, KOREAN_LITERACY_DATA,
  KOREAN_READING_DATA, KOREAN_PERFORM_DATA, KOREAN_HABIT_DATA,
} from './data/subjects/korean.js';
import {
  ENGLISH_EXAM_DATA, ENGLISH_HABIT_DATA, ENGLISH_VOCAB_DATA,
  ENGLISH_GRAMMAR_DATA, ENGLISH_READING_DATA, ENGLISH_PERFORM_DATA,
} from './data/subjects/english.js';
import {
  MATH_EXAM_DATA, MATH_HABIT_DATA, MATH_CONCEPT_DATA,
  MATH_TYPE_DATA, MATH_PERFORM_DATA, MATH_SUNEUNG_DATA,
  MATH_MISTAKE_DATA,
} from './data/subjects/math.js';
import {
  SCIENCE_EXAM_DATA, SCIENCE_HABIT_DATA, SCIENCE_BIOLOGY_DATA,
  SCIENCE_PHYSICS_DATA, SCIENCE_PERFORM_DATA,
} from './data/subjects/science.js';
import {
  SOCIAL_EXAM_DATA, SOCIAL_HABIT_DATA, SOCIAL_SOCIETY_DATA,
  SOCIAL_ETHICS_DATA, SOCIAL_PERFORM_DATA,
} from './data/subjects/social.js';
import {
  HISTORY_EXAM_DATA, HISTORY_HABIT_DATA, HISTORY_CERT_DATA,
  HISTORY_PERIOD_DATA, HISTORY_PERFORM_DATA,
} from './data/subjects/history.js';
import {
  ENGLISH_LANG_SKILL_DATA, ENGLISH_LANG_CERT_DATA, ENGLISH_LANG_LEVEL_DATA,
  ENGLISH_LANG_SCHOOL_DATA, ENGLISH_LANG_BIZ_DATA, ENGLISH_LANG_PURPOSE_DATA,
} from './data/subjects/english-lang.js';
import {
  JAPANESE_LANG_SKILL_DATA, JAPANESE_LANG_LEVEL_DATA, JAPANESE_LANG_SCHOOL_DATA,
  JAPANESE_LANG_CERT_DATA, JAPANESE_LANG_BIZ_DATA, JAPANESE_LANG_PURPOSE_DATA,
} from './data/subjects/japanese-lang.js';
import {
  CHINESE_LANG_CERT_DATA, CHINESE_LANG_LEVEL_DATA, CHINESE_LANG_SKILL_DATA,
  CHINESE_LANG_PURPOSE_DATA, CHINESE_LANG_SCHOOL_DATA, CHINESE_LANG_BIZ_DATA,
} from './data/subjects/chinese-lang.js';

// ── 빌더 ─────────────────────────────────────────────────────
import { handleSitemap, checkRedirect } from './builders/sitemap.js';
import { buildMainPage, buildRegionsPage, build404Page } from './builders/pages.js';
import {
  buildSchoolsPage, buildSchoolsSidoPage,
  buildSchoolPage, buildSchoolSubjectPage,
} from './builders/schools.js';
import { buildDetailPage } from './builders/detail.js';
import {
  buildStudyMainPage, buildSubjectHubPage, buildStudyComingSoonPage,
} from './builders/study.js';
import {
  buildKoreanHubPage, buildKoreanGradeHigh3Page, buildKoreanGradePage,
} from './builders/korean-hub.js';
import {
  buildLanguagePage, buildCodingPage, buildSelfStudyPage,
} from './builders/language.js';
import { buildKoreanHabitPage } from './builders/habit.js';


// ── 메인 라우터 ───────────────────────────────────────────────
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 사이트맵 — 디코딩/슬래시 제거 전에 먼저 체크
    const rawPath = url.pathname.replace(/\/$/, "");
    if (rawPath.startsWith("/sitemap")) {
      const sm = handleSitemap(rawPath);
      if (sm) return sm;
    }

    // robots.txt — AI 봇 정책 명시 (모두 허용 + sitemap 안내)
    if (rawPath === "/robots.txt") {
      const BASE = "https://zenastudyfit.com";
      const robotsTxt = `# 제나쌤의 스터디핏 과외 - robots.txt
# 모든 검색엔진·AI 봇에게 사이트 접근을 허용합니다.

User-agent: *
Allow: /

# 사이트맵 위치 (검색·AI 봇이 사이트 구조를 빠르게 파악)
Sitemap: ${BASE}/sitemap.xml
Sitemap: ${BASE}/sitemap-static.xml
Sitemap: ${BASE}/sitemap-areas.xml
Sitemap: ${BASE}/sitemap-schools-1.xml
Sitemap: ${BASE}/sitemap-schools-2.xml
Sitemap: ${BASE}/sitemap-schools-3.xml
`;
      return new Response(robotsTxt, {
        headers: {
          "Content-Type": "text/plain;charset=UTF-8",
          "Cache-Control": "public, max-age=3600"
        }
      });
    }

    let path = decodeURIComponent(url.pathname).replace(/\/$/, "") || "/";

    // IndexNow 키 파일 서빙 (네이버 인증용)
    const INDEXNOW_KEY = "zenastudyfit-a1b2c3d4e5f6a1b2c3d4e5f6a1b2";
    if (path === "/" + INDEXNOW_KEY + ".txt") {
      return new Response(INDEXNOW_KEY, {
        headers: { "Content-Type": "text/plain" }
      });
    }

    // IndexNow 수동 트리거 (/trigger-indexnow/ 접속 시 네이버에 POST 요청)
    if (path === "/trigger-indexnow") {
      const KEY = "zenastudyfit-a1b2c3d4e5f6a1b2c3d4e5f6a1b2";
      const BASE = "https://zenastudyfit.com";
      const GRADES = ["초등","중등","고등"];
      const SUBJS = ["국어","영어","수학","과학","사회","한국사"];

      // 대표 URL 100개만 전송 (IndexNow는 한번에 최대 10,000개)
      const urls = [BASE + "/", BASE + "/regions/", BASE + "/schools/"];
      for (const [city, gu, dong] of AREAS.slice(0, 20)) {
        for (const grade of GRADES) {
          for (const subj of SUBJS) {
            const slug = (city+"-"+gu+"-"+dong+"-"+grade+"-"+subj+"-과외").replace(/ /g,"-");
            urls.push(`${BASE}/${slug}/`);
          }
        }
      }

      try {
        const res = await fetch("https://searchadvisor.naver.com/indexnow", {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify({
            host: "zenastudyfit.com",
            key: KEY,
            keyLocation: `${BASE}/${KEY}.txt`,
            urlList: urls.slice(0, 100)
          })
        });
        return new Response(`IndexNow 요청 완료! 상태코드: ${res.status} / 전송URL: ${urls.length}개`, {
          headers: { "Content-Type": "text/plain;charset=UTF-8" }
        });
      } catch(e) {
        return new Response(`오류: ${e.message}`, { status: 500, headers: { "Content-Type": "text/plain;charset=UTF-8" } });
      }
    }

    // 이전 URL → 새 URL 리다이렉트 (301)
    const oldSlug = path.replace(/^\//, "");
    const newPath = checkRedirect(oldSlug);
    if (newPath) {
      return Response.redirect("https://zenastudyfit.com/" + newPath, 301);
    }

    // 정적 파일은 Pages에서 서빙
    if (path.match(/\.(png|jpg|jpeg|gif|webp|ico|svg|txt|xml|css|js)$/)) {
      const pagesUrl = `https://zenastudyfit.pages.dev${url.pathname}`;
      return fetch(pagesUrl);
    }

    // 메인 페이지
    if (path === "" || path === "/") {
      return new Response(buildMainPage(), {
        headers: { "Content-Type": "text/html;charset=UTF-8" }
      });
    }

    // 지역 페이지
    if (path === "/regions") {
      return new Response(buildRegionsPage(), {
        headers: { "Content-Type": "text/html;charset=UTF-8" }
      });
    }

    // 코딩 페이지
    if (path === "/coding") {
      return new Response(buildCodingPage(), {
        headers: { "Content-Type": "text/html;charset=UTF-8" }
      });
    }

    // 제2외국어 회화 페이지 (english/japanese/chinese)
    if (path === "/language/english" || path === "/language/english/") {
      return new Response(buildLanguagePage("english"), {
        headers: { "Content-Type": "text/html;charset=UTF-8" }
      });
    }
    if (path === "/language/japanese" || path === "/language/japanese/") {
      return new Response(buildLanguagePage("japanese"), {
        headers: { "Content-Type": "text/html;charset=UTF-8" }
      });
    }
    if (path === "/language/chinese" || path === "/language/chinese/") {
      return new Response(buildLanguagePage("chinese"), {
        headers: { "Content-Type": "text/html;charset=UTF-8" }
      });
    }

    // 영어 회화 영역별 학습 페이지 (/language/english/skill/{slug}/)
    const engLangSkillMatch = path.match(/^\/language\/english\/skill\/([^\/]+)\/?$/);
    if (engLangSkillMatch) {
      const skillKey = engLangSkillMatch[1];
      if (ENGLISH_LANG_SKILL_DATA[skillKey]) {
        return new Response(buildKoreanHabitPage(skillKey, "skill", "english_lang"), {
          headers: { "Content-Type": "text/html;charset=UTF-8" }
        });
      }
    }

    // 영어 회화 자격증 대비 페이지 (/language/english/cert/{slug}/)
    const engLangCertMatch = path.match(/^\/language\/english\/cert\/([^\/]+)\/?$/);
    if (engLangCertMatch) {
      const certKey = engLangCertMatch[1];
      if (ENGLISH_LANG_CERT_DATA[certKey]) {
        return new Response(buildKoreanHabitPage(certKey, "cert", "english_lang"), {
          headers: { "Content-Type": "text/html;charset=UTF-8" }
        });
      }
    }

    // 영어 회화 수준별 과정 페이지 (/language/english/level/{slug}/)
    const engLangLevelMatch = path.match(/^\/language\/english\/level\/([^\/]+)\/?$/);
    if (engLangLevelMatch) {
      const levelKey = engLangLevelMatch[1];
      if (ENGLISH_LANG_LEVEL_DATA[levelKey]) {
        return new Response(buildKoreanHabitPage(levelKey, "level", "english_lang"), {
          headers: { "Content-Type": "text/html;charset=UTF-8" }
        });
      }
    }

    // 영어 회화 내신·진학·유학 페이지 (/language/english/school/{slug}/)
    const engLangSchoolMatch = path.match(/^\/language\/english\/school\/([^\/]+)\/?$/);
    if (engLangSchoolMatch) {
      const schoolKey = engLangSchoolMatch[1];
      if (ENGLISH_LANG_SCHOOL_DATA[schoolKey]) {
        return new Response(buildKoreanHabitPage(schoolKey, "school", "english_lang"), {
          headers: { "Content-Type": "text/html;charset=UTF-8" }
        });
      }
    }

    // 영어 회화 비즈니스 영어 페이지 (/language/english/biz/{slug}/)
    const engLangBizMatch = path.match(/^\/language\/english\/biz\/([^\/]+)\/?$/);
    if (engLangBizMatch) {
      const bizKey = engLangBizMatch[1];
      if (ENGLISH_LANG_BIZ_DATA[bizKey]) {
        return new Response(buildKoreanHabitPage(bizKey, "biz", "english_lang"), {
          headers: { "Content-Type": "text/html;charset=UTF-8" }
        });
      }
    }

    // 영어 회화 목적별 수업 페이지 (/language/english/purpose/{slug}/)
    const engLangPurposeMatch = path.match(/^\/language\/english\/purpose\/([^\/]+)\/?$/);
    if (engLangPurposeMatch) {
      const purposeKey = engLangPurposeMatch[1];
      if (ENGLISH_LANG_PURPOSE_DATA[purposeKey]) {
        return new Response(buildKoreanHabitPage(purposeKey, "purpose", "english_lang"), {
          headers: { "Content-Type": "text/html;charset=UTF-8" }
        });
      }
    }

    // 일본어 회화 영역별 학습 페이지 (/language/japanese/skill/{slug}/)
    const jpnLangSkillMatch = path.match(/^\/language\/japanese\/skill\/([^\/]+)\/?$/);
    if (jpnLangSkillMatch) {
      const skillKey = jpnLangSkillMatch[1];
      if (JAPANESE_LANG_SKILL_DATA[skillKey]) {
        return new Response(buildKoreanHabitPage(skillKey, "skill", "japanese_lang"), {
          headers: { "Content-Type": "text/html;charset=UTF-8" }
        });
      }
    }

    // 일본어 회화 자격증 대비 페이지 (/language/japanese/cert/{slug}/)
    const jpnLangCertMatch = path.match(/^\/language\/japanese\/cert\/([^\/]+)\/?$/);
    if (jpnLangCertMatch) {
      const certKey = jpnLangCertMatch[1];
      if (JAPANESE_LANG_CERT_DATA[certKey]) {
        return new Response(buildKoreanHabitPage(certKey, "cert", "japanese_lang"), {
          headers: { "Content-Type": "text/html;charset=UTF-8" }
        });
      }
    }

    // 일본어 회화 수준별 과정 페이지 (/language/japanese/level/{slug}/)
    const jpnLangLevelMatch = path.match(/^\/language\/japanese\/level\/([^\/]+)\/?$/);
    if (jpnLangLevelMatch) {
      const levelKey = jpnLangLevelMatch[1];
      if (JAPANESE_LANG_LEVEL_DATA[levelKey]) {
        return new Response(buildKoreanHabitPage(levelKey, "level", "japanese_lang"), {
          headers: { "Content-Type": "text/html;charset=UTF-8" }
        });
      }
    }

    // 일본어 회화 내신·진학·유학 페이지 (/language/japanese/school/{slug}/)
    const jpnLangSchoolMatch = path.match(/^\/language\/japanese\/school\/([^\/]+)\/?$/);
    if (jpnLangSchoolMatch) {
      const schoolKey = jpnLangSchoolMatch[1];
      if (JAPANESE_LANG_SCHOOL_DATA[schoolKey]) {
        return new Response(buildKoreanHabitPage(schoolKey, "school", "japanese_lang"), {
          headers: { "Content-Type": "text/html;charset=UTF-8" }
        });
      }
    }

    // 일본어 회화 비즈니스 일본어 페이지 (/language/japanese/biz/{slug}/)
    const jpnLangBizMatch = path.match(/^\/language\/japanese\/biz\/([^\/]+)\/?$/);
    if (jpnLangBizMatch) {
      const bizKey = jpnLangBizMatch[1];
      if (JAPANESE_LANG_BIZ_DATA[bizKey]) {
        return new Response(buildKoreanHabitPage(bizKey, "biz", "japanese_lang"), {
          headers: { "Content-Type": "text/html;charset=UTF-8" }
        });
      }
    }

    // 일본어 회화 목적별 수업 페이지 (/language/japanese/purpose/{slug}/)
    const jpnLangPurposeMatch = path.match(/^\/language\/japanese\/purpose\/([^\/]+)\/?$/);
    if (jpnLangPurposeMatch) {
      const purposeKey = jpnLangPurposeMatch[1];
      if (JAPANESE_LANG_PURPOSE_DATA[purposeKey]) {
        return new Response(buildKoreanHabitPage(purposeKey, "purpose", "japanese_lang"), {
          headers: { "Content-Type": "text/html;charset=UTF-8" }
        });
      }
    }

    // 중국어 회화 자격증 대비 페이지 (/language/chinese/cert/{slug}/)
    const chnLangCertMatch = path.match(/^\/language\/chinese\/cert\/([^\/]+)\/?$/);
    if (chnLangCertMatch) {
      const certKey = chnLangCertMatch[1];
      if (CHINESE_LANG_CERT_DATA[certKey]) {
        return new Response(buildKoreanHabitPage(certKey, "cert", "chinese_lang"), {
          headers: { "Content-Type": "text/html;charset=UTF-8" }
        });
      }
    }

    // 중국어 회화 영역별 학습 페이지 (/language/chinese/skill/{slug}/)
    const chnLangSkillMatch = path.match(/^\/language\/chinese\/skill\/([^\/]+)\/?$/);
    if (chnLangSkillMatch) {
      const skillKey = chnLangSkillMatch[1];
      if (CHINESE_LANG_SKILL_DATA[skillKey]) {
        return new Response(buildKoreanHabitPage(skillKey, "skill", "chinese_lang"), {
          headers: { "Content-Type": "text/html;charset=UTF-8" }
        });
      }
    }

    // 중국어 회화 수준별 과정 페이지 (/language/chinese/level/{slug}/)
    const chnLangLevelMatch = path.match(/^\/language\/chinese\/level\/([^\/]+)\/?$/);
    if (chnLangLevelMatch) {
      const levelKey = chnLangLevelMatch[1];
      if (CHINESE_LANG_LEVEL_DATA[levelKey]) {
        return new Response(buildKoreanHabitPage(levelKey, "level", "chinese_lang"), {
          headers: { "Content-Type": "text/html;charset=UTF-8" }
        });
      }
    }

    // 중국어 회화 목적별 수업 페이지 (/language/chinese/purpose/{slug}/)
    const chnLangPurposeMatch = path.match(/^\/language\/chinese\/purpose\/([^\/]+)\/?$/);
    if (chnLangPurposeMatch) {
      const purposeKey = chnLangPurposeMatch[1];
      if (CHINESE_LANG_PURPOSE_DATA[purposeKey]) {
        return new Response(buildKoreanHabitPage(purposeKey, "purpose", "chinese_lang"), {
          headers: { "Content-Type": "text/html;charset=UTF-8" }
        });
      }
    }

    // 중국어 회화 진학·유학 페이지 (/language/chinese/school/{slug}/)
    const chnLangSchoolMatch = path.match(/^\/language\/chinese\/school\/([^\/]+)\/?$/);
    if (chnLangSchoolMatch) {
      const schoolKey = chnLangSchoolMatch[1];
      if (CHINESE_LANG_SCHOOL_DATA[schoolKey]) {
        return new Response(buildKoreanHabitPage(schoolKey, "school", "chinese_lang"), {
          headers: { "Content-Type": "text/html;charset=UTF-8" }
        });
      }
    }

    // 중국어 회화 비즈니스 중국어 페이지 (/language/chinese/biz/{slug}/)
    const chnLangBizMatch = path.match(/^\/language\/chinese\/biz\/([^\/]+)\/?$/);
    if (chnLangBizMatch) {
      const bizKey = chnLangBizMatch[1];
      if (CHINESE_LANG_BIZ_DATA[bizKey]) {
        return new Response(buildKoreanHabitPage(bizKey, "biz", "chinese_lang"), {
          headers: { "Content-Type": "text/html;charset=UTF-8" }
        });
      }
    }

    // 자기주도학습 페이지
    if (path === "/self-study") {
      return new Response(buildSelfStudyPage(), {
        headers: { "Content-Type": "text/html;charset=UTF-8" }
      });
    }

    // 과목별 공부법 메인 페이지
    if (path === "/study") {
      return new Response(buildStudyMainPage(), {
        headers: { "Content-Type": "text/html;charset=UTF-8" }
      });
    }

    // 과목별 허브 페이지 (준비중이면 안내 페이지)
    if (path.startsWith("/study/")) {
      // 고3 국어 시범 페이지 먼저 체크 (더 구체적인 경로가 우선)
      if (path === "/study/korean/grade/high3") {
        return new Response(buildKoreanGradeHigh3Page(), {
          headers: { "Content-Type": "text/html;charset=UTF-8" }
        });
      }

      // 학년별 페이지 (6과목 공통 - elem1/elem2/elem3 등)
      const gradeMatch = path.match(/^\/study\/(korean|english|math|science|social|history)\/grade\/([^\/]+)\/?$/);
      if (gradeMatch) {
        const subjKey = gradeMatch[1];
        const gradeKey = gradeMatch[2];
        const meta = GRADE_SUBJECT_META[subjKey];
        if (meta && meta.data()[gradeKey]) {
          return new Response(buildKoreanGradePage(gradeKey, subjKey), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 국어 학습 습관 페이지 (timing/notes/self/reading/slump)
      const habitMatch = path.match(/^\/study\/korean\/habit\/([^\/]+)\/?$/);
      if (habitMatch) {
        const habitKey = habitMatch[1];
        if (KOREAN_HABIT_DATA[habitKey]) {
          return new Response(buildKoreanHabitPage(habitKey, "habit"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 국어 수행평가 & 서술형 페이지 (descriptive/assessment)
      const performMatch = path.match(/^\/study\/korean\/perform\/([^\/]+)\/?$/);
      if (performMatch) {
        const performKey = performMatch[1];
        if (KOREAN_PERFORM_DATA[performKey]) {
          return new Response(buildKoreanHabitPage(performKey, "perform"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 국어 시험 대비 페이지 (suneung/mock/naesin/past/insert/order)
      const examMatch = path.match(/^\/study\/korean\/exam\/([^\/]+)\/?$/);
      if (examMatch) {
        const examKey = examMatch[1];
        if (KOREAN_EXAM_DATA[examKey]) {
          return new Response(buildKoreanHabitPage(examKey, "exam"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 국어 문해력 강화 페이지 (vocab/info/context/daily/digital/diagnose)
      const literacyMatch = path.match(/^\/study\/korean\/literacy\/([^\/]+)\/?$/);
      if (literacyMatch) {
        const literacyKey = literacyMatch[1];
        if (KOREAN_LITERACY_DATA[literacyKey]) {
          return new Response(buildKoreanHabitPage(literacyKey, "literacy", "korean"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 국어 독해력 향상 페이지 (skill/nonfiction/intensive/speed/theme/inference/detail/blank)
      const readingMatch = path.match(/^\/study\/korean\/reading\/([^\/]+)\/?$/);
      if (readingMatch) {
        const readingKey = readingMatch[1];
        if (KOREAN_READING_DATA[readingKey]) {
          return new Response(buildKoreanHabitPage(readingKey, "reading", "korean"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 국어 문법 완벽 정복 페이지 (guide/parts/spelling/honorific/practice/components/spacing/mistakes)
      const korGrammarMatch = path.match(/^\/study\/korean\/grammar\/([^\/]+)\/?$/);
      if (korGrammarMatch) {
        const grammarKey = korGrammarMatch[1];
        if (KOREAN_GRAMMAR_DATA[grammarKey]) {
          return new Response(buildKoreanHabitPage(grammarKey, "grammar", "korean"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 영어 수행평가 & 서술형 페이지 (descriptive/assessment)
      const engPerformMatch = path.match(/^\/study\/english\/perform\/([^\/]+)\/?$/);
      if (engPerformMatch) {
        const performKey = engPerformMatch[1];
        if (ENGLISH_PERFORM_DATA[performKey]) {
          return new Response(buildKoreanHabitPage(performKey, "perform", "english"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 영어 시험 대비 페이지 (naesin/past/mock/order/insert/suneung)
      const engExamMatch = path.match(/^\/study\/english\/exam\/([^\/]+)\/?$/);
      if (engExamMatch) {
        const examKey = engExamMatch[1];
        if (ENGLISH_EXAM_DATA[examKey]) {
          return new Response(buildKoreanHabitPage(examKey, "exam", "english"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 영어 학습 습관 페이지 (timing/notes/self/routine/slump)
      const engHabitMatch = path.match(/^\/study\/english\/habit\/([^\/]+)\/?$/);
      if (engHabitMatch) {
        const habitKey = engHabitMatch[1];
        if (ENGLISH_HABIT_DATA[habitKey]) {
          return new Response(buildKoreanHabitPage(habitKey, "habit", "english"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 영어 어휘 페이지 (basic/intermediate/advanced/idiom/phrasal/roots)
      const engVocabMatch = path.match(/^\/study\/english\/vocab\/([^\/]+)\/?$/);
      if (engVocabMatch) {
        const vocabKey = engVocabMatch[1];
        if (ENGLISH_VOCAB_DATA[vocabKey]) {
          return new Response(buildKoreanHabitPage(vocabKey, "vocab", "english"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 영문법 페이지 (guide/tense/passive/relative/conjunction/clause/conditional/mistakes)
      const engGrammarMatch = path.match(/^\/study\/english\/grammar\/([^\/]+)\/?$/);
      if (engGrammarMatch) {
        const grammarKey = engGrammarMatch[1];
        if (ENGLISH_GRAMMAR_DATA[grammarKey]) {
          return new Response(buildKoreanHabitPage(grammarKey, "grammar", "english"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 영어 독해 페이지 (skill/theme/inference/detail/blank/title/context/speed)
      const engReadingMatch = path.match(/^\/study\/english\/reading\/([^\/]+)\/?$/);
      if (engReadingMatch) {
        const readingKey = engReadingMatch[1];
        if (ENGLISH_READING_DATA[readingKey]) {
          return new Response(buildKoreanHabitPage(readingKey, "reading", "english"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 수학 수행평가 & 서술형 페이지 (descriptive/assessment)
      const mathPerformMatch = path.match(/^\/study\/math\/perform\/([^\/]+)\/?$/);
      if (mathPerformMatch) {
        const performKey = mathPerformMatch[1];
        if (MATH_PERFORM_DATA[performKey]) {
          return new Response(buildKoreanHabitPage(performKey, "perform", "math"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 수학 시험 대비 페이지 (naesin/past/killer/time/mock/suneung)
      const mathExamMatch = path.match(/^\/study\/math\/exam\/([^\/]+)\/?$/);
      if (mathExamMatch) {
        const examKey = mathExamMatch[1];
        if (MATH_EXAM_DATA[examKey]) {
          return new Response(buildKoreanHabitPage(examKey, "exam", "math"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 수학 학습 습관 페이지 (timing/notes/self/routine/slump)
      const mathHabitMatch = path.match(/^\/study\/math\/habit\/([^\/]+)\/?$/);
      if (mathHabitMatch) {
        const habitKey = mathHabitMatch[1];
        if (MATH_HABIT_DATA[habitKey]) {
          return new Response(buildKoreanHabitPage(habitKey, "habit", "math"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 수학 개념 정리 페이지 (basic/algebra/function/geometry/probability/limit/derivative/integral)
      const mathConceptMatch = path.match(/^\/study\/math\/concept\/([^\/]+)\/?$/);
      if (mathConceptMatch) {
        const conceptKey = mathConceptMatch[1];
        if (MATH_CONCEPT_DATA[conceptKey]) {
          return new Response(buildKoreanHabitPage(conceptKey, "concept", "math"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 수학 유형별 풀이 페이지 (equation/inequality/graph/proof/max-min/sequence/case/application)
      const mathTypeMatch = path.match(/^\/study\/math\/type\/([^\/]+)\/?$/);
      if (mathTypeMatch) {
        const typeKey = mathTypeMatch[1];
        if (MATH_TYPE_DATA[typeKey]) {
          return new Response(buildKoreanHabitPage(typeKey, "type", "math"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 수학 수능 영역별 페이지 (common/calculus/statistics/geometry/choice/strategy)
      const mathSuneungMatch = path.match(/^\/study\/math\/suneung\/([^\/]+)\/?$/);
      if (mathSuneungMatch) {
        const suneungKey = mathSuneungMatch[1];
        if (MATH_SUNEUNG_DATA[suneungKey]) {
          return new Response(buildKoreanHabitPage(suneungKey, "suneung", "math"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 수학 오답·실수 줄이기 페이지 (pattern/calculation/careless/misread/check)
      const mathMistakeMatch = path.match(/^\/study\/math\/mistake\/([^\/]+)\/?$/);
      if (mathMistakeMatch) {
        const mistakeKey = mathMistakeMatch[1];
        if (MATH_MISTAKE_DATA[mistakeKey]) {
          return new Response(buildKoreanHabitPage(mistakeKey, "mistake", "math"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 과학 수행평가 & 서술형 페이지 (descriptive/assessment)
      const sciPerformMatch = path.match(/^\/study\/science\/perform\/([^\/]+)\/?$/);
      if (sciPerformMatch) {
        const performKey = sciPerformMatch[1];
        if (SCIENCE_PERFORM_DATA[performKey]) {
          return new Response(buildKoreanHabitPage(performKey, "perform", "science"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 과학 시험 대비 페이지 (naesin/calculation/graph/past/mock/suneung)
      const sciExamMatch = path.match(/^\/study\/science\/exam\/([^\/]+)\/?$/);
      if (sciExamMatch) {
        const examKey = sciExamMatch[1];
        if (SCIENCE_EXAM_DATA[examKey]) {
          return new Response(buildKoreanHabitPage(examKey, "exam", "science"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 과학 생명과학 페이지 (cell/genetics/ecology/body/microbiology/practice)
      const sciBiologyMatch = path.match(/^\/study\/science\/biology\/([^\/]+)\/?$/);
      if (sciBiologyMatch) {
        const biologyKey = sciBiologyMatch[1];
        if (SCIENCE_BIOLOGY_DATA[biologyKey]) {
          return new Response(buildKoreanHabitPage(biologyKey, "biology", "science"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 과학 물리 페이지 (motion/energy/electric/wave/modern/practice)
      const sciPhysicsMatch = path.match(/^\/study\/science\/physics\/([^\/]+)\/?$/);
      if (sciPhysicsMatch) {
        const physicsKey = sciPhysicsMatch[1];
        if (SCIENCE_PHYSICS_DATA[physicsKey]) {
          return new Response(buildKoreanHabitPage(physicsKey, "physics", "science"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 과학 학습 습관 페이지 (timing/notes/self/routine/slump)
      const sciHabitMatch = path.match(/^\/study\/science\/habit\/([^\/]+)\/?$/);
      if (sciHabitMatch) {
        const habitKey = sciHabitMatch[1];
        if (SCIENCE_HABIT_DATA[habitKey]) {
          return new Response(buildKoreanHabitPage(habitKey, "habit", "science"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 사회 수행평가 & 서술형 페이지 (descriptive/assessment/debate)
      const socPerformMatch = path.match(/^\/study\/social\/perform\/([^\/]+)\/?$/);
      if (socPerformMatch) {
        const performKey = socPerformMatch[1];
        if (SOCIAL_PERFORM_DATA[performKey]) {
          return new Response(buildKoreanHabitPage(performKey, "perform", "social"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 사회 시험 대비 페이지 (naesin/graph/case/past/mock/suneung)
      const socExamMatch = path.match(/^\/study\/social\/exam\/([^\/]+)\/?$/);
      if (socExamMatch) {
        const examKey = socExamMatch[1];
        if (SOCIAL_EXAM_DATA[examKey]) {
          return new Response(buildKoreanHabitPage(examKey, "exam", "social"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 사회 학습 습관 페이지 (timing/notes/self/routine/slump)
      const socHabitMatch = path.match(/^\/study\/social\/habit\/([^\/]+)\/?$/);
      if (socHabitMatch) {
        const habitKey = socHabitMatch[1];
        if (SOCIAL_HABIT_DATA[habitKey]) {
          return new Response(buildKoreanHabitPage(habitKey, "habit", "social"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 사회·문화 페이지 (theory/culture/change/issues/practice)
      const socSocietyMatch = path.match(/^\/study\/social\/society\/([^\/]+)\/?$/);
      if (socSocietyMatch) {
        const societyKey = socSocietyMatch[1];
        if (SOCIAL_SOCIETY_DATA[societyKey]) {
          return new Response(buildKoreanHabitPage(societyKey, "society", "social"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 사회 윤리 페이지 (thought/modern/bioethics/environmental/practice)
      const socEthicsMatch = path.match(/^\/study\/social\/ethics\/([^\/]+)\/?$/);
      if (socEthicsMatch) {
        const ethicsKey = socEthicsMatch[1];
        if (SOCIAL_ETHICS_DATA[ethicsKey]) {
          return new Response(buildKoreanHabitPage(ethicsKey, "ethics", "social"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 한국사 수행평가 & 서술형 페이지 (descriptive/assessment)
      const histPerformMatch = path.match(/^\/study\/history\/perform\/([^\/]+)\/?$/);
      if (histPerformMatch) {
        const performKey = histPerformMatch[1];
        if (HISTORY_PERFORM_DATA[performKey]) {
          return new Response(buildKoreanHabitPage(performKey, "perform", "history"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 한국사 시험 대비 페이지 (naesin/timeline/material/past/mock/suneung)
      const histExamMatch = path.match(/^\/study\/history\/exam\/([^\/]+)\/?$/);
      if (histExamMatch) {
        const examKey = histExamMatch[1];
        if (HISTORY_EXAM_DATA[examKey]) {
          return new Response(buildKoreanHabitPage(examKey, "exam", "history"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 한능검 페이지 (overview/basic/intermediate/timeline/material/strategy)
      const histCertMatch = path.match(/^\/study\/history\/cert\/([^\/]+)\/?$/);
      if (histCertMatch) {
        const certKey = histCertMatch[1];
        if (HISTORY_CERT_DATA[certKey]) {
          return new Response(buildKoreanHabitPage(certKey, "cert", "history"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 한국사 시대별 정리 페이지 (prehistoric/gojoseon/samguk/nambukguk/goryeo/joseon/opening/modern)
      const histPeriodMatch = path.match(/^\/study\/history\/period\/([^\/]+)\/?$/);
      if (histPeriodMatch) {
        const periodKey = histPeriodMatch[1];
        if (HISTORY_PERIOD_DATA[periodKey]) {
          return new Response(buildKoreanHabitPage(periodKey, "period", "history"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      // 한국사 학습 습관 페이지 (timing/notes/self/routine/slump)
      const histHabitMatch = path.match(/^\/study\/history\/habit\/([^\/]+)\/?$/);
      if (histHabitMatch) {
        const habitKey = histHabitMatch[1];
        if (HISTORY_HABIT_DATA[habitKey]) {
          return new Response(buildKoreanHabitPage(habitKey, "habit", "history"), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }

      const subjectKey = path.replace(/^\/study\//, "").replace(/\/$/, "").split("/")[0];
      const SUBJECT_NAMES = { korean:"국어", english:"영어", math:"수학", science:"과학", social:"사회", history:"한국사" };
      if (SUBJECT_NAMES[subjectKey]) {
        // 출시된 페이지는 실제 허브 페이지로 연결
        if (STUDY_READY[subjectKey]) {
          if (subjectKey === "korean") {
            // 국어 하위 경로 처리: 허브 페이지가 아닌 미완성 세부 경로면 준비중
            const subPath = path.replace(/^\/study\/korean/, "").replace(/\/$/, "");
            if (subPath === "" || subPath === "/") {
              return new Response(buildKoreanHubPage(), {
                headers: { "Content-Type": "text/html;charset=UTF-8" }
              });
            }
            // 미완성 세부 페이지는 준비중 안내
            return new Response(buildStudyComingSoonPage("국어", "korean"), {
              headers: { "Content-Type": "text/html;charset=UTF-8" }
            });
          }
          // 영어·수학·과학·사회·한국사 — 일반화된 허브 빌더 사용
          if (SUBJECT_HUB_DATA[subjectKey]) {
            const subPath = path.replace(`/study/${subjectKey}`, "").replace(/\/$/, "");
            if (subPath === "" || subPath === "/") {
              return new Response(buildSubjectHubPage(subjectKey), {
                headers: { "Content-Type": "text/html;charset=UTF-8" }
              });
            }
            // 세부 페이지는 아직 준비중
            return new Response(buildStudyComingSoonPage(SUBJECT_NAMES[subjectKey], subjectKey), {
              headers: { "Content-Type": "text/html;charset=UTF-8" }
            });
          }
        } else {
          // 준비중이면 안내 페이지
          return new Response(buildStudyComingSoonPage(SUBJECT_NAMES[subjectKey], subjectKey), {
            headers: { "Content-Type": "text/html;charset=UTF-8" }
          });
        }
      }
    }

    // 학교 목록 페이지
    if (path === "/schools") {
      return new Response(buildSchoolsPage(), {
        headers: { "Content-Type": "text/html;charset=UTF-8" }
      });
    }

    // 시도별 학교 페이지 (/schools/경기도/ 등)
    if (path.startsWith("/schools/")) {
      const sidoSlug = decodeURIComponent(path.replace(/^\/schools\//, "").replace(/\/$/, ""));
      const VALID_SIDOS = [...new Set([...SCHOOLS_ELEM, ...SCHOOLS_MIDDLE, ...SCHOOLS_HIGH].map(([s]) => s))];
      // 슬러그→시도명 매칭 (공백을 하이픈으로 변환한 경우 대응)
      const matchedSido = VALID_SIDOS.find(s => s === sidoSlug || s.replace(/ /g,"-") === sidoSlug);
      if (matchedSido) {
        return new Response(buildSchoolsSidoPage(matchedSido), {
          headers: { "Content-Type": "text/html;charset=UTF-8" }
        });
      }
    }

    // 학교별 과목 과외 페이지 (/school/중-시도-시군구-학교명-과목-과외/ 또는 /school/고-...)
    if (path.startsWith("/school/") && path.endsWith("-과외")) {
      const slug = path.replace(/^\/school\//, "").replace(/\/$/, "");
      const SUBJ_LIST = ["국어","영어","수학","과학","사회","한국사"];
      for (const subj of SUBJ_LIST) {
        const suffix = "-" + subj + "-과외";
        if (slug.endsWith(suffix)) {
          const schoolSlug = slug.slice(0, slug.length - suffix.length);
          const isMiddle = schoolSlug.startsWith("중-");
          const isHigh = schoolSlug.startsWith("고-");
          const isElem = schoolSlug.startsWith("초-");
          const schoolsArr = isMiddle ? SCHOOLS_MIDDLE : isHigh ? SCHOOLS_HIGH : isElem ? SCHOOLS_ELEM : null;
          if (!schoolsArr) break;
          const cleanSlug = schoolSlug.slice(2);
          const level = isMiddle ? "중등" : isHigh ? "고등" : "초등";
          for (const [sido, sigungu, name] of schoolsArr) {
            const candidate = (sido + "-" + sigungu + "-" + name).replace(/ /g, "-");
            if (cleanSlug === candidate) {
              return new Response(buildSchoolSubjectPage(sido, sigungu, name, subj, level), {
                headers: { "Content-Type": "text/html;charset=UTF-8" }
              });
            }
          }
        }
      }
    }

    // 학교별 과외 페이지 (/school/중-시도-시군구-학교명/ 또는 /school/고-...)
    if (path.startsWith("/school/")) {
      const schoolSlug = path.replace(/^\/school\//, "").replace(/\/$/, "");
      const isMiddle = schoolSlug.startsWith("중-");
      const isHigh = schoolSlug.startsWith("고-");
      const isElem = schoolSlug.startsWith("초-");
      const schoolsArr = isMiddle ? SCHOOLS_MIDDLE : isHigh ? SCHOOLS_HIGH : isElem ? SCHOOLS_ELEM : null;
      if (schoolsArr) {
        const cleanSlug = schoolSlug.slice(2);
        const level = isMiddle ? "중등" : isHigh ? "고등" : "초등";
        for (const [sido, sigungu, name] of schoolsArr) {
          const candidate = (sido + "-" + sigungu + "-" + name).replace(/ /g, "-");
          if (cleanSlug === candidate) {
            return new Response(buildSchoolPage(sido, sigungu, name, level), {
              headers: { "Content-Type": "text/html;charset=UTF-8" }
            });
          }
        }
      }
    }

    // 세부 페이지 라우팅
    const slug = path.replace(/^\//, "");
    if (VALID_SLUGS.has(slug)) {
      const parsed = parseSlug(slug);
      if (parsed) {
        const { city, gu, dong, grade, subject } = parsed;
        return new Response(buildDetailPage(city, gu, dong, grade, subject, slug), {
          headers: { "Content-Type": "text/html;charset=UTF-8" }
        });
      }
    }

    // 404
    return new Response(build404Page(), {
      status: 404,
      headers: { "Content-Type": "text/html;charset=UTF-8" }
    });
  }
};
