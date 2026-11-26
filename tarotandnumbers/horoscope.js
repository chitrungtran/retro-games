/**
 * Tarot & Numbers - Daily Horoscope. Needs tn-core.js and zodiac.js loaded first.
 * Mount: <div id="tn-horoscope"></div>
 * Readings are shared per sign and local day (cached on the server) and free: no quota is used.
 */
(function (w) {
  'use strict';
  var root = document.getElementById('tn-horoscope');
  if (!root || !w.TN || typeof createZodiac !== 'function') return;
  var TN = w.TN, el = TN.el, z = createZodiac(), d = document;
  var LAST_KEY = 'tn_hs_sign', CACHE_KEY = 'tn_hs_cache';
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function todayLocal() { var n = new Date(); return n.getFullYear() + '-' + ('0' + (n.getMonth() + 1)).slice(-2) + '-' + ('0' + n.getDate()).slice(-2); }
  function readCache() { var s = TN.store(); try { var o = JSON.parse((s && s.getItem(CACHE_KEY)) || 'null'); return o && o.day === todayLocal() ? o : { day: todayLocal(), items: {} }; } catch (e) { return { day: todayLocal(), items: {} }; } }
  function writeCache(c) { var s = TN.store(); try { if (s) s.setItem(CACHE_KEY, JSON.stringify(c)); } catch (e) {} }

  var pick = el('div', 'tn-panel tn-hs-pick');
  pick.appendChild(el('h2', 'tn-h tn-center', 'Choose your sign'));
  var grid = el('div', 'tn-zgrid'); grid.setAttribute('role', 'list');
  var buttons = {};
  z.signs.forEach(function (s) {
    var b = el('button', 'tn-zbtn'); b.type = 'button'; b.setAttribute('role', 'listitem'); b.setAttribute('aria-pressed', 'false');
    b.appendChild(el('span', 'tn-zglyph', s.glyph)); b.appendChild(el('span', 'tn-zname', s.name)); b.appendChild(el('span', 'tn-zdates', s.dates));
    b.addEventListener('click', function () { choose(s.id, true); });
    buttons[s.id] = b; grid.appendChild(b);
  });
  pick.appendChild(grid);
  // birthday helper
  var helper = el('details', 'tn-hs-helper');
  helper.appendChild(el('summary', null, 'Not sure of your sign? Find it from your birthday'));
  var hrow = el('div', 'tn-row2');
  var hm = el('select', 'tn-input'), hd = el('select', 'tn-input');
  hm.setAttribute('aria-label', 'Birth month'); hd.setAttribute('aria-label', 'Birth day');
  hm.appendChild(new Option('Month', '')); hd.appendChild(new Option('Day', ''));
  MONTHS.forEach(function (m, k) { hm.appendChild(new Option(m, String(k + 1))); });
  for (var i = 1; i <= 31; i++) hd.appendChild(new Option(String(i), String(i)));
  hrow.appendChild(hm); hrow.appendChild(hd); helper.appendChild(hrow);
  var hout = el('p', 'tn-status'); helper.appendChild(hout);
  function onHelper() {
    if (!hm.value || !hd.value) return;
    var id = z.signFromDate(+hm.value, +hd.value), s = z.byId[id];
    hout.textContent = 'Your sun sign is ' + s.name + ' (' + s.dates + ').';
    choose(id, true);
  }
  hm.addEventListener('change', onHelper); hd.addEventListener('change', onHelper);
  pick.appendChild(helper);

  var result = el('section', 'tn-result tn-hidden');
  var info = el('div', 'tn-panel tn-sign-card');
  var answer = el('article', 'tn-answer'), answerHead = el('div', 'tn-answer-head'), answerBody = el('div', 'tn-answer-body');
  var loading = el('div', 'tn-loading', 'Reading today\'s sky...'), status = el('p', 'tn-status');
  answer.appendChild(answerHead); answer.appendChild(loading); answer.appendChild(status); answer.appendChild(answerBody);
  result.appendChild(info); result.appendChild(answer);
  root.textContent = ''; root.appendChild(pick); root.appendChild(result);
  var printBtn = TN.printButton(result, 'Tarot & Numbers - Daily horoscope');
  var reqId = 0;

  function signCard(s) {
    info.textContent = '';
    var top = el('div', 'tn-angel-top');
    top.appendChild(el('div', 'tn-zbig', s.glyph));
    var h = el('div'); h.appendChild(el('div', 'tn-num-label', s.dates)); h.appendChild(el('h2', 'tn-angel-title', s.name));
    top.appendChild(h); info.appendChild(top);
    info.appendChild(el('p', 'tn-kw', s.kw));
    info.appendChild(el('p', 'tn-angel-text', s.text));
    var dl = el('dl', 'tn-angel-dl');
    [['Element', s.element], ['Modality', s.modality], ['Ruled by', s.ruler]].forEach(function (x) { dl.appendChild(el('dt', null, x[0])); dl.appendChild(el('dd', null, x[1])); });
    info.appendChild(dl);
  }
  function showAnswer(s, data) {
    answerHead.textContent = '';
    answerHead.appendChild(el('h2', null, s.name + ' horoscope for today'));
    if (data.dateLabel) answerHead.appendChild(el('p', 'tn-asked', data.dateLabel));
    if (data.sky) answerHead.appendChild(el('p', 'tn-sky', 'Sun in ' + data.sky.sunSign + ' \u00b7 Moon in ' + data.sky.moonSign + ' \u00b7 ' + data.sky.phase));
    TN.renderAnswer(answerBody, data.answer);
    var extra = el('div', 'tn-after');
    extra.appendChild(printBtn);
    var more = el('p', 'tn-more-links');
    more.appendChild(d.createTextNode('Go deeper: '));
    var a1 = el('a', null, 'check your love compatibility'); a1.href = '/p/compatibility.html#' + s.id;
    var a2 = el('a', null, 'draw today\'s tarot card'); a2.href = '/p/tarot.html';
    more.appendChild(a1); more.appendChild(d.createTextNode(' or ')); more.appendChild(a2); more.appendChild(d.createTextNode('.'));
    extra.appendChild(more);
    extra.appendChild(TN.donateCta());
    answerBody.appendChild(extra);
  }
  function choose(id, scroll) {
    var s = z.byId[id]; if (!s) return;
    Object.keys(buttons).forEach(function (k) { buttons[k].classList.toggle('is-on', k === id); buttons[k].setAttribute('aria-pressed', k === id ? 'true' : 'false'); });
    var st = TN.store(); try { if (st) st.setItem(LAST_KEY, id); } catch (e) {}
    try { if (w.history && w.history.replaceState) w.history.replaceState(null, '', '#' + id); } catch (e) {}
    signCard(s);
    result.classList.remove('tn-hidden');
    status.textContent = ''; status.className = 'tn-status'; answerBody.textContent = ''; answerHead.textContent = '';
    answerHead.appendChild(el('h2', null, s.name + ' horoscope for today'));
    if (scroll && result.scrollIntoView) result.scrollIntoView({ behavior: 'smooth', block: 'start' });
    var cache = readCache();
    if (cache.items[id]) { showAnswer(s, cache.items[id]); return; }
    var my = ++reqId;
    loading.classList.add('on');
    TN.ask(null, 'horoscope', { sign: id }, '').then(function (out) {
      if (my !== reqId) return;
      loading.classList.remove('on');
      if (!out.ok) {
        status.textContent = (out.error || 'Today\'s horoscope could not be loaded.') + ' The sign profile above is always available.';
        status.className = 'tn-status is-error';
        var retry = el('button', 'tn-btn tn-btn-ghost', 'Try again'); retry.type = 'button';
        retry.addEventListener('click', function () { choose(id, false); });
        answerBody.appendChild(retry);
        return;
      }
      var data = { answer: out.answer, dateLabel: out.data.dateLabel, sky: out.data.sky };
      var c = readCache(); c.items[id] = data; writeCache(c);
      showAnswer(s, data);
    });
  }
  function fromHash(scroll) {
    var h = (w.location.hash || '').replace('#', '').toLowerCase();
    if (z.byId[h]) { choose(h, scroll); return true; }
    return false;
  }
  w.addEventListener('hashchange', function () { fromHash(true); });
  if (!fromHash(false)) {
    var st = TN.store(), last = null; try { last = st && st.getItem(LAST_KEY); } catch (e) {}
    if (last && z.byId[last]) choose(last, false);
  }
})(window);
