const products = [
  {
    name: 'Radha Rani Rasgulla',
    type: 'chhena',
    tag: 'Chhena Sweets',
    desc: 'Fresh chhena cooked to a soft, syrup-soaked finish from the trusted Radha Rani legacy.',
    image: 'assets/chhena/chhena-01.jpg'
  },
  {
    name: 'Ghee Peda',
    type: 'ghee',
    tag: 'Ghee Mithai',
    desc: 'Pure desi ghee aroma, melt-in-the-mouth texture, and Mathura-style richness.',
    image: 'assets/ghee/ghee-02.jpg'
  },
  {
    name: 'Khoya Barfi',
    type: 'khoya',
    tag: 'Khoya Mithai',
    desc: 'Slow-reduced khoya with cardamom depth and a clean, creamy finish.',
    image: 'assets/khoya/khoya-02.jpg'
  },
  {
    name: 'Royal Mithai Box',
    type: 'gifting',
    tag: 'Wedding Hampers',
    desc: 'Curated barfi, laddu, peda, and dry-fruit sweets for premium gifting.',
    image: 'assets/seasonal/seasonal-03.jpg'
  },
  {
    name: 'Dry Fruit Mithai',
    type: 'gifting',
    tag: 'Dry Fruit Mithai',
    desc: 'Rich nuts and balanced sweetness for weddings, celebrations, and corporate boxes.',
    image: 'assets/combo/combo-01.jpg'
  },
  {
    name: 'Rasmalai Cups',
    type: 'chhena',
    tag: 'Chhena Sweets',
    desc: 'Velvety rasmalai in saffron milk, finished with pistachio and rose notes.',
    image: 'assets/chhena/chhena-03.jpg'
  },
  {
    name: 'Festival Thaal',
    type: 'gifting',
    tag: 'Seasonal Mithai',
    desc: 'A ceremonial sweet assortment designed for bhog, festivals, and family visits.',
    image: 'assets/seasonal/seasonal-08.jpg'
  },
  {
    name: 'Rabri Kulhad',
    type: 'khoya',
    tag: 'Khoya Mithai',
    desc: 'Thickened milk rabri served with cardamom, saffron, and a nostalgic finish.',
    image: 'assets/khoya/khoya-05.jpg'
  }
];

const productGrid = document.querySelector('#productGrid');
const filters = document.querySelectorAll('.filter');
const menuBtn = document.querySelector('#menuBtn');
const mobileMenu = document.querySelector('#mobileMenu');

const style = document.createElement('style');
style.textContent = `.is-visible{opacity:1!important;transform:translateY(0)!important}`;
document.head.appendChild(style);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

function observeRevealItems(scope = document) {
  scope.querySelectorAll('.product-card, .feature, .value-card, .contact-card, .quote-card').forEach((item) => {
    if (item.dataset.revealReady) return;
    item.dataset.revealReady = 'true';
    item.style.opacity = '0';
    item.style.transform = 'translateY(22px)';
    item.style.transition = 'opacity .65s ease, transform .65s ease';
    revealObserver.observe(item);
  });
}

function renderProducts(filter = 'all') {
  if (!productGrid) return;

  const visible = filter === 'all' ? products : products.filter(product => product.type === filter);

  productGrid.innerHTML = visible.map(product => `
    <article class="product-card" data-type="${product.type}">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <div class="body">
        <span class="tag">${product.tag}</span>
        <h3>${product.name}</h3>
        <p>${product.desc}</p>
      </div>
    </article>
  `).join('');

  observeRevealItems(productGrid);
}

filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    renderProducts(button.dataset.filter);
  });
});

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
  });
}

document.querySelectorAll('.lux-form').forEach(form => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.classList.add('is-submitted');
    const button = form.querySelector('button');
    if (button) button.textContent = 'Request Received';
  });
});

renderProducts();
observeRevealItems();
