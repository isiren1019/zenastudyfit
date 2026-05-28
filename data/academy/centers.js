// ================================================================
// data/academy/centers.js — 학원 지점 데이터 (205개)
// 생성일: 2026-05-28
// 데이터 출처: 코칭센터_데이터_260523.xlsx (네이버 링크 포함)
//
// 필드 설명:
//   slug:        URL 슬러그 (시도-시군구-지점명-브랜드)
//   name:        표시용 깔끔한 지점명 ("탄현점")
//   fullName:    엑셀 원본 지점명 ("탕정점(모두)")
//   brand:       wawa | modu | gloride | wplus (페이지에 표시 X)
//   sido:        시·도 슬러그 (gyeonggi)
//   sidoName:    시·도 한글명 (경기)
//   sigungu:     시·군·구 한글 (고양시)
//   address:     전체 주소
//   eduOffice:   교육지원청 명칭 (엑셀 원본)
//   eduRegNo:    교육지원청 등록번호 (엑셀 원본)
//   subjects:    과목별 가능 학년 { korean: ["초1"...], ... }
//   targets:     타깃학교 { elem: [...], middle: [...], high: [...] }
//   feeType:     A | B (와와회비)
//   isNew:       신규 12개 지점 = true
//   pricingGroup: 1(서울권) | 2(서울외) | 3(특수) - 수업료 그룹
//   naverMapUrl: 네이버 지도 개별 링크
// ================================================================

export const ACADEMY_CENTERS = [
  {
    "slug": "gyeonggi-hanam-hanam-pungsan",
    "name": "하남풍산점",
    "fullName": "하남풍산점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "하남시",
    "address": "경기 하남시 덕풍동로 119 하남프라자 501호",
    "eduOffice": "하남풍산점와와학습코칭학원",
    "eduRegNo": "경기도광주하남교육지원청 제 하남314호",
    "subjects": {
      "korean": [],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "나룰초",
        "하남풍산초"
      ],
      "middle": [
        "덕풍중",
        "신평중",
        "동부중"
      ],
      "high": [
        "풍산고",
        "남한고",
        "신장고",
        "감일고",
        "미사고",
        "애니고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/G2EorHhr"
  },
  {
    "slug": "gyeongbuk-gyeongsan-sadong",
    "name": "사동점",
    "fullName": "사동점",
    "brand": "wawa",
    "sido": "gyeongbuk",
    "sidoName": "경북",
    "sigungu": "경산시",
    "address": "경북 경산시 백자로10길 1  402호",
    "eduOffice": "사동점와와학습코칭학원",
    "eduRegNo": "경상북도경산교육지원청 제1276호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ]
    },
    "targets": {
      "elem": [
        "사동초",
        "삼성현초",
        "평산초",
        "동부초"
      ],
      "middle": [
        "사동중",
        "문명중",
        "삼성현중",
        "경산중",
        "경산여중",
        "장산중"
      ],
      "high": [
        "사동고",
        "경산여고",
        "경산고",
        "문명고",
        "경북체고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5RhvRCww"
  },
  {
    "slug": "seoul-nowon-hagye",
    "name": "하계점",
    "fullName": "하계점",
    "brand": "wawa",
    "sido": "seoul",
    "sidoName": "서울",
    "sigungu": "노원구",
    "address": "서울 노원구 노원로 257  401호",
    "eduOffice": "하계점와와학습코칭학원",
    "eduRegNo": "서울북부교육청 등록 제 2016-12호",
    "subjects": {
      "korean": [
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ]
    },
    "targets": {
      "elem": [],
      "middle": [
        "하계중",
        "녹천중",
        "상명중",
        "태릉중",
        "공릉중"
      ],
      "high": [
        "혜성여고",
        "대진고",
        "상명고",
        "월계고"
      ]
    },
    "feeType": "A",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/FIfCvG2D"
  },
  {
    "slug": "gyeonggi-yongin-suji",
    "name": "수지점",
    "fullName": "수지점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "용인시",
    "address": "경기 용인시 수지구 문정로 13  중수프라자 503호",
    "eduOffice": "수지점와와학습코칭학원",
    "eduRegNo": "용인교육지원청 등록 제4774호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "풍천초",
        "정평초",
        "이현초"
      ],
      "middle": [
        "이현중",
        "수지중",
        "정평중"
      ],
      "high": [
        "상현고",
        "신봉고",
        "홍천고",
        "성복고",
        "풍덕고",
        "수지고",
        "죽전고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/FFGRnYTP"
  },
  {
    "slug": "daegu-dalseo-igok",
    "name": "이곡점",
    "fullName": "이곡점",
    "brand": "wawa",
    "sido": "daegu",
    "sidoName": "대구",
    "sigungu": "달서구",
    "address": "대구광역시 달서구 이곡동 달구벌대로259길 33  제일빌딩 5층",
    "eduOffice": "이곡점와와학습코칭학원",
    "eduRegNo": "대구남부교육지원청 등록 제2016-13호",
    "subjects": {
      "korean": [
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": [
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ]
    },
    "targets": {
      "elem": [
        "와룡초"
      ],
      "middle": [
        "성산중"
      ],
      "high": [
        "성서고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5XJCUKn5"
  },
  {
    "slug": "gyeonggi-goyang-tanhyeon",
    "name": "탄현점",
    "fullName": "탄현점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "고양시",
    "address": "경기 고양시 일산서구 산현로17번길 23  은행프라자 4",
    "eduOffice": "탄현점와와학습코칭학원",
    "eduRegNo": "고양교육지원청 등록 제5930호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "상탄초"
      ],
      "middle": [
        "일산동중",
        "일산중",
        "호곡중"
      ],
      "high": [
        "일산동고",
        "덕이고",
        "중산고",
        "일산동고",
        "중산고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xAFe3lba"
  },
  {
    "slug": "gyeonggi-gwangmyeong-cheolsan",
    "name": "철산점",
    "fullName": "철산점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "광명시",
    "address": "경기도 광명시 철산동 도덕공원로 27  삼우빌딩 2층",
    "eduOffice": "철산점와와학습코칭학원",
    "eduRegNo": "광명교육지원청 등록 제1781호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": []
    },
    "targets": {
      "elem": [],
      "middle": [],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5xjf0CkM"
  },
  {
    "slug": "gwangju-seo-chipyeong",
    "name": "치평점",
    "fullName": "치평점",
    "brand": "wawa",
    "sido": "gwangju",
    "sidoName": "광주",
    "sigungu": "서구",
    "address": "광주 서구 치평로 76  대한빌딩 403호",
    "eduOffice": "와와학습코칭학원",
    "eduRegNo": "광주서부교육지원청 등록 제6027호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "운천초",
        "계수초"
      ],
      "middle": [
        "전남중",
        "동명중"
      ],
      "high": [
        "전남고",
        "상무고",
        "광주여고",
        "상일여고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/FIfmpdSm"
  },
  {
    "slug": "daejeon-yuseong-jijok",
    "name": "지족점",
    "fullName": "지족점",
    "brand": "wawa",
    "sido": "daejeon",
    "sidoName": "대전",
    "sigungu": "유성구",
    "address": "대전 유성구 지족동  910-7번지 401",
    "eduOffice": "와와학습코칭학원",
    "eduRegNo": "대전서부교육지원청 등록 제 서4241호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6"
      ]
    },
    "targets": {
      "elem": [
        "상지초",
        "지족초",
        "노은초",
        "수정초"
      ],
      "middle": [
        "지족중",
        "노은중"
      ],
      "high": [
        "반석고",
        "지족고",
        "노은고",
        "유성여고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/GeUi3xOD"
  },
  {
    "slug": "gwangju-gwangsan-suwan",
    "name": "수완점",
    "fullName": "수완점",
    "brand": "wawa",
    "sido": "gwangju",
    "sidoName": "광주",
    "sigungu": "광산구",
    "address": "광주 광산구 임방울대로 310  아이비타워 406",
    "eduOffice": "와와학습코칭수완학원",
    "eduRegNo": "광주서부교육지원청 등록 제6778호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [],
      "middle": [
        "수완중",
        "장덕중"
      ],
      "high": [
        "수완고",
        "장덕고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/FMc7wjK6"
  },
  {
    "slug": "gyeonggi-suwon-homaesil",
    "name": "호매실점",
    "fullName": "호매실점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "수원시",
    "address": "경기 수원시 권선구 금곡로 116  유동빌딩  602호",
    "eduOffice": "와와학습코칭센터호매실학원",
    "eduRegNo": "수원교육지원청 등록 제6830호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "중촌초"
      ],
      "middle": [
        "칠보중",
        "상촌중"
      ],
      "high": [
        "칠보고",
        "호매실고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/FQVt5Fuq"
  },
  {
    "slug": "gyeonggi-uijeongbu-singok",
    "name": "신곡점",
    "fullName": "신곡점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "의정부시",
    "address": "경기도 의정부시 신곡동 장곡로 626  금오종합상가 A동 302,303호",
    "eduOffice": "와와학습코칭센터학원",
    "eduRegNo": "의정부교육지원청 등록 제2071호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초6",
        "중1",
        "중2",
        "중3"
      ]
    },
    "targets": {
      "elem": [],
      "middle": [
        "천보중",
        "효자중"
      ],
      "high": [
        "효자고",
        "경민it고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xDJfMSPC"
  },
  {
    "slug": "gyeonggi-goyang-haengsin",
    "name": "행신점",
    "fullName": "행신점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "고양시",
    "address": "경기 고양시 덕양구 중앙로 442  아성프라자 305호",
    "eduOffice": "행신점와와학습코칭센터학원",
    "eduRegNo": "경기도고양교육지원청 등록 제6408호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ]
    },
    "targets": {
      "elem": [
        "아람초",
        "행신초",
        "덕은초",
        "서정초"
      ],
      "middle": [
        "서정중",
        "행신중",
        "무원중",
        "가람중",
        "덕양중"
      ],
      "high": [
        "서정고",
        "행신고",
        "무원고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/F42srOS9"
  },
  {
    "slug": "jeonbuk-jeonju-seosin",
    "name": "서신점",
    "fullName": "서신점",
    "brand": "wawa",
    "sido": "jeonbuk",
    "sidoName": "전북",
    "sigungu": "전주시",
    "address": "전북특별자치도 전주시 완산구 서신로 5  4층",
    "eduOffice": "와와학습코칭학원",
    "eduRegNo": "전주교육지원청 등록 제6457호",
    "subjects": {
      "korean": [],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "중산초"
      ],
      "middle": [],
      "high": [
        "한일고",
        "근영고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/55rU6cPz"
  },
  {
    "slug": "gyeonggi-hanam-central",
    "name": "센트럴점",
    "fullName": "센트럴점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "하남시",
    "address": "경기 하남시 미사강변대로 84  미사탑프라자 601호",
    "eduOffice": "센트럴점와와학습코칭학원",
    "eduRegNo": "광주하남교육지원청 등록 제1894호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "한홀초",
        "청하초"
      ],
      "middle": [
        "윤슬중",
        "미사중"
      ],
      "high": [
        "미사강변고",
        "미사고",
        "신장고",
        "남한고",
        "풍산고",
        "강일고",
        "특성화고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/FZ2CqbQ6"
  },
  {
    "slug": "gyeonggi-seongnam-migeum",
    "name": "미금점",
    "fullName": "미금점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "성남시",
    "address": "경기도 성남시 분당구 금곡동 돌마로 87  골드프라자 402호",
    "eduOffice": "금곡점와와학습코칭학원",
    "eduRegNo": "성남교육지원청 등록 제5313호",
    "subjects": {
      "korean": [],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "미금초",
        "청솔초",
        "늘푸른초"
      ],
      "middle": [
        "불곡중",
        "청솔중",
        "늘푸른중"
      ],
      "high": [
        "불곡고",
        "늘푸른고",
        "분당중앙고"
      ]
    },
    "feeType": "A",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/F88gB07s"
  },
  {
    "slug": "gyeonggi-seongnam-yatap",
    "name": "야탑점",
    "fullName": "야탑점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "성남시",
    "address": "경기 성남시 중원구 양현로 461  4층",
    "eduOffice": "야탑와와학습코칭학원",
    "eduRegNo": "성남교육지원청 등록 제6056호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "여수초",
        "야탑초",
        "중탑초"
      ],
      "middle": [
        "야탑중"
      ],
      "high": [
        "아람고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xTT9l5Tq"
  },
  {
    "slug": "gyeonggi-guri-galmae",
    "name": "갈매점",
    "fullName": "갈매점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "구리시",
    "address": "경기 구리시 갈매중앙로 79  에스엠타워 602호",
    "eduOffice": "갈매점와와학습코칭학원",
    "eduRegNo": "구리남양주교육지원청 등록 제4331호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "갈매초",
        "산마루초"
      ],
      "middle": [
        "갈매중"
      ],
      "high": [
        "갈매고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/x7nIcvlP"
  },
  {
    "slug": "gyeonggi-goyang-madu",
    "name": "마두점",
    "fullName": "마두점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "고양시",
    "address": "경기 고양시 일산동구 중앙로 1191  굿모닝법조타운 1 604호",
    "eduOffice": "마두점와와학습코칭센터학원",
    "eduRegNo": "고양교육지원청 등록 제6135호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "백신초",
        "호수초",
        "낙민초"
      ],
      "middle": [
        "백석중",
        "백신중"
      ],
      "high": [
        "백신고",
        "정발고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5vcjOJXl"
  },
  {
    "slug": "gwangju-gwangsan-cheomdan",
    "name": "첨단점",
    "fullName": "첨단점",
    "brand": "wawa",
    "sido": "gwangju",
    "sidoName": "광주",
    "sigungu": "광산구",
    "address": "광주 광산구 월계로 191  404호",
    "eduOffice": "첨단점와와학습코칭센터학원",
    "eduRegNo": "광주서부교육지원청 등록 제7200호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "월봉초"
      ],
      "middle": [
        "천곡중",
        "월봉중"
      ],
      "high": [
        "장덕고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xGIEb9D0"
  },
  {
    "slug": "ulsan-buk-songjeong",
    "name": "송정점",
    "fullName": "송정점",
    "brand": "wawa",
    "sido": "ulsan",
    "sidoName": "울산",
    "sigungu": "북구",
    "address": "울산 북구 화산로 123  골드테라스 404호",
    "eduOffice": "송정점와와학습코칭학원",
    "eduRegNo": "울산강북교육지원청 등록 제5652호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ]
    },
    "targets": {
      "elem": [
        "고헌초",
        "송정초",
        "화봉초"
      ],
      "middle": [
        "고헌중",
        "화봉중",
        "연암중"
      ],
      "high": [
        "화봉고",
        "매곡고",
        "무룡고",
        "울산공고",
        "에너지고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/GoDRBpH2"
  },
  {
    "slug": "gyeongnam-changwon-seokdong",
    "name": "석동점",
    "fullName": "석동점",
    "brand": "wawa",
    "sido": "gyeongnam",
    "sidoName": "경남",
    "sigungu": "창원시",
    "address": "경남 창원시 진해구 석동로 51  세븐코아 504호",
    "eduOffice": "석동점와와학습코칭학원",
    "eduRegNo": "창원교육지원청 등록 제1933호",
    "subjects": {
      "korean": [],
      "english": [
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "math": [
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [],
      "middle": [
        "석동중"
      ],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/x672Zha9"
  },
  {
    "slug": "gyeonggi-seongnam-sujin",
    "name": "수진점",
    "fullName": "수진점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "성남시",
    "address": "경기 성남시 중원구 원터로 95  2층",
    "eduOffice": "수진점와와학습코칭학원",
    "eduRegNo": "성남교육지원청 등록 제6533호",
    "subjects": {
      "korean": [],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "성남중앙초"
      ],
      "middle": [
        "성일중",
        "성남중",
        "동광중",
        "풍생중"
      ],
      "high": [
        "성남여고",
        "성남고",
        "성일고",
        "동광고",
        "효성고",
        "숭신여고",
        "복정고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/GCvm6TLG"
  },
  {
    "slug": "daegu-suseong-suseong-2ga",
    "name": "수성2가점",
    "fullName": "수성2가점",
    "brand": "wawa",
    "sido": "daegu",
    "sidoName": "대구",
    "sigungu": "수성구",
    "address": "대구 수성구 명덕로 404  1동 404호",
    "eduOffice": "수성2가점와와학습코칭학원",
    "eduRegNo": "대구광역시동부교육지원청 제6704호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "english": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "math": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "science": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": [
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ]
    },
    "targets": {
      "elem": [
        "동일초",
        "동도초",
        "동성초"
      ],
      "middle": [
        "대구동중",
        "신명여중",
        "중앙중",
        "황금중"
      ],
      "high": [
        "남산고",
        "경북고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5vcjMhi2"
  },
  {
    "slug": "gyeonggi-yongin-giheung-gucheong",
    "name": "기흥구청점",
    "fullName": "기흥구청점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "용인시",
    "address": "경기 용인시 기흥구 구갈로60번길 15  경영빌딩 3층",
    "eduOffice": "기흥구청점와와학습코칭학원",
    "eduRegNo": "경기도용인교육지원청 등록 제 5253호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "구갈초",
        "산양초",
        "관곡초"
      ],
      "middle": [
        "구갈중",
        "신갈중",
        "신릉중"
      ],
      "high": [
        "기흥고",
        "신갈고",
        "성지고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/FRL5reM6"
  },
  {
    "slug": "daegu-buk-daegu-donam",
    "name": "대구도남점",
    "fullName": "대구도남점",
    "brand": "wawa",
    "sido": "daegu",
    "sidoName": "대구",
    "sigungu": "북구",
    "address": "대구 북구 도남중앙로7길 20-3  위너프라자 402호",
    "eduOffice": "대구도남점와와학습코칭학원",
    "eduRegNo": "대구광역시서부교육지원청 제2023-4500호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "도남초",
        "국우초"
      ],
      "middle": [
        "학남중 강북중"
      ],
      "high": [
        "학남고",
        "구암고",
        "강북고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xSFi8GY0"
  },
  {
    "slug": "daejeon-yuseong-banseok",
    "name": "반석점",
    "fullName": "반석점",
    "brand": "wawa",
    "sido": "daejeon",
    "sidoName": "대전",
    "sigungu": "유성구",
    "address": "대전 유성구 지족로 282  코오롱타워2 303,304",
    "eduOffice": "반석점와와학습코칭학원",
    "eduRegNo": "대전서부교육지원청 등록 제 서4638호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "english": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "새미래초",
        "반석초"
      ],
      "middle": [
        "새미래중",
        "외삼중",
        "하기중"
      ],
      "high": [
        "반석고",
        "노은고",
        "지족고",
        "유성고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/IFgxKq7J"
  },
  {
    "slug": "gyeonggi-hwaseong-hwaseong-taean",
    "name": "화성태안점",
    "fullName": "화성태안점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "화성시",
    "address": "경기 화성시 병점중앙로 87  408호",
    "eduOffice": "화성태안점와와학습코칭학원",
    "eduRegNo": "경기도화성오산교육지원청 제4750호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "송화초",
        "태안초",
        "병점초"
      ],
      "middle": [
        "병점중",
        "안화중",
        "안용중"
      ],
      "high": [
        "병점고",
        "안화고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xzxfiwff"
  },
  {
    "slug": "gyeonggi-hwaseong-bongdam",
    "name": "봉담점",
    "fullName": "봉담점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "화성시",
    "address": "경기 화성시 봉담읍 상리중심상가길 28-8  713호",
    "eduOffice": "봉담점와와학습코칭학원",
    "eduRegNo": "경기도화성오산교육지원청 제 5025호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [],
      "middle": [],
      "high": []
    },
    "feeType": "B",
    "isNew": true,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/GzEYT9VB"
  },
  {
    "slug": "seoul-gangbuk-samgaksan",
    "name": "삼각산점",
    "fullName": "삼각산점",
    "brand": "wawa",
    "sido": "seoul",
    "sidoName": "서울",
    "sigungu": "강북구",
    "address": "서울 강북구 미아동  811-9 두산위브테라스파크 상가 402/403호",
    "eduOffice": "삼각산점와와학습코칭학원",
    "eduRegNo": "성북강북교육지원청 등록 제2017-58호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "길음초",
        "송천초",
        "미양초"
      ],
      "middle": [
        "삼각산중",
        "길음중",
        "미양중"
      ],
      "high": [
        "삼각산고",
        "미양고",
        "영훈고",
        "혜화여고"
      ]
    },
    "feeType": "A",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/FvEOCq5y"
  },
  {
    "slug": "seoul-yeongdeungpo-dangsan",
    "name": "당산점",
    "fullName": "당산점",
    "brand": "wawa",
    "sido": "seoul",
    "sidoName": "서울",
    "sigungu": "영등포구",
    "address": "서울 영등포구 당산로44길 3  삼성타운 504",
    "eduOffice": "당산점와와학습코칭학원",
    "eduRegNo": "서울남부교육지원청 등록 제 5746호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "당서초",
        "영동초",
        "당중초"
      ],
      "middle": [
        "당산중",
        "당산서중",
        "선유중"
      ],
      "high": [
        "선유고",
        "여의도고",
        "여의도여고",
        "영등포여고",
        "관악고"
      ]
    },
    "feeType": "A",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/GeUQMcKr"
  },
  {
    "slug": "seoul-eunpyeong-eunpyeong",
    "name": "은평점",
    "fullName": "은평점",
    "brand": "wawa",
    "sido": "seoul",
    "sidoName": "서울",
    "sigungu": "은평구",
    "address": "서울특별시 은평구 진관동 진관2로 29-21  드림스퀘어 제 8층 804호 805호",
    "eduOffice": "와와학습코칭학원",
    "eduRegNo": "서울서부교육지원청 등록 제02201700112호",
    "subjects": {
      "korean": [],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "math": [],
      "science": [
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": [
        "중1",
        "중2",
        "중3",
        "고1"
      ]
    },
    "targets": {
      "elem": [
        "은진초",
        "은빛초",
        "진관초",
        "신도초"
      ],
      "middle": [
        "진관중",
        "신도중",
        "연천중"
      ],
      "high": [
        "진관고",
        "신도고",
        "대성고",
        "선일여고"
      ]
    },
    "feeType": "A",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/GkRaiHMp"
  },
  {
    "slug": "gyeonggi-goyang-hwajeong",
    "name": "화정점",
    "fullName": "화정점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "고양시",
    "address": "경기 고양시 덕양구 화신로 263  브릿지타워 213호, 214호",
    "eduOffice": "화정점와와학습코칭학원",
    "eduRegNo": "고양교육지원청 등록 제5768호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": []
    },
    "targets": {
      "elem": [],
      "middle": [
        "화정중",
        "지도중",
        "신능중"
      ],
      "high": [
        "화정고",
        "화수고",
        "백양고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/FMc7xL0W"
  },
  {
    "slug": "gyeonggi-guri-inchang",
    "name": "인창점",
    "fullName": "인창점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "구리시",
    "address": "경기 구리시 건원대로 36  제 407호",
    "eduOffice": "와와학습코칭센터학원",
    "eduRegNo": "구리남양주교육지원청 등록 제3467호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "건원초",
        "동구초",
        "구지초"
      ],
      "middle": [
        "인창중",
        "동구중"
      ],
      "high": [
        "인창고",
        "수택고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/GvcRFBOz"
  },
  {
    "slug": "seoul-gangseo-yeomchang",
    "name": "염창점",
    "fullName": "염창점",
    "brand": "wawa",
    "sido": "seoul",
    "sidoName": "서울",
    "sigungu": "강서구",
    "address": "서울 강서구 양천로67길 15  한희빌딩 2층 202호",
    "eduOffice": "와와코칭보습학원",
    "eduRegNo": "강서양천교육지원청 등록 제 5716호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "english": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "염경초",
        "염동초",
        "백석초"
      ],
      "middle": [],
      "high": []
    },
    "feeType": "A",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/FHlPbz5k"
  },
  {
    "slug": "incheon-bupyeong-incheon-samsan",
    "name": "인천삼산점",
    "fullName": "인천삼산점",
    "brand": "wawa",
    "sido": "incheon",
    "sidoName": "인천",
    "sigungu": "부평구",
    "address": "인천 부평구 체육관로 32  하이존빌딩 8층 802",
    "eduOffice": "인천삼산점와와학습코칭학원",
    "eduRegNo": "인천북부교육지원청 등록 제4641호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "굴포초",
        "진산초",
        "영선초"
      ],
      "middle": [
        "진산중",
        "삼산중",
        "구산중"
      ],
      "high": [
        "영선고",
        "삼산고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 3,
    "naverMapUrl": "https://naver.me/59vHcBt5"
  },
  {
    "slug": "gyeonggi-seongnam-imae",
    "name": "이매점",
    "fullName": "이매점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "성남시",
    "address": "경기도 성남시 분당구 이매동 이매로 49  4층",
    "eduOffice": "이매점와와학습코칭학원",
    "eduRegNo": "성남교육지원청 등록 제5320호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "이매초",
        "안말초"
      ],
      "middle": [
        "매송중",
        "이매중",
        "송림중"
      ],
      "high": [
        "이매고",
        "송림고",
        "태원고",
        "돌마고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/Fafu3VzN"
  },
  {
    "slug": "daegu-buk-chimsan",
    "name": "침산점",
    "fullName": "침산점",
    "brand": "wawa",
    "sido": "daegu",
    "sidoName": "대구",
    "sigungu": "북구",
    "address": "대구 북구 침산남로 140  엠비프라자 901",
    "eduOffice": "침산점와와학습코칭학원",
    "eduRegNo": "대구서부교육지원청 등록 제2019-4229호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ]
    },
    "targets": {
      "elem": [
        "침산초",
        "달산초"
      ],
      "middle": [
        "침산중",
        "대구일중",
        "경명여중",
        "산격중",
        "대구북중"
      ],
      "high": [
        "경명여고",
        "칠성고",
        "청구고",
        "사대부고",
        "경상고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/FqWCS6mI"
  },
  {
    "slug": "gyeonggi-osan-osan",
    "name": "오산점",
    "fullName": "오산점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "오산시",
    "address": "경기 오산시 성호대로 121  월드타워 505호",
    "eduOffice": "와와학습코칭학원",
    "eduRegNo": "화성오산교육지원청 등록 제2840호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ]
    },
    "targets": {
      "elem": [
        "운천초",
        "성호초",
        "운산초"
      ],
      "middle": [
        "운암중",
        "운천중",
        "성호중"
      ],
      "high": [
        "운암고",
        "운천고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/Gj6sRmqf"
  },
  {
    "slug": "gyeonggi-namyangju-byeolnae",
    "name": "별내점",
    "fullName": "별내점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "남양주시",
    "address": "경기 남양주시 순화궁로 349  삼광프라자 501호",
    "eduOffice": "별내점와와학습코칭학원",
    "eduRegNo": "구리남양주교육지원청 등록 제4170호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "샛별초",
        "화접초",
        "별가람초",
        "한별초",
        "덕송초"
      ],
      "middle": [
        "별가람중",
        "한별중",
        "한삼중"
      ],
      "high": [
        "별가람고",
        "별내고",
        "한삼고",
        "퇴계원고",
        "청학고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/FqWQbdZB"
  },
  {
    "slug": "gyeonggi-suwon-yeongtong-gucheong",
    "name": "영통구청점",
    "fullName": "영통구청점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "수원시",
    "address": "경기 수원시 영통구 매탄로108번길 10  모닝프라자 602호",
    "eduOffice": "영통구청점와와학습코칭학원",
    "eduRegNo": "수원교육지원청 등록 제6824-1호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ]
    },
    "targets": {
      "elem": [
        "매탄초",
        "매현초"
      ],
      "middle": [
        "매탄중",
        "매현중"
      ],
      "high": [
        "매탄고",
        "효원고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/IgJETPrB"
  },
  {
    "slug": "incheon-bupyeong-bupyeong",
    "name": "부평점",
    "fullName": "부평점",
    "brand": "wawa",
    "sido": "incheon",
    "sidoName": "인천",
    "sigungu": "부평구",
    "address": "인천광역시 부평구 부평동 부흥로 264  5층",
    "eduOffice": "와와학습코칭센터부평학원",
    "eduRegNo": "인천북부교육지원청 등록 제4371호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "부평서초",
        "부평동초"
      ],
      "middle": [
        "부원중",
        "부원여중"
      ],
      "high": [
        "부평고",
        "부평여고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xGIjaNOv"
  },
  {
    "slug": "gyeonggi-goyang-pungdong",
    "name": "풍동점",
    "fullName": "풍동점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "고양시",
    "address": "경기 고양시 일산동구 숲속마을로 44  미래타워 6",
    "eduOffice": "풍동와와학습코칭학원",
    "eduRegNo": "고양교육지원청 등록 제5785호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "science": [
        "중1",
        "중2",
        "중3"
      ],
      "social": [
        "중1",
        "중2",
        "중3",
        "고1"
      ]
    },
    "targets": {
      "elem": [
        "풍산초",
        "다솜초",
        "은행초"
      ],
      "middle": [
        "풍동중",
        "풍산중",
        "양일중"
      ],
      "high": [
        "풍동고",
        "세원고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5oEehAHP"
  },
  {
    "slug": "jeonbuk-jeonju-sonkcheon",
    "name": "송천점",
    "fullName": "송천점",
    "brand": "wawa",
    "sido": "jeonbuk",
    "sidoName": "전북",
    "sigungu": "전주시",
    "address": "전북특별자치도 전주시 덕진구 솔내로 129  송천열방빌딩 501호",
    "eduOffice": "와와학습코칭송천점학원",
    "eduRegNo": "전주교육지원청 등록 제6679호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": []
    },
    "targets": {
      "elem": [],
      "middle": [],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/Gj6cfYxP"
  },
  {
    "slug": "daejeon-jung-taepyeong",
    "name": "태평점",
    "fullName": "태평점",
    "brand": "wawa",
    "sido": "daejeon",
    "sidoName": "대전",
    "sigungu": "중구",
    "address": "대전 중구 태평로 15  버드내마을아파트 상가 308",
    "eduOffice": "태평와와학습코칭학원",
    "eduRegNo": "대전동부교육지원청등록 제 2동3247호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "버드내초"
      ],
      "middle": [
        "버드내중",
        "태평중"
      ],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/FtTpwYJb"
  },
  {
    "slug": "gyeonggi-siheung-mokgam-modu",
    "name": "목감점",
    "fullName": "목감점(모두)",
    "brand": "modu",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "시흥시",
    "address": "경기 시흥시 수풀안길 14-23  4층 402호",
    "eduOffice": "목감점모두오름학습코칭학원",
    "eduRegNo": "시흥교육지원청 등록 제 시1311호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "조남초",
        "목감초"
      ],
      "middle": [
        "조남중"
      ],
      "high": [
        "목감고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/GoDRFJBm"
  },
  {
    "slug": "daejeon-daedeok-songchon",
    "name": "송촌점",
    "fullName": "송촌점",
    "brand": "wawa",
    "sido": "daejeon",
    "sidoName": "대전",
    "sigungu": "대덕구",
    "address": "대전 대덕구 동춘당로94번길 11-7  4층 402",
    "eduOffice": "송촌와와학습코칭학원",
    "eduRegNo": "대전동부교육지원청등록 제 2동3248호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "english": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "송촌초"
      ],
      "middle": [
        "매봉중",
        "법동중",
        "송촌중"
      ],
      "high": [
        "송촌고",
        "명석고",
        "우송고",
        "대전여고",
        "동대전고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/x1VzXS07"
  },
  {
    "slug": "gyeonggi-bucheon-jungdong",
    "name": "중동점",
    "fullName": "중동점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "부천시",
    "address": "경기 부천시 원미구 길주로 191  금영프라자 제 4층 401호",
    "eduOffice": "와와학습코칭보습학원",
    "eduRegNo": "부천교육지원청 등록 제5918호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "부흥초",
        "중흥초"
      ],
      "middle": [
        "중흥중",
        "부명중"
      ],
      "high": [
        "증흥고",
        "중원고",
        "경기예고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xzxfFleV"
  },
  {
    "slug": "gyeonggi-bucheon-jungdong-wplus",
    "name": "중동점",
    "fullName": "중동점(W+)",
    "brand": "wplus",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "부천시",
    "address": "경기 부천시 원미구 길주로 219  드림빌딩 401호",
    "eduOffice": "중동점더블유플러스보습학원",
    "eduRegNo": "부천교육지원청 등록 제6516호",
    "subjects": {
      "korean": [],
      "english": [],
      "math": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "부흥초",
        "중흥초"
      ],
      "middle": [
        "중흥중",
        "부명중"
      ],
      "high": [
        "증흥고",
        "중원고",
        "경기예고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5jJ8CnoO"
  },
  {
    "slug": "gyeonggi-bucheon-sinjungdong",
    "name": "신중동점",
    "fullName": "신중동점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "부천시",
    "address": "경기 부천시 원미구 조마루로291번길 25  센터프라자 405호, 406호",
    "eduOffice": "와와학습코칭신중동보습학원",
    "eduRegNo": "부천교육지원청 등록 제6330호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "english": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "부곡초",
        "계남초",
        "심원초"
      ],
      "middle": [
        "심원중",
        "계남중",
        "부곡중"
      ],
      "high": [
        "계남고",
        "심원고",
        "원미고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/GzENbx0l"
  },
  {
    "slug": "gyeonggi-goyang-hwajeong-wplus",
    "name": "화정점",
    "fullName": "화정점(W+)",
    "brand": "wplus",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "고양시",
    "address": "경기 고양시 덕양구 화중로 32-31  효원빌딩 401호 일부",
    "eduOffice": "화정점더블유플러스학원",
    "eduRegNo": "고양교육지원청 등록 제6077호",
    "subjects": {
      "korean": [],
      "english": [],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "지도초"
      ],
      "middle": [
        "화정중",
        "신능중"
      ],
      "high": [
        "화정고",
        "서정고",
        "백양고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/FTXwIBAk"
  },
  {
    "slug": "gyeongbuk-pohang-yangdeok",
    "name": "양덕점",
    "fullName": "양덕점",
    "brand": "wawa",
    "sido": "gyeongbuk",
    "sidoName": "경북",
    "sigungu": "포항시",
    "address": "경북 포항시 북구 천마로 66  환호빌딩 402호",
    "eduOffice": "양덕점와와학습코칭학원",
    "eduRegNo": "포항교육지원청 등록 제2584호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "양덕초 양서초 장흥초"
      ],
      "middle": [
        "양덕중 장흥중 대도중 환호여중"
      ],
      "high": [
        "장성고 포고 포여고 유성여고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5N1nYxDD"
  },
  {
    "slug": "gyeonggi-yangju-okjeong",
    "name": "옥정점",
    "fullName": "옥정점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "양주시",
    "address": "경기 양주시 옥정로 218  신운정튼튼프라자 305호",
    "eduOffice": "옥정점와와학습코칭학원",
    "eduRegNo": "경기도동두천양주교육지원청 제1331호",
    "subjects": {
      "korean": [],
      "english": [],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [],
      "middle": [],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xWTSpJa9"
  },
  {
    "slug": "seoul-eunpyeong-eunpyeong-gloride",
    "name": "은평점",
    "fullName": "은평점(글로리드)",
    "brand": "gloride",
    "sido": "seoul",
    "sidoName": "서울",
    "sigungu": "은평구",
    "address": "서울 은평구 진관2로 29-21  드림스퀘어 609호",
    "eduOffice": "은평점글로리드학습코칭학원",
    "eduRegNo": "서울특별시 서부교육지원청 제 02202300049호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "english": [],
      "math": [],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [],
      "middle": [],
      "high": []
    },
    "feeType": "A",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/5S9qoixD"
  },
  {
    "slug": "gyeonggi-namyangju-dasan-wplus",
    "name": "다산점",
    "fullName": "다산점(W+)",
    "brand": "wplus",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "남양주시",
    "address": "경기 남양주시 다산순환로 350  KB골든타워 310호",
    "eduOffice": "다산점더블유플러스학원",
    "eduRegNo": "경기도구리남양주교육지원청 제4711호",
    "subjects": {
      "korean": [],
      "english": [],
      "math": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "social": []
    },
    "targets": {
      "elem": [],
      "middle": [],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5IS72N5U"
  },
  {
    "slug": "gyeonggi-bucheon-okgil-star",
    "name": "옥길스타점",
    "fullName": "옥길스타점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "부천시",
    "address": "경기 부천시 소사구 범안로 231-15  옥길중앙타워 제2층 201호",
    "eduOffice": "옥길스타점와와학습코칭보습학원",
    "eduRegNo": "경기도부천교육지원청 등록 제6775호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6"
      ],
      "english": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [],
      "middle": [],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5pwPeF64"
  },
  {
    "slug": "seoul-gwangjin-gwangjang",
    "name": "광장점",
    "fullName": "광장점",
    "brand": "wawa",
    "sido": "seoul",
    "sidoName": "서울",
    "sigungu": "광진구",
    "address": "서울 광진구 광나루로 584  동서울빌딩 5",
    "eduOffice": "와와학습코칭학원",
    "eduRegNo": "성동광진교육지원청 등록 제 2316호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": []
    },
    "targets": {
      "elem": [],
      "middle": [
        "양진중",
        "광장중"
      ],
      "high": [
        "광남고",
        "단대부고",
        "건대부고"
      ]
    },
    "feeType": "A",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/FA2qm83c"
  },
  {
    "slug": "daegu-jung-banwoldang",
    "name": "반월당점",
    "fullName": "반월당점",
    "brand": "wawa",
    "sido": "daegu",
    "sidoName": "대구",
    "sigungu": "중구",
    "address": "대구 중구 대봉로 253  3층",
    "eduOffice": "반월당점와와학습코칭학원",
    "eduRegNo": "대구광역시동부교육지원청 제6834호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "대구초",
        "사대부초"
      ],
      "middle": [
        "대구제일중",
        "사대부중"
      ],
      "high": [
        "사대부고",
        "경북여고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/Gxkz6D2f"
  },
  {
    "slug": "gyeonggi-siheung-baegot",
    "name": "배곧점",
    "fullName": "배곧점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "시흥시",
    "address": "경기 시흥시 배곧4로 22  배곧타운2 217호",
    "eduOffice": "배곧점와와학습코칭학원",
    "eduRegNo": "경기도시흥교육지원청 제 시1653 호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ]
    },
    "targets": {
      "elem": [],
      "middle": [],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5iTF91xR"
  },
  {
    "slug": "gyeonggi-yongin-myeongjidae-yeok",
    "name": "명지대역점",
    "fullName": "명지대역점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "용인시",
    "address": "경기 용인시 처인구 명지로40번길 4  링크 153 502호",
    "eduOffice": "명지대역점와와학습코칭학원",
    "eduRegNo": "경기도용인교육지원청 제 5578 호",
    "subjects": {
      "korean": [],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "함박초",
        "서룡초"
      ],
      "middle": [
        "용신중",
        "용인중"
      ],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/x4FKQDKN"
  },
  {
    "slug": "chungbuk-chungju-chilgeum",
    "name": "칠금점",
    "fullName": "칠금점",
    "brand": "wawa",
    "sido": "chungbuk",
    "sidoName": "충북",
    "sigungu": "충주시",
    "address": "충청북도 충주시 칠금동 계명대로 29  3층",
    "eduOffice": "칠금점와와학습코칭학원",
    "eduRegNo": "충주교육지원청 등록 제1469호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "탄금초",
        "칠금초"
      ],
      "middle": [
        "탄금중",
        "칠금중",
        "중앙중",
        "미덕중",
        "여중",
        "북여중",
        "충주중"
      ],
      "high": [
        "국원고",
        "예성여고",
        "충주여고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xf5f38Sf"
  },
  {
    "slug": "gyeonggi-osan-segyo",
    "name": "세교점",
    "fullName": "세교점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "오산시",
    "address": "경기 오산시 수청로 193  P&P세교프라자 402호",
    "eduOffice": "세교점와와학습코칭학원",
    "eduRegNo": "화성오산교육지원청 등록 제4098호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ]
    },
    "targets": {
      "elem": [],
      "middle": [
        "문시중",
        "세마중"
      ],
      "high": [
        "세교고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5mIirQ3r"
  },
  {
    "slug": "gyeonggi-yongin-suji-gloride",
    "name": "수지점",
    "fullName": "수지점(글로리드)",
    "brand": "gloride",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "용인시",
    "address": "경기 용인시 수지구 풍덕천로 114  3층",
    "eduOffice": "수지점글로리드학습코칭학원",
    "eduRegNo": "경기도용인교육지원청 제5340호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "풍천초",
        "정평초",
        "이현초"
      ],
      "middle": [
        "이현중",
        "수지중",
        "정평중"
      ],
      "high": [
        "상현고",
        "신봉고",
        "홍천고",
        "성복고",
        "풍덕고",
        "수지고",
        "죽전고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5T48HGW1"
  },
  {
    "slug": "seoul-mapo-mapo-2ho",
    "name": "마포2호점",
    "fullName": "마포2호점",
    "brand": "wawa",
    "sido": "seoul",
    "sidoName": "서울",
    "sigungu": "마포구",
    "address": "서울 마포구 토정로 252  승지빌딩 3층",
    "eduOffice": "마포2호점와와학습코칭학원",
    "eduRegNo": "서울특별시 서부교육지원청 제02202300102호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": [
        "초3",
        "초4",
        "초5",
        "초6"
      ]
    },
    "targets": {
      "elem": [
        "신석초",
        "염리초",
        "용강초",
        "서강초",
        "우이초"
      ],
      "middle": [
        "서울여중",
        "동도중",
        "신수중"
      ],
      "high": [
        "서울여고",
        "숭문고",
        "광성고",
        "한성고",
        "배문고"
      ]
    },
    "feeType": "A",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/FzSFfWnq"
  },
  {
    "slug": "gyeonggi-namyangju-dasan-donong",
    "name": "다산도농점",
    "fullName": "다산도농점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "남양주시",
    "address": "경기 남양주시 도농로 29  604호",
    "eduOffice": "다산도농점와와학습코칭학원",
    "eduRegNo": "경기도구리남양주교육지원청 제4749호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "science": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ]
    },
    "targets": {
      "elem": [
        "도농초",
        "금교초",
        "미금초"
      ],
      "middle": [
        "동화중",
        "도농중",
        "가운중"
      ],
      "high": [
        "도농고",
        "가운고",
        "다산고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/FQVt51y3"
  },
  {
    "slug": "gyeonggi-namyangju-byeolgaram",
    "name": "별가람점",
    "fullName": "별가람점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "남양주시",
    "address": "경기 남양주시 덕송1로55번길 20  503호",
    "eduOffice": "별가람점와와학습코칭학원",
    "eduRegNo": "경기도구리남양주교육지원청 제4785호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ]
    },
    "targets": {
      "elem": [
        "덕송초",
        "샛별초"
      ],
      "middle": [
        "별가람중",
        "화접중",
        "한별중"
      ],
      "high": [
        "별내고",
        "별가람고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/FN7cuLem"
  },
  {
    "slug": "gyeonggi-hwaseong-dongtan-mokdong",
    "name": "동탄목동점",
    "fullName": "동탄목동점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "화성시",
    "address": "경기 화성시 동탄신리천로 408  M메디칼 212호",
    "eduOffice": "동탄목동점와와학습코칭학원",
    "eduRegNo": "경기도화성오산교육지원청 제4752호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ]
    },
    "targets": {
      "elem": [
        "동탄목동초",
        "한율초"
      ],
      "middle": [
        "동탄목동중",
        "세정중"
      ],
      "high": [
        "창의고",
        "정현고"
      ]
    },
    "feeType": "A",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/FZ2CqpnT"
  },
  {
    "slug": "gyeongbuk-pohang-duho",
    "name": "두호점",
    "fullName": "두호점",
    "brand": "wawa",
    "sido": "gyeongbuk",
    "sidoName": "경북",
    "sigungu": "포항시",
    "address": "경상북도 포항시 북구 용두산길 32  3층",
    "eduOffice": "와와학습코칭센터학원",
    "eduRegNo": "포항교육지원청 등록 제2124호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6"
      ],
      "english": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초4",
        "초5",
        "초6"
      ],
      "social": [
        "초4",
        "초5",
        "초6"
      ]
    },
    "targets": {
      "elem": [],
      "middle": [
        "환호여중",
        "대도중"
      ],
      "high": [
        "두호고",
        "포여고",
        "장성고",
        "포고",
        "중앙고",
        "중앙여고",
        "대동고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/513kQvx9"
  },
  {
    "slug": "gwangju-gwangsan-seonun",
    "name": "선운점",
    "fullName": "선운점",
    "brand": "wawa",
    "sido": "gwangju",
    "sidoName": "광주",
    "sigungu": "광산구",
    "address": "광주 광산구 선운로20번길 55-1  402호",
    "eduOffice": "선운점와와학습코칭학원",
    "eduRegNo": "광주광역시서부교육지원청 제7446호",
    "subjects": {
      "korean": [],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ]
    },
    "targets": {
      "elem": [
        "선운초",
        "본량초"
      ],
      "middle": [
        "선운중"
      ],
      "high": [
        "정광고",
        "보문고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5T48Hf94"
  },
  {
    "slug": "gyeonggi-paju-gyoha",
    "name": "교하점",
    "fullName": "교하점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "파주시",
    "address": "경기 파주시 청석로 272  센타프라자1 제8층 제803",
    "eduOffice": "교하점와와학습코칭학원",
    "eduRegNo": "경기도파주교육지원청 제1975호",
    "subjects": {
      "korean": [],
      "english": [],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "청석초",
        "석곶초",
        "두일초"
      ],
      "middle": [
        "교하중",
        "두일중",
        "심학중"
      ],
      "high": [
        "교하고",
        "심학고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5ZJhObnl"
  },
  {
    "slug": "seoul-songpa-songpa-wirye",
    "name": "송파위례점",
    "fullName": "송파위례점",
    "brand": "wawa",
    "sido": "seoul",
    "sidoName": "서울",
    "sigungu": "송파구",
    "address": "서울 송파구 위례광장로 188  아이온스퀘어 8층 816호",
    "eduOffice": "송파위례점와와학습코칭학원",
    "eduRegNo": "서울특별시강동송파교육지원청 제8296호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "english": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "송례초",
        "위례별초"
      ],
      "middle": [
        "위례중",
        "송례중"
      ],
      "high": [
        "영어 현재 덕수고만 가능합니다. 예체능 및 특성화는 상담후 가능여부 결정."
      ]
    },
    "feeType": "A",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/FEUvacHz"
  },
  {
    "slug": "gyeonggi-gunpo-sanbon",
    "name": "산본점",
    "fullName": "산본점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "군포시",
    "address": "경기 군포시 산본로 394  대림프라자 제 6층 제602호",
    "eduOffice": "산본점와와학습코칭학원",
    "eduRegNo": "경기도군포의왕교육지원청 제2444호",
    "subjects": {
      "korean": [
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "중1",
        "중2",
        "중3"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "광정초"
      ],
      "middle": [
        "산본중",
        "궁내중",
        "수리중",
        "도장중",
        "금정중"
      ],
      "high": [
        "흥진고",
        "산본고",
        "군포고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/FZ2Cqs4s"
  },
  {
    "slug": "incheon-namdong-guwol",
    "name": "구월점",
    "fullName": "구월점",
    "brand": "wawa",
    "sido": "incheon",
    "sidoName": "인천",
    "sigungu": "남동구",
    "address": "인천 남동구 선수촌공원로23번길 6-29  다복타워 401호",
    "eduOffice": "구월점와와학습코칭학원",
    "eduRegNo": "인천광역시동부교육지원청 제4031호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ]
    },
    "targets": {
      "elem": [
        "성리초"
      ],
      "middle": [
        "성리중"
      ],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xhz32mu1"
  },
  {
    "slug": "gyeonggi-ansan-gojan",
    "name": "고잔점",
    "fullName": "고잔점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "안산시",
    "address": "경기 안산시 단원구 광덕대로 130  폴리타운 B동 513호",
    "eduOffice": "와와학습코칭센터안산학원",
    "eduRegNo": "안산교육지원청 등록 제4176호",
    "subjects": {
      "korean": [],
      "english": [],
      "math": [],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [],
      "middle": [],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5xjf029f"
  },
  {
    "slug": "seoul-seodaemun-gajwa",
    "name": "가좌점",
    "fullName": "가좌점",
    "brand": "wawa",
    "sido": "seoul",
    "sidoName": "서울",
    "sigungu": "서대문구",
    "address": "서울 서대문구 가재울로 52  승우빌딩 301호",
    "eduOffice": "가좌점와와학습코칭학원",
    "eduRegNo": "서울서부교육지원청 등록 제02202000014호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "가재울초",
        "연가초"
      ],
      "middle": [],
      "high": [
        "가재울고"
      ]
    },
    "feeType": "A",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/FdCIP0Dt"
  },
  {
    "slug": "gyeonggi-namyangju-hopyeong",
    "name": "호평점",
    "fullName": "호평점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "남양주시",
    "address": "경기 남양주시 늘을3로 65-6  테마프라자 205호",
    "eduOffice": "호평점와와학습코칭학원",
    "eduRegNo": "구리남양주교육지원청 등록 제4177호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "구룡초",
        "호평초",
        "판곡초"
      ],
      "middle": [
        "판곡중",
        "호평중"
      ],
      "high": [
        "판곡고",
        "호평고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/x2jCMtfA"
  },
  {
    "slug": "gyeonggi-namyangju-pyeongnae",
    "name": "평내점",
    "fullName": "평내점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "남양주시",
    "address": "경기 남양주시 경춘로 1256번길 9  501호",
    "eduOffice": "평내점와와학습코칭학원",
    "eduRegNo": "구리남양주교육지원청 등록 제3712호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "장내초",
        "호평초"
      ],
      "middle": [
        "장내중",
        "호평중"
      ],
      "high": [
        "호평고",
        "금곡고",
        "판곡고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xWTSp3zP"
  },
  {
    "slug": "gyeonggi-icheon-bubal",
    "name": "부발점",
    "fullName": "부발점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "이천시",
    "address": "경기 이천시 부발읍 경충대로2092번길 39-19  이천하이클래스 207,208",
    "eduOffice": "와와학습코칭부발학원",
    "eduRegNo": "이천교육지원청 등록 제1222호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ]
    },
    "targets": {
      "elem": [
        "아미초",
        "신하초"
      ],
      "middle": [
        "효양중",
        "사동중",
        "대월중"
      ],
      "high": [
        "효양고",
        "제일고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xQeGILay"
  },
  {
    "slug": "daegu-dong-yulha",
    "name": "율하점",
    "fullName": "율하점",
    "brand": "wawa",
    "sido": "daegu",
    "sidoName": "대구",
    "sigungu": "동구",
    "address": "대구 동구 율하동로 32  4층",
    "eduOffice": "율하점와와학습코칭학원",
    "eduRegNo": "대구동부교육지원청 등록 제6183호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "숙천초",
        "율원초",
        "율금초",
        "안일초"
      ],
      "middle": [
        "율원중",
        "강동중",
        "안심중",
        "새론중",
        "신기중",
        "동원중"
      ],
      "high": [
        "동부고",
        "강동고",
        "정동고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5r91T4DN"
  },
  {
    "slug": "gyeonggi-pyeongtaek-bijeon",
    "name": "비전점",
    "fullName": "비전점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "평택시",
    "address": "경기도 평택시 비전동 평남로 937  폴리프라자 602호, 603호",
    "eduOffice": "와와학습코칭센터학원",
    "eduRegNo": "평택교육지원청 등록 제 2126호",
    "subjects": {
      "korean": [
        "중1",
        "중2",
        "중3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "중1",
        "중2",
        "중3"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "이화초 가내초 자란초"
      ],
      "middle": [
        "비전중 한광중 한광여중 평택여중 소사벌중"
      ],
      "high": [
        "비전고 한광고 한광여고 평택여고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/GbDdn8jK"
  },
  {
    "slug": "gyeonggi-bucheon-okgil",
    "name": "옥길점",
    "fullName": "옥길점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "부천시",
    "address": "경기 부천시 소사구 옥길로 116  퀸즈파크 A동 7층 718호~719",
    "eduOffice": "옥길점와와학습코칭보습학원",
    "eduRegNo": "부천교육지원청 등록 제6454호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "english": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": [
        "고1"
      ]
    },
    "targets": {
      "elem": [
        "버들초"
      ],
      "middle": [
        "옥길중"
      ],
      "high": [
        "범박고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/FgHlO3Ws"
  },
  {
    "slug": "gyeonggi-goyang-hugok",
    "name": "후곡점",
    "fullName": "후곡점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "고양시",
    "address": "경기 고양시 일산서구 일산로 511  태성상가 2층 201,202",
    "eduOffice": "후곡점와와학습코칭학원",
    "eduRegNo": "고양교육지원청 등록 제5985호",
    "subjects": {
      "korean": [
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": []
    },
    "targets": {
      "elem": [],
      "middle": [],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xX7TPhNi"
  },
  {
    "slug": "gangwon-wonju-dangu",
    "name": "단구점",
    "fullName": "단구점",
    "brand": "wawa",
    "sido": "gangwon",
    "sidoName": "강원",
    "sigungu": "원주시",
    "address": "강원특별자치도 원주시 서원대로 406  리더스빌딩 402",
    "eduOffice": "와와학습코칭학원",
    "eduRegNo": "원주교육지원청 등록 제2412호",
    "subjects": {
      "korean": [
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "english": [
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": [
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ]
    },
    "targets": {
      "elem": [
        "구곡초등학교",
        "서원주초등학교"
      ],
      "middle": [
        "남원주중학교",
        "단구중학교"
      ],
      "high": [
        "치악고등학교",
        "원주고등학교"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5chIDMNH"
  },
  {
    "slug": "chungbuk-cheongju-bokdae",
    "name": "복대점",
    "fullName": "복대점",
    "brand": "wawa",
    "sido": "chungbuk",
    "sidoName": "충북",
    "sigungu": "청주시",
    "address": "충북 청주시 흥덕구 진재로 37  3층",
    "eduOffice": "복대점와와학습코칭학원",
    "eduRegNo": "청주교육지원청 등록 제5298호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "증안초",
        "진흥초"
      ],
      "middle": [
        "복대중",
        "서원중",
        "솔밭중"
      ],
      "high": [
        "흥덕고",
        "세광고",
        "사대부고",
        "청주고",
        "중앙여고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5Q3gDCHc"
  },
  {
    "slug": "gyeonggi-seongnam-dandae",
    "name": "단대점",
    "fullName": "단대점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "성남시",
    "address": "경기 성남시 수정구 산성대로 423  5층",
    "eduOffice": "단대점와와학습코칭학원",
    "eduRegNo": "성남교육지원청 등록 제6183호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "단대초"
      ],
      "middle": [
        "서중",
        "은행중"
      ],
      "high": [
        "성남고",
        "성일고",
        "숭신여고",
        "동광고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/x5GzWeuN"
  },
  {
    "slug": "seoul-eunpyeong-eunpyeong-wplus",
    "name": "은평점",
    "fullName": "은평점(W+)",
    "brand": "wplus",
    "sido": "seoul",
    "sidoName": "서울",
    "sigungu": "은평구",
    "address": "서울 은평구 진관2로 19  휴먼프라자 312호",
    "eduOffice": "은평점더블유플러스수학보습학원",
    "eduRegNo": "서울서부교육지원청 등록 제02202100037호",
    "subjects": {
      "korean": [],
      "english": [],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "진관초",
        "신도초",
        "은진초"
      ],
      "middle": [
        "진관중",
        "신도중",
        "연천중"
      ],
      "high": [
        "진관고",
        "신도고",
        "대성고",
        "선일여고",
        "동명여고"
      ]
    },
    "feeType": "A",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/GUw9KeUT"
  },
  {
    "slug": "gyeonggi-paju-sannae",
    "name": "산내점",
    "fullName": "산내점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "파주시",
    "address": "경기 파주시 청암로17번길 21  월드타워5차 405호",
    "eduOffice": "산내점와와학습코칭학원",
    "eduRegNo": "파주교육지원청 등록 제1713호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [],
      "middle": [],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5fI84ehf"
  },
  {
    "slug": "incheon-yeonsu-donkchun",
    "name": "동춘점",
    "fullName": "동춘점",
    "brand": "wawa",
    "sido": "incheon",
    "sidoName": "인천",
    "sigungu": "연수구",
    "address": "인천 연수구 앵고개로264번길 40  남지빌딩 4층",
    "eduOffice": "동춘점와와학습코칭학원",
    "eduRegNo": "인천동부교육지원청 등록 제3723호",
    "subjects": {
      "korean": [
        "중1",
        "중2",
        "중3"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": []
    },
    "targets": {
      "elem": [],
      "middle": [],
      "high": [
        "대건고",
        "연수여고",
        "연수고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/G2E7qi8T"
  },
  {
    "slug": "gyeonggi-goyang-hugok-wplus",
    "name": "후곡점",
    "fullName": "후곡점(W+)",
    "brand": "wplus",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "고양시",
    "address": "경기 고양시 일산서구 일산로 524  202호",
    "eduOffice": "후곡점더블유플러스학원",
    "eduRegNo": "경기도고양교육지원청 등록 제6354호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": []
    },
    "targets": {
      "elem": [],
      "middle": [],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xP8rQzWH"
  },
  {
    "slug": "daegu-suseong-alpasiti",
    "name": "알파시티점",
    "fullName": "알파시티점",
    "brand": "wawa",
    "sido": "daegu",
    "sidoName": "대구",
    "sigungu": "수성구",
    "address": "대구 수성구 알파시티2로 19  알파N시티 2층 201호",
    "eduOffice": "알파시티점와와학습코칭학원",
    "eduRegNo": "대구광역시동부교육지원청 제6562호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "노변초",
        "고산초"
      ],
      "middle": [
        "노변중",
        "고산중"
      ],
      "high": [
        "시지고",
        "덕원고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xv3oEAtX"
  },
  {
    "slug": "daegu-dalseo-sin-wolseonk",
    "name": "신월성점",
    "fullName": "신월성점",
    "brand": "wawa",
    "sido": "daegu",
    "sidoName": "대구",
    "sigungu": "달서구",
    "address": "대구 달서구 월성동  1848번지 그루타워 702호",
    "eduOffice": "신월성와와학습코칭학원",
    "eduRegNo": "대구남부교육지원청 등록 제2017-120호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "english": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "조암초",
        "신월초",
        "월암초",
        "월성초"
      ],
      "middle": [
        "조암중",
        "월암중",
        "월서중",
        "효성중",
        "영남중",
        "대건중",
        "학산중"
      ],
      "high": [
        "영남고",
        "상원고",
        "효성여고",
        "송현여고",
        "상인고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/GYChuhve"
  },
  {
    "slug": "daegu-jung-daeguyeok",
    "name": "대구역점",
    "fullName": "대구역점",
    "brand": "wawa",
    "sido": "daegu",
    "sidoName": "대구",
    "sigungu": "중구",
    "address": "대구 중구 서성로 99  대구역센트럴자이 상가 302호",
    "eduOffice": "대구역점와와학습코칭학원",
    "eduRegNo": "대구광역시동부교육지원청 제6571호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "수창초",
        "달성초",
        "종로초"
      ],
      "middle": [
        "계성중",
        "성명여중",
        "사대부중"
      ],
      "high": [
        "사대부고",
        "경북여고",
        "신명고",
        "대구고",
        "경북예고",
        "칠성고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/IGJImIKR"
  },
  {
    "slug": "seoul-gangseo-sinbankhwa",
    "name": "신방화점",
    "fullName": "신방화점",
    "brand": "wawa",
    "sido": "seoul",
    "sidoName": "서울",
    "sigungu": "강서구",
    "address": "서울 강서구 방화대로 294  마곡더블유타워 505",
    "eduOffice": "신방화점와와학습코칭학원",
    "eduRegNo": "강서양천교육지원청 등록 제 5879호",
    "subjects": {
      "korean": [],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "송화초",
        "공항초"
      ],
      "middle": [
        "공항중",
        "송정중"
      ],
      "high": [
        "한서고",
        "공항고"
      ]
    },
    "feeType": "A",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/IFgYzW9j"
  },
  {
    "slug": "incheon-seo-cheongna",
    "name": "청라점",
    "fullName": "청라점",
    "brand": "wawa",
    "sido": "incheon",
    "sidoName": "인천",
    "sigungu": "서구",
    "address": "인천 서구 중봉대로 588  청라센트럴프라자 609",
    "eduOffice": "와와학습코칭청라학원",
    "eduRegNo": "인천서부교육지원청 등록 서부 제1903호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "science": [
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "social": []
    },
    "targets": {
      "elem": [],
      "middle": [
        "청라중",
        "해원중"
      ],
      "high": [
        "청라고",
        "해원고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 3,
    "naverMapUrl": "https://naver.me/Gq84X7ne"
  },
  {
    "slug": "gyeonggi-gwangmyeong-soha",
    "name": "소하점",
    "fullName": "소하점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "광명시",
    "address": "경기 광명시 오리로 346  행운드림프라자 4층 405호",
    "eduOffice": "소하점와와학습코칭학원",
    "eduRegNo": "광명교육지원청 등록 제1965호",
    "subjects": {
      "korean": [],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "충현초",
        "서면초"
      ],
      "middle": [
        "충현중",
        "빛가온중"
      ],
      "high": [
        "충현고",
        "광휘고",
        "소하고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/Gxkz6zEa"
  },
  {
    "slug": "ulsan-jung-boksan",
    "name": "복산점",
    "fullName": "복산점",
    "brand": "wawa",
    "sido": "ulsan",
    "sidoName": "울산",
    "sigungu": "중구",
    "address": "울산 중구 번영로 461  B2동 7",
    "eduOffice": "복산점와와학습코칭학원",
    "eduRegNo": "울산강북교육지원청 등록 제5462호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [],
      "middle": [],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/FEUXrFfs"
  },
  {
    "slug": "gyeonggi-hwaseong-dongtan-hosu",
    "name": "동탄호수점",
    "fullName": "동탄호수점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "화성시",
    "address": "경기 화성시 동탄순환대로 127-19  에스비타운 907호",
    "eduOffice": "동탄호수와와학습코칭학원",
    "eduRegNo": "화성오산교육지원청 등록 제3775호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ]
    },
    "targets": {
      "elem": [
        "방교초",
        "서연초"
      ],
      "middle": [
        "청림중",
        "서연중",
        "방교중"
      ],
      "high": [
        "정현고",
        "서연고",
        "창의고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/GhbUPTIL"
  },
  {
    "slug": "gyeonggi-yongin-donkbaek",
    "name": "동백점",
    "fullName": "동백점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "용인시",
    "address": "경기도 용인시 기흥구 중동 동백3로11번길 3  2층 201호",
    "eduOffice": "동백점와와학습코칭학원",
    "eduRegNo": "용인교육지원청 등록 제3918호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "english": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "math": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "science": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "석성초",
        "초당초"
      ],
      "middle": [
        "초당중",
        "백현중",
        "동백중",
        "성지중",
        "어정중",
        "용인중"
      ],
      "high": [
        "초당고",
        "백현고",
        "동백고",
        "성지고",
        "용인고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/IIt3ZjIi"
  },
  {
    "slug": "jeju-jeju-si-nohyeong",
    "name": "노형점",
    "fullName": "노형점",
    "brand": "wawa",
    "sido": "jeju",
    "sidoName": "제주",
    "sigungu": "제주시",
    "address": "제주특별자치도 제주시 노형동 727-3 대안빌딩  3층",
    "eduOffice": "와와학습코칭학원",
    "eduRegNo": "제주시교육지원청 등록 제2163호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ]
    },
    "targets": {
      "elem": [
        "노형초"
      ],
      "middle": [
        "서중",
        "중앙중"
      ],
      "high": [
        "지역내 모든 고등학교 가능"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/GBF602mw"
  },
  {
    "slug": "gyeonggi-gimpo-janggi",
    "name": "장기점",
    "fullName": "장기점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "김포시",
    "address": "경기도 김포시 장기동 김포한강4로 162  한강메트로 503호, 504호",
    "eduOffice": "와와학습코칭센터김포학원",
    "eduRegNo": "김포교육지원청 등록 제1237호",
    "subjects": {
      "korean": [],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ]
    },
    "targets": {
      "elem": [
        "푸른솔초",
        "운유초"
      ],
      "middle": [
        "장기중",
        "푸른솔중",
        "고창중"
      ],
      "high": [
        "솔터고",
        "제일고",
        "운양고",
        "통진고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xs3PUaNU"
  },
  {
    "slug": "busan-haeundae-jwadonk",
    "name": "좌동점",
    "fullName": "좌동점",
    "brand": "wawa",
    "sido": "busan",
    "sidoName": "부산",
    "sigungu": "해운대구",
    "address": "부산광역시 해운대구 좌동 좌동로 88  울트라타워 5층 508호",
    "eduOffice": "와와학습코칭센터학원",
    "eduRegNo": "해운대교육지원청 등록 제3142호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "social": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ]
    },
    "targets": {
      "elem": [
        "동백초",
        "부흥초",
        "신도초"
      ],
      "middle": [
        "신도중",
        "부흥중",
        "신곡중",
        "해운대중",
        "해강중"
      ],
      "high": [
        "신도고",
        "양운고",
        "부흥고",
        "해운대여고",
        "해강고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/Gj6sR0Zs"
  },
  {
    "slug": "chungnam-cheonan-sinbank",
    "name": "신방점",
    "fullName": "신방점",
    "brand": "wawa",
    "sido": "chungnam",
    "sidoName": "충남",
    "sigungu": "천안시",
    "address": "충청남도 천안시 동남구 신방동 886 학산프라자  A동 3층 304호,305호",
    "eduOffice": "와와학습코칭학원",
    "eduRegNo": "천안교육지원청 등록 제3413호",
    "subjects": {
      "korean": [
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "신용초"
      ],
      "middle": [
        "용곡중",
        "신방중"
      ],
      "high": [
        "청수고",
        "쌍용고",
        "천안여고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/G38cKCy7"
  },
  {
    "slug": "chungnam-cheonan-ssank-yonk",
    "name": "쌍용점",
    "fullName": "쌍용점",
    "brand": "wawa",
    "sido": "chungnam",
    "sidoName": "충남",
    "sigungu": "천안시",
    "address": "충청남도 천안시 서북구 쌍용동 불당대로 260  319호 318호(1/2)",
    "eduOffice": "와와학습코칭쌍용점학원",
    "eduRegNo": "천안교육지원청 등록 제3502호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "쌍용초.미라초."
      ],
      "middle": [
        "쌍용중.계광중.월봉중"
      ],
      "high": [
        "쌍용고.월봉고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5JpmPWor"
  },
  {
    "slug": "gyeonggi-hwaseong-byeonk",
    "name": "병점점",
    "fullName": "병점점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "화성시",
    "address": "경기 화성시 병점1로 221  화인메디컬프라자 2층 203호",
    "eduOffice": "병점점와와학습코칭학원",
    "eduRegNo": "화성오산교육지원청 등록 제4050호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "안화초",
        "진안초",
        "태안초",
        "병점초"
      ],
      "middle": [
        "안화중",
        "진안중",
        "병점중",
        "반월중"
      ],
      "high": [
        "안화고",
        "병점고",
        "반월고",
        "능동고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 3,
    "naverMapUrl": "https://naver.me/5k7TqbES"
  },
  {
    "slug": "chungnam-cheonan-buldank",
    "name": "불당점",
    "fullName": "불당점",
    "brand": "wawa",
    "sido": "chungnam",
    "sidoName": "충남",
    "sigungu": "천안시",
    "address": "충남 천안시 서북구 불당33길 22  고은타워 805호",
    "eduOffice": "불당점와와학습코칭학원",
    "eduRegNo": "천안교육지원청 등록 제4191호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [],
      "middle": [],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/FA2UB0El"
  },
  {
    "slug": "incheon-yeonsu-welka-unti",
    "name": "웰카운티점",
    "fullName": "웰카운티점",
    "brand": "wawa",
    "sido": "incheon",
    "sidoName": "인천",
    "sigungu": "연수구",
    "address": "인천 연수구 인천타워대로54번길 15-5  북일프라자 2층",
    "eduOffice": "웰카운티점와와학습코칭학원",
    "eduRegNo": "인천광역시동부교육지원청 등록 제3877호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "해송초등학교"
      ],
      "middle": [
        "해송중학교",
        "능허대중학교",
        "박문중학교"
      ],
      "high": [
        "해송고등학교",
        "연송고등학교",
        "대건고등학교"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5XJ1hzlc"
  },
  {
    "slug": "gyeonggi-goyang-jungsan",
    "name": "중산점",
    "fullName": "중산점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "고양시",
    "address": "경기 고양시 일산동구 중산로 103  거풍프라자 202호",
    "eduOffice": "중산점와와학습코칭학원",
    "eduRegNo": "경기도고양교육지원청 제 6727호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "모당초",
        "안곡초",
        "중산초"
      ],
      "middle": [
        "안곡중",
        "중산중",
        "일산중"
      ],
      "high": [
        "안곡고",
        "중산고"
      ]
    },
    "feeType": "B",
    "isNew": true,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xQixoaPG"
  },
  {
    "slug": "chungbuk-cheongju-gagyeong",
    "name": "가경점",
    "fullName": "가경점",
    "brand": "wawa",
    "sido": "chungbuk",
    "sidoName": "충북",
    "sigungu": "청주시",
    "address": "충북 청주시 흥덕구 서현북로 18  2층",
    "eduOffice": "가경점와와학습코칭학원",
    "eduRegNo": "충청북도청주교육지원청 제 5888호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ]
    },
    "targets": {
      "elem": [
        "서현초",
        "서경초"
      ],
      "middle": [
        "서현중",
        "경덕중",
        "서현중"
      ],
      "high": [
        "사대부고",
        "서원고",
        "청주외고"
      ]
    },
    "feeType": "B",
    "isNew": true,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xYvlTgdw"
  },
  {
    "slug": "chungnam-asan-tangjeong-modu",
    "name": "탕정점",
    "fullName": "탕정점(모두)",
    "brand": "modu",
    "sido": "chungnam",
    "sidoName": "충남",
    "sigungu": "아산시",
    "address": "충남 아산시 탕정면 한들물빛5로 5  605호",
    "eduOffice": "탕정점모두오름학습코칭학원",
    "eduRegNo": "충청남도아산교육지원청 제 1560호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ]
    },
    "targets": {
      "elem": [
        "한들물빛초",
        "연화초"
      ],
      "middle": [
        "한들물빛중",
        "아산갈산중",
        "설화중",
        "탕정중",
        "배방중",
        "세교중"
      ],
      "high": [
        "설화고",
        "이순신고"
      ]
    },
    "feeType": "B",
    "isNew": true,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/GScQs8mB"
  },
  {
    "slug": "daegu-dong-isiapolis",
    "name": "이시아폴리스점",
    "fullName": "이시아폴리스점",
    "brand": "wawa",
    "sido": "daegu",
    "sidoName": "대구",
    "sigungu": "동구",
    "address": "대구 동구 팔공로51길 33  A-503호",
    "eduOffice": "이시아폴리스점\n와와학습코칭학원",
    "eduRegNo": "대구동부교육지원청 제 6935호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "봉무초",
        "영신초"
      ],
      "middle": [
        "영신중",
        "팔공중",
        "복현중",
        "성광중",
        "성화중",
        "동촌중"
      ],
      "high": [
        "영신고",
        "경상고",
        "영진고",
        "성광고",
        "성화여고"
      ]
    },
    "feeType": "B",
    "isNew": true,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/GScBQNUd"
  },
  {
    "slug": "gyeonggi-yongin-sinbong",
    "name": "신봉점",
    "fullName": "신봉점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "용인시",
    "address": "경기 용인시 수지구 신봉2로 60  웰스톤시티엔웰스톤에비뉴 1동 103호",
    "eduOffice": "신봉점와와학습코칭학원",
    "eduRegNo": "경기도용인교육지원청 제 5625호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ]
    },
    "targets": {
      "elem": [
        "신봉초",
        "신일초",
        "홍천초",
        "신리초",
        "성복초"
      ],
      "middle": [
        "신봉중",
        "성복중",
        "홍천중"
      ],
      "high": [
        "신봉고",
        "용인홍천고"
      ]
    },
    "feeType": "B",
    "isNew": true,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5asZ0oVg"
  },
  {
    "slug": "gyeonggi-namyangju-toegye-won",
    "name": "퇴계원점",
    "fullName": "퇴계원점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "남양주시",
    "address": "경기 남양주시 퇴계원읍 퇴계원로 29  202호",
    "eduOffice": "퇴계원점와와학습코칭학원",
    "eduRegNo": "경기도구리남양주교육지원청 제4787호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "퇴계원초등학교",
        "도제원초등학교"
      ],
      "middle": [
        "퇴계원중학교",
        "진건중학교"
      ],
      "high": [
        "퇴계원고등학교",
        "진건고등학교"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/G7Vky0KK"
  },
  {
    "slug": "seoul-mapo-mapo",
    "name": "마포점",
    "fullName": "마포점",
    "brand": "wawa",
    "sido": "seoul",
    "sidoName": "서울",
    "sigungu": "마포구",
    "address": "서울특별시 마포구 염리동 독막로42길 7  173-3 2층",
    "eduOffice": "마포점와와학습코칭학원",
    "eduRegNo": "서울서부교육지원청 등록 제02201800007호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "염리초"
      ],
      "middle": [
        "서울여중",
        "동도중",
        "신수중",
        "숭문중"
      ],
      "high": [
        "서울여고",
        "숭문고",
        "광성고"
      ]
    },
    "feeType": "A",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/GbDL0t1F"
  },
  {
    "slug": "gyeonggi-yongin-yonk-inbaekhyeon-modu",
    "name": "용인백현점",
    "fullName": "용인백현점(모두)",
    "brand": "modu",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "용인시",
    "address": "경기 용인시 기흥구 동백7로 83  백현마을중앙프라자 제 2층 제 208호",
    "eduOffice": "용인백현점\n모두오름학습코칭학원",
    "eduRegNo": "경기도용인교육지원청 제5632호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ]
    },
    "targets": {
      "elem": [
        "동막초",
        "동백초",
        "용인백현초"
      ],
      "middle": [
        "동백중",
        "용인백현중"
      ],
      "high": [
        "동백고",
        "용인백현고"
      ]
    },
    "feeType": "B",
    "isNew": true,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/GFCEnwQM"
  },
  {
    "slug": "daegu-jung-daeguyeok-2hogwan",
    "name": "대구역점2호관",
    "fullName": "대구역점2호관",
    "brand": "wawa",
    "sido": "daegu",
    "sidoName": "대구",
    "sigungu": "중구",
    "address": "대구 중구 서성로 99  대구역센트럴자이 상가 203호",
    "eduOffice": "대구역점2호관\n와와학습코칭학원",
    "eduRegNo": "대구동부교육지원청 제 6950 호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "수창초",
        "종로초"
      ],
      "middle": [
        "계성중",
        "성명여중",
        "대구제일중",
        "사대부중"
      ],
      "high": [
        "사대부고",
        "경북여고",
        "신명고",
        "칠성고"
      ]
    },
    "feeType": "B",
    "isNew": true,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/GdTTThb4"
  },
  {
    "slug": "gyeonggi-paju-unjeong-jungang",
    "name": "운정중앙점",
    "fullName": "운정중앙점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "파주시",
    "address": "경기도 파주시 양지로 131, 운정SB타워 509호,510호",
    "eduOffice": "운정중앙점\n와와학습코칭학원",
    "eduRegNo": "파주교육지원청 제2139호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "초롱초"
      ],
      "middle": [
        "심학중"
      ],
      "high": [
        "심학고"
      ]
    },
    "feeType": "B",
    "isNew": true,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/FLeSDTL8"
  },
  {
    "slug": "chungbuk-chungju-chungju-yongsan",
    "name": "충주용산점",
    "fullName": "충주용산점",
    "brand": "wawa",
    "sido": "chungbuk",
    "sidoName": "충북",
    "sigungu": "충주시",
    "address": "충북 충주시 형설로 54-10,2층",
    "eduOffice": "충주용산점\n와와학습코칭학원",
    "eduRegNo": "충주교육지원청 제 1693호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "남산초",
        "용산초"
      ],
      "middle": [
        "예성여중",
        "미덕중"
      ],
      "high": [
        "충주여고",
        "예성여고",
        "충주고"
      ]
    },
    "feeType": "B",
    "isNew": true,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/531Tpw8X"
  },
  {
    "slug": "daegu-dalseo-jincheon-modu",
    "name": "진천점",
    "fullName": "진천점(모두)",
    "brand": "modu",
    "sido": "daegu",
    "sidoName": "대구",
    "sigungu": "달서구",
    "address": "대구광역시 달서구 조암남로 158,301호",
    "eduOffice": "진천점 모두오름학습코칭학원",
    "eduRegNo": "대구남부교육지원청 제 2025-53호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "한솔초",
        "한샘초"
      ],
      "middle": [
        "월서중",
        "조암중",
        "월암중"
      ],
      "high": [
        "영남고",
        "상원고",
        "대진고",
        "효성여고"
      ]
    },
    "feeType": "B",
    "isNew": true,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xAAXAKEp"
  },
  {
    "slug": "gyeonggi-namyangju-byeolnaejunk-ank-modu",
    "name": "별내중앙점",
    "fullName": "별내중앙점(모두)",
    "brand": "modu",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "남양주시",
    "address": "경기도 남양주시 별내3로 66,401호",
    "eduOffice": "별내중앙점 \n모두오름학습코칭학원",
    "eduRegNo": "경기도구리남양주교육지원청 제 5006 호",
    "subjects": {
      "korean": [],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "한별초"
      ],
      "middle": [
        "화접중",
        "한별중"
      ],
      "high": [
        "별내고"
      ]
    },
    "feeType": "B",
    "isNew": true,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xrCyrYPD"
  },
  {
    "slug": "seoul-yangcheon-mokdong",
    "name": "목동점",
    "fullName": "목동점",
    "brand": "wawa",
    "sido": "seoul",
    "sidoName": "서울",
    "sigungu": "양천구",
    "address": "서울 양천구 목동동로8길 23  메리트윈 3층 305",
    "eduOffice": "와와학습코칭학원",
    "eduRegNo": "강서양천교육지원청 등록 제 5353호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "신목초",
        "서정초"
      ],
      "middle": [
        "목일중",
        "신목중",
        "양강중",
        "금옥중"
      ],
      "high": [
        "양천고",
        "신목고",
        "한광고",
        "서울영상고"
      ]
    },
    "feeType": "A",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/xf50TFFC"
  },
  {
    "slug": "seoul-guro-sindorim",
    "name": "신도림점",
    "fullName": "신도림점",
    "brand": "wawa",
    "sido": "seoul",
    "sidoName": "서울",
    "sigungu": "구로구",
    "address": "서울특별시 구로구 신도림동 신도림로 20  397-2 해동빌딩 402호",
    "eduOffice": "와와학습코칭신도림학원",
    "eduRegNo": "서울남부교육지원청 등록 제 5525호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "신미림초"
      ],
      "middle": [
        "신도림중"
      ],
      "high": [
        "신도림고",
        "구현고"
      ]
    },
    "feeType": "A",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/xzxsI5KI"
  },
  {
    "slug": "seoul-dongdaemun-jegi",
    "name": "제기점",
    "fullName": "제기점",
    "brand": "wawa",
    "sido": "seoul",
    "sidoName": "서울",
    "sigungu": "동대문구",
    "address": "서울 동대문구 왕산로 61  302호",
    "eduOffice": "제기와와학습코칭학원",
    "eduRegNo": "서울동부교육지원청 등록 제 3066호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "용두초",
        "종암초",
        "기타사립초"
      ],
      "middle": [
        "대광중",
        "성일중"
      ],
      "high": [
        "대광고",
        "청량리고",
        "경희고"
      ]
    },
    "feeType": "A",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/5MVIlFQp"
  },
  {
    "slug": "seoul-seongbuk-jongam",
    "name": "종암점",
    "fullName": "종암점",
    "brand": "wawa",
    "sido": "seoul",
    "sidoName": "서울",
    "sigungu": "성북구",
    "address": "서울 성북구 종암로27길 13  도원프라자 501",
    "eduOffice": "종암와와학습코칭학원",
    "eduRegNo": "성북강북교육지원청 등록 제2019-56호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": []
    },
    "targets": {
      "elem": [],
      "middle": [
        "종암중",
        "사대부중",
        "개운중"
      ],
      "high": [
        "사대부고",
        "용문고"
      ]
    },
    "feeType": "A",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/5PVvqPwK"
  },
  {
    "slug": "seoul-gangdong-myeonk-il",
    "name": "명일점",
    "fullName": "명일점",
    "brand": "wawa",
    "sido": "seoul",
    "sidoName": "서울",
    "sigungu": "강동구",
    "address": "서울 강동구 양재대로 1606  3층",
    "eduOffice": "명일점와와학습코칭학원",
    "eduRegNo": "서울강동교육지원청 등록 제 7641호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [],
      "middle": [
        "천호중",
        "배재중",
        "명일중"
      ],
      "high": [
        "명일여고",
        "강동고",
        "광문고"
      ]
    },
    "feeType": "A",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/xX7g4013"
  },
  {
    "slug": "seoul-eunpyeong-gusan",
    "name": "구산점",
    "fullName": "구산점",
    "brand": "wawa",
    "sido": "seoul",
    "sidoName": "서울",
    "sigungu": "은평구",
    "address": "서울특별시 은평구 역촌동 연서로 130  4층",
    "eduOffice": "구산점와와학습코칭학원",
    "eduRegNo": "서울서부교육지원청 등록 제02201700143호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "english": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [],
      "middle": [
        "구산중",
        "은평중"
      ],
      "high": [
        "예일여중고",
        "선일여중고"
      ]
    },
    "feeType": "A",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/5r9SH1hf"
  },
  {
    "slug": "seoul-gangseo-naebalsan",
    "name": "내발산점",
    "fullName": "내발산점",
    "brand": "wawa",
    "sido": "seoul",
    "sidoName": "서울",
    "sigungu": "강서구",
    "address": "서울 강서구 마곡중앙4로 74  이웰메디파크 제4층 401,402호",
    "eduOffice": "내발산점와와학습코칭학원",
    "eduRegNo": "강서양천교육지원청 등록 제 5444호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "science": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ]
    },
    "targets": {
      "elem": [
        "공진초등학교",
        "가곡초등학교"
      ],
      "middle": [
        "등명중학교",
        "마곡하늬중"
      ],
      "high": [
        "수명고"
      ]
    },
    "feeType": "A",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/xIe5uK1h"
  },
  {
    "slug": "seoul-geumcheon-geumcheon",
    "name": "금천점",
    "fullName": "금천점",
    "brand": "wawa",
    "sido": "seoul",
    "sidoName": "서울",
    "sigungu": "금천구",
    "address": "서울 금천구 금하로 763  벽산아파트 제중심상가동 3층 306-2,307,308",
    "eduOffice": "금천점와와학습코칭학원",
    "eduRegNo": "서울남부교육지원청 등록 제 5726호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ]
    },
    "targets": {
      "elem": [
        "탑동초"
      ],
      "middle": [
        "동일중",
        "세일중"
      ],
      "high": [
        "매그넷고",
        "동일여고",
        "금천고",
        "문일고"
      ]
    },
    "feeType": "A",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/x8taMmjI"
  },
  {
    "slug": "gyeonggi-seongnam-wirye",
    "name": "위례점",
    "fullName": "위례점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "성남시",
    "address": "경기 성남시 수정구 위례광장로 320  315호",
    "eduOffice": "위례와와학습코칭학원",
    "eduRegNo": "성남교육지원청 등록 제6054호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "중1",
        "중2",
        "중3"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "고운초",
        "위례중앙초",
        "송례초"
      ],
      "middle": [
        "위례한빛중",
        "위례중앙중",
        "송례중"
      ],
      "high": [
        "위례한빛고",
        "복정고",
        "문현고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/Gdy0W1dl"
  },
  {
    "slug": "gyeonggi-yongin-sankhyeon",
    "name": "상현점",
    "fullName": "상현점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "용인시",
    "address": "경기도 용인시 수지구 상현동 만현로 120  4층 410호",
    "eduOffice": "상현점와와학습코칭학원",
    "eduRegNo": "용인교육지원청 등록 제4241-1호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "english": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "솔개초",
        "상현초",
        "이현초"
      ],
      "middle": [
        "서원중",
        "소현중",
        "이현중",
        "성복중"
      ],
      "high": [
        "상현고",
        "서원고",
        "풍덕고",
        "이의고",
        "홍천고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xZVw9HR8"
  },
  {
    "slug": "gyeonggi-gimpo-sa-u",
    "name": "사우점",
    "fullName": "사우점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "김포시",
    "address": "경기 김포시 사우중로 77  삼정사이버프라자 304",
    "eduOffice": "사우점와와학습코칭학원",
    "eduRegNo": "김포교육지원청 등록 제1769호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ]
    },
    "targets": {
      "elem": [
        "금파초",
        "향산초"
      ],
      "middle": [
        "금파중",
        "김포중"
      ],
      "high": [
        "사우고",
        "풍무고",
        "고촌고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5k7T37dy"
  },
  {
    "slug": "gyeonggi-yongin-suji-wplus",
    "name": "수지점",
    "fullName": "수지점(W+)",
    "brand": "wplus",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "용인시",
    "address": "경기 용인시 수지구 진산로 106  훼미리빌딩 512호,513호,514호",
    "eduOffice": "수지점더블유플러스학원",
    "eduRegNo": "용인교육지원청 등록 제5126호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [],
      "middle": [
        "이현중",
        "수지중",
        "정평중"
      ],
      "high": [
        "성복고",
        "풍덕고",
        "수지고",
        "죽전고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xKE8JiiR"
  },
  {
    "slug": "sejong-saerom",
    "name": "새롬점",
    "fullName": "새롬점",
    "brand": "wawa",
    "sido": "sejong",
    "sidoName": "세종",
    "sigungu": null,
    "address": "세종특별자치시 새롬중앙로 62-15  해피라움W 305호",
    "eduOffice": "새롬와와학습코칭학원",
    "eduRegNo": "세종특별자치시교육청 등록 제1211호",
    "subjects": {
      "korean": [
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "새뜸초",
        "새롬초"
      ],
      "middle": [
        "새뜸중",
        "새롬중"
      ],
      "high": [
        "새롬고",
        "다정고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/GI3E75J7"
  },
  {
    "slug": "ulsan-nam-samsan",
    "name": "삼산점",
    "fullName": "삼산점",
    "brand": "wawa",
    "sido": "ulsan",
    "sidoName": "울산",
    "sigungu": "남구",
    "address": "울산광역시 남구 삼산동 돋질로 300  4층",
    "eduOffice": "삼산점와와학습코칭학원",
    "eduRegNo": "울산강남교육지원청 등록 제6001호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [],
      "middle": [],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5pwPGJOX"
  },
  {
    "slug": "gyeongnam-changwon-sanknam",
    "name": "상남점",
    "fullName": "상남점",
    "brand": "wawa",
    "sido": "gyeongnam",
    "sidoName": "경남",
    "sigungu": "창원시",
    "address": "경남 창원시 성산구 마디미동로 25  비전빌딩 302호",
    "eduOffice": "상남점와와학습코칭학원",
    "eduRegNo": "창원교육지원청 등록 제1020호",
    "subjects": {
      "korean": [],
      "english": [
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "math": [
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "외동초"
      ],
      "middle": [
        "상남중",
        "토월중",
        "웅남중"
      ],
      "high": [
        "창원중앙여고",
        "남고",
        "신월고",
        "토월고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/FxFHLRV1"
  },
  {
    "slug": "gyeonggi-hwaseong-hyanknam",
    "name": "향남점",
    "fullName": "향남점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "화성시",
    "address": "경기 화성시 향남읍 발안로 103-6  J&H빌딩 402호",
    "eduOffice": "향남점와와학습코칭학원",
    "eduRegNo": "화성오산교육지원청 등록 제3567호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "한울초",
        "도이초"
      ],
      "middle": [
        "발안중",
        "향남중",
        "하길중",
        "화성중"
      ],
      "high": [
        "향남고",
        "향일고",
        "하길고",
        "발안바이오고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/Gipd9LRS"
  },
  {
    "slug": "busan-dongnae-dongnae",
    "name": "동래점",
    "fullName": "동래점",
    "brand": "wawa",
    "sido": "busan",
    "sidoName": "부산",
    "sigungu": "동래구",
    "address": "부산광역시 동래구 온천동 충렬대로 129-1  한야빌딩 3",
    "eduOffice": "동래점와와학습코칭학원",
    "eduRegNo": "동래교육지원청 등록 제4888호",
    "subjects": {
      "korean": [
        "중1",
        "중2",
        "중3"
      ],
      "english": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "내산초"
      ],
      "middle": [
        "내성중",
        "유락여중",
        "동래중",
        "동해중"
      ],
      "high": [
        "내성고",
        "중앙여고",
        "동래고",
        "부산전자고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/Gq8lpMVE"
  },
  {
    "slug": "gyeonggi-siheung-jankgok",
    "name": "장곡점",
    "fullName": "장곡점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "시흥시",
    "address": "경기 시흥시 진말로 7  중앙프라자 3층 305호, 306호",
    "eduOffice": "와와학습코칭학원",
    "eduRegNo": "시흥교육지원청 등록 제 시871호",
    "subjects": {
      "korean": [],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "science": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "장곡초",
        "진말초"
      ],
      "middle": [
        "응곡중",
        "장곡중",
        "가온중"
      ],
      "high": [
        "장곡고",
        "능곡고",
        "시흥고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5huv3xlQ"
  },
  {
    "slug": "gyeonggi-icheon-galsan",
    "name": "갈산점",
    "fullName": "갈산점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "이천시",
    "address": "경기도 이천시 갈산동 영창로 314  629-2외 2필지 주공프라자 504호",
    "eduOffice": "와와학습코칭갈산학원",
    "eduRegNo": "이천교육지원청 등록 제1127호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "안흥초",
        "설봉초"
      ],
      "middle": [
        "이천중",
        "설봉중",
        "증포중"
      ],
      "high": [
        "제일고",
        "이현고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xtgfW9LM"
  },
  {
    "slug": "gyeonggi-paju-geumleunk",
    "name": "금릉점",
    "fullName": "금릉점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "파주시",
    "address": "경기 파주시 금빛로 24-27  제일메디컬 502호",
    "eduOffice": "와와학습코칭학원(금릉점)",
    "eduRegNo": "파주교육지원청 등록 제1594호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "고1"
      ],
      "social": [
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "금릉초",
        "금화초",
        "새금초",
        "금촌초"
      ],
      "middle": [
        "금릉중",
        "금촌중",
        "문산중"
      ],
      "high": [
        "금촌고",
        "문산제일고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xQebOAa7"
  },
  {
    "slug": "gyeonggi-bucheon-bandal",
    "name": "반달점",
    "fullName": "반달점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "부천시",
    "address": "경기 부천시 원미구 상일로 69  반달마을 제상가동 제 3층 제 304호",
    "eduOffice": "반달점와와학습코칭보습학원",
    "eduRegNo": "부천교육지원청 등록 제6730호",
    "subjects": {
      "korean": [],
      "english": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "부인초",
        "상도초"
      ],
      "middle": [
        "부인중",
        "상동중"
      ],
      "high": [
        "상원고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/FY3iAGwC"
  },
  {
    "slug": "daejeon-yuseong-kwanpyeonk",
    "name": "관평점",
    "fullName": "관평점",
    "brand": "wawa",
    "sido": "daejeon",
    "sidoName": "대전",
    "sigungu": "유성구",
    "address": "대전 유성구 관평2로 46  밸리타운 501",
    "eduOffice": "관평점와와학습코칭학원",
    "eduRegNo": "대전서부교육지원청 등록 제 서4761호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "중2",
        "중3"
      ],
      "english": [
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "동화초",
        "관평초"
      ],
      "middle": [
        "동화중",
        "관평중"
      ],
      "high": [
        "중일고",
        "용산고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xKE8QQyp"
  },
  {
    "slug": "chungbuk-cheongju-gaesin",
    "name": "개신점",
    "fullName": "개신점",
    "brand": "wawa",
    "sido": "chungbuk",
    "sidoName": "충북",
    "sigungu": "청주시",
    "address": "충청북도 청주시 서원구 개신동 경신로 31-1  402호",
    "eduOffice": "와와학습코칭센터학원",
    "eduRegNo": "청주교육지원청 등록 제4620호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [],
      "social": [
        "초6"
      ]
    },
    "targets": {
      "elem": [
        "개신초",
        "서경초",
        "가경초",
        "죽림초",
        "서원초"
      ],
      "middle": [
        "가경중",
        "서경중",
        "경덕중",
        "사대부중",
        "성화중",
        "서원중"
      ],
      "high": [
        "서원고",
        "사대부고",
        "청주고",
        "중앙여고",
        "운호고",
        "봉명고",
        "흥덕고",
        "세광고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xiqbvXkG"
  },
  {
    "slug": "gyeonggi-bucheon-sangdong",
    "name": "상동점",
    "fullName": "상동점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "부천시",
    "address": "경기 부천시 원미구 송내대로265번길 67  월드컵타운 305호",
    "eduOffice": "와와학습코칭상동보습학원",
    "eduRegNo": "부천교육지원청 등록 제5950호",
    "subjects": {
      "korean": [
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "english": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "석천초  상인초"
      ],
      "middle": [
        "석천중 상동중 상일중 부인중"
      ],
      "high": [
        "상동고 상일고 상원고 중흥고 중원고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/GTnNgSt3"
  },
  {
    "slug": "incheon-namdong-nonhyeon",
    "name": "논현점",
    "fullName": "논현점",
    "brand": "wawa",
    "sido": "incheon",
    "sidoName": "인천",
    "sigungu": "남동구",
    "address": "인천 남동구 청능대로 559  2층",
    "eduOffice": "와와학습코칭인천논현학원",
    "eduRegNo": "인천동부교육지원청 등록 제3283호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "동방초",
        "원동초"
      ],
      "middle": [
        "고잔중"
      ],
      "high": [
        "고잔고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5VmVnLjK"
  },
  {
    "slug": "gyeonggi-gwangmyeong-kwankmyeonk",
    "name": "광명점",
    "fullName": "광명점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "광명시",
    "address": "경기 광명시 광명로 823  광명현대타운 7층 701호",
    "eduOffice": "광명점와와학습코칭학원",
    "eduRegNo": "광명교육지원청 등록 제1964호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [],
      "middle": [
        "광남중",
        "광문중"
      ],
      "high": [
        "광문고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xLWV1c3f"
  },
  {
    "slug": "gyeongbuk-gyeongsan-jeonkpyeonk",
    "name": "정평점",
    "fullName": "정평점",
    "brand": "wawa",
    "sido": "gyeongbuk",
    "sidoName": "경북",
    "sigungu": "경산시",
    "address": "경북 경산시 대학로 23  월드스퀘어 302호",
    "eduOffice": "와와학습코칭학원",
    "eduRegNo": "경산교육지원청 등록 제941호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "사월초"
      ],
      "middle": [
        "경산중",
        "사동중",
        "경산여중"
      ],
      "high": [
        "경산고",
        "사동고",
        "경산여고",
        "문경고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5iTFzegF"
  },
  {
    "slug": "gyeonggi-hwaseong-yeonkcheon",
    "name": "영천점",
    "fullName": "영천점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "화성시",
    "address": "경기 화성시 동탄순환대로 704  성산에이타워 제4층 제 403호",
    "eduOffice": "영천점와와학습코칭학원",
    "eduRegNo": "화성오산교육지원청 등록 제2851호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "한백초",
        "다원초"
      ],
      "middle": [
        "한백중",
        "다원중"
      ],
      "high": [
        "한백고",
        "이산고",
        "창의고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5pwPNhCO"
  },
  {
    "slug": "incheon-yeonsu-songdo",
    "name": "송도점",
    "fullName": "송도점",
    "brand": "wawa",
    "sido": "incheon",
    "sidoName": "인천",
    "sigungu": "연수구",
    "address": "인천 연수구 해돋이로 165  차오름프라자 302호",
    "eduOffice": "WAWA와와학습코칭인천송도점학원",
    "eduRegNo": "인천동부교육지원청 등록 제3284호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ]
    },
    "targets": {
      "elem": [
        "신정초"
      ],
      "middle": [
        "신정중"
      ],
      "high": [
        "연송고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 3,
    "naverMapUrl": "https://naver.me/IDFXctIN"
  },
  {
    "slug": "daejeon-seo-dunsan",
    "name": "둔산점",
    "fullName": "둔산점",
    "brand": "wawa",
    "sido": "daejeon",
    "sidoName": "대전",
    "sigungu": "서구",
    "address": "대전광역시 서구 둔산동 둔산로 142  신화빌딩 401호",
    "eduOffice": "와와학습코칭센터학원",
    "eduRegNo": "대전서부교육지원청 등록 제 서4002호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [],
      "science": [],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ]
    },
    "targets": {
      "elem": [],
      "middle": [],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/GalEMR7z"
  },
  {
    "slug": "daejeon-seo-gwanjeo",
    "name": "관저점",
    "fullName": "관저점",
    "brand": "wawa",
    "sido": "daejeon",
    "sidoName": "대전",
    "sigungu": "서구",
    "address": "대전 서구 구봉로 133  1542번지 205호",
    "eduOffice": "관저점와와학습코칭학원",
    "eduRegNo": "대전서부교육지원청 등록 제 서4277호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ]
    },
    "targets": {
      "elem": [],
      "middle": [],
      "high": [
        "서일고",
        "서일여고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5qDWRXXV"
  },
  {
    "slug": "jeonbuk-wanju-jeonjuhyeoksin",
    "name": "전주혁신점",
    "fullName": "전주혁신점",
    "brand": "wawa",
    "sido": "jeonbuk",
    "sidoName": "전북",
    "sigungu": "완주군",
    "address": "전북특별자치도 완주군 이서면 출판로 42  제 4층 제 402호",
    "eduOffice": "전주혁신점와와학습코칭학원",
    "eduRegNo": "완주교육지원청 제 454호",
    "subjects": {
      "korean": [],
      "english": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ]
    },
    "targets": {
      "elem": [],
      "middle": [
        "양현중",
        "삼우중",
        "만성중"
      ],
      "high": [
        "양현고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/G8sDmuMF"
  },
  {
    "slug": "gyeonggi-goyang-ju-yeop",
    "name": "주엽점",
    "fullName": "주엽점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "고양시",
    "address": "경기도 고양시 일산서구 주엽동 주화로 88  502호",
    "eduOffice": "주엽점와와학습코칭학원",
    "eduRegNo": "고양교육지원청 등록 제5403호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "강선초"
      ],
      "middle": [],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/56RnITj5"
  },
  {
    "slug": "gyeonggi-goyang-ju-yeop2ho",
    "name": "주엽2호점",
    "fullName": "주엽2호점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "고양시",
    "address": "경기 고양시 일산서구 중앙로 1413  동영빌딩 10층 1003",
    "eduOffice": "주엽2호와와학습코칭학원",
    "eduRegNo": "고양교육지원청 등록 제5826호",
    "subjects": {
      "korean": [],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "강선초"
      ],
      "middle": [],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/x2jDPSvt"
  },
  {
    "slug": "gyeonggi-namyangju-dasan",
    "name": "다산점",
    "fullName": "다산점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "남양주시",
    "address": "경기 남양주시 다산중앙로146번길 12-14  다산메트로타워 604호",
    "eduOffice": "다산점와와학습코칭학원",
    "eduRegNo": "구리남양주교육지원청 등록 제4125호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "english": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [],
      "science": [],
      "social": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ]
    },
    "targets": {
      "elem": [
        "다산초"
      ],
      "middle": [
        "다산중"
      ],
      "high": [
        "다산고",
        "도농고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5tJ2jTO0"
  },
  {
    "slug": "gyeonggi-anyang-bisan",
    "name": "비산점",
    "fullName": "비산점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "안양시",
    "address": "경기 안양시 동안구 관악대로 91  대림타워 1102호",
    "eduOffice": "와와학습코칭비산센터학원",
    "eduRegNo": "안양과천교육지원청 등록 제 2017-063호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "중앙초"
      ],
      "middle": [
        "비산중",
        "부흥중",
        "부림중",
        "신성중"
      ],
      "high": [
        "양명여고",
        "양명고",
        "관양고",
        "성문고",
        "동안고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xq3zfFYX"
  },
  {
    "slug": "chungnam-cheonan-dujeonk",
    "name": "두정점",
    "fullName": "두정점",
    "brand": "wawa",
    "sido": "chungnam",
    "sidoName": "충남",
    "sigungu": "천안시",
    "address": "충청남도 천안시 서북구 두정동 봉정로 382  성광빌딩 3층",
    "eduOffice": "와와학습코칭두정점학원",
    "eduRegNo": "천안교육지원청 등록 제3444호",
    "subjects": {
      "korean": [],
      "english": [
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "두정초",
        "신대초"
      ],
      "middle": [
        "두정중",
        "성성중",
        "성정중"
      ],
      "high": [
        "오성고",
        "두정고",
        "신당고",
        "업성고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/FjbQoQuy"
  },
  {
    "slug": "gangwon-wonju-wonjusicheonk",
    "name": "원주시청점",
    "fullName": "원주시청점",
    "brand": "wawa",
    "sido": "gangwon",
    "sidoName": "강원",
    "sigungu": "원주시",
    "address": "강원특별자치도 원주시 시청로 22  2층 201호",
    "eduOffice": "와와학습코칭학원원주시청점",
    "eduRegNo": "원주교육지원청 등록 제2605호",
    "subjects": {
      "korean": [],
      "english": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "만대초",
        "무실초"
      ],
      "middle": [
        "대성중",
        "평원중",
        "원주여중",
        "남원주중"
      ],
      "high": [
        "대성고",
        "육민관고",
        "북원여고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/x3jn5v9H"
  },
  {
    "slug": "gyeonggi-osan-osandae-yeok",
    "name": "오산대역점",
    "fullName": "오산대역점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "오산시",
    "address": "경기 오산시 내삼미로 85  우정프라자 2층",
    "eduOffice": "오산대역점와와학습코칭학원",
    "eduRegNo": "화성오산교육지원청 등록 제3851호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "세미초",
        "화성초",
        "수청초"
      ],
      "middle": [
        "매홀중",
        "세마중",
        "문시중",
        "대호중"
      ],
      "high": [
        "매홀고",
        "세교고",
        "오산고",
        "운천고",
        "운암고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/GZZmAEei"
  },
  {
    "slug": "gwangju-gwangsan-sinchank",
    "name": "신창점",
    "fullName": "신창점",
    "brand": "wawa",
    "sido": "gwangju",
    "sidoName": "광주",
    "sigungu": "광산구",
    "address": "광주 광산구 신창로 129  상민빌딩 302호",
    "eduOffice": "와와학습코칭신창학원",
    "eduRegNo": "광주서부교육지원청 등록 제6884호",
    "subjects": {
      "korean": [],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "신창초",
        "수문초"
      ],
      "middle": [
        "진흥중",
        "신창중",
        "진흥중"
      ],
      "high": [
        "숭덕고",
        "성덕고",
        "운남고",
        "장덕고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/Gn0DGkwq"
  },
  {
    "slug": "daegu-buk-chilgok",
    "name": "칠곡점",
    "fullName": "칠곡점",
    "brand": "wawa",
    "sido": "daegu",
    "sidoName": "대구",
    "sigungu": "북구",
    "address": "대구 북구 구암로 149  6층",
    "eduOffice": "칠곡점와와학습코칭학원",
    "eduRegNo": "대구서부교육지원청 등록 제2020-4298호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "관음초"
      ],
      "middle": [
        "구암중",
        "관천중",
        "운암중"
      ],
      "high": [
        "구암고",
        "함지고",
        "영송여고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/GL80KgGo"
  },
  {
    "slug": "gyeonggi-paju-unjeong",
    "name": "운정점",
    "fullName": "운정점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "파주시",
    "address": "경기 파주시 동패동  1758-1 삼융프라자2 302호",
    "eduOffice": "운정점와와학습코칭학원",
    "eduRegNo": "파주교육지원청 등록 제1424호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "한가람초"
      ],
      "middle": [],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/GSDeiY9C"
  },
  {
    "slug": "gyeonggi-namyangju-dasanjigeum",
    "name": "다산지금점",
    "fullName": "다산지금점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "남양주시",
    "address": "경기 남양주시 다산지금로 139  3층 308호, 309호",
    "eduOffice": "다산지금점와와학습코칭학원",
    "eduRegNo": "구리남양주교육지원청 등록 제4349-1호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "다산한강초"
      ],
      "middle": [
        "다산한강중"
      ],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xIeKZ7Ty"
  },
  {
    "slug": "daegu-suseong-suseonkmanchon",
    "name": "수성만촌점",
    "fullName": "수성만촌점",
    "brand": "wawa",
    "sido": "daegu",
    "sidoName": "대구",
    "sigungu": "수성구",
    "address": "대구 수성구 화랑로8길 11-11  7층",
    "eduOffice": "수성만촌점와와학습코칭학원",
    "eduRegNo": "대구동부교육지원청 등록 제6028호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "english": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "math": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "science": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ]
    },
    "targets": {
      "elem": [],
      "middle": [
        "동중"
      ],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5JpmHnX8"
  },
  {
    "slug": "gyeonggi-suwon-cheoncheon",
    "name": "천천점",
    "fullName": "천천점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "수원시",
    "address": "경기 수원시 장안구 덕영대로535번길 34  천천그린프라자 제5층 제 502호",
    "eduOffice": "천천와와학습코칭학원",
    "eduRegNo": "수원교육지원청 등록 제6090-1호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "천천초"
      ],
      "middle": [
        "천천중",
        "대평중"
      ],
      "high": [
        "천천고",
        "영생고",
        "대평고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/GtUs8ViE"
  },
  {
    "slug": "chungbuk-cheongju-sannam",
    "name": "산남점",
    "fullName": "산남점",
    "brand": "wawa",
    "sido": "chungbuk",
    "sidoName": "충북",
    "sigungu": "청주시",
    "address": "충청북도 청주시 서원구 산남동 산남로 18  이화빌딩 5층",
    "eduOffice": "산남점와와학습코칭학원",
    "eduRegNo": "청주교육지원청 등록 제4696호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ]
    },
    "targets": {
      "elem": [
        "샛별초"
      ],
      "middle": [
        "수곡중 산남중"
      ],
      "high": [
        "충북고 운호고 충북여고 산남고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/FY3iUhIi"
  },
  {
    "slug": "gangwon-chuncheon-seoksa",
    "name": "석사점",
    "fullName": "석사점",
    "brand": "wawa",
    "sido": "gangwon",
    "sidoName": "강원",
    "sigungu": "춘천시",
    "address": "강원특별자치도 춘천시 지석로 85  703호",
    "eduOffice": "석사2호점와와학습코칭학원",
    "eduRegNo": "춘천교육지원청 등록 제1593호",
    "subjects": {
      "korean": [],
      "english": [],
      "math": [],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "성림초",
        "성원초",
        "봄내초"
      ],
      "middle": [
        "대룡중",
        "우석중",
        "남춘천중",
        "남춘천여중",
        "춘천중",
        "강원중"
      ],
      "high": [
        "강원고",
        "사대부고",
        "춘고",
        "춘여고",
        "봉의고",
        "성수여고",
        "유봉여고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/FY3iUp8u"
  },
  {
    "slug": "gangwon-chuncheon-hupyeonk",
    "name": "후평점",
    "fullName": "후평점",
    "brand": "wawa",
    "sido": "gangwon",
    "sidoName": "강원",
    "sigungu": "춘천시",
    "address": "강원특별자치도 춘천시 춘천로 316  춘천더샵아파트상가2동 304.305호",
    "eduOffice": "후평점와와학습코칭학원",
    "eduRegNo": "춘천교육지원청 등록 제1741호",
    "subjects": {
      "korean": [],
      "english": [
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [],
      "middle": [
        "후평중",
        "봉의중",
        "강원중"
      ],
      "high": [
        "강원고",
        "춘천여고",
        "봉의고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/GfCNPvXL"
  },
  {
    "slug": "gyeongbuk-gumi-okgye",
    "name": "옥계점",
    "fullName": "옥계점",
    "brand": "wawa",
    "sido": "gyeongbuk",
    "sidoName": "경북",
    "sigungu": "구미시",
    "address": "경북 구미시 산호대로31길 16  2층",
    "eduOffice": "옥계점와와학습코칭학원",
    "eduRegNo": "구미교육지원청 등록 제2536호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "동부초"
      ],
      "middle": [
        "해마루중",
        "옥계중"
      ],
      "high": [
        "산동고",
        "오상고",
        "금오여고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/IGJIu6hB"
  },
  {
    "slug": "chungnam-dangjin-dankjinjunk-ank",
    "name": "당진중앙점",
    "fullName": "당진중앙점",
    "brand": "wawa",
    "sido": "chungnam",
    "sidoName": "충남",
    "sigungu": "당진시",
    "address": "충남 당진시 당진중앙2로 211-5  효명프라자 404호",
    "eduOffice": "당진중앙와와학습코칭학원",
    "eduRegNo": "당진교육지원청 등록 제617호",
    "subjects": {
      "korean": [
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "english": [
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "math": [
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": [
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ]
    },
    "targets": {
      "elem": [
        "탑동초"
      ],
      "middle": [
        "호서중",
        "당진중"
      ],
      "high": [
        "호서고",
        "당진고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/GlJ8j76q"
  },
  {
    "slug": "gyeonggi-hanam-misa",
    "name": "미사점",
    "fullName": "미사점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "하남시",
    "address": "경기 하남시 미사강변대로 212  미사센트럴프라자 309",
    "eduOffice": "미사점와와학습코칭학원",
    "eduRegNo": "광주하남교육지원청 등록 제1913호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": []
    },
    "targets": {
      "elem": [],
      "middle": [],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/GV2dS2Z6"
  },
  {
    "slug": "gyeonggi-suwon-yeongtong",
    "name": "영통점",
    "fullName": "영통점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "수원시",
    "address": "경기도 수원시 영통구 영통동 봉영로 1623  드림피아빌딩 301호, 302호 1/2",
    "eduOffice": "와와학습코칭학원",
    "eduRegNo": "수원교육지원청 등록 제6117호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "영덕초"
      ],
      "middle": [
        "흥덕중",
        "서천중"
      ],
      "high": [
        "영덕고",
        "청명고",
        "태장고",
        "흥덕고",
        "서천고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/Gn0DUWom"
  },
  {
    "slug": "gyeonggi-suwon-mankpo",
    "name": "망포점",
    "fullName": "망포점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "수원시",
    "address": "경기도 수원시 영통구 망포동 영통로 127  센터프라자 401호",
    "eduOffice": "망포와와학습코칭학원",
    "eduRegNo": "수원교육지원청 등록 제6338호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "잠원초",
        "망포초",
        "대선초"
      ],
      "middle": [
        "영동중",
        "잠원중",
        "망포중",
        "동학중"
      ],
      "high": [
        "태장고",
        "망포고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xs3KXlte"
  },
  {
    "slug": "gangwon-gangneung-gankleunkgyodonk",
    "name": "강릉교동점",
    "fullName": "강릉교동점",
    "brand": "wawa",
    "sido": "gangwon",
    "sidoName": "강원",
    "sigungu": "강릉시",
    "address": "강원특별자치도 강릉시 정원로 44  202호",
    "eduOffice": "와와학습코칭학원",
    "eduRegNo": "강릉교육지원청 등록 제1386호",
    "subjects": {
      "korean": [],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "율곡초",
        "경포초"
      ],
      "middle": [
        "관동중",
        "율곡중",
        "해람중",
        "솔올중",
        "경포중"
      ],
      "high": [
        "강여고",
        "강일여고",
        "명륜고",
        "제일고",
        "강릉고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5duYpL9u"
  },
  {
    "slug": "gyeonggi-suwon-seosu-won",
    "name": "서수원점",
    "fullName": "서수원점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "수원시",
    "address": "경기 수원시 권선구 호매실로104번길 90  JD타워 205호",
    "eduOffice": "서수원와와학습코칭학원",
    "eduRegNo": "수원교육지원청 등록 제6949호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ]
    },
    "targets": {
      "elem": [
        "능실초",
        "금호초"
      ],
      "middle": [
        "오현초호매실중",
        "능실중",
        "영신중",
        "고색중"
      ],
      "high": [
        "호매실고",
        "영신여고",
        "고색고",
        "율천고",
        "동우여고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5T48w5B0"
  },
  {
    "slug": "gyeonggi-goyang-wondank",
    "name": "원당점",
    "fullName": "원당점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "고양시",
    "address": "경기 고양시 덕양구 고양대로1384번길 7-5  서강프라자 502호",
    "eduOffice": "원당점와와학습코칭학원",
    "eduRegNo": "고양교육지원청 등록 제5951호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ]
    },
    "targets": {
      "elem": [
        "성라초 성사초"
      ],
      "middle": [
        "화수중 성사중 원당중"
      ],
      "high": [
        "성사고 화수고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xa5qJOH1"
  },
  {
    "slug": "incheon-yeonsu-songdo-wplus",
    "name": "송도점",
    "fullName": "송도점(W+)",
    "brand": "wplus",
    "sido": "incheon",
    "sidoName": "인천",
    "sigungu": "연수구",
    "address": "인천 연수구 해돋이로 160-6  꿈에계단 702호 일부",
    "eduOffice": "송도점더블유플러스학원",
    "eduRegNo": "인천동부교육지원청 등록 제3518호",
    "subjects": {
      "korean": [],
      "english": [],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "신정초"
      ],
      "middle": [
        "신정중"
      ],
      "high": [
        "연송고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 3,
    "naverMapUrl": "https://naver.me/x8taM9Xp"
  },
  {
    "slug": "gyeonggi-gimpo-un-yank",
    "name": "운양점",
    "fullName": "운양점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "김포시",
    "address": "경기 김포시 김포한강11로 288-37  헤리움리버테라스 205호",
    "eduOffice": "운양점와와학습코칭학원",
    "eduRegNo": "김포교육지원청 등록 제1913호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "english": [],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [],
      "social": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ]
    },
    "targets": {
      "elem": [
        "하늘빛초",
        "청수초"
      ],
      "middle": [
        "하늘빛중",
        "운양중",
        "푸른솔중"
      ],
      "high": [
        "제일고",
        "운양고",
        "운유고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xoHPRubz"
  },
  {
    "slug": "daejeon-seo-doan",
    "name": "도안점",
    "fullName": "도안점",
    "brand": "wawa",
    "sido": "daejeon",
    "sidoName": "대전",
    "sigungu": "서구",
    "address": "대전 서구 동서대로 692  에프엠프라임 1차 501호",
    "eduOffice": "도안점와와학습코칭학원",
    "eduRegNo": "대전서부교육지원청 등록 제 서4790호",
    "subjects": {
      "korean": [],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "흥도초"
      ],
      "middle": [
        "유성중",
        "봉명중",
        "도안중"
      ],
      "high": [
        "유성고",
        "도안고",
        "서대전여고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5GpADHOw"
  },
  {
    "slug": "gyeonggi-siheung-siheunkdae-ya",
    "name": "시흥대야점",
    "fullName": "시흥대야점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "시흥시",
    "address": "경기 시흥시 은행로167번길 7  크리스탈 빌딩 503호,504호",
    "eduOffice": "시흥대야점와와학습코칭학원",
    "eduRegNo": "시흥교육지원청 등록 제 시1277호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "은계초",
        "은행초"
      ],
      "middle": [
        "은행중",
        "은계중"
      ],
      "high": [
        "은행고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xSFiQlqs"
  },
  {
    "slug": "daejeon-seo-dunsan-wplus",
    "name": "둔산점",
    "fullName": "둔산점(W+)",
    "brand": "wplus",
    "sido": "daejeon",
    "sidoName": "대전",
    "sigungu": "서구",
    "address": "대전 서구 둔산로 130  803호",
    "eduOffice": "둔산점더블유플러스학원",
    "eduRegNo": "대전서부교육지원청 등록 제 서4833호",
    "subjects": {
      "korean": [],
      "english": [],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": []
    },
    "targets": {
      "elem": [],
      "middle": [],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/x2jDeALU"
  },
  {
    "slug": "busan-haeundae-ban-yeo",
    "name": "반여점",
    "fullName": "반여점",
    "brand": "wawa",
    "sido": "busan",
    "sidoName": "부산",
    "sigungu": "해운대구",
    "address": "부산 해운대구 반여로 102  경성빌딩 501호",
    "eduOffice": "반여점와와학습코칭학원",
    "eduRegNo": "해운대교육지원청 등록 제3955호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "중1",
        "중2",
        "중3"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "인지초",
        "장산초",
        "무정초"
      ],
      "middle": [
        "장산중",
        "인지중"
      ],
      "high": [
        "반여고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/GZZmnNdq"
  },
  {
    "slug": "busan-buk-hwamyeonk",
    "name": "화명점",
    "fullName": "화명점",
    "brand": "wawa",
    "sido": "busan",
    "sidoName": "부산",
    "sigungu": "북구",
    "address": "부산 북구 금곡대로285번길 19  리버사이드빌딩 504호",
    "eduOffice": "화명점와와학습코칭학원",
    "eduRegNo": "부산북부교육지원청 등록 제2830호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "중1",
        "중2",
        "중3"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "와석초",
        "학사초",
        "용수초"
      ],
      "middle": [
        "명진중",
        "화명중",
        "용수중",
        "화신중"
      ],
      "high": [
        "화명고",
        "성동고",
        "낙동고",
        "금명여고",
        "금곡고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5k7TNr0V"
  },
  {
    "slug": "gyeonggi-yongin-bola",
    "name": "보라점",
    "fullName": "보라점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "용인시",
    "address": "경기 용인시 기흥구 사은로126번길 6  신원프라자 303호",
    "eduOffice": "보라점와와학습코칭학원",
    "eduRegNo": "용인교육지원청 등록 제4991호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "나곡초"
      ],
      "middle": [
        "나곡중/보라중/상갈중"
      ],
      "high": [
        "보라고/신갈고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/FDn3WyFX"
  },
  {
    "slug": "daegu-dalseo-daegujankgi",
    "name": "대구장기점",
    "fullName": "대구장기점",
    "brand": "wawa",
    "sido": "daegu",
    "sidoName": "대구",
    "sigungu": "달서구",
    "address": "대구 달서구 장기로 252  장기협성휴포레 2층 209,210",
    "eduOffice": "대구장기점와와학습코칭학원",
    "eduRegNo": "대구남부교육지원청 등록 제2020-80호",
    "subjects": {
      "korean": [
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "english": [
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "중1",
        "중2",
        "중3"
      ],
      "social": [
        "중1",
        "중2",
        "중3"
      ]
    },
    "targets": {
      "elem": [
        "장동초",
        "장기초",
        "성당초"
      ],
      "middle": [
        "원화중"
      ],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xgNyGjnz"
  },
  {
    "slug": "gyeonggi-bucheon-beombak",
    "name": "범박점",
    "fullName": "범박점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "부천시",
    "address": "경기 부천시 소사구 은성로 132  5층",
    "eduOffice": "범박점와와학습코칭보습학원",
    "eduRegNo": "부천교육지원청 등록 제6495호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "창영초",
        "소안초",
        "소사초",
        "복사초"
      ],
      "middle": [
        "일신중",
        "소사중",
        "부일중"
      ],
      "high": [
        "시온고",
        "소사고",
        "범박고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/513kQdyv"
  },
  {
    "slug": "gyeonggi-seongnam-wirye-changgok",
    "name": "위례창곡점",
    "fullName": "위례창곡점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "성남시",
    "address": "경기 성남시 수정구 위례동로 141  우성메디피아 401호",
    "eduOffice": "위례창곡점와와학습코칭학원",
    "eduRegNo": "성남교육지원청 등록 제6458호",
    "subjects": {
      "korean": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [],
      "middle": [],
      "high": []
    },
    "feeType": "A",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/GXAr0Tse"
  },
  {
    "slug": "gangwon-wonju-hyeoksin",
    "name": "혁신점",
    "fullName": "혁신점",
    "brand": "wawa",
    "sido": "gangwon",
    "sidoName": "강원",
    "sigungu": "원주시",
    "address": "강원특별자치도 원주시 입춘로 110  파라다이스프라자 305호",
    "eduOffice": "혁신점와와학습코칭학원",
    "eduRegNo": "원주교육지원청 등록 제2762호",
    "subjects": {
      "korean": [],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "버들초",
        "반고초"
      ],
      "middle": [
        "버들중",
        "반곡중"
      ],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xzxfiv6H"
  },
  {
    "slug": "gyeonggi-goyang-wonheunk",
    "name": "원흥점",
    "fullName": "원흥점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "고양시",
    "address": "경기 고양시 덕양구 권율대로 672  원흥역봄오피스텔 217호",
    "eduOffice": "원흥점와와학습코칭학원",
    "eduRegNo": "고양교육지원청 등록 제6096호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "원흥초",
        "삼송초"
      ],
      "middle": [
        "원흥중",
        "고양중"
      ],
      "high": [
        "신원고",
        "서정고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xl0fKZJ5"
  },
  {
    "slug": "gyeongnam-geoje-geojesu-wol",
    "name": "거제수월점",
    "fullName": "거제수월점",
    "brand": "wawa",
    "sido": "gyeongnam",
    "sidoName": "경남",
    "sigungu": "거제시",
    "address": "경남 거제시 수양로 462  3층",
    "eduOffice": "거제수월점와와학습코칭학원",
    "eduRegNo": "거제교육지원청 등록 제1558호",
    "subjects": {
      "korean": [],
      "english": [
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "수월초",
        "제산초"
      ],
      "middle": [
        "수월중",
        "거제중앙중"
      ],
      "high": [
        "거제중앙고",
        "연초고",
        "상문고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/54LpJxK4"
  },
  {
    "slug": "gyeonggi-goyang-deok-i",
    "name": "덕이점",
    "fullName": "덕이점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "고양시",
    "address": "경기 고양시 일산서구 하이파크2로 40  금문프라자 804호",
    "eduOffice": "덕이점와와학습코칭학원",
    "eduRegNo": "고양교육지원청 등록 제6169호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": []
    },
    "targets": {
      "elem": [
        "한산초",
        "덕이초",
        "백송초"
      ],
      "middle": [],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/GyYlLYyi"
  },
  {
    "slug": "gyeonggi-goyang-samsonk",
    "name": "삼송점",
    "fullName": "삼송점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "고양시",
    "address": "경기 고양시 덕양구 신원로 36  명승세도나3 701호",
    "eduOffice": "삼송점와와학습코칭학원",
    "eduRegNo": "고양교육지원청 등록 제6173호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2"
      ]
    },
    "targets": {
      "elem": [
        "신원초"
      ],
      "middle": [
        "신원중"
      ],
      "high": [
        "신원고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/x2jD2cEM"
  },
  {
    "slug": "gwangju-nam-jin-wol",
    "name": "진월점",
    "fullName": "진월점",
    "brand": "wawa",
    "sido": "gwangju",
    "sidoName": "광주",
    "sigungu": "남구",
    "address": "광주 남구 광복마을길 47  4층",
    "eduOffice": "진월점와와학습코칭센터학원",
    "eduRegNo": "광주서부교육지원청 등록 제7193호",
    "subjects": {
      "korean": [],
      "english": [
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "진월초",
        "주월초"
      ],
      "middle": [
        "동성여중",
        "주월중"
      ],
      "high": [
        "대광여고",
        "동성고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xQeboJqM"
  },
  {
    "slug": "gyeonggi-pyeongtaek-ichunk",
    "name": "이충점",
    "fullName": "이충점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "평택시",
    "address": "경기 평택시 이충로 49-31  삼원프라자 201호",
    "eduOffice": "이충점와와학습코칭학원",
    "eduRegNo": "평택교육지원청 등록 제 2599호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "social": []
    },
    "targets": {
      "elem": [],
      "middle": [
        "효명중",
        "이충중",
        "은혜중"
      ],
      "high": [
        "이충고",
        "은혜고",
        "효명고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5yPF0xMI"
  },
  {
    "slug": "incheon-seo-lu-wonsiti",
    "name": "루원시티점",
    "fullName": "루원시티점",
    "brand": "wawa",
    "sido": "incheon",
    "sidoName": "인천",
    "sigungu": "서구",
    "address": "인천 서구 새오개로111번안길 23  대릉빌딩 302호",
    "eduOffice": "루원시티점와와학습코칭학원",
    "eduRegNo": "인천서부교육지원청 등록 서부 제2212호",
    "subjects": {
      "korean": [
        "고1",
        "고2"
      ],
      "english": [
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "가현초"
      ],
      "middle": [
        "신형중",
        "신현여중",
        "가현중"
      ],
      "high": [
        "신현고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/502dH3ie"
  },
  {
    "slug": "daegu-buk-bokhyeon",
    "name": "복현점",
    "fullName": "복현점",
    "brand": "wawa",
    "sido": "daegu",
    "sidoName": "대구",
    "sigungu": "북구",
    "address": "대구 북구 동북로 247  이편한세상복현 상가동 305호",
    "eduOffice": "복현점와와학습코칭학원",
    "eduRegNo": "대구광역시서부교육지원청 제2024-4559호",
    "subjects": {
      "korean": [
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "복현초"
      ],
      "middle": [
        "북중",
        "성광중",
        "산격중"
      ],
      "high": [
        "경상고",
        "성광고",
        "영진고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/GeUi3p9K"
  },
  {
    "slug": "gyeonggi-namyangju-jinjeop",
    "name": "진접점",
    "fullName": "진접점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "남양주시",
    "address": "경기 남양주시 진접읍 해밀예당1로 171  제일프라자 203호",
    "eduOffice": "진접점와와학습코칭학원",
    "eduRegNo": "경기도구리남양주교육지원청등록 제4552호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "해밀초 화봉초"
      ],
      "middle": [
        "풍양중 주곡중"
      ],
      "high": [
        "진접고 오남고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/FjbZuVTn"
  },
  {
    "slug": "busan-dongnae-sajik",
    "name": "사직점",
    "fullName": "사직점",
    "brand": "wawa",
    "sido": "busan",
    "sidoName": "부산",
    "sigungu": "동래구",
    "address": "부산 동래구 사직로 80  222동 311호 (사직쌍용예가아파트 상가)",
    "eduOffice": "사직점와와학습코칭학원",
    "eduRegNo": "동래교육지원청 등록 제5468호",
    "subjects": {
      "korean": [],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "예원초",
        "사직초"
      ],
      "middle": [
        "사직중",
        "사직여중"
      ],
      "high": [
        "사직고",
        "사직여고",
        "동인고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/5oEeoxYL"
  },
  {
    "slug": "gyeonggi-paju-unjeonkhosu",
    "name": "운정호수점",
    "fullName": "운정호수점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "파주시",
    "address": "경기 파주시 경의로1240번길 37-1  명품프라자3차 605호",
    "eduOffice": "운정호수점와와학습코칭센터학원",
    "eduRegNo": "경기도파주교육지원청 등록 제1878호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [],
      "middle": [],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/x3jnbddv"
  },
  {
    "slug": "gyeonggi-gwangju-si-tanbeol",
    "name": "탄벌점",
    "fullName": "탄벌점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "광주시",
    "address": "경기 광주시 벌원길 61  2층",
    "eduOffice": "탄벌점와와학습코칭학원",
    "eduRegNo": "광주하남교육지원청 등록 제2007호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": []
    },
    "targets": {
      "elem": [],
      "middle": [],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xGIEbDuT"
  },
  {
    "slug": "ulsan-jung-nam-oe",
    "name": "남외점",
    "fullName": "남외점",
    "brand": "wawa",
    "sido": "ulsan",
    "sidoName": "울산",
    "sigungu": "중구",
    "address": "울산 중구 남외3길 15  남외프라자 401호",
    "eduOffice": "남외점와와학습코칭학원",
    "eduRegNo": "울산강북교육지원청 등록 제5626호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "english": [
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "남외초"
      ],
      "middle": [
        "남외중",
        "울산중"
      ],
      "high": [
        "울산고",
        "가온고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/xAFe3D0a"
  },
  {
    "slug": "gyeonggi-yongin-heunkdeok",
    "name": "흥덕점",
    "fullName": "흥덕점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "용인시",
    "address": "경기 용인시 기흥구 흥덕2로 85  우연프라자 201호",
    "eduOffice": "흥덕점와와학습코칭학원",
    "eduRegNo": "용인교육지원청 등록 제4989호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "social": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ]
    },
    "targets": {
      "elem": [
        "샘말초",
        "석현초",
        "흥덕초",
        "매원초"
      ],
      "middle": [
        "흥덕중",
        "다산중",
        "광교호수중",
        "상현중"
      ],
      "high": [
        "흥덕고",
        "기흥고",
        "신갈고",
        "상현고",
        "매원고"
      ]
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/FDn3l6n3"
  },
  {
    "slug": "gyeonggi-hwaseong-bansonk",
    "name": "반송점",
    "fullName": "반송점",
    "brand": "wawa",
    "sido": "gyeonggi",
    "sidoName": "경기",
    "sigungu": "화성시",
    "address": "경기도 화성시 반송동 동탄원천로 163  503호",
    "eduOffice": "반송점와와학습코칭학원",
    "eduRegNo": "화성오산교육지원청 등록 제3130호",
    "subjects": {
      "korean": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "english": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "math": [
        "초1",
        "초2",
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ],
      "science": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3"
      ],
      "social": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1"
      ]
    },
    "targets": {
      "elem": [],
      "middle": [],
      "high": []
    },
    "feeType": "B",
    "isNew": false,
    "pricingGroup": 2,
    "naverMapUrl": "https://naver.me/FV7GcOKi"
  },
  {
    "slug": "seoul-seongbuk-don-am",
    "name": "돈암점",
    "fullName": "돈암점",
    "brand": "wawa",
    "sido": "seoul",
    "sidoName": "서울",
    "sigungu": "성북구",
    "address": "서울특별시 성북구 돈암동 동소문로 190  중앙빌딩 201호",
    "eduOffice": "돈암점와와학습코칭학원",
    "eduRegNo": "성북강북교육지원청 등록 제2017-43호",
    "subjects": {
      "korean": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "개운초"
      ],
      "middle": [
        "개운중",
        "성신여중",
        "고명중"
      ],
      "high": [
        "용문고",
        "사대부고",
        "성신여고",
        "고대부고"
      ]
    },
    "feeType": "A",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/xa5MKMvW"
  },
  {
    "slug": "seoul-seongbuk-donksomun",
    "name": "동소문점",
    "fullName": "동소문점",
    "brand": "wawa",
    "sido": "seoul",
    "sidoName": "서울",
    "sigungu": "성북구",
    "address": "서울 성북구 아리랑로7길 5  4층",
    "eduOffice": "동소문점와와학습코칭학원",
    "eduRegNo": "성북강북교육지원청 등록 제2017-39호",
    "subjects": {
      "korean": [],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "정덕초",
        "우촌초",
        "정수초"
      ],
      "middle": [
        "성신여중",
        "동구여중",
        "삼선중",
        "고명중"
      ],
      "high": [
        "성신여고",
        "홍대부고",
        "고대부고",
        "한성여고"
      ]
    },
    "feeType": "A",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/GBFab1zx"
  },
  {
    "slug": "seoul-mapo-sank-am",
    "name": "상암점",
    "fullName": "상암점",
    "brand": "wawa",
    "sido": "seoul",
    "sidoName": "서울",
    "sigungu": "마포구",
    "address": "서울특별시 마포구 상암동 상암산로1길 73  202호",
    "eduOffice": "와와학습코칭센터학원",
    "eduRegNo": "서울서부교육지원청 등록 제022015001127호",
    "subjects": {
      "korean": [],
      "english": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "math": [
        "초3",
        "초4",
        "초5",
        "초6",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3"
      ],
      "science": [],
      "social": []
    },
    "targets": {
      "elem": [
        "중동초",
        "상지초",
        "상암초"
      ],
      "middle": [
        "상암중",
        "중암중",
        "성산중",
        "성사중",
        "덕은한강중"
      ],
      "high": [
        "상암고",
        "예일여고",
        "대성고",
        "숭실고",
        "가재울고"
      ]
    },
    "feeType": "A",
    "isNew": false,
    "pricingGroup": 1,
    "naverMapUrl": "https://naver.me/xSFVEApX"
  }
];
