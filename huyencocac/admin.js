/**
 * Huyền Cơ Các — trang quản lý lượt luận + thống kê chi phí DeepSeek (17/11/2026).
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
      '.hcca-hidden{display:none!important}',
      '.hcca-gbtn{display:flex;justify-content:center;align-items:center;box-sizing:border-box;width:100%;max-width:320px;margin:0 auto;overflow:hidden;line-height:0;color-scheme:dark;border:0;box-shadow:inset 0 0 0 1px var(--gold,#c9a45c);border-radius:999px;background:#131314}',
      '.hcca-gbtn:empty,.hcca-gbtn[style*="display: none"]{display:none!important;border:0}',
      '.hcca-gbtn>div,.hcca-gbtn iframe{display:block;max-width:100%!important;margin:0 auto!important}',
      '.hcca input[type=date]{background:#130e0a;color:var(--ink);border:1px solid var(--line);border-radius:6px;padding:7px 10px;font:inherit;color-scheme:dark;min-width:0}',
      '.hcca-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;margin:6px 0 12px}',
      '.hcca-card{border:1px solid var(--line);border-radius:8px;padding:10px 12px;background:rgba(201,164,92,.06)}',
      '.hcca-card .k{color:var(--muted);font-size:.85rem}',
      '.hcca-card .v{color:var(--gold);font-size:1.45rem;font-weight:600;line-height:1.25;margin:2px 0}',
      '.hcca-card .s{color:var(--muted);font-size:.8rem}',
      '.hcca-card.warn{border-color:var(--danger);background:rgba(168,50,43,.18)}',
      '.hcca-card.warn .v{color:var(--danger)}',
      '.hcca-card.okc .v{color:var(--ok)}',
      '.hcca-bar-track{height:6px;border-radius:3px;background:rgba(201,164,92,.15);margin-top:6px;overflow:hidden}',
      '.hcca-bar-fill{height:100%;background:var(--gold);border-radius:3px}',
      '.hcca-card.warn .hcca-bar-fill{background:var(--danger)}',
      '.hcca h3{font-family:"Cormorant SC",serif;color:var(--gold);margin:14px 0 6px;font-size:1.1rem}',
      '.hcca tr.hcca-sum td{font-weight:600;color:var(--gold);border-top:1px solid var(--gold)}',
      '.hcca tr.hcca-zero td{color:var(--muted);opacity:.7}',
      '.hcca-grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px 14px;align-items:end}',
      '.hcca-grid2 label{display:flex;flex-direction:column;gap:4px;color:var(--muted);font-size:.9rem}',
      '.hcca-grid2 input{width:100%;box-sizing:border-box}',
      '.hcca-note{color:var(--muted);font-size:.82rem;margin-top:8px;line-height:1.5}',
      '.hcca-note a{color:var(--gold)}',
      '@media (max-width:560px){.hcca h1{font-size:1.6rem}.hcca-card .v{font-size:1.25rem}.hcca th,.hcca td{padding:5px 6px;font-size:.86rem}}'
    ].join('\n');
    doc.head.appendChild(css);

    root.className = (root.className ? root.className + ' ' : '') + 'hcca';
    root.innerHTML = '';
    root.appendChild(el('h1', null, 'Quản lý lượt luận'));
    root.appendChild(el('p', 'hcca-sub', 'Huyền Cơ Các · khách 2 lượt, tài khoản Google 5 lượt, quản trị không giới hạn'));
    var bar = el('div', 'hcca-bar');
    var btnHost = el('div', 'hcca-gbtn');
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

    // Thống kê & chi phí DeepSeek
    var statP = el('div', 'hcca-panel');
    statP.appendChild(el('h2', null, 'Thống kê & chi phí'));
    var sbar = el('div', 'hcca-form');
    var sReload = el('button', null, 'Tải lại thống kê'); sReload.type = 'button';
    var sStamp = el('span', 'hcca-tag');
    sbar.appendChild(sReload); sbar.appendChild(sStamp);
    statP.appendChild(sbar);
    var sMsg = el('div', 'hcca-msg');
    statP.appendChild(sMsg);
    var cards = el('div', 'hcca-cards');
    statP.appendChild(cards);

    statP.appendChild(el('h3', null, 'Theo tính năng'));
    var fWrap = el('div', 'hcca-tablewrap');
    var fTable = el('table');
    var fHead = el('thead'); var fhr = el('tr');
    ['Tính năng', 'Hôm nay', 'Chi phí hôm nay', '30 ngày', 'Token 30 ngày', 'Chi phí 30 ngày'].forEach(function (h, i) { fhr.appendChild(el('th', i ? 'n' : null, h)); });
    fHead.appendChild(fhr);
    var fBody = el('tbody');
    fTable.appendChild(fHead); fTable.appendChild(fBody); fWrap.appendChild(fTable);
    statP.appendChild(fWrap);

    statP.appendChild(el('h3', null, '30 ngày gần nhất'));
    var dWrap = el('div', 'hcca-tablewrap');
    var dTable = el('table');
    var dHead = el('thead'); var dhr = el('tr');
    ['Ngày', 'Lượt', 'Token vào', 'Token ra', 'Chi phí ước tính'].forEach(function (h, i) { dhr.appendChild(el('th', i ? 'n' : null, h)); });
    dHead.appendChild(dhr);
    var dBody = el('tbody');
    dTable.appendChild(dHead); dTable.appendChild(dBody); dWrap.appendChild(dTable);
    statP.appendChild(dWrap);

    statP.appendChild(el('h3', null, 'Trần mỗi ngày & tiền nạp'));
    var cf = el('form');
    cf.setAttribute('novalidate', '');
    var cGrid = el('div', 'hcca-grid2');
    function field(labelText, input) { var l = el('label'); l.appendChild(doc.createTextNode(labelText)); l.appendChild(input); cGrid.appendChild(l); return input; }
    var cReadings = el('input'); cReadings.type = 'number'; cReadings.min = '0'; cReadings.step = '1'; cReadings.inputMode = 'numeric';
    var cCost = el('input'); cCost.type = 'number'; cCost.min = '0'; cCost.step = '0.01'; cCost.inputMode = 'decimal';
    var cCredit = el('input'); cCredit.type = 'number'; cCredit.min = '0'; cCredit.step = '0.01'; cCredit.inputMode = 'decimal';
    var cStart = el('input'); cStart.type = 'date';
    field('Trần lượt luận mỗi ngày (0 = không giới hạn)', cReadings);
    field('Trần chi phí mỗi ngày, USD (0 = không giới hạn)', cCost);
    field('Số tiền đã nạp DeepSeek, USD', cCredit);
    field('Tính chi phí từ ngày (ngày nạp tiền)', cStart);
    var cBtn = el('button', null, 'Lưu cài đặt'); cBtn.type = 'submit';
    var cBtnWrap = el('label'); cBtnWrap.appendChild(cBtn);
    cGrid.appendChild(cBtnWrap);
    cf.appendChild(cGrid);
    statP.appendChild(cf);
    var cMsg = el('div', 'hcca-msg');
    statP.appendChild(cMsg);
    var priceNote = el('div', 'hcca-note');
    statP.appendChild(priceNote);
    main.appendChild(statP);

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

    /* ---------- Thống kê ---------- */
    var NF = (function () { try { return new Intl.NumberFormat('vi-VN'); } catch (e) { return null; } })();
    function fmtInt(n) { n = Math.round(Number(n) || 0); return NF ? NF.format(n) : String(n); }
    function fmtUsd(x) {
      x = Number(x) || 0;
      var a = Math.abs(x);
      var d = a === 0 ? 2 : (a < 0.01 ? 4 : (a < 1 ? 3 : 2));
      return (x < 0 ? '-' : '') + '$' + a.toFixed(d);
    }
    function fmtDate(iso) {
      if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso || '';
      return iso.slice(8, 10) + '/' + iso.slice(5, 7) + '/' + iso.slice(0, 4);
    }
    var FEATURE_NAMES = { tuvi: 'Xem Tử Vi', hopmang: 'Xem Hợp Mạng', other: 'Khác' };
    var LOW_CREDIT_USD = 2;

    function card(label, value, sub, kind, pct) {
      var c = el('div', 'hcca-card' + (kind ? ' ' + kind : ''));
      c.appendChild(el('div', 'k', label));
      c.appendChild(el('div', 'v', value));
      if (sub) c.appendChild(el('div', 's', sub));
      if (pct != null) {
        var t = el('div', 'hcca-bar-track'); var f = el('div', 'hcca-bar-fill');
        f.style.width = Math.max(0, Math.min(100, pct)) + '%';
        t.appendChild(f); c.appendChild(t);
      }
      cards.appendChild(c);
      return c;
    }

    function renderStats(d) {
      var t = d.today || {}; var st = d.settings || {}; var cr = d.credit || {}; var tot = d.totals || {};
      cards.innerHTML = '';
      var capN = st.dailyReadings > 0 ? st.dailyReadings : 0;
      card('Lượt luận hôm nay', fmtInt(t.n) + (capN ? ' / ' + fmtInt(capN) : ''),
        capN ? (d.cap && d.cap.reached ? 'Đã chạm trần, khách sẽ được mời quay lại ngày mai' : 'Còn ' + fmtInt(d.cap ? d.cap.readingsLeft : capN - t.n) + ' lượt trước khi chạm trần') : 'Không đặt trần lượt',
        d.cap && d.cap.reached ? 'warn' : '', capN ? (t.n / capN) * 100 : null);
      card('Chi phí hôm nay', fmtUsd(t.cost),
        (st.dailyCostUsd > 0 ? 'Trần ' + fmtUsd(st.dailyCostUsd) + ' · ' : '') + 'Token vào ' + fmtInt(t.pin) + ' · ra ' + fmtInt(t.pout),
        st.dailyCostUsd > 0 && t.cost >= st.dailyCostUsd ? 'warn' : '', st.dailyCostUsd > 0 ? (t.cost / st.dailyCostUsd) * 100 : null);
      var rem = Number(cr.remainingUsd) || 0;
      var low = rem < LOW_CREDIT_USD;
      card('Tiền còn lại (ước tính)', fmtUsd(rem),
        'Nạp ' + fmtUsd(cr.creditUsd) + ', đã dùng ' + fmtUsd(cr.spentUsd) + (cr.creditStart ? ' từ ' + fmtDate(cr.creditStart) : ' (chưa đặt ngày bắt đầu)') + (low ? (rem <= 0 ? '. Có thể đã hết tiền, nên nạp thêm ngay!' : '. Sắp hết tiền, nên nạp thêm!') : ''),
        low ? 'warn' : 'okc', cr.creditUsd > 0 ? (rem / cr.creditUsd) * 100 : null);
      var perReading = Number(cr.avgCostPerReading) || 0;
      var perDay = Number(cr.avgCostPerActiveDay) || 0;
      var daysLeft = perDay > 0 ? Math.floor(Math.max(0, rem) / perDay) : null;
      card('30 ngày qua', fmtInt(tot.n) + ' lượt', 'Chi phí ' + fmtUsd(tot.cost) + ' · trung bình ' + fmtUsd(perReading) + '/lượt' + (daysLeft != null ? ' · đủ khoảng ' + fmtInt(daysLeft) + ' ngày nữa' : ''));

      fBody.innerHTML = '';
      ['tuvi', 'hopmang', 'other'].forEach(function (k) {
        var a = (t.f && t.f[k]) || {}; var b = (tot.f && tot.f[k]) || {};
        var tr = el('tr', (a.n || b.n) ? null : 'hcca-zero');
        tr.appendChild(el('td', null, FEATURE_NAMES[k]));
        tr.appendChild(el('td', 'n', fmtInt(a.n)));
        tr.appendChild(el('td', 'n', fmtUsd(a.cost)));
        tr.appendChild(el('td', 'n', fmtInt(b.n)));
        tr.appendChild(el('td', 'n', fmtInt((b.pin || 0) + (b.pout || 0))));
        tr.appendChild(el('td', 'n', fmtUsd(b.cost)));
        fBody.appendChild(tr);
      });

      dBody.innerHTML = '';
      (d.days || []).forEach(function (r) {
        var tr = el('tr', r.n ? null : 'hcca-zero');
        tr.appendChild(el('td', null, fmtDate(r.date) + (r.date === t.date ? ' (hôm nay)' : '')));
        tr.appendChild(el('td', 'n', fmtInt(r.n)));
        tr.appendChild(el('td', 'n', fmtInt(r.pin)));
        tr.appendChild(el('td', 'n', fmtInt(r.pout)));
        tr.appendChild(el('td', 'n', fmtUsd(r.cost)));
        dBody.appendChild(tr);
      });
      var sum = el('tr', 'hcca-sum');
      sum.appendChild(el('td', null, 'Cộng ' + (d.days || []).length + ' ngày'));
      sum.appendChild(el('td', 'n', fmtInt(tot.n)));
      sum.appendChild(el('td', 'n', fmtInt(tot.pin)));
      sum.appendChild(el('td', 'n', fmtInt(tot.pout)));
      sum.appendChild(el('td', 'n', fmtUsd(tot.cost)));
      dBody.appendChild(sum);

      if (doc.activeElement !== cReadings) cReadings.value = st.dailyReadings != null ? String(st.dailyReadings) : '';
      if (doc.activeElement !== cCost) cCost.value = st.dailyCostUsd != null ? String(st.dailyCostUsd) : '';
      if (doc.activeElement !== cCredit) cCredit.value = st.creditUsd != null ? String(st.creditUsd) : '';
      if (doc.activeElement !== cStart) cStart.value = st.creditStart || '';

      var p = d.prices || {};
      priceNote.textContent = '';
      var pk = p.peakPerM || {}; var op = p.offPeakPerM || {};
      priceNote.appendChild(doc.createTextNode(
        'Chi phí là ước tính theo bảng giá DeepSeek (model ' + (p.model || 'deepseek-chat') + ', USD / 1 triệu token): ngoài giờ cao điểm vào ' + op.cacheMiss + ' (cache ' + op.cacheHit + '), ra ' + op.output +
        '; giờ cao điểm (8–11 giờ và 13–17 giờ, giờ VN, thứ Hai–Sáu) gấp đôi. Nguồn: '));
      var a1 = el('a', null, 'bảng giá DeepSeek'); a1.href = p.source || 'https://api-docs.deepseek.com/quick_start/pricing'; a1.target = '_blank'; a1.rel = 'noopener';
      priceNote.appendChild(a1);
      priceNote.appendChild(doc.createTextNode('. Số dư thật xem ở '));
      var a2 = el('a', null, 'platform.deepseek.com'); a2.href = 'https://platform.deepseek.com/usage'; a2.target = '_blank'; a2.rel = 'noopener';
      priceNote.appendChild(a2);
      priceNote.appendChild(doc.createTextNode('. Khi chạm trần ngày, khách thấy: "Hôm nay Huyền Cơ Các đã hết lượt luận chung, mời quý khách quay lại ngày mai." Tài khoản quản trị không bị chặn.'));
      sStamp.textContent = 'Cập nhật lúc ' + fmtTime(Date.now());
    }

    function loadStats() {
      if (!tokenValid()) return;
      sReload.disabled = true;
      setMsg(sMsg, 'Đang tải thống kê...');
      api('GET', '/api/admin/stats?days=30').then(function (out) {
        sReload.disabled = false;
        if (handleAuthFail(out)) return;
        if (out.status !== 200) { setMsg(sMsg, out.data.error || 'Không tải được thống kê.', 'err'); return; }
        setMsg(sMsg, '');
        renderStats(out.data);
      }).catch(function () { sReload.disabled = false; setMsg(sMsg, 'Không kết nối được máy chủ.', 'err'); });
    }
    sReload.addEventListener('click', loadStats);

    cf.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var nR = cReadings.value === '' ? 0 : Number(cReadings.value);
      var nC = cCost.value === '' ? 0 : Number(cCost.value);
      var nK = cCredit.value === '' ? 0 : Number(cCredit.value);
      if (!(nR >= 0 && Math.floor(nR) === nR && nR <= 100000)) { setMsg(cMsg, 'Trần lượt phải là số nguyên từ 0 đến 100000.', 'err'); return; }
      if (!(nC >= 0 && nC <= 10000)) { setMsg(cMsg, 'Trần chi phí phải từ 0 đến 10000 USD.', 'err'); return; }
      if (!(nK >= 0 && nK <= 10000)) { setMsg(cMsg, 'Số tiền nạp phải từ 0 đến 10000 USD.', 'err'); return; }
      cBtn.disabled = true;
      setMsg(cMsg, 'Đang lưu...');
      api('POST', '/api/admin/settings', { dailyReadings: nR, dailyCostUsd: nC, creditUsd: nK, creditStart: cStart.value || '' }).then(function (out) {
        cBtn.disabled = false;
        if (handleAuthFail(out)) return;
        if (out.status !== 200) { setMsg(cMsg, out.data.error || 'Không lưu được.', 'err'); return; }
        setMsg(cMsg, 'Đã lưu cài đặt.', 'ok');
        loadStats();
      }).catch(function () { cBtn.disabled = false; setMsg(cMsg, 'Không kết nối được máy chủ.', 'err'); });
    });

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
        state.users = []; renderTable(); state.statsLoaded = false;
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
        if (!state.statsLoaded) { state.statsLoaded = true; loadStats(); }
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

    function buttonWidth() {
      var avail = 0;
      if (bar && bar.clientWidth) avail = bar.clientWidth;
      if (avail < 80 && root.clientWidth) avail = root.clientWidth - 16;
      if (avail < 80) avail = 280;
      if (avail > 320) avail = 320;
      if (avail < 200) avail = Math.max(Math.floor(avail), 1);
      return Math.floor(avail);
    }
    function renderGsiButton(force) {
      if (!state.gsiReady || !state.clientId) return;
      if (btnHost.style.display === 'none') return;
      var w = buttonWidth();
      if (!force && btnHost.getAttribute('data-done') && btnHost.getAttribute('data-w') === String(w)) return;
      btnHost.textContent = '';
      try {
        google.accounts.id.renderButton(btnHost, {
          type: 'standard',
          theme: 'filled_black',
          size: 'large',
          text: 'signin_with',
          shape: 'pill',
          locale: 'vi',
          width: w
        });
        btnHost.setAttribute('data-done', '1');
        btnHost.setAttribute('data-w', String(w));
      } catch (e) {}
    }
    var resizeTimer = null;
    function onAdminResize() {
      if (btnHost.style.display === 'none') return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { renderGsiButton(); }, 150);
    }
    if (typeof ResizeObserver !== 'undefined') {
      try { new ResizeObserver(onAdminResize).observe(root); } catch (e) {}
    }
    if (doc.defaultView) doc.defaultView.addEventListener('resize', onAdminResize);

    function initGsi() {
      var s = doc.createElement('script');
      s.src = 'https://accounts.google.com/gsi/client';
      s.async = true;
      s.onload = function () {
        try {
          google.accounts.id.initialize({ client_id: state.clientId, callback: onCredential, auto_select: true, use_fedcm_for_prompt: true });
          state.gsiReady = true;
          renderGsiButton(true);
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
