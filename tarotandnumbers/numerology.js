/**
 * Tarot & Numbers - Numerology tool. Needs tn-core.js and numerology-core.js loaded first.
 * Mount: <div id="tn-numerology"></div>
 */
(function (w) {
  'use strict';
  var root = document.getElementById('tn-numerology');
  if (!root || !w.TN || typeof createNumerology !== 'function') return;
  var TN = w.TN, el = TN.el, nm = createNumerology(), MAX_Q = 200;
  var IMG_BASE = (w.TN_CONFIG || {}).imgBase || 'https://chitrungtran.github.io/retro-games/tarotandnumbers/img/';

  var MEANING = {
    1: { title: 'The Initiator', kw: 'independence, drive, originality', text: 'One is the first step: self-starting, direct and willing to lead. Growth comes from trusting your own voice while staying open to others.' },
    2: { title: 'The Peacemaker', kw: 'cooperation, sensitivity, partnership', text: 'Two notices what others miss. Tactful and caring, you thrive in partnership; your lesson is to keep your own needs in view.' },
    3: { title: 'The Communicator', kw: 'expression, joy, creativity', text: 'Three brings words, colour and humour. Creative expression is your fuel; focus turns many sparks into lasting work.' },
    4: { title: 'The Builder', kw: 'stability, discipline, reliability', text: 'Four lays foundations. Patient and practical, you build things that last; flexibility keeps structure from becoming a cage.' },
    5: { title: 'The Explorer', kw: 'freedom, change, curiosity', text: 'Five wants to experience everything. Adaptable and adventurous, you learn by doing; healthy limits make freedom sustainable.' },
    6: { title: 'The Nurturer', kw: 'care, responsibility, harmony', text: 'Six holds home and community together. Loving and dependable, you are asked to care for yourself as well as you care for others.' },
    7: { title: 'The Seeker', kw: 'reflection, insight, depth', text: 'Seven looks beneath the surface. Analytical and intuitive, you need quiet time; sharing what you find keeps you connected.' },
    8: { title: 'The Achiever', kw: 'ambition, power, material mastery', text: 'Eight understands effort and reward. Capable and strategic, you can build real success; integrity keeps that power balanced.' },
    9: { title: 'The Humanitarian', kw: 'compassion, wisdom, completion', text: 'Nine sees the bigger picture. Generous and idealistic, you are drawn to serve; letting go of the past frees your energy.' },
    11: { title: 'The Intuitive (Master 11)', kw: 'inspiration, intuition, sensitivity', text: 'Eleven carries the gentleness of 2 with a heightened sense of insight. It can feel intense; grounding habits help the inspiration land.' },
    22: { title: 'The Master Builder (Master 22)', kw: 'vision made real, large-scale work', text: 'Twenty-two pairs big vision with practical skill. The potential is large and so is the pressure; steady steps matter more than speed.' },
    33: { title: 'The Master Teacher (Master 33)', kw: 'compassion, guidance, service', text: 'Thirty-three amplifies the care of 6 into teaching and healing. Its lesson is to serve without losing yourself.' }
  };
  var CYCLE = {
    1: 'A year of beginnings: plant seeds, start projects and choose a direction.',
    2: 'A year of patience and partnership: cooperate, listen and let things grow.',
    3: 'A year of expression: create, socialise and share your ideas.',
    4: 'A year of building: work steadily, organise and strengthen foundations.',
    5: 'A year of change: expect movement, travel or new freedom; stay flexible.',
    6: 'A year of responsibility and love: home, family and commitments come first.',
    7: 'A year of reflection: study, rest and look inward before the next push.',
    8: 'A year of results: career, money and decisions about power and effort.',
    9: 'A year of completion: finish, release and make room for a new cycle.'
  };
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  /* ---------- form ---------- */
  var form = el('form', 'tn-panel tn-form'); form.noValidate = true;
  function field(labelText, input, id) {
    var wrap = el('div', 'tn-field'); var l = el('label', 'tn-label', labelText); l.setAttribute('for', id); input.id = id;
    wrap.appendChild(l); wrap.appendChild(input); return wrap;
  }
  var nameIn = el('input', 'tn-input'); nameIn.type = 'text'; nameIn.autocomplete = 'name'; nameIn.maxLength = 80;
  nameIn.placeholder = 'Full name at birth, e.g. Anna Maria Lopez';
  var day = el('select', 'tn-input'), month = el('select', 'tn-input'), year = el('input', 'tn-input');
  year.type = 'text'; year.inputMode = 'numeric'; year.maxLength = 4; year.placeholder = 'YYYY'; year.autocomplete = 'bday-year';
  day.appendChild(new Option('Day', '')); month.appendChild(new Option('Month', ''));
  for (var i = 1; i <= 31; i++) day.appendChild(new Option(String(i), String(i)));
  MONTHS.forEach(function (m, k) { month.appendChild(new Option(m, String(k + 1))); });
  var yMode = el('select', 'tn-input');
  [['auto', 'Automatic (by sound)'], ['vowel', 'Always a vowel'], ['consonant', 'Always a consonant']].forEach(function (o) { yMode.appendChild(new Option(o[1], o[0])); });

  form.appendChild(field('Full name at birth', nameIn, 'tn-n-name'));
  var row = el('div', 'tn-row3');
  row.appendChild(field('Month', month, 'tn-n-month')); row.appendChild(field('Day', day, 'tn-n-day')); row.appendChild(field('Year', year, 'tn-n-year'));
  form.appendChild(row);
  var yf = field('Treat the letter Y as', yMode, 'tn-n-y'); yf.classList.add('tn-field-small'); form.appendChild(yf);
  var go = el('button', 'tn-btn tn-btn-brass', 'Calculate my numbers'); go.type = 'submit';
  var acts = el('div', 'tn-actions'); acts.appendChild(go); form.appendChild(acts);
  var status = el('p', 'tn-status'); status.setAttribute('role', 'status'); form.appendChild(status);

  var result = el('section', 'tn-result tn-hidden');
  var title = el('h2', 'tn-result-title'), cards = el('div', 'tn-num-cards');
  var chartWrap = el('div', 'tn-chart-wrap'), chartH = el('h3', 'tn-h', 'Birth chart'), grid = el('div', 'tn-grid'), arrows = el('div', 'tn-arrows');
  var chartBox = el('div', 'tn-keep'); chartBox.appendChild(chartH); chartBox.appendChild(grid); chartWrap.appendChild(chartBox); chartWrap.appendChild(arrows);
  var aiPanel = el('div', 'tn-panel tn-ai');
  aiPanel.appendChild(el('h3', 'tn-h', 'Ask about your numbers'));
  var q = el('textarea', 'tn-input'); q.rows = 2; q.maxLength = MAX_Q; q.id = 'tn-n-q';
  q.placeholder = 'Optional: e.g. What do my numbers say about the work that suits me?';
  var qc = el('div', 'tn-count', '0 / ' + MAX_Q);
  q.addEventListener('input', function () { qc.textContent = q.value.length + ' / ' + MAX_Q; });
  var aiBtn = el('button', 'tn-btn tn-btn-brass tn-ai-btn', 'Get my AI reading'); aiBtn.type = 'button';
  var loading = el('div', 'tn-loading', 'Reading your numbers...'), aiStatus = el('p', 'tn-status');
  [q, qc, aiBtn, loading, aiStatus].forEach(function (n) { aiPanel.appendChild(n); });
  var answer = el('article', 'tn-answer tn-hidden'), answerHead = el('div', 'tn-answer-head'), answerBody = el('div', 'tn-answer-body');
  answer.appendChild(answerHead); answer.appendChild(answerBody);
  [title, cards, chartWrap, aiPanel, answer].forEach(function (n) { result.appendChild(n); });
  root.textContent = ''; root.appendChild(form); root.appendChild(result);
  var quota = TN.createQuota(aiBtn);
  var current = null;

  function numCard(label, n, main, how, textOverride) {
    var m = MEANING[n];
    var c = el('div', 'tn-num-card' + (main ? ' is-main' : ''));
    var top = el('div', 'tn-num-top');
    var badge = el('div', 'tn-num', n ? String(n) : '-');
    if (MEANING[n]) {
      var bi = el('img'); bi.alt = ''; bi.width = 56; bi.height = 56; bi.decoding = 'async';
      bi.addEventListener('load', function () { badge.textContent = ''; badge.classList.add('has-img'); badge.appendChild(bi); });
      bi.src = IMG_BASE + 'badges/badge-' + n + '.png';
    }
    badge.setAttribute('aria-label', 'Number ' + n);
    top.appendChild(badge);
    var head = el('div'); head.appendChild(el('div', 'tn-num-label', label));
    if (m && !textOverride) head.appendChild(el('div', 'tn-num-title', m.title));
    top.appendChild(head); c.appendChild(top);
    if (textOverride) c.appendChild(el('p', null, textOverride));
    else if (m) { c.appendChild(el('p', 'tn-kw', m.kw)); c.appendChild(el('p', null, m.text)); }
    else c.appendChild(el('p', null, 'No letters of this kind in the name.'));
    if (how) c.appendChild(el('p', 'tn-how', how));
    cards.appendChild(c);
  }
  function renderChart(ch) {
    grid.textContent = '';
    [3, 6, 9, 2, 5, 8, 1, 4, 7].forEach(function (n) {
      var k = ch.counts[n - 1], cell = el('div', 'tn-cell' + (k ? '' : ' is-empty'));
      cell.appendChild(el('span', 'tn-cell-n', k ? new Array(k + 1).join(String(n)) : String(n)));
      cell.appendChild(el('small', null, k ? (k + (k > 1 ? ' times' : ' time')) : 'missing'));
      grid.appendChild(cell);
    });
    grid.setAttribute('aria-label', 'Birth chart: ' + ch.counts.map(function (k, i) { return (i + 1) + ' appears ' + k + ' times'; }).join(', '));
    arrows.textContent = '';
    function group(h, items, none) {
      arrows.appendChild(el('h4', null, h)); var ul = el('ul');
      if (!items.length) ul.appendChild(el('li', 'tn-none', none));
      items.forEach(function (it) { var li = el('li'); if (it.b) { li.appendChild(el('b', null, it.b)); li.appendChild(document.createTextNode(': ')); } li.appendChild(document.createTextNode(it.t)); ul.appendChild(li); });
      arrows.appendChild(ul);
    }
    group('Arrows of strength', ch.arrows.map(function (a) { return { b: a.name + ' (' + a.nums.join('-') + ')', t: a.text }; }), 'No complete line of three.');
    group('Empty arrows', ch.emptyArrows.map(function (a) { return { b: a.name + ' (' + a.nums.join('-') + ')', t: a.text }; }), 'No empty lines.');
    group('Missing numbers', ch.missing.map(function (n) { return { t: nm.MISSING[n] }; }), 'Every number from 1 to 9 appears.');
  }
  function render(r) {
    cards.textContent = '';
    title.textContent = 'The numbers of ' + r.displayName;
    var lp = r.lifePath;
    numCard('Life Path', lp.value, true, 'Month ' + lp.parts[0] + ' + day ' + lp.parts[1] + ' + year ' + lp.parts[2] + ' = ' + lp.total + (lp.total !== lp.value ? ' -> ' + lp.value : ''));
    numCard('Expression (Destiny)', r.expression.value, false, 'All letters = ' + r.expression.total);
    numCard('Soul Urge (Heart\'s Desire)', r.soul.value, false, 'Vowels = ' + r.soul.total);
    numCard('Personality', r.personality.value, false, 'Consonants = ' + r.personality.total);
    numCard('Birthday', r.birthday.value, false, 'Day ' + r.birthday.total);
    numCard('Personal Year ' + r.personalYear.year, r.personalYear.value, false, '', CYCLE[r.personalYear.value]);
    numCard('Personal Month: ' + MONTHS[r.personalMonth.month - 1], r.personalMonth.value, false, '',
      CYCLE[r.personalMonth.value].replace(/^A year/, 'A month'));
    renderChart(r.chart);
    result.classList.remove('tn-hidden');
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    status.textContent = ''; status.className = 'tn-status';
    var name = (nameIn.value || '').trim();
    if (nm.normalizeName(name).replace(/\s/g, '').length < 2) { status.textContent = 'Please enter your full name.'; status.className = 'tn-status is-error'; return; }
    if (!day.value || !month.value || !/^\d{4}$/.test(year.value || '')) { status.textContent = 'Please choose your month and day of birth and type the year (4 digits).'; status.className = 'tn-status is-error'; return; }
    var now = new Date();
    try {
      current = nm.compute({ name: name, day: day.value, month: month.value, year: year.value, yMode: yMode.value, now: { y: now.getFullYear(), m: now.getMonth() + 1 } });
    } catch (e) { status.textContent = e.message; status.className = 'tn-status is-error'; return; }
    current.displayName = name.replace(/\s+/g, ' ');
    current.birth = MONTHS[current.date.m - 1] + ' ' + current.date.d + ', ' + current.date.y;
    answer.classList.add('tn-hidden'); aiStatus.textContent = '';
    render(current);
    if (result.scrollIntoView) result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /** Only the first name is sent (to address the reader naturally); the full name and birth date never leave the browser. */
  function firstName(full) {
    var w0 = (String(full || '').trim().split(/\s+/)[0] || '').replace(/[^A-Za-z\u00C0-\u024F'-]/g, '').slice(0, 20);
    return w0 ? w0.charAt(0).toUpperCase() + w0.slice(1) : '';
  }
  var printBtn = TN.printButton(result, 'Tarot & Numbers - Numerology reading');
  aiBtn.addEventListener('click', function () {
    aiStatus.textContent = ''; aiStatus.className = 'tn-status';
    if (!current) { aiStatus.textContent = 'Calculate your numbers first.'; return; }
    var question = (q.value || '').trim().slice(0, MAX_Q);
    loading.classList.add('on'); aiBtn.disabled = true;
    var r = current;
    TN.ask(quota, 'numerology', {
      firstName: firstName(r.displayName), lifePath: r.lifePath.value, expression: r.expression.value, soulUrge: r.soul.value,
      personality: r.personality.value, birthday: r.birthday.value, personalYear: r.personalYear.value, personalMonth: r.personalMonth.value,
      year: r.personalYear.year, month: r.personalMonth.month, chart: r.chart.counts.slice()
    }, question).then(function (out) {
      loading.classList.remove('on'); aiBtn.disabled = false;
      if (out.handled) return;
      if (!out.ok) { aiStatus.textContent = out.error; aiStatus.className = 'tn-status is-error'; return; }
      answerHead.textContent = '';
      answerHead.appendChild(el('h2', null, 'Your numerology reading'));
      answerHead.appendChild(el('p', 'tn-asked', r.displayName + ' \u00b7 born ' + r.birth + ' \u00b7 Life Path ' + r.lifePath.value));
      if (question) answerHead.appendChild(el('p', 'tn-asked', 'Question: ' + question));
      TN.renderAnswer(answerBody, out.answer);
      var extra = el('div', 'tn-after'); extra.appendChild(printBtn); extra.appendChild(TN.donateCta()); answerBody.appendChild(extra);
      answer.classList.remove('tn-hidden');
      if (answer.scrollIntoView) answer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  w.TN_NUM_MEANING = MEANING;
})(window);
