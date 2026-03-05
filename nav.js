
(function () {

  // ── INJECT STYLES ─────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    /* NAV BAR */
    #fn-nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 8000;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 18px;
      background: rgba(5, 0, 18, 0.82);
      backdrop-filter: blur(10px);
      border-bottom: 1.5px solid #4a0080;
      font-family: 'Courier New', monospace;
    }
    #fn-nav .fn-logo {
      font-size: .88rem;
      font-weight: bold;
      color: #cc44ff;
      text-shadow: 0 0 12px #cc44ff, 0 0 24px rgba(180,0,255,.4);
      letter-spacing: 3px;
    }
    #fn-nav .fn-links {
      display: flex;
      gap: 6px;
    }
    #fn-nav .fn-link {
      background: rgba(80, 0, 120, 0.3);
      border: 1.5px solid #4a0080;
      border-radius: 8px;
      color: #cc44ff;
      font-family: 'Courier New', monospace;
      font-size: .68rem;
      letter-spacing: 1.5px;
      padding: 6px 13px;
      cursor: pointer;
      transition: all .18s;
      text-transform: uppercase;
    }
    #fn-nav .fn-link:hover, #fn-nav .fn-link.active {
      background: rgba(180, 0, 255, 0.18);
      border-color: #cc44ff;
      color: #ee88ff;
      box-shadow: 0 0 12px rgba(180,0,255,.3);
    }

    /* PAGE OFFSET for nav */
    .pg { padding-top: 62px !important; }

    /* OVERLAY PAGES */
    .fn-page {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 7000;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: transparent;
    }
    .fn-page.open { display: flex; }

    .fn-card {
      background: rgba(10, 0, 25, 0.88);
      border: 2px solid #6600aa;
      border-radius: 20px;
      padding: 36px 28px;
      max-width: 420px;
      width: 100%;
      text-align: center;
      box-shadow: 0 0 40px rgba(160, 0, 255, 0.25), inset 0 0 60px rgba(100,0,180,0.06);
      font-family: 'Courier New', monospace;
      animation: fnPop .22s ease;
      position: relative;
    }
    @keyframes fnPop {
      from { transform: scale(.9); opacity: 0; }
      to   { transform: scale(1);  opacity: 1; }
    }

    .fn-card-title {
      font-size: 1.3rem;
      font-weight: bold;
      color: #cc44ff;
      text-shadow: 0 0 16px #cc44ff, 0 0 32px rgba(180,0,255,.5);
      letter-spacing: 3px;
      margin-bottom: 18px;
    }
    .fn-card-body {
      font-size: .82rem;
      color: #b088cc;
      line-height: 1.85;
    }
    .fn-card-body strong {
      color: #dd66ff;
    }
    .fn-card-body a {
      color: #cc44ff;
      text-decoration: none;
      border-bottom: 1px solid #6600aa;
      transition: all .15s;
    }
    .fn-card-body a:hover {
      color: #ee88ff;
      border-color: #cc44ff;
    }
    .fn-close {
      position: absolute;
      top: 14px; right: 14px;
      background: none;
      border: 1.5px solid #4a0080;
      color: #6600aa;
      width: 28px; height: 28px;
      border-radius: 7px;
      cursor: pointer;
      font-family: monospace;
      font-size: .82rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all .18s;
    }
    .fn-close:hover { border-color: #cc44ff; color: #cc44ff; }

    .fn-divider {
      width: 60px;
      height: 2px;
      background: linear-gradient(to right, transparent, #6600aa, transparent);
      margin: 18px auto;
    }
    .fn-email-btn {
      display: inline-block;
      margin-top: 16px;
      background: rgba(100, 0, 160, 0.25);
      border: 1.5px solid #6600aa;
      border-radius: 10px;
      color: #cc44ff;
      font-family: 'Courier New', monospace;
      font-size: .75rem;
      letter-spacing: 1px;
      padding: 10px 22px;
      cursor: pointer;
      transition: all .2s;
      text-decoration: none;
    }
    .fn-email-btn:hover {
      background: rgba(180, 0, 255, 0.2);
      border-color: #cc44ff;
      box-shadow: 0 0 16px rgba(180,0,255,.3);
      color: #ee88ff;
    }
    .fn-tag {
      display: inline-block;
      margin: 4px 3px;
      background: rgba(100,0,160,.2);
      border: 1px solid #4a0080;
      border-radius: 6px;
      color: #aa44dd;
      font-size: .62rem;
      letter-spacing: 1px;
      padding: 3px 9px;
    }
    .fn-glow-dot {
      display: inline-block;
      width: 8px; height: 8px;
      background: #cc44ff;
      border-radius: 50%;
      box-shadow: 0 0 8px #cc44ff, 0 0 16px rgba(180,0,255,.5);
      margin-right: 8px;
      animation: fnBlink 1.8s infinite;
    }
    @keyframes fnBlink { 0%,100%{opacity:1} 50%{opacity:.2} }
  `;
  document.head.appendChild(style);

  // ── BUILD NAV BAR ─────────────────────────────────────────────
  const nav = document.createElement('div');
  nav.id = 'fn-nav';
  nav.innerHTML = `
    <div class="fn-logo">⬡ FRANCIS</div>
    <div class="fn-links">
      <button class="fn-link active" onclick="fnShowHome()">HOME</button>
      <button class="fn-link" onclick="fnOpenPage('about')">ABOUT</button>
      <button class="fn-link" onclick="fnOpenPage('contact')">CONTACT</button>
    </div>
  `;
  document.body.prepend(nav);

  // ── ABOUT PAGE ────────────────────────────────────────────────
  const aboutPage = document.createElement('div');
  aboutPage.className = 'fn-page';
  aboutPage.id = 'fn-about';
  aboutPage.innerHTML = `
    <div class="fn-card">
      <button class="fn-close" onclick="fnClosePage('about')">✕</button>
      <div class="fn-card-title">Hey, I am FRANCIS</div>
      <div class="fn-divider"></div>
      <div class="fn-card-body">
        This is my website featuring important tools designed to provide you with a smooth and professional experience.
        <br><br>
        <strong>Designed by Akshit Singh</strong>
        <br><br>
        All tools run <strong>100% offline</strong> in your browser — no servers, no tracking, no ads.
        <br><br>
        <div>
          <span class="fn-tag">🔐 Crypto</span>
          <span class="fn-tag">🧮 Math</span>
          <span class="fn-tag">🎨 Color</span>
          <span class="fn-tag">📝 Text</span>
          <span class="fn-tag">💰 Finance</span>
          <span class="fn-tag">💊 Health</span>
          <span class="fn-tag">🌐 Web</span>
          <span class="fn-tag">😄 Fun</span>
          <span class="fn-tag">💻 Dev</span>
          <span class="fn-tag">🔄 Convert</span>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(aboutPage);

  // ── CONTACT PAGE ──────────────────────────────────────────────
  const contactPage = document.createElement('div');
  contactPage.className = 'fn-page';
  contactPage.id = 'fn-contact';
  contactPage.innerHTML = `
    <div class="fn-card">
      <button class="fn-close" onclick="fnClosePage('contact')">✕</button>
      <div class="fn-card-title">Contact FRANCIS</div>
      <div class="fn-divider"></div>
      <div class="fn-card-body">
        <span class="fn-glow-dot"></span>You can contact me via email at
        <br><br>
        <strong>Akshitasleo@gmail.com</strong>
        <br>
        <a href="mailto:Akshitasleo@gmail.com" class="fn-email-btn">✉ Send Email</a>
        <br><br>
        <div id="fn-copy-status" style="font-size:.65rem;color:#6600aa;height:16px;letter-spacing:1px"></div>
        <button onclick="fnCopyEmail()" style="margin-top:4px;background:none;border:1px solid #4a0080;border-radius:8px;color:#6600aa;font-family:'Courier New',monospace;font-size:.62rem;letter-spacing:1px;padding:6px 14px;cursor:pointer;transition:all .18s" onmouseover="this.style.borderColor='#cc44ff';this.style.color='#cc44ff'" onmouseout="this.style.borderColor='#4a0080';this.style.color='#6600aa'">COPY EMAIL</button>
      </div>
    </div>
  `;
  document.body.appendChild(contactPage);

  // ── FUNCTIONS ─────────────────────────────────────────────────
  window.fnOpenPage = function (page) {
    // Close any open pages
    document.querySelectorAll('.fn-page').forEach(p => p.classList.remove('open'));
    document.querySelectorAll('.fn-link').forEach(l => l.classList.remove('active'));

    const el = document.getElementById('fn-' + page);
    if (el) el.classList.add('open');

    // Highlight correct nav link
    const links = document.querySelectorAll('.fn-link');
    links.forEach(l => {
      if (l.textContent.toLowerCase() === page) l.classList.add('active');
    });
  };

  window.fnClosePage = function (page) {
    const el = document.getElementById('fn-' + page);
    if (el) el.classList.remove('open');
    document.querySelectorAll('.fn-link').forEach(l => l.classList.remove('active'));
    // Re-highlight HOME
    document.querySelector('.fn-link').classList.add('active');
  };

  window.fnShowHome = function () {
    document.querySelectorAll('.fn-page').forEach(p => p.classList.remove('open'));
    document.querySelectorAll('.fn-link').forEach(l => l.classList.remove('active'));
    document.querySelector('.fn-link').classList.add('active');
  };

  window.fnCopyEmail = function () {
    navigator.clipboard?.writeText('Akshitasleo@gmail.com').then(() => {
      const s = document.getElementById('fn-copy-status');
      if (s) { s.textContent = '✓ COPIED TO CLIPBOARD'; setTimeout(() => s.textContent = '', 2500); }
    }).catch(() => {
      const s = document.getElementById('fn-copy-status');
      if (s) s.textContent = 'Akshitasleo@gmail.com';
    });
  };

  // Close pages when clicking backdrop
  document.querySelectorAll('.fn-page').forEach(p => {
    p.addEventListener('click', function (e) {
      if (e.target === p) fnClosePage(p.id.replace('fn-', ''));
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.fn-page').forEach(p => p.classList.remove('open'));
      document.querySelectorAll('.fn-link').forEach(l => l.classList.remove('active'));
      document.querySelector('.fn-link').classList.add('active');
    }
  });

})();
