// ================================================================
// config.js — 사이트 전역 설정 상수
// 변경 빈도: 매우 낮음 (도메인/번호/카카오톡 URL 등 기본 정보)
// ================================================================

export const SITE_NAME = "제나쌤의 스터디핏 과외";
export const SITE_DOMAIN = "https://zenastudyfit.com";
export const PHONE = "010-5949-9897";
export const KAKAO_URL = "http://pf.kakao.com/_xjKxcxgn/chat";
export const FORM_URL = "https://naver.me/GjySnHpA";
export const CODING_FORM_URL = "https://naver.me/GT40B8Ah";

export const GRADES = ["초등", "중등", "고등"];
export const SUBJECTS = ["국어", "영어", "수학", "과학", "사회", "한국사"];

// 과목별 공부법 페이지 출시 상태 (false면 준비중 표시, true면 실제 페이지로 연결)
// 페이지가 완성되면 false → true 로 변경하면 자동 전환됩니다
export const STUDY_READY = {
  "korean":  true,
  "english": true,
  "math":    true,
  "science": true,
  "social":  true,
  "history": true,
};

// 학원 페이지 출시 상태 (false면 준비중 표시, true면 실제 페이지로 연결)
// intro: 학원 소개 페이지 / location: 학원 위치 안내 페이지
export const ACADEMY_READY = {
  "intro":    true,    // ★ 활성화 완료 (학원 소개 페이지 정식 노출)
  "location": true,    // ★ 활성화 완료 (학원 위치 허브 페이지 정식 노출)
};

// 사이트 시작 기준일 (페이지별 게시일 계산에 사용)
export const SITE_LAUNCH_DATE = new Date('2026-01-01');

// 시/도 정렬 순서 (큰 도시 우선)
export const CITY_ORDER = [
  "서울특별시", "경기도", "인천광역시", "부산광역시",
  "대구광역시", "대전광역시", "광주광역시", "울산광역시"
];
