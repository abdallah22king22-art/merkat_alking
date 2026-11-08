import './style.css';

const TELEGRAM = 'https://t.me/z_b_w_1';
const categories = [
  { id: 'all', label: 'الكل', icon: '✦' },
  { id: 'games', label: 'شحن ألعاب', icon: '🎮' },
  { id: 'subs', label: 'اشتراكات', icon: '⚡' },
  { id: 'cards', label: 'بطاقات رقمية', icon: '💳' },
  { id: 'apps', label: 'تطبيقات وأدوات', icon: '◈' },
];
const products = [
  { id: 1, name: 'شدات ببجي موبايل', desc: 'اختار الباقة المناسبة لحسابك', category: 'games', tag: 'الأكثر طلبًا', icon: '🎯', color: 'red', price: 55, old: 65, unit: 'تبدأ من', details: 'شحن سريع بعد تأكيد بيانات الطلب. السعر المعروض تجريبي ويُعدّل من لوحة المنتجات.' },
  { id: 2, name: 'شحن فري فاير', desc: 'جواهر وباقات متنوعة', category: 'games', tag: 'شحن ألعاب', icon: '🔥', color: 'orange', price: 40, old: 50, unit: 'تبدأ من', details: 'حدد الباقة المطلوبة عند إتمام الطلب. الأسعار هنا أمثلة قابلة للتعديل.' },
  { id: 3, name: 'Telegram Premium', desc: 'مزايا إضافية وتجربة بدون إعلانات', category: 'subs', tag: 'اشتراك', icon: '✈️', color: 'blue', price: 120, old: null, unit: 'تبدأ من', details: 'اختار المدة والتفاصيل في رسالة الطلب.' },
  { id: 4, name: 'ChatGPT Plus', desc: 'اشتراك وأدوات ذكاء اصطناعي', category: 'subs', tag: 'رقمي', icon: '✳', color: 'green', price: 250, old: null, unit: 'تبدأ من', details: 'تفاصيل التفعيل والتوفر يتم تأكيدها قبل الدفع.' },
  { id: 5, name: 'بطاقات Google Play', desc: 'بطاقات رقمية بقيم مختلفة', category: 'cards', tag: 'بطاقات', icon: '▶', color: 'multi', price: 100, old: null, unit: 'تبدأ من', details: 'تأكد من توافق منطقة البطاقة مع حسابك قبل الطلب.' },
  { id: 6, name: 'بطاقات Apple', desc: 'رصيد رقمي وخيارات متعددة', category: 'cards', tag: 'بطاقات', icon: '', color: 'silver', price: 150, old: null, unit: 'تبدأ من', details: 'اختار القيمة المطلوبة وتأكد من توافق المنطقة.' },
  { id: 7, name: 'أدوات صناع المحتوى', desc: 'خدمات وأدوات رقمية مختارة', category: 'apps', tag: 'أدوات', icon: '✎', color: 'purple', price: 80, old: null, unit: 'تبدأ من', details: 'اكتب اسم الأداة أو الخدمة المطلوبة في ملاحظات الطلب.' },
  { id: 8, name: 'رصيد وخدمات رقمية', desc: 'اسألنا عن الخدمة اللي محتاجها', category: 'apps', tag: 'خدمات', icon: '⚡', color: 'yellow', price: 50, old: null, unit: 'تبدأ من', details: 'التوفر والسعر النهائي يتأكدان قبل إتمام الطلب.' },
];
const state = { category: 'all', search: '', cart: [], drawer: false, modal: null };
const money = n => `${Number(n).toLocaleString('en-US')} ج.م`;
const app = document.querySelector('#app');

function productCard(p) {
  return `<article class="product-card">
    <div class="product-art art-${p.color}">
      <span class="product-tag">${p.tag}</span><span class="product-icon">${p.icon}</span>
      <span class="art-glow"></span>
    </div>
    <div class="product-info">
      <div class="product-category">${categories.find(c => c.id === p.category)?.label || 'منتجات رقمية'}</div>
      <h3>${p.name}</h3><p>${p.desc}</p>
      <div class="product-bottom"><div class="price"><small>${p.unit}</small><strong>${money(p.price)}</strong>${p.old ? `<del>${money(p.old)}</del>` : ''}</div>
      <button class="add-btn" data-add="${p.id}" aria-label="أضف ${p.name} للسلة">＋</button></div>
    </div>
  </article>`;
}
function render() {
  const filtered = products.filter(p => (state.category === 'all' || p.category === state.category) && `${p.name} ${p.desc}`.toLowerCase().includes(state.search.toLowerCase()));
  const count = state.cart.reduce((s, i) => s + i.qty, 0);
  app.innerHTML = `
    <div class="announcement"><span class="pulse"></span> متجر رقمي واحد — اختار خدمتك واطلب بسهولة <a href="${TELEGRAM}" target="_blank" rel="noreferrer">تواصل معانا ↗</a></div>
    <header class="site-header">
      <a class="brand" href="#" aria-label="ماركت الكينج الرئيسية"><span class="brand-mark">K</span><span><b>ماركت <em>الكينج</em></b><small>YOUR DIGITAL KINGDOM</small></span></a>
      <nav class="desktop-nav"><a class="active" href="#home">الرئيسية</a><a href="#shop">المتجر</a><a href="#why">ليه الكينج؟</a><a href="#contact">تواصل معانا</a></nav>
      <div class="header-actions"><button class="icon-btn search-toggle" aria-label="بحث">⌕</button><button class="cart-btn" data-cart><span>السلة</span><span class="cart-symbol">▣</span><b class="cart-count">${count}</b></button><button class="menu-btn" aria-label="القائمة">☰</button></div>
    </header>
    <main>
      <section class="hero" id="home">
        <div class="hero-grid"></div><div class="hero-copy"><div class="eyebrow"><span>✦</span> أهلاً بيك في عالم الكينج</div>
          <h1>كل اللي محتاجه<br> <span>رقميًا.</span> في مكان واحد.</h1>
          <p>شحن ألعاب، اشتراكات، بطاقات وخدمات رقمية — اختار اللي يناسبك وخلي الباقي علينا.</p>
          <div class="hero-buttons"><a class="primary-btn" href="#shop">تصفح المتجر <span>←</span></a><a class="secondary-btn" href="${TELEGRAM}" target="_blank" rel="noreferrer">اسألنا على تليجرام ↗</a></div>
          <div class="hero-proof"><div class="proof-avatars"><i>م</i><i>ك</i><i>★</i></div><span><b>خدمة على مزاجك</b><small>اسأل قبل ما تطلب في أي وقت</small></span></div>
        </div>
        <div class="hero-visual"><div class="hero-orbit orbit-one"></div><div class="hero-orbit orbit-two"></div><div class="king-card"><div class="king-card-top"><span>MK / DIGITAL STORE</span><span class="live-dot">● ONLINE</span></div><div class="crown">♛</div><div class="king-word">THE KING</div><div class="king-sub">YOUR DIGITAL WORLD</div><div class="card-lines"><i></i><i></i><i></i></div><div class="card-foot"><span>MARKET EL KING</span><span>EST. 2026</span></div></div><div class="float-chip chip-one">⚡ <span>خدمات رقمية</span></div><div class="float-chip chip-two">🎮 <span>شحن ألعاب</span></div><div class="visual-caption">YOUR NEXT LEVEL STARTS HERE</div></div>
        <div class="hero-bottom"><span>01 / 04</span><div class="hero-progress"><i></i></div><span>SMART. SIMPLE. DIGITAL.</span></div>
      </section>
      <section class="benefit-strip"><div><span class="benefit-icon">⚡</span><span><b>طلب سهل</b><small>خطوات بسيطة وواضحة</small></span></div><div><span class="benefit-icon">♧</span><span><b>تواصل مباشر</b><small>اسألنا قبل ما تشتري</small></span></div><div><span class="benefit-icon">◈</span><span><b>خيارات متنوعة</b><small>خدمات في مكان واحد</small></span></div><div><span class="benefit-icon">♡</span><span><b>اهتمام بالعميل</b><small>متابعين معاك خطوة بخطوة</small></span></div></section>
      <section class="shop-section section-wrap" id="shop">
        <div class="section-heading"><div><div class="eyebrow">اختار اللي يناسبك</div><h2>المتجر <span>بتاعك.</span></h2><p>دور على خدمتك أو اختار قسم من الأقسام.</p></div><div class="search-box"><span>⌕</span><input id="search-input" value="${escapeHtml(state.search)}" placeholder="بتدور على إيه؟"><button data-clear-search aria-label="مسح البحث">×</button></div></div>
        <div class="category-row">${categories.map(c => `<button class="category-chip ${state.category === c.id ? 'selected' : ''}" data-category="${c.id}"><span>${c.icon}</span>${c.label}</button>`).join('')}</div>
        <div class="product-grid">${filtered.length ? filtered.map(productCard).join('') : '<div class="empty-state">مفيش نتائج مطابقة — جرّب كلمة تانية.</div>'}</div>
        <div class="catalog-note"><span>✦</span><p><b>مش لاقي اللي بتدور عليه؟</b><br>ابعتلنا على تليجرام وهنساعدك تعرف المتاح.</p><a href="${TELEGRAM}" target="_blank" rel="noreferrer">اسأل الكينج ↗</a></div>
      </section>
      <section class="why-section" id="why"><div class="section-wrap why-inner"><div><div class="eyebrow">مش مجرد متجر</div><h2>تجربة أسهل.<br><span>اختيار أذكى.</span></h2><p>هدفنا إنك تلاقي الخدمة اللي محتاجها من غير لف كتير. ولو محتار، تواصل معانا قبل الطلب.</p><a class="primary-btn" href="${TELEGRAM}" target="_blank" rel="noreferrer">كلمنا دلوقتي ↗</a></div><div class="why-cards"><div class="why-card"><span>01</span><b>اختار خدمتك</b><p>تصفح الأقسام وشوف الخيارات المتاحة.</p></div><div class="why-card"><span>02</span><b>راجع طلبك</b><p>ضيف المنتجات للسلة وتأكد من الكمية.</p></div><div class="why-card"><span>03</span><b>أكد على تليجرام</b><p>ابعت تفاصيل طلبك وتأكد من السعر النهائي.</p></div><div class="why-card featured"><span>MK</span><b>الكينج معاك</b><p>لو عندك سؤال، التواصل المباشر أسهل.</p></div></div></div></section>
      <section class="contact-section section-wrap" id="contact"><div class="contact-panel"><div><div class="eyebrow">جاهز تطلب؟</div><h2>خلينا نساعدك<br><span>توصل للي محتاجه.</span></h2><p>ابعتلنا على تليجرام، اسأل عن التوفر والأسعار، وهنمشي معاك خطوة بخطوة.</p></div><a class="telegram-cta" href="${TELEGRAM}" target="_blank" rel="noreferrer"><span>✈</span><span><b>تواصل على تليجرام</b><small>@z_b_w_1</small></span><strong>↗</strong></a></div></section>
    </main>
    <footer><a class="brand footer-brand" href="#home"><span class="brand-mark">K</span><span><b>ماركت <em>الكينج</em></b><small>YOUR DIGITAL KINGDOM</small></span></a><p>متجرك الرقمي — اختار، اسأل، واطلب بسهولة.</p><span class="copyright">© 2026 ماركت الكينج. كل الحقوق محفوظة.</span></footer>
    <div class="toast" id="toast" role="status"></div>
    <div class="drawer-backdrop ${state.drawer ? 'show' : ''}" data-close-drawer></div>
    <aside class="cart-drawer ${state.drawer ? 'open' : ''}" aria-label="سلة المشتريات"><div class="drawer-head"><div><span class="eyebrow">طلبك</span><h3>سلة المشتريات</h3></div><button class="close-drawer" data-close-drawer>×</button></div><div class="drawer-items">${state.cart.length ? state.cart.map(i => `<div class="cart-item"><div class="mini-art art-${i.color}">${i.icon}</div><div class="cart-item-info"><b>${i.name}</b><small>${money(i.price)} للقطعة</small><div class="qty-control"><button data-qty="${i.id}" data-delta="-1">−</button><span>${i.qty}</span><button data-qty="${i.id}" data-delta="1">＋</button></div></div><button class="remove-item" data-remove="${i.id}" aria-label="حذف">×</button></div>`).join('') : '<div class="cart-empty"><span>▣</span><b>السلة لسه فاضية</b><p>ضيف المنتجات اللي محتاجها وهتظهر هنا.</p><button class="secondary-btn" data-close-drawer>تصفح المنتجات</button></div>'}</div>${state.cart.length ? `<div class="drawer-summary"><div><span>الإجمالي المبدئي</span><b>${money(state.cart.reduce((s,i)=>s+i.price*i.qty,0))}</b></div><small>السعر النهائي والتوفر يتم تأكيدهما قبل الدفع.</small><button class="primary-btn checkout-btn" data-checkout>إتمام الطلب على تليجرام ↗</button></div>` : ''}</aside>
    <div class="modal-backdrop ${state.modal ? 'show' : ''}" data-close-modal></div>
    <section class="product-modal ${state.modal ? 'open' : ''}" aria-label="تفاصيل المنتج">${state.modal ? modalContent(products.find(p=>p.id===state.modal)) : ''}</section>
  `;
  bind();
}
function modalContent(p) {
  if (!p) return '';
  return `<button class="modal-close" data-close-modal>×</button><div class="modal-art art-${p.color}">${p.icon}</div><div class="product-category">${categories.find(c=>c.id===p.category)?.label}</div><h3>${p.name}</h3><p>${p.details}</p><div class="modal-price">${money(p.price)} <small>— سعر مبدئي</small></div><button class="primary-btn modal-add" data-add="${p.id}">أضف للسلة ＋</button><a class="modal-telegram" href="${TELEGRAM}" target="_blank" rel="noreferrer">اسأل عن المنتج على تليجرام ↗</a>`;
}
function bind() {
  document.querySelectorAll('[data-category]').forEach(b => b.addEventListener('click', () => { state.category = b.dataset.category; render(); }));
  document.querySelectorAll('[data-add]').forEach(b => b.addEventListener('click', () => {
    const p = products.find(p => p.id === Number(b.dataset.add)); const item = state.cart.find(i => i.id === p.id);
    if (item) item.qty++; else state.cart.push({...p, qty:1});
    state.drawer = true; state.modal = null; render(); toast(`اتضاف ${p.name} للسلة`);
  }));
  document.querySelectorAll('[data-cart]').forEach(b => b.addEventListener('click', () => { state.drawer = true; render(); }));
  document.querySelectorAll('[data-close-drawer]').forEach(b => b.addEventListener('click', () => { state.drawer = false; render(); }));
  document.querySelectorAll('[data-qty]').forEach(b => b.addEventListener('click', () => { const i = state.cart.find(i=>i.id===Number(b.dataset.qty)); i.qty += Number(b.dataset.delta); if (i.qty < 1) state.cart = state.cart.filter(x=>x.id!==i.id); render(); }));
  document.querySelectorAll('[data-remove]').forEach(b => b.addEventListener('click', () => { state.cart = state.cart.filter(i=>i.id!==Number(b.dataset.remove)); render(); }));
  document.querySelectorAll('[data-checkout]').forEach(b => b.addEventListener('click', () => {
    const total = state.cart.reduce((s,i)=>s+i.price*i.qty,0);
    const lines = state.cart.map(i=>`• ${i.name} × ${i.qty} — ${money(i.price*i.qty)}`).join('\n');
    const message = `أهلاً ماركت الكينج، عايز أأكد الطلب ده:\n${lines}\nالإجمالي المبدئي: ${money(total)}\nمن فضلك أكد التوفر والسعر النهائي.`;
    window.open(`${TELEGRAM}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  }));
  const search = document.querySelector('#search-input');
  search?.addEventListener('input', e => { const pos=e.target.selectionStart; state.search=e.target.value; const y=window.scrollY; render(); const input=document.querySelector('#search-input'); input?.focus(); input?.setSelectionRange(pos,pos); window.scrollTo(0,y); });
  document.querySelector('[data-clear-search]')?.addEventListener('click', () => { state.search=''; render(); document.querySelector('#search-input')?.focus(); });
  document.querySelectorAll('[data-close-modal]').forEach(b => b.addEventListener('click', () => { state.modal=null; render(); }));
  document.querySelectorAll('.product-card .product-art, .product-card h3').forEach(el => el.addEventListener('click', () => { const card=el.closest('.product-card'); const add=card.querySelector('[data-add]'); state.modal=Number(add.dataset.add); render(); }));
  document.querySelector('.search-toggle')?.addEventListener('click', () => { document.querySelector('#search-input')?.focus(); document.querySelector('#shop')?.scrollIntoView({behavior:'smooth'}); });
  document.querySelector('.menu-btn')?.addEventListener('click', () => {
    const nav=document.querySelector('.desktop-nav');
    nav.classList.toggle('nav-open');
  });
}
let toastTimer;
function toast(msg) { const el=document.querySelector('#toast'); if(!el) return; el.textContent=msg; el.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('show'),2300); }
function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
render();
