// Small client-side script for navbar toggle and inquiry form handling
(function(){
  // Load shared footer include and set year in footer after it is inserted
  (function loadFooter(){
    var footerWrap = document.getElementById('site-footer');
    if(!footerWrap) return;
    fetch('/includes/footer.html', {cache: 'no-cache'})
      .then(function(r){ if(!r.ok) throw new Error('Footer fetch failed'); return r.text(); })
      .then(function(html){
        footerWrap.innerHTML = html;
        // set year in footer
        var y = new Date().getFullYear();
        var els = footerWrap.querySelectorAll('#year');
        els.forEach(function(e){ e.textContent = y });
      })
      .catch(function(err){
        // fallback: simple footer if include not available
        console.warn('Could not load footer include:', err);
        footerWrap.innerHTML = '<footer class="site-footer container"><p>&copy; <span id="year"></span> Wealthnestpro.in. All rights reserved.</p></footer>';
        var y = new Date().getFullYear();
        var els = footerWrap.querySelectorAll('#year');
        els.forEach(function(e){ e.textContent = y });
      });
  })();

  // Load shared nav include and initialize nav toggle after insertion
  (function loadNav(){
    var headerWrap = document.getElementById('site-header');
    if(!headerWrap) return;
    fetch('/includes/nav.html', {cache: 'no-cache'})
      .then(function(r){ if(!r.ok) throw new Error('Nav fetch failed'); return r.text(); })
      .then(function(html){
        headerWrap.innerHTML = html;
        // initialize nav toggle after nav is present
        var toggle = document.querySelector('.nav-toggle');
        var navLinks = document.querySelector('.nav-links');
        if(toggle && navLinks){
          toggle.addEventListener('click', function(){ navLinks.classList.toggle('open'); });
        }
      })
      .catch(function(err){
        console.warn('Could not load nav include:', err);
        // fallback: leave header blank
      });
  })();

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
  var ADMIN_EMAIL = 'support@wealthnestpro.in';

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

const toggle = document.getElementById("theme-toggle");
if (!toggle) {
    console.warn("Theme toggle button not found.");
} else {
      console.warn("Theme toggle button found.");
if(localStorage.theme==="dark"){
    document.documentElement.classList.add("dark");
}

toggle.addEventListener("click",()=>{
  alert("Theme toggle clicked");
    document.documentElement.classList.toggle("dark");

    if(document.documentElement.classList.contains("dark")){
        localStorage.theme="dark";
    }else{
        localStorage.theme="light";
    }

});
}