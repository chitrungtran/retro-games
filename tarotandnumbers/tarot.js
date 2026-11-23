/**
 * Tarot & Numbers - Tarot tool. Needs tn-core.js and tarot-deck.js loaded first.
 * Mount: <div id="tn-tarot"></div>. Daily card = 1 per day per device (localStorage, device date).
 * Shuffle uses crypto.getRandomValues; about 30% of cards come out reversed.
 */
function createTarotDraw(ids, opts) {
  var o = opts || {};
  var RATE = o.reversedRate != null ? o.reversedRate : 0.3, TWO32 = 4294967296;
  function u32() {
    if (o.u32) return o.u32() >>> 0;
    var c = (typeof crypto !== 'undefined' && crypto.getRandomValues) ? crypto : null;
    if (c) { var a = new Uint32Array(1); c.getRandomValues(a); return a[0]; }
    return Math.floor(Math.random() * TWO32);
  }
  function randInt(n) { var lim = Math.floor(TWO32 / n) * n, x; do { x = u32(); } while (x >= lim); return x % n; }
  function shuffle(list) { var a = list.slice(); for (var i = a.length - 1; i > 0; i--) { var j = randInt(i + 1), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function isReversed() { return u32() < RATE * TWO32; }
  function draw(n) { return shuffle(ids).slice(0, n).map(function (id) { return { id: id, reversed: isReversed() }; }); }
  return { draw: draw, shuffle: shuffle, randInt: randInt, isReversed: isReversed, REVERSED_RATE: RATE };
}

(function (w) {
  'use strict';
  var root = document.getElementById('tn-tarot');
  if (!root || !w.TN || typeof createTarotDeck !== 'function') return;
  var TN = w.TN, el = TN.el, CFG = w.TN_CONFIG || {};
  var IMG_BASE = CFG.imgBase || 'https://chitrungtran.github.io/retro-games/tarotandnumbers/img/';
  var CARD_BASE = CFG.cardBase || 'https://chitrungtran.github.io/retro-games/huyencocac/cards/';
  var CARD_BACK = CFG.cardBack || IMG_BASE + 'card-back-600x1000.jpg';
  var DAILY_KEY = 'tn_tarot_daily', MAX_Q = 200;
  var deck = createTarotDeck(), drawer = createTarotDraw(deck.ids);
  var POS3 = ['Past', 'Present', 'Future'];
  var current = null; // { spread: 'daily'|'three', cards: [{id, reversed}], question }

  function today() { var t = new Date(); return t.getFullYear() + '-' + ('0' + (t.getMonth() + 1)).slice(-2) + '-' + ('0' + t.getDate()).slice(-2); }
  function readDaily() {
    var s = TN.store(); if (!s) return null;
    try { var o = JSON.parse(s.getItem(DAILY_KEY) || 'null'); return o && o.d === today() && deck.byId[o.id] ? { id: o.id, reversed: !!o.r } : null; } catch (e) { return null; }
  }
  function saveDaily(c) { var s = TN.store(); if (s) try { s.setItem(DAILY_KEY, JSON.stringify({ d: today(), id: c.id, r: c.reversed })); } catch (e) {} }

  /* ---------- UI skeleton ---------- */
  var form = el('div', 'tn-panel tn-form');
  var qLabel = el('label', 'tn-label', 'Your question (optional)'); qLabel.setAttribute('for', 'tn-tarot-q');
  var q = el('textarea', 'tn-input'); q.id = 'tn-tarot-q'; q.maxLength = MAX_Q; q.rows = 2;
  q.placeholder = 'For example: What do I need to understand about my work right now?';
  var count = el('div', 'tn-count', '0 / ' + MAX_Q);
  q.addEventListener('input', function () { count.textContent = q.value.length + ' / ' + MAX_Q; });
  var actions = el('div', 'tn-actions');
  var bDaily = el('button', 'tn-btn tn-btn-brass', 'Draw today\'s card'); bDaily.type = 'button';
  var bThree = el('button', 'tn-btn tn-btn-ghost', 'Three-card spread'); bThree.type = 'button';
  actions.appendChild(bDaily); actions.appendChild(bThree);
  var status = el('p', 'tn-status'); status.setAttribute('role', 'status');
  [qLabel, q, count, actions, status].forEach(function (n) { form.appendChild(n); });

  var deckWrap = el('div', 'tn-deck'); deckWrap.setAttribute('aria-hidden', 'true');
  for (var i = 0; i < 6; i++) { var b = el('div', 'tn-deck-card'); b.style.setProperty('--i', i); deckWrap.appendChild(b); }

  var result = el('section', 'tn-result tn-hidden'); result.setAttribute('aria-live', 'polite');
  var rTitle = el('h2', 'tn-result-title'), spreadEl = el('div', 'tn-spread'), meaningsEl = el('div', 'tn-meanings');
  var aiBox = el('div', 'tn-ai');
  var aiBtn = el('button', 'tn-btn tn-btn-brass tn-ai-btn', 'Get my AI reading'); aiBtn.type = 'button';
  var loading = el('div', 'tn-loading', 'Reading the cards...');
  var aiStatus = el('p', 'tn-status');
  var answer = el('article', 'tn-answer tn-hidden'), answerHead = el('div', 'tn-answer-head'), answerBody = el('div', 'tn-answer-body');
  answer.appendChild(answerHead); answer.appendChild(answerBody);
  aiBox.appendChild(aiBtn); aiBox.appendChild(loading); aiBox.appendChild(aiStatus);
  [rTitle, spreadEl, meaningsEl, aiBox, answer].forEach(function (n) { result.appendChild(n); });

  root.textContent = '';
  root.appendChild(form); root.appendChild(deckWrap); root.appendChild(result);
  var quota = TN.createQuota(aiBtn);

  /* ---------- rendering ---------- */
  function fallbackFace(card) {
    var f = el('div', 'tn-card-fallback');
    f.appendChild(el('span', 'tn-card-fallback-num', card.numeral || (card.suit ? deck.SUITS[card.suit].name : '')));
    f.appendChild(el('span', 'tn-card-fallback-name', card.name));
    return f;
  }
  function cardNode(c, label, idx) {
    var card = deck.byId[c.id];
    var fig = el('figure', 'tn-card' + (c.reversed ? ' is-reversed' : ''));
    fig.style.setProperty('--d', (idx * 0.18) + 's');
    var inner = el('div', 'tn-card-inner');
    var back = el('div', 'tn-card-back'); back.style.backgroundImage = 'url("' + CARD_BACK + '")';
    var front = el('div', 'tn-card-front');
    var img = el('img'); img.alt = card.name + (c.reversed ? ' (reversed)' : ''); img.loading = 'lazy'; img.decoding = 'async';
    img.addEventListener('error', function () { if (img.parentNode) img.parentNode.replaceChild(fallbackFace(card), img); });
    img.src = CARD_BASE + card.id + '.webp';
    front.appendChild(img);
    inner.appendChild(back); inner.appendChild(front); fig.appendChild(inner);
    var cap = el('figcaption');
    if (label) cap.appendChild(el('span', 'tn-pos', label));
    cap.appendChild(el('span', 'tn-card-name', card.name + (c.reversed ? ' (reversed)' : '')));
    fig.appendChild(cap);
    fig.tabIndex = 0; fig.setAttribute('role', 'button'); fig.setAttribute('aria-label', 'Enlarge ' + img.alt);
    function zoom() { openZoom(card, c.reversed); }
    fig.addEventListener('click', zoom);
    fig.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); zoom(); } });
    setTimeout(function () { fig.classList.add('is-flipped'); }, 400 + idx * 350);
    return fig;
  }
  function openZoom(card, rev) {
    var ov = el('div', 'tn-zoom'); ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-label', card.name);
    var img = el('img'); img.src = CARD_BASE + card.id + '.webp'; img.alt = card.name; if (rev) img.className = 'is-reversed';
    img.addEventListener('error', function () { img.replaceWith(fallbackFace(card)); });
    var close = el('button', 'tn-zoom-close', 'Close'); close.type = 'button';
    ov.appendChild(img); ov.appendChild(close);
    function done() { ov.remove(); document.removeEventListener('keydown', esc); }
    function esc(e) { if (e.key === 'Escape') done(); }
    ov.addEventListener('click', done); document.addEventListener('keydown', esc);
    document.body.appendChild(ov); close.focus();
  }
  function meaningNode(c, label) {
    var card = deck.byId[c.id];
    var box = el('div', 'tn-meaning');
    var h = el('h3', null, (label ? label + ': ' : '') + card.name + (c.reversed ? ' (reversed)' : ''));
    box.appendChild(h);
    box.appendChild(el('p', 'tn-kw', c.reversed ? card.rev : card.up));
    box.appendChild(el('p', null, c.reversed ? card.reversed : card.upright));
    return box;
  }
  function show(spread, cards, note) {
    current = { spread: spread, cards: cards, question: (q.value || '').trim() };
    spreadEl.textContent = ''; meaningsEl.textContent = '';
    spreadEl.className = 'tn-spread tn-spread-' + cards.length;
    rTitle.textContent = spread === 'daily' ? 'Your card for today' : 'Past, Present, Future';
    cards.forEach(function (c, i) {
      var label = spread === 'three' ? POS3[i] : '';
      spreadEl.appendChild(cardNode(c, label, i));
      meaningsEl.appendChild(meaningNode(c, label));
    });
    answer.classList.add('tn-hidden'); aiStatus.textContent = '';
    status.textContent = note || '';
    result.classList.remove('tn-hidden');
    if (result.scrollIntoView) result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function shuffleThen(fn) {
    bDaily.disabled = bThree.disabled = true;
    deckWrap.classList.add('is-shuffling');
    setTimeout(function () { deckWrap.classList.remove('is-shuffling'); bDaily.disabled = bThree.disabled = false; fn(); }, 1100);
  }

  bDaily.addEventListener('click', function () {
    var saved = readDaily();
    if (saved) { show('daily', [saved], 'You have already drawn today\'s card. A new one is waiting tomorrow.'); return; }
    shuffleThen(function () { var c = drawer.draw(1)[0]; saveDaily(c); show('daily', [c]); });
  });
  bThree.addEventListener('click', function () { shuffleThen(function () { show('three', drawer.draw(3)); }); });

  var printBtn = TN.printButton(result, 'Tarot & Numbers - Tarot reading');
  aiBtn.addEventListener('click', function () {
    aiStatus.textContent = '';
    if (!current) { aiStatus.textContent = 'Draw your cards first.'; return; }
    var question = (q.value || '').trim().slice(0, MAX_Q);
    current.question = question;
    loading.classList.add('on'); aiBtn.disabled = true;
    TN.ask(quota, 'tarot', { spread: current.spread, cards: current.cards.map(function (c) { return { id: c.id, reversed: !!c.reversed }; }) }, question)
      .then(function (out) {
        loading.classList.remove('on'); aiBtn.disabled = false;
        if (out.handled) return;
        if (!out.ok) { aiStatus.textContent = out.error; aiStatus.className = 'tn-status is-error'; return; }
        answerHead.textContent = '';
        answerHead.appendChild(el('h2', null, 'Your reading'));
        if (question) answerHead.appendChild(el('p', 'tn-asked', 'Question: ' + question));
        TN.renderAnswer(answerBody, out.answer);
        var extra = el('div', 'tn-after');
        extra.appendChild(printBtn); extra.appendChild(TN.donateCta());
        answerBody.appendChild(extra);
        answer.classList.remove('tn-hidden');
        if (answer.scrollIntoView) answer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
  });

  var saved = readDaily();
  if (saved) status.textContent = 'Today\'s card is already drawn. Tap "Draw today\'s card" to see it again.';
})(window);
