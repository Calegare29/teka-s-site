// script.js — interactions, accessibility improvements, Google Calendar modal

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

  // modal functions
  const scheduleModal = document.getElementById('scheduleModal');
  const scheduleBtnHeader = document.getElementById('scheduleBtn');
  const scheduleBtnFooter = document.getElementById('scheduleBtnFooter');
  const closeModal = document.getElementById('closeModal');

  function openDialog(){
    scheduleModal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeDialog(){
    scheduleModal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  scheduleBtnHeader && scheduleBtnHeader.addEventListener('click', openDialog);
  scheduleBtnFooter && scheduleBtnFooter.addEventListener('click', openDialog);
  closeModal && closeModal.addEventListener('click', closeDialog);

  // smooth reveal animations for .card elements
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
