// Minimal interactions: set years, mobile menu toggle, active link highlight
document.addEventListener('DOMContentLoaded', function () {
  // Update copyright years
  var yrs = document.querySelectorAll('#year, #year2, #year3, #year4');
  yrs.forEach(el => el && (el.textContent = new Date().getFullYear()));


   
    

// Optional simple animation or interaction
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.backgroundColor = '#fff8f0';
  } else {
    header.style.backgroundColor = 'transparent';
  }
});



    // Simple fade-in animation on scroll
    const elements = document.querySelectorAll('.text-section, .image-section');
    window.addEventListener('scroll', () =>
     {
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          el.style.transition = 'all 0.8s ease';
        }
      });
    });
  
// Simple script to add hover animation or alert
document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    alert("You clicked on an image!");
  });
});

  // Support multiple toggles that share behavior
  var toggles = document.querySelectorAll('[id^="mobile-toggle"]');
  toggles.forEach(t => {
    t.addEventListener('click', function () {
      // find nearest header and toggle nav lists
      var header = t.closest('.site-header');
      if (!header) return;
      var lists = header.querySelectorAll('.nav-list');
      lists.forEach(l => {
        if (getComputedStyle(l).display === 'none') {
          l.style.display = 'flex';
        } else {
          l.style.display = 'none';
        }
      });
      // flip aria
      var expanded = t.getAttribute('aria-expanded') === 'true';
      t.setAttribute('aria-expanded', String(!expanded));
    });
  });

// Initialize EmailJS (replace with your user ID)
emailjs.init("T7qwvQi7pUlbg2mmh");

const form = document.getElementById("contactForm");
const statusMsg = document.getElementById("form-status");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  statusMsg.style.display = "block";
  statusMsg.className = "status-msg";
  statusMsg.textContent = "Sending message...";

  const serviceID = "service_l8enl6n";
  const templateID = "template_k8qraog";

  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      statusMsg.textContent = "Message sent successfully!";
      statusMsg.classList.add("status-success");
      form.reset();
    }, (err) => {
      console.error(err);
      statusMsg.textContent = "Error sending message. Try again!";
      statusMsg.classList.add("status-error");
    });
});



// Simple testimonial navigation placeholder
const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');

leftArrow.addEventListener('click', () => {
  alert('Previous testimonial');
});

rightArrow.addEventListener('click', () => {
  alert('Next testimonial');
});


document.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('.footer');
  footer.style.opacity = 0;
  window.addEventListener('scroll', () => {
    const pos = footer.getBoundingClientRect().top;
    const winHeight = window.innerHeight;
    if (pos < winHeight - 100) {
      footer.style.transition = 'opacity 1.2s ease-in-out';
      footer.style.opacity = 1;
    }
  });
});



  // Simple active-nav based on pathname
  var links = document.querySelectorAll('.nav-link');
  links.forEach(a => {
    try {
      var href = a.getAttribute('href');
      if (href && location.pathname.endsWith(href)) {
        links.forEach(x => x.classList.remove('active'));
        a.classList.add('active');
      }
    } catch (e) {}
  });
});

/*// beforeafter.js - JS for the component
(function(){

  function makeSlider(container){
    const after = container.querySelector('.ba-after');
    const handle = container.querySelector('.handle');
    let rect = null;

    function recalc(){
      rect = container.getBoundingClientRect();
    }

    window.addEventListener('resize', recalc);
    recalc();

    function setPos(p){
      p = Math.max(0, Math.min(100, p));
      after.style.width = p + '%';
      handle.style.left = p + '%';
    }

    setPos(50);

    // Drag functionality
    handle.addEventListener('pointerdown', e=>{
      e.preventDefault();
      handle.setPointerCapture(e.pointerId);

      const move = (ev)=>{
        const x = ev.clientX - rect.left;
        const percent = (x / rect.width) * 100;
        setPos(percent);
      };

      const up = ()=>{
        container.removeEventListener('pointermove', move);
        container.removeEventListener('pointerup', up);
      };

      container.addEventListener('pointermove', move);
      container.addEventListener('pointerup', up);
    });

  }

  document.querySelectorAll('.ba-container').forEach(c=>makeSlider(c));

})();*/

// beforeafter.js
// Full-width responsive comparison slider (pointer + touch + keyboard).
// Uses absolute element widths; images are static (no scale/zoom).

(function () {
  const container = document.getElementById('baContainer');
  const after = document.getElementById('baAfter');
  const handle = document.getElementById('baHandle');

  // Defensive checks
  if (!container || !after || !handle) {
    console.warn('Before/After elements not found. Aborting slider init.');
    return;
  }

  let dragging = false;
  let containerRect = null;

  // Recalculate bounding rect
  function recalc() {
    containerRect = container.getBoundingClientRect();
  }
  window.addEventListener('resize', recalc);
  recalc();

  // Set position: percent 0..100
  function setPosition(percent) {
    percent = Math.max(0, Math.min(100, percent));
    after.style.width = percent + '%';
    handle.style.left = percent + '%';
    handle.setAttribute('aria-valuenow', Math.round(percent));
  }

  // Convert client coordinates to percent (handles vertical vs horizontal? Our slider is horizontal)
  function clientToPercent(clientX) {
    const x = clientX - containerRect.left;
    return (x / containerRect.width) * 100;
  }

  // Pointer down on handle
  handle.addEventListener('pointerdown', function (e) {
    e.preventDefault();
    dragging = true;
    handle.setPointerCapture && handle.setPointerCapture(e.pointerId);
    recalc();
    // make handle appear grabbed
    handle.style.transform = 'translate(-50%,-50%) scale(0.99)';
  });

  // Pointer move anywhere (document) while dragging
  document.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    recalc();
    const p = clientToPercent(e.clientX);
    setPosition(p);
  });

  // Pointer up
  document.addEventListener('pointerup', function (e) {
    if (!dragging) return;
    dragging = false;
    try {
      handle.releasePointerCapture && handle.releasePointerCapture(e.pointerId);
    } catch (err) { /* ignore */ }
    handle.style.transform = 'translate(-50%,-50%)';
  });

  // Also support click on container to jump handle
  container.addEventListener('click', function (e) {
    // ignore clicks on handle itself (we want the pointer events to handle)
    if (e.target === handle || handle.contains(e.target)) return;
    recalc();
    const p = clientToPercent(e.clientX);
    setPosition(p);
  });

  // Keyboard support on handle
  handle.addEventListener('keydown', function (e) {
    const step = e.shiftKey ? 10 : 2;
    const current = parseInt(handle.getAttribute('aria-valuenow') || '50', 10);
    let next = current;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = current - step;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = current + step;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = 100;
    setPosition(next);
    e.preventDefault();
  });

  // Touch support: pointer events already cover touch on modern browsers.
  // But add passive touchmove prevention only while dragging (to avoid overscroll)
  document.addEventListener('touchmove', function (e) {
    if (dragging) e.preventDefault();
  }, { passive: false });

  // Initialize at center (50%)
  setPosition(50);

  // Expose for debugging (optional)
  window.BA_SLIDER = {
    setPosition
  };

})();
// MULTIPLE VERTICAL SLIDER ENGINE
function initVerticalSliders() {
    let sliders = document.querySelectorAll(".vertical-slider");

    sliders.forEach(slider => {
        let id = slider.dataset.slider;
        let slides = slider.querySelectorAll(".v-slide");
        let dotsContainer = document.querySelector(`.v-dots[data-dots="${id}"]`);

        slides.forEach((_, i) => {
            let d = document.createElement("span");
            d.classList.add("dot");
            if (i === 0) d.classList.add("active");
            dotsContainer.appendChild(d);
        });
    });
}

// INIT SLIDERS
function initHSliders() {
    document.querySelectorAll(".h-slider").forEach(slider => {
        let id = slider.dataset.slider;
        let slides = slider.querySelectorAll(".h-slide");
        let dotsBox = document.querySelector(`.h-dots[data-dots="${id}"]`);

        slides.forEach((_, i) => {
            let d = document.createElement("span");
            d.classList.add("dot");
            if (i === 0) d.classList.add("active");
            dotsBox.appendChild(d);
        });
    });
}

let hIndex = {1:0,2:0,3:0};

function showH(sliderID, index){
    let slider = document.querySelector(`.h-slider[data-slider="${sliderID}"]`);
    let slides = slider.querySelectorAll(".h-slide");
    let dots = document.querySelectorAll(`.h-dots[data-dots="${sliderID}"] .dot`);

    slides.forEach(s=>s.classList.remove("active"));
    dots.forEach(d=>d.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");
}

function nextH(sliderID){
    let slider = document.querySelector(`.h-slider[data-slider="${sliderID}"]`);
    let slides = slider.querySelectorAll(".h-slide");

    hIndex[sliderID] = (hIndex[sliderID] + 1) % slides.length;
    showH(sliderID, hIndex[sliderID]);
}

function prevH(sliderID){
    let slider = document.querySelector(`.h-slider[data-slider="${sliderID}"]`);
    let slides = slider.querySelectorAll(".h-slide");

    hIndex[sliderID] = (hIndex[sliderID] - 1 + slides.length) % slides.length;
    showH(sliderID, hIndex[sliderID]);
}

// Auto-play
setInterval(()=>{
    nextH(1);
    nextH(2);
}, 4000);

initHSliders();

<script>
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});
</script>

