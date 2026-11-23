/**
 * Tarot & Numbers - Pythagorean numerology math (runs in the browser; Node: new Function(src + 'return createNumerology;')()()).
 *
 * METHOD (documented so results can be checked by hand):
 * - Letters: A J S = 1, B K T = 2, C L U = 3, D M V = 4, E N W = 5, F O X = 6, G P Y = 7, H Q Z = 8, I R = 9.
 *   Accents are stripped (e -> e, n~ -> n, ss -> SS); only A-Z count.
 * - Vowels: A E I O U, plus Y when it sounds like a vowel. Rule used ("auto"):
 *   Y is a CONSONANT when it starts a name part and is followed by a vowel (Yolanda, Yusuf),
 *   or when it sits between two vowels (Maya, Kayode); otherwise Y is a VOWEL (Lynn, Mary, Yvonne, Bryce, Kay).
 *   The user can override with yMode 'vowel' or 'consonant'.
 * - Reduce: add digits until one digit remains, but keep master numbers 11, 22, 33.
 * - Life Path: reduce month, day and year separately (keeping 11/22/33), add the three, reduce again (keeping 11/22/33).
 * - Soul Urge (Heart's Desire): sum of vowels. Personality: sum of consonants. Expression (Destiny): all letters.
 * - Birthday: the day of birth reduced (11 and 22 kept).
 * - Personal Year: reduce(month) + reduce(day) + reduce(current year), reduced to 1-9.
 * - Personal Month: Personal Year + calendar month, reduced to 1-9.
 * - Birth chart (Pythagorean grid): count digits 1-9 in the full birth date (zeros ignored), grid 3 6 9 / 2 5 8 / 1 4 7.
 *   A full line of three = arrow of strength; three empty cells in a line = empty arrow.
 */
function createNumerology() {
  var LETTER = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9, J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8 };
  var PURE_VOWELS = { A: 1, E: 1, I: 1, O: 1, U: 1 };
  var MASTER = [11, 22, 33];

  function normalizeName(name) {
    var s = String(name || '');
    s = s.replace(/\u00df/g, 'ss').replace(/[\u00e6\u00c6]/g, 'ae').replace(/[\u0153\u0152]/g, 'oe').replace(/[\u00f8\u00d8]/g, 'o')
      .replace(/[\u0111\u0110]/g, 'd').replace(/[\u0142\u0141]/g, 'l');
    if (s.normalize) s = s.normalize('NFD');
    s = s.replace(/[\u0300-\u036f]/g, '').toUpperCase();
    return s.replace(/[^A-Z\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function digitSum(n) { var s = 0; String(Math.abs(n)).split('').forEach(function (c) { s += Number(c) || 0; }); return s; }
  function reduce(n, keep) { var k = keep || MASTER; while (n > 9 && k.indexOf(n) === -1) n = digitSum(n); return n; }

  function parseDate(dd, mm, yy) {
    var d = Number(dd), m = Number(mm), y = Number(yy);
    if (!Number.isInteger(d) || !Number.isInteger(m) || !Number.isInteger(y)) return null;
    if (y < 1900 || y > 2100 || m < 1 || m > 12 || d < 1) return null;
    if (d > new Date(Date.UTC(y, m, 0)).getUTCDate()) return null;
    return { d: d, m: m, y: y };
  }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function dateDigits(dt) { return (pad2(dt.m) + pad2(dt.d) + String(dt.y)).split('').map(Number); }

  function lifePath(dt) {
    var parts = [reduce(dt.m), reduce(dt.d), reduce(dt.y)];
    var sum = parts[0] + parts[1] + parts[2];
    return { parts: parts, total: sum, value: reduce(sum) };
  }

  /** Which letters count as vowels. Returns an array of booleans per letter of a single name part. */
  function vowelMask(word, yMode) {
    var mode = yMode || 'auto';
    var out = [];
    for (var i = 0; i < word.length; i++) {
      var ch = word[i];
      if (PURE_VOWELS[ch]) { out.push(true); continue; }
      if (ch !== 'Y') { out.push(false); continue; }
      if (mode === 'vowel') { out.push(true); continue; }
      if (mode === 'consonant') { out.push(false); continue; }
      var prev = word[i - 1], next = word[i + 1];
      var startCons = i === 0 && next && PURE_VOWELS[next];
      var between = prev && next && PURE_VOWELS[prev] && PURE_VOWELS[next];
      out.push(!(startCons || between));
    }
    return out;
  }

  function nameNumbers(name, yMode) {
    var words = normalizeName(name).split(' ').filter(Boolean);
    var all = 0, vow = 0, con = 0, letters = 0, detail = [];
    words.forEach(function (wd) {
      var mask = vowelMask(wd, yMode);
      for (var i = 0; i < wd.length; i++) {
        var v = LETTER[wd[i]]; if (!v) continue;
        letters++; all += v;
        if (mask[i]) vow += v; else con += v;
        detail.push({ ch: wd[i], v: v, vowel: mask[i] });
      }
    });
    return {
      letters: letters, detail: detail,
      soul: { total: vow, value: vow ? reduce(vow) : 0 },
      personality: { total: con, value: con ? reduce(con) : 0 },
      expression: { total: all, value: all ? reduce(all) : 0 }
    };
  }
  function birthdayNumber(d) { return reduce(d, [11, 22]); }
  function personalYear(dt, year) { return reduce(reduce(dt.m, []) + reduce(dt.d, []) + reduce(year, []), []); }
  function personalMonth(py, month) { return reduce(py + month, []); }

  var ARROWS = [
    { key: '123', nums: [1, 2, 3], name: 'Arrow of Planning', text: 'You like order and think before you act; plans tend to come naturally.' },
    { key: '456', nums: [4, 5, 6], name: 'Arrow of Will', text: 'Strong determination: once you commit, you see it through.' },
    { key: '789', nums: [7, 8, 9], name: 'Arrow of Activity', text: 'You learn by doing and rarely sit still for long.' },
    { key: '369', nums: [3, 6, 9], name: 'Arrow of the Intellect', text: 'A quick, reflective mind with a good memory.' },
    { key: '258', nums: [2, 5, 8], name: 'Arrow of Emotional Balance', text: 'You read feelings well and can stay calm under pressure.' },
    { key: '147', nums: [1, 4, 7], name: 'Arrow of Practicality', text: 'Hands-on and grounded: you turn ideas into real results.' },
    { key: '159', nums: [1, 5, 9], name: 'Arrow of Determination', text: 'Persistent toward goals, even when progress is slow.' },
    { key: '357', nums: [3, 5, 7], name: 'Arrow of Spirituality', text: 'Sensitive to the unseen, compassionate and intuitive.' }
  ];
  var EMPTY_ARROWS = [
    { key: '456', nums: [4, 5, 6], name: 'Empty Arrow of Frustration', text: 'Disappointment can build up quietly; naming it early helps.' },
    { key: '789', nums: [7, 8, 9], name: 'Empty Arrow of Hesitation', text: 'Starting can feel hard; small daily steps break the pattern.' },
    { key: '369', nums: [3, 6, 9], name: 'Empty Arrow of Poor Memory', text: 'Details slip easily; notes and lists are your friends.' },
    { key: '258', nums: [2, 5, 8], name: 'Empty Arrow of Sensitivity', text: 'You can be easily hurt by words; supportive people matter.' },
    { key: '147', nums: [1, 4, 7], name: 'Empty Arrow of Disorder', text: 'Routines may not come naturally; build them gently.' },
    { key: '159', nums: [1, 5, 9], name: 'Empty Arrow of Procrastination', text: 'Breaking big goals into small pieces makes it easier to begin.' },
    { key: '357', nums: [3, 5, 7], name: 'Empty Arrow of Scepticism', text: 'You want proof before belief; a little trust can open doors.' }
  ];
  var MISSING = {
    1: 'Missing 1: speaking up for yourself may take practice.',
    2: 'Missing 2: intuition and emotional sensitivity can be developed.',
    3: 'Missing 3: memory and clear expression benefit from training.',
    4: 'Missing 4: order and practical habits may need attention.',
    5: 'Missing 5: confidence in your own decisions can grow with practice.',
    6: 'Missing 6: showing care at home may need conscious effort.',
    7: 'Missing 7: life tends to teach through experience rather than theory.',
    8: 'Missing 8: keeping promises and managing money deserve care.',
    9: 'Missing 9: nurture long-term ideals and a wider view.'
  };

  function birthChart(dt) {
    var counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    dateDigits(dt).forEach(function (x) { if (x > 0) counts[x - 1] += 1; });
    var has = function (n) { return counts[n - 1] > 0; };
    return {
      counts: counts,
      arrows: ARROWS.filter(function (a) { return a.nums.every(has); }),
      emptyArrows: EMPTY_ARROWS.filter(function (a) { return a.nums.every(function (n) { return !has(n); }); }),
      missing: [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(function (n) { return !has(n); })
    };
  }

  function compute(input) {
    var dt = parseDate(input.day, input.month, input.year);
    if (!dt) throw new Error('Please enter a valid date of birth.');
    var nm = normalizeName(input.name);
    if (nm.replace(/\s/g, '').length < 2) throw new Error('Please enter your full name.');
    var now = input.now || {};
    var yNow = Number(now.y) || new Date().getFullYear();
    var mNow = Number(now.m) || (new Date().getMonth() + 1);
    var nn = nameNumbers(nm, input.yMode);
    var py = personalYear(dt, yNow);
    return {
      date: dt, nameNormalized: nm, yMode: input.yMode || 'auto', letters: nn.detail,
      lifePath: lifePath(dt), soul: nn.soul, personality: nn.personality, expression: nn.expression,
      birthday: { total: dt.d, value: birthdayNumber(dt.d) },
      personalYear: { year: yNow, value: py },
      personalMonth: { year: yNow, month: mNow, value: personalMonth(py, mNow) },
      chart: birthChart(dt)
    };
  }

  return { normalizeName: normalizeName, reduce: reduce, digitSum: digitSum, parseDate: parseDate, lifePath: lifePath,
    vowelMask: vowelMask, nameNumbers: nameNumbers, birthdayNumber: birthdayNumber, personalYear: personalYear,
    personalMonth: personalMonth, birthChart: birthChart, compute: compute, ARROWS: ARROWS, EMPTY_ARROWS: EMPTY_ARROWS,
    MISSING: MISSING, LETTER: LETTER, VALID_LIFE: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33] };
}
