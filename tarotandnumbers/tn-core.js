/**
 * Tarot & Numbers - shared client: reading quota (Google Sign-In), AI reading request,
 * answer rendering, print/PDF and the donate call-to-action. ASCII only (safe inside Blogger).
 * Configure once per page before loading: window.TN_CONFIG = { apiBase: 'https://...workers.dev' }
 */
(function (w) {
  'use strict';
  var CFG = w.TN_CONFIG || {};
  var API_BASE = (CFG.apiBase || 'https://tarotandnumbers-api.huyencocac.workers.dev').replace(/\/+$/, '');
  var DONATE_URL = CFG.donateUrl || '/p/donate.html';
  var TOKEN_KEY = 'tn_google_idt';
  var d = document;

  function el(tag, cls, text) {
    var e = d.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function store() { try { return w.localStorage; } catch (e) { return null; } }
  function deviceZone() { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'; } catch (e) { return 'UTC'; } }

  /* ---------------- Quota + Google Sign-In ---------------- */
  function createQuota(mountBefore) {
    var st = { quota: null, token: null, exp: 0, email: '', clientId: null, gsiReady: false, gsiLoading: false, queue: [] };
    var box = el('div', 'tn-quota'), line = el('div', 'tn-quota-line', 'Checking your free readings...');
    var hint = el('div', 'tn-quota-hint'), gbtn = el('div', 'tn-quota-gbtn'), who = el('div', 'tn-quota-who'), msg = el('div', 'tn-quota-msg');
    box.appendChild(line); box.appendChild(hint); box.appendChild(gbtn); box.appendChild(who); box.appendChild(msg);
    if (mountBefore && mountBefore.parentNode) mountBefore.parentNode.insertBefore(box, mountBefore);

    (function restore() {
      var s = store(); if (!s) return;
      try {
        var o = JSON.parse(s.getItem(TOKEN_KEY) || 'null');
        if (o && o.t && o.exp * 1000 > Date.now() + 30000) { st.token = o.t; st.exp = o.exp; st.email = o.email || ''; }
        else s.removeItem(TOKEN_KEY);
      } catch (e) {}
    })();
    function save() {
      var s = store(); if (!s) return;
      try { if (st.token) s.setItem(TOKEN_KEY, JSON.stringify({ t: st.token, exp: st.exp, email: st.email })); else s.removeItem(TOKEN_KEY); } catch (e) {}
    }
    function signedIn() { return !!st.token && st.exp * 1000 > Date.now(); }
    function setMsg(t) { msg.textContent = t || ''; }

    function render() {
      var q = st.quota;
      who.textContent = ''; hint.textContent = '';
      if (!q) { line.textContent = ''; showButton(!signedIn()); return; }
      if (q.unlimited) line.textContent = 'Unlimited readings (admin).';
      else if (q.signedIn) {
        line.textContent = q.remaining > 0 ? 'You have 1 free AI reading today.' : 'You have used today\'s free reading.';
        hint.textContent = q.remaining > 0 ? '' : 'Your next free reading unlocks at midnight UTC.';
      } else {
        line.textContent = q.remaining > 0 ? 'Guests get 1 free AI reading.' : 'You have used your free guest reading.';
        hint.textContent = st.clientId ? 'Sign in with Google for 1 free reading every day.' : '';
      }
      if (q.signedIn) {
        who.appendChild(d.createTextNode('Signed in as ' + (q.email || st.email) + ' \u00b7 '));
        var out = el('button', 'tn-link', 'Sign out'); out.type = 'button';
        out.addEventListener('click', signOut); who.appendChild(out);
      }
      showButton(!q.signedIn);
    }
    function showButton(on) {
      var show = on && !!st.clientId;
      gbtn.style.display = show ? '' : 'none';
      if (show) loadGsi(function () {
        try {
          gbtn.textContent = '';
          var width = Math.min(320, Math.max(200, (box.clientWidth || 320) - 24));
          w.google.accounts.id.renderButton(gbtn, { type: 'standard', theme: 'filled_black', size: 'large', shape: 'pill', text: 'signin_with', width: width, locale: 'en' });
        } catch (e) {}
      });
    }
    function loadGsi(cb) {
      if (st.gsiReady) return cb();
      st.queue.push(cb);
      if (st.gsiLoading || !st.clientId) return;
      st.gsiLoading = true;
      var s = d.createElement('script');
      s.src = 'https://accounts.google.com/gsi/client?hl=en'; s.async = true; s.defer = true;
      s.onload = function () {
        try {
          w.google.accounts.id.initialize({ client_id: st.clientId, callback: onCredential, auto_select: false, cancel_on_tap_outside: true, itp_support: true, use_fedcm_for_prompt: true });
          st.gsiReady = true;
        } catch (e) { st.gsiReady = false; }
        var q = st.queue; st.queue = [];
        if (st.gsiReady) q.forEach(function (f) { try { f(); } catch (e) {} });
      };
      s.onerror = function () { st.gsiLoading = false; };
      d.head.appendChild(s);
    }
    function onCredential(resp) {
      var t = resp && resp.credential; if (!t) return;
      try {
        var p = JSON.parse(atob(t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
        st.token = t; st.exp = p.exp || 0; st.email = p.email || '';
      } catch (e) { return; }
      save(); setMsg(''); refresh();
    }
    function signOut() {
      st.token = null; st.exp = 0; st.email = ''; save();
      try { w.google && w.google.accounts && w.google.accounts.id.disableAutoSelect(); } catch (e) {}
      refresh();
    }
    function headers() { var h = {}; if (signedIn()) h.Authorization = 'Bearer ' + st.token; return h; }
    function apply(data) {
      data = data || {};
      var cid = data.clientId && /\.apps\.googleusercontent\.com$/.test(data.clientId) ? data.clientId : null;
      if (cid) st.clientId = cid; else if (data.signInEnabled === false || data.clientId) st.clientId = null;
      if (data.quota) st.quota = data.quota; else if ('remaining' in data) st.quota = data;
    }
    function refresh() {
      if (st.token && !signedIn()) { st.token = null; save(); }
      return fetch(API_BASE + '/api/quota', { method: 'GET', headers: headers() })
        .then(function (r) { return r.json().then(function (j) { return { s: r.status, j: j }; }); })
        .then(function (o) {
          if (o.s === 401) { st.token = null; save(); apply(o.j); setMsg('Your Google session expired. Please sign in again.'); return refresh(); }
          apply(o.j); render();
        })
        .catch(function () { line.textContent = ''; render(); });
    }
    function beforeSubmit() {
      setMsg('');
      var q = st.quota;
      if (q && !q.unlimited && q.remaining <= 0) {
        setMsg(q.signedIn ? 'You have used today\'s free reading. Come back tomorrow.'
          : (st.clientId ? 'Your free guest reading is used. Sign in with Google for 1 free reading every day.' : 'Your free reading has been used.'));
        if (box.scrollIntoView) box.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
      }
      return true;
    }
    /** Returns true when the quota box has shown the message itself. */
    function afterResponse(status, data) {
      apply(data || {});
      render();
      if (status === 401) { st.token = null; save(); setMsg('Your Google session expired. Please sign in again.'); refresh(); return true; }
      if (data && (data.code === 'quota' || data.code === 'daily-cap')) { setMsg(data.error || 'No readings left right now.'); return true; }
      return false;
    }
    refresh();
    return { headers: headers, beforeSubmit: beforeSubmit, afterResponse: afterResponse, refresh: refresh };
  }

  /* ---------------- AI reading request ---------------- */
  /** opts.skipPrecheck: send even when the local quota says 0 (shared readings are free on the server). */
  function ask(quota, mode, data, question, opts) {
    opts = opts || {};
    if (quota && !opts.skipPrecheck && !quota.beforeSubmit()) return Promise.resolve({ ok: false, handled: true });
    var ac = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timer = ac ? setTimeout(function () { ac.abort(); }, 120000) : null;
    return fetch(API_BASE + '/api/luan', {
      method: 'POST',
      headers: Object.assign({ 'Content-Type': 'application/json' }, quota ? quota.headers() : {}),
      body: JSON.stringify({ mode: mode, data: data, question: question || '', timeZone: deviceZone() }),
      signal: ac ? ac.signal : undefined
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (j) { return { res: res, j: j }; });
    }).then(function (o) {
      if (timer) clearTimeout(timer);
      if (quota && quota.afterResponse(o.res.status, o.j)) return { ok: false, handled: true };
      if (!o.res.ok) return { ok: false, error: (o.j && o.j.error) || 'The reading could not be prepared right now.' };
      return { ok: true, answer: String((o.j && o.j.answer) || ''), data: o.j || {} };
    }).catch(function (err) {
      if (timer) clearTimeout(timer);
      return { ok: false, error: err && err.name === 'AbortError' ? 'The reading is taking too long. Please try again.' : 'Could not connect. Please check your connection and try again.' };
    });
  }

  /** Light markdown: "## Heading", "- bullet", paragraphs. Text only (no HTML injection). */
  function renderAnswer(body, text) {
    body.textContent = '';
    var lines = String(text || '').replace(/\r\n/g, '\n').split('\n'), para = [], list = null;
    function clean(s) { return s.replace(/\*\*|__/g, '').replace(/^\*+|\*+$/g, '').trim(); }
    function flush() { if (para.length) { body.appendChild(el('p', null, para.join(' '))); para = []; } }
    lines.forEach(function (raw) {
      var line = raw.trim();
      if (!line) { flush(); list = null; return; }
      var h = line.match(/^#{1,4}\s*(.+)$/) || line.match(/^\*\*([^*]{2,60})\*\*:?$/);
      if (h) { flush(); list = null; body.appendChild(el('h3', 'tn-sec', clean(h[1]).replace(/:$/, ''))); return; }
      var b = line.match(/^(?:[-*\u2022]|\d+[.)])\s+(.+)$/);
      if (b) { flush(); if (!list) { list = el('ul'); body.appendChild(list); } list.appendChild(el('li', null, clean(b[1]))); return; }
      list = null; para.push(clean(line));
    });
    flush();
  }

  /** Donate call-to-action shown after a reading. */
  function donateCta() {
    var box = el('aside', 'tn-donate-cta');
    box.appendChild(el('p', 'tn-donate-title', 'Did this reading give you something to think about?'));
    box.appendChild(el('p', 'tn-donate-text', 'Tarot & Numbers is free and run by one person. A small tip keeps the readings going.'));
    var a = el('a', 'tn-btn tn-btn-brass', 'Support the site'); a.href = DONATE_URL;
    box.appendChild(a);
    return box;
  }

  /** Print / Save as PDF: prints only the reading area. */
  function printButton(root, title) {
    var b = el('button', 'tn-btn tn-btn-ghost tn-print-btn', 'Print or save as PDF'); b.type = 'button';
    b.addEventListener('click', function () {
      var old = d.title;
      d.documentElement.classList.add('tn-printing');
      if (root) root.classList.add('tn-print-root');
      d.title = title || old;
      setTimeout(function () {
        w.print();
        setTimeout(function () { d.title = old; d.documentElement.classList.remove('tn-printing'); if (root) root.classList.remove('tn-print-root'); }, 300);
      }, 50);
    });
    return b;
  }

  w.TN = { el: el, store: store, createQuota: createQuota, ask: ask, renderAnswer: renderAnswer, donateCta: donateCta, printButton: printButton, API_BASE: API_BASE, deviceZone: deviceZone };
})(window);
