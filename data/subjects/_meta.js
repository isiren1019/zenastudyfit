// ================================================================
// data/subjects/_meta.js — 과목별 메타 데이터 (3개 통합)
// 변경 빈도: 낮음~중간 (새 카테고리 추가/허브 페이지 수정 시)
// 의존: 모든 과목 데이터 파일 (lazy reference로 호출 시점에만 평가됨)
//
// ⚠️ 이 파일은 모든 과목 데이터(KOREAN_*, ENGLISH_* 등)를 import합니다.
//   원본 worker.js에서는 한 스코프에 모두 있었기 때문에 자유롭게 참조 가능했지만,
//   분할 후에는 명시적으로 import해야 함수형 lazy reference가 작동합니다.
//   `data: () => KOREAN_HABIT_DATA` 형식은 그대로 유지됩니다.
//
// 역할:
//   1. GRADE_SUBJECT_META    — 학년별 페이지 메타 (과목별 데이터 매핑)
//   2. SUBJECT_CATEGORY_META — 5과목 통합 카테고리 메타 (URL prefix·라벨·데이터 매핑)
//   3. SUBJECT_HUB_DATA      — 5과목 허브 페이지 데이터
//
// 국어는 buildKoreanHubPage()의 별도 시스템(builders/study.js)을 사용하므로
// SUBJECT_HUB_DATA에는 국어가 없습니다.
//
// 새 과목 카테고리 추가 시:
//   - 해당 과목 데이터 파일에 export const NEW_DATA = {...} 추가
//   - 이 파일 상단 import에 NEW_DATA 추가
//   - SUBJECT_CATEGORY_META에 lazy reference 추가
//   - SUBJECT_HUB_DATA에 카테고리 항목 추가
// ================================================================

// ── 모든 과목 데이터 import (함수형 lazy reference에서 사용) ──
import {
  KOREAN_GRADE_DATA, KOREAN_EXAM_DATA, KOREAN_GRAMMAR_DATA,
  KOREAN_LITERACY_DATA, KOREAN_READING_DATA, KOREAN_PERFORM_DATA,
  KOREAN_HABIT_DATA,
} from './korean.js';
import {
  ENGLISH_GRADE_DATA, ENGLISH_EXAM_DATA, ENGLISH_HABIT_DATA,
  ENGLISH_VOCAB_DATA, ENGLISH_GRAMMAR_DATA, ENGLISH_READING_DATA,
  ENGLISH_PERFORM_DATA, ENGLISH_WRITING_DATA,
} from './english.js';
import {
  MATH_GRADE_DATA, MATH_EXAM_DATA, MATH_HABIT_DATA,
  MATH_CONCEPT_DATA, MATH_TYPE_DATA, MATH_PERFORM_DATA,
  MATH_SUNEUNG_DATA, MATH_MISTAKE_DATA, MATH_HIGH_DATA,
} from './math.js';
import {
  SCIENCE_GRADE_DATA, SCIENCE_EXAM_DATA, SCIENCE_HABIT_DATA,
  SCIENCE_BIOLOGY_DATA, SCIENCE_PHYSICS_DATA, SCIENCE_CHEMISTRY_DATA,
  SCIENCE_EARTH_DATA, SCIENCE_INTEGRATED_DATA, SCIENCE_PERFORM_DATA,
} from './science.js';
import {
  SOCIAL_GRADE_DATA, SOCIAL_EXAM_DATA, SOCIAL_HABIT_DATA,
  SOCIAL_SOCIETY_DATA, SOCIAL_ETHICS_DATA, SOCIAL_PERFORM_DATA,
  SOCIAL_INTEGRATED_DATA, SOCIAL_LAW_DATA, SOCIAL_KOREAGEO_DATA,
  SOCIAL_ECONOMY_DATA, SOCIAL_WORLDGEO_DATA,
} from './social.js';
import {
  HISTORY_GRADE_DATA, HISTORY_EXAM_DATA, HISTORY_HABIT_DATA,
  HISTORY_CERT_DATA, HISTORY_PERIOD_DATA, HISTORY_PERFORM_DATA,
} from './history.js';
import {
  ENGLISH_LANG_SKILL_DATA, ENGLISH_LANG_CERT_DATA, ENGLISH_LANG_LEVEL_DATA,
  ENGLISH_LANG_SCHOOL_DATA, ENGLISH_LANG_BIZ_DATA, ENGLISH_LANG_PURPOSE_DATA,
} from './english-lang.js';
import {
  JAPANESE_LANG_SKILL_DATA, JAPANESE_LANG_LEVEL_DATA, JAPANESE_LANG_SCHOOL_DATA,
  JAPANESE_LANG_CERT_DATA, JAPANESE_LANG_BIZ_DATA, JAPANESE_LANG_PURPOSE_DATA,
} from './japanese-lang.js';
import {
  CHINESE_LANG_CERT_DATA, CHINESE_LANG_LEVEL_DATA, CHINESE_LANG_SKILL_DATA,
  CHINESE_LANG_PURPOSE_DATA, CHINESE_LANG_SCHOOL_DATA, CHINESE_LANG_BIZ_DATA,
} from './chinese-lang.js';


// ── 1) GRADE_SUBJECT_META — 학년별 페이지 메타 ─────────────────
export const GRADE_SUBJECT_META = {
  "korean":  { name: "국어",   data: () => KOREAN_GRADE_DATA },
  "english": { name: "영어",   data: () => ENGLISH_GRADE_DATA },
  "math":    { name: "수학",   data: () => MATH_GRADE_DATA },
  "science": { name: "과학",   data: () => SCIENCE_GRADE_DATA },
  "social":  { name: "사회",   data: () => SOCIAL_GRADE_DATA },
  "history": { name: "한국사", data: () => HISTORY_GRADE_DATA },
};

// ── 2) SUBJECT_CATEGORY_META — 5과목 통합 카테고리 메타 ────────
export const SUBJECT_CATEGORY_META = {
  "korean": {
    name: "국어",
    "habit": { label: "학습 습관", data: () => KOREAN_HABIT_DATA },
    "perform": { label: "수행평가 & 서술형", data: () => KOREAN_PERFORM_DATA },
    "exam": { label: "시험 대비", data: () => KOREAN_EXAM_DATA },
    "literacy": { label: "문해력 강화", data: () => KOREAN_LITERACY_DATA },
    "reading": { label: "독해력 향상", data: () => KOREAN_READING_DATA },
    "grammar": { label: "문법 완벽 정복", data: () => KOREAN_GRAMMAR_DATA },
  },
  "english": {
    name: "영어",
    "exam": { label: "시험 대비", data: () => ENGLISH_EXAM_DATA },
    "habit": { label: "학습 습관 & 공부법", data: () => ENGLISH_HABIT_DATA },
    "perform": { label: "수행평가 & 서술형", data: () => ENGLISH_PERFORM_DATA },
    "vocab": { label: "영어 어휘", data: () => ENGLISH_VOCAB_DATA },
    "grammar": { label: "영문법", data: () => ENGLISH_GRAMMAR_DATA },
    "reading": { label: "독해 (Reading)", data: () => ENGLISH_READING_DATA },
    "writing": { label: "작문 (Writing)", data: () => ENGLISH_WRITING_DATA },
  },
  "math": {
    name: "수학",
    "exam": { label: "시험 대비", data: () => MATH_EXAM_DATA },
    "habit": { label: "학습 습관 & 공부법", data: () => MATH_HABIT_DATA },
    "perform": { label: "수행평가 & 서술형", data: () => MATH_PERFORM_DATA },
    "concept": { label: "수학 개념 정리", data: () => MATH_CONCEPT_DATA },
    "type": { label: "유형별 풀이", data: () => MATH_TYPE_DATA },
    "suneung": { label: "수능 수학 영역별", data: () => MATH_SUNEUNG_DATA },
    "mistake": { label: "오답·실수 줄이기", data: () => MATH_MISTAKE_DATA },
    "high": { label: "미적분·확통·기하", data: () => MATH_HIGH_DATA },
  },
  "science": {
    name: "과학",
    "exam": { label: "시험 대비", data: () => SCIENCE_EXAM_DATA },
    "perform": { label: "수행평가 & 서술형", data: () => SCIENCE_PERFORM_DATA },
    "biology": { label: "생명과학", data: () => SCIENCE_BIOLOGY_DATA },
    "physics": { label: "물리", data: () => SCIENCE_PHYSICS_DATA },
    "chemistry": { label: "화학", data: () => SCIENCE_CHEMISTRY_DATA },
    "earth": { label: "지구과학", data: () => SCIENCE_EARTH_DATA },
    "integrated": { label: "통합과학", data: () => SCIENCE_INTEGRATED_DATA },
    "habit": { label: "학습 습관 & 공부법", data: () => SCIENCE_HABIT_DATA },
  },
  "social": {
    name: "사회",
    "exam": { label: "시험 대비", data: () => SOCIAL_EXAM_DATA },
    "habit": { label: "학습 습관 & 공부법", data: () => SOCIAL_HABIT_DATA },
    "perform": { label: "수행평가 & 서술형", data: () => SOCIAL_PERFORM_DATA },
    "society": { label: "사회·문화", data: () => SOCIAL_SOCIETY_DATA },
    "ethics": { label: "윤리", data: () => SOCIAL_ETHICS_DATA },
    "integrated": { label: "통합사회", data: () => SOCIAL_INTEGRATED_DATA },
    "law": { label: "정치와 법", data: () => SOCIAL_LAW_DATA },
    "korea-geo": { label: "한국지리", data: () => SOCIAL_KOREAGEO_DATA },
    "economy": { label: "경제", data: () => SOCIAL_ECONOMY_DATA },
    "world-geo": { label: "세계지리", data: () => SOCIAL_WORLDGEO_DATA },
  },
  "history": {
    name: "한국사",
    "exam": { label: "시험 대비", data: () => HISTORY_EXAM_DATA },
    "cert": { label: "한국사 능력 검정 시험", data: () => HISTORY_CERT_DATA },
    "period": { label: "시대별 정리", data: () => HISTORY_PERIOD_DATA },
    "perform": { label: "수행평가 & 서술형", data: () => HISTORY_PERFORM_DATA },
    "habit": { label: "학습 습관 & 공부법", data: () => HISTORY_HABIT_DATA },
  },
  // ── 제2외국어 회화 (별도 라우팅: /language/{lang}/{cat}/{slug}/) ──
  "english_lang": {
    name: "영어 회화",
    pathPrefix: "/language/english",
    breadcrumbHubLabel: "회화 과외",
    breadcrumbHubUrl: "/language/",
    breadcrumbSubjectLabel: "영어 회화",
    breadcrumbSubjectUrl: "/language/english/",
    "skill": { label: "영역별 학습", data: () => ENGLISH_LANG_SKILL_DATA },
    "cert":  { label: "자격증 대비", data: () => ENGLISH_LANG_CERT_DATA },
    "level": { label: "수준별 과정", data: () => ENGLISH_LANG_LEVEL_DATA },
    "school": { label: "내신·진학·유학", data: () => ENGLISH_LANG_SCHOOL_DATA },
    "biz": { label: "비즈니스 영어", data: () => ENGLISH_LANG_BIZ_DATA },
    "purpose": { label: "목적별 수업", data: () => ENGLISH_LANG_PURPOSE_DATA },
  },
  "japanese_lang": {
    name: "일본어 회화",
    pathPrefix: "/language/japanese",
    breadcrumbHubLabel: "회화 과외",
    breadcrumbHubUrl: "/language/",
    breadcrumbSubjectLabel: "일본어 회화",
    breadcrumbSubjectUrl: "/language/japanese/",
    "skill":   { label: "영역별 학습",   data: () => JAPANESE_LANG_SKILL_DATA },
    "cert":    { label: "자격증 대비",   data: () => JAPANESE_LANG_CERT_DATA },
    "level":   { label: "수준별 과정",   data: () => JAPANESE_LANG_LEVEL_DATA },
    "school":  { label: "내신·진학·유학", data: () => JAPANESE_LANG_SCHOOL_DATA },
    "biz":     { label: "비즈니스 일본어", data: () => JAPANESE_LANG_BIZ_DATA },
    "purpose": { label: "목적별 수업",   data: () => JAPANESE_LANG_PURPOSE_DATA },
  },
  "chinese_lang": {
    name: "중국어 회화",
    pathPrefix: "/language/chinese",
    breadcrumbHubLabel: "회화 과외",
    breadcrumbHubUrl: "/language/",
    breadcrumbSubjectLabel: "중국어 회화",
    breadcrumbSubjectUrl: "/language/chinese/",
    "skill":   { label: "영역별 학습",     data: () => CHINESE_LANG_SKILL_DATA },
    "level":   { label: "수준별 과정",     data: () => CHINESE_LANG_LEVEL_DATA },
    "cert":    { label: "자격증 대비",     data: () => CHINESE_LANG_CERT_DATA },
    "biz":     { label: "비즈니스 중국어", data: () => CHINESE_LANG_BIZ_DATA },
    "purpose": { label: "목적별 수업",     data: () => CHINESE_LANG_PURPOSE_DATA },
    "school":  { label: "진학·유학",       data: () => CHINESE_LANG_SCHOOL_DATA },
  },
};

// ── 3) SUBJECT_HUB_DATA — 5과목 허브 페이지 데이터 ─────────────
export const SUBJECT_HUB_DATA = {
  "english": {
    icon: "🌍",
    name: "영어",
    nameEn: "English",
    desc: "어휘·문법·독해·듣기·회화·작문 모든 영역의 균형 학습이 영어 1등급의 비밀입니다.",
    introTitle: "제나쌤 스터디핏의 영어 과외",
    introBody: "영어는 어휘·문법·독해·듣기·회화·작문 등 영역이 다양해서 균형 학습이 핵심이에요. 어느 한 영역에 치우치면 점수가 정체됩니다. 제나쌤 스터디핏은 학생의 현재 수준을 진단한 뒤, 약점 영역에 맞춘 1:1 맞춤 커리큘럼으로 수업합니다.",
    categories: [
      { key: "grade", name: "학년별 학습 로드맵", count: 14, isNew: true, highlight: true,
        items: [["elem1","초1"],["elem2","초2"],["elem3","초3"],["elem4","초4"],["elem5","초5"],["elem6","초6"],["pre-mid1","예비 중1"],["mid1","중1"],["mid2","중2"],["mid3","중3"],["pre-high1","예비 고1"],["high1","고1"],["high2","고2"],["high3","고3"]] },
      { key: "habit", name: "학습 습관 & 공부법", count: 5, isNew: true,
        items: [["timing","영어 공부 시간 관리"],["notes","오답노트 작성법"],["self","자기주도 영어 학습"],["routine","영어 학습 루틴"],["slump","영어 슬럼프 극복법"]] },
      { key: "perform", name: "수행평가 & 서술형", count: 2, isNew: true,
        items: [["descriptive","영어 서술형 답안"],["assessment","영어 수행평가 대비"]] },
      { key: "exam", name: "시험 대비", count: 6,
        items: [["naesin","내신 시험 대비"],["past","기출문제 분석"],["mock","모의고사 대비"],["order","문장 순서 유형"],["insert","문장 삽입 유형"],["suneung","수능 영어 대비"]] },
      { key: "vocab", name: "영어 어휘", count: 6,
        items: [["basic","기초 어휘 1000"],["intermediate","중급 어휘"],["advanced","고급 어휘"],["idiom","숙어·관용 표현"],["phrasal","구동사"],["roots","어근·접사로 외우기"]] },
      { key: "grammar", name: "영문법", count: 8,
        items: [["guide","영문법 완벽 가이드"],["tense","시제 정복"],["passive","수동태"],["relative","관계대명사·관계부사"],["conjunction","접속사·전치사"],["clause","절·구문 분석"],["conditional","가정법"],["mistakes","자주 틀리는 문법"]] },
      { key: "reading", name: "독해 (Reading)", count: 8,
        items: [["skill","독해력 향상 비법"],["theme","주제 파악"],["inference","추론 문제"],["detail","세부 내용"],["blank","빈칸 추론"],["title","제목 찾기"],["context","문맥 추론"],["speed","속독 훈련"]] },
      { key: "listening", name: "듣기 (Listening)", count: 5,
        items: [["basic","기초 듣기"],["dictation","받아쓰기 훈련"],["pronunciation","발음·연음"],["accent","다양한 억양 적응"],["test","시험 듣기 전략"]] },
      { key: "speaking", name: "회화 (Speaking)", count: 5,
        items: [["basic","기초 회화"],["daily","일상 회화"],["pronunciation","발음 교정"],["fluency","유창성 키우기"],["roleplay","롤플레이·상황별"]] },
      { key: "writing", name: "작문 (Writing)", count: 6, isNew: true,
        items: [["basic","문장 만들기"],["paragraph","단락 쓰기"],["essay","에세이 작성"],["letter","편지·이메일"],["intro","자기소개서"],["correction","문법 첨삭"]] },
      { key: "cert", name: "공인영어시험", count: 6,
        items: [["toeic","TOEIC 대비"],["toefl","TOEFL 대비"],["ielts","IELTS 대비"],["opic","OPIc 대비"],["toeic-speaking","TOEIC Speaking"],["comparison","공인시험 비교 가이드"]] },
    ],
  },

  "math": {
    icon: "📐",
    name: "수학",
    nameEn: "Mathematics",
    desc: "수학은 개념·유형·심화·실수 관리의 균형이 1등급의 비밀. 학년별 단계 학습이 필수입니다.",
    introTitle: "제나쌤 스터디핏의 수학 과외",
    introBody: "수학은 개념 이해 → 유형 풀이 → 심화 응용 → 실수 줄이기의 단계 학습이 필수예요. 한 단계 건너뛰면 다음 단계에서 무너집니다. 제나쌤 스터디핏은 학생의 약점 단계를 진단한 뒤, 단계별 1:1 맞춤 커리큘럼으로 수업합니다.",
    categories: [
      { key: "grade", name: "학년별 학습 로드맵", count: 14, isNew: true, highlight: true,
        items: [["elem1","초1"],["elem2","초2"],["elem3","초3"],["elem4","초4"],["elem5","초5"],["elem6","초6"],["pre-mid1","예비 중1"],["mid1","중1"],["mid2","중2"],["mid3","중3"],["pre-high1","예비 고1"],["high1","고1"],["high2","고2"],["high3","고3"]] },
      { key: "habit", name: "학습 습관 & 공부법", count: 5, isNew: true,
        items: [["timing","수학 공부 시간 관리"],["notes","오답노트 작성법"],["self","자기주도 수학 학습"],["routine","수학 학습 루틴"],["slump","수학 슬럼프 극복법"]] },
      { key: "perform", name: "수행평가", count: 2, isNew: true,
        items: [["descriptive","수학 서술형"],["assessment","수학 수행평가 대비"]] },
      { key: "concept", name: "수학 개념 정리", count: 8,
        items: [["basic","수와 연산"],["algebra","문자와 식"],["function","함수 개념"],["geometry","도형 개념"],["probability","확률·통계 기초"],["limit","극한 개념"],["derivative","미분 개념"],["integral","적분 개념"]] },
      { key: "type", name: "유형별 풀이", count: 8,
        items: [["equation","방정식 유형"],["inequality","부등식 유형"],["graph","그래프 유형"],["proof","증명 유형"],["max-min","최대·최소 유형"],["sequence","수열 유형"],["case","경우의 수 유형"],["application","활용 문제"]] },
      { key: "exam", name: "시험 대비", count: 6,
        items: [["naesin","내신 시험 대비"],["past","기출문제 분석"],["killer","킬러 문항 풀이"],["time","시간 관리 전략"],["mock","모의고사 대비"],["suneung","수능 수학 대비"]] },
      { key: "mistake", name: "오답·실수 줄이기", count: 5,
        items: [["pattern","실수 패턴 분석"],["calculation","계산 실수 줄이기"],["careless","부주의 실수"],["misread","문제 잘못 읽기"],["check","검토 습관"]] },
      { key: "high", name: "미적분·확통·기하", count: 6,
        items: [["calculus-basic","미적분 기초"],["calculus-advanced","미적분 심화"],["statistics-basic","확통 기초"],["statistics-advanced","확통 심화"],["geometry-basic","기하 기초"],["geometry-advanced","기하 심화"]] },
      { key: "suneung", name: "수능 수학 영역별", count: 6,
        items: [["common","공통 영역"],["calculus","미적분"],["statistics","확률과 통계"],["geometry","기하"],["choice","선택과목 비교"],["strategy","문항 풀이 순서"]] },
    ],
  },

  "science": {
    icon: "🔬",
    name: "과학",
    nameEn: "Science",
    desc: "과학은 개념 이해 + 실험 분석 + 탐구 능력이 핵심. 4과목(물·화·생·지)의 균형이 중요합니다.",
    introTitle: "제나쌤 스터디핏의 과학 과외",
    introBody: "과학은 개념 이해 → 실험 분석 → 응용 문제 풀이 단계가 필수예요. 단순 암기로는 1등급이 어렵습니다. 제나쌤 스터디핏은 학생의 통합과학·물·화·생·지 영역별 약점을 진단한 뒤, 1:1 맞춤 커리큘럼으로 수업합니다.",
    categories: [
      { key: "grade", name: "학년별 학습 로드맵", count: 14, isNew: true, highlight: true,
        items: [["elem1","초1"],["elem2","초2"],["elem3","초3"],["elem4","초4"],["elem5","초5"],["elem6","초6"],["pre-mid1","예비 중1"],["mid1","중1"],["mid2","중2"],["mid3","중3"],["pre-high1","예비 고1"],["high1","고1"],["high2","고2"],["high3","고3"]] },
      { key: "habit", name: "학습 습관 & 공부법", count: 5, isNew: true,
        items: [["timing","과학 공부 시간 관리"],["notes","오답노트 작성법"],["self","자기주도 과학 학습"],["routine","과학 학습 루틴"],["slump","과학 슬럼프 극복법"]] },
      { key: "perform", name: "수행평가 & 서술형", count: 2, isNew: true,
        items: [["assessment","과학 수행평가"],["descriptive","과학 서술형"]] },
      { key: "exam", name: "시험 대비", count: 6,
        items: [["naesin","내신 시험 대비"],["calculation","계산형 문제"],["graph","그래프·자료 분석"],["past","기출문제 분석"],["mock","모의고사 대비"],["suneung","수능 과학 대비"]] },
      { key: "integrated", name: "통합과학", count: 6,
        items: [["overview","통합과학 개요"],["matter","물질·에너지"],["system","시스템과 상호작용"],["evolution","변화와 다양성"],["environment","환경과 에너지"],["future","미래 사회와 과학"]] },
      { key: "physics", name: "물리", count: 6,
        items: [["mechanics","역학 기초"],["energy","에너지·열"],["wave","파동·빛"],["electricity","전기·자기"],["modern","현대물리 입문"],["practice","물리 실전 풀이"]] },
      { key: "chemistry", name: "화학", count: 6,
        items: [["atom","원자·분자 구조"],["bond","화학 결합"],["reaction","화학 반응"],["acid","산·염기"],["organic","유기화학 입문"],["practice","화학 실전 풀이"]] },
      { key: "biology", name: "생명과학", count: 6,
        items: [["cell","세포와 생명 활동"],["genetics","유전·진화"],["ecology","생태계"],["body","인체 구조와 기능"],["microbiology","미생물·면역"],["practice","생명과학 실전 풀이"]] },
      { key: "earth", name: "지구과학", count: 6,
        items: [["astronomy","천체·우주"],["geology","지각·암석·광물"],["atmosphere","대기·기상"],["ocean","해양·해류"],["climate","기후 변화·지구 환경"],["practice","지구과학 실전 풀이"]] },
    ],
  },

  "social": {
    icon: "🗺️",
    name: "사회",
    nameEn: "Social Studies",
    desc: "사회는 개념 이해 + 시사 연결 + 자료 분석이 핵심. 통합사회·지리·법·경제·사문·윤리의 균형이 중요합니다.",
    introTitle: "제나쌤 스터디핏의 사회 과외",
    introBody: "사회는 개념 이해 → 시사·자료 연결 → 응용 문제 풀이 단계가 핵심이에요. 단순 암기로는 1등급이 어렵습니다. 제나쌤 스터디핏은 학생의 영역별 약점을 진단한 뒤, 1:1 맞춤 커리큘럼으로 수업합니다.",
    categories: [
      { key: "grade", name: "학년별 학습 로드맵", count: 14, isNew: true, highlight: true,
        items: [["elem1","초1"],["elem2","초2"],["elem3","초3"],["elem4","초4"],["elem5","초5"],["elem6","초6"],["pre-mid1","예비 중1"],["mid1","중1"],["mid2","중2"],["mid3","중3"],["pre-high1","예비 고1"],["high1","고1"],["high2","고2"],["high3","고3"]] },
      { key: "habit", name: "학습 습관 & 공부법", count: 5, isNew: true,
        items: [["timing","사회 공부 시간 관리"],["notes","오답노트 작성법"],["self","자기주도 사회 학습"],["routine","사회 학습 루틴"],["slump","사회 슬럼프 극복법"]] },
      { key: "perform", name: "수행평가 & 서술형", count: 3, isNew: true,
        items: [["descriptive","사회 서술형"],["assessment","사회 수행평가"],["debate","토론·발표"]] },
      { key: "exam", name: "시험 대비", count: 6,
        items: [["naesin","내신 시험 대비"],["graph","자료·도표 분석"],["case","사례형 문제"],["past","기출문제 분석"],["mock","모의고사 대비"],["suneung","수능 사회탐구 대비"]] },
      { key: "integrated", name: "통합사회", count: 6, isNew: true,
        items: [["overview","통합사회 개요"],["humanity","인간·사회·환경"],["culture","문화"],["nature","자연환경"],["sustainability","지속가능 발전"],["practice","통합사회 실전"]] },
      { key: "korea-geo", name: "한국지리", count: 6, isNew: true,
        items: [["topography","지형·기후"],["population","인구·도시"],["industry","산업·자원"],["regions","지역 지리"],["culture","문화·관광"],["practice","한국지리 실전"]] },
      { key: "world-geo", name: "세계지리", count: 6, isNew: true,
        items: [["overview","세계지리 개요"],["regions","대륙별 지리"],["climate","기후 지역"],["population","인구·도시"],["culture","세계 문화"],["practice","세계지리 실전"]] },
      { key: "law", name: "정치와 법", count: 5, isNew: true,
        items: [["politics","민주정치"],["constitution","헌법"],["law","법치주의"],["rights","기본권"],["practice","정치와 법 실전"]] },
      { key: "economy", name: "경제", count: 5, isNew: true,
        items: [["basic","경제 기초"],["market","시장·가격"],["finance","금융·투자"],["macro","거시경제"],["practice","경제 실전"]] },
      { key: "society", name: "사회·문화", count: 5,
        items: [["theory","사회·문화 이론"],["culture","문화 다양성"],["change","사회 변동"],["issues","사회 문제"],["practice","사회·문화 실전"]] },
      { key: "ethics", name: "윤리", count: 5,
        items: [["thought","윤리 사상"],["modern","현대 윤리 문제"],["bioethics","생명 윤리"],["environmental","환경 윤리"],["practice","윤리 실전"]] },
    ],
  },

  "history": {
    icon: "📜",
    name: "한국사",
    nameEn: "Korean History",
    desc: "한국사는 시대 흐름 이해 + 사건 연결 + 사료 분석이 핵심. 시대별·근현대사 균형이 1등급의 비밀입니다.",
    introTitle: "제나쌤 스터디핏의 한국사 과외",
    introBody: "한국사는 단순 암기가 아니라 시대 흐름 + 사건 인과 + 사료 해석이 핵심이에요. 흐름을 먼저 잡고 세부 사실을 채워가는 방식이 효율적입니다. 제나쌤 스터디핏은 학생의 약점 시기·영역을 진단한 뒤, 1:1 맞춤 커리큘럼으로 수업합니다.",
    categories: [
      { key: "grade", name: "학년별 학습 로드맵", count: 14, isNew: true, highlight: true,
        items: [["elem1","초1"],["elem2","초2"],["elem3","초3"],["elem4","초4"],["elem5","초5"],["elem6","초6"],["pre-mid1","예비 중1"],["mid1","중1"],["mid2","중2"],["mid3","중3"],["pre-high1","예비 고1"],["high1","고1"],["high2","고2"],["high3","고3"]] },
      { key: "habit", name: "학습 습관 & 공부법", count: 5, isNew: true,
        items: [["timing","한국사 공부 시간 관리"],["notes","오답노트 작성법"],["self","자기주도 한국사 학습"],["routine","한국사 학습 루틴"],["slump","한국사 슬럼프 극복법"]] },
      { key: "perform", name: "수행평가 & 서술형", count: 2, isNew: true,
        items: [["descriptive","한국사 서술형"],["assessment","한국사 수행평가"]] },
      { key: "exam", name: "시험 대비", count: 6,
        items: [["naesin","내신 시험 대비"],["timeline","연표 정리"],["material","사료 분석"],["past","기출문제 분석"],["mock","모의고사 대비"],["suneung","수능 한국사 대비"]] },
      { key: "period", name: "시대별 정리", count: 9,
        items: [["prehistoric","선사 시대"],["gojoseon","고조선"],["samguk","삼국 시대"],["nambukguk","통일신라·발해"],["goryeo","고려"],["joseon","조선"],["opening","개항기"],["colonial","일제강점기"],["modern","현대"]] },
      { key: "cert", name: "한국사 능력 검정 시험", count: 6,
        items: [["overview","시험 개요·등급별 차이"],["basic","기본 (4·5·6급) 대비"],["intermediate","심화 (1·2·3급) 대비"],["timeline","연표 암기법"],["material","사료 풀이법"],["strategy","실전 전략"]] },
      { key: "material", name: "사료·자료 분석", count: 5,
        items: [["text","사료 해석"],["map","역사 지도 분석"],["graph","통계·도표"],["picture","유물·그림 분석"],["compare","사료 비교"]] },
      { key: "people", name: "인물·사건사", count: 6,
        items: [["king","주요 왕·정치가"],["scholar","학자·사상가"],["independence","독립운동가"],["modern","근현대 인물"],["women","여성 인물"],["events","주요 사건 정리"]] },
      { key: "heritage", name: "문화재·유물", count: 5,
        items: [["unesco","유네스코 문화유산"],["national","국보·보물"],["temple","사찰·궁궐"],["folk","민속·생활"],["regional","지역별 문화재"]] },
    ],
  },
};

// ── 4) LANGUAGE_HUB_CATEGORIES — 회화 페이지 카테고리 카드 데이터 ──
// buildLanguagePage(lang)가 사용 — 영어/일본어/중국어 회화 메인 페이지의 카테고리 그리드 표시용
// SUBJECT_CATEGORY_META와는 별개의 데이터 (회화 메뉴 페이지 전용 UI 카드)
export const LANGUAGE_HUB_CATEGORIES = {
  english: [
    { key: "skill", name: "영역별 학습", count: 5, isNew: true, highlight: true,
      items: [
        ["pronunciation", "🔊 발음 교정"],
        ["grammar",       "📚 회화 문법"],
        ["speaking",      "🗣️ 말하기 유창성"],
        ["listening",     "👂 듣기 훈련"],
        ["reading",       "📖 회화 독해"],
      ]},
    { key: "level", name: "수준별 과정", count: 4,
      items: [
        ["beginner",     "🌱 입문 (왕초보)"],
        ["elementary",   "📘 초급"],
        ["intermediate", "💬 중급"],
        ["advanced",     "🎓 고급"],
      ]},
    { key: "cert", name: "자격증 대비", count: 4,
      items: [
        ["toeic",  "📊 토익 (TOEIC)"],
        ["toefl",  "🎓 토플 (TOEFL)"],
        ["opic",   "🎤 오픽 (OPIc)"],
        ["ielts",  "🌍 아이엘츠 (IELTS)"],
      ]},
    { key: "biz", name: "비즈니스 영어", count: 4,
      items: [
        ["email",        "✉️ 비즈니스 이메일"],
        ["meeting",      "🤝 미팅·회의"],
        ["negotiation",  "💼 협상"],
        ["presentation", "📊 프레젠테이션"],
      ]},
    { key: "purpose", name: "목적별 수업", count: 4,
      items: [
        ["travel",    "✈️ 여행 영어"],
        ["interview", "🎯 면접 영어"],
        ["job",       "💼 취업 영어"],
        ["essay",     "✍️ 에세이"],
      ]},
    { key: "school", name: "내신·진학·유학", count: 6,
      items: [
        ["naesin",       "📝 학교 내신"],
        ["listening",    "🎧 듣기평가"],
        ["performance",  "📋 수행평가"],
        ["intl-school",  "🏫 국제학교"],
        ["foreign-lang", "🌐 외고 대비"],
        ["study-abroad", "✈️ 유학 준비"],
      ]},
  ],
  japanese: [
    { key: "skill", name: "영역별 학습", count: 5, highlight: true,
      items: [
        ["hiragana",      "🈂️ 히라가나·가타카나"],
        ["kanji",         "漢 한자 학습"],
        ["pronunciation", "🔊 발음 교정"],
        ["speaking",      "🗣️ 회화·존댓말"],
        ["listening",     "👂 청해 훈련"],
      ]},
    { key: "cert", name: "자격증 대비", count: 5,
      items: [
        ["jlpt-n4-n5", "📊 JLPT N4·N5"],
        ["jlpt-n3",    "📊 JLPT N3"],
        ["jlpt-n2",    "🎓 JLPT N2"],
        ["jlpt-n1",    "🌟 JLPT N1"],
        ["jpt",        "📈 JPT"],
      ]},
    { key: "level", name: "수준별 과정", count: 4,
      items: [
        ["beginner",     "🌱 입문 (히라가나부터)"],
        ["elementary",   "📘 초급 (N5~N4)"],
        ["intermediate", "💬 중급 (N3)"],
        ["advanced",     "🎓 고급 (N2~N1)"],
      ]},
    { key: "purpose", name: "목적별 수업", count: 5,
      items: [
        ["travel",    "✈️ 여행 일본어"],
        ["anime",     "📺 애니·만화 일본어"],
        ["jpop-idol", "🎵 J-POP·드라마·아이돌"],
        ["interview", "🎯 면접 일본어"],
        ["essay",     "✍️ 자소서·유학 에세이"],
      ]},
    { key: "biz", name: "비즈니스 일본어", count: 3,
      items: [
        ["email",   "✉️ 비즈니스 이메일"],
        ["meeting", "🤝 상담·회의"],
        ["keigo",   "🎌 경어(敬語) 집중"],
      ]},
    { key: "school", name: "내신·진학·유학", count: 3,
      items: [
        ["school-japanese", "📝 제2외국어 내신"],
        ["performance",     "📋 수행평가"],
        ["study-abroad",    "✈️ 일본 유학 준비"],
      ]},
  ],
  chinese: [
    { key: "skill", name: "영역별 학습", count: 5, highlight: true,
      items: [
        ["tones",      "🔊 성조 마스터"],
        ["pinyin",     "🅰️ 병음 (拼音)"],
        ["hanzi",      "汉 한자·간체 쓰기"],
        ["grammar",    "📚 중국어 어순"],
        ["speaking",   "🗣️ 회화·청취"],
      ]},
    { key: "level", name: "수준별 과정", count: 4,
      items: [
        ["beginner",     "🌱 입문 (성조부터)"],
        ["elementary",   "📘 초급 (HSK 1~2)"],
        ["intermediate", "💬 중급 (HSK 3~4)"],
        ["advanced",     "🎓 고급 (HSK 5~6)"],
      ]},
    { key: "cert", name: "자격증 대비", count: 4,
      items: [
        ["hsk-12",  "📊 HSK 1·2급"],
        ["hsk-34",  "📊 HSK 3·4급"],
        ["hsk-56",  "🎓 HSK 5·6급"],
        ["hskk",    "🎤 HSKK (말하기)"],
      ]},
    { key: "biz", name: "비즈니스 중국어", count: 4,
      items: [
        ["email",        "✉️ 비즈니스 이메일"],
        ["meeting",      "🤝 회의·협상"],
        ["culture",      "🐉 중국 기업 문화"],
        ["presentation", "📊 프레젠테이션"],
      ]},
    { key: "purpose", name: "목적별 수업", count: 4,
      items: [
        ["travel", "✈️ 여행 중국어"],
        ["drama",  "🎬 중드 표현 학습"],
        ["cpop",   "🎵 C-POP 가사 학습"],
        ["idiom",  "📜 중국 문화·고사성어"],
      ]},
    { key: "school", name: "진학·유학", count: 3,
      items: [
        ["naesin",      "📝 제2외국어 내신"],
        ["foreign-lang","🌐 외고 중국어과"],
        ["univ-china",  "🏯 중국 대학 진학"],
      ]},
  ],
};

// ── 5) LANGUAGE_PAGE_READY — 활성화된 회화 페이지 슬러그 매핑 ──
// buildLanguagePage(lang)가 사용 — 카테고리 카드 클릭 시 실제 존재하는 페이지로만 링크
// 새 회화 페이지 추가 시 이 매핑에 추가해야 카드가 클릭 가능해짐 (Phase 4 중국어 7개 작업 영역)
export const LANGUAGE_PAGE_READY = {
  english: {
    "skill/pronunciation": "/language/english/skill/pronunciation/",
    "skill/grammar":       "/language/english/skill/grammar/",
    "skill/speaking":      "/language/english/skill/speaking/",
    "skill/listening":     "/language/english/skill/listening/",
    "skill/reading":       "/language/english/skill/reading/",
    "cert/toeic":          "/language/english/cert/toeic/",
    "cert/toefl":          "/language/english/cert/toefl/",
    "cert/opic":           "/language/english/cert/opic/",
    "cert/ielts":          "/language/english/cert/ielts/",
    "level/beginner":      "/language/english/level/beginner/",
    "level/elementary":    "/language/english/level/elementary/",
    "level/intermediate":  "/language/english/level/intermediate/",
    "level/advanced":      "/language/english/level/advanced/",
    "school/naesin":       "/language/english/school/naesin/",
    "school/listening":    "/language/english/school/listening/",
    "school/performance":  "/language/english/school/performance/",
    "school/intl-school":  "/language/english/school/intl-school/",
    "school/foreign-lang": "/language/english/school/foreign-lang/",
    "school/study-abroad": "/language/english/school/study-abroad/",
    "biz/email":           "/language/english/biz/email/",
    "biz/meeting":         "/language/english/biz/meeting/",
    "biz/negotiation":     "/language/english/biz/negotiation/",
    "biz/presentation":    "/language/english/biz/presentation/",
    "purpose/travel":      "/language/english/purpose/travel/",
    "purpose/interview":   "/language/english/purpose/interview/",
    "purpose/job":         "/language/english/purpose/job/",
    "purpose/essay":       "/language/english/purpose/essay/",
  },
  japanese: {
    "skill/hiragana":         "/language/japanese/skill/hiragana/",
    "skill/kanji":            "/language/japanese/skill/kanji/",
    "skill/pronunciation":    "/language/japanese/skill/pronunciation/",
    "skill/speaking":         "/language/japanese/skill/speaking/",
    "skill/listening":        "/language/japanese/skill/listening/",
    "level/beginner":         "/language/japanese/level/beginner/",
    "level/elementary":       "/language/japanese/level/elementary/",
    "level/intermediate":     "/language/japanese/level/intermediate/",
    "level/advanced":         "/language/japanese/level/advanced/",
    "cert/jlpt-n1":           "/language/japanese/cert/jlpt-n1/",
    "cert/jlpt-n2":           "/language/japanese/cert/jlpt-n2/",
    "cert/jlpt-n3":           "/language/japanese/cert/jlpt-n3/",
    "cert/jlpt-n4-n5":        "/language/japanese/cert/jlpt-n4-n5/",
    "cert/jpt":               "/language/japanese/cert/jpt/",
    "purpose/anime":          "/language/japanese/purpose/anime/",
    "purpose/travel":         "/language/japanese/purpose/travel/",
    "purpose/jpop-idol":      "/language/japanese/purpose/jpop-idol/",
    "purpose/interview":      "/language/japanese/purpose/interview/",
    "purpose/essay":          "/language/japanese/purpose/essay/",
    "biz/keigo":              "/language/japanese/biz/keigo/",
    "biz/email":              "/language/japanese/biz/email/",
    "biz/meeting":            "/language/japanese/biz/meeting/",
    "school/school-japanese": "/language/japanese/school/school-japanese/",
    "school/performance":     "/language/japanese/school/performance/",
    "school/study-abroad":    "/language/japanese/school/study-abroad/",
  },
  chinese: {
    "skill/tones":         "/language/chinese/skill/tones/",
    "skill/pinyin":        "/language/chinese/skill/pinyin/",
    "skill/hanzi":         "/language/chinese/skill/hanzi/",
    "skill/grammar":       "/language/chinese/skill/grammar/",
    "skill/speaking":      "/language/chinese/skill/speaking/",
    "level/beginner":      "/language/chinese/level/beginner/",
    "level/elementary":    "/language/chinese/level/elementary/",
    "level/intermediate":  "/language/chinese/level/intermediate/",
    "level/advanced":      "/language/chinese/level/advanced/",
    "cert/hsk-12":         "/language/chinese/cert/hsk-12/",
    "cert/hsk-34":         "/language/chinese/cert/hsk-34/",
    "cert/hsk-56":         "/language/chinese/cert/hsk-56/",
    "cert/hskk":           "/language/chinese/cert/hskk/",
    "biz/email":           "/language/chinese/biz/email/",
    "biz/meeting":         "/language/chinese/biz/meeting/",
    "biz/culture":         "/language/chinese/biz/culture/",
    "biz/presentation":    "/language/chinese/biz/presentation/",
    "purpose/travel":      "/language/chinese/purpose/travel/",
    "purpose/drama":       "/language/chinese/purpose/drama/",
    "purpose/cpop":        "/language/chinese/purpose/cpop/",
    "purpose/idiom":       "/language/chinese/purpose/idiom/",
    "school/foreign-lang": "/language/chinese/school/foreign-lang/",
    "school/naesin":       "/language/chinese/school/naesin/",
    "school/univ-china":   "/language/chinese/school/univ-china/",
  },
};
