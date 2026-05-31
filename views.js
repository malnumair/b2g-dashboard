/* ============================================================
   Aanaab B2G Dashboard — views (render functions)
   Each Views.* returns an HTML string for one section.
   ============================================================ */
const Views = (() => {
  const P = DATA.people;

  // ---------- icon set ----------
  const I = {
    grid:'<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
    pipe:'<path d="M3 6h18M6 12h12M10 18h4"/>',
    dollar:'<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    card:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
    chart:'<path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/>',
    checksq:'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    folder:'<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
    tasks:'<path d="M9 11H3v10h6zM15 3H9v18h6zM21 7h-6v14h6z"/>',
    refresh:'<path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    cal:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    check:'<path d="M20 6 9 17l-5-5"/>',
    up:'<path d="M7 17L17 7M17 7H8M17 7v9"/>',
    down:'<path d="M7 7l10 10M17 17H8M17 17V8"/>',
    search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    filter:'<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>',
    dots:'<circle cx="12" cy="5" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="19" r="1.6"/>',
    send:'<path d="m22 2-7 20-4-9-9-4 20-7z"/>',
    edit:'<path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>',
    call:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    warn:'<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/>',
    move:'<path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20"/>',
    bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>',
    download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    trend:'<path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/>',
    flag:'<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>',
  };
  const svg = (k, sw = 1.8) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${I[k]}</svg>`;

  // ---------- formatting ----------
  const M = v => `${v.toFixed(1)}M`;
  const full = n => n.toLocaleString('en-US');
  const av = (id, cls = '') => `<span class="av ${cls}" style="background:${P[id].color}">${id}</span>`;
  const stageById = id => DATA.stages.find(s => s.id === id);

  // ---------- shared blocks ----------
  function kpiCards() {
    const k = DATA.kpi;
    return `<section class="kpis">
      <div class="kpi">
        <div class="kpi__top"><span class="kpi__icon ink-purple">${svg('pipe',1.9)}</span><span class="kpi__label">Active Pipeline</span>
          <span class="kpi__spark">${Charts.spark([8,9,11,10,12,13,14.2],{color:'var(--acc)'})}</span></div>
        <div class="kpi__val money"><span class="cur">SAR</span>${M(k.pipeline)}</div>
        <div class="kpi__row"><span class="kpi__delta up">${svg('up',2.5)}+${k.pipelineDelta}%</span><span class="kpi__sub">vs last quarter · ${k.pipelineDeals} deals</span></div>
      </div>
      <div class="kpi">
        <div class="kpi__top"><span class="kpi__icon ink-green">${svg('check',2)}</span><span class="kpi__label">Won YTD</span>
          <span class="kpi__spark">${Charts.spark([3.1,3.8,4.4,5.0,5.6,6.2,6.8],{color:'#2EBD90'})}</span></div>
        <div class="kpi__val money"><span class="cur">SAR</span>${M(k.won)}</div>
        <div class="kpi__row"><span class="kpi__delta up">${svg('up',2.5)}+${k.wonDelta} deals</span><span class="kpi__sub">this month · ${k.wonDeals} won</span></div>
      </div>
      <div class="kpi">
        <div class="kpi__top"><span class="kpi__icon ink-accent">${svg('clock',1.9)}</span><span class="kpi__label">Win Rate</span>
          <span class="kpi__spark">${Charts.spark([45,44,46,43,44,43,42],{color:'#E5484D'})}</span></div>
        <div class="kpi__val num">${k.winRate}<span class="cur" style="font-size:18px;margin-inline-start:2px">%</span></div>
        <div class="kpi__row"><span class="kpi__delta down">${svg('down',2.5)}${k.winRateDelta}%</span><span class="kpi__sub">vs target ${k.winRateTarget}%</span></div>
      </div>
      <div class="kpi">
        <div class="kpi__top"><span class="kpi__icon ink-lime">${svg('target',1.9)}</span><span class="kpi__label">Revenue Target</span></div>
        <div class="kpi__val money" style="font-size:25px"><span class="cur">SAR</span>${M(k.targetAchieved)} <span style="font-size:14px;color:var(--app-fg-2);font-weight:600">/ ${k.target}M</span></div>
        <div class="kpi__bar"><i style="width:${(k.targetAchieved/k.target*100).toFixed(0)}%"></i></div>
        <div class="kpi__sub">${(k.targetAchieved/k.target*100).toFixed(0)}% of FY26 goal</div>
      </div>
    </section>`;
  }

  function funnelCard() {
    const byStage = {};
    DATA.stages.forEach(s => byStage[s.id] = { count: 0, val: 0 });
    DATA.deals.forEach(d => { byStage[d.stage].count++; byStage[d.stage].val += d.value; });
    const maxVal = Math.max(...DATA.stages.map(s => byStage[s.id].val)) || 1;
    const rows = DATA.stages.map(s => {
      const b = byStage[s.id];
      const w = Math.max(8, (b.val / maxVal) * 100);
      return `<div class="frow"><div class="fl">${s.name}<small>${b.count} deal${b.count!==1?'s':''}</small></div>
        <div class="ftrack"><i style="width:${w}%;background:${s.color}">${(b.val/1e6).toFixed(1)}M</i></div></div>`;
    }).join('');
    return `<div class="card"><div class="card__head"><h3>Pipeline by Stage</h3><span class="sub">Active · SAR</span></div>
      <div class="funnel">${rows}</div></div>`;
  }

  function winlossCard() {
    const total = DATA.winloss.reduce((s, d) => s + d.value, 0);
    const legend = DATA.winloss.map(d =>
      `<div class="li"><span class="sw" style="background:${d.color}"></span><span class="ln">${d.label}</span>
        <span class="lp">${(d.value/total*100).toFixed(0)}%</span><span class="lv money">${d.value.toFixed(1)}M</span></div>`).join('');
    return `<div class="card"><div class="card__head"><h3>Win / Loss</h3><span class="sub">SAR · YTD</span></div>
      <div class="donut-wrap">
        <div class="donut" style="width:150px;height:150px">${Charts.donut(DATA.winloss,{size:150,thickness:22})}
          <div class="donut__c"><b class="money">${total.toFixed(1)}M</b><span>decided</span></div></div>
        <div class="legend">${legend}</div>
      </div></div>`;
  }

  function trendCard() {
    return `<div class="card"><div class="card__head"><div><h3>Pipeline Created vs Won</h3></div>
      <div class="legend" style="flex-direction:row;gap:16px;flex:0">
        <span class="li" style="font-size:11.5px"><span class="sw" style="background:var(--acc)"></span>Created</span>
        <span class="li" style="font-size:11.5px"><span class="sw" style="background:#2EBD90"></span>Won</span></div></div>
      ${Charts.area([
        {values:DATA.trend.created,color:'#6F52FF',fill:true},
        {values:DATA.trend.won,color:'#2EBD90',fill:true},
      ], DATA.trend.months, {w:560,h:210})}</div>`;
  }

  function oppRow(d) {
    const probCls = d.prob === 'high' ? 'high' : d.prob === 'med' ? 'med' : 'low';
    const probTxt = d.prob === 'high' ? 'High' : d.prob === 'med' ? 'Medium' : 'Low';
    const probIcon = d.prob === 'high' ? svg('check',3) : '';
    const stale = d.days > 90;
    return `<tr>
      <td><div class="op-name">${d.name}</div><div class="op-client" dir="rtl">${d.client}</div></td>
      <td class="r val money">${full(d.value)}</td>
      <td><span class="prob ${probCls}">${probIcon}${probTxt}</span></td>
      <td><div class="owner">${av(d.owner)}${P[d.owner].name}</div></td>
      <td class="r"><span class="days-pill${stale?' stale':''}">${d.days}</span></td>
      <td class="next">${d.next}</td></tr>`;
  }

  function actionsCard() {
    const items = DATA.actions.map(a =>
      `<div class="ai${a.done?' done':''}"><span class="tick">${a.done?svg('check',3.5):''}</span>
        <div style="flex:1"><div class="tx">${a.t}</div><div class="dd">${a.dd}</div></div>
        ${a.done?'':`<span class="pri" style="background:${a.pri}"></span>`}</div>`).join('');
    return `<div class="card"><div class="card__head"><h3>Action Items</h3><span class="menu" style="color:var(--acc);font-weight:600;font-size:12px">+ Add</span></div>
      <div class="action-list">${items}</div></div>`;
  }

  function teamMiniCard() {
    const rows = DATA.team.slice(0,4).map(t => {
      const p = P[t.id];
      return `<div class="tr">${av(t.id)}<div class="info"><div class="nm">${p.name}</div>
        <div class="meta">${t.active} active · SAR ${t.value.toFixed(1)}M</div>
        <div class="loadbar"><i style="width:${t.load}%;background:${p.color}"></i></div></div></div>`;
    }).join('');
    return `<div class="card"><div class="card__head"><h3>Team Workload</h3></div><div class="team">${rows}</div></div>`;
  }

  function activityCard() {
    const tone = { pos:'ink-green', acc:'ink-accent', neg:'ink-red' };
    const rows = DATA.activity.map(a =>
      `<div class="act"><span class="ad ${tone[a.tone]}">${svg(a.icon,1.9)}</span>
        <div><div class="at">${a.txt}</div><div class="am">${a.t}</div></div></div>`).join('');
    return `<div class="card"><div class="card__head"><h3>Recent Activity</h3></div><div class="activity">${rows}</div></div>`;
  }

  // =========================================================
  //  VIEWS
  // =========================================================
  function executive() {
    return `${kpiCards()}
      ${trendCard()}
      <div class="grid-2">${funnelCard()}${winlossCard()}</div>
      <div class="grid-side">
        <div class="tablecard">
          <div class="tablecard__head"><h3>Top Opportunities</h3><span class="hint">Pending proposals ranked by value · stale &gt; 90 days</span></div>
          <table><thead><tr><th>Opportunity</th><th class="r">Value</th><th>Probability</th><th>Owner</th><th class="r">Days</th><th>Next Action</th></tr></thead>
            <tbody>${DATA.deals.filter(d=>d.stage==='sub'||d.stage==='dev'||d.stage==='appr').sort((a,b)=>b.value-a.value).slice(0,5).map(oppRow).join('')}</tbody></table>
        </div>
        <div class="stack">${actionsCard()}${teamMiniCard()}</div>
      </div>`;
  }

  function pipeline() {
    const byStage = {};
    DATA.stages.forEach(s => byStage[s.id] = []);
    DATA.deals.forEach(d => byStage[d.stage].push(d));
    const cols = DATA.stages.map(s => {
      const list = byStage[s.id];
      const sum = list.reduce((a, d) => a + d.value, 0);
      const cards = list.map(d => `<div class="kcard">
        <div class="kcard__t">${d.name}</div>
        <div class="kcard__cl" dir="rtl">${d.client}</div>
        <div class="kcard__foot"><span class="kcard__v money">SAR ${(d.value/1e6).toFixed(1)}M</span>${av(d.owner)}</div>
      </div>`).join('') || `<div class="kcol__sum" style="padding:14px 4px;color:var(--app-fg-3)">No deals</div>`;
      return `<div class="kcol">
        <div class="kcol__head"><span class="kd" style="background:${s.color}"></span><span class="kt">${s.name}</span><span class="kc">${list.length}</span></div>
        <div class="kcol__sum">SAR ${(sum/1e6).toFixed(1)}M</div>${cards}</div>`;
    }).join('');
    return `${pipelineKpis()}
      <div class="sec-title"><h2>Pipeline Board</h2><span>Drag-style stage view · 12 active opportunities</span></div>
      <div class="kanban">${cols}</div>
      <div class="grid-2">${funnelCard()}${velocityCard()}</div>`;
  }

  function pipelineKpis() {
    const total = DATA.deals.reduce((a,d)=>a+d.value,0)/1e6;
    const weighted = (DATA.deals.reduce((a,d)=>a+d.value*(d.prob==='high'?0.7:d.prob==='med'?0.4:0.15),0)/1e6);
    return `<section class="kpis">
      <div class="kpi"><div class="kpi__top"><span class="kpi__icon ink-purple">${svg('pipe',1.9)}</span><span class="kpi__label">Total Pipeline</span></div>
        <div class="kpi__val money"><span class="cur">SAR</span>${total.toFixed(1)}M</div><div class="kpi__sub">${DATA.deals.length} open opportunities</div></div>
      <div class="kpi"><div class="kpi__top"><span class="kpi__icon ink-accent">${svg('target',1.9)}</span><span class="kpi__label">Weighted Value</span></div>
        <div class="kpi__val money"><span class="cur">SAR</span>${weighted.toFixed(1)}M</div><div class="kpi__sub">probability-adjusted</div></div>
      <div class="kpi"><div class="kpi__top"><span class="kpi__icon ink-green">${svg('check',2)}</span><span class="kpi__label">Late Stage</span></div>
        <div class="kpi__val num">${DATA.deals.filter(d=>['sub','appr','po'].includes(d.stage)).length}</div><div class="kpi__sub">submitted or beyond</div></div>
      <div class="kpi"><div class="kpi__top"><span class="kpi__icon ink-red">${svg('warn',1.9)}</span><span class="kpi__label">Stale &gt; 90d</span></div>
        <div class="kpi__val num">${DATA.deals.filter(d=>d.days>90).length}</div><div class="kpi__sub">need follow-up</div></div>
    </section>`;
  }

  function velocityCard() {
    const data = [
      { label:'Qualify → Scope', v: 12 },
      { label:'Scope → Dev', v: 18 },
      { label:'Dev → Submit', v: 24 },
      { label:'Submit → Close', v: 30 },
    ];
    const mx = Math.max(...data.map(d=>d.v));
    const rows = data.map(d=>`<div class="bp"><span class="bl">${d.label}</span>
      <div class="bt"><i style="width:${d.v/mx*100}%;background:linear-gradient(90deg,var(--color-primary),var(--acc))"></i></div>
      <span class="bv">${d.v} days</span></div>`).join('');
    return `<div class="card"><div class="card__head"><h3>Avg. Stage Velocity</h3><span class="sub">days in stage</span></div><div class="barpair">${rows}</div></div>`;
  }

  function opportunities() {
    const rows = DATA.deals.sort((a,b)=>b.value-a.value).map(d => {
      const s = stageById(d.stage);
      const probCls = d.prob==='high'?'high':d.prob==='med'?'med':'low';
      const probTxt = d.prob==='high'?'High':d.prob==='med'?'Medium':'Low';
      const stale = d.days>90;
      return `<tr>
        <td><div class="op-name">${d.name}</div><div class="op-client" dir="rtl">${d.client}</div></td>
        <td><span class="tag"><span class="dot-s" style="background:${s.color}"></span>${s.name}</span></td>
        <td class="r val money">${full(d.value)}</td>
        <td><span class="prob ${probCls}">${d.prob==='high'?svg('check',3):''}${probTxt}</span></td>
        <td><div class="owner">${av(d.owner)}${P[d.owner].name}</div></td>
        <td class="r"><span class="days-pill${stale?' stale':''}">${d.days}d</span></td>
        <td class="next">${d.next}</td></tr>`;
    }).join('');
    const stageChips = ['All stages',...DATA.stages.map(s=>s.name)].map((c,i)=>`<span class="chip${i===0?' active':''}">${c}</span>`).join('');
    return `${pipelineKpis()}
      <div class="card" style="gap:14px">
        <div class="card__head"><div class="chips">${stageChips}</div>
          <div class="search">${svg('search',2)}<input placeholder="Search opportunities…"></div></div>
      </div>
      <div class="tablecard">
        <div class="tablecard__head"><h3>All Opportunities</h3>
          <div class="tbl-tools"><button class="btn btn-ghost">${svg('filter',2)}Filter</button>
            <button class="btn btn-ghost">${svg('download',2)}Export</button></div></div>
        <table><thead><tr><th>Opportunity</th><th>Stage</th><th class="r">Value</th><th>Probability</th><th>Owner</th><th class="r">Age</th><th>Next Action</th></tr></thead>
          <tbody>${rows}</tbody></table>
      </div>`;
  }

  function team() {
    const cards = DATA.team.map(t => {
      const p = P[t.id];
      const attainment = (t.value / t.quota * 100).toFixed(0);
      return `<div class="person">
        <div class="person__top">${av(t.id,'')}<div><div class="person__nm">${p.name}</div><div class="person__role">${p.role}</div></div></div>
        <div class="person__stats">
          <div class="pstat"><div class="pv money">${t.active}</div><div class="pl">Active deals</div></div>
          <div class="pstat"><div class="pv money">SAR ${t.value.toFixed(1)}M</div><div class="pl">Pipeline value</div></div>
          <div class="pstat"><div class="pv">${t.won}</div><div class="pl">Won YTD</div></div>
          <div class="pstat"><div class="pv">${t.winRate}%</div><div class="pl">Win rate</div></div>
        </div>
        <div><div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:5px;color:var(--app-fg-2);font-weight:600"><span>Quota attainment</span><span style="color:var(--app-fg)">${attainment}%</span></div>
          <div class="proj__bar"><i style="width:${Math.min(100,attainment)}%;background:${attainment>=70?'#2EBD90':attainment>=45?'var(--acc)':'#F2B22A'}"></i></div></div>
      </div>`;
    }).join('');
    const quotaRows = DATA.team.map(t=>{
      const p=P[t.id]; const pct=t.value/t.quota*100;
      return `<div class="bp"><span class="bl">${p.name}</span><div class="bt"><i style="width:${Math.min(100,pct)}%;background:${p.color}"></i></div><span class="bv">SAR ${t.value.toFixed(1)}M / ${t.quota.toFixed(1)}M</span></div>`;
    }).join('');
    return `<div class="sec-title"><h2>Team Performance</h2><span>5 members · FY2026</span></div>
      <div class="people">${cards}</div>
      <div class="grid-2">
        <div class="card"><div class="card__head"><h3>Quota Attainment</h3><span class="sub">SAR · FY26</span></div><div class="barpair">${quotaRows}</div></div>
        ${activityCard()}
      </div>`;
  }

  function receivables() {
    const k = DATA.kpi;
    const totalAging = DATA.aging.reduce((a,d)=>a+d.value,0);
    const overdue = DATA.aging.filter(a=>a.label!=='Current').reduce((s,a)=>s+a.value,0);
    const agingRows = DATA.aging.map(a=>`<div class="arow">
      <div class="al">${a.label} <small>· ${a.sub}</small></div>
      <div class="ftrack" style="height:22px"><i class="" style="display:block;height:100%;border-radius:7px;width:${a.value/totalAging*100}%;background:${a.color}"></i></div>
      <div class="av-amt money">${full(a.value)}K</div></div>`).join('');
    const statusMap = { 'current':['high','Current'], '1-30':['med','1–30d'], '31-60':['low','31–60d'], '90+':['low','90+ overdue'] };
    const invRows = DATA.invoices.map(v=>{
      const [cls,txt] = statusMap[v.status]||['med',v.status];
      return `<tr><td class="num">${v.no}</td><td><div class="op-client" dir="rtl" style="font-size:13px;color:var(--app-fg)">${v.client}</div></td>
        <td class="r val money">${full(v.amount)}</td><td class="num">${v.due}</td>
        <td><span class="prob ${cls}">${txt}</span></td></tr>`;
    }).join('');
    return `<section class="kpis">
        <div class="kpi"><div class="kpi__top"><span class="kpi__icon ink-purple">${svg('card',1.9)}</span><span class="kpi__label">Total Receivables</span></div>
          <div class="kpi__val money"><span class="cur">SAR</span>${(totalAging/1000).toFixed(1)}M</div><div class="kpi__sub">${DATA.invoices.length} open invoices</div></div>
        <div class="kpi"><div class="kpi__top"><span class="kpi__icon ink-red">${svg('warn',1.9)}</span><span class="kpi__label">Overdue</span></div>
          <div class="kpi__val money"><span class="cur">SAR</span>${(overdue/1000).toFixed(1)}M</div><div class="kpi__row"><span class="kpi__delta down">${svg('up',2.5)}${(overdue/totalAging*100).toFixed(0)}%</span><span class="kpi__sub">of total</span></div></div>
        <div class="kpi"><div class="kpi__top"><span class="kpi__icon ink-amber">${svg('clock',1.9)}</span><span class="kpi__label">Avg. Days to Pay</span></div>
          <div class="kpi__val num">52<span class="cur" style="font-size:16px;margin-inline-start:3px">days</span></div><div class="kpi__sub">target 45 days</div></div>
        <div class="kpi"><div class="kpi__top"><span class="kpi__icon ink-green">${svg('check',2)}</span><span class="kpi__label">Collected MTD</span></div>
          <div class="kpi__val money"><span class="cur">SAR</span>2.1M</div><div class="kpi__row"><span class="kpi__delta up">${svg('up',2.5)}+12%</span><span class="kpi__sub">vs last month</span></div></div>
      </section>
      <div class="grid-2">
        <div class="card"><div class="card__head"><h3>Aging Buckets</h3><span class="sub">SAR · thousands</span></div><div class="aging">${agingRows}</div></div>
        <div class="card"><div class="card__head"><h3>Collection Risk</h3><span class="sub">90+ days</span></div>
          <div class="donut-wrap"><div class="donut" style="width:140px;height:140px">${Charts.donut(DATA.aging,{size:140,thickness:20})}
            <div class="donut__c"><b>${(overdue/totalAging*100).toFixed(0)}%</b><span>overdue</span></div></div>
            <div class="legend">${DATA.aging.map(a=>`<div class="li"><span class="sw" style="background:${a.color}"></span><span class="ln">${a.label}</span><span class="lv money">${full(a.value)}K</span></div>`).join('')}</div></div></div>
      </div>
      <div class="tablecard"><div class="tablecard__head"><h3>Open Invoices</h3><span class="hint">sorted by due date</span></div>
        <table><thead><tr><th>Invoice</th><th>Client</th><th class="r">Amount</th><th>Due</th><th>Status</th></tr></thead><tbody>${invRows}</tbody></table></div>`;
  }

  function channels() {
    const totalV = DATA.channels.reduce((a,c)=>a+c.value,0);
    const mxV = Math.max(...DATA.channels.map(c=>c.value));
    const valRows = DATA.channels.map(c=>`<div class="bp"><span class="bl" style="font-size:12px">${c.name}</span>
      <div class="bt"><i style="width:${c.value/mxV*100}%;background:${c.color}"></i></div><span class="bv money">SAR ${c.value.toFixed(1)}M</span></div>`).join('');
    const winRows = DATA.channels.slice().sort((a,b)=>b.win-a.win).map(c=>`<div class="bp"><span class="bl" style="font-size:12px">${c.name}</span>
      <div class="bt"><i style="width:${c.win}%;background:${c.win>=50?'#2EBD90':'var(--acc)'}"></i></div><span class="bv">${c.win}%</span></div>`).join('');
    const donutData = DATA.channels.map(c=>({value:c.value,color:c.color}));
    return `<section class="kpis">
        <div class="kpi"><div class="kpi__top"><span class="kpi__icon ink-purple">${svg('chart',1.9)}</span><span class="kpi__label">Total Sourced</span></div>
          <div class="kpi__val money"><span class="cur">SAR</span>${totalV.toFixed(1)}M</div><div class="kpi__sub">across 5 channels</div></div>
        <div class="kpi"><div class="kpi__top"><span class="kpi__icon ink-accent">${svg('flag',1.9)}</span><span class="kpi__label">Top Channel</span></div>
          <div class="kpi__val" style="font-size:18px">Gov tenders</div><div class="kpi__sub">SAR 6.4M · 8 deals</div></div>
        <div class="kpi"><div class="kpi__top"><span class="kpi__icon ink-green">${svg('check',2)}</span><span class="kpi__label">Best Win Rate</span></div>
          <div class="kpi__val num">61<span class="cur" style="font-size:16px;margin-inline-start:3px">%</span></div><div class="kpi__sub">Partner referral</div></div>
        <div class="kpi"><div class="kpi__top"><span class="kpi__icon ink-amber">${svg('users',1.9)}</span><span class="kpi__label">Active Channels</span></div>
          <div class="kpi__val num">5</div><div class="kpi__sub">22 total deals</div></div>
      </section>
      <div class="grid-2">
        <div class="card"><div class="card__head"><h3>Pipeline by Channel</h3><span class="sub">SAR sourced</span></div><div class="barpair">${valRows}</div></div>
        <div class="card"><div class="card__head"><h3>Mix</h3><span class="sub">share of pipeline</span></div>
          <div class="donut-wrap"><div class="donut" style="width:140px;height:140px">${Charts.donut(donutData,{size:140,thickness:20})}
            <div class="donut__c"><b class="money">${totalV.toFixed(1)}M</b><span>sourced</span></div></div>
            <div class="legend">${DATA.channels.map(c=>`<div class="li"><span class="sw" style="background:${c.color}"></span><span class="ln" style="font-size:11.5px">${c.name}</span><span class="lv money">${(c.value/totalV*100).toFixed(0)}%</span></div>`).join('')}</div></div></div>
      </div>
      <div class="card"><div class="card__head"><h3>Win Rate by Channel</h3><span class="sub">closed-won %</span></div><div class="barpair">${winRows}</div></div>`;
  }

  // ---------- PM ----------
  function pmSummary() {
    const totalBudget = DATA.projects.reduce((a,p)=>a+p.budget,0);
    const avgProg = Math.round(DATA.projects.reduce((a,p)=>a+p.progress,0)/DATA.projects.length);
    const counts = { on:0, risk:0, late:0 };
    DATA.projects.forEach(p=>counts[p.health]++);
    const healthData = [
      {label:'On track',color:'#2EBD90',value:counts.on},
      {label:'At risk',color:'#F2B22A',value:counts.risk},
      {label:'Delayed',color:'#E5484D',value:counts.late},
    ];
    return `<section class="kpis">
        <div class="kpi"><div class="kpi__top"><span class="kpi__icon ink-purple">${svg('folder',1.9)}</span><span class="kpi__label">Active Projects</span></div>
          <div class="kpi__val num">${DATA.projects.length}</div><div class="kpi__sub">SAR ${totalBudget.toFixed(1)}M contracted</div></div>
        <div class="kpi"><div class="kpi__top"><span class="kpi__icon ink-green">${svg('check',2)}</span><span class="kpi__label">On Track</span></div>
          <div class="kpi__val num">${counts.on}</div><div class="kpi__sub">of ${DATA.projects.length} projects</div></div>
        <div class="kpi"><div class="kpi__top"><span class="kpi__icon ink-amber">${svg('warn',1.9)}</span><span class="kpi__label">Need Attention</span></div>
          <div class="kpi__val num">${counts.risk+counts.late}</div><div class="kpi__sub">${counts.late} delayed · ${counts.risk} at risk</div></div>
        <div class="kpi"><div class="kpi__top"><span class="kpi__icon ink-accent">${svg('trend',1.9)}</span><span class="kpi__label">Avg. Completion</span></div>
          <div class="kpi__val num">${avgProg}<span class="cur" style="font-size:16px;margin-inline-start:3px">%</span></div><div class="kpi__bar"><i style="width:${avgProg}%"></i></div></div>
      </section>
      <div class="grid-side">
        <div class="card"><div class="card__head"><h3>Project Progress</h3><span class="sub">% complete</span></div>
          <div class="barpair">${DATA.projects.map(p=>`<div class="bp"><span class="bl" style="font-size:12px">${p.name}</span>
            <div class="bt"><i style="width:${p.progress}%;background:${p.health==='on'?'#2EBD90':p.health==='risk'?'#F2B22A':'#E5484D'}"></i></div><span class="bv">${p.progress}%</span></div>`).join('')}</div></div>
        <div class="stack">
          <div class="card"><div class="card__head"><h3>Portfolio Health</h3></div>
            <div class="donut-wrap"><div class="donut" style="width:130px;height:130px">${Charts.donut(healthData,{size:130,thickness:18})}
              <div class="donut__c"><b>${DATA.projects.length}</b><span>projects</span></div></div>
              <div class="legend">${healthData.map(h=>`<div class="li"><span class="sw" style="background:${h.color}"></span><span class="ln">${h.label}</span><span class="lv">${h.value}</span></div>`).join('')}</div></div></div>
          ${activityCard()}
        </div>
      </div>`;
  }

  function projectsView() {
    const cards = DATA.projects.map(p=>{
      const hc = {on:'On track',risk:'At risk',late:'Delayed'}[p.health];
      const barColor = p.health==='on'?'#2EBD90':p.health==='risk'?'#F2B22A':'#E5484D';
      const avs = p.team.map(id=>av(id)).join('');
      return `<div class="proj">
        <div class="proj__top"><div><div class="proj__nm">${p.name}</div><div class="proj__cl" dir="rtl">${p.client}</div></div>
          <span class="health ${p.health}">${hc}</span></div>
        <div><div style="display:flex;justify-content:space-between;font-size:11.5px;margin-bottom:6px;color:var(--app-fg-2);font-weight:600"><span>Progress</span><span style="color:var(--app-fg)">${p.progress}%</span></div>
          <div class="proj__bar"><i style="width:${p.progress}%;background:${barColor}"></i></div></div>
        <div class="proj__meta">
          <span class="mi">${svg('cal',1.8)}Due <b>${p.due}</b></span>
          <span class="mi">${svg('dollar',1.8)}<b>SAR ${p.budget.toFixed(1)}M</b></span>
          <span class="mi">${svg('checksq',1.8)}<b>${p.tasks}</b> tasks</span>
          <span class="avstack" style="margin-inline-start:auto">${avs}</span></div>
      </div>`;
    }).join('');
    return `<div class="sec-title"><h2>Projects</h2><span>${DATA.projects.length} active engagements</span></div>
      <div class="projects">${cards}</div>`;
  }

  function tasksView() {
    const cols = [
      { id:'todo', name:'To Do', color:'#9782FF' },
      { id:'doing', name:'In Progress', color:'#6F52FF' },
      { id:'review', name:'Review', color:'#F2B22A' },
      { id:'done', name:'Done', color:'#2EBD90' },
    ];
    const priColor = { high:'#E5484D', med:'#F2B22A', low:'#9782FF' };
    const board = cols.map(c=>{
      const items = DATA.tasks[c.id]||[];
      const cards = items.map(t=>`<div class="kcard" style="cursor:default">
        <div style="display:flex;align-items:center;gap:8px"><span class="pri" style="background:${priColor[t.p]};margin-top:0"></span><span class="kcard__t" style="flex:1">${t.t}</span></div>
        <div class="kcard__foot"><span class="tag">${t.tag}</span><span style="font-size:11px;color:var(--app-fg-2);margin-inline-start:auto">${t.due}</span>${av(t.who)}</div>
      </div>`).join('') || `<div class="kcol__sum" style="padding:14px 4px;color:var(--app-fg-3)">Empty</div>`;
      return `<div class="kcol"><div class="kcol__head"><span class="kd" style="background:${c.color}"></span><span class="kt">${c.name}</span><span class="kc">${items.length}</span></div>${cards}</div>`;
    }).join('');
    const total = Object.values(DATA.tasks).reduce((a,l)=>a+l.length,0);
    return `<div class="sec-title"><h2>Tasks</h2><span>${total} tasks across 6 projects</span></div>
      <div class="kanban">${board}</div>`;
  }

  return {
    executive, pipeline, opportunities, team, receivables, channels,
    pmSummary, projects: projectsView, tasks: tasksView,
    svg, I,
  };
})();
