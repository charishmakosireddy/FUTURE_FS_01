window.addEventListener('scroll', function() {
  var nav = document.getElementById('topnav');
  nav.classList.toggle('sticky', window.scrollY > 40);
});

document.getElementById('menuBtn').addEventListener('click', function() {
  document.getElementById('mobileNav').classList.toggle('open');
});

document.querySelectorAll('.mobile-nav a').forEach(function(link) {
  link.addEventListener('click', function() {
    document.getElementById('mobileNav').classList.remove('open');
  });
});

var words = ['Full Stack Developer', 'Frontend Developer', 'Problem Solver'];
var wi = 0, ci = 0, deleting = false;
var typedEl = document.getElementById('typed');

function runTyper() {
  var word = words[wi];
  typedEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
  if (!deleting && ci === word.length + 1) {
    setTimeout(function() { deleting = true; runTyper(); }, 1800);
    return;
  }
  if (deleting && ci < 0) { deleting = false; ci = 0; wi = (wi + 1) % words.length; }
  setTimeout(runTyper, deleting ? 55 : 95);
}
runTyper();

var revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) { entry.target.classList.add('show'); revealObserver.unobserve(entry.target); }
  });
}, { threshold: 0.12 });

var skillObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) { entry.target.classList.add('animated'); skillObserver.unobserve(entry.target); }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-box').forEach(function(box) { skillObserver.observe(box); });

document.querySelectorAll('.about-grid, .skills-grid .skill-box, .proj-card, .cert-card, .hackathon-box, .contact-wrap').forEach(function(el) {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var btn = document.getElementById('sendBtn');
  var msg = document.getElementById('formMsg');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(function() {
    btn.textContent = 'Send Message →';
    btn.disabled = false;
    document.getElementById('contactForm').reset();
    msg.style.display = 'block';
    setTimeout(function() { msg.style.display = 'none'; }, 5000);
  }, 1400);
});
// lightbox for certificates
var lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.9);z-index:9999;align-items:center;justify-content:center;padding:1rem;cursor:zoom-out;';
lightbox.innerHTML = '<img id="lightbox-img" style="max-width:90vw;max-height:90vh;border-radius:10px;box-shadow:0 0 60px rgba(0,0,0,.8);"/>';
document.body.appendChild(lightbox);

document.querySelectorAll('.cert-img').forEach(function(img) {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', function() {
    document.getElementById('lightbox-img').src = this.src;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
});

lightbox.addEventListener('click', function() {
  lightbox.style.display = 'none';
  document.body.style.overflow = '';
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { lightbox.style.display = 'none'; document.body.style.overflow = ''; }
});
