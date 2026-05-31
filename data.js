/* ============================================================
   Aanaab B2G Dashboard — sample data model
   Realistic Saudi B2G education sales/PM data for Aanaab.
   ============================================================ */
const DATA = (() => {
  const people = {
    MA: { id: 'MA', name: 'Mashari',  role: 'Sr. BD Manager', color: '#471895' },
    LA: { id: 'LA', name: 'Lina',     role: 'BD Manager',     color: '#6F52FF' },
    SA: { id: 'SA', name: 'Sara',     role: 'BD Executive',   color: '#9782FF' },
    OM: { id: 'OM', name: 'Omar',     role: 'BD Executive',   color: '#2EBD90' },
    HA: { id: 'HA', name: 'Hala',     role: 'Account Lead',   color: '#3E7BFA' },
  };

  // Pipeline stages (order = funnel order)
  const stages = [
    { id: 'qual',  name: 'Under Qualification', color: '#C9BCFF' },
    { id: 'scope', name: 'Scoping',             color: '#A892FF' },
    { id: 'dev',   name: 'Proposal Under-Dev.', color: '#8A70FF' },
    { id: 'sub',   name: 'Proposal Submitted',  color: '#6F52FF' },
    { id: 'appr',  name: 'Proposal Approved',   color: '#5A2FC2' },
    { id: 'po',    name: 'PO Received',          color: '#2EBD90' },
    { id: 'sign',  name: 'Contract Signed',     color: '#147A5A' },
  ];

  // Opportunities / deals
  const deals = [
    { name: 'Digital Training Packages',     client: 'المديرية العامة للدفاع المدني', clientEn: 'Civil Defense',       value: 4800000, stage: 'sub',  prob: 'high', owner: 'MA', days: 47,  next: 'Await committee' },
    { name: 'Teacher Microlearning',          client: 'وزارة التعليم',                  clientEn: 'Ministry of Education', value: 3200000, stage: 'sub',  prob: 'high', owner: 'LA', days: 62,  next: 'Clarification mtg' },
    { name: 'eLQA Certification Rollout',      client: 'المعهد الوطني للتطوير المهني',   clientEn: 'NIPTD',              value: 2400000, stage: 'dev',  prob: 'low',  owner: 'OM', days: 108, next: 'Stale — follow up' },
    { name: 'Gifted Program Content',          client: 'موهبة',                          clientEn: 'Mawhibah',           value: 1650000, stage: 'appr', prob: 'high', owner: 'SA', days: 27,  next: 'Pricing revision' },
    { name: 'Driver Training Localization',    client: 'دلّة لتعليم القيادة',            clientEn: 'Dallah',             value: 980000,  stage: 'po',   prob: 'high', owner: 'MA', days: 14,  next: 'Send SOW' },
    { name: 'Leadership Academy Program',      client: 'أكاديمية الملك سلمان',          clientEn: 'KS Academy',         value: 1320000, stage: 'sign', prob: 'high', owner: 'LA', days: 8,   next: 'Kickoff scheduled' },
    { name: 'STEM Curriculum Platform',        client: 'وزارة التعليم',                  clientEn: 'Ministry of Education', value: 2100000, stage: 'dev',  prob: 'med',  owner: 'HA', days: 33,  next: 'Scope workshop' },
    { name: 'Vocational LMS Migration',        client: 'المؤسسة العامة للتدريب التقني',  clientEn: 'TVTC',               value: 1850000, stage: 'scope',prob: 'med',  owner: 'LA', days: 21,  next: 'Discovery call' },
    { name: 'Royal Academy e-Content',         client: 'أكاديمية الملكة رانيا',          clientEn: 'Queen Rania Academy',value: 1420000, stage: 'qual', prob: 'med',  owner: 'SA', days: 9,   next: 'Qualify need' },
    { name: 'Cambridge Pathway Localisation',  client: 'دار الحكمة',                     clientEn: 'Dar Al-Hekma',       value: 1180000, stage: 'sub',  prob: 'high', owner: 'HA', days: 41,  next: 'Legal review' },
    { name: 'Music Education Modules',         client: 'هيئة الموسيقى',                   clientEn: 'Music Commission',   value: 760000,  stage: 'scope',prob: 'low',  owner: 'OM', days: 18,  next: 'Refine scope' },
    { name: 'Smart Assessment Engine',         client: 'هيئة تقويم التعليم',             clientEn: 'ETEC',               value: 2950000, stage: 'dev',  prob: 'high', owner: 'MA', days: 29,  next: 'Tech proposal' },
    { name: 'Adult Literacy Campaign',         client: 'وزارة التعليم',                  clientEn: 'Ministry of Education', value: 640000,  stage: 'qual', prob: 'low',  owner: 'OM', days: 6,   next: 'Intro deck' },
  ];

  // KPI headline figures
  const kpi = {
    pipeline: 14.2, pipelineDelta: 18, pipelineDeals: 17,
    won: 6.8, wonDeals: 9, wonDelta: 2,
    winRate: 42, winRateDelta: -3, winRateTarget: 45,
    target: 18, targetAchieved: 6.8,
    avgCycle: 84, avgCycleDelta: -6,
    receivables: 4.9, overdue: 1.3,
  };

  // Win / loss (SAR M)
  const winloss = [
    { label: 'Won',      value: 6.8, color: '#2EBD90' },
    { label: 'Lost',     value: 3.2, color: '#E5484D' },
    { label: 'Canceled', value: 1.1, color: '#9782FF' },
  ];

  // Monthly trend — pipeline created vs won (SAR M)
  const trend = {
    months: ['Nov','Dec','Jan','Feb','Mar','Apr','May'],
    created: [2.1, 1.6, 3.2, 2.8, 3.9, 3.1, 4.4],
    won:     [0.6, 0.9, 1.1, 0.8, 1.4, 1.0, 1.6],
  };

  // Team
  const team = [
    { id: 'MA', active: 5, value: 6.2, won: 3, winRate: 48, quota: 7.0, load: 86 },
    { id: 'LA', active: 4, value: 4.1, won: 2, winRate: 41, quota: 5.5, load: 64 },
    { id: 'SA', active: 3, value: 2.8, won: 2, winRate: 39, quota: 4.0, load: 46 },
    { id: 'OM', active: 3, value: 2.4, won: 1, winRate: 33, quota: 4.0, load: 40 },
    { id: 'HA', active: 4, value: 3.3, won: 1, winRate: 36, quota: 4.5, load: 58 },
  ];

  // Receivables aging (SAR K)
  const aging = [
    { label: 'Current',      sub: 'not due',     value: 1820, color: '#2EBD90' },
    { label: '1–30 days',    sub: 'overdue',     value: 980,  color: '#9782FF' },
    { label: '31–60 days',   sub: 'overdue',     value: 720,  color: '#F2B22A' },
    { label: '61–90 days',   sub: 'overdue',     value: 410,  color: '#F08C2E' },
    { label: '90+ days',     sub: 'at risk',     value: 470,  color: '#E5484D' },
  ];
  const invoices = [
    { no: 'INV-2026-0142', client: 'وزارة التعليم',        clientEn: 'Ministry of Education', amount: 920000, due: 'Jun 04', status: 'current' },
    { no: 'INV-2026-0138', client: 'موهبة',                clientEn: 'Mawhibah',           amount: 540000, due: 'May 22', status: '1-30' },
    { no: 'INV-2026-0131', client: 'دلّة لتعليم القيادة',   clientEn: 'Dallah',             amount: 310000, due: 'Apr 28', status: '31-60' },
    { no: 'INV-2026-0119', client: 'هيئة تقويم التعليم',   clientEn: 'ETEC',               amount: 470000, due: 'Feb 19', status: '90+' },
    { no: 'INV-2026-0151', client: 'المعهد الوطني للتطوير', clientEn: 'NIPTD',              amount: 280000, due: 'Jun 12', status: 'current' },
  ];

  // Lead sources / submission channels (mirrors live app: Etimad, Direct, Referral, RFP, CFP, Platform)
  const channels = [
    { name: 'Etimad (اعتماد)',   sub: 'Gov tender platform', deals: 8, value: 6.4, win: 38, color: '#471895' },
    { name: 'Direct',            sub: 'Outbound BD',         deals: 5, value: 3.1, win: 52, color: '#6F52FF' },
    { name: 'Referral',          sub: 'Partner intro',       deals: 4, value: 2.6, win: 61, color: '#2EBD90' },
    { name: 'RFP / CFP',         sub: 'Inbound bids',        deals: 3, value: 1.4, win: 33, color: '#9782FF' },
    { name: 'Platform',          sub: 'Aanaab inbound',      deals: 2, value: 0.7, win: 44, color: '#89B2FF' },
  ];

  // Projects (PM)
  const projects = [
    { name: 'Civil Defense LMS Build',    client: 'المديرية العامة للدفاع المدني', clientEn: 'Civil Defense',       progress: 72, health: 'on',   due: 'Aug 2026', budget: 4.8, team: ['MA','SA','HA'], tasks: '34/47' },
    { name: 'Teacher Microlearning v2',    client: 'وزارة التعليم',                clientEn: 'Ministry of Education', progress: 45, health: 'risk', due: 'Sep 2026', budget: 3.2, team: ['LA','OM'],      tasks: '21/48' },
    { name: 'Mawhibah Gifted Content',     client: 'موهبة',                        clientEn: 'Mawhibah',           progress: 88, health: 'on',   due: 'Jun 2026', budget: 1.65,team: ['SA','HA'],      tasks: '40/45' },
    { name: 'Dallah Driver Training',      client: 'دلّة لتعليم القيادة',          clientEn: 'Dallah',             progress: 30, health: 'late', due: 'Jul 2026', budget: 0.98,team: ['MA','OM'],      tasks: '12/40' },
    { name: 'ETEC Assessment Pilot',       client: 'هيئة تقويم التعليم',           clientEn: 'ETEC',               progress: 61, health: 'on',   due: 'Oct 2026', budget: 2.95,team: ['HA','LA','SA'], tasks: '28/46' },
    { name: 'TVTC Vocational LMS',         client: 'المؤسسة العامة للتدريب التقني', clientEn: 'TVTC',               progress: 18, health: 'risk', due: 'Dec 2026', budget: 1.85,team: ['LA'],            tasks: '7/39' },
  ];

  // Tasks board
  const tasks = {
    todo: [
      { t: 'Submit Civil Defense technical proposal', p: 'high', who: 'MA', due: 'Jun 2', tag: 'Proposal' },
      { t: 'Discovery call — TVTC migration',          p: 'med',  who: 'LA', due: 'Jun 3', tag: 'Sales' },
      { t: 'Draft Queen Rania intro deck',             p: 'low',  who: 'SA', due: 'Jun 6', tag: 'Sales' },
      { t: 'QA gifted content module 7',               p: 'med',  who: 'HA', due: 'Jun 4', tag: 'Delivery' },
    ],
    doing: [
      { t: 'Revise Mawhibah pricing sheet',            p: 'high', who: 'SA', due: 'May 31', tag: 'Proposal' },
      { t: 'ETEC tech proposal section 3',             p: 'high', who: 'MA', due: 'Jun 1', tag: 'Proposal' },
      { t: 'Civil Defense storyboard review',          p: 'med',  who: 'HA', due: 'Jun 2', tag: 'Delivery' },
    ],
    review: [
      { t: 'NPED clarification responses',             p: 'med',  who: 'OM', due: 'May 30', tag: 'Sales' },
      { t: 'Cambridge legal review packet',            p: 'high', who: 'HA', due: 'May 30', tag: 'Legal' },
    ],
    done: [
      { t: 'NPED follow-up call',                      p: 'low',  who: 'OM', due: 'Done', tag: 'Sales' },
      { t: 'Dallah SOW v1',                            p: 'med',  who: 'MA', due: 'Done', tag: 'Proposal' },
      { t: 'Music Commission scope notes',             p: 'low',  who: 'OM', due: 'Done', tag: 'Sales' },
    ],
  };

  const actions = [
    { t: 'Submit Civil Defense technical proposal', dd: 'Due Jun 2 · Mashari', pri: '#E5484D', done: false },
    { t: 'Revise Mawhibah pricing sheet',            dd: 'Due May 31 · Sara',  pri: '#F2B22A', done: false },
    { t: 'Chase ETEC overdue invoice',               dd: 'Due May 30 · Hala',  pri: '#E5484D', done: false },
    { t: 'NPED follow-up call',                      dd: 'Done · Omar',        pri: '#2EBD90', done: true },
  ];

  const activity = [
    { who: 'MA', txt: '<b>Mashari</b> moved <b>Driver Training</b> to PO Received', t: '12 min ago', icon: 'move', tone: 'pos' },
    { who: 'SA', txt: '<b>Sara</b> updated value on <b>Gifted Program</b> to SAR 1.65M', t: '1 hr ago',  icon: 'edit', tone: 'acc' },
    { who: 'LA', txt: '<b>Lina</b> logged a clarification meeting with <b>MoE</b>', t: '3 hr ago',  icon: 'call', tone: 'acc' },
    { who: 'OM', txt: '<b>eLQA Rollout</b> flagged stale — 108 days idle', t: 'Yesterday', icon: 'warn', tone: 'neg' },
    { who: 'HA', txt: '<b>Hala</b> submitted <b>Cambridge Pathway</b> proposal', t: 'Yesterday', icon: 'send', tone: 'pos' },
  ];

  return { people, stages, deals, kpi, winloss, trend, team, aging, invoices, channels, projects, tasks, actions, activity };
})();
