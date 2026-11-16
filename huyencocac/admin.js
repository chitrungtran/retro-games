/**
 * Huyền Cơ Các — trang quản lý lượt luận.
 * Dùng được ở https://chitrungtran.github.io/retro-games/huyencocac/admin.html
 * hoặc nhúng vào một trang Blogger bằng ghpages/admin-snippet.html (chỉ cần <div id="hcc-admin"> + thẻ script này).
 * Chỉ email trong ADMIN_EMAILS của Worker mới xem được; người khác thấy "Bạn không có quyền."
 */
(function () {
  var API = 'https://huyencocac-luan.huyencocac.workers.dev';
  var STORE = 'hcc_admin_idt';
  var doc = document;

  function start() {
    var root = doc.getElementById('hcc-admin');
    if (!root) return;
    var state = { token: null, exp: 0, email: '', clientId: null, users: [], gsiReady: false };

    function el(tag, cls, text) {
      var e = doc.createElement(tag);
      if (cls) e.className = cls;
      if (text != null) e.textContent = text;
      return e;
    }

    var css = doc.createElement('style');
    css.textContent = [
      '.hcca{--ink:#eee2c6;--muted:#c2b08b;--gold:#c9a45c;--line:rgba(201,164,92,.32);--danger:#f0b3a8;--ok:#cfe6c4;color:var(--ink);font-family:Lora,"Noto Serif",Georgia,serif;max-width:1100px;margin:0 auto;padding:8px}',
      '.hcca h1{font-family:"Cormorant SC",serif;color:var(--gold);text-align:center;margin:8px 0 4px;font-size:2rem}',
      '.hcca-sub{text-align:center;color:var(--muted);margin:0 0 14px}',
      '.hcca-bar{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:center;margin:10px 0}',
      '.hcca-panel{border:1px solid var(--line);border-radius:8px;padding:12px;margin:12px 0;background:rgba(0,0,0,.18)}',
      '.hcca-panel h2{font-family:"Cormorant SC",serif;color:var(--gold);margin:0 0 8px;font-size:1.3rem}',
      '.hcca input[type=text],.hcca input[type=email],.hcca input[type=number],.hcca input[type=search]{background:#130e0a;color:var(--ink);border:1px solid var(--line);border-radius:6px;padding:8px 10px;font:inherit;min-width:0}',
      '.hcca button{background:#a8322b;color:#fff3dc;border:1px solid var(--gold);border-radius:6px;padding:8px 16px;font:inherit;cursor:pointer}',
      '.hcca button.hcca-link{background:none;border:0;color:var(--gold);text-decoration:underline;padding:0}',
      '.hcca button:disabled{opacity:.6;cursor:default}',
      '.hcca-form{display:flex;flex-wrap:wrap;gap:10px;align-items:center}',
      '.hcca-form label{color:var(--muted);font-size:.9rem}',
      '.hcca-msg{min-height:1.3em;margin-top:8px;color:var(--muted)}',
      '.hcca-msg.err{color:var(--danger)}.hcca-msg.ok{color:var(--ok)}',
      '.hcca-deny{text-align:center;color:var(--danger);font-size:1.2rem;margin:24px 0}',
      '.hcca-tablewrap{overflow-x:auto}',
      '.hcca table{width:100%;border-collapse:collapse;font-size:.92rem}',
      '.hcca th,.hcca td{border-bottom:1px solid var(--line);padding:6px 8px;text-align:left;white-space:nowrap}',
      '.hcca th{color:var(--gold);font-weight:600}',
      '.hcca td.n{text-align:right}',
      '.hcca tr.hcca-row{cursor:pointer}.hcca tr.hcca-row:hover td{background:rgba(201,164,92,.08)}',
      '.hcca-tag{font-size:.8rem;color:var(--muted)}',
      '.hcca-hidden{display:none!important}'
    ].join('\n');
    doc.head.appendChild(css);

    root.className = (root.className ? root.className + ' ' : '') + 'hcca';
    root.innerHTML = '';
    root.appendChild(el('h1', null, 'Quản lý lượt luận'));
    root.appendChild(el('p', 'hcca-sub', 'Huyền Cơ Các · khách 2 lượt, tài khoản Google 5 lượt, quản trị không giới hạn'));
    var bar = el('div', 'hcca-bar');
    var btnHost = el('div');
    var who = el('span', 'hcca-tag');
    bar.appendChild(btnHost); bar.appendChild(who);
    root.appendChild(bar);
    var topMsg = el('div', 'hcca-msg');
    topMsg.style.textAlign = 'center';
    root.appendChild(topMsg);
    var deny = el('div', 'hcca-deny hcca-hidden', 'Bạn không có quyền.');
    root.appendChild(deny);

    var main = el('div', 'hcca-hidden');
    root.appendChild(main);

    // Form cộng lượt
    var grantP = el('div', 'hcca-panel');
    grantP.appendChild(el('h2', null, 'Cộng lượt'));
    var gf = el('form', 'hcca-form');
    gf.setAttribute('novalidate', '');
    var gEmail = el('input'); gEmail.type = 'email'; gEmail.placeholder = 'Email Google của khách'; gEmail.size = 30; gEmail.id = 'hcca-email';
    var gAdd = el('input'); gAdd.type = 'number'; gAdd.min = '0'; gAdd.max = '1000'; gAdd.step = '1'; gAdd.value = '5'; gAdd.style.width = '90px'; gAdd.id = 'hcca-add';
    var gResetWrap = el('label');
    var gReset = el('input'); gReset.type = 'checkbox'; gReset.id = 'hcca-reset';
    gResetWrap.appendChild(gReset); gResetWrap.appendChild(doc.createTextNode(' Đặt lại số lượt đã dùng về 0'));
    var gBtn = el('button', null, 'Cộng lượt'); gBtn.type = 'submit';
    var l1 = el('label', null, 'Email'); l1.htmlFor = 'hcca-email';
    var l2 = el('label', null, 'Số lượt cộng thêm'); l2.htmlFor = 'hcca-add';
    [l1, gEmail, l2, gAdd, gResetWrap, gBtn].forEach(function (x) { gf.appendChild(x); });
    grantP.appendChild(gf);
    var gMsg = el('div', 'hcca-msg');
    grantP.appendChild(gMsg);
    grantP.appendChild(el('div', 'hcca-tag', 'Email chưa từng đăng nhập vẫn cộng được: lượt sẽ được áp khi người đó đăng nhập Google lần đầu.'));
    main.appendChild(grantP);

    // Bảng tài khoản
    var listP = el('div', 'hcca-panel');
    listP.appendChild(el('h2', null, 'Tài khoản'));
    var lbar = el('div', 'hcca-form');
    var search = el('input'); search.type = 'search'; search.placeholder = 'Tìm theo email'; search.size = 30;
    var reload = el('button', null, 'Tải lại');
    reload.type = 'button';
    var count = el('span', 'hcca-tag');
    lbar.appendChild(search); lbar.appendChild(reload); lbar.appendChild(count);
    listP.appendChild(lbar);
    var wrap = el('div', 'hcca-tablewrap');
    var table = el('table');
    var thead = el('thead');
    var hr = el('tr');
    ['Email', 'Đã dùng', 'Lượt gốc', 'Cộng thêm', 'Còn lại', 'Lần dùng cuối', 'Ghi chú'].forEach(function (h) { hr.appendChild(el('th', null, h)); });
    thead.appendChild(hr);
    var tbody = el('tbody');
    table.appendChild(thead); table.appendChild(tbody);
    wrap.appendChild(table);
    listP.appendChild(wrap);
    main.appendChild(listP);

    function setMsg(node, text, kind) { node.textContent = text || ''; node.className = 'hcca-msg' + (kind ? ' ' + kind : ''); }

    function fmtTime(ms) {
      if (!ms) return '';
      try {
        return new Intl.DateTimeFormat('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date(ms)) + ' (giờ VN)';
      } catch (e) { return new Date(ms).toISOString(); }
    }

    function renderTable() {
      var q = (search.value || '').trim().toLowerCase();
      tbody.innerHTML = '';
      var rows = state.users.filter(function (u) { return !q || String(u.email).indexOf(q) !== -1; });
      count.textContent = rows.length + ' / ' + state.users.length + ' tài khoản';
      rows.forEach(function (u) {
        var tr = el('tr', 'hcca-row');
        tr.title = 'Bấm để điền email vào ô Cộng lượt';
        tr.appendChild(el('td', null, u.email));
        tr.appendChild(el('td', 'n', String(u.used)));
        tr.appendChild(el('td', 'n', String(u.baseLimit)));
        tr.appendChild(el('td', 'n', String(u.bonus)));
        tr.appendChild(el('td', 'n', u.unlimited ? 'Vô hạn' : String(u.remaining)));
        tr.appendChild(el('td', null, fmtTime(u.lastUsed)));
        tr.appendChild(el('td', 'hcca-tag', u.unlimited ? 'Quản trị' : (u.pending ? 'Chưa đăng nhập (lượt chờ)' : '')));
        tr.addEventListener('click', function () { gEmail.value = u.email; gAdd.focus(); });
        tbody.appendChild(tr);
      });
      if (!rows.length) {
        var tr0 = el('tr');
        var td0 = el('td', 'hcca-tag', state.users.length ? 'Không có email khớp.' : 'Chưa có tài khoản nào.');
        td0.colSpan = 7;
        tr0.appendChild(td0);
        tbody.appendChild(tr0);
      }
    }
    search.addEventListener('input', renderTable);

    function decodeJwt(t) {
      try {
        var p = t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        while (p.length % 4) p += '=';
        return JSON.parse(decodeURIComponent(Array.prototype.map.call(atob(p), function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')));
      } catch (e) { return null; }
    }

    function tokenValid() { return !!state.token && state.exp - 60000 > Date.now(); }

    function save() {
      try {
        if (state.token) sessionStorage.setItem(STORE, JSON.stringify({ t: state.token, exp: state.exp, email: state.email }));
        else sessionStorage.removeItem(STORE);
      } catch (e) {}
    }

    function api(method, path, body) {
      var headers = {};
      if (tokenValid()) headers.Authorization = 'Bearer ' + state.token;
      if (body) headers['Content-Type'] = 'application/json';
      return fetch(API + path, { method: method, headers: headers, body: body ? JSON.stringify(body) : undefined })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (d) { return { status: res.status, data: d || {} }; });
        });
    }

    function showSignedOut(text) {
      main.classList.add('hcca-hidden');
      deny.classList.add('hcca-hidden');
      who.textContent = '';
      btnHost.style.display = '';
      setMsg(topMsg, text || 'Hãy đăng nhập Google bằng tài khoản quản trị.');
    }

    function handleAuthFail(out) {
      if (out.status === 401) {
        state.token = null; state.exp = 0; save();
        showSignedOut('Phiên đăng nhập đã hết hạn. Hãy đăng nhập Google lại.');
        try { if (state.gsiReady) google.accounts.id.prompt(); } catch (e) {}
        return true;
      }
      if (out.status === 403) {
        main.classList.add('hcca-hidden');
        deny.classList.remove('hcca-hidden');
        setMsg(topMsg, '');
        return true;
      }
      return false;
    }

    function signOutLink() {
      who.textContent = 'Đã đăng nhập: ' + state.email + ' · ';
      var b = el('button', 'hcca-link', 'Đăng xuất');
      b.type = 'button';
      b.addEventListener('click', function () {
        state.token = null; state.exp = 0; state.email = ''; save();
        try { google.accounts.id.disableAutoSelect(); } catch (e) {}
        state.users = []; renderTable();
        showSignedOut();
      });
      who.appendChild(b);
    }

    function loadUsers() {
      if (!tokenValid()) { showSignedOut(state.token ? 'Phiên đăng nhập đã hết hạn. Hãy đăng nhập Google lại.' : ''); return; }
      setMsg(topMsg, 'Đang tải danh sách...');
      reload.disabled = true;
      api('GET', '/api/admin/users').then(function (out) {
        reload.disabled = false;
        if (handleAuthFail(out)) { if (out.status === 403) signOutLink(); return; }
        if (out.status !== 200) { setMsg(topMsg, out.data.error || 'Không tải được danh sách.', 'err'); return; }
        state.users = out.data.users || [];
        btnHost.style.display = 'none';
        deny.classList.add('hcca-hidden');
        main.classList.remove('hcca-hidden');
        signOutLink();
        setMsg(topMsg, '');
        renderTable();
      }).catch(function () { reload.disabled = false; setMsg(topMsg, 'Không kết nối được máy chủ.', 'err'); });
    }
    reload.addEventListener('click', loadUsers);

    gf.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var email = (gEmail.value || '').trim().toLowerCase();
      var add = gAdd.value === '' ? 0 : Number(gAdd.value);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setMsg(gMsg, 'Email không hợp lệ.', 'err'); return; }
      if (!(add >= 0 && add <= 1000 && Math.floor(add) === add)) { setMsg(gMsg, 'Số lượt phải là số nguyên từ 0 đến 1000.', 'err'); return; }
      if (!add && !gReset.checked) { setMsg(gMsg, 'Hãy nhập số lượt cần cộng.', 'err'); return; }
      gBtn.disabled = true;
      setMsg(gMsg, 'Đang lưu...');
      api('POST', '/api/admin/grant', { email: email, add: add, resetUsed: gReset.checked }).then(function (out) {
        gBtn.disabled = false;
        if (handleAuthFail(out)) return;
        if (out.status !== 200) { setMsg(gMsg, out.data.error || 'Không lưu được.', 'err'); return; }
        var d = out.data;
        setMsg(gMsg, 'Đã lưu cho ' + d.email + ': cộng thêm tổng ' + d.bonus + ' lượt, còn ' + (d.remaining == null ? 'vô hạn' : d.remaining) + ' lượt' + (d.pending ? ' (áp khi người này đăng nhập lần đầu).' : '.'), 'ok');
        gReset.checked = false;
        loadUsers();
      }).catch(function () { gBtn.disabled = false; setMsg(gMsg, 'Không kết nối được máy chủ.', 'err'); });
    });

    function onCredential(resp) {
      var c = resp && resp.credential && decodeJwt(resp.credential);
      if (!c) { setMsg(topMsg, 'Đăng nhập chưa thành công. Hãy thử lại.', 'err'); return; }
      state.token = resp.credential; state.exp = c.exp * 1000; state.email = c.email || '';
      save();
      loadUsers();
    }

    function initGsi() {
      var s = doc.createElement('script');
      s.src = 'https://accounts.google.com/gsi/client';
      s.async = true;
      s.onload = function () {
        try {
          google.accounts.id.initialize({ client_id: state.clientId, callback: onCredential, auto_select: true, use_fedcm_for_prompt: true });
          google.accounts.id.renderButton(btnHost, { type: 'standard', theme: 'filled_black', size: 'large', text: 'signin_with', shape: 'pill', locale: 'vi' });
          state.gsiReady = true;
          if (!tokenValid()) google.accounts.id.prompt();
        } catch (e) { setMsg(topMsg, 'Không tải được nút Đăng nhập Google.', 'err'); }
      };
      s.onerror = function () { setMsg(topMsg, 'Không tải được nút Đăng nhập Google.', 'err'); };
      doc.head.appendChild(s);
    }

    try {
      var saved = JSON.parse(sessionStorage.getItem(STORE) || 'null');
      if (saved && saved.t) { state.token = saved.t; state.exp = saved.exp || 0; state.email = saved.email || ''; }
    } catch (e) {}

    setMsg(topMsg, 'Đang kết nối máy chủ...');
    fetch(API + '/api/quota').then(function (r) { return r.json(); }).then(function (d) {
      if (!d || !d.clientId) { setMsg(topMsg, 'Máy chủ chưa bật đăng nhập Google (chưa đặt GOOGLE_CLIENT_ID).', 'err'); return; }
      state.clientId = d.clientId;
      initGsi();
      if (tokenValid()) loadUsers(); else showSignedOut();
    }).catch(function () { setMsg(topMsg, 'Không kết nối được máy chủ.', 'err'); });
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', start);
  else start();
})();
