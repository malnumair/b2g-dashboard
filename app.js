/* ============================================================
   Aanaab B2G Dashboard — app boot, router, tweaks
   Vanilla. Implements the host edit-mode (Tweaks) protocol.
   ============================================================ */

// ---- Persisted tweak defaults (host rewrites this block on disk) ----
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "density": "comfortable",
  "accent": "#6F52FF"
}/*EDITMODE-END*/;

const ACCENTS = {
  '#6F52FF': { ink: '#471895', soft: '#ECE8FF', name: 'Bright Purple' },
  '#471895': { ink: '#2E0E63', soft: '#ECE6F8', name: 'Elegant Purple' },
  '#2EBD90': { ink: '#147A5A', soft: '#E4F6EE', name: 'Phosphoric Green' },
  '#3E7BFA': { ink: '#1E4FB8', soft: '#E5EDFF', name: 'Signal Blue' },
};

// ---- Nav config ----
const NAV = [
  { group: 'Business Development', items: [
    { id: 'executive',     label: 'Executive Summary', icon: 'grid',    crumb: 'Business Development' },
    { id: 'pipeline',      label: 'Pipeline',          icon: 'pipe',    count: 12, crumb: 'Business Development' },
    { id: 'opportunities', label: 'Opportunities',     icon: 'dollar',  count: 12, crumb: 'Business Development' },
    { id: 'team',          label: 'Team',              icon: 'users',   crumb: 'Business Development' },
    { id: 'receivables',   label: 'Receivables',       icon: 'card',    crumb: 'Business Development' },
    { id: 'channels',      label: 'Channels',          icon: 'chart',   crumb: 'Business Development' },
  ]},
  { group: 'Project Management', items: [
    { id: 'pmSummary',     label: 'PM Summary',        icon: 'checksq', crumb: 'Project Management' },
    { id: 'projects',      label: 'Projects',          icon: 'folder',  count: 6,  crumb: 'Project Management' },
    { id: 'tasks',         label: 'Tasks',             icon: 'tasks',   count: 12, crumb: 'Project Management' },
  ]},
];
const TITLES = {};
NAV.forEach(g => g.items.forEach(it => TITLES[it.id] = it));

let CURRENT = location.hash.replace('#', '') || 'executive';
if (!TITLES[CURRENT]) CURRENT = 'executive';

// ---- Build sidebar ----
function buildSidebar() {
  const wrap = document.getElementById('navScroll');
  wrap.innerHTML = NAV.map(g => `
    <div class="side__group">
      <div class="side__label">${g.group}</div>
      ${g.items.map(it => `<a class="nav-item" data-view="${it.id}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${Views.I[it.icon]}</svg>
        <span>${it.label}</span>${it.count != null ? `<span class="count">${it.count}</span>` : ''}
      </a>`).join('')}
    </div>`).join('');
  wrap.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', () => go(el.dataset.view));
  });
}

// ---- Router ----
function go(view) {
  if (!TITLES[view]) view = 'executive';
  CURRENT = view;
  history.replaceState(null, '', '#' + view);
  // active nav
  document.querySelectorAll('.nav-item').forEach(el => el.classList.toggle('active', el.dataset.view === view));
  // topbar
  const meta = TITLES[view];
  document.getElementById('crumb').textContent = meta.crumb;
  document.getElementById('title').textContent = meta.label;
  // render
  const host = document.getElementById('viewHost');
  host.innerHTML = `<div class="view active">${Views[view]()}</div>`;
  // animate bars in
  requestAnimationFrame(() => animateBars(host));
  bindInteractions(host);
  host.scrollTop = 0;
  document.querySelector('.main').scrollTo({ top: 0 });
}

function animateBars(scope) {
  // Grow bars from 0 to final width (skipped if motion is reduced / paused).
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  scope.querySelectorAll('.ftrack i, .loadbar i, .proj__bar i, .bp .bt i, .kpi__bar i').forEach(el => {
    const w = el.style.width;
    if (!w) return;
    el.style.width = '0%';
    requestAnimationFrame(() => requestAnimationFrame(() => { el.style.width = w; }));
  });
}

// ---- In-view interactions ----
function bindInteractions(scope) {
  // action item toggles
  scope.querySelectorAll('.ai .tick').forEach(t => {
    t.addEventListener('click', () => {
      const ai = t.closest('.ai');
      ai.classList.toggle('done');
      t.innerHTML = ai.classList.contains('done')
        ? '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
        : '';
    });
  });
  // filter chips
  scope.querySelectorAll('.chips').forEach(group => {
    group.querySelectorAll('.chip').forEach(c => c.addEventListener('click', () => {
      group.querySelectorAll('.chip').forEach(x => x.classList.remove('active'));
      c.classList.add('active');
    }));
  });
}

// ---- Topbar segmented year ----
function bindTopbar() {
  document.querySelectorAll('.seg button').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.seg button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
  }));
  document.getElementById('btnRefresh').addEventListener('click', () => go(CURRENT));
}

/* ============================================================
   TWEAKS — vanilla panel + host protocol
   ============================================================ */
const Tweaks = (() => {
  let state = { ...TWEAK_DEFAULTS };
  let panel = null;

  function apply() {
    const root = document.documentElement;
    root.dataset.theme = state.theme;
    root.dataset.density = state.density;
    const a = ACCENTS[state.accent] || ACCENTS['#6F52FF'];
    root.style.setProperty('--acc', state.accent);
    root.style.setProperty('--acc-ink', a.ink);
    root.style.setProperty('--acc-soft', a.soft);
  }

  function persist(edits) {
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
  }
  function set(key, val) {
    state[key] = val;
    apply();
    persist({ [key]: val });
    if (panel) renderBody();
  }

  const STYLE = `
    .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:264px;
      display:flex;flex-direction:column;background:rgba(255,255,255,.82);color:#1b1626;
      -webkit-backdrop-filter:blur(22px) saturate(160%);backdrop-filter:blur(22px) saturate(160%);
      border:.5px solid rgba(255,255,255,.6);border-radius:14px;
      box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 14px 44px rgba(20,8,40,.22);
      font:12px/1.4 'Poppins',system-ui,sans-serif;overflow:hidden}
    html[data-theme="dark"] .twk-panel{background:rgba(34,28,50,.9);color:#efeef5;border-color:rgba(255,255,255,.1)}
    .twk-hd{display:flex;align-items:center;justify-content:space-between;padding:11px 9px 11px 15px;cursor:move;user-select:none}
    .twk-hd b{font-size:12.5px;font-weight:600}
    .twk-x{border:0;background:transparent;color:currentColor;opacity:.5;width:22px;height:22px;border-radius:6px;cursor:pointer;font-size:13px}
    .twk-x:hover{background:rgba(0,0,0,.07);opacity:1}
    .twk-body{padding:2px 15px 16px;display:flex;flex-direction:column;gap:13px}
    .twk-sect{font-size:9.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.5;padding-top:4px}
    .twk-row{display:flex;flex-direction:column;gap:7px}
    .twk-lbl{font-weight:500;opacity:.8;font-size:11.5px}
    .twk-seg{display:flex;padding:2px;border-radius:9px;background:rgba(0,0,0,.07);gap:2px}
    html[data-theme="dark"] .twk-seg{background:rgba(255,255,255,.08)}
    .twk-seg button{flex:1;border:0;background:transparent;color:inherit;font:inherit;font-weight:500;font-size:11.5px;padding:6px 4px;border-radius:7px;cursor:pointer;opacity:.7}
    .twk-seg button.on{background:#fff;opacity:1;box-shadow:0 1px 3px rgba(0,0,0,.12);font-weight:600}
    html[data-theme="dark"] .twk-seg button.on{background:rgba(255,255,255,.16)}
    .twk-chips{display:flex;gap:8px}
    .twk-chip{flex:1;height:42px;border:0;border-radius:8px;cursor:pointer;position:relative;
      box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.08);transition:transform .12s}
    .twk-chip:hover{transform:translateY(-1px)}
    .twk-chip.on{box-shadow:0 0 0 2px #1b1626,0 2px 6px rgba(0,0,0,.18)}
    html[data-theme="dark"] .twk-chip.on{box-shadow:0 0 0 2px #fff,0 2px 6px rgba(0,0,0,.3)}
    .twk-chip svg{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:15px;height:15px}
  `;

  function renderBody() {
    const body = panel.querySelector('.twk-body');
    const seg = (key, opts) => `<div class="twk-seg">${opts.map(o =>
      `<button data-k="${key}" data-v="${o.v}" class="${state[key]===o.v?'on':''}">${o.l}</button>`).join('')}</div>`;
    body.innerHTML = `
      <div class="twk-sect">Appearance</div>
      <div class="twk-row"><span class="twk-lbl">Theme</span>${seg('theme',[{v:'light',l:'Light'},{v:'dark',l:'Dark'}])}</div>
      <div class="twk-row"><span class="twk-lbl">Density</span>${seg('density',[{v:'comfortable',l:'Comfortable'},{v:'compact',l:'Compact'}])}</div>
      <div class="twk-sect">Brand Accent</div>
      <div class="twk-row"><div class="twk-chips">${Object.keys(ACCENTS).map(c =>
        `<button class="twk-chip ${state.accent===c?'on':''}" data-acc="${c}" style="background:${c}" title="${ACCENTS[c].name}">
          ${state.accent===c?'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>':''}</button>`).join('')}</div></div>`;
    body.querySelectorAll('.twk-seg button').forEach(b => b.addEventListener('click', () => set(b.dataset.k, b.dataset.v)));
    body.querySelectorAll('.twk-chip').forEach(b => b.addEventListener('click', () => set('accent', b.dataset.acc)));
  }

  function open() {
    if (panel) { panel.style.display = 'flex'; return; }
    const style = document.createElement('style'); style.textContent = STYLE; document.head.appendChild(style);
    panel = document.createElement('div');
    panel.className = 'twk-panel';
    panel.innerHTML = `<div class="twk-hd"><b>Tweaks</b><button class="twk-x" aria-label="Close">✕</button></div><div class="twk-body"></div>`;
    document.body.appendChild(panel);
    renderBody();
    panel.querySelector('.twk-x').addEventListener('click', dismiss);
    dragify(panel.querySelector('.twk-hd'), panel);
  }
  function close() { if (panel) panel.style.display = 'none'; }
  function dismiss() { close(); window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); }

  function dragify(handle, el) {
    handle.addEventListener('mousedown', e => {
      if (e.target.closest('.twk-x')) return;
      const r = el.getBoundingClientRect();
      let sr = innerWidth - r.right, sb = innerHeight - r.bottom, sx = e.clientX, sy = e.clientY;
      const mv = ev => { el.style.right = Math.max(8, sr-(ev.clientX-sx))+'px'; el.style.bottom = Math.max(8, sb-(ev.clientY-sy))+'px'; };
      const up = () => { removeEventListener('mousemove', mv); removeEventListener('mouseup', up); };
      addEventListener('mousemove', mv); addEventListener('mouseup', up);
    });
  }

  function init() {
    apply();
    addEventListener('message', e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') open();
      else if (t === '__deactivate_edit_mode') close();
    });
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
  }
  return { init };
})();

// ---- Boot ----
function boot() {
  buildSidebar();
  bindTopbar();
  Tweaks.init();
  go(CURRENT);
}
document.addEventListener('DOMContentLoaded', boot);
