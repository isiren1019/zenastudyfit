#!/usr/bin/env python3
"""
제나쌤의 스터디핏 과외 — 블로그형 상세페이지 생성기 v2
- 지역(시/구 + 동) × 학년 × 과목 조합으로 페이지 자동 생성
- 서론 / 수업특징 / 본론 / 이미지 / FAQ / 결론 / 문의 구조
- 텍스트 조합 방식으로 페이지마다 다른 본문 생성
- 동 리스트는 areas.txt 파일로 외부 주입 가능
"""

import random
import hashlib
from pathlib import Path
from itertools import product

# ══════════════════════════════════════════════════════════
# ① 기본 설정
# ══════════════════════════════════════════════════════════

SITE_NAME  = "제나쌤의 스터디핏 과외"
SITE_DOMAIN = "https://zenastudyfit.com"
PHONE      = "010-5949-9897"
KAKAO_URL  = "http://pf.kakao.com/_xjKxcxgn/chat"
FORM_URL   = "https://naver.me/GjySnHpA"

GRADES   = ["초등", "중등", "고등"]
SUBJECTS = ["국어", "영어", "수학", "과학", "사회"]

FOOTER_HTML = """<footer>
  <p>제나쌤 스터디핏 · 이수진 · 010-5949-9897 · aquarai@naver.com</p>
  <p style="margin-top:8px">COPYRIGHT &copy; 제나쌤스터디핏. All Rights Reserved.
    &nbsp;│&nbsp;<a href="/privacy/" style="color:rgba(255,255,255,.6);text-decoration:none">개인정보처리방침</a>
    &nbsp;│&nbsp;<a href="/terms/" style="color:rgba(255,255,255,.6);text-decoration:none">이용약관</a>
  </p>
</footer>"""

HEADER_CSS = """
  .site-header{background:white;padding:13px 24px;border-bottom:2px solid #e8d6f5;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:200;box-shadow:0 2px 12px rgba(81,5,128,.06)}
  .site-logo{font-size:1.05rem;font-weight:800;color:#510580;text-decoration:none}
  .site-nav{display:flex;gap:4px;align-items:center}
  .nav-item{position:relative}
  .nav-link{font-size:.85rem;color:#444;padding:7px 12px;border-radius:8px;cursor:pointer;display:flex;align-items:center;gap:4px;text-decoration:none;white-space:nowrap;font-weight:700;background:none;border:none}
  .nav-link:hover{background:#f5eefe;color:#510580}
  .nav-arrow{font-size:.6rem;color:#aaa;transition:transform .2s;display:inline-block}
  .nav-item:hover .nav-arrow{transform:rotate(180deg);color:#510580}
  .nav-dropdown{display:none;position:absolute;top:calc(100% + 6px);left:0;background:white;border:1px solid #e8d6f5;border-radius:12px;min-width:170px;overflow:hidden;z-index:300;box-shadow:0 4px 16px rgba(81,5,128,.10)}
  .nav-item:hover .nav-dropdown{display:block}
  .nav-dropdown-item{display:flex;align-items:center;gap:10px;padding:11px 14px;font-size:.82rem;color:#370558;text-decoration:none;border-bottom:1px solid #f5eefe;transition:background .12s}
  .nav-dropdown-item:last-child{border-bottom:none}
  .nav-dropdown-item:hover{background:#faf5ff}
  .nav-dropdown-icon{width:26px;height:26px;border-radius:6px;background:#f0e6fc;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0}
  .nav-dropdown-title{font-size:.82rem;font-weight:700;color:#370558}
  .nav-dropdown-sub{font-size:.7rem;color:#9b6cc0;margin-top:1px}
  .nav-badge-soon{font-size:.65rem;background:#f0e6fc;color:#7b2fa8;padding:1px 6px;border-radius:10px;margin-left:4px;font-weight:700}
  .nav-cta-btn{background:linear-gradient(135deg,#e8439a,#ff6fc1);color:white !important;font-size:.82rem;font-weight:700;padding:8px 16px;border-radius:50px;text-decoration:none;white-space:nowrap;box-shadow:0 3px 12px rgba(232,67,154,.35)}
  @media(max-width:600px){.nav-plain{display:none !important}}
"""

HEADER_HTML = f"""<header class="site-header">
  <a href="/" class="site-logo">🎓 {SITE_NAME}</a>
  <nav class="site-nav">
    <div class="nav-item">
      <span class="nav-link nav-plain">일대일 과외 <span class="nav-arrow">▾</span></span>
      <div class="nav-dropdown">
        <a href="/regions/" class="nav-dropdown-item">
          <div class="nav-dropdown-icon">📍</div>
          <div>
            <div class="nav-dropdown-title">지역별 과외</div>
            <div class="nav-dropdown-sub">동네 방문 · 화상 수업</div>
          </div>
        </a>
        <a href="#" class="nav-dropdown-item">
          <div class="nav-dropdown-icon">🏫</div>
          <div>
            <div class="nav-dropdown-title">학교별 과외 <span class="nav-badge-soon">준비중</span></div>
            <div class="nav-dropdown-sub">학교 내신 전문 대비</div>
          </div>
        </a>
      </div>
    </div>
    <a href="#" class="nav-link nav-plain">자기주도학습</a>
    <a href="#" class="nav-link nav-plain">코딩</a>
    <a href="{FORM_URL}" target="_blank" class="nav-cta-btn">📝 무료 상담 신청</a>
  </nav>
</header>"""

# ──────────────────────────────────────────────────────────
# ② 지역 데이터
#    → areas.txt 가 있으면 그 파일을 읽고,
#      없으면 아래 SAMPLE_AREAS 를 사용합니다.
#
#    areas.txt 형식 (탭 또는 콤마 구분):
#      시/도    구/군    동
#      서울특별시  강남구   역삼동
#      경기도    남양주시  다산동
#      ...
# ──────────────────────────────────────────────────────────

SAMPLE_AREAS = [
    # (시도,  구군,       동)
    ("서울특별시", "강남구",   "역삼동"),
    ("서울특별시", "강남구",   "대치동"),
    ("서울특별시", "강남구",   "개포동"),
    ("서울특별시", "송파구",   "잠실동"),
    ("서울특별시", "송파구",   "문정동"),
    ("서울특별시", "노원구",   "상계동"),
    ("서울특별시", "노원구",   "중계동"),
    ("서울특별시", "마포구",   "합정동"),
    ("서울특별시", "영등포구", "여의도동"),
    ("서울특별시", "관악구",   "신림동"),
    ("경기도",    "수원시",   "영통동"),
    ("경기도",    "수원시",   "팔달동"),
    ("경기도",    "성남시",   "분당동"),
    ("경기도",    "성남시",   "판교동"),
    ("경기도",    "남양주시", "다산동"),
    ("경기도",    "남양주시", "별내동"),
    ("경기도",    "고양시",   "일산동"),
    ("경기도",    "용인시",   "수지동"),
    ("경기도",    "부천시",   "상동"),
    ("경기도",    "안양시",   "평촌동"),
    ("인천광역시", "부평구",  "부평동"),
    ("인천광역시", "남동구",  "구월동"),
    ("인천광역시", "연수구",  "송도동"),
    ("부산광역시", "해운대구","좌동"),
    ("부산광역시", "해운대구","반여동"),
    ("부산광역시", "부산진구","전포동"),
    ("대구광역시", "수성구",  "범어동"),
    ("대구광역시", "수성구",  "만촌동"),
    ("대전광역시", "유성구",  "봉명동"),
    ("광주광역시", "북구",    "용봉동"),
    ("울산광역시", "남구",    "삼산동"),
]


def load_areas():
    """areas.txt 가 있으면 읽고, 없으면 샘플 사용"""
    p = Path("areas.txt")
    if not p.exists():
        return SAMPLE_AREAS
    rows = []
    for line in p.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.replace("\t", ",").split(",")
        if len(parts) >= 3:
            rows.append((parts[0].strip(), parts[1].strip(), parts[2].strip()))
    return rows if rows else SAMPLE_AREAS


# ══════════════════════════════════════════════════════════
# ③ 이미지 파일명 목록
#    실제 이미지를 /images/ 폴더에 같은 이름으로 넣어주세요.
# ══════════════════════════════════════════════════════════

IMAGES = [
    "study-01-desk.jpg",
    "study-02-book.jpg",
    "study-03-writing.jpg",
    "study-04-tutoring.jpg",
    "study-05-whiteboard.jpg",
    "study-06-math.jpg",
    "study-07-english.jpg",
    "study-08-korean.jpg",
    "study-09-science.jpg",
    "study-10-social.jpg",
    "study-11-result.jpg",
    "study-12-feedback.jpg",
    "study-13-smile.jpg",
]


# ══════════════════════════════════════════════════════════
# ④ 텍스트 조합 데이터 (랜덤 선택용)
# ══════════════════════════════════════════════════════════

# 학년별 특성
GRADE_TRAITS = {
    "초등": [
        "초등 시기는 학습 습관이 형성되는 가장 중요한 단계입니다.",
        "초등학생은 기초 개념을 탄탄히 잡아야 중·고등 과정이 수월해집니다.",
        "초등 과정에서 공부에 흥미를 붙이는 것이 장기적인 학업 성취의 핵심입니다.",
        "초등학교 시절 형성된 학습 습관은 이후 12년의 학업을 좌우합니다.",
    ],
    "중등": [
        "중학교 시기는 내신 관리가 본격적으로 시작되는 전환점입니다.",
        "중등 과정에서는 개념 이해와 함께 내신 시험 대비 전략이 필요합니다.",
        "중학교 성적은 고등학교 입시와 수능 준비의 기초가 됩니다.",
        "중학생 때 배우는 개념들은 고등 과정 전반에 걸쳐 반복 활용됩니다.",
    ],
    "고등": [
        "고등학교 시기는 수능과 내신을 동시에 잡아야 하는 가장 치열한 단계입니다.",
        "고등학생은 수능 목표 등급에 맞춘 체계적인 전략이 필요합니다.",
        "고등 과정에서는 단순 암기가 아닌 개념 응용력을 키우는 것이 핵심입니다.",
        "고등학교 3년은 대학 입시를 결정하는 결정적인 시간입니다.",
    ],
}

# 과목별 특성
SUBJECT_TRAITS = {
    "국어": [
        "국어는 모든 과목의 기초가 되는 언어 능력을 키우는 과목입니다.",
        "국어 실력은 독해력과 논리적 사고력을 동시에 향상시킵니다.",
        "국어는 문학과 비문학, 화법과 작문 전 영역을 균형 있게 학습해야 합니다.",
    ],
    "영어": [
        "영어는 내신과 수능 모두에서 높은 비중을 차지하는 핵심 과목입니다.",
        "영어 실력은 독해·문법·어휘·듣기를 체계적으로 쌓아야 완성됩니다.",
        "영어는 기초 문법부터 독해 전략까지 단계별로 접근하는 것이 효과적입니다.",
    ],
    "수학": [
        "수학은 개념 이해 없이 문제 풀이만 반복하면 실력이 정체됩니다.",
        "수학은 개념→유형→실전 3단계 학습이 가장 효과적입니다.",
        "수학 실력은 꾸준한 반복과 오답 분석으로 완성됩니다.",
    ],
    "과학": [
        "과학은 개념을 실생활과 연결해 이해할 때 오래 기억됩니다.",
        "과학은 암기보다 원리 이해가 선행되어야 서술형에서도 강해집니다.",
        "과학 과목은 실험·관찰 내용과 교과 개념을 함께 정리해야 합니다.",
    ],
    "사회": [
        "사회는 방대한 내용을 구조화해서 정리하는 것이 핵심입니다.",
        "사회는 흐름과 맥락으로 이해하면 암기량이 자연스럽게 줄어듭니다.",
        "사회 과목은 시사와 연결해 공부하면 흥미와 이해도가 모두 올라갑니다.",
    ],
}

# 서론 제목 패턴
INTRO_TITLES = [
    "{gu} {dong} {grade} {subject} 과외, 왜 지금 시작해야 할까요?",
    "{dong} {grade} {subject} 과외 선생님을 찾고 계신다면",
    "{city} {grade} {subject} 과외, 제대로 된 선생님이 필요한 이유",
    "{dong} 인근에서 {grade} {subject} 과외를 찾는 분들께",
    "성적이 오르지 않는 {grade} {subject}, 지금 바꿔야 합니다",
    "{gu} {dong} 방문 {grade} {subject} 과외의 모든 것",
]

# 본론 제목 패턴
BODY_TITLES = [
    "전문 선생님의 {grade} {subject} 과외, 이렇게 다릅니다",
    "{dong} {grade} {subject} 수업 커리큘럼 상세 안내",
    "실력이 오르는 {subject} 과외의 3가지 핵심 원칙",
    "{grade} {subject} 내신 대비, 이 방법이 정답입니다",
    "왜 {dong} 학부모님들이 스터디핏을 선택하는가",
    "{subject} 점수를 올리는 과외 전문 선생님의 맞춤 전략",
]

# 결론 제목 패턴
CONCLUSION_TITLES = [
    "{dong} {grade} {subject} 과외, 지금 바로 상담 신청하세요",
    "첫 수업 전 무료 상담으로 시작하세요",
    "{city} {grade} {subject} 과외 — 전문 선생님과 함께라면 달라집니다",
    "성적 향상의 첫걸음, 전문 선생님이 함께합니다",
    "지금 신청하면 {dong} 방문 수업 바로 시작 가능합니다",
]

# 서론 본문 조각
INTRO_BODIES = [
    (
        "{grade} {subject} 과외를 찾고 계신다면, 단순히 가까운 선생님보다 "
        "아이의 현재 수준과 목표에 맞는 맞춤형 지도를 해줄 수 있는 선생님이 필요합니다. "
        "{trait_grade} {trait_subject} "
        "{gu} {dong} 지역에서 방문 과외로 편하게 시작할 수 있습니다."
    ),
    (
        "{gu} {dong} 지역에서 {grade} {subject}을(를) 어디서 배워야 할지 고민 중이신가요? "
        "{trait_grade} 과외 전문 선생님은 {dong} 인근 방문 수업을 통해 "
        "학생 한 명 한 명에게 맞는 수업을 제공합니다. {trait_subject}"
    ),
    (
        "많은 학부모님들이 {grade} {subject} 과외를 알아볼 때 가장 고민하는 부분은 "
        "'과연 효과가 있을까?'입니다. "
        "{trait_subject} {trait_grade} "
        "과외 전문 선생님은 {gu} {dong} 방문 수업으로 학생의 집에서 편안하게 집중할 수 있는 환경을 만들어 드립니다."
    ),
]

# 본론 본문 조각 (학년별)
BODY_BODIES = {
    "초등": [
        (
            "초등 {subject} 과외에서 가장 중요한 것은 '흥미'입니다. "
            "아이가 공부를 즐겁게 느낄 수 있도록 게임형 학습, 스토리텔링 방식을 적극 활용합니다. "
            "기초 개념을 쉽고 재미있게 전달하며, 매 수업마다 소소한 성취감을 느낄 수 있도록 설계합니다. "
            "초등 시기에 {subject}에 자신감을 갖게 되면, 중학교 진학 후에도 자기주도 학습이 자연스럽게 이어집니다. "
            "{trait_subject} "
            "수업 후에는 학부모님께 당일 수업 내용과 아이의 반응을 카카오톡으로 공유해드립니다."
        ),
        (
            "초등 {subject} 과외는 단순한 선행보다 현재 학년 수준의 완전한 이해가 우선입니다. "
            "교과서 중심으로 개념을 완벽히 익힌 뒤, 아이의 속도에 맞춰 다음 단계로 나아갑니다. "
            "과외 전문 선생님은 초등학생의 집중력 특성을 고려해 40~50분 단위로 수업을 구성하고, "
            "중간중간 짧은 환기 시간을 넣어 끝까지 집중할 수 있도록 도와줍니다. "
            "{trait_subject}"
        ),
    ],
    "중등": [
        (
            "중학교 {subject} 과외는 내신 시험 일정을 기준으로 커리큘럼을 역설계합니다. "
            "시험 6주 전부터 단원별 개념 정리 → 기출 분석 → 실전 모의고사 순으로 진행합니다. "
            "{trait_subject} "
            "특히 서술형 문제는 중간·기말 모두 배점이 크기 때문에 답안 작성법을 별도로 훈련합니다. "
            "매 수업 후 오답노트를 함께 작성하며 약점을 체계적으로 보완합니다."
        ),
        (
            "중학교 시기의 {subject} 성적은 고등학교 수업에 직접적인 영향을 줍니다. "
            "{trait_subject} "
            "과외 전문 선생님은 중학교 {subject} 수업에서 '왜?'를 먼저 이해하는 방식을 고집합니다. "
            "단순 암기 대신 원리를 파악하면 응용 문제에서도 흔들리지 않는 실력이 만들어집니다. "
            "학교 수업 예습·복습 연계 지도로 학교에서도 자신 있게 발표하고 손들 수 있게 됩니다."
        ),
    ],
    "고등": [
        (
            "고등 {subject} 과외는 수능과 내신, 두 마리 토끼를 동시에 잡아야 합니다. "
            "수능 출제 경향을 분석한 커리큘럼으로 진도를 나가되, "
            "학교 내신 시험 시기에는 해당 학교 기출문제 중심으로 전환합니다. "
            "{trait_subject} "
            "1등급을 목표로 한다면 고난도 문제를 반복 풀고 사고 과정을 글로 정리하는 훈련이 필수입니다."
        ),
        (
            "고등학교 {subject} 점수가 오르지 않는 가장 큰 이유는 '개념의 구멍'입니다. "
            "과외 전문 선생님은 수업 초반에 진단 테스트를 통해 개념 누락 부분을 먼저 확인합니다. "
            "빠진 개념을 채우고 나면 문제 풀이 속도와 정확도가 동시에 올라갑니다. "
            "{trait_subject} "
            "고3 수험생은 모의고사 분석 → 취약 단원 집중 → 실전 훈련 사이클로 수능까지 전략적으로 준비합니다."
        ),
    ],
}

# 결론 본문 조각
CONCLUSION_BODIES = [
    (
        "{gu} {dong} {grade} {subject} 과외를 고민 중이시라면 지금 바로 무료 상담을 신청해보세요. "
        "첫 상담에서는 아이의 현재 수준, 목표 성적, 선호하는 수업 방식을 꼼꼼히 파악합니다. "
        "상담 후 커리큘럼 초안을 제시해드리며, 수업이 시작되면 매달 학습 리포트를 제공합니다. "
        "{dong} 인근 방문 수업이 가능하며, 원거리라면 화상 수업으로도 진행할 수 있습니다."
    ),
    (
        "지금 {gu} {dong}에서 {grade} {subject} 과외를 찾고 계신다면, "
        "스터디핏 과외 전문 선생님이 좋은 선택이 될 것입니다. "
        "수업 횟수와 시간은 학생 스케줄에 맞게 유연하게 조정 가능합니다. "
        "무료 상담 후 첫 수업까지 보통 3~5일 이내에 시작할 수 있습니다. "
        "상담은 전화 또는 네이버 폼으로 편하게 신청해주세요."
    ),
    (
        "{grade} {subject} 실력을 올리는 가장 빠른 방법은 자신에게 맞는 선생님을 만나는 것입니다. "
        "과외 전문 선생님은 {gu} {dong} 지역 학생들의 학교 교육과정과 내신 출제 경향을 잘 파악하고 있습니다. "
        "첫 수업 전 무료 상담을 통해 아이에게 꼭 맞는 수업 계획을 함께 세워보세요."
    ),
]

# FAQ — 고정 5개 질문 (모든 페이지 동일)
FIXED_FAQ = [
    (
        "과외 수업은 어떻게 진행이 되나요?",
        "수업은 학생의 집으로 방문하는 방문과외와 온라인 라이브 화상과외로 수업을 진행합니다. "
        "학생과 학부모님의 편의에 맞춰서 선택할 수 있습니다. "
        "방문 수업의 경우 학생이 편안한 환경에서 집중할 수 있으며, "
        "실시간 라이브 화상 수업은 시간과 장소의 제약 없이 전국의 과목별 선생님을 만나 효율적인 학습을 할 수 있습니다."
    ),
    (
        "선생님은 어떤 분이신가요?",
        "검증된 경력의 전문 과외 선생님이 수업합니다. "
        "과외는 학생과 선생님의 합이 중요한 만큼 상담 후 최적의 선생님을 매칭해 드립니다. "
        "수업 시작이 되더라도 학생과 맞지 않으면 선생님 교체가 가능합니다."
    ),
    (
        "수업료는 얼마인가요?",
        "학년, 과목, 수업 횟수, 수업 방식에 따라 달라집니다. "
        "보통 초등학생의 경우 방문 기준 주 2회 1시간의 경우 25만 원대, "
        "중학생은 33만 원대, 고등학생은 33만 원에서 55만 원 선으로 책정됩니다. "
        "정확한 수업료는 학생 실력과 목표에 따라 달라질 수 있습니다. "
        "무료 상담을 통해 학생에게 맞는 수업 계획과 정확한 비용을 안내받으세요."
    ),
    (
        "교재는 어떻게 준비하나요?",
        "학생이 사용 중인 교재가 맞는 교재라면 그 교재를 활용하기도 하지만, 수준과 목표에 맞는 교재를 선정합니다. "
        "학교 교과서, 기본서, 심화, 기출문제집을 활용하여 수업을 진행하며, "
        "필요에 따라 선생님이 직접 맞춤 자료를 제공하기도 합니다."
    ),
    (
        "첫 수업 전에 상담받을 수 있을까요?",
        "네, 첫 수업 전 무료 상담을 진행합니다. "
        "전화나 혹은 당장 통화가 어려운 경우 네이버폼으로 무료 상담을 신청하시면 됩니다. "
        "상담을 통해 학생의 실력과 목표를 파악하여 최적의 계획을 수립하기 때문에, "
        "상담 후 시범수업을 통해 수업 진행 여부를 결정하시면 됩니다."
    ),
]

# 수업 특징 아이템 (랜덤 선택)
FEATURE_POOL = [
    ("📍", "방문·화상 모두 가능", "학생 집 근처 방문 수업, 원거리는 화상으로 편리하게 진행합니다."),
    ("📊", "{subject} 맞춤 커리큘럼", "학생 수준 진단 후 목표에 맞는 커리큘럼을 설계합니다."),
    ("🎯", "{grade} 전문 지도", "{grade_trait}"),
    ("💬", "학부모 피드백 제공", "매 수업 후 학습 현황을 피드백 해 드립니다."),
    ("📝", "오답노트 관리", "틀린 문제를 체계적으로 정리하고 반복 학습으로 완전 이해를 만듭니다."),
    ("🏆", "내신 집중 대비", "시험 전 6주 내신 모드 전환으로 내신 성적을 집중 관리합니다."),
    ("🔍", "수준 진단 테스트", "첫 수업 전 진단 테스트로 정확한 현재 수준을 파악합니다."),
    ("📖", "맞춤 교재 선정", "시중 교재 중 학생 수준과 목표에 꼭 맞는 교재를 선정해 드립니다."),
    ("✏️", "개념·문제풀이 병행", "개념 이해와 문제풀이를 균형 있게 진행하여 실력을 탄탄히 쌓습니다."),
    ("🌟", "동기부여 코칭", "성적 향상뿐 아니라 학습 습관과 자신감을 함께 키워드립니다."),
    ("📈", "성적 향상 관리", "수업별 진도와 성취도를 기록하여 꾸준한 성적 향상을 관리합니다."),
    ("🤝", "1:1 전담 관리", "담당 선생님이 처음부터 끝까지 한 학생만 전담으로 책임 지도합니다."),
]

GRADE_SHORT_TRAIT = {
    "초등": "초등 기초를 탄탄히 다져 중학교 과정을 자신 있게 시작합니다.",
    "중등": "내신 대비부터 고등 선행까지 체계적으로 지도합니다.",
    "고등": "수능·내신 동시 대비, 목표 대학 합격을 함께 준비합니다.",
}


# ══════════════════════════════════════════════════════════
# ⑤ 콘텐츠 생성 함수 (텍스트 조합)
# ══════════════════════════════════════════════════════════

def seed(city, dong, grade, subject):
    """페이지마다 고유한 시드값 → 항상 같은 랜덤 결과 보장"""
    key = f"{city}{dong}{grade}{subject}"
    return int(hashlib.md5(key.encode()).hexdigest(), 16) % (2**32)


def pick(rng, lst):
    return lst[rng.randint(0, len(lst) - 1)]


def make_intro(rng, city, gu, dong, grade, subject):
    title = pick(rng, INTRO_TITLES).format(
        city=city, gu=gu, dong=dong, grade=grade, subject=subject)
    body = pick(rng, INTRO_BODIES).format(
        city=city, gu=gu, dong=dong, grade=grade, subject=subject,
        trait_grade=pick(rng, GRADE_TRAITS[grade]),
        trait_subject=pick(rng, SUBJECT_TRAITS[subject]),
    )
    return title, body


def make_body(rng, city, gu, dong, grade, subject):
    title = pick(rng, BODY_TITLES).format(
        city=city, gu=gu, dong=dong, grade=grade, subject=subject)
    body = pick(rng, BODY_BODIES[grade]).format(
        city=city, gu=gu, dong=dong, grade=grade, subject=subject,
        trait_subject=pick(rng, SUBJECT_TRAITS[subject]),
    )
    return title, body


def make_conclusion(rng, city, gu, dong, grade, subject):
    title = pick(rng, CONCLUSION_TITLES).format(
        city=city, gu=gu, dong=dong, grade=grade, subject=subject)
    body = pick(rng, CONCLUSION_BODIES).format(
        city=city, gu=gu, dong=dong, grade=grade, subject=subject)
    return title, body


def make_features(rng, subject, grade):
    pool = list(FEATURE_POOL)
    rng.shuffle(pool)
    chosen = pool[:4]
    result = []
    for icon, title, desc in chosen:
        result.append((
            icon,
            title.format(subject=subject, grade=grade),
            desc.format(
                subject=subject, grade=grade, dong="{dong}",
                grade_trait=GRADE_SHORT_TRAIT[grade]
            )
        ))
    return result


def make_faq(rng, dong, grade):
    return [(q, a) for q, a in FIXED_FAQ]


def pick_images(rng, count=13):
    return IMAGES  # 항상 01~13 고정 순서


# ══════════════════════════════════════════════════════════
# ⑥ SEO 헬퍼
# ══════════════════════════════════════════════════════════

def make_meta_description(city, gu, dong, grade, subject):
    return (
        f"{city} {gu} {dong} {grade} {subject} 과외 전문 선생님을 찾고 계신가요? "
        f"제나쌤의 스터디핏 과외에서 {dong} 인근 {grade} {subject} 방문 과외 선생님을 연결해 드립니다. "
        f"내신·수능 대비, 기초부터 심화까지 맞춤 수업. 무료 상담 가능."
    )

def make_keywords(city, gu, dong, grade, subject):
    return ", ".join([
        f"{dong} {grade} {subject} 과외",
        f"{city} {gu} {grade} {subject} 과외",
        f"{city} {grade} {subject} 과외",
        f"{dong} 과외",
        f"{city} {gu} 과외",
        f"{grade} {subject} 과외 선생님",
        f"{dong} 방문 과외",
    ])


# ══════════════════════════════════════════════════════════
# ⑦ HTML 생성
# ══════════════════════════════════════════════════════════

def html_page(city, gu, dong, grade, subject, slug):
    rng = random.Random(seed(city, dong, grade, subject))

    title_tag = f"{city} {gu} {dong} {grade} {subject} 과외 | {SITE_NAME}"
    description = make_meta_description(city, gu, dong, grade, subject)
    keywords    = make_keywords(city, gu, dong, grade, subject)
    canonical   = f"{SITE_DOMAIN}/{slug}/"

    intro_title,      intro_body      = make_intro(rng, city, gu, dong, grade, subject)
    body_title,       body_body       = make_body(rng, city, gu, dong, grade, subject)
    conclusion_title, conclusion_body = make_conclusion(rng, city, gu, dong, grade, subject)
    features = make_features(rng, subject, grade)
    faqs     = make_faq(rng, dong, grade)
    images   = pick_images(rng)

    # ── 수업 특징 HTML ──
    features_html = ""
    for icon, ftitle, fdesc in features:
        features_html += f"""
        <div class="feature-item">
          <div class="feature-icon">{icon}</div>
          <div class="feature-text">
            <h3>{ftitle}</h3>
            <p>{fdesc}</p>
          </div>
        </div>"""

    # ── FAQ HTML ──
    faq_html = ""
    for q, a in faqs:
        faq_html += f"""
        <div class="faq-item">
          <div class="faq-q">Q. {q}</div>
          <div class="faq-a">{a}</div>
        </div>"""

    # ── 이미지 HTML (3열 그리드) ──
    imgs_html = ""
    for img in images:
        alt = f"{dong} {grade} {subject} 과외 수업 사진"
        imgs_html += f'<div class="img-item"><img src="/images/{img}" alt="{alt}" loading="lazy"></div>\n'

    # ── 관련 과목 HTML ──
    ALL_SUBJECTS = ["국어", "영어", "수학", "과학", "사회"]
    SUBJECT_ICONS = {"국어": "📖", "영어": "🌍", "수학": "📐", "과학": "🔬", "사회": "🗺️"}
    SUBJECT_DESC = {
        "국어": "독해 · 논술",
        "영어": "문법 · 독해",
        "수학": "개념 · 문제풀이",
        "과학": "개념 · 원리",
        "사회": "흐름 · 암기",
    }
    SUBJECT_LIST_DESC = {
        "국어": "독해력 · 문학 · 비문학 · 서술형 대비",
        "영어": "문법 · 독해 · 어휘 · 내신 대비",
        "수학": "개념 이해 · 유형 · 실전 문제풀이",
        "과학": "개념 · 원리 이해 · 실험 정리 · 서술형",
        "사회": "흐름 · 맥락 · 암기 전략",
    }

    # 고등일 때 과학→통합과학, 사회→통합사회
    def get_display_subject(subj, gr):
        if gr == "고등":
            if subj == "과학": return "통합과학"
            if subj == "사회": return "통합사회"
        return subj

    related_subjects = [s for s in ALL_SUBJECTS if s != subject]

    # 배너형 HTML
    related_banner_html = ""
    for s in related_subjects:
        disp = get_display_subject(s, grade)
        desc = SUBJECT_DESC.get(s, "")
        href = f"/{city}-{gu}-{dong}-{grade}-{s}-과외/".replace(" ", "-")
        related_banner_html += f"""<a href="{href}" style="background:white;border:1px solid #e8d6f5;border-radius:10px;padding:12px 8px;text-align:center;text-decoration:none;display:block;transition:all .15s" onmouseover="this.style.background='#510580';this.querySelector('.bs').style.color='white';this.querySelector('.bd').style.color='rgba(255,255,255,0.7)'" onmouseout="this.style.background='white';this.querySelector('.bs').style.color='#370558';this.querySelector('.bd').style.color='#9b6cc0'">
  <div class="bs" style="font-size:.82rem;font-weight:700;color:#370558;margin-bottom:3px">{disp} 과외</div>
  <div class="bd" style="font-size:.72rem;color:#9b6cc0">{desc}</div>
</a>"""

    # 리스트형 HTML
    related_list_html = ""
    for s in related_subjects:
        disp = get_display_subject(s, grade)
        icon = SUBJECT_ICONS.get(s, "📚")
        list_desc = SUBJECT_LIST_DESC.get(s, "")
        href = f"/{city}-{gu}-{dong}-{grade}-{s}-과외/".replace(" ", "-")
        related_list_html += f"""<a href="{href}" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #f0e6fc;text-decoration:none;background:white;transition:background .12s" onmouseover="this.style.background='#faf5ff'" onmouseout="this.style.background='white'">
  <div style="display:flex;align-items:center;gap:10px">
    <div style="width:30px;height:30px;border-radius:50%;background:#f0e6fc;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">{icon}</div>
    <div>
      <div style="font-size:.85rem;font-weight:700;color:#370558">{grade} {disp} 과외</div>
      <div style="font-size:.72rem;color:#9b6cc0;margin-top:2px">{list_desc}</div>
    </div>
  </div>
  <div style="font-size:.85rem;color:#c9a3e8;flex-shrink:0">→</div>
</a>"""

    return f"""<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="naver-site-verification" content="511e0e2c64d12cf657363087cf302e40e3e1ac5c" />
  <title>{title_tag}</title>
  <meta name="description" content="{description}">
  <meta name="keywords" content="{keywords}">
  <link rel="canonical" href="{canonical}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="{title_tag}">
  <meta property="og:description" content="{description}">
  <meta property="og:url" content="{canonical}">
  <meta property="og:site_name" content="{SITE_NAME}">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "{SITE_NAME}",
    "description": "{description}",
    "telephone": "{PHONE}",
    "url": "{canonical}",
    "address": {{
      "@type": "PostalAddress",
      "addressLocality": "{city}",
      "addressRegion": "{gu}",
      "streetAddress": "{dong}"
    }},
    "areaServed": "{dong}"
  }}
  </script>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {{
      --primary:      #510580;
      --primary-dark: #370558;
      --primary-light:#7b2fa8;
      --accent:       #e8439a;
      --accent-light: #ff6fc1;
      --accent-glow:  rgba(232,67,154,.3);
      --bg:           #ffffff;
      --bg2:          #f5eefe;
      --text:         #1a0a24;
      --muted:        #7a5f8a;
      --border:       #e8d6f5;
      --white:        #ffffff;
      --max-w:        780px;
    }}
    *, *::before, *::after {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: 'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.8;
      font-size: 1rem;
    }}

    /* ── HEADER ── */
    header {{
      background: var(--white);
      border-bottom: 2px solid var(--border);
      padding: 14px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 200;
      box-shadow: 0 2px 16px rgba(81,5,128,.07);
    }}
    .logo {{ font-size: 1.05rem; font-weight: 800; color: var(--primary); text-decoration: none; }}
    .header-cta {{
      background: linear-gradient(135deg, var(--accent), var(--accent-light));
      color: white;
      padding: 8px 18px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 700;
      font-size: .85rem;
      box-shadow: 0 3px 12px var(--accent-glow);
      white-space: nowrap;
    }}

    /* ── HERO ── */
    .hero {{
      background: linear-gradient(140deg, var(--primary-dark) 0%, var(--primary) 55%, var(--primary-light) 100%);
      color: white;
      padding: 56px 24px 48px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }}
    .hero::before {{
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(ellipse 70% 60% at 85% 15%, rgba(232,67,154,.22) 0%, transparent 65%);
      pointer-events: none;
    }}
    .hero-badge {{
      display: inline-block;
      background: rgba(255,255,255,.15);
      border: 1px solid rgba(255,255,255,.3);
      padding: 4px 14px;
      border-radius: 20px;
      font-size: .75rem;
      font-weight: 600;
      letter-spacing: .07em;
      margin-bottom: 16px;
    }}
    .hero h1 {{
      font-size: clamp(1.5rem, 4vw, 2.3rem);
      font-weight: 800;
      line-height: 1.3;
      margin-bottom: 14px;
      position: relative;
    }}
    .hero-sub {{
      font-size: .95rem;
      opacity: .85;
      max-width: 440px;
      margin: 0 auto 28px;
    }}
    .hero-btns {{ display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }}
    .btn-main {{
      background: linear-gradient(135deg, var(--accent), var(--accent-light));
      color: white;
      padding: 13px 28px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 700;
      font-size: .95rem;
      box-shadow: 0 5px 18px var(--accent-glow);
    }}
    .btn-outline {{
      background: rgba(255,255,255,.12);
      color: white;
      border: 1.5px solid rgba(255,255,255,.4);
      padding: 13px 24px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      font-size: .95rem;
    }}

    /* ── LAYOUT ── */
    .wrap {{ max-width: var(--max-w); margin: 0 auto; padding: 0 20px; }}

    /* ── BREADCRUMB ── */
    .breadcrumb {{
      font-size: .78rem;
      color: var(--muted);
      padding: 12px 0 8px;
    }}
    .breadcrumb a {{ color: var(--primary); text-decoration: none; }}

    /* ── BLOG SECTION (서론/본론/결론) ── */
    .blog-section {{ padding: 40px 0 20px; }}
    .blog-section h2 {{
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--primary-dark);
      margin-bottom: 16px;
      padding-bottom: 10px;
      border-bottom: 2px solid var(--border);
    }}
    .blog-body {{
      font-size: .97rem;
      line-height: 1.9;
      color: #2d1840;
      word-break: keep-all;
    }}

    /* ── DIVIDER ── */
    .divider {{
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--border), transparent);
      margin: 8px 0;
    }}

    /* ── 수업 특징 ── */
    .feature-section {{ padding: 32px 0; }}
    .section-label {{
      display: inline-block;
      background: var(--primary);
      color: white;
      font-size: .75rem;
      font-weight: 700;
      padding: 3px 12px;
      border-radius: 4px;
      margin-bottom: 16px;
      letter-spacing: .06em;
    }}
    .section-title {{
      font-size: 1.2rem;
      font-weight: 800;
      color: var(--primary-dark);
      margin-bottom: 20px;
    }}
    .feature-list {{ display: flex; flex-direction: column; }}
    .feature-item {{
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 18px 0;
      border-bottom: 1px solid var(--border);
    }}
    .feature-item:last-child {{ border-bottom: none; }}
    .feature-icon {{
      font-size: 1.4rem;
      width: 44px; height: 44px;
      min-width: 44px;
      background: var(--bg2);
      border-radius: 10px;
      border: 1.5px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
    }}
    .feature-text h3 {{
      font-size: .95rem;
      font-weight: 700;
      color: var(--primary-dark);
      margin-bottom: 3px;
    }}
    .feature-text p {{ font-size: .875rem; color: var(--muted); }}

    /* ── 이미지 갤러리 ── */
    .gallery-section {{ padding: 32px 0; }}
    .img-grid {{
      display: flex;
      flex-direction: column;
      gap: 12px;
    }}
    .img-item img {{
      width: 100%;
      height: auto;
      border-radius: 10px;
      border: 1.5px solid var(--border);
      display: block;
    }}

    /* ── FAQ ── */
    .faq-section {{ padding: 32px 0; }}
    .faq-list {{ display: flex; flex-direction: column; gap: 10px; }}
    .faq-item {{
      background: #f5eefe;
      border: 1.5px solid var(--border);
      border-radius: 12px;
      padding: 18px 20px;
    }}
    .faq-q {{
      font-weight: 700;
      color: var(--primary-dark);
      margin-bottom: 6px;
      font-size: .95rem;
    }}
    .faq-a {{ font-size: .875rem; color: var(--muted); line-height: 1.7; }}

    /* ── CTA 박스 ── */
    .cta-section {{ padding: 32px 0 48px; }}
    .cta-box {{
      background: linear-gradient(135deg, var(--primary-dark), var(--primary), var(--primary-light));
      color: white;
      border-radius: 20px;
      padding: 44px 28px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }}
    .cta-box::after {{
      content: '';
      position: absolute;
      top: -50px; right: -50px;
      width: 220px; height: 220px;
      background: radial-gradient(circle, rgba(232,67,154,.25) 0%, transparent 65%);
      pointer-events: none;
    }}
    .cta-box h2 {{ font-size: 1.4rem; font-weight: 800; margin-bottom: 10px; }}
    .cta-box p {{ opacity: .85; margin-bottom: 24px; font-size: .95rem; }}
    .cta-btns {{ display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }}
    .cta-phone {{
      background: white;
      color: #510580;
      font-size: 1rem;
      font-weight: 800;
      padding: 13px 22px;
      border-radius: 50px;
      text-decoration: none;
      box-shadow: 0 4px 16px rgba(0,0,0,.18);
    }}
    .cta-kakao {{
      background: #FEE500;
      color: #3A1D1D;
      font-size: 1rem;
      font-weight: 800;
      padding: 13px 22px;
      border-radius: 50px;
      text-decoration: none;
      box-shadow: 0 4px 16px rgba(254,229,0,.4);
    }}
    .cta-form {{
      background: linear-gradient(135deg,#e8439a,#ff6fc1);
      color: white;
      font-size: 1rem;
      font-weight: 800;
      padding: 13px 22px;
      border-radius: 50px;
      text-decoration: none;
      box-shadow: 0 4px 16px rgba(232,67,154,.4);
    }}

    /* ── FOOTER ── */
    footer {{
      background: var(--primary-dark);
      color: rgba(255,255,255,.45);
      text-align: center;
      padding: 24px;
      font-size: .78rem;
      line-height: 1.8;
    }}

    /* ── 플로팅 버튼 ── */
    .float-wrap {{
      position: fixed;
      bottom: 28px;
      right: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      z-index: 999;
    }}
    .float-btn {{
      width: 54px;
      height: 54px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      text-decoration: none;
      box-shadow: 0 4px 16px rgba(0,0,0,.2);
      transition: transform .15s, box-shadow .15s;
      position: relative;
    }}
    .float-btn:hover {{
      transform: translateY(-3px);
      box-shadow: 0 8px 24px rgba(0,0,0,.28);
    }}
    .float-btn.phone {{
      background: #510580;
    }}
    .float-btn.kakao {{
      background: #FEE500;
    }}
    .float-btn.form {{
      background: #7b2fa8;
    }}
    .float-btn .kakao-icon {{
      width: 28px;
      height: 28px;
    }}
    .float-label {{
      position: absolute;
      right: 62px;
      background: rgba(30,10,40,.85);
      color: white;
      font-size: .7rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 20px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity .2s;
    }}
    .float-btn:hover .float-label {{
      opacity: 1;
    }}
    @media (max-width: 600px) {{
      .float-wrap {{ bottom: 20px; right: 14px; gap: 8px; }}
      .float-btn {{ width: 50px; height: 50px; font-size: 1.3rem; }}
      .float-btn .kakao-icon {{ width: 26px; height: 26px; }}
    }}

    /* ── PC/모바일 분기 ── */
    @media (max-width: 600px) {{
      .hero {{ padding: 40px 16px 36px; }}
      .hero-btns {{ flex-direction: column; align-items: center; }}
      .img-grid {{ grid-template-columns: repeat(2, 1fr); }}
      .cta-box {{ padding: 36px 20px; }}
      .cta-btns {{ flex-direction: column; align-items: center; }}
      .pc-only {{ display: none !important; }}
    }}
    @media (min-width: 601px) {{
      .mobile-only {{ display: none !important; }}
    }}
  </style>
  <style>{HEADER_CSS}</style>
</head>
<body>

<!-- HEADER -->
{HEADER_HTML}

<!-- HERO -->
<div class="hero">
  <div class="hero-badge">{gu} · {dong} 전문</div>
  <h1>{gu} {dong}<br>{grade} {subject} 과외</h1>
  <p class="hero-sub">방문/화상 수업 · 내신/수능 맞춤 · 무료 시범수업 가능</p>
  <div class="hero-btns">
    <a href="tel:{PHONE}" class="btn-main mobile-only">📞 지금 바로 상담하기</a>
    <a href="{FORM_URL}" target="_blank" class="btn-main pc-only">📝 무료 상담 신청하기</a>
    <a href="#faq" class="btn-outline">자주 묻는 질문 ↓</a>
  </div>
</div>

<div class="wrap">

  <!-- 브레드크럼 -->
  <nav class="breadcrumb" aria-label="breadcrumb">
    <a href="/regions/">홈</a> › <a href="/{city}/">{city}</a> › <a href="/{city}/{gu}/">{gu}</a> › {dong} {grade} {subject} 과외
  </nav>

  <div class="divider"></div>

  <!-- ① 서론 -->
  <section class="blog-section">
    <h2>{intro_title}</h2>
    <p class="blog-body">{intro_body}</p>
  </section>

  <div class="divider"></div>

  <!-- ② 수업 특징 -->
  <section class="feature-section">
    <span class="section-label">수업 특징</span>
    <h2 class="section-title">제나쌤스터디핏 과외가 다른 이유</h2>
    <div class="feature-list">
      {features_html}
    </div>
  </section>

  <!-- ② 관련 과목 배너형 -->
  <section style="margin-top:20px">
    <div style="background:#f0e6fc;border:1px solid #d4b8f5;border-radius:14px;padding:18px 20px">
      <div style="font-size:.72rem;font-weight:700;color:#7b2fa8;margin-bottom:6px">같은 지역 · 같은 학년</div>
      <div style="font-size:.9rem;font-weight:700;color:#370558;margin-bottom:14px">{dong} {grade} 다른 과목 과외도 찾아보세요</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">
        {related_banner_html}
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- ③ 본론 -->
  <section class="blog-section">
    <h2>{body_title}</h2>
    <p class="blog-body">{body_body}</p>
  </section>

  <div class="divider"></div>

  <!-- ④ 이미지 갤러리 -->
  <section class="gallery-section">
    <div class="img-grid">
      {imgs_html}
    </div>
  </section>

  <div class="divider"></div>

  <!-- ⑤ FAQ -->
  <section class="faq-section" id="faq">
    <span class="section-label">자주 묻는 질문</span>
    <div class="faq-list">
      {faq_html}
    </div>
  </section>

  <div class="divider"></div>

  <!-- ⑥ 결론 -->
  <section class="blog-section">
    <h2>{conclusion_title}</h2>
    <p class="blog-body">{conclusion_body}</p>
  </section>

  <!-- ⑦ 수업 문의 CTA -->
  <section class="cta-section">
    <div class="cta-box">
      <h2>지금 바로 무료 상담받으세요</h2>
      <p>{gu} {dong} {grade} {subject} 과외 — 빠른 상담, 맞춤 배정</p>
      <div class="cta-btns">
        <a href="tel:{PHONE}" class="cta-phone">📞 전화 상담</a>
        <a href="{KAKAO_URL}" target="_blank" class="cta-kakao">💬 카카오톡 상담</a>
        <a href="{FORM_URL}" target="_blank" class="cta-form">📝 무료 체험 신청</a>
      </div>
    </div>
  </section>

  <!-- ⑧ 관련 과목 리스트형 -->
  <section style="margin-top:10px;margin-bottom:48px">
    <div style="background:white;border:1px solid #e8d6f5;border-radius:14px;overflow:hidden">
      <div style="padding:13px 16px;border-bottom:1px solid #f0e6fc;background:#faf5ff;display:flex;align-items:center;justify-content:space-between">
        <span style="font-size:.88rem;font-weight:700;color:#370558">{dong} {grade} 다른 과목 과외</span>
        <span style="font-size:.72rem;color:#9b6cc0">클릭해서 바로 확인 →</span>
      </div>
      {related_list_html}
    </div>
  </section>

</div><!-- /wrap -->

{FOOTER_HTML}

<!-- 플로팅 버튼 -->
<div class="float-wrap">
    <a href="{FORM_URL}" target="_blank" class="float-btn form">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
    </svg>
    <span class="float-label">무료 체험 신청</span>
  </a>
  <a href="{KAKAO_URL}" target="_blank" class="float-btn kakao">
    <svg class="kakao-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.7 1.644 5.08 4.148 6.538L5.2 20.4a.3.3 0 0 0 .438.328l4.07-2.7A11.4 11.4 0 0 0 12 18.6c5.523 0 10-3.477 10-7.8S17.523 3 12 3z" fill="#3A1D1D"/>
    </svg>
    <span class="float-label" style="color:white">카카오톡 상담</span>
  </a>
      <a href="tel:{PHONE}" class="float-btn phone">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
    </svg>
    <span class="float-label">전화 상담</span>
  </a>
</div>

</body>
</html>"""


# ══════════════════════════════════════════════════════════
# ⑧ 메인 홈페이지
# ══════════════════════════════════════════════════════════

def html_main():
    return f"""<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="naver-site-verification" content="511e0e2c64d12cf657363087cf302e40e3e1ac5c" />
  <title>전국 방문·화상 과외 전문 | {SITE_NAME}</title>
  <meta name="description" content="베테랑 선생님의 1:1 맞춤 과외. 초·중·고 전과목 내신 전문. 무료 시범수업 신청 가능.">
  <link rel="canonical" href="{SITE_DOMAIN}/">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;800&display=swap" rel="stylesheet">
  <style>
    *{{box-sizing:border-box;margin:0;padding:0}}
    body{{font-family:'Noto Sans KR',sans-serif;background:#fff;color:#1a0a24}}

    /* 헤더 */
    header{{background:white;padding:14px 24px;border-bottom:2px solid #e8d6f5;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:100}}
    .logo{{font-size:1.05rem;font-weight:800;color:#510580;text-decoration:none}}
    nav{{display:flex;gap:24px;align-items:center;list-style:none}}
    nav a{{font-size:.9rem;color:#1a0a24;text-decoration:none;font-weight:700}}
    .nav-cta{{background:linear-gradient(135deg,#e8439a,#ff6fc1);color:white !important;font-size:.85rem;font-weight:700;padding:9px 20px;border-radius:50px;box-shadow:0 4px 14px rgba(232,67,154,.4)}}

    /* 히어로 */
    .hero{{background:linear-gradient(140deg,#370558,#510580,#7b2fa8);color:white;padding:60px 24px;text-align:center}}
    .hero-badge{{display:inline-block;background:rgba(255,255,255,.15);color:white;font-size:.78rem;font-weight:700;padding:5px 16px;border-radius:20px;margin-bottom:16px;border:1px solid rgba(255,255,255,.3)}}
    .hero h1{{font-size:clamp(1.6rem,4vw,2.4rem);font-weight:800;line-height:1.45;margin-bottom:10px;color:white}}
    .hero p{{font-size:.95rem;color:white;opacity:.85;margin-bottom:28px}}
    .hero-btns{{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}}
    .btn-pink{{background:linear-gradient(135deg,#e8439a,#ff6fc1);color:white;padding:13px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;box-shadow:0 4px 14px rgba(232,67,154,.4)}}
    .btn-outline-w{{background:transparent;color:white;padding:13px 28px;border-radius:50px;font-weight:700;font-size:.95rem;border:1.5px solid rgba(255,255,255,.5);text-decoration:none}}

    /* 스탯 바 */
    .stats-bar{{background:#510580;padding:22px 24px}}
    .stats-inner{{max-width:900px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center}}
    .stat-num{{font-size:1.3rem;font-weight:800;color:white}}
    .stat-label{{font-size:.7rem;color:rgba(255,255,255,.7);margin-top:2px}}

    /* 섹션 공통 */
    .sec{{max-width:900px;margin:0 auto;padding:82px 24px}}
    .sec-label{{display:inline-block;font-size:.72rem;font-weight:700;color:#7b2fa8;background:#f0e6fc;padding:4px 12px;border-radius:20px;margin-bottom:10px;letter-spacing:.08em}}
    .sec-title{{font-size:clamp(1.3rem,3vw,1.6rem);font-weight:800;color:#1a0a24;line-height:1.4;margin-bottom:8px}}
    .sec-sub{{font-size:.88rem;color:#6b6b8a;line-height:1.8;margin-bottom:28px}}
    .sec-divider{{border:none;border-top:1px solid #f0e6fc;margin:0}}

    /* 진단 */
    .diag-grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px}}
    .diag-card{{background:#f5eefe;border-radius:12px;padding:18px;border:1.5px solid #e8d6f5}}
    .diag-num{{font-size:.72rem;font-weight:800;color:#7b2fa8;margin-bottom:6px}}
    .diag-title{{font-size:.9rem;font-weight:800;color:#370558;margin-bottom:4px}}
    .diag-desc{{font-size:.78rem;color:#7b2fa8;line-height:1.6}}

    /* 학습시스템 */
    .sys-step{{display:flex;gap:16px;align-items:flex-start;padding:20px 0;border-bottom:1px solid #f0e6fc}}
    .sys-step:last-child{{border-bottom:none}}
    .step-num{{width:36px;height:36px;border-radius:50%;background:#510580;color:white;font-size:.9rem;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}}
    .step-title{{font-size:.95rem;font-weight:800;color:#370558;margin-bottom:4px}}
    .step-desc{{font-size:.83rem;color:#555;line-height:1.7}}

    /* 선생님 */
    .teacher-grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px}}
    .teacher-card{{background:white;border-radius:12px;padding:18px;border:1.5px solid #e8d6f5}}
    .teacher-icon{{width:40px;height:40px;border-radius:50%;background:#f0e6fc;display:flex;align-items:center;justify-content:center;margin-bottom:10px;font-size:1.3rem}}
    .teacher-title{{font-size:.9rem;font-weight:800;color:#370558;margin-bottom:4px}}
    .teacher-desc{{font-size:.78rem;color:#666;line-height:1.6}}

    /* 이미지 배너 */
    .img-banner{{position:relative;width:100%;height:320px;overflow:hidden}}
    .img-banner img{{width:100%;height:100%;object-fit:cover}}
    .img-overlay{{position:absolute;inset:0;background:rgba(55,5,88,.45);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px;padding:24px}}
    .img-overlay-title{{color:white;font-size:clamp(1.2rem,3vw,1.7rem);font-weight:800;text-align:center;line-height:1.5}}
    .img-overlay-sub{{color:rgba(255,255,255,.85);font-size:.9rem;text-align:center}}

    /* 후기 */
    .review-grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px}}
    .review-card{{background:#f5eefe;border-radius:12px;padding:18px;border:1.5px solid #e8d6f5}}
    .review-badge{{display:inline-block;font-size:.72rem;font-weight:700;color:#7b2fa8;background:#e8d6f5;padding:3px 10px;border-radius:20px;margin-bottom:10px}}
    .review-text{{font-size:.83rem;color:#370558;line-height:1.8;margin-bottom:10px}}
    .review-author{{font-size:.75rem;color:#9b6cc0;font-weight:700}}

    /* CTA */
    .cta-sec{{background:linear-gradient(140deg,#370558,#510580);padding:52px 24px;text-align:center}}
    .cta-sec h2{{font-size:clamp(1.2rem,3vw,1.5rem);font-weight:800;color:white;margin-bottom:8px}}
    .cta-sec p{{font-size:.9rem;color:rgba(255,255,255,.75);margin-bottom:28px}}
    .cta-btns{{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}}
    .cta-phone{{background:white;color:#510580;font-size:.95rem;font-weight:800;padding:13px 22px;border-radius:50px;text-decoration:none;box-shadow:0 4px 16px rgba(0,0,0,.18)}}
    .cta-kakao{{background:#FEE500;color:#3A1D1D;font-size:.95rem;font-weight:800;padding:13px 22px;border-radius:50px;text-decoration:none;box-shadow:0 4px 16px rgba(254,229,0,.4);display:inline-flex;align-items:center;gap:6px}}
    .cta-form{{background:linear-gradient(135deg,#e8439a,#ff6fc1);color:white;font-size:.95rem;font-weight:800;padding:13px 22px;border-radius:50px;text-decoration:none;box-shadow:0 4px 16px rgba(232,67,154,.4)}}

    /* 반응형 */
    @media(max-width:600px){{
      nav .plain{{display:none}}
      .stats-inner{{grid-template-columns:repeat(2,1fr)}}
      .img-banner{{height:220px}}
      .hero-btns{{flex-direction:column;align-items:center}}
      .cta-btns{{flex-direction:column;align-items:center}}
    }}

    /* 푸터 */
    footer{{background:#370558;color:rgba(255,255,255,.45);text-align:center;padding:24px;font-size:.78rem;line-height:1.8;margin-top:0}}
    footer p{{color:rgba(255,255,255,.45);margin:2px 0}}
    footer a{{color:rgba(255,255,255,.6);text-decoration:none}}
    footer a:hover{{color:rgba(255,255,255,.9)}}
  </style>
  <style>{HEADER_CSS}</style>
</head>
<body>

{HEADER_HTML}

<div class="hero">
  <div class="hero-badge">전국 방문 · 화상 과외 전문</div>
  <h1>우리 아이 성적 향상,<br>베테랑 선생님과 함께</h1>
  <p>전문 선생님의 1:1 맞춤 수업 · 초·중·고 전과목 내신 전문</p>
  <div class="hero-btns">
    <a href="{FORM_URL}" class="btn-pink" target="_blank">📝 무료 상담 신청하기</a>
    <a href="/regions/" class="btn-outline-w">지역별 과외 찾기 →</a>
  </div>
</div>

<div class="stats-bar">
  <div class="stats-inner">
    <div><div class="stat-num">1:1</div><div class="stat-label">완전 맞춤 수업</div></div>
    <div><div class="stat-num">전과목</div><div class="stat-label">초·중·고 전과목</div></div>
    <div><div class="stat-num">방문·화상</div><div class="stat-label">수업 방식 선택</div></div>
    <div><div class="stat-num">무료</div><div class="stat-label">시범수업 제공</div></div>
  </div>
</div>

<!-- 진단 검사 -->
<div style="background:#fff">
<div class="sec">
  <div class="sec-label">진단 검사</div>
  <div class="sec-title">우리 아이의 학습 상태,<br>정확하게 파악하고 있나요?</div>
  <div class="sec-sub">표면적인 성적만으로는 진짜 문제를 알 수 없습니다.<br>상담 전 학습 진단으로 맞춤 학습 방향을 설계해 드립니다.</div>
  <div class="diag-grid">
    <div class="diag-card"><div class="diag-num">01</div><div class="diag-title">학습 수준 진단</div><div class="diag-desc">현재 학습 수준과 취약 단원을 정확히 파악합니다</div></div>
    <div class="diag-card"><div class="diag-num">02</div><div class="diag-title">학습 성향 분석</div><div class="diag-desc">아이에 맞는 최적의 학습 방법을 찾습니다</div></div>
    <div class="diag-card"><div class="diag-num">03</div><div class="diag-title">목표 설정 상담</div><div class="diag-desc">내신·수능 목표에 맞는 단기·장기 플랜을 수립합니다</div></div>
    <div class="diag-card"><div class="diag-num">04</div><div class="diag-title">선생님 매칭</div><div class="diag-desc">진단 결과를 바탕으로 최적의 선생님을 배정합니다</div></div>
  </div>
</div>
</div>

<hr class="sec-divider">

<!-- 학습 시스템 -->
<div style="background:#faf5ff">
<div class="sec">
  <div class="sec-label">학습 시스템</div>
  <div class="sec-title">수업 시작부터 성적 향상까지<br>체계적인 5단계 관리</div>
  <div class="sec-sub">단순한 과외가 아닙니다. 처음부터 끝까지 책임지는 시스템입니다.</div>
  <div class="sys-step"><div class="step-num">1</div><div><div class="step-title">무료 상담 · 진단</div><div class="step-desc">학생의 현재 수준, 목표 성적, 학습 성향을 파악합니다</div></div></div>
  <div class="sys-step"><div class="step-num">2</div><div><div class="step-title">선생님 매칭</div><div class="step-desc">진단 결과에 맞는 검증된 전담 선생님을 배정합니다</div></div></div>
  <div class="sys-step"><div class="step-num">3</div><div><div class="step-title">무료 시범수업</div><div class="step-desc">첫 수업은 무료로 진행, 수업 방향을 확인하고 결정합니다</div></div></div>
  <div class="sys-step"><div class="step-num">4</div><div><div class="step-title">맞춤 커리큘럼 수업</div><div class="step-desc">학생 목표에 맞는 커리큘럼으로 매주 체계적으로 수업합니다</div></div></div>
  <div class="sys-step"><div class="step-num">5</div><div><div class="step-title">정기 피드백 · 성적 관리</div><div class="step-desc">수업 후 학부모님께 학습 현황을 피드백, 성적 향상을 함께 관리합니다</div></div></div>
</div>
</div>

<hr class="sec-divider">

<!-- 선생님 자질 -->
<div style="background:#fff">
<div class="sec">
  <div class="sec-label">선생님 자질 · 역량</div>
  <div class="sec-title">아무 선생님이 아닙니다<br>검증된 베테랑 선생님입니다</div>
  <div class="sec-sub">제나쌤 스터디핏의 선생님은 까다로운 검증 과정을 통과한 분들입니다.</div>
  <div class="teacher-grid">
    <div class="teacher-card"><div class="teacher-icon">🎓</div><div class="teacher-title">학력 · 경력 검증</div><div class="teacher-desc">출신 대학, 전공, 과외 경력을 꼼꼼히 확인합니다</div></div>
    <div class="teacher-card"><div class="teacher-icon">📋</div><div class="teacher-title">수업 역량 평가</div><div class="teacher-desc">실제 수업 방식과 설명력을 직접 평가합니다</div></div>
    <div class="teacher-card"><div class="teacher-icon">💬</div><div class="teacher-title">소통 능력</div><div class="teacher-desc">학생·학부모와의 원활한 소통 능력을 중요시합니다</div></div>
    <div class="teacher-card"><div class="teacher-icon">🔄</div><div class="teacher-title">선생님 교체 보장</div><div class="teacher-desc">수업이 맞지 않으면 언제든 선생님을 교체해 드립니다</div></div>
  </div>
</div>
</div>

<!-- 이미지 배너 -->
<div class="img-banner">
  <img src="/images/main-banner.jpg" alt="공부하는 학생">
  <div class="img-overlay">
    <div class="img-overlay-title">우리 아이의 성적,<br>지금 바로 바꿀 수 있습니다</div>
    <div class="img-overlay-sub">베테랑 선생님과 1:1 맞춤 수업으로 시작하세요</div>
  </div>
</div>

<!-- 수업 후기 -->
<div style="background:#faf5ff">
<div class="sec">
  <div class="sec-label">수업 후기</div>
  <div class="sec-title">실제 수강생 후기로<br>직접 확인하세요</div>
  <div class="sec-sub">수강생 가족분들의 솔직한 후기입니다.</div>
  <div class="review-grid">
    <div class="review-card"><div class="review-badge">중3 · 수학</div><div class="review-text">"수학을 포기했던 아이가 선생님 만나고 3개월 만에 60점대에서 90점대로 올랐어요."</div><div class="review-author">남양주시 학부모</div></div>
    <div class="review-card"><div class="review-badge">고1 · 영어</div><div class="review-text">"내신 준비를 체계적으로 도와주셔서 처음으로 영어 1등급 받았습니다."</div><div class="review-author">구리시 학부모</div></div>
    <div class="review-card"><div class="review-badge">초5 · 국어</div><div class="review-text">"선생님이 흥미롭게 수업해 주셔서 책 읽는 걸 좋아하게 됐어요!"</div><div class="review-author">서울 강동구 학부모</div></div>
  </div>
</div>
</div>

<!-- CTA -->
<div class="cta-sec">
  <h2>지금 바로 무료 상담 받으세요</h2>
  <p>상담 후 무료 시범수업까지 — 부담 없이 시작하세요</p>
  <div class="cta-btns">
    <a href="tel:{PHONE}" class="cta-phone">📞 전화 상담</a>
    <a href="{KAKAO_URL}" target="_blank" class="cta-kakao">
      <svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.7 1.644 5.08 4.148 6.538L5.2 20.4a.3.3 0 0 0 .438.328l4.07-2.7A11.4 11.4 0 0 0 12 18.6c5.523 0 10-3.477 10-7.8S17.523 3 12 3z" fill="#3A1D1D"/></svg>
      카카오톡 상담
    </a>
    <a href="{FORM_URL}" target="_blank" class="cta-form">📝 무료 체험 신청</a>
  </div>
</div>

<footer>
  <p>제나쌤 스터디핏 · 이수진 · 010-5949-9897 · aquarai@naver.com</p>
  <p style="margin-top:8px">COPYRIGHT &copy; 제나쌤스터디핏. All Rights Reserved.
    &nbsp;│&nbsp;<a href="/privacy/" style="color:rgba(255,255,255,.6);text-decoration:none">개인정보처리방침</a>
    &nbsp;│&nbsp;<a href="/terms/" style="color:rgba(255,255,255,.6);text-decoration:none">이용약관</a>
  </p>
</footer>

</body>
</html>"""

def html_index(all_pages):
    # 시도 → 구군 → 동 으로 3단계 그룹화 (순서 유지)
    city_map = {}
    for slug, city, gu, dong, grade, subject in all_pages:
        if city not in city_map:
            city_map[city] = {}
        if gu not in city_map[city]:
            city_map[city][gu] = set()
        city_map[city][gu].add(dong)

    # JS 데이터 생성
    regions_js = []
    for city, gu_map in city_map.items():
        for gu, dongs in gu_map.items():
            dongs_list = sorted(dongs)
            dongs_json = "[" + ",".join(f'{{s:"{d}"}}'.replace(" ","-") for d in dongs_list) + "]"
            regions_js.append(f'{{city:"{city}",gu:"{gu}",dongs:{dongs_json},count:{len(dongs_list)}}}')
    regions_data = "[" + ",".join(regions_js) + "]"

    # 광역시도별 블록 HTML 생성 (구 pill + 동 인라인 펼침)
    city_blocks_html = ""
    for city, gu_map in city_map.items():
        city_safe = city.replace(" ", "-")
        gu_count = len(gu_map)
        gu_pills_html = ""
        dong_areas_html = ""
        for gu, dongs in gu_map.items():
            dongs_list = sorted(dongs)
            gu_safe = gu.replace(" ", "-")
            gu_pills_html += f'<span class="gu-pill" onclick="toggleDong(this,\'{city_safe}\',\'{city}\',\'{gu}\')">{gu}</span>'
            dong_chips = "".join(
                f'<a class="dong-chip" id="chip-placeholder" data-city="{city}" data-gu="{gu}" data-dong="{d}">{d}</a>'
                for d in dongs_list
            )
            dong_areas_html += f'''<div class="dong-area" id="dong-{city_safe}-{gu_safe}">
  <div class="dong-area-header">
    <span class="dong-area-title">{gu} · 동 선택</span>
    <span class="dong-area-close" onclick="closeDong(\'{city_safe}\',\'{gu_safe}\')">닫기</span>
  </div>
  <div class="dong-chips">{dong_chips}</div>
</div>'''
        city_blocks_html += f'''<div class="city-block">
  <div class="city-header">
    <span class="city-name">{city}</span>
    <span class="city-count">{gu_count}개 구/시</span>
  </div>
  <div class="city-body">
    <div class="gu-pills">{gu_pills_html}</div>
    {dong_areas_html}
  </div>
</div>'''

    return f"""<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="naver-site-verification" content="511e0e2c64d12cf657363087cf302e40e3e1ac5c" />
  <title>전국 방문·화상 과외 전문 | {SITE_NAME}</title>
  <meta name="description" content="전국 방문·화상 과외 전문. 베테랑 선생님의 초·중·고 전과목 내신 맞춤 수업. 무료 시범수업 신청 가능.">
  <link rel="canonical" href="{SITE_DOMAIN}/regions/">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;800&display=swap" rel="stylesheet">
  <style>
    *{{box-sizing:border-box;margin:0;padding:0}}
    body{{font-family:'Noto Sans KR',sans-serif;background:#f7f3fb;color:#1a0a24}}

    /* 헤더 */
    header{{background:white;padding:14px 24px;border-bottom:2px solid #e8d6f5;display:flex;justify-content:space-between;align-items:center}}
    .logo{{font-size:1.05rem;font-weight:800;color:#510580;text-decoration:none}}

    /* 히어로 */
    .hero{{background:linear-gradient(140deg,#370558,#510580,#7b2fa8);color:white;text-align:center;padding:48px 24px 40px}}
    .hero-badge{{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:20px;font-size:.78rem;font-weight:700;padding:5px 16px;margin-bottom:14px}}
    .hero h1{{font-size:clamp(1.4rem,4vw,2rem);font-weight:800;line-height:1.45;margin-bottom:10px}}
    .hero p{{opacity:.8;font-size:.95rem;margin-bottom:24px}}
    .hero-btn{{background:linear-gradient(135deg,#e8439a,#ff6fc1);color:white;padding:12px 28px;border-radius:50px;text-decoration:none;font-weight:700;font-size:.95rem;box-shadow:0 5px 18px rgba(232,67,154,.35)}}

    /* 필터바 */
    .filter-bar{{background:white;border-bottom:1px solid #e8d6f5;padding:14px 20px;position:sticky;top:0;z-index:10}}
    .filter-inner{{max-width:960px;margin:0 auto;display:flex;gap:10px;align-items:center;flex-wrap:wrap}}
    .filter-label{{font-size:.85rem;color:#7b2fa8;font-weight:700}}
    .filter-select{{font-size:.85rem;padding:6px 12px;border-radius:20px;border:1px solid #d4b8f5;background:white;color:#1a0a24;cursor:pointer}}
    .search-input{{font-size:.85rem;padding:6px 14px;border-radius:20px;border:1px solid #d4b8f5;background:white;color:#1a0a24;width:150px}}

    /* 안내 */
    .guide{{max-width:960px;margin:0 auto;padding:14px 20px 0;font-size:.82rem;color:#7b2fa8}}

    /* 본문 */
    .content{{max-width:960px;margin:0 auto;padding:12px 20px 32px;display:flex;flex-direction:column;gap:12px}}

    /* 시도 블록 */
    .city-block{{background:white;border:1px solid #e8d6f5;border-radius:14px;overflow:hidden}}
    .city-header{{padding:14px 18px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #f0e6fc;background:#faf5ff}}
    .city-name{{font-size:.95rem;font-weight:800;color:#370558}}
    .city-count{{font-size:.72rem;color:#7b2fa8;background:#f0e6fc;padding:3px 10px;border-radius:20px;border:1px solid #e8d6f5}}
    .city-body{{padding:16px 18px}}

    /* 구 pill */
    .gu-pills{{display:flex;flex-wrap:wrap;gap:8px}}
    .gu-pill{{font-size:.82rem;padding:6px 16px;border-radius:20px;background:#f7f3fb;border:1px solid #e8d6f5;color:#510580;cursor:pointer;transition:all .15s;user-select:none}}
    .gu-pill:hover{{background:#f0e6fc}}
    .gu-pill.selected{{background:#510580;color:white;border-color:#510580}}

    /* 동 펼침 영역 */
    .dong-area{{display:none;margin:16px 0 4px;padding:20px;border-radius:12px;background:#faf5ff;border:1px solid #e8d6f5}}
    .dong-area.open{{display:block}}
    .dong-area-header{{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}}
    .dong-area-title{{font-size:.75rem;font-weight:700;color:#7b2fa8}}
    .dong-area-close{{font-size:.72rem;color:#888;cursor:pointer;padding:3px 10px;border-radius:20px;border:1px solid #e8d6f5;background:white}}
    .dong-chips{{display:flex;flex-wrap:wrap;gap:8px}}
    .dong-chip{{font-size:.82rem;padding:6px 15px;border-radius:20px;border:1px solid #e8d6f5;background:white;color:#1a0a24;cursor:pointer;text-decoration:none;white-space:nowrap}}
    .dong-chip:hover{{background:#510580;color:white;border-color:#510580}}

    /* 원하는 지역 없음 */
    .no-region-wrap{{max-width:960px;margin:0 auto;padding:0 20px 24px}}
    .no-region-box{{background:white;border:1px solid #e8d6f5;border-radius:14px;padding:28px 24px;text-align:center}}
    .no-region-box h4{{font-size:.95rem;font-weight:800;color:#370558;margin-bottom:10px}}
    .no-region-box p{{font-size:.85rem;color:#7b2fa8;line-height:1.9}}

    /* 하단 CTA */
    .cta-sec{{background:linear-gradient(140deg,#370558,#510580);padding:48px 24px;text-align:center}}
    .cta-sec h2{{font-size:clamp(1.2rem,3vw,1.5rem);font-weight:800;color:white;margin-bottom:10px}}
    .cta-sec p{{font-size:.9rem;color:rgba(255,255,255,.75);margin-bottom:28px}}
    .cta-btns{{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}}
    .cta-phone{{background:white;color:#510580;font-size:.95rem;font-weight:800;padding:13px 22px;border-radius:50px;text-decoration:none;box-shadow:0 4px 16px rgba(0,0,0,.18)}}
    .cta-kakao{{background:#FEE500;color:#3A1D1D;font-size:.95rem;font-weight:800;padding:13px 22px;border-radius:50px;text-decoration:none;box-shadow:0 4px 16px rgba(254,229,0,.4);display:inline-flex;align-items:center;gap:6px}}
    .cta-form{{background:linear-gradient(135deg,#e8439a,#ff6fc1);color:white;font-size:.95rem;font-weight:800;padding:13px 22px;border-radius:50px;text-decoration:none;box-shadow:0 4px 16px rgba(232,67,154,.4)}}

    /* 푸터 */
    footer{{background:#370558;color:rgba(255,255,255,.45);text-align:center;padding:24px;font-size:.78rem;line-height:1.8;margin-top:0}}
    footer p{{color:rgba(255,255,255,.45);margin:2px 0}}
    footer a{{color:rgba(255,255,255,.6);text-decoration:none}}

    /* 플로팅 버튼 */
    .float-wrap{{position:fixed;bottom:28px;right:20px;display:flex;flex-direction:column;align-items:center;gap:12px;z-index:999}}
    .float-btn{{width:54px;height:54px;border-radius:50%;display:flex;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 4px 16px rgba(0,0,0,.2);transition:transform .15s;position:relative}}
    .float-btn:hover{{transform:translateY(-3px)}}
    .float-btn.form{{background:#22c55e}}
    .float-btn.kakao{{background:#FEE500}}
    .float-btn.phone{{background:#4f1787}}
    .float-label{{position:absolute;right:62px;background:rgba(30,10,40,.85);color:white;font-size:.7rem;font-weight:700;padding:4px 10px;border-radius:20px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .2s}}
    .float-btn:hover .float-label{{opacity:1}}

    @media(max-width:600px){{
      .float-wrap{{bottom:20px;right:14px;gap:8px}}
      .float-btn{{width:50px;height:50px}}
    }}
  </style>
  <style>{HEADER_CSS}</style>
</head>
<body>
{HEADER_HTML}

<div class="hero">
  <div class="hero-badge">전국 방문 · 화상 과외 전문</div>
  <h1>지역별 맞춤 매칭</h1>
  <p>경험과 노하우의 베테랑 선생님의 전과목 내신 전문 수업</p>
  <a href="{FORM_URL}" class="hero-btn">📝 무료 상담 신청</a>
</div>

<div class="filter-bar">
  <div class="filter-inner">
    <span class="filter-label">학년</span>
    <select id="sel-grade" class="filter-select">
      <option value="">전체</option>
      <option>초등</option><option>중등</option><option>고등</option>
    </select>
    <span class="filter-label">과목</span>
    <select id="sel-subject" class="filter-select">
      <option value="">전체</option>
      <option>국어</option><option>영어</option><option>수학</option><option>과학</option><option>사회</option>
    </select>
    <input class="search-input" id="search-input" placeholder="🔍 지역 검색..." oninput="filterRegions(this.value)" />
  </div>
</div>

<div class="guide">① 구/군을 클릭하면 동 목록이 펼쳐져요 &nbsp;② 원하는 동을 클릭해 과외를 찾아보세요</div>

<div class="content">
  {city_blocks_html}
</div>

<div class="no-region-wrap">
  <div class="no-region-box">
    <h4>원하는 지역이 없으신가요?</h4>
    <p>현재 준비 중인 지역일 수도 있습니다. 무료 상담 통해 과외 정보 받아보시고, 무료 시범수업도 신청해보세요.</p>
  </div>
</div>

<div class="cta-sec">
  <h2>지금 바로 무료 상담 받으세요</h2>
  <p>상담 후 무료 시범수업까지 — 부담 없이 시작하세요</p>
  <div class="cta-btns">
    <a href="tel:{PHONE}" class="cta-phone">📞 전화 상담</a>
    <a href="{KAKAO_URL}" target="_blank" class="cta-kakao">
      <svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.7 1.644 5.08 4.148 6.538L5.2 20.4a.3.3 0 0 0 .438.328l4.07-2.7A11.4 11.4 0 0 0 12 18.6c5.523 0 10-3.477 10-7.8S17.523 3 12 3z" fill="#3A1D1D"/></svg>
      카카오톡 상담
    </a>
    <a href="{FORM_URL}" target="_blank" class="cta-form">📝 무료 체험 신청</a>
  </div>
</div>

{FOOTER_HTML}

<!-- 플로팅 버튼: 연필(초록) → 카카오(노랑) → 전화(보라) -->
<div class="float-wrap">
  <a href="{FORM_URL}" target="_blank" class="float-btn form">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
    <span class="float-label">무료 체험 신청</span>
  </a>
  <a href="{KAKAO_URL}" target="_blank" class="float-btn kakao">
    <svg width="26" height="26" viewBox="0 0 24 24"><path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.7 1.644 5.08 4.148 6.538L5.2 20.4a.3.3 0 0 0 .438.328l4.07-2.7A11.4 11.4 0 0 0 12 18.6c5.523 0 10-3.477 10-7.8S17.523 3 12 3z" fill="#3A1D1D"/></svg>
    <span class="float-label">카카오톡 상담</span>
  </a>
  <a href="tel:{PHONE}" class="float-btn phone">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6.29 6.29l.98-.98a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    <span class="float-label">전화 상담</span>
  </a>
</div>

<script>
const REGIONS = {regions_data};

function toggleDong(el, citySafe, city, gu) {{
  const guSafe = gu.replace(/ /g, '-');
  const areaId = 'dong-' + citySafe + '-' + guSafe;
  const area = document.getElementById(areaId);
  const block = el.closest('.city-block');
  const isSelected = el.classList.contains('selected');

  block.querySelectorAll('.gu-pill').forEach(p => p.classList.remove('selected'));
  block.querySelectorAll('.dong-area').forEach(d => d.classList.remove('open'));

  if (!isSelected && area) {{
    el.classList.add('selected');
    area.classList.add('open');
    updateDongLinks(area, city, gu);
    area.scrollIntoView({{behavior:'smooth', block:'nearest'}});
  }}
}}

function updateDongLinks(area, city, gu) {{
  const g = document.getElementById('sel-grade').value || '고등';
  const s = document.getElementById('sel-subject').value || '수학';
  area.querySelectorAll('.dong-chip').forEach(chip => {{
    const dong = chip.dataset.dong;
    chip.href = '/' + city.replace(/ /g,'-') + '-' + gu.replace(/ /g,'-') + '-' + dong.replace(/ /g,'-') + '-' + g + '-' + s + '-과외/';
  }});
}}

function closeDong(citySafe, guSafe) {{
  const area = document.getElementById('dong-' + citySafe + '-' + guSafe);
  if (area) area.classList.remove('open');
  document.querySelectorAll('.gu-pill').forEach(p => {{
    if (p.textContent.trim() === guSafe.replace(/-/g,' ')) p.classList.remove('selected');
  }});
}}

function filterRegions(val) {{
  const v = val.trim();
  document.querySelectorAll('.city-block').forEach(block => {{
    if (!v) {{ block.style.display = ''; return; }}
    const cityName = block.querySelector('.city-name').textContent;
    const pills = Array.from(block.querySelectorAll('.gu-pill')).map(p => p.textContent);
    block.style.display = (cityName.includes(v) || pills.some(p => p.includes(v))) ? '' : 'none';
  }});
}}
</script>
</body>
</html>"""


# ══════════════════════════════════════════════════════════
# ⑩ 개인정보처리방침 / 이용약관
# ══════════════════════════════════════════════════════════

POLICY_CSS = f"""<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="naver-site-verification" content="511e0e2c64d12cf657363087cf302e40e3e1ac5c" />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;800&display=swap" rel="stylesheet">
  <style>
    *{{box-sizing:border-box;margin:0;padding:0}}
    body{{font-family:'Noto Sans KR',sans-serif;background:#fff;color:#1a0a24;line-height:1.8}}
    header{{background:white;padding:14px 24px;border-bottom:2px solid #e8d6f5;display:flex;align-items:center}}
    .logo{{font-size:1.05rem;font-weight:800;color:#510580;text-decoration:none}}
    .container{{max-width:800px;margin:0 auto;padding:40px 20px}}
    h1{{font-size:1.5rem;font-weight:800;color:#370558;margin-bottom:24px;padding-bottom:12px;border-bottom:2px solid #e8d6f5}}
    h2{{font-size:1rem;font-weight:800;color:#510580;margin:28px 0 8px}}
    p{{font-size:.9rem;color:#333;margin-bottom:10px}}
    footer{{background:#370558;color:rgba(255,255,255,.45);text-align:center;padding:16px;font-size:.78rem;line-height:1.6;margin-top:40px}}
    footer p{{color:rgba(255,255,255,.45);margin:2px 0}}
    footer a{{color:rgba(255,255,255,.6);text-decoration:none}}
    footer a:hover{{color:rgba(255,255,255,.9)}}
  </style>
  <style>{HEADER_CSS}</style>
</head>
<body>
{HEADER_HTML}
<div class="container">"""

def html_privacy():
    return POLICY_CSS + f"""
  <h1>개인정보처리방침</h1>
  <p>제나쌤 스터디핏(이하 "회사")은 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.</p>

  <h2>1. 개인정보의 수집 및 이용 목적</h2>
  <p>회사는 서비스 제공을 위해 다음의 개인정보를 수집하고 있습니다.</p>
  <p>· 과외 수업 상담 및 매칭 서비스 제공<br>· 문의 답변 및 서비스 안내<br>· 무료 시범수업 신청 처리</p>
  <p><strong>수집 항목</strong><br>
  상담 신청 시: 이름, 연락처(휴대전화번호), 학생 학년, 희망 과목, 거주 지역<br>
  카카오톡 상담 시: 카카오톡 프로필 정보(닉네임), 상담 내용</p>
  <p><strong>수집 방법</strong><br>홈페이지 상담 신청 양식, 카카오톡 채널 상담, 전화 상담</p>

  <h2>2. 개인정보의 수집 및 이용 목적</h2>
  <p>회사는 수집한 개인정보를 다음의 목적을 위해 이용합니다.</p>
  <p>· 과외 상담 서비스 제공 및 상담 내용 전달, 과외 선생님 매칭을 위한 정보 확인, 서비스 관련 공지사항 전달, 서비스 이용 통계 및 분석</p>

  <h2>3. 개인정보의 보유 및 이용 기간</h2>
  <p>회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관련 법령에 의해 보존할 필요가 있는 경우 해당 법령에서 정한 기간 동안 보존합니다.</p>
  <p>· 상담 신청 정보: 상담 완료 후 1년간 보관 후 파기</p>
  <p>전자상거래 등에서의 소비자 보호에 관한 법률에 따른 보존: 계약 또는 청약철회 등에 관한 기록 5년, 소비자의 불만 또는 분쟁 처리에 관한 기록 3년<br>
  통신비밀보호법에 따른 보존: 웹사이트 방문 기록 3개월</p>

  <h2>4. 개인정보의 제3자 제공</h2>
  <p>회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 이용자가 사전에 동의한 경우 또는 법령의 규정에 의거한 경우에는 예외로 합니다.</p>

  <h2>5. 개인정보의 파기 절차 및 방법</h2>
  <p>회사는 개인정보 보유 기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.</p>
  <p>파기 절차: 이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져 내부 방침 및 기타 관련 법령에 따라 일정 기간 저장된 후 혹은 즉시 파기됩니다.<br>
  파기 방법: 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통해 파기합니다.</p>

  <h2>6. 이용자의 권리와 그 행사 방법</h2>
  <p>이용자는 언제든지 자신의 개인정보에 대해 열람, 정정, 삭제, 처리 정지를 요구할 수 있습니다.</p>
  <p>위 권리 행사는 회사에 대해 전화, 카카오톡 등을 통해 하실 수 있으며, 회사는 이에 대해 지체 없이 조치하겠습니다.</p>
  <p>이용자가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.</p>

  <h2>7. 개인정보의 안전성 확보 조치</h2>
  <p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
  <p>관리적 조치: 내부 관리계획 수립 및 시행, 개인정보 취급 직원 최소화<br>
  기술적 조치: 개인정보처리시스템에 대한 접근 권한 관리, 보안 프로그램 설치 및 갱신<br>
  물리적 조치: 개인정보가 포함된 서류 및 보조저장매체의 잠금장치가 있는 안전한 장소에 보관</p>

  <h2>8. 개인정보 보호책임자</h2>
  <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만 처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
  <p>· 상호: 제나쌤스터디핏<br>· 성명: 이수진<br>· 연락처: 010-5949-9897<br>· 이메일: aquarai@naver.com</p>
  <p>이용자는 회사의 서비스를 이용하면서 발생한 모든 개인정보 보호 관련 문의, 불만 처리, 피해구제 등에 관한 사항을 개인정보 보호책임자에게 문의하실 수 있습니다.</p>

  <h2>9. 이용자의 권리와 행사 방법</h2>
  <p>이용자는 언제든지 자신의 개인정보를 조회·수정·삭제·처리 정지를 요청할 수 있습니다. 아래 연락처로 문의해 주세요.</p>
  <p>· 이메일: aquarai@naver.com<br>· 전화: 010-5949-9897</p>

  <h2>10. 개인정보처리방침의 변경</h2>
  <p>이 개인정보처리방침은 2025년 1월 1일부터 적용됩니다. 내용이 변경될 경우 웹사이트 공지사항을 통해 공지합니다.</p>
</div>
<footer>
  <p>제나쌤 스터디핏 · 이수진 · 010-5949-9897 · aquarai@naver.com</p>
  <p style="margin-top:8px">COPYRIGHT &copy; 제나쌤스터디핏. All Rights Reserved.
    &nbsp;│&nbsp;<a href="/privacy/" style="color:rgba(255,255,255,.6);text-decoration:none">개인정보처리방침</a>
    &nbsp;│&nbsp;<a href="/terms/" style="color:rgba(255,255,255,.6);text-decoration:none">이용약관</a>
  </p>
</footer>
</body>
</html>"""

def html_terms():
    return POLICY_CSS + f"""
  <h1>이용약관</h1>
  <p>본 약관은 제나쌤 스터디핏(이하 "회사")이 제공하는 과외 중개 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정합니다.</p>

  <h2>제1조 (목적)</h2>
  <p>본 약관은 회사가 운영하는 웹사이트(zenastudyfit.com)에서 제공하는 과외 상담 및 중개 서비스 이용에 관한 조건 및 절차, 회사와 이용자 간의 권리·의무·책임사항을 규정함을 목적으로 합니다.</p>

  <h2>제2조 (서비스의 내용)</h2>
  <p>회사는 다음과 같은 서비스를 제공합니다.</p>
  <p>· 지역별 방문·화상 과외 상담 및 매칭 서비스<br>· 무료 시범수업 신청 서비스<br>· 과외 관련 정보 제공 서비스</p>

  <h2>제3조 (서비스 이용)</h2>
  <p>① 서비스는 회사가 정한 절차에 따라 상담 신청 후 이용 가능합니다.</p>
  <p>② 이용자는 본 약관 및 관련 법령을 준수하여야 합니다.</p>
  <p>③ 이용자는 타인의 개인정보를 도용하거나 허위 정보를 제공해서는 안 됩니다.</p>

  <h2>제4조 (서비스 이용 제한)</h2>
  <p>회사는 다음에 해당하는 경우 서비스 이용을 제한할 수 있습니다.</p>
  <p>· 허위 정보 제공 또는 타인 정보 도용<br>· 서비스 운영을 방해하는 행위<br>· 기타 관련 법령 위반 행위</p>

  <h2>제5조 (면책조항)</h2>
  <p>① 회사는 천재지변, 전쟁 등 불가항력적 사유로 서비스를 제공할 수 없는 경우 책임이 면제됩니다.</p>
  <p>② 회사는 이용자의 귀책 사유로 발생한 서비스 이용 장애에 대해 책임을 지지 않습니다.</p>

  <h2>제6조 (분쟁 해결)</h2>
  <p>서비스 이용과 관련하여 분쟁이 발생한 경우 회사와 이용자는 상호 협의하여 해결하며, 협의가 이루어지지 않을 경우 관할 법원에 소를 제기할 수 있습니다.</p>

  <h2>제7조 (약관의 효력 및 변경)</h2>
  <p>본 약관은 2025년 1월 1일부터 적용됩니다. 약관이 변경될 경우 웹사이트 공지사항을 통해 공지합니다.</p>

  <p style="margin-top:24px;color:#510580;font-weight:700">문의: aquarai@naver.com · 010-5949-9897</p>
</div>
<footer>
  <p>제나쌤 스터디핏 · 이수진 · 010-5949-9897 · aquarai@naver.com</p>
  <p style="margin-top:8px">COPYRIGHT &copy; 제나쌤스터디핏. All Rights Reserved.
    &nbsp;│&nbsp;<a href="/privacy/" style="color:rgba(255,255,255,.6);text-decoration:none">개인정보처리방침</a>
    &nbsp;│&nbsp;<a href="/terms/" style="color:rgba(255,255,255,.6);text-decoration:none">이용약관</a>
  </p>
</footer>
</body>
</html>"""




def generate_sitemap(slugs):
    urls = [f'  <url><loc>{SITE_DOMAIN}/</loc><priority>1.0</priority></url>']
    for slug in slugs:
        urls.append(
            f'  <url><loc>{SITE_DOMAIN}/{slug}/</loc>'
            f'<changefreq>monthly</changefreq><priority>0.7</priority></url>'
        )
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "\n".join(urls)
        + "\n</urlset>"
    )

def generate_robots():
    return f"User-agent: *\nAllow: /\nSitemap: {SITE_DOMAIN}/sitemap.xml\n"


# ══════════════════════════════════════════════════════════
# ⑩ 메인 실행
# ══════════════════════════════════════════════════════════

def main():
    output_dir = Path("output")
    output_dir.mkdir(exist_ok=True)

    areas = load_areas()
    print(f"지역 데이터: {len(areas)}개 동 로드됨")

    all_pages = []   # (slug, city, gu, dong, grade, subject)

    for (city, gu, dong), grade, subject in product(areas, GRADES, SUBJECTS):
        slug = f"{city}-{gu}-{dong}-{grade}-{subject}-과외".replace(" ", "-")
        all_pages.append((slug, city, gu, dong, grade, subject))

    total_plan = len(all_pages)
    print(f"총 {total_plan:,}개 페이지 생성 시작...")

    for i, (slug, city, gu, dong, grade, subject) in enumerate(all_pages, 1):
        page_dir = output_dir / slug
        page_dir.mkdir(exist_ok=True)
        html = html_page(city, gu, dong, grade, subject, slug)
        (page_dir / "index.html").write_text(html, encoding="utf-8")
        if i % 500 == 0:
            print(f"  {i:,}/{total_plan:,} 완료...")

    # 메인 페이지 (새로운 홈)
    (output_dir / "index.html").write_text(html_main(), encoding="utf-8")

    # 지역 찾기 (/regions/)
    regions_dir = output_dir / "regions"
    regions_dir.mkdir(exist_ok=True)
    (regions_dir / "index.html").write_text(html_index(all_pages), encoding="utf-8")

    # 개인정보처리방침
    privacy_dir = output_dir / "privacy"
    privacy_dir.mkdir(exist_ok=True)
    (privacy_dir / "index.html").write_text(html_privacy(), encoding="utf-8")

    # 이용약관
    terms_dir = output_dir / "terms"
    terms_dir.mkdir(exist_ok=True)
    (terms_dir / "index.html").write_text(html_terms(), encoding="utf-8")

    # sitemap
    slugs = [p[0] for p in all_pages]
    (output_dir / "sitemap.xml").write_text(generate_sitemap(slugs), encoding="utf-8")

    # robots
    (output_dir / "robots.txt").write_text(generate_robots(), encoding="utf-8")

    total_files = len(list(output_dir.rglob("index.html")))
    print(f"\n✅ 완료! 총 {total_files:,}개 HTML 파일 생성됨")
    print(f"📁 출력 폴더: {output_dir.resolve()}")
    print(f"🗺  sitemap: {SITE_DOMAIN}/sitemap.xml")
    print(f"\n💡 이미지 폴더: output/images/ 에 아래 파일들을 넣어주세요")
    for img in IMAGES:
        print(f"   - {img}")


if __name__ == "__main__":
    main()
