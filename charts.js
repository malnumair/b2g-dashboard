/* ============================================================
   Aanaab B2G Dashboard — SVG chart helpers
   Pure-function generators returning SVG strings.
   ============================================================ */
const Charts = (() => {

  const NS = 'http://www.w3.org/2000/svg';

  // ---- Donut ring (segments) -------------------------------------------
  // data: [{value, color}], size px, thickness px
  function donut(data, { size = 150, thickness = 22, gap = 0.012 } = {}) {
    const total = data.reduce((s, d) => s + d.value, 0) || 1;
    const r = (size - thickness) / 2;
    const c = size / 2;
    const circ = 2 * Math.PI * r;
    let offset = 0;
    const segs = data.map(d => {
      const frac = d.value / total;
      const len = Math.max(0, frac - gap) * circ;
      const dash = `${len} ${circ - len}`;
      const dashoffset = -offset * circ;
      offset += frac;
      return `<circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="${d.color}" stroke-width="${thickness}" stroke-dasharray="${dash}" stroke-dashoffset="${dashoffset}" stroke-linecap="butt" transform="rotate(-90 ${c} ${c})" style="transition:stroke-dasharray .8s cubic-bezier(.2,.7,.3,1)"/>`;
    }).join('');
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="overflow:visible">${segs}</svg>`;
  }

  // ---- Area + line chart -----------------------------------------------
  // series: [{values:[], color, fill:bool}], labels:[]
  function area(series, labels, { w = 560, h = 200, pad = 28, max = null } = {}) {
    const allVals = series.flatMap(s => s.values);
    const mx = max != null ? max : Math.max(...allVals) * 1.15;
    const innerW = w - pad * 2;
    const innerH = h - pad - 22;
    const n = labels.length;
    const X = i => pad + (innerW * i) / (n - 1);
    const Y = v => pad + innerH - (innerH * v) / mx;

    // gridlines (4)
    let grid = '';
    for (let g = 0; g <= 4; g++) {
      const y = pad + (innerH * g) / 4;
      const val = (mx * (4 - g) / 4);
      grid += `<line x1="${pad}" y1="${y}" x2="${w - pad}" y2="${y}" stroke="var(--app-line)" stroke-width="1"/>`;
      grid += `<text x="${pad - 8}" y="${y + 3}" text-anchor="end" font-size="10" fill="var(--app-fg-3)" font-family="var(--font-en)">${val.toFixed(1)}</text>`;
    }
    // x labels
    let xl = '';
    labels.forEach((l, i) => {
      xl += `<text x="${X(i)}" y="${h - 4}" text-anchor="middle" font-size="10.5" fill="var(--app-fg-2)" font-family="var(--font-en)" font-weight="600">${l}</text>`;
    });

    let paths = '';
    series.forEach((s, si) => {
      const pts = s.values.map((v, i) => `${X(i)},${Y(v)}`);
      const line = 'M' + pts.join(' L');
      if (s.fill) {
        const id = `agrad${si}_${Math.random().toString(36).slice(2, 6)}`;
        const fillPath = `${line} L${X(n - 1)},${pad + innerH} L${X(0)},${pad + innerH} Z`;
        paths += `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${s.color}" stop-opacity="0.28"/>
          <stop offset="100%" stop-color="${s.color}" stop-opacity="0"/></linearGradient></defs>`;
        paths += `<path d="${fillPath}" fill="url(#${id})"/>`;
      }
      paths += `<path d="${line}" fill="none" stroke="${s.color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
      // dots
      s.values.forEach((v, i) => {
        paths += `<circle cx="${X(i)}" cy="${Y(v)}" r="3" fill="var(--app-surface)" stroke="${s.color}" stroke-width="2"/>`;
      });
    });

    return `<svg width="100%" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" style="display:block">${grid}${paths}${xl}</svg>`;
  }

  // ---- Sparkline -------------------------------------------------------
  function spark(values, { w = 72, h = 30, color = 'var(--acc)', fill = true } = {}) {
    const mx = Math.max(...values), mn = Math.min(...values);
    const range = (mx - mn) || 1;
    const X = i => (w * i) / (values.length - 1);
    const Y = v => h - 3 - ((h - 6) * (v - mn)) / range;
    const pts = values.map((v, i) => `${X(i).toFixed(1)},${Y(v).toFixed(1)}`);
    const line = 'M' + pts.join(' L');
    const id = `sg${Math.random().toString(36).slice(2, 7)}`;
    let f = '';
    if (fill) {
      f = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${color}" stop-opacity=".25"/><stop offset="100%" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>
        <path d="${line} L${w},${h} L0,${h} Z" fill="url(#${id})"/>`;
    }
    return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block">${f}<path d="${line}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  // ---- Half-gauge ------------------------------------------------------
  function gauge(pct, { size = 150, thickness = 16, color = 'var(--acc)' } = {}) {
    const r = (size - thickness) / 2;
    const c = size / 2;
    const circ = Math.PI * r; // half
    const len = (Math.min(100, pct) / 100) * circ;
    const path = `M ${thickness/2} ${c} A ${r} ${r} 0 0 1 ${size - thickness/2} ${c}`;
    return `<svg width="${size}" height="${size/2 + 8}" viewBox="0 0 ${size} ${size/2 + 8}">
      <path d="${path}" fill="none" stroke="var(--app-surface-2)" stroke-width="${thickness}" stroke-linecap="round"/>
      <path d="${path}" fill="none" stroke="${color}" stroke-width="${thickness}" stroke-linecap="round" stroke-dasharray="${len} ${circ}" style="transition:stroke-dasharray .8s cubic-bezier(.2,.7,.3,1)"/>
    </svg>`;
  }

  return { donut, area, spark, gauge };
})();
