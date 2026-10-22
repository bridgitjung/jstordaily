(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const { icon, esc } = JD;
  const body = document.body;
  const mobile = window.matchMedia('(max-width: 767px)');

  // ----- Inject shared chrome -----
  body.insertAdjacentHTML('afterbegin', JD.sprite());
  const headerSlot = $('#site-header');
  if (headerSlot) headerSlot.outerHTML = JD.header(body.dataset.header || 'page', body.dataset.active || '');
  const footerSlot = $('#site-footer');
  if (footerSlot) footerSlot.outerHTML = JD.footer();
  body.insertAdjacentHTML('beforeend', JD.navMenu() + JD.searchLayer() + '<div class="toast" role="status" aria-live="polite"></div>');
  if (body.dataset.toolhub !== undefined) body.insertAdjacentHTML('beforeend', JD.toolhub());
  JD.renderCards();

  const toastEl = $('.toast');
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), 2200);
  }

  async function share() {
    const data = { title: document.title, url: location.href };
    if (navigator.share && mobile.matches) {
      try { await navigator.share(data); } catch (e) { /* dismissed */ }
      return;
    }
    try { await navigator.clipboard.writeText(location.href); toast('Link copied to clipboard'); }
    catch (e) { toast('Link: ' + location.href); }
  }

  // ----- Nav menu -----
  const menu = $('#nav-menu');
  const headerRow = $('.header-row');
  const toggles = $$('.site-header .menu-toggle');
  function placeMenu() {
    const top = headerRow ? Math.max(0, headerRow.getBoundingClientRect().bottom) : 0;
    menu.style.top = top + 'px';
  }
  function setMenu(open) {
    if (open) { closeSearch(); placeMenu(); }
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    body.classList.toggle('menu-open', open);
    body.classList.toggle('is-locked', open && mobile.matches);
    toggles.forEach((t) => { t.setAttribute('aria-expanded', String(open)); t.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); });
  }
  const menuOpen = () => menu.classList.contains('is-open');
  toggles.forEach((t) => t.addEventListener('click', () => setMenu(!menuOpen())));
  $$('[data-close-menu]', menu).forEach((el) => el.addEventListener('click', () => setMenu(false)));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  window.addEventListener('resize', () => menuOpen() && placeMenu());
  window.addEventListener('scroll', () => menuOpen() && placeMenu(), { passive: true });

  // ----- Search overlay -----
  const layer = $('#search-layer');
  const input = $('input', layer);
  const dropdown = $('#search-dropdown');
  let lastFocus = null;
  let searchTimer;
  let hlIndex = -1;

  function recommendations() {
    return `<div class="sd-cols">
      <div><p class="sd-label">Trending searches</p><div class="chip-row">${JD.trendingSearches.map((t) => `<a class="chip chip-sm" href="search.html?q=${encodeURIComponent(t)}">${esc(t)}</a>`).join('')}</div></div>
      <div class="sd-explore"><p class="sd-label">Explore</p>
        <a href="teaching.html">${icon('book')}<div><strong>Teaching &amp; Learning Resources</strong><span>Essays, syllabi and reading lists for the classroom</span></div></a>
        <a href="collections.html">${icon('archive')}<div><strong>Collections on JSTOR</strong><span>Stories from primary sources and archives</span></div></a>
        <a href="search.html?q=Series">${icon('series')}<div><strong>Browse all series</strong><span>Ongoing columns from our editors</span></div></a></div>
    </div>
    <div class="sd-trending"><p class="sd-label">Trending stories</p>${JD.trending.map((t, i) => `<a href="${JD.ARTICLE}"><b>${i + 1}</b>${esc(t)}</a>`).join('')}</div>`;
  }

  function highlight(term, q) {
    const i = term.toLowerCase().indexOf(q.toLowerCase());
    if (i < 0) return esc(term);
    return esc(term.slice(0, i)) + '<b>' + esc(term.slice(i, i + q.length)) + '</b>' + esc(term.slice(i + q.length));
  }

  function matchStories(q) {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return Object.values(JD.stories).filter((s) => {
      const hay = [s.title, s.dek, s.label, s.cat, s.kind, s.tags].join(' ').toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }

  function liveResults(q, loading) {
    const ql = q.toLowerCase();
    const terms = JD.searchTerms.filter((t) => t.toLowerCase().split(/\s+/).some((w, i, ws) => ws.slice(i).join(' ').startsWith(ql))).slice(0, 4);
    const suggest = `<div class="sd-suggest" role="listbox">${(terms.length ? terms : [q]).map((t) => `<a role="option" href="search.html?q=${encodeURIComponent(t)}">${icon('search')}<span>${highlight(t, q)}</span></a>`).join('')}</div>`;
    let results;
    if (loading) {
      results = `<div class="sd-results" aria-busy="true">${'<div class="skeleton"><div class="sk-img"></div><div class="sk-lines"><div class="sk-line" style="width:30%"></div><div class="sk-line" style="width:85%"></div><div class="sk-line" style="width:55%"></div></div></div>'.repeat(2)}</div>`;
    } else {
      const hits = matchStories(q).slice(0, 3);
      results = hits.length
        ? `<div class="sd-results"><p class="sd-label">Top results</p>${hits.map((s) => `<a class="sd-result" href="${JD.ARTICLE}"><img src="${JD.img(s.img)}" alt=""><div>${JD.meta(s)}<h4>${esc(s.title)}</h4></div></a>`).join('')}</div>`
        : `<div class="sd-results"><p class="sd-empty">No stories match “${esc(q)}” yet. Try a broader term.</p></div>`;
    }
    return suggest + results + `<a class="sd-all" href="search.html?q=${encodeURIComponent(q)}">See all results for “${esc(q)}”${icon('arrowRight')}</a>`;
  }

  function renderDropdown() {
    const q = input.value.trim();
    hlIndex = -1;
    clearTimeout(searchTimer);
    if (!q) { dropdown.innerHTML = recommendations(); return; }
    dropdown.innerHTML = liveResults(q, true);
    searchTimer = setTimeout(() => { dropdown.innerHTML = liveResults(q, false); }, 450);
  }

  function openSearch(e) {
    if (e) e.preventDefault();
    setMenu(false);
    lastFocus = document.activeElement;
    const params = new URLSearchParams(location.search);
    if (!input.value && params.get('q') && body.dataset.page === 'search') input.value = params.get('q');
    renderDropdown();
    layer.classList.add('is-open');
    layer.setAttribute('aria-hidden', 'false');
    body.classList.add('is-locked');
    setTimeout(() => input.focus(), 30);
  }
  function closeSearch() {
    if (!layer.classList.contains('is-open')) return;
    layer.classList.remove('is-open');
    layer.setAttribute('aria-hidden', 'true');
    body.classList.remove('is-locked');
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener('click', (e) => { if (e.target.closest('[data-open-search]')) openSearch(e); });
  $$('[data-close-search]', layer).forEach((el) => el.addEventListener('click', closeSearch));
  $('[data-search-menu]', layer).addEventListener('click', () => { closeSearch(); setMenu(true); });
  input.addEventListener('input', renderDropdown);
  input.addEventListener('keydown', (e) => {
    const opts = $$('.sd-suggest a, .sd-result', dropdown);
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (!opts.length) return;
      e.preventDefault();
      hlIndex = (hlIndex + (e.key === 'ArrowDown' ? 1 : -1) + opts.length) % opts.length;
      opts.forEach((o, i) => o.classList.toggle('is-hl', i === hlIndex));
    } else if (e.key === 'Enter' && hlIndex >= 0 && opts[hlIndex]) {
      e.preventDefault();
      location.href = opts[hlIndex].href;
    }
  });
  $('form', layer).addEventListener('submit', (e) => { if (!input.value.trim()) e.preventDefault(); });

  // ----- Keyboard -----
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeSearch(); setMenu(false); closeRefPop(); }
    if (e.key === '/' && !/input|textarea|select/i.test(document.activeElement.tagName)) openSearch(e);
  });

  // ----- JSTOR resource popups -----
  let pop = null, popTimer, popFor = null;
  function closeRefPop() { if (pop) pop.classList.remove('is-open'); popFor = null; }
  function showRefPop(link) {
    const ref = JD.refs[link.dataset.ref];
    if (!ref) return;
    if (!pop) {
      pop = document.createElement('div');
      pop.className = 'ref-pop';
      pop.setAttribute('role', 'dialog');
      body.appendChild(pop);
      pop.addEventListener('mouseenter', () => clearTimeout(popTimer));
      pop.addEventListener('mouseleave', () => { popTimer = setTimeout(closeRefPop, 200); });
    }
    pop.innerHTML = `<div class="rp-head"><span class="j-box">J</span>From the JSTOR library</div>
      <div class="rp-main"><div class="rp-thumb"><span></span><span></span><span></span><span></span><span></span><span></span></div>
        <div><h4>${esc(ref.title)}</h4><p class="rp-cite">${esc(ref.cite)}</p></div></div>
      <p class="rp-desc">${esc(ref.desc)}</p>
      <a class="btn btn-dark btn-block" href="https://www.jstor.org/" target="_blank" rel="noopener">Go to JSTOR ${icon('external')}</a>`;
    const r = link.getBoundingClientRect();
    const w = Math.min(380, window.innerWidth - 32);
    let left = r.left + window.scrollX;
    left = Math.max(16, Math.min(left, window.scrollX + window.innerWidth - w - 16));
    pop.style.left = left + 'px';
    pop.style.top = (r.bottom + window.scrollY + 8) + 'px';
    popFor = link;
    void pop.offsetWidth;
    pop.classList.add('is-open');
  }
  $$('.jstor-ref').forEach((link) => {
    link.addEventListener('mouseenter', () => { clearTimeout(popTimer); popTimer = setTimeout(() => showRefPop(link), 180); });
    link.addEventListener('mouseleave', () => { clearTimeout(popTimer); popTimer = setTimeout(closeRefPop, 250); });
    link.addEventListener('focus', () => showRefPop(link));
    link.addEventListener('blur', () => { popTimer = setTimeout(() => { if (!pop || !pop.contains(document.activeElement)) closeRefPop(); }, 150); });
    link.addEventListener('click', (e) => {
      // Touch: first tap previews, second tap follows the link.
      if (window.matchMedia('(hover: none)').matches && popFor !== link) { e.preventDefault(); showRefPop(link); }
    });
  });
  document.addEventListener('click', (e) => { if (pop && popFor && !e.target.closest('.ref-pop, .jstor-ref')) closeRefPop(); });

  // ----- Carousels -----
  $$('[data-carousel]').forEach((root) => {
    const track = $('.carousel-track', root);
    const prev = $('[data-prev]', root), next = $('[data-next]', root), count = $('[data-count]', root);
    const step = () => track.clientWidth * 0.9;
    function update() {
      const max = track.scrollWidth - track.clientWidth - 2;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max;
      if (count) {
        const pages = Math.max(1, Math.ceil(track.scrollWidth / track.clientWidth - 0.05));
        const page = Math.min(pages, Math.round(track.scrollLeft / track.clientWidth) + 1);
        count.textContent = `${track.scrollLeft >= max ? pages : page} / ${pages}`;
      }
    }
    prev && prev.addEventListener('click', () => track.scrollBy({ left: -step() }));
    next && next.addEventListener('click', () => track.scrollBy({ left: step() }));
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });

  // ----- Filter chips (search results / collections) -----
  $$('[data-filter-group]').forEach((group) => {
    const target = $(group.dataset.filterGroup);
    group.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      e.preventDefault();
      $$('.chip', group).forEach((c) => c.classList.toggle('is-active', c === chip));
      const f = chip.dataset.filter || '';
      const accepted = f.split('|');
      let shown = 0;
      $$('[data-cat]', target).forEach((card) => {
        const ok = !f || accepted.includes(card.dataset.cat) || accepted.includes(card.dataset.kind);
        card.hidden = !ok;
        if (ok) shown++;
      });
      document.dispatchEvent(new CustomEvent('jd:filtered', { detail: { shown, filter: f } }));
    });
  });

  // ----- Newsletter forms -----
  $$('form[data-subscribe]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = $('input[type=email]', form);
      if (!email.checkValidity() || !email.value) { email.reportValidity(); return; }
      form.outerHTML = `<p class="subscribe-done" role="status">Thanks! Check ${esc(email.value)} to confirm your subscription.</p>`;
    });
  });

  // ----- Article actions -----
  $$('[data-share]').forEach((b) => b.addEventListener('click', share));
  $$('[data-save]').forEach((b) => b.addEventListener('click', () => {
    const saved = b.classList.toggle('is-saved');
    b.setAttribute('aria-pressed', String(saved));
    $('span', b).textContent = saved ? 'Saved' : 'Save';
    toast(saved ? 'Saved to your reading list' : 'Removed from your reading list');
  }));

  // ----- Article tool hub -----
  const hub = $('#toolhub');
  if (hub) {
    const pill = $('.th-pill', hub);
    const rows = $$('.th-row', hub);
    function setHub(collapsed) {
      hub.classList.toggle('is-collapsed', collapsed);
      pill.tabIndex = collapsed ? 0 : -1;
      rows.forEach((r) => (r.tabIndex = collapsed ? -1 : 0));
    }
    hub.addEventListener('click', (e) => {
      const b = e.target.closest('[data-th]');
      if (!b) return;
      const act = b.dataset.th;
      if (act === 'open') { setHub(false); rows[0].focus({ preventScroll: true }); }
      if (act === 'close') { setHub(true); pill.focus({ preventScroll: true }); }
      if (act === 'jump') { $('#resources').scrollIntoView({ behavior: 'smooth' }); if (mobile.matches) setHub(true); }
      if (act === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); if (mobile.matches) setHub(true); }
      if (act === 'share') share();
    });
  }

  JD.toast = toast;
})();
