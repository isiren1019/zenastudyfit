/* ===== 통합 기록기 (보내는 쪽) v3 =====
   사이트마다 아래 SITE 값만 바꿔서 사용.
   모든 HTML 페이지의 </body> 바로 위에
   <script src="/js/tracker.js" defer></script>  한 줄로 불러옴.
*/
(function () {
  var SITE = '제나쌤스터디핏';   // ← 사이트마다 이 줄만 변경 (예: '파워톡', '세이브샵')
  var URL = 'https://script.google.com/macros/s/AKfycbzgldxTSNY_nZdDV5ZTyOnsVvl9WXj_F45reQXwF48bntbYrfIwZs4GLtT6lGO-NkFsxA/exec';

  var ua = navigator.userAgent || '';
  var params = new URLSearchParams(location.search);

  // 검색엔진 로봇 등으로 보이면 표시 (기록은 남기되 나중에 뺄 수 있게)
  var bot = /bot|crawl|spider|slurp|yeti|bingpreview|facebookexternalhit|headless|lighthouse/i.test(ua);

  // 기기 구분
  var device = /iPad|Tablet|SM-T/i.test(ua) ? '태블릿'
             : /Mobi|Android|iPhone/i.test(ua) ? '모바일' : 'PC';

  // 어떤 앱 안에서 열었는지 (네이버 앱 등은 직전 주소를 안 넘겨줄 때가 있어서 따로 확인)
  var app = /NAVER\(inapp/i.test(ua) ? '네이버앱'
          : /KAKAOTALK/i.test(ua) ? '카카오톡앱'
          : /DaumApps/i.test(ua) ? '다음앱'
          : /Instagram/i.test(ua) ? '인스타그램앱'
          : /FBAN|FBAV/i.test(ua) ? '페이스북앱'
          : '';

  // 방문자 임시번호 (같은 브라우저면 같은 번호) + 신규/재방문
  var visitor = '', visitType = '';
  try {
    visitor = localStorage.getItem('zt_vid');
    if (visitor) { visitType = '재방문'; }
    else {
      visitor = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
      localStorage.setItem('zt_vid', visitor);
      visitType = '신규';
    }
  } catch (e) { visitor = '저장불가'; }

  // 유입처: 직전 페이지의 도메인. 같은 사이트 안에서 이동한 건 유입처로 치지 않음
  var ref = '';
  try { if (document.referrer) ref = new URL(document.referrer).hostname; } catch (e) {}
  if (ref === location.hostname) ref = '';

  // utm 꼬리표와 유입처는 첫 페이지에만 붙어 오므로,
  // 같은 방문 동안(탭 닫기 전) 기억해 두고 다음 페이지에서도 사용
  var utm = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term'].forEach(function (k) {
    var v = params.get(k) || '';
    try {
      if (v) sessionStorage.setItem('zt_' + k, v);
      else v = sessionStorage.getItem('zt_' + k) || '';
    } catch (e) {}
    utm[k] = v;
  });
  try {
    if (ref) sessionStorage.setItem('zt_ref', ref);
    else ref = sessionStorage.getItem('zt_ref') || '';
  } catch (e) {}

  // 기록 1줄 보내기
  function send(eventName, note) {
    var body = JSON.stringify({
      site: SITE, event: eventName, page: location.pathname,
      referrer: ref, app: app,
      utm_source: utm.utm_source, utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign, utm_term: utm.utm_term,
      device: device, visitor: visitor, visit_type: visitType,
      bot: bot, note: note || ''
    });
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(URL, new Blob([body], { type: 'text/plain' }));
      } else {
        fetch(URL, { method: 'POST', mode: 'no-cors', body: body, keepalive: true });
      }
    } catch (e) {}
  }

  // 1) 페이지가 열리면 기록
  send('페이지열람');

  // 2) 전화 버튼 / 카카오 버튼 클릭 기록 (링크를 가로채지 않고 기록만 함)
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('tel:') === 0) send('전화클릭');
    else if (href.indexOf('pf.kakao.com') > -1 || href.indexOf('open.kakao.com') > -1) send('카카오클릭');
  }, true);

  // 3) 폼 제출 등 다른 곳에서도 쓸 수 있게 공개: zenaTrack('폼제출')
  window.zenaTrack = send;
})();