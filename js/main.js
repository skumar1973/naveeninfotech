// Small client-side script for navbar toggle and inquiry form handling
(function(){
  // set year in footer
  var y = new Date().getFullYear();
  var els = document.querySelectorAll('#year');
  els.forEach(function(e){ e.textContent = y });

  // nav toggle for mobile
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if(toggle && navLinks){
    toggle.addEventListener('click', function(){
      navLinks.classList.toggle('open');
    });
  }

  // --- Carousel (if present) ---
  (function(){
    var track = document.getElementById('carouselTrack');
    if(!track) return;

    var slides = Array.from(track.querySelectorAll('.carousel-slide'));
    var prev = document.getElementById('carouselPrev');
    var next = document.getElementById('carouselNext');
    var indicatorsWrap = document.getElementById('carouselIndicators');
    var current = 0;
    var autoTimer = null;
    var interval = 4500;

    function goTo(index){
      if(index < 0) index = slides.length - 1;
      if(index >= slides.length) index = 0;
      current = index;
      track.style.transform = 'translateX(' + (-100 * current) + '%)';
      updateIndicators();
    }

    function nextSlide(){ goTo(current + 1); }
    function prevSlide(){ goTo(current - 1); }

    function startAuto(){ stopAuto(); autoTimer = setInterval(nextSlide, interval); }
    function stopAuto(){ if(autoTimer) { clearInterval(autoTimer); autoTimer = null; } }

    // create indicators
    slides.forEach(function(_, i){
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Slide ' + (i+1));
      b.addEventListener('click', function(){ goTo(i); startAuto(); });
      indicatorsWrap.appendChild(b);
    });

    function updateIndicators(){
      var btns = Array.from(indicatorsWrap.children);
      btns.forEach(function(b, i){ b.classList.toggle('active', i === current); });
    }

    if(next) next.addEventListener('click', function(){ nextSlide(); startAuto(); });
    if(prev) prev.addEventListener('click', function(){ prevSlide(); startAuto(); });

    // pause on pointer interactions
    var container = track.parentElement;
    if(container){
      container.addEventListener('mouseenter', stopAuto);
      container.addEventListener('mouseleave', startAuto);
    }

    // initialize
    goTo(0);
    startAuto();
  })();

  // Inquiry form handling
  var form = document.getElementById('inquiryForm');
  if(!form) return;

  var sendBtn = document.getElementById('sendBtn');
  var status = document.getElementById('formStatus');

  // Admin email - change this to the website admin email address
  var ADMIN_EMAIL = 'shailendrarsingh@gmail.com';

  function validate(){
    return form.checkValidity();
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    status.textContent = '';

    if(!validate()){
      status.textContent = 'Please fill out all required fields correctly.';
      status.style.color = 'red';
      return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';

    var data = {
      firstName: form.firstName.value.trim(),
      lastName: form.lastName.value.trim(),
      mobile: form.mobile.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim()
    };

    // Use mailto: as simple client-side email trigger. Note: mailto relies on user's email client.
    var subject = encodeURIComponent('Website Inquiry from ' + data.firstName + ' ' + data.lastName);
    var bodyLines = [
      'Name: ' + data.firstName + ' ' + data.lastName,
      'Mobile: ' + data.mobile,
      'Email: ' + data.email,
      '',
      'Message:',
      data.message
    ];
    var body = encodeURIComponent(bodyLines.join('\n'));

    // Compose mailto URL
    var mailto = 'mailto:' + encodeURIComponent(ADMIN_EMAIL) + '?subject=' + subject + '&body=' + body;

    // Try to open mailto. This will open user's default mail client.
    window.location.href = mailto;

    // Provide a friendly message after opening mail client
    status.textContent = 'Your mail client should open. If it did not, copy/paste the details into your email to ' + ADMIN_EMAIL + '.';
    status.style.color = 'green';

    sendBtn.disabled = false;
    sendBtn.textContent = 'Send';
  });
})();