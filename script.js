// script.js — interactions, accessibility improvements, flatpickr init

document.addEventListener("DOMContentLoaded", () => {
  // set year
  document.getElementById("year").textContent = new Date().getFullYear();

  // lazy images
  const lazyImgs = document.querySelectorAll('img.lazy');
  if('IntersectionObserver' in window){
    const imgObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if(e.isIntersecting){
          const img = e.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          obs.unobserve(img);
        }
      });
    }, {rootMargin: "200px"});
    lazyImgs.forEach(i => imgObs.observe(i));
  } else {
    // fallback: load immediately
    lazyImgs.forEach(i => i.src = i.dataset.src);
  }

  // mobile menu toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobilePanel = document.getElementById('mobileMenu');
  mobileBtn && mobileBtn.addEventListener('click', () => {
    const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
    mobileBtn.setAttribute('aria-expanded', String(!expanded));
    if(mobilePanel){
      mobilePanel.hidden = expanded;
    }
  });

  // flatpickr for scheduling
  const dtInput = document.getElementById('datetime');
  const hiddenScheduled = document.getElementById('hiddenScheduled');
  let fp = null;
  if(dtInput){
    fp = flatpickr(dtInput, {
      enableTime: true,
      dateFormat: "Y-m-d H:i",
      minDate: "today",
      time_24hr: true,
      onChange: (selectedDates, dateStr) => {
        hiddenScheduled.value = dateStr;
        dtInput.setAttribute('aria-label', `Selected date ${dateStr}`);
      }
    });
  }

  // schedule button open modal
  const scheduleBtn = document.getElementById('scheduleBtn');
  const scheduleModal = document.getElementById('scheduleModal');
  const scheduledSummary = document.getElementById('scheduledSummary');
  const closeModal = document.getElementById('closeModal');
  const confirmSchedule = document.getElementById('confirmSchedule');
  const cancelSchedule = document.getElementById('cancelSchedule');

  function openDialog(){
    scheduleModal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeDialog(){
    scheduleModal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  scheduleBtn && scheduleBtn.addEventListener('click', () => {
    openDialog();
    const val = hiddenScheduled.value || dtInput.value || 'No date chosen';
    scheduledSummary.textContent = val === '' ? 'No date chosen.' : val;
  });

  closeModal && closeModal.addEventListener('click', closeDialog);
  cancelSchedule && cancelSchedule.addEventListener('click', closeDialog);

  confirmSchedule && confirmSchedule.addEventListener('click', () => {
    // provide visual confirmation
    const val = hiddenScheduled.value || dtInput.value;
    if(!val){
      alert('Please choose a date first.');
      dtInput && dtInput.focus();
      return;
    }
    closeDialog();
    scheduleBtn.textContent = `Scheduled: ${val}`;
    scheduleBtn.classList.add('scheduled');
    scheduleBtn.setAttribute('aria-label', `Scheduled ${val}`);
  });

  // Clear datetime
  const clearBtn = document.getElementById('clearDatetime');
  clearBtn && clearBtn.addEventListener('click', () => {
    if(fp) fp.clear();
    hiddenScheduled.value = '';
  });

  // Contact form validation + preview
  const contactForm = document.getElementById('contactForm');
  const previewBtn = document.getElementById('previewBtn');
  contactForm && contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // basic validation
    const name = contactForm.querySelector('#name').value.trim();
    const email = contactForm.querySelector('#email').value.trim();
    const message = contactForm.querySelector('#message').value.trim();
    if(!name || !email || !message){
      alert('Please fill name, email and message.');
      return;
    }
    // TODO: send to backend or integrate with form service (Formspree / Netlify Forms / Supabase)
    // For demo: show a friendly confirmation
    contactForm.reset();
    if(fp) fp.clear();
    document.getElementById('hiddenScheduled').value = '';
    alert('Thanks! Your message was sent (demo). We will contact you within 48 hours.');
  });

  previewBtn && previewBtn.addEventListener('click', () => {
    const name = contactForm.querySelector('#name').value.trim() || '(your name)';
    const email = contactForm.querySelector('#email').value.trim() || '(your email)';
    const message = contactForm.querySelector('#message').value.trim() || '(no message)';
    const schedule = document.getElementById('hiddenScheduled').value || '(no date)';
    const preview = `Preview:\n\nName: ${name}\nEmail: ${email}\nDate: ${schedule}\n\nMessage:\n${message}`;
    alert(preview);
  });

  // Smooth reveal animations for .card elements
  const reveal = document.querySelectorAll('.card, .section-header, .testimonial');
  if('IntersectionObserver' in window){
    const revealObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if(en.isIntersecting){
          en.target.classList.add('reveal');
          obs.unobserve(en.target);
        }
      });
    }, {threshold:0.12});
    reveal.forEach(n => revealObs.observe(n));
  } else {
    reveal.forEach(n => n.classList.add('reveal'));
  }
});
