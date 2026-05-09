// ================================================================
// builders/_helpers.js — 빌더 공용 헬퍼 함수
// 변경 빈도: 낮음 (새 공통 빌더 헬퍼가 필요할 때만 추가)
// 의존:
//   - utils.js (SUBJECT_KEY_MAP, LEVEL_GRADES, GRADE_ICONS)
//   - data/subjects/_meta.js (GRADE_SUBJECT_META)
//
// 이 파일에는 여러 빌더가 공통으로 사용하는 헬퍼 함수들이 모입니다.
// 단방향 의존: detail.js, schools.js 등 → _helpers.js
//             (_helpers.js는 다른 빌더를 import하지 않음)
//
// 함수:
//   - buildGradeRoadmapCards(level, subject)
//     → 학년별 가이드 카드 그리드 HTML 생성
//     → buildDetailPage(detail.js)와 buildSchoolSubjectPage(schools.js)에서 사용
//
// 메모리에 기록된 SEO 차별화 프로젝트(자체 운영 학원 200개 지점 연계)
// 진행 시 거리 계산·매칭 헬퍼가 추가되면 이 파일에 둡니다.
//
// 참고: 원본의 buildOtherSubjectCards는 정의만 있고 호출되지 않는 dead code였음 (제거됨)
// ================================================================

import { SUBJECT_KEY_MAP, LEVEL_GRADES, GRADE_ICONS } from '../utils.js';
import { GRADE_SUBJECT_META } from '../data/subjects/_meta.js';


// ── 학년별 가이드 카드 그리드 ─────────────────────────────────
export function buildGradeRoadmapCards(level, subject) {
  const subjectKey = SUBJECT_KEY_MAP[subject];
  const grades = LEVEL_GRADES[level];
  if (!subjectKey || !grades) return "";

  const meta = GRADE_SUBJECT_META[subjectKey];
  if (!meta) return "";
  const data = meta.data();
  if (!data || Object.keys(data).length === 0) return "";

  // 예비 학년 키 정의
  const PREVIEW_GRADES = { "pre-mid1": "중학교", "pre-high1": "고등학교" };
  // 예비 학년이 현재 레벨의 마지막에 오는지 (다음 단계 미리보기)
  const isNextStep = (gradeKey) => {
    if (level === "초등" && gradeKey === "pre-mid1") return true;
    if (level === "중등" && gradeKey === "pre-high1") return true;
    return false;
  };
  // 예비 학년이 현재 레벨의 첫 번째로 오는지 (이전 단계 연계)
  const isFromPrev = (gradeKey) => {
    if (level === "중등" && gradeKey === "pre-mid1") return true;
    if (level === "고등" && gradeKey === "pre-high1") return true;
    return false;
  };

  let cards = "";
  for (const gradeKey of grades) {
    const g = data[gradeKey];
    if (!g) continue;
    const icon = GRADE_ICONS[gradeKey] || "📖";
    const href = `/study/${subjectKey}/grade/${gradeKey}/`;
    const titleParts = g.intro.title.split(",");
    const coreMessage = titleParts.length > 1 ? titleParts.slice(1).join(",").trim() : g.intro.title;

    const nextStep = isNextStep(gradeKey);
    const fromPrev = isFromPrev(gradeKey);
    const isPreview = nextStep || fromPrev;
    const previewLabel = PREVIEW_GRADES[gradeKey];

    // 예비 학년: 구분선 + 강조 스타일
    const divider = nextStep
      ? `<div style="display:flex;align-items:center;gap:8px;margin:14px 0 10px"><div style="flex:1;height:1px;background:#e8d6f5"></div><span style="font-size:.68rem;font-weight:700;color:#e8439a;white-space:nowrap">▼ ${previewLabel} 미리보기</span><div style="flex:1;height:1px;background:#e8d6f5"></div></div>`
      : fromPrev
      ? `<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px"><div style="flex:1;height:1px;background:#e8d6f5"></div><span style="font-size:.68rem;font-weight:700;color:#7b2fa8;white-space:nowrap">◀ ${previewLabel} 준비 과정</span><div style="flex:1;height:1px;background:#e8d6f5"></div></div>`
      : "";

    const cardBg = isPreview ? "linear-gradient(135deg,#fef6ff,#fdf0ff)" : "white";
    const cardBorder = isPreview ? "#d4a8f5" : "#e8d6f5";
    const badgeHtml = nextStep
      ? `<span style="background:#e8439a;color:white;font-size:.6rem;font-weight:700;padding:2px 7px;border-radius:10px;white-space:nowrap">다음 단계</span>`
      : fromPrev
      ? `<span style="background:#7b2fa8;color:white;font-size:.6rem;font-weight:700;padding:2px 7px;border-radius:10px;white-space:nowrap">선행 준비</span>`
      : "";

    cards += `${divider}<a href="${href}" style="display:block;background:${cardBg};border:1px solid ${cardBorder};border-radius:12px;padding:14px 16px;margin-bottom:10px;text-decoration:none;color:inherit;transition:all .15s" onmouseover="this.style.background='#faf5ff';this.style.borderColor='#510580'" onmouseout="this.style.background='${cardBg}';this.style.borderColor='${cardBorder}'">
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
    <span style="font-size:1.1rem">${icon}</span>
    <span style="font-size:.92rem;font-weight:800;color:#370558">${g.tag} ${subject} 공부법</span>
    ${badgeHtml}
    <span style="margin-left:auto;color:#9b6cc0;font-size:.85rem">→</span>
  </div>
  <div style="font-size:.78rem;color:#666;line-height:1.5;padding-left:30px">${coreMessage}</div>
  <div style="font-size:.7rem;color:#9b6cc0;padding-left:30px;margin-top:4px">📚 ${g.sub}</div>
</a>`;
  }

  if (!cards) return "";

  return `<!-- 학년별 학습 로드맵 -->
<div class="sec">
  <div class="sec-label">📚 학년별 ${subject} 공부법</div>
  <div class="sec-title">${level} ${subject} 학년별 학습 로드맵</div>
  <div class="sec-body" style="margin-bottom:14px">학년별 핵심 학습 포인트와 시기별 전략을 확인해보세요. 우리 아이 학년에 맞는 가이드를 클릭하시면 자세한 공부법을 보실 수 있습니다.</div>
  <div>${cards}</div>
</div>`;
}
