// ================================================================
// builders/sitemap.js — 사이트맵 + 리디렉션 + IndexNow 알림
// 변경 빈도: 낮음 (새 페이지 카테고리 추가 시 sitemap-static에 URL 추가)
// 의존:
//   - data/areas.js (AREAS)
//   - data/schools.js (SCHOOLS_ELEM/MIDDLE/HIGH)
//   - slug.js (REDIRECT_MAP)
//
// ⚠️ 원본 worker.js에서는 함수 내부에서 GRADES/SUBJS를 로컬 재선언했음
//   분할 후에도 동작 보존을 위해 그대로 유지 (config.js import로 바꿔도 무방)
//
// 라우팅:
//   /sitemap.xml             — 사이트맵 인덱스
//   /sitemap-static.xml      — 정적 페이지 (메인/허브/카테고리 등)
//   /sitemap-areas.xml       — 지역×학년×과목 (54,414개)
//   /sitemap-schools-1.xml   — 초등학교 (6,307개 × 6과목)
//   /sitemap-schools-2.xml   — 중학교 (3,301개 × 6과목)
//   /sitemap-schools-3.xml   — 고등학교 (2,376개 × 6과목)
// ================================================================

import { AREAS } from '../data/areas.js';
import { SCHOOLS_ELEM, SCHOOLS_MIDDLE, SCHOOLS_HIGH } from '../data/schools.js';
import { REDIRECT_MAP } from '../slug.js';


// ── 사이트맵 (동적 생성) ──────────────────────────────────────
export function handleSitemap(path) {
  const headers = { "Content-Type": "application/xml;charset=UTF-8" };
  const today = new Date().toISOString().slice(0,10);
  const BASE = "https://zenastudyfit.com";
  const GRADES = ["초등","중등","고등"];
  const SUBJS = ["국어","영어","수학","과학","사회","한국사"];

  function u(loc, pri="0.7") {
    return `<url><loc>${loc}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${pri}</priority></url>`;
  }

  if (path === "/sitemap.xml") {
    const xml = `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${BASE}/sitemap-static.xml</loc><lastmod>${today}</lastmod></sitemap><sitemap><loc>${BASE}/sitemap-areas.xml</loc><lastmod>${today}</lastmod></sitemap><sitemap><loc>${BASE}/sitemap-schools-1.xml</loc><lastmod>${today}</lastmod></sitemap><sitemap><loc>${BASE}/sitemap-schools-2.xml</loc><lastmod>${today}</lastmod></sitemap><sitemap><loc>${BASE}/sitemap-schools-3.xml</loc><lastmod>${today}</lastmod></sitemap></sitemapindex>`;
    return new Response(xml, { headers });
  }

  if (path === "/sitemap-static.xml") {
    let urls = u(`${BASE}/`,"1.0") + u(`${BASE}/regions/`,"0.9") + u(`${BASE}/schools/`,"0.9") + u(`${BASE}/academy/intro/`,"0.85") + u(`${BASE}/academy/location/`,"0.85") + u(`${BASE}/self-study/`,"0.8") + u(`${BASE}/coding/`,"0.8") + u(`${BASE}/language/english/`,"0.85") + u(`${BASE}/language/japanese/`,"0.85") + u(`${BASE}/language/chinese/`,"0.85") + u(`${BASE}/language/english/skill/`,"0.8") + u(`${BASE}/language/english/level/`,"0.8") + u(`${BASE}/language/english/cert/`,"0.8") + u(`${BASE}/language/english/biz/`,"0.8") + u(`${BASE}/language/english/purpose/`,"0.8") + u(`${BASE}/language/english/school/`,"0.8") + u(`${BASE}/language/japanese/skill/`,"0.8") + u(`${BASE}/language/japanese/level/`,"0.8") + u(`${BASE}/language/japanese/cert/`,"0.8") + u(`${BASE}/language/japanese/biz/`,"0.8") + u(`${BASE}/language/japanese/purpose/`,"0.8") + u(`${BASE}/language/japanese/school/`,"0.8") + u(`${BASE}/language/chinese/skill/`,"0.8") + u(`${BASE}/language/chinese/level/`,"0.8") + u(`${BASE}/language/chinese/cert/`,"0.8") + u(`${BASE}/language/chinese/biz/`,"0.8") + u(`${BASE}/language/chinese/purpose/`,"0.8") + u(`${BASE}/language/chinese/school/`,"0.8") + u(`${BASE}/study/`,"0.9") + u(`${BASE}/study/korean/`,"0.85") + u(`${BASE}/study/english/`,"0.85") + u(`${BASE}/study/math/`,"0.85") + u(`${BASE}/study/science/`,"0.85") + u(`${BASE}/study/social/`,"0.85") + u(`${BASE}/study/history/`,"0.85") + u(`${BASE}/study/english/grade/elem1/`,"0.75") + u(`${BASE}/study/english/grade/elem2/`,"0.75") + u(`${BASE}/study/english/grade/elem3/`,"0.75") + u(`${BASE}/study/english/grade/elem4/`,"0.75") + u(`${BASE}/study/english/grade/elem5/`,"0.75") + u(`${BASE}/study/english/grade/elem6/`,"0.75") + u(`${BASE}/study/english/grade/pre-mid1/`,"0.75") + u(`${BASE}/study/english/grade/mid1/`,"0.75") + u(`${BASE}/study/english/grade/mid2/`,"0.75") + u(`${BASE}/study/english/grade/mid3/`,"0.75") + u(`${BASE}/study/english/grade/pre-high1/`,"0.75") + u(`${BASE}/study/english/grade/high1/`,"0.75") + u(`${BASE}/study/english/grade/high2/`,"0.75") + u(`${BASE}/study/english/grade/high3/`,"0.75") + u(`${BASE}/study/math/grade/elem1/`,"0.75") + u(`${BASE}/study/math/grade/elem2/`,"0.75") + u(`${BASE}/study/math/grade/elem3/`,"0.75") + u(`${BASE}/study/math/grade/elem4/`,"0.75") + u(`${BASE}/study/math/grade/elem5/`,"0.8") + u(`${BASE}/study/math/grade/elem6/`,"0.75") + u(`${BASE}/study/math/grade/pre-mid1/`,"0.75") + u(`${BASE}/study/math/grade/mid1/`,"0.8") + u(`${BASE}/study/math/grade/mid2/`,"0.8") + u(`${BASE}/study/math/grade/mid3/`,"0.75") + u(`${BASE}/study/math/grade/pre-high1/`,"0.75") + u(`${BASE}/study/math/grade/high1/`,"0.85") + u(`${BASE}/study/math/grade/high2/`,"0.85") + u(`${BASE}/study/math/grade/high3/`,"0.85") + u(`${BASE}/study/science/grade/elem1/`,"0.7") + u(`${BASE}/study/science/grade/elem2/`,"0.7") + u(`${BASE}/study/science/grade/elem3/`,"0.75") + u(`${BASE}/study/science/grade/elem4/`,"0.75") + u(`${BASE}/study/science/grade/elem5/`,"0.75") + u(`${BASE}/study/science/grade/elem6/`,"0.75") + u(`${BASE}/study/science/grade/pre-mid1/`,"0.75") + u(`${BASE}/study/science/grade/mid1/`,"0.75") + u(`${BASE}/study/science/grade/mid2/`,"0.8") + u(`${BASE}/study/science/grade/mid3/`,"0.8") + u(`${BASE}/study/science/grade/pre-high1/`,"0.8") + u(`${BASE}/study/science/grade/high1/`,"0.85") + u(`${BASE}/study/science/grade/high2/`,"0.85") + u(`${BASE}/study/science/grade/high3/`,"0.85") + u(`${BASE}/study/social/grade/elem1/`,"0.7") + u(`${BASE}/study/social/grade/elem2/`,"0.7") + u(`${BASE}/study/social/grade/elem3/`,"0.75") + u(`${BASE}/study/social/grade/elem4/`,"0.75") + u(`${BASE}/study/social/grade/elem5/`,"0.8") + u(`${BASE}/study/social/grade/elem6/`,"0.75") + u(`${BASE}/study/social/grade/pre-mid1/`,"0.75") + u(`${BASE}/study/social/grade/mid1/`,"0.75") + u(`${BASE}/study/social/grade/mid2/`,"0.8") + u(`${BASE}/study/social/grade/mid3/`,"0.8") + u(`${BASE}/study/social/grade/pre-high1/`,"0.8") + u(`${BASE}/study/social/grade/high1/`,"0.85") + u(`${BASE}/study/social/grade/high2/`,"0.85") + u(`${BASE}/study/social/grade/high3/`,"0.85") + u(`${BASE}/study/history/grade/elem1/`,"0.7") + u(`${BASE}/study/history/grade/elem2/`,"0.7") + u(`${BASE}/study/history/grade/elem3/`,"0.75") + u(`${BASE}/study/history/grade/elem4/`,"0.75") + u(`${BASE}/study/history/grade/elem5/`,"0.8") + u(`${BASE}/study/history/grade/elem6/`,"0.8") + u(`${BASE}/study/history/grade/pre-mid1/`,"0.75") + u(`${BASE}/study/history/grade/mid1/`,"0.75") + u(`${BASE}/study/history/grade/mid2/`,"0.8") + u(`${BASE}/study/history/grade/mid3/`,"0.8") + u(`${BASE}/study/history/grade/pre-high1/`,"0.8") + u(`${BASE}/study/history/grade/high1/`,"0.85") + u(`${BASE}/study/history/grade/high2/`,"0.85") + u(`${BASE}/study/history/grade/high3/`,"0.85") + u(`${BASE}/study/korean/grade/high3/`,"0.8") + u(`${BASE}/study/korean/grade/elem1/`,"0.75") + u(`${BASE}/study/korean/grade/elem2/`,"0.75") + u(`${BASE}/study/korean/grade/elem3/`,"0.75") + u(`${BASE}/study/korean/grade/elem4/`,"0.75") + u(`${BASE}/study/korean/grade/elem5/`,"0.75") + u(`${BASE}/study/korean/grade/elem6/`,"0.75") + u(`${BASE}/study/korean/grade/pre-mid1/`,"0.75") + u(`${BASE}/study/korean/grade/mid1/`,"0.75") + u(`${BASE}/study/korean/grade/mid2/`,"0.75") + u(`${BASE}/study/korean/grade/mid3/`,"0.75") + u(`${BASE}/study/korean/grade/pre-high1/`,"0.75") + u(`${BASE}/study/korean/grade/high1/`,"0.75") + u(`${BASE}/study/korean/grade/high2/`,"0.75") + u(`${BASE}/study/korean/habit/timing/`,"0.7") + u(`${BASE}/study/korean/habit/notes/`,"0.7") + u(`${BASE}/study/korean/habit/self/`,"0.7") + u(`${BASE}/study/korean/habit/reading/`,"0.7") + u(`${BASE}/study/korean/habit/slump/`,"0.7") + u(`${BASE}/study/korean/perform/descriptive/`,"0.8") + u(`${BASE}/study/korean/perform/assessment/`,"0.8") + u(`${BASE}/study/korean/exam/suneung/`,"0.75") + u(`${BASE}/study/korean/exam/mock/`,"0.7") + u(`${BASE}/study/korean/exam/naesin/`,"0.75") + u(`${BASE}/study/korean/exam/past/`,"0.7") + u(`${BASE}/study/korean/exam/insert/`,"0.65") + u(`${BASE}/study/korean/exam/order/`,"0.65") + u(`${BASE}/study/korean/literacy/vocab/`,"0.8") + u(`${BASE}/study/korean/literacy/info/`,"0.8") + u(`${BASE}/study/korean/literacy/context/`,"0.8") + u(`${BASE}/study/korean/literacy/daily/`,"0.8") + u(`${BASE}/study/korean/literacy/digital/`,"0.8") + u(`${BASE}/study/korean/literacy/diagnose/`,"0.8") + u(`${BASE}/study/korean/reading/skill/`,"0.8") + u(`${BASE}/study/korean/reading/nonfiction/`,"0.8") + u(`${BASE}/study/korean/reading/intensive/`,"0.8") + u(`${BASE}/study/korean/reading/detail/`,"0.8") + u(`${BASE}/study/korean/reading/speed/`,"0.8") + u(`${BASE}/study/korean/reading/theme/`,"0.8") + u(`${BASE}/study/korean/reading/inference/`,"0.8") + u(`${BASE}/study/korean/reading/blank/`,"0.8") + u(`${BASE}/study/korean/grammar/guide/`,"0.8") + u(`${BASE}/study/korean/grammar/parts/`,"0.8") + u(`${BASE}/study/korean/grammar/spelling/`,"0.8") + u(`${BASE}/study/korean/grammar/honorific/`,"0.8") + u(`${BASE}/study/korean/grammar/practice/`,"0.8") + u(`${BASE}/study/korean/grammar/components/`,"0.8") + u(`${BASE}/study/korean/grammar/spacing/`,"0.8") + u(`${BASE}/study/korean/grammar/mistakes/`,"0.8") + u(`${BASE}/study/korean/writing/basic/`,"0.8") + u(`${BASE}/study/korean/writing/diary/`,"0.75") + u(`${BASE}/study/korean/writing/book-report/`,"0.8") + u(`${BASE}/study/korean/writing/argument/`,"0.85") + u(`${BASE}/study/korean/writing/summary/`,"0.8") + u(`${BASE}/study/korean/writing/essay/`,"0.8") + u(`${BASE}/study/korean/writing/creative/`,"0.7") + u(`${BASE}/study/korean/writing/revision/`,"0.75") + u(`${BASE}/study/korean/literature/guide/`,"0.85") + u(`${BASE}/study/korean/literature/poem/`,"0.85") + u(`${BASE}/study/korean/literature/novel/`,"0.85") + u(`${BASE}/study/korean/literature/modern-poem/`,"0.8") + u(`${BASE}/study/korean/literature/modern-novel/`,"0.8") + u(`${BASE}/study/korean/literature/criticism/`,"0.8") + u(`${BASE}/study/korean/vocab/method/`,"0.85") + u(`${BASE}/study/korean/vocab/sino/`,"0.8") + u(`${BASE}/study/korean/vocab/idiom/`,"0.8") + u(`${BASE}/study/korean/vocab/synonym/`,"0.8") + u(`${BASE}/study/korean/classic/intro/`,"0.85") + u(`${BASE}/study/korean/classic/sijo/`,"0.85") + u(`${BASE}/study/korean/classic/gasa/`,"0.8") + u(`${BASE}/study/korean/classic/hyangga/`,"0.8") + u(`${BASE}/study/korean/classic/pansori/`,"0.8") + u(`${BASE}/study/korean/classic/folklore/`,"0.8") + u(`${BASE}/study/korean/classic/history/`,"0.8") + u(`${BASE}/study/english/perform/descriptive/`,"0.8") + u(`${BASE}/study/english/perform/assessment/`,"0.8") + u(`${BASE}/study/english/exam/naesin/`,"0.75") + u(`${BASE}/study/english/exam/past/`,"0.75") + u(`${BASE}/study/english/exam/mock/`,"0.7") + u(`${BASE}/study/english/exam/order/`,"0.65") + u(`${BASE}/study/english/exam/insert/`,"0.65") + u(`${BASE}/study/english/exam/suneung/`,"0.75") + u(`${BASE}/study/english/habit/timing/`,"0.7") + u(`${BASE}/study/english/habit/notes/`,"0.7") + u(`${BASE}/study/english/habit/self/`,"0.7") + u(`${BASE}/study/english/habit/routine/`,"0.7") + u(`${BASE}/study/english/habit/slump/`,"0.7") + u(`${BASE}/study/english/vocab/basic/`,"0.8") + u(`${BASE}/study/english/vocab/intermediate/`,"0.8") + u(`${BASE}/study/english/vocab/advanced/`,"0.8") + u(`${BASE}/study/english/vocab/idiom/`,"0.75") + u(`${BASE}/study/english/vocab/phrasal/`,"0.75") + u(`${BASE}/study/english/vocab/roots/`,"0.75") + u(`${BASE}/study/english/grammar/guide/`,"0.8") + u(`${BASE}/study/english/grammar/tense/`,"0.8") + u(`${BASE}/study/english/grammar/passive/`,"0.8") + u(`${BASE}/study/english/grammar/relative/`,"0.8") + u(`${BASE}/study/english/grammar/conjunction/`,"0.8") + u(`${BASE}/study/english/grammar/clause/`,"0.8") + u(`${BASE}/study/english/grammar/conditional/`,"0.8") + u(`${BASE}/study/english/grammar/mistakes/`,"0.8") + u(`${BASE}/study/english/reading/skill/`,"0.8") + u(`${BASE}/study/english/reading/theme/`,"0.8") + u(`${BASE}/study/english/reading/inference/`,"0.8") + u(`${BASE}/study/english/reading/detail/`,"0.8") + u(`${BASE}/study/english/reading/blank/`,"0.8") + u(`${BASE}/study/english/reading/title/`,"0.8") + u(`${BASE}/study/english/reading/context/`,"0.8") + u(`${BASE}/study/english/reading/speed/`,"0.8") + u(`${BASE}/study/math/perform/descriptive/`,"0.8") + u(`${BASE}/study/math/perform/assessment/`,"0.8") + u(`${BASE}/study/math/exam/naesin/`,"0.75") + u(`${BASE}/study/math/exam/past/`,"0.75") + u(`${BASE}/study/math/exam/killer/`,"0.7") + u(`${BASE}/study/math/exam/time/`,"0.65") + u(`${BASE}/study/math/exam/mock/`,"0.7") + u(`${BASE}/study/math/exam/suneung/`,"0.75") + u(`${BASE}/study/math/habit/timing/`,"0.7") + u(`${BASE}/study/math/habit/notes/`,"0.7") + u(`${BASE}/study/math/habit/self/`,"0.7") + u(`${BASE}/study/math/habit/routine/`,"0.7") + u(`${BASE}/study/math/habit/slump/`,"0.7") + u(`${BASE}/study/math/concept/basic/`,"0.8") + u(`${BASE}/study/math/concept/algebra/`,"0.8") + u(`${BASE}/study/math/concept/function/`,"0.85") + u(`${BASE}/study/math/concept/geometry/`,"0.8") + u(`${BASE}/study/math/concept/probability/`,"0.8") + u(`${BASE}/study/math/concept/limit/`,"0.8") + u(`${BASE}/study/math/concept/derivative/`,"0.85") + u(`${BASE}/study/math/concept/integral/`,"0.85") + u(`${BASE}/study/math/type/equation/`,"0.8") + u(`${BASE}/study/math/type/inequality/`,"0.8") + u(`${BASE}/study/math/type/graph/`,"0.8") + u(`${BASE}/study/math/type/proof/`,"0.8") + u(`${BASE}/study/math/type/max-min/`,"0.8") + u(`${BASE}/study/math/type/sequence/`,"0.8") + u(`${BASE}/study/math/type/case/`,"0.8") + u(`${BASE}/study/math/type/application/`,"0.8") + u(`${BASE}/study/math/suneung/common/`,"0.8") + u(`${BASE}/study/math/suneung/calculus/`,"0.85") + u(`${BASE}/study/math/suneung/statistics/`,"0.8") + u(`${BASE}/study/math/suneung/geometry/`,"0.75") + u(`${BASE}/study/math/suneung/choice/`,"0.8") + u(`${BASE}/study/math/suneung/strategy/`,"0.8") + u(`${BASE}/study/math/mistake/pattern/`,"0.85") + u(`${BASE}/study/math/mistake/calculation/`,"0.8") + u(`${BASE}/study/math/mistake/careless/`,"0.75") + u(`${BASE}/study/math/mistake/misread/`,"0.8") + u(`${BASE}/study/math/mistake/check/`,"0.8") + u(`${BASE}/study/math/high/calculus-basic/`,"0.8") + u(`${BASE}/study/math/high/calculus-advanced/`,"0.85") + u(`${BASE}/study/math/high/statistics-basic/`,"0.8") + u(`${BASE}/study/math/high/statistics-advanced/`,"0.8") + u(`${BASE}/study/math/high/geometry-basic/`,"0.75") + u(`${BASE}/study/math/high/geometry-advanced/`,"0.75") + u(`${BASE}/study/science/perform/descriptive/`,"0.8") + u(`${BASE}/study/science/perform/assessment/`,"0.8") + u(`${BASE}/study/science/exam/naesin/`,"0.75") + u(`${BASE}/study/science/exam/calculation/`,"0.7") + u(`${BASE}/study/science/exam/graph/`,"0.7") + u(`${BASE}/study/science/exam/past/`,"0.75") + u(`${BASE}/study/science/exam/mock/`,"0.7") + u(`${BASE}/study/science/exam/suneung/`,"0.75") + u(`${BASE}/study/science/habit/timing/`,"0.7") + u(`${BASE}/study/science/habit/notes/`,"0.7") + u(`${BASE}/study/science/habit/self/`,"0.7") + u(`${BASE}/study/science/habit/routine/`,"0.7") + u(`${BASE}/study/science/habit/slump/`,"0.7") + u(`${BASE}/study/social/perform/descriptive/`,"0.8") + u(`${BASE}/study/social/perform/assessment/`,"0.8") + u(`${BASE}/study/social/perform/debate/`,"0.8") + u(`${BASE}/study/social/exam/naesin/`,"0.75") + u(`${BASE}/study/social/exam/graph/`,"0.7") + u(`${BASE}/study/social/exam/case/`,"0.7") + u(`${BASE}/study/social/exam/past/`,"0.75") + u(`${BASE}/study/social/exam/mock/`,"0.7") + u(`${BASE}/study/social/exam/suneung/`,"0.75") + u(`${BASE}/study/social/habit/timing/`,"0.7") + u(`${BASE}/study/social/habit/notes/`,"0.7") + u(`${BASE}/study/social/habit/self/`,"0.7") + u(`${BASE}/study/social/habit/routine/`,"0.7") + u(`${BASE}/study/social/habit/slump/`,"0.7") + u(`${BASE}/study/social/society/theory/`,"0.8") + u(`${BASE}/study/social/society/culture/`,"0.8") + u(`${BASE}/study/social/society/change/`,"0.8") + u(`${BASE}/study/social/society/issues/`,"0.8") + u(`${BASE}/study/social/society/practice/`,"0.8") + u(`${BASE}/study/social/ethics/thought/`,"0.8") + u(`${BASE}/study/social/ethics/modern/`,"0.8") + u(`${BASE}/study/social/ethics/bioethics/`,"0.8") + u(`${BASE}/study/social/ethics/environmental/`,"0.8") + u(`${BASE}/study/social/ethics/practice/`,"0.8") + u(`${BASE}/study/history/perform/descriptive/`,"0.8") + u(`${BASE}/study/history/perform/assessment/`,"0.8") + u(`${BASE}/study/history/exam/naesin/`,"0.75") + u(`${BASE}/study/history/exam/timeline/`,"0.7") + u(`${BASE}/study/history/exam/material/`,"0.7") + u(`${BASE}/study/history/exam/past/`,"0.75") + u(`${BASE}/study/history/exam/mock/`,"0.7") + u(`${BASE}/study/history/exam/suneung/`,"0.75") + u(`${BASE}/study/history/cert/overview/`,"0.75") + u(`${BASE}/study/history/cert/basic/`,"0.7") + u(`${BASE}/study/history/cert/intermediate/`,"0.75") + u(`${BASE}/study/history/cert/timeline/`,"0.7") + u(`${BASE}/study/history/cert/material/`,"0.7") + u(`${BASE}/study/history/cert/strategy/`,"0.7") + u(`${BASE}/study/history/habit/timing/`,"0.7") + u(`${BASE}/study/history/habit/notes/`,"0.7") + u(`${BASE}/study/history/habit/self/`,"0.7") + u(`${BASE}/study/history/habit/routine/`,"0.7") + u(`${BASE}/study/history/habit/slump/`,"0.7") + u(`${BASE}/study/history/period/prehistoric/`,"0.75") + u(`${BASE}/study/history/period/gojoseon/`,"0.75") + u(`${BASE}/study/history/period/samguk/`,"0.8") + u(`${BASE}/study/history/period/nambukguk/`,"0.75") + u(`${BASE}/study/history/period/goryeo/`,"0.8") + u(`${BASE}/study/history/period/joseon/`,"0.85") + u(`${BASE}/study/history/period/opening/`,"0.75") + u(`${BASE}/study/history/period/colonial/`,"0.8") + u(`${BASE}/study/history/period/modern/`,"0.75") + u(`${BASE}/study/science/biology/cell/`,"0.8") + u(`${BASE}/study/science/biology/genetics/`,"0.85") + u(`${BASE}/study/science/biology/ecology/`,"0.75") + u(`${BASE}/study/science/biology/body/`,"0.8") + u(`${BASE}/study/science/biology/microbiology/`,"0.75") + u(`${BASE}/study/science/biology/practice/`,"0.85") + u(`${BASE}/study/science/physics/mechanics/`,"0.85") + u(`${BASE}/study/science/physics/energy/`,"0.8") + u(`${BASE}/study/science/physics/electricity/`,"0.85") + u(`${BASE}/study/science/physics/wave/`,"0.75") + u(`${BASE}/study/science/physics/modern/`,"0.75") + u(`${BASE}/study/science/physics/practice/`,"0.85") + u(`${BASE}/study/science/chemistry/atom/`,"0.8") + u(`${BASE}/study/science/chemistry/bond/`,"0.8") + u(`${BASE}/study/science/chemistry/reaction/`,"0.85") + u(`${BASE}/study/science/chemistry/acid/`,"0.8") + u(`${BASE}/study/science/chemistry/organic/`,"0.75") + u(`${BASE}/study/science/chemistry/practice/`,"0.85") + u(`${BASE}/study/science/earth/astronomy/`,"0.85") + u(`${BASE}/study/science/earth/geology/`,"0.8") + u(`${BASE}/study/science/earth/atmosphere/`,"0.8") + u(`${BASE}/study/science/earth/ocean/`,"0.75") + u(`${BASE}/study/science/earth/climate/`,"0.8") + u(`${BASE}/study/science/earth/practice/`,"0.85") + u(`${BASE}/study/science/integrated/overview/`,"0.85") + u(`${BASE}/study/science/integrated/matter/`,"0.85") + u(`${BASE}/study/science/integrated/system/`,"0.85") + u(`${BASE}/study/science/integrated/evolution/`,"0.8") + u(`${BASE}/study/science/integrated/environment/`,"0.85") + u(`${BASE}/study/science/integrated/future/`,"0.8") + u(`${BASE}/language/chinese/cert/hsk-34/`,"0.85") + u(`${BASE}/language/chinese/cert/hsk-56/`,"0.8") + u(`${BASE}/language/chinese/level/beginner/`,"0.85") + u(`${BASE}/language/chinese/skill/tones/`,"0.8") + u(`${BASE}/language/chinese/skill/pinyin/`,"0.8") + u(`${BASE}/language/chinese/cert/hsk-12/`,"0.8") + u(`${BASE}/language/chinese/level/elementary/`,"0.8") + u(`${BASE}/language/chinese/level/intermediate/`,"0.8") + u(`${BASE}/language/chinese/purpose/travel/`,"0.8") + u(`${BASE}/language/chinese/school/foreign-lang/`,"0.8") + u(`${BASE}/language/chinese/cert/hskk/`,"0.75") + u(`${BASE}/language/chinese/skill/hanzi/`,"0.75") + u(`${BASE}/language/chinese/skill/grammar/`,"0.75") + u(`${BASE}/language/chinese/skill/speaking/`,"0.75") + u(`${BASE}/language/chinese/level/advanced/`,"0.75") + u(`${BASE}/language/chinese/purpose/drama/`,"0.75") + u(`${BASE}/language/chinese/school/naesin/`,"0.75") + u(`${BASE}/language/chinese/biz/meeting/`,"0.85") + u(`${BASE}/language/chinese/biz/email/`,"0.8") + u(`${BASE}/language/chinese/biz/presentation/`,"0.75") + u(`${BASE}/language/chinese/biz/culture/`,"0.7") + u(`${BASE}/language/chinese/purpose/cpop/`,"0.7") + u(`${BASE}/language/chinese/purpose/idiom/`,"0.7") + u(`${BASE}/language/chinese/school/univ-china/`,"0.75");
    const allSidos = [...new Set([...SCHOOLS_ELEM,...SCHOOLS_MIDDLE,...SCHOOLS_HIGH].map(([s])=>s))];
    for (const sido of allSidos) {
      urls += u(`${BASE}/schools/${sido}/`.replace(/ /g,"-"), "0.8");
    }
    return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers });
  }

  if (path === "/sitemap-areas.xml") {
    let urls = "";
    for (const [city, gu, dong] of AREAS) {
      for (const grade of GRADES) {
        for (const subj of SUBJS) {
          const slug = (city+"-"+gu+"-"+dong+"-"+grade+"-"+subj+"-과외").replace(/ /g,"-");
          urls += u(`${BASE}/${slug}/`);
        }
      }
    }
    return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers });
  }

  // 학교 사이트맵 — 3개로 분할 (초등 / 중등 / 고등)
  if (path === "/sitemap-schools-1.xml") {
    let urls = "";
    for (const [sido, sigungu, name] of SCHOOLS_ELEM) {
      const base = ("초-"+sido+"-"+sigungu+"-"+name).replace(/ /g,"-").replace(/[?#&=+%]/g,"");
      urls += u(`${BASE}/school/${base}/`);
      for (const subj of SUBJS) urls += u(`${BASE}/school/${base}-${subj}-과외/`);
    }
    return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers });
  }

  if (path === "/sitemap-schools-2.xml") {
    let urls = "";
    for (const [sido, sigungu, name] of SCHOOLS_MIDDLE) {
      const base = ("중-"+sido+"-"+sigungu+"-"+name).replace(/ /g,"-").replace(/[?#&=+%]/g,"");
      urls += u(`${BASE}/school/${base}/`);
      for (const subj of SUBJS) urls += u(`${BASE}/school/${base}-${subj}-과외/`);
    }
    return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers });
  }

  if (path === "/sitemap-schools-3.xml") {
    let urls = "";
    for (const [sido, sigungu, name] of SCHOOLS_HIGH) {
      const base = ("고-"+sido+"-"+sigungu+"-"+name).replace(/ /g,"-").replace(/[?#&=+%]/g,"");
      urls += u(`${BASE}/school/${base}/`);
      for (const subj of SUBJS) urls += u(`${BASE}/school/${base}-${subj}-과외/`);
    }
    return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers });
  }

  return null;
}

// ── 이전 URL 리다이렉트 ───────────────────────────────────────
export function checkRedirect(slug) {
  const GRADES = ["초등","중등","고등"];
  const SUBJS = ["국어","영어","수학","과학","사회","한국사"];
  // slug = "경기도-안양시-평촌동-중등-사회-과외"
  // 뒤에서 학년-과목-과외 떼기
  for (const grade of GRADES) {
    for (const subj of SUBJS) {
      const suffix = "-" + grade + "-" + subj + "-과외";
      if (slug.endsWith(suffix)) {
        const base = slug.slice(0, slug.length - suffix.length);
        if (REDIRECT_MAP[base]) {
          return REDIRECT_MAP[base] + suffix + "/";
        }
      }
    }
  }
  return null;
}

// ── 네이버 IndexNow ───────────────────────────────────────────
export async function notifyIndexNow(urls) {
  const INDEXNOW_KEY = "zenastudyfit-a1b2c3d4e5f6a1b2c3d4e5f6a1b2";
  try {
    await fetch("https://searchadvisor.naver.com/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: "zenastudyfit.com",
        key: INDEXNOW_KEY,
        keyLocation: `https://zenastudyfit.com/${INDEXNOW_KEY}.txt`,
        urlList: urls.slice(0, 10000)
      })
    });
  } catch(e) {}
}
