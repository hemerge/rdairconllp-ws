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

  // dots
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

  // pause on hover
  carousel.addEventListener('mouseenter', ()=>clearInterval(timer));
  carousel.addEventListener('mouseleave', autoplay);
})();

/* Contact details placeholders */
const CONTACT = {
  phone: '', // e.g., +91 98xxxxxxx
  email: '', // e.g., hello@rdaircon.in
  map:   '', // Google Maps URL
  address: '' // Full address
};
(function(){
  const phoneLink = document.getElementById('phoneLink');
  const emailLink = document.getElementById('emailLink');
  const maplink = document.getElementById('maplink');
  const addr = document.getElementById('addr');
  if (CONTACT.phone && phoneLink){
    phoneLink.textContent = CONTACT.phone;
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
    // If 'yourid' not replaced, fallback to mailto so it's functional without setup
    const needsFallback = !action || action.includes('yourid');
    if (needsFallback){
      e.preventDefault();
      const data = new FormData(form);
      const to = (document.getElementById('emailLink')?.getAttribute('href') || 'mailto:').replace('mailto:','');
      const subject = encodeURIComponent('New inquiry — RD Aircon LLP');
      const body = encodeURIComponent(
        'Name: ' + (data.get('name')||'') + '\n' +
        'Phone: ' + (data.get('phone')||'') + '\n' +
        'Email: ' + (data.get('email')||'') + '\n' +
        'Service: ' + (data.get('service')||'') + '\n' +
        'Message: ' + (data.get('message')||'')
      );
      window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
    } else {
      // Let the native POST go through to Formspree (works on GitHub Pages)
    }
  });
})();