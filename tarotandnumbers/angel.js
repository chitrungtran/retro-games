/**
 * Tarot & Numbers - Angel Numbers tool. Needs tn-core.js and angel-data.js loaded first.
 * Mount: <div id="tn-angel"></div>
 */
(function (w) {
  'use strict';
  var root = document.getElementById('tn-angel');
  if (!root || !w.TN || typeof createAngelNumbers !== 'function') return;
  var TN = w.TN, el = TN.el, an = createAngelNumbers(), MAX_Q = 200;
  var POPULAR = ['111', '222', '333', '444', '555', '666', '777', '888', '999', '000', '1111', '1212', '1234', '1010', '2222', '911'];

  var form = el('form', 'tn-panel tn-form'); form.noValidate = true;
  var lab = el('label', 'tn-label', 'Which number do you keep seeing?'); lab.setAttribute('for', 'tn-a-num');
  var row = el('div', 'tn-angel-row');
  var input = el('input', 'tn-input tn-angel-input'); input.id = 'tn-a-num'; input.type = 'text'; input.inputMode = 'numeric';
  input.maxLength = 6; input.placeholder = 'e.g. 1111'; input.autocomplete = 'off'; input.setAttribute('pattern', '[0-9]*');
  var go = el('button', 'tn-btn tn-btn-brass', 'Show meaning'); go.type = 'submit';
  row.appendChild(input); row.appendChild(go);
  form.appendChild(lab); form.appendChild(row);
  var status = el('p', 'tn-status'); status.setAttribute('role', 'status'); form.appendChild(status);
  form.appendChild(el('p', 'tn-chips-title', 'Popular numbers'));
  var chips = el('div', 'tn-chips');
  POPULAR.forEach(function (n) {
    var c = el('button', 'tn-chip', n); c.type = 'button';
    c.addEventListener('click', function () { input.value = n; show(n, true); });
    chips.appendChild(c);
  });
  form.appendChild(chips);

  var result = el('section', 'tn-result tn-hidden');
  var card = el('div', 'tn-panel tn-angel-card');
  var aiPanel = el('div', 'tn-panel tn-ai');
  aiPanel.appendChild(el('h3', 'tn-h', 'Ask AI for a personal reading'));
  aiPanel.appendChild(el('p', 'tn-ai-note', 'Get a written reading of this number for your situation right now.'));
  var focus = el('select', 'tn-input tn-angel-focus'); focus.id = 'tn-a-focus';
  [['general', 'Life in general'], ['love', 'Love and relationships'], ['work', 'Work and money mindset'], ['growth', 'Personal growth']].forEach(function (o) { focus.appendChild(new Option(o[1], o[0])); });
  var fl = el('label', 'tn-label', 'Focus'); fl.setAttribute('for', 'tn-a-focus');
  var q = el('textarea', 'tn-input'); q.rows = 2; q.maxLength = MAX_Q; q.id = 'tn-a-q';
  q.placeholder = 'Optional: where do you see it, or what is on your mind?';
  var qc = el('div', 'tn-count', '0 / ' + MAX_Q);
  q.addEventListener('input', function () { qc.textContent = q.value.length + ' / ' + MAX_Q; });
  var aiBtn = el('button', 'tn-btn tn-btn-brass tn-ai-btn', 'Ask AI for a personal reading'); aiBtn.type = 'button';
  var loading = el('div', 'tn-loading', 'Listening to your number...'), aiStatus = el('p', 'tn-status');
  [fl, focus, q, qc, aiBtn, loading, aiStatus].forEach(function (n) { aiPanel.appendChild(n); });
  var answer = el('article', 'tn-answer tn-hidden'), answerHead = el('div', 'tn-answer-head'), answerBody = el('div', 'tn-answer-body');
  answer.appendChild(answerHead); answer.appendChild(answerBody);
  [card, aiPanel, answer].forEach(function (n) { result.appendChild(n); });
  root.textContent = ''; root.appendChild(form); root.appendChild(result);
  var quota = TN.createQuota(aiBtn);
  var current = null;

  function show(raw, scroll) {
    status.textContent = ''; status.className = 'tn-status';
    var m = an.get(raw);
    if (!m) { status.textContent = 'Please type a number with 1 to 6 digits, for example 444.'; status.className = 'tn-status is-error'; return; }
    current = m;
    card.textContent = '';
    var top = el('div', 'tn-angel-top');
    top.appendChild(el('div', 'tn-angel-num', m.number));
    var head = el('div');
    head.appendChild(el('div', 'tn-num-label', 'Angel number ' + m.number + (m.builtIn ? '' : ' \u00b7 root ' + m.root)));
    head.appendChild(el('h2', 'tn-angel-title', m.title));
    top.appendChild(head); card.appendChild(top);
    card.appendChild(el('p', 'tn-kw', m.kw));
    card.appendChild(el('p', 'tn-angel-text', m.text));
    if (m.builtIn) {
      var dl = el('dl', 'tn-angel-dl');
      [['In love', m.love], ['In work', m.work], ['Root number', String(m.root)]].forEach(function (x) { dl.appendChild(el('dt', null, x[0])); dl.appendChild(el('dd', null, x[1])); });
      card.appendChild(dl);
    } else {
      var ul = el('ul', 'tn-angel-digits');
      m.digits.forEach(function (dg) { var li = el('li'); li.appendChild(el('b', null, dg + ': ')); li.appendChild(document.createTextNode(an.DIGITS[dg].text)); ul.appendChild(li); });
      card.appendChild(ul);
    }
    answer.classList.add('tn-hidden'); aiStatus.textContent = '';
    aiBtn.textContent = 'Ask AI about ' + m.number;
    result.classList.remove('tn-hidden');
    try { if (w.history && w.history.replaceState) w.history.replaceState(null, '', '#' + m.number); } catch (e) {}
    if (scroll && result.scrollIntoView) result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  form.addEventListener('submit', function (ev) { ev.preventDefault(); show((input.value || '').trim(), true); });

  var printBtn = TN.printButton(result, 'Tarot & Numbers - Angel number reading');
  aiBtn.addEventListener('click', function () {
    aiStatus.textContent = ''; aiStatus.className = 'tn-status';
    if (!current) { aiStatus.textContent = 'Look up a number first.'; return; }
    var question = (q.value || '').trim().slice(0, MAX_Q), m = current, f = focus.value;
    loading.classList.add('on'); aiBtn.disabled = true;
    TN.ask(quota, 'angel', { number: m.number, focus: f }, question).then(function (out) {
      loading.classList.remove('on'); aiBtn.disabled = false;
      if (out.handled) return;
      if (!out.ok) { aiStatus.textContent = out.error; aiStatus.className = 'tn-status is-error'; return; }
      answerHead.textContent = '';
      answerHead.appendChild(el('h2', null, 'Your reading of ' + m.number));
      answerHead.appendChild(el('p', 'tn-asked', 'Focus: ' + focus.options[focus.selectedIndex].text));
      if (question) answerHead.appendChild(el('p', 'tn-asked', 'Question: ' + question));
      TN.renderAnswer(answerBody, out.answer);
      var extra = el('div', 'tn-after'); extra.appendChild(printBtn); extra.appendChild(TN.donateCta()); answerBody.appendChild(extra);
      answer.classList.remove('tn-hidden');
      if (answer.scrollIntoView) answer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  function fromHash(scroll) {
    var h = (w.location.hash || '').replace('#', '');
    if (/^\d{1,6}$/.test(h) && (!current || current.number !== h)) { input.value = h; show(h, scroll); }
  }
  w.addEventListener('hashchange', function () { fromHash(true); });
  fromHash(false);
})(window);
