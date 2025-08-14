/* Mobile menu toggle */
const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');
if (burger && menu){
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

/* Year */
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();

/* Carousel (vanilla JS) */
(function(){
  const carousel = document.querySelector('.carousel');
  if(!carousel) return;
  const slides = Array.from(carousel.querySelectorAll('.slide'));
  const prev = carousel.querySelector('.prev');
  const next = carousel.querySelector('.next');
  const dotsWrap = carousel.querySelector('.dots');
  let idx = 0;
  let timer = null;

  function go(i){
    slides[idx].classList.remove('current');
    dotsWrap.children[idx].classList.remove('active');
    idx = (i + slides.length) % slides.length;
    slides[idx].classList.add('current');
    dotsWrap.children[idx].classList.add('active');
  }

  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', 'Go to slide ' + (i+1));
    if (i === 0) b.classList.add('active');
    b.addEventListener('click', () => { go(i); reset(); });
    dotsWrap.appendChild(b);
  });

  function nextSlide(){ go(idx+1); }
  function prevSlide(){ go(idx-1); }

  next.addEventListener('click', () => { nextSlide(); reset(); });
  prev.addEventListener('click', () => { prevSlide(); reset(); });

  function autoplay(){
    timer = setInterval(nextSlide, 4000);
  }
  function reset(){
    clearInterval(timer);
    autoplay();
  }
  autoplay();

  carousel.addEventListener('mouseenter', ()=>clearInterval(timer));
  carousel.addEventListener('mouseleave', autoplay);
})();

/* Contact details placeholders (filled where provided) */
const CONTACT = {
  phone: '+919076776974',
  email: '', // add if available
  map:   'https://www.google.com/maps?q=19.019537,73.041440',
  address: 'Shop No. 2, Chitrakut Apt, Plot No. Y-3, Shahbaz Village, Sector 19, CBD Belapur, Navi Mumbai, Maharashtra 400614'
};
(function(){
  const phoneLink = document.getElementById('phoneLink');
  const emailLink = document.getElementById('emailLink');
  const maplink = document.getElementById('maplink');
  const addr = document.getElementById('addr');
  if (CONTACT.phone && phoneLink){
    phoneLink.textContent = '+91 9076776974';
    phoneLink.href = 'tel:' + CONTACT.phone.replace(/\s+/g,'');
  }
  if (CONTACT.email && emailLink){
    emailLink.textContent = CONTACT.email;
    emailLink.href = 'mailto:' + CONTACT.email;
  }
  if (CONTACT.map && maplink){
    maplink.href = CONTACT.map;
  }
  if (CONTACT.address && addr){
    addr.textContent = CONTACT.address;
  }
})();

/* Contact form: Formspree + mailto fallback (works on GitHub Pages) */
(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;

  form.addEventListener('submit', function(e){
    const action = (form.getAttribute('action') || '').trim();
    const needsFallback = !action || action.includes('yourid');
    if (needsFallback){
      e.preventDefault();
      const data = new FormData(form);
      const toHref = document.getElementById('emailLink')?.getAttribute('href') || 'mailto:';
      const to = toHref.replace('mailto:','');
      const subject = encodeURIComponent('New inquiry — RD Aircon LLP');
      const body = encodeURIComponent(
        'Name: ' + (data.get('name')||'') + '\n' +
        'Phone: ' + (data.get('phone')||'') + '\n' +
        'Email: ' + (data.get('email')||'') + '\n' +
        'Service: ' + (data.get('service')||'') + '\n' +
        'Message: ' + (data.get('message')||'')
      );
      window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
    }
  });
})();

/* Leaflet map with mobile-friendly behavior */
(function(){
  const mapDiv = document.getElementById('map');
  if (!mapDiv || typeof L === 'undefined') return;
  const isMobile = window.innerWidth < 768;

  const map = L.map('map', {
    center: [19.019537, 73.041440],
    zoom: 16,
    dragging: !isMobile,
    tap: !isMobile,
    scrollWheelZoom: !isMobile,
    doubleClickZoom: !isMobile
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  L.marker([19.019537, 73.041440]).addTo(map)
    .bindPopup(
      `<b>RD Aircon</b><br>
      Shop No. 2, Chitrakut Apt, Plot No. Y-3,<br>
      Shahbaz Village, Sector 19, CBD Belapur,<br>
      Navi Mumbai, Maharashtra 400614<br>
      📞 <a href='tel:+919076776974'>+91 9076776974</a>`
    )
    .openPopup();
})();