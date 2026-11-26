/**
 * Tarot & Numbers - Love Compatibility. Needs tn-core.js and zodiac.js loaded first.
 * Mount: <div id="tn-compat"></div>
 * A plain sign pair gets a shared reading (free, cached on the server). Adding names, birth dates
 * or a question makes it a personal reading, which uses the reader's free AI reading.
 */
(function (w) {
  'use strict';
  var root = document.getElementById('tn-compat');
  if (!root || !w.TN || typeof createZodiac !== 'function') return;
  var TN = w.TN, el = TN.el, z = createZodiac(), d = document, MAX_Q = 200;
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  var form = el('form', 'tn-panel tn-form'); form.noValidate = true;
  function field(labelText, input, id) {
    var wrap = el('div', 'tn-field'); var l = el('label', 'tn-label', labelText); l.setAttribute('for', id); input.id = id;
    wrap.appendChild(l); wrap.appendChild(input); return wrap;
  }
  function person(key, title) {
    var box = el('fieldset', 'tn-person');
    box.appendChild(el('legend', null, title));
    var sign = el('select', 'tn-input');
    sign.appendChild(new Option('Choose a sign', ''));
    z.signs.forEach(function (s) { sign.appendChild(new Option(s.glyph + ' ' + s.name + ' (' + s.dates + ')', s.id)); });
    box.appendChild(field('Zodiac sign', sign, 'tn-c-' + key + '-sign'));
    var extra = el('div', 'tn-person-extra tn-hidden');
    var name = el('input', 'tn-input'); name.type = 'text'; name.maxLength = 20; name.placeholder = 'First name (optional)'; name.autocomplete = 'off';
    extra.appendChild(field('First name', name, 'tn-c-' + key + '-name'));
    var row = el('div', 'tn-row3');
    var m = el('select', 'tn-input'), dd = el('select', 'tn-input'), y = el('input', 'tn-input');
    m.appendChild(new Option('Month', '')); dd.appendChild(new Option('Day', ''));
    MONTHS.forEach(function (mn, k) { m.appendChild(new Option(mn, String(k + 1))); });
    for (var i = 1; i <= 31; i++) dd.appendChild(new Option(String(i), String(i)));
    y.type = 'text'; y.inputMode = 'numeric'; y.maxLength = 4; y.placeholder = 'YYYY';
    row.appendChild(field('Birth month', m, 'tn-c-' + key + '-m')); row.appendChild(field('Day', dd, 'tn-c-' + key + '-d')); row.appendChild(field('Year', y, 'tn-c-' + key + '-y'));
    extra.appendChild(row);
    box.appendChild(extra);
    function syncSign() { if (m.value && dd.value) sign.value = z.signFromDate(+m.value, +dd.value); }
    m.addEventListener('change', syncSign); dd.addEventListener('change', syncSign);
    return { box: box, sign: sign, extra: extra, name: name, m: m, d: dd, y: y };
  }
  var A = person('a', 'You'), B = person('b', 'Your partner or crush');
  var pair = el('div', 'tn-pair'); pair.appendChild(A.box); pair.appendChild(el('div', 'tn-pair-amp', '+')); pair.appendChild(B.box);
  form.appendChild(pair);
  var more = el('button', 'tn-link tn-more-toggle', 'Add names and birth dates for a personal reading (optional)'); more.type = 'button';
  more.addEventListener('click', function () {
    var on = A.extra.classList.contains('tn-hidden');
    A.extra.classList.toggle('tn-hidden', !on); B.extra.classList.toggle('tn-hidden', !on);
    more.textContent = on ? 'Hide names and birth dates' : 'Add names and birth dates for a personal reading (optional)';
    updateMode();
  });
  form.appendChild(more);
  var go = el('button', 'tn-btn tn-btn-brass', 'Check our match'); go.type = 'submit';
  var acts = el('div', 'tn-actions'); acts.appendChild(go); form.appendChild(acts);
  var status = el('p', 'tn-status'); status.setAttribute('role', 'status'); form.appendChild(status);

  var result = el('section', 'tn-result tn-hidden');
  var title = el('h2', 'tn-result-title');
  var summary = el('div', 'tn-panel tn-compat-sum');
  var aiPanel = el('div', 'tn-panel tn-ai');
  aiPanel.appendChild(el('h3', 'tn-h', 'Your AI love reading'));
  var modeNote = el('p', 'tn-ai-note');
  var q = el('textarea', 'tn-input'); q.rows = 2; q.maxLength = MAX_Q; q.id = 'tn-c-q';
  q.placeholder = 'Optional: e.g. How can we communicate better?';
  var qc = el('div', 'tn-count', '0 / ' + MAX_Q);
  var aiBtn = el('button', 'tn-btn tn-btn-brass tn-ai-btn', 'Get our reading'); aiBtn.type = 'button';
  var loading = el('div', 'tn-loading', 'Reading your stars...'), aiStatus = el('p', 'tn-status');
  [modeNote, q, qc, aiBtn, loading, aiStatus].forEach(function (n) { aiPanel.appendChild(n); });
  var answer = el('article', 'tn-answer tn-hidden'), answerHead = el('div', 'tn-answer-head'), answerBody = el('div', 'tn-answer-body');
  answer.appendChild(answerHead); answer.appendChild(answerBody);
  [title, summary, aiPanel, answer].forEach(function (n) { result.appendChild(n); });
  root.textContent = ''; root.appendChild(form); root.appendChild(result);
  var quota = TN.createQuota(aiBtn);
  var current = null;

  function readPerson(P, label) {
    var name = (P.name.value || '').trim().replace(/[^A-Za-z\u00C0-\u024F'-]/g, '').slice(0, 20);
    var birth = '';
    var any = P.m.value || P.d.value || (P.y.value || '').trim();
    if (any) {
      if (!P.m.value || !P.d.value || !/^\d{4}$/.test((P.y.value || '').trim())) throw new Error('Please complete the birth date for ' + label + ' (month, day and 4-digit year), or leave it empty.');
      var yy = +P.y.value.trim(), mm = +P.m.value, dd = +P.d.value, dt = new Date(Date.UTC(yy, mm - 1, dd));
      if (yy < 1900 || dt.getUTCMonth() !== mm - 1 || dt > new Date()) throw new Error('The birth date for ' + label + ' does not look right.');
      birth = yy + '-' + ('0' + mm).slice(-2) + '-' + ('0' + dd).slice(-2);
      P.sign.value = z.signFromDate(mm, dd);
    }
    if (!P.sign.value) throw new Error('Please choose a sign for ' + label + '.');
    var o = { sign: P.sign.value };
    if (name) o.name = name.charAt(0).toUpperCase() + name.slice(1);
    if (birth) o.birth = birth;
    return o;
  }
  function personal() { return !!(current && (current.a.name || current.a.birth || current.b.name || current.b.birth || (q.value || '').trim())); }
  function updateMode() {
    if (!current) return;
    var p = personal();
    modeNote.textContent = p ? 'Personal reading: uses your free AI reading (names, birth dates and your question are included).'
      : 'The ' + z.byId[current.a.sign].name + ' + ' + z.byId[current.b.sign].name + ' reading is free for everyone. Add names, birth dates or a question for a personal reading.';
    aiBtn.textContent = p ? 'Get our personal reading' : 'Read the full ' + z.byId[current.a.sign].name + ' + ' + z.byId[current.b.sign].name + ' match';
  }
  q.addEventListener('input', function () { qc.textContent = q.value.length + ' / ' + MAX_Q; updateMode(); });

  function render() {
    var a = z.byId[current.a.sign], b = z.byId[current.b.sign], rel = z.relation(a.id, b.id);
    var nA = current.a.name || a.name, nB = current.b.name || b.name;
    title.textContent = a.glyph + ' ' + nA + ' + ' + nB + ' ' + b.glyph;
    summary.textContent = '';
    var cols = el('div', 'tn-compat-cols');
    [[a, current.a], [b, current.b]].forEach(function (x) {
      var c = el('div', 'tn-compat-sign');
      c.appendChild(el('div', 'tn-zbig', x[0].glyph));
      c.appendChild(el('h3', null, x[0].name + (x[1].name ? ' (' + x[1].name + ')' : '')));
      c.appendChild(el('p', 'tn-kw', x[0].element + ' \u00b7 ' + x[0].modality));
      c.appendChild(el('p', null, x[0].kw));
      cols.appendChild(c);
    });
    summary.appendChild(cols);
    var dl = el('dl', 'tn-angel-dl');
    [['Angle: ' + rel.name, rel.text], ['Elements: ' + a.element + ' + ' + b.element, z.elementMatch(a.id, b.id)]].forEach(function (x) { dl.appendChild(el('dt', null, x[0])); dl.appendChild(el('dd', null, x[1])); });
    summary.appendChild(dl);
    answer.classList.add('tn-hidden'); aiStatus.textContent = '';
    updateMode();
    result.classList.remove('tn-hidden');
  }
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    status.textContent = ''; status.className = 'tn-status';
    try { current = { a: readPerson(A, 'you'), b: readPerson(B, 'your partner') }; }
    catch (e) { status.textContent = e.message; status.className = 'tn-status is-error'; return; }
    render();
    if (result.scrollIntoView) result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  var printBtn = TN.printButton(result, 'Tarot & Numbers - Love compatibility reading');
  aiBtn.addEventListener('click', function () {
    aiStatus.textContent = ''; aiStatus.className = 'tn-status';
    if (!current) { aiStatus.textContent = 'Choose both signs first.'; return; }
    var question = (q.value || '').trim().slice(0, MAX_Q), p = personal(), c = current;
    loading.classList.add('on'); aiBtn.disabled = true;
    TN.ask(p ? quota : null, 'compat', { a: c.a, b: c.b }, p ? question : '').then(function (out) {
      loading.classList.remove('on'); aiBtn.disabled = false;
      if (out.handled) return;
      if (!out.ok) { aiStatus.textContent = out.error; aiStatus.className = 'tn-status is-error'; return; }
      var a = z.byId[c.a.sign], b = z.byId[c.b.sign];
      answerHead.textContent = '';
      answerHead.appendChild(el('h2', null, p ? 'Your love compatibility reading' : a.name + ' and ' + b.name + ' compatibility'));
      if (c.a.name || c.b.name) answerHead.appendChild(el('p', 'tn-asked', (c.a.name ? c.a.name + ' (' + a.name + ')' : a.name) + ' + ' + (c.b.name ? c.b.name + ' (' + b.name + ')' : b.name)));
      if (p && question) answerHead.appendChild(el('p', 'tn-asked', 'Question: ' + question));
      TN.renderAnswer(answerBody, out.answer);
      var extra = el('div', 'tn-after'); extra.appendChild(printBtn); extra.appendChild(TN.donateCta()); answerBody.appendChild(extra);
      answer.classList.remove('tn-hidden');
      if (answer.scrollIntoView) answer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  var h = (w.location.hash || '').replace('#', '').toLowerCase().split('-');
  if (z.byId[h[0]]) A.sign.value = h[0];
  if (h[1] && z.byId[h[1]]) B.sign.value = h[1];
})(window);
