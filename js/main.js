(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const anim = document.documentElement.classList.contains('anim');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const SITE = 'https://www.dailysmilesdental.com/';
  const BOOK = 'https://www.zocdoc.com/practice/daily-smiles-dental-60365?lock=true&isNewPatient=false&referrerType=widget';
  const CALL = 'tel:+12142339460';

  /* ---------- "I'm here because..." ---------- */
  const WHY = [
    { chip: 'I need a checkup', title: 'Checkups for the whole family.',
      line: 'Gentle preventive care for kids and adults, in a practice where nobody gets rushed out the door.',
      svc: [['Checkups and cleanings', 'dental-checkups-and-cleanings.html'], ["Children's dentistry", 'childrens-dentistry.html'], ['Sedation dentistry', 'sedation-dentistry.html'], ['Dental sealants', 'dental-sealants.html'], ['Gum disease treatment', 'gum-disease-treatment.html']] },
    { chip: "I'm in pain", title: 'Same-day emergency care.',
      line: "Not every dentist in Dallas offers it. We do, because emergencies don't wait.", call: true,
      svc: [['Emergency dentistry', 'emergency-dentistry.html'], ['Root canal therapy', 'root-canal-therapy.html'], ['Tooth extractions', 'tooth-extractions.html']] },
    { chip: 'I have a broken tooth', title: 'Repair it, naturally.',
      line: 'Crowns and tooth-colored fillings that restore a cavity or a broken tooth.',
      svc: [['Dental crowns', 'dental-crowns.html'], ['Tooth-colored fillings', 'tooth-colored-fillings.html'], ['Restorative dentistry', 'restorative-dentistry.html']] },
    { chip: "I'm missing teeth", title: 'Replace what is missing.',
      line: 'Dental implants are widely regarded as the gold standard, because they restore the root as well as the visible crown.',
      svc: [['Dental implants', 'dental-implants.html'], ['All-on-4 dental implants', 'all-on-4-dental-implants.html'], ['Implant dentures', 'implant-dentures.html'], ['Dental bridges', 'dental-bridges.html'], ['Dentures', 'full-and-partial-dentures.html'], ['Implant failure and salvage', 'dental-implant-failure.html']] },
    { chip: "I'm unhappy with my smile", title: 'A smile you want to show.',
      line: 'Cosmetic dentistry shaped around the smile you have in mind.',
      svc: [['Porcelain veneers', 'porcelain-veneers.html'], ['Teeth whitening', 'teeth-whitening.html'], ['Dental bonding', 'dental-bonding.html'], ['Cosmetic dentistry', 'cosmetic-dentistry.html']] },
    { chip: 'I want straighter teeth', title: 'Straighter, your way.',
      line: 'Braces or Invisalign, for kids and adults. Invisalign consultations are free right now.',
      svc: [['Invisalign', 'invisalign.html'], ['Braces', 'braces.html'], ['Orthodontics', 'orthodontic-dentistry.html']] }
  ];
  const opts = $('#opts'), answer = $('#answer');
  WHY.forEach((w, i) => {
    const b = document.createElement('button');
    b.textContent = w.chip; b.setAttribute('aria-pressed', i === 0);
    b.onclick = () => { $$('button', opts).forEach(x => x.setAttribute('aria-pressed', x === b)); showWhy(i, true); };
    opts.appendChild(b);
  });
  function showWhy(i, animate) {
    const w = WHY[i];
    answer.innerHTML =
      '<div><h3>' + w.title + '</h3><p>' + w.line + '</p><a class="btn mag" href="' + (w.call ? CALL : BOOK) + '">' + (w.call ? 'Call (214) 233-9460' : 'Book online') + '</a></div>' +
      '<div>' + w.svc.map(([n, u], k) => '<a class="svc" style="--k:' + k + '" href="' + SITE + u + '">' + n + '<i>→</i></a>').join('') + '</div>';
    if (animate) { answer.classList.remove('swap'); void answer.offsetWidth; answer.classList.add('swap'); }
    bindMagnets(answer);
  }

  /* ---------- Paying ---------- */
  const PAY = [
    ['Dental insurance', 'Insurance, maximized.', 'We work with virtually all major PPO dental plans, so understanding the cost and getting the most from your benefits is a breeze.'],
    ['Medicaid and CHIP', 'Kids are covered.', "Medicaid and CHIP coverage for children is warmly welcomed. If you have Medicaid or Medicare, we'll maximize your coverage."],
    ['CareCredit financing', 'Spread it out.', "Having a big treatment plan, or no insurance right now? Low-interest financing can be arranged through CareCredit."]
  ];
  const ptabs = $('#ptabs'), ppanel = $('#ppanel');
  PAY.forEach((p, i) => {
    const b = document.createElement('button');
    b.textContent = p[0]; b.setAttribute('aria-pressed', i === 0);
    b.onclick = () => { $$('button', ptabs).forEach(x => x.setAttribute('aria-pressed', x === b)); showPay(i, true); };
    ptabs.appendChild(b);
  });
  function showPay(i, animate) {
    ppanel.innerHTML = '<h3>' + PAY[i][1] + '</h3><p>' + PAY[i][2] + '</p>';
    if (animate) { ppanel.classList.remove('swap'); void ppanel.offsetWidth; ppanel.classList.add('swap'); }
  }

  /* ---------- FAQ ---------- */
  const FAQ = [
    ['How can I make a same-day appointment with an emergency dentist?', 'Not every dentist in Dallas offers same-day emergency care. Dr. Arrechea knows these situations happen suddenly, so our team is proud to offer same-day emergency dentistry. Call (214) 233-9460.'],
    ['How do I find a dentist who does dental implants?', "Implants are widely regarded as the gold standard for replacing missing teeth. Many general dentists partner with specialists, like oral surgeons and periodontists, to place them. Dr. Arrechea then restores the implant with a custom crown, bridge or denture. Browse Google reviews and schedule a consultation to see if we're the right fit."],
    ["What if I can't afford to see the dentist?", 'There are options. We maximize Medicaid and Medicare coverage, accept all PPO dental plans and offer flexible financing through CareCredit. If you have questions about coverage or affordability, call the office.'],
    ['How much does a checkup and cleaning cost?', 'It varies with in-network or out-of-network status, location and your dental health. Across the U.S., a routine checkup and cleaning typically costs $200 to $350, and with insurance these visits are usually fully covered.']
  ];
  const faqs = $('#faqs');
  faqs.innerHTML = FAQ.map((f, i) =>
    '<div class="q"><button aria-expanded="' + (i === 0) + '" aria-controls="a' + i + '" id="q' + i + '">' + f[0] + '</button><div class="a" id="a' + i + '" role="region" aria-labelledby="q' + i + '"><div><p>' + f[1] + '</p></div></div></div>').join('');
  $$('button', faqs).forEach(b => b.onclick = () => {
    const open = b.getAttribute('aria-expanded') === 'true';
    $$('button', faqs).forEach(x => x.setAttribute('aria-expanded', 'false'));
    b.setAttribute('aria-expanded', String(!open));
  });

  /* ---------- Hours as faces (Dallas time) ---------- */
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const HRS = [[9, 18], [9, 18], [9, 18], [9, 18], [9, 15], null, null];
  const fmt = h => { const hh = Math.floor(h); return ((hh + 11) % 12 + 1) + (hh >= 12 ? ' pm' : ' am'); };
  const label = h => h ? (h[0] % 12 || 12) + ' to ' + fmt(h[1]).replace(' ', '') : 'Closed';
  const week = $('#week');
  week.innerHTML = DAYS.map((d, i) =>
    '<div class="day' + (HRS[i] ? '' : ' off') + '" data-i="' + i + '" style="--k:' + i + '"><b>' + d + '</b><div class="dface"><i></i></div><span>' + label(HRS[i]) + '</span></div>').join('');
  $$('.dface', week).forEach((f, i) => f.style.setProperty('--k', i));
  function status() {
    const p = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
    const d = DAYS.indexOf(p.find(x => x.type === 'weekday').value.slice(0, 3));
    const h = +p.find(x => x.type === 'hour').value % 24 + +p.find(x => x.type === 'minute').value / 60;
    const t = HRS[d], open = t && h >= t[0] && h < t[1];
    let text;
    if (open) text = 'Open now, until ' + fmt(t[1]);
    else {
      let n = d, add = 0;
      if (t && h < t[0]) text = 'Closed. Opens today at ' + fmt(t[0]);
      else { do { n = (n + 1) % 7; add++; } while (!HRS[n]); text = 'Closed. Opens ' + (add === 1 ? 'tomorrow' : FULLDAY[n]) + ' at ' + fmt(HRS[n][0]); }
    }
    $('#vd').className = 'dot' + (open ? ' on' : ''); $('#vs').textContent = text;
    $$('.day', week).forEach(r => r.classList.toggle('today', +r.dataset.i === d));
  }
  const FULLDAY = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  status(); setInterval(status, 60000);

  /* ---------- Reveals ---------- */
  $$('[data-stagger]').forEach(p => [...p.children].forEach((c, i) => { c.setAttribute('data-reveal', ''); c.style.setProperty('--d', i); }));
  showWhy(0, false); showPay(0, false);
  const targets = $$('[data-reveal]');
  if (anim && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(t => io.observe(t));
    setTimeout(() => targets.forEach(t => { if (!t.classList.contains('in') && t.getBoundingClientRect().top < innerHeight * 1.3) t.classList.add('in'); }), 3500);
  } else targets.forEach(t => t.classList.add('in'));

  /* ---------- Progress bar and nav ---------- */
  const bar = $('#bar'), progress = $('#progress');
  let last = scrollY, queued = false;
  function onScroll() {
    if (queued) return; queued = true;
    requestAnimationFrame(() => {
      const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
      bar.classList.toggle('solid', y > 20);
      bar.classList.toggle('hide', y > last && y > 240);
      last = y; queued = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- Magnetic buttons (mouse only) ---------- */
  function bindMagnets(root) {
    if (!(anim && finePointer)) return;
    $$('.mag', root).forEach(el => {
      if (el._m) return; el._m = true;
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        el.style.transform = 'translate(' + (e.clientX - r.left - r.width / 2) * 0.2 + 'px,' + (e.clientY - r.top - r.height / 2) * 0.28 + 'px)';
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }
  bindMagnets(document);

  /* ---------- The hero face: eyes follow you, click to wink ---------- */
  const face = $('#face');
  if (anim) {
    addEventListener('pointermove', e => {
      const r = face.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height * 0.22;
      const dx = e.clientX - cx, dy = e.clientY - cy, d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 260);
      face.style.setProperty('--px', (dx / d * k).toFixed(3));
      face.style.setProperty('--py', (dy / d * k).toFixed(3));
    }, { passive: true });
    face.addEventListener('click', () => { face.classList.add('wink'); setTimeout(() => face.classList.remove('wink'), 650); });
  }
})();
