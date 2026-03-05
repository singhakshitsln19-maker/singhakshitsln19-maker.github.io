
(function () {

  // ── STYLES ──────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    #fn-nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 9000;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      height: 48px;
      background: rgba(5,13,5,0.97);
      border-bottom: 1.5px solid #00aa22;
      font-family: 'Courier New', Courier, monospace;
      box-shadow: 0 2px 16px rgba(0,255,65,0.10);
    }
    #fn-logo {
      color: #00ff41;
      font-size: .75rem;
      font-weight: bold;
      letter-spacing: 2px;
      text-shadow: 0 0 8px #00ff41;
      border: 1.5px solid #00aa22;
      border-radius: 20px;
      padding: 5px 13px;
      background: rgba(0,0,0,0.3);
    }
    #fn-links {
      display: flex;
      gap: 2px;
    }
    .fn-nl {
      background: none;
      border: none;
      color: #00aa22;
      font-family: 'Courier New', monospace;
      font-size: .72rem;
      font-weight: bold;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      cursor: pointer;
      padding: 6px 11px;
      border-radius: 7px;
      transition: all .15s;
    }
    .fn-nl:hover, .fn-nl.on {
      color: #00ff41;
      background: rgba(0,255,65,0.08);
      border: 1px solid #00aa22;
    }

    /* push .page content down so nav doesn't cover it */
    .page { margin-top: 48px !important; }

    /* backdrop */
    .fn-overlay {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 8500;
      background: rgba(0,0,0,0.90);
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    .fn-overlay.on { display: flex; }

    /* card — exact same style as .modal in your CSS */
    .fn-card {
      background: rgba(5,18,5,0.99);
      border: 2px solid #00ff41;
      border-radius: 16px;
      width: 100%;
      max-width: 460px;
      max-height: 88vh;
      overflow-y: auto;
      box-shadow: 0 0 40px rgba(0,255,65,0.22);
      animation: fnpop .2s ease;
      font-family: 'Courier New', Courier, monospace;
    }
    @keyframes fnpop {
      from { transform:scale(.92); opacity:0; }
      to   { transform:scale(1);   opacity:1; }
    }
    .fn-card::-webkit-scrollbar { width:4px; }
    .fn-card::-webkit-scrollbar-thumb { background:#006615; border-radius:2px; }

    /* card header — matches .modal-header */
    .fn-ch {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 13px 17px;
      border-bottom: 1px solid #003a0d;
      position: sticky;
      top: 0;
      background: rgba(5,18,5,0.99);
    }
    .fn-ch-left { display:flex; align-items:center; gap:10px; }
    .fn-ch-icon { font-size:1.3rem; }
    .fn-ch-title {
      font-size: .95rem;
      font-weight: bold;
      color: #00ff41;
      text-shadow: 0 0 8px #00ff41;
      letter-spacing: 1px;
    }
    .fn-xbtn {
      background: none;
      border: 1px solid #003a0d;
      color: #006615;
      width: 27px; height: 27px;
      border-radius: 6px;
      cursor: pointer;
      font-size: .85rem;
      font-family: monospace;
      display: flex; align-items:center; justify-content:center;
      transition: all .18s;
    }
    .fn-xbtn:hover { border-color:#ff4444; color:#ff4444; }

    /* card body */
    .fn-cb { padding: 18px 17px 22px; }

    .fn-desc {
      font-size: .78rem;
      color: #006615;
      line-height: 1.7;
      letter-spacing: .4px;
      margin-bottom: 14px;
    }

    /* info row */
    .fn-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 13px;
      background: rgba(0,0,0,0.4);
      border: 1.5px solid #003a0d;
      border-radius: 10px;
      margin-bottom: 9px;
    }
    .fn-row-icon { font-size:1.05rem; flex-shrink:0; }
    .fn-row-lbl {
      font-size: .58rem;
      color: #006615;
      letter-spacing: 1.5px;
      margin-bottom: 2px;
    }
    .fn-row-val {
      font-size: .8rem;
      color: #00cc33;
      font-weight: bold;
    }
    .fn-row-val.sm {
      font-size: .74rem;
      font-weight: normal;
      color: #00cc33;
    }

    /* stats grid */
    .fn-stats {
      display: grid;
      grid-template-columns: repeat(3,1fr);
      gap: 8px;
      margin-bottom: 13px;
    }
    .fn-stat {
      background: rgba(0,0,0,0.4);
      border: 1.5px solid #003a0d;
      border-radius: 10px;
      padding: 10px 6px;
      text-align: center;
    }
    .fn-snum {
      font-size: 1.25rem;
      font-weight: bold;
      color: #00ff41;
      text-shadow: 0 0 8px #00ff41;
    }
    .fn-slbl {
      font-size: .5rem;
      color: #006615;
      letter-spacing: 1.5px;
      margin-top: 2px;
    }

    /* tags */
    .fn-tags { display:flex; flex-wrap:wrap; gap:5px; margin-top:12px; }
    .fn-tag {
      background: rgba(0,0,0,0.4);
      border: 1px solid #003a0d;
      border-radius: 5px;
      color: #006615;
      font-size: .6rem;
      padding: 3px 8px;
    }

    /* divider */
    .fn-hr { border:none; border-top:1px solid #003a0d; margin:13px 0; }

    /* green CTA button — matches .m-btn */
    .fn-btn {
      width: 100%;
      padding: 12px;
      background: #00ff41;
      border: none;
      border-radius: 8px;
      color: #000;
      font-family: 'Courier New', monospace;
      font-weight: bold;
      font-size: .85rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      cursor: pointer;
      box-shadow: 0 0 14px rgba(0,255,65,.28);
      transition: opacity .18s;
      display: block;
      text-align: center;
      text-decoration: none;
      margin-bottom: 8px;
    }
    .fn-btn:hover { opacity:.85; }

    /* ghost button */
    .fn-gbtn {
      width: 100%;
      padding: 10px;
      background: transparent;
      border: 1.5px solid #003a0d;
      border-radius: 8px;
      color: #006615;
      font-family: 'Courier New', monospace;
      font-size: .72rem;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      cursor: pointer;
      transition: all .18s;
    }
    .fn-gbtn:hover { border-color:#00aa22; color:#00aa22; }

    /* status text */
    .fn-status {
      text-align: center;
      font-size: .65rem;
      color: #00aa22;
      letter-spacing: 1px;
      height: 18px;
      margin-top: 6px;
    }

    /* blinking dot */
    .fn-dot {
      display: inline-block;
      width: 7px; height: 7px;
      background: #00ff41;
      border-radius: 50%;
      box-shadow: 0 0 8px #00ff41;
      flex-shrink: 0;
      animation: fnblink 1.8s infinite;
    }
    @keyframes fnblink { 0%,100%{opacity:1} 50%{opacity:.2} }
  `;
  document.head.appendChild(style);

  // ── NAV HTML ────────────────────────────────────────────────
  const nav = document.createElement('div');
  nav.id = 'fn-nav';
  nav.innerHTML = `
    <div id="fn-logo">FRANCIS</div>
    <div id="fn-links">
      <button class="fn-nl on" onclick="fnHome()">Home</button>
      <button class="fn-nl" onclick="fnShow('about')">About</button>
      <button class="fn-nl" onclick="fnShow('contact')">Contact</button>
    </div>
  `;
  document.body.prepend(nav);

  // ── ABOUT OVERLAY ───────────────────────────────────────────
  const aboutEl = document.createElement('div');
  aboutEl.className = 'fn-overlay';
  aboutEl.id = 'fn-about';
  aboutEl.innerHTML = `
    <div class="fn-card">
      <div class="fn-ch">
        <div class="fn-ch-left">
          <span class="fn-ch-icon">🤖</span>
          <span class="fn-ch-title">ABOUT FRANCIS</span>
        </div>
        <button class="fn-xbtn" onclick="fnHide('about')">✕</button>
      </div>
      <div class="fn-cb">
        <div class="fn-stats">
          <div class="fn-stat"><div class="fn-snum" id="fn-tc">500+</div><div class="fn-slbl">TOOLS</div></div>
          <div class="fn-stat"><div class="fn-snum">20</div><div class="fn-slbl">CATEGORIES</div></div>
          <div class="fn-stat"><div class="fn-snum">0</div><div class="fn-slbl">SERVERS</div></div>
        </div>
        <div class="fn-row">
          <span class="fn-row-icon">👤</span>
          <div><div class="fn-row-lbl">DESIGNED BY</div><div class="fn-row-val">Akshit Singh</div></div>
        </div>
        <div class="fn-row">
          <span class="fn-row-icon">⚡</span>
          <div><div class="fn-row-lbl">ABOUT</div><div class="fn-row-val sm">This is my website featuring important tools designed to provide you with a smooth and professional experience.</div></div>
        </div>
        <div class="fn-row">
          <span class="fn-row-icon">🔒</span>
          <div><div class="fn-row-lbl">PRIVACY</div><div class="fn-row-val">100% offline · no tracking · no ads</div></div>
        </div>
        <div class="fn-tags">
          <span class="fn-tag">🔐 Crypto</span><span class="fn-tag">🧮 Math</span>
          <span class="fn-tag">🎨 Color</span><span class="fn-tag">📝 Text</span>
          <span class="fn-tag">💰 Finance</span><span class="fn-tag">💊 Health</span>
          <span class="fn-tag">🌐 Web</span><span class="fn-tag">😄 Fun</span>
          <span class="fn-tag">💻 Dev</span><span class="fn-tag">🔄 Convert</span>
          <span class="fn-tag">🎲 Random</span><span class="fn-tag">🛠️ Util</span>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(aboutEl);

  // ── CONTACT OVERLAY ─────────────────────────────────────────
  const contactEl = document.createElement('div');
  contactEl.className = 'fn-overlay';
  contactEl.id = 'fn-contact';
  contactEl.innerHTML = `
    <div class="fn-card">
      <div class="fn-ch">
        <div class="fn-ch-left">
          <span class="fn-ch-icon">📡</span>
          <span class="fn-ch-title">CONTACT FRANCIS</span>
        </div>
        <button class="fn-xbtn" onclick="fnHide('contact')">✕</button>
      </div>
      <div class="fn-cb">
        <p class="fn-desc">You can contact me via email. Feedback, suggestions, or just to say hello — all welcome.</p>
        <div class="fn-row">
          <span class="fn-dot"></span>
          <div><div class="fn-row-lbl">EMAIL</div><div class="fn-row-val">Akshitasleo@gmail.com</div></div>
        </div>
        <div class="fn-hr"></div>
        <a class="fn-btn" href="mailto:Akshitasleo@gmail.com">✉ SEND EMAIL</a>
        <button class="fn-gbtn" onclick="fnCopy()">⊕ COPY EMAIL ADDRESS</button>
        <div class="fn-status" id="fn-cs"></div>
      </div>
    </div>
  `;
  document.body.appendChild(contactEl);

  // ── LOGIC ───────────────────────────────────────────────────
  function setActive(name) {
    document.querySelectorAll('.fn-nl').forEach(b => {
      b.classList.toggle('on', b.textContent.toLowerCase() === name);
    });
  }

  window.fnShow = function(p) {
    document.querySelectorAll('.fn-overlay').forEach(o => o.classList.remove('on'));
    document.getElementById('fn-' + p).classList.add('on');
    setActive(p);
  };

  window.fnHide = function(p) {
    document.getElementById('fn-' + p).classList.remove('on');
    setActive('home');
  };

  window.fnHome = function() {
    document.querySelectorAll('.fn-overlay').forEach(o => o.classList.remove('on'));
    setActive('home');
  };

  window.fnCopy = function() {
    navigator.clipboard.writeText('Akshitasleo@gmail.com').then(() => {
      const el = document.getElementById('fn-cs');
      if (el) { el.textContent = '✓ COPIED TO CLIPBOARD'; setTimeout(() => el.textContent = '', 2500); }
    }).catch(() => {
      const el = document.getElementById('fn-cs');
      if (el) el.textContent = 'Akshitasleo@gmail.com';
    });
  };

  // close on backdrop click
  document.querySelectorAll('.fn-overlay').forEach(o => {
    o.addEventListener('click', e => { if (e.target === o) { o.classList.remove('on'); setActive('home'); } });
  });

  // close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { document.querySelectorAll('.fn-overlay').forEach(o => o.classList.remove('on')); setActive('home'); }
  });

  // sync live tool count from TR array
  setTimeout(() => {
    if (typeof TR !== 'undefined' && Array.isArray(TR)) {
      const el = document.getElementById('fn-tc');
      if (el) el.textContent = TR.length;
    }
  }, 800);

})();
