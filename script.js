// Mobile nav toggle
(function(){
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');
  if(!toggle || !nav) return;
  toggle.addEventListener('click', function(){
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); });
  });
})();

// Field-note signal form — placeholder only, not wired to a backend yet.
(function(){
  var form = document.getElementById('signal-form');
  if(!form) return;
  var note = document.getElementById('signal-note');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    form.querySelector('input').style.display = 'none';
    form.querySelector('button').style.display = 'none';
    if(note) note.style.display = 'inline';
  });
})();

// TOC active-section highlight on article pages
(function(){
  var links = document.querySelectorAll('.toc a');
  if(!links.length) return;
  var targets = Array.from(links).map(function(a){ return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if(!targets.length) return;
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        links.forEach(function(a){ a.classList.remove('active'); });
        var match = document.querySelector('.toc a[href="#' + entry.target.id + '"]');
        if(match) match.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  targets.forEach(function(t){ io.observe(t); });
})();

// Scroll reveal + count-up. The real number always lives in the HTML —
// this only animates the display; it never invents content a crawler
// or no-JS visitor wouldn't already see.
(function(){
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = document.querySelectorAll('.reveal');
  if(!reveals.length) return;

  if(reduceMotion){
    reveals.forEach(function(el){ el.classList.add('in'); });
    return;
  }

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        var counters = entry.target.hasAttribute('data-count') ? [entry.target] : entry.target.querySelectorAll('[data-count]');
        counters.forEach(animateCount);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: .25, rootMargin: '0px 0px -60px 0px' });

  reveals.forEach(function(el){ io.observe(el); });

  function animateCount(el){
    var finalText = el.textContent;
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = parseInt(el.getAttribute('data-decimal') || '0', 10);
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var divisor = Math.pow(10, decimals);
    var realTarget = target / divisor;
    var start = null;
    var duration = 1000;
    function step(ts){
      if(!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = realTarget * eased;
      el.textContent = prefix + (decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString()) + suffix;
      if(p < 1){ requestAnimationFrame(step); } else { el.textContent = finalText; }
    }
    requestAnimationFrame(step);
  }
})();
