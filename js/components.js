// Shared markup: icon sprite, header, nav menu, search layer, footer, cards, tool hub.
(function () {
  const ARTICLE = 'article.html';
  const icon = (name, cls = '') => `<svg class="i ${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const kindIcon = { 'Series': 'series', 'Reading list': 'book', 'JSTOR Collection': 'archive', 'Roundup': 'layers', 'Syllabus': 'doc', 'Pedagogical essay': 'pencil', 'Annotation': 'doc', 'Article': 'doc' };

  const SECTIONS = ['Arts & Culture', 'Politics & History', 'Science & Technology', 'Education & Society', 'Business & Economics'];
  const sectionHref = (s) => `search.html?q=${encodeURIComponent(s)}`;

  function sprite() {
    return `<svg width="0" height="0" style="position:absolute" aria-hidden="true">${Object.entries(JD.icons)
      .map(([k, v]) => `<symbol id="i-${k}" viewBox="0 0 24 24">${v}</symbol>`).join('')}</svg>`;
  }

  const logo = (cls = '', light = false) => `<a class="logo ${cls}" href="index.html" aria-label="JSTOR Daily home"><img src="assets/${light ? 'logo-light' : 'logo'}.png" alt="" width="634" height="200"></a>`;

  function subnav(active, extra = '') {
    const links = SECTIONS.map((s) => `<a href="${sectionHref(s)}"${active === s ? ' class="is-active"' : ''}>${s}</a>`).join('');
    return `<nav class="subnav ${extra}" aria-label="Sections"><div class="wrap">${links}<span class="divider"></span>
      <a href="teaching.html"${active === 'teaching' ? ' class="is-active"' : ''}>${icon('book', 'i-teach')}Teaching &amp; Learning Resources</a>
      <a href="collections.html"${active === 'collections' ? ' class="is-active"' : ''}>${icon('archive', 'i-coll')}Collections on JSTOR</a></div></nav>`;
  }

  function header(variant, active) {
    const home = variant === 'home';
    const row = `<div class="header-row"><div class="wrap">
      <div class="header-left">
        <button class="icon-btn menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav-menu">${icon('menu', 'i-lg i-menu')}${icon('close', 'i-lg i-close')}</button>
        <button class="search-field" type="button" data-open-search>${icon('search')}<span>Search JSTOR Daily</span></button>
      </div>
      ${home ? '<span class="header-logo-slot"></span>' : logo()}
      <div class="header-right">
        <a class="header-link" href="#newsletter" data-newsletter-link>Newsletter</a>
        <a class="btn btn-red btn-sm" href="#support">Become a member</a>
        <button class="icon-btn search-toggle-mobile" type="button" aria-label="Search" data-open-search>${icon('search', 'i-lg')}</button>
      </div></div></div>`;
    if (home) {
      return `<header class="site-header" id="site-header">${row}</header>
        <div class="masthead">${logo('logo-lg')}<p>From JSTOR, the nonprofit library for the intellectually curious</p></div>
        ${subnav(active, 'is-ruled home-subnav')}`;
    }
    return `<header class="site-header is-sticky" id="site-header">${row}${subnav(active)}</header>`;
  }

  function navMenu() {
    const f = JD.stories.pharmacist;
    return `<div class="nav-menu" id="nav-menu" aria-hidden="true">
      <div class="nav-menu-scrim" data-close-menu></div>
      <div class="nav-menu-panel" role="dialog" aria-label="Site menu"><div class="nav-menu-grid">
        <div class="nav-search"><button class="search-field" type="button" data-open-search>${icon('search')}<span>Search JSTOR Daily</span></button></div>
        <div class="nav-col"><h3>Sections</h3><ul>${SECTIONS.map((s) => `<li><a href="${sectionHref(s)}">${s}</a></li>`).join('')}</ul></div>
        <div class="nav-col"><h3>Explore</h3><ul>
          <li><a href="teaching.html">${icon('book')}Teaching &amp; Learning Resources</a></li>
          <li><a href="collections.html">${icon('archive')}Collections on JSTOR</a></li>
          <li><a href="search.html?q=Series">${icon('series')}All series</a></li>
          <li><a href="index.html#sleuth">The JSTOR Daily Sleuth</a></li></ul></div>
        <div class="nav-col"><h3>Get involved</h3><ul>
          <li><a href="index.html#newsletter">Newsletter</a></li>
          <li><a href="#contact">Contact the Editors</a></li>
          <li><a href="index.html#support">Become a Member</a></li>
          <li><a href="https://www.patreon.com/" target="_blank" rel="noopener">Support on Patreon</a></li></ul></div>
        <a class="nav-feature" href="${ARTICLE}"><img src="${JD.img(f.img)}" alt=""><p class="eyebrow">Featured today</p><h4>${f.title}</h4>${readTime(f.time)}</a>
      </div></div></div>`;
  }

  function searchLayer() {
    return `<div class="search-layer" id="search-layer" aria-hidden="true">
      <div class="search-scrim" data-close-search></div>
      <div class="search-bar"><div class="wrap">
        <button class="icon-btn menu-toggle" type="button" aria-label="Open menu" data-search-menu>${icon('menu', 'i-lg i-menu')}</button>
        <div class="search-center"><form class="search-box" action="search.html" role="search" autocomplete="off">
          <div class="search-input-wrap">${icon('search')}
            <input type="search" name="q" placeholder="Search articles, series, collections…" aria-label="Search JSTOR Daily" aria-autocomplete="list" aria-controls="search-dropdown">
            <button class="search-close" type="button" aria-label="Close search" data-close-search>${icon('close')}</button>
          </div>
          <div class="search-dropdown" id="search-dropdown"></div>
        </form></div>
        <span class="search-spacer"></span>
      </div></div></div>`;
  }

  function footer() {
    const col = (title, items) => `<div class="footer-col"><h3>${title}</h3><ul>${items.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></div>`;
    return `<footer class="site-footer" id="contact"><div class="wrap">
      <div class="footer-top">
        <div class="footer-brand">${logo('', true)}<p>JSTOR Daily provides context for current events using scholarship found in JSTOR, a digital library of academic journals, books, and other material. We publish articles grounded in peer-reviewed research and provide free access to that research for all of our readers.</p></div>
        ${col('About', [['About JSTOR Daily', '#'], ['Masthead', '#'], ['Submission Guidelines', '#'], ['The JSTOR Daily Sleuth', 'index.html#sleuth'], ['Teaching and Learning Resources', 'teaching.html'], ['American Prison Newspapers', '#']])}
        ${col('Connect', [['Contact the Editors', '#'], ['Newsletter', 'index.html#newsletter'], ['Unsubscribe', '#'], ['Support JSTOR Daily on Patreon', 'https://www.patreon.com/'], ['Advertising and Donations', '#'], ['RSS', '#']])}
      </div>
      <div class="footer-bottom"><p>JSTOR is part of ITHAKA, a not-for-profit organization helping the academic community use digital technologies to preserve the scholarly record.</p>
        <div class="footer-legal"><a href="https://www.jstor.org/" target="_blank" rel="noopener">JSTOR.org</a><a href="#">Terms and Conditions of Use</a><a href="#">Privacy Policy</a><a href="#">Cookie Policy</a><a href="#">Cookie Settings</a></div></div>
    </div></footer>`;
  }

  function toolhub() {
    return `<div class="toolhub is-collapsed" id="toolhub">
      <div class="toolhub-panel" role="region" aria-label="Article tools">
        <div class="th-rows">
          <button class="th-row" type="button" data-th="jump">${icon('doc')}<span>Jump to resources</span></button>
          <button class="th-row" type="button" data-th="share">${icon('share')}<span>Share article</span></button>
          <button class="th-row" type="button" data-th="top">${icon('arrowUp')}<span>Back to top</span></button>
          <button class="th-row" type="button" data-th="close">${icon('chevronDown')}<span>Close menu</span></button>
        </div>
        <button class="th-pill" type="button" data-th="open" aria-label="Open article tools" tabindex="-1">${icon('grid', 'i-grid')}<span class="th-label">Article tools</span>${icon('arrowUp', 'i-up')}</button>
      </div></div>`;
  }

  // ----- Cards -----
  function readTime(t) { return !t ? '' : `<span class="read-time">${icon('clock')}${t} min read</span>`; }
  function meta(s) {
    return `<div class="meta">${s.kind ? `<span class="kind">${icon(kindIcon[s.kind] || 'doc')}${s.kind}</span>` : ''}${s.label ? `<span class="kicker">${esc(s.label)}</span>` : ''}</div>`;
  }
  function attrs(s) { return `data-cat="${esc(s.cat || '')}" data-kind="${esc(s.kind || 'Article')}" data-search="${esc([s.title, s.dek, s.label, s.cat, s.kind, s.tags].join(' ').toLowerCase())}"`; }

  function card(s, opts = {}) {
    const img = opts.img != null ? opts.img : s.img;
    return `<a class="card ${opts.cls || ''}" href="${opts.href || ARTICLE}" ${attrs(s)}>
      <div class="card-img"><img src="${JD.img(img)}" alt="" loading="lazy"></div>
      ${meta(s)}<h3 class="card-title">${esc(s.title)}</h3>
      ${opts.dek && s.dek ? `<p class="card-dek">${esc(s.dek)}</p>` : ''}
      ${opts.time === false ? '' : readTime(s.time)}</a>`;
  }
  function rowCard(s, opts = {}) {
    const img = opts.img != null ? opts.img : s.img;
    return `<a class="row-card" href="${ARTICLE}" ${attrs(s)}><div class="row-body">${meta(s)}<h3 class="card-title">${esc(s.title)}</h3>${readTime(s.time)}</div><img src="${JD.img(img)}" alt="" loading="lazy"></a>`;
  }
  function textCard(s) {
    return `<a class="text-card" href="${ARTICLE}" ${attrs(s)}>${meta(s)}<h3 class="card-title">${esc(s.title)}</h3></a>`;
  }

  // data-cards="id@img,id" data-variant="card|row|text" data-dek data-size="sm|xs" data-notime
  function renderCards(root = document) {
    root.querySelectorAll('[data-cards]').forEach((el) => {
      const variant = el.dataset.variant || 'card';
      el.innerHTML = el.dataset.cards.split(',').map((entry) => {
        const [id, img] = entry.trim().split('@');
        const s = typeof id === 'object' ? id : JD.stories[id];
        if (!s) return '';
        const opts = { img: img ? +img : null, dek: 'dek' in el.dataset, cls: el.dataset.size ? 'card-' + el.dataset.size : '', time: 'notime' in el.dataset ? false : undefined };
        return variant === 'row' ? rowCard(s, opts) : variant === 'text' ? textCard(s) : card(s, opts);
      }).join('');
    });
  }

  Object.assign(JD, { icon, esc, sprite, header, navMenu, searchLayer, footer, toolhub, card, rowCard, textCard, readTime, meta, renderCards, ARTICLE });
})();
