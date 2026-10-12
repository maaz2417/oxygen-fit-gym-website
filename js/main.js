/**
 * OXYGEN FIT GYM - MAIN INTERACTIVE LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveGymStatus();
  initNavigation();
  initFaqAccordion();
  initModalHandling();
  initContactForms();
  initPhotoPreviewer();
  initTrainerBooking();
});

/* ==========================================================================
   1. LIVE GYM STATUS & TODAY'S SCHEDULE HIGHLIGHT
   ========================================================================== */
function initLiveGymStatus() {
  const statusIndicator = document.getElementById('liveStatusDot');
  const statusTitle = document.getElementById('liveStatusTitle');
  const statusSubtitle = document.getElementById('liveStatusSubtitle');
  
  // Gym Operating Schedule (24-hour clock)
  // Day 0: Sunday, 1: Monday, ... 6: Saturday
  const schedule = {
    0: { dayName: 'Sunday', open: 8, close: 20, openStr: '8:00 AM', closeStr: '8:00 PM' },
    1: { dayName: 'Monday', open: 6, close: 23, openStr: '6:00 AM', closeStr: '11:00 PM' },
    2: { dayName: 'Tuesday', open: 6, close: 23, openStr: '6:00 AM', closeStr: '11:00 PM' },
    3: { dayName: 'Wednesday', open: 6, close: 23, openStr: '6:00 AM', closeStr: '11:00 PM' },
    4: { dayName: 'Thursday', open: 6, close: 23, openStr: '6:00 AM', closeStr: '11:00 PM' },
    5: { dayName: 'Friday', open: 6, close: 23, openStr: '6:00 AM', closeStr: '11:00 PM' },
    6: { dayName: 'Saturday', open: 7, close: 22, openStr: '7:00 AM', closeStr: '10:00 PM' }
  };

  const now = new Date();
  const currentDay = now.getDay();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  
  const todaySchedule = schedule[currentDay];
  const isOpen = currentHour >= todaySchedule.open && currentHour < todaySchedule.close;
  
  if (statusIndicator && statusTitle && statusSubtitle) {
    if (isOpen) {
      statusIndicator.classList.remove('closed');
      statusTitle.innerHTML = 'OPEN NOW <i class="fa-solid fa-circle-check" style="color: var(--accent-primary); font-size: 13px;"></i>';
      statusSubtitle.textContent = `Today: ${todaySchedule.openStr} – ${todaySchedule.closeStr} (Closes at ${todaySchedule.closeStr})`;
    } else {
      statusIndicator.classList.add('closed');
      statusTitle.innerHTML = 'CLOSED NOW <i class="fa-solid fa-clock" style="color: var(--status-closed); font-size: 13px;"></i>';
      
      const tomorrowDay = (currentDay + 1) % 7;
      const tomorrowSchedule = schedule[tomorrowDay];
      
      if (currentHour < todaySchedule.open) {
        statusSubtitle.textContent = `Opens today at ${todaySchedule.openStr}`;
      } else {
        statusSubtitle.textContent = `Opens tomorrow at ${tomorrowSchedule.openStr}`;
      }
    }
  }

  // Highlight today's row in schedule list
  const scheduleRows = document.querySelectorAll('.schedule-row[data-day]');
  scheduleRows.forEach(row => {
    const rowDays = row.dataset.day.split(',').map(d => parseInt(d.trim()));
    if (rowDays.includes(currentDay)) {
      row.classList.add('today');
      const dayBadge = row.querySelector('.day-badge');
      if (dayBadge && !dayBadge.querySelector('.today-tag')) {
        const tag = document.createElement('span');
        tag.className = 'today-tag';
        tag.textContent = 'Today';
        dayBadge.appendChild(tag);
      }
    }
  });
}

/* ==========================================================================
   2. NAVBAR & SMOOTH SCROLLING
   ========================================================================== */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Navbar background change on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveNavLink();
  });

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Highlight current active section in nav
  function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href="#${id}"]`);

      if (matchingLink) {
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(link => link.classList.remove('active'));
          matchingLink.classList.add('active');
        }
      }
    });
  }
}

/* ==========================================================================
   3. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current
      item.classList.toggle('active', !isActive);
    });
  });
}

/* ==========================================================================
   4. MODAL DIALOG (FREE PASS & TRIAL)
   ========================================================================== */
function initModalHandling() {
  const modal = document.getElementById('passModal');
  const openButtons = document.querySelectorAll('[data-open-modal]');
  const closeButtons = document.querySelectorAll('[data-close-modal]');

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   5. TRAINER BOOKING TRIGGER
   ========================================================================== */
function initTrainerBooking() {
  const trainerButtons = document.querySelectorAll('.book-trainer-btn');
  const modal = document.getElementById('passModal');
  const modalGoalSelect = document.getElementById('modalGoalSelect');

  trainerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const trainerName = btn.dataset.trainer || 'Personal Trainer';
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (modalGoalSelect) {
          modalGoalSelect.value = 'Personal Training';
        }
        showToast(`Selected coach: ${trainerName}. Complete your free pass to connect!`);
      }
    });
  });
}

/* ==========================================================================
   6. CONTACT & PASS FORMS
   ========================================================================== */
function initContactForms() {
  const mainContactForm = document.getElementById('mainContactForm');
  const modalPassForm = document.getElementById('modalPassForm');

  if (mainContactForm) {
    mainContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value || 'Fitness Enthusiast';
      const phone = document.getElementById('contactPhone')?.value || '';
      
      showToast(`Thank you, ${name}! We've received your request and will call/WhatsApp you shortly.`);
      mainContactForm.reset();
    });
  }

  if (modalPassForm) {
    modalPassForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalName')?.value || 'Valued Guest';
      
      const modal = document.getElementById('passModal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }

      showToast(`🎉 Congratulations ${name}! Your 1-Day Free Pass has been reserved! Show this confirmation at the front desk.`);
      modalPassForm.reset();
    });
  }
}

/* ==========================================================================
   7. INTERACTIVE PHOTO UPLOADER / LIVE PREVIEWER
   Allows the user to test and preview their gym's real picture on the page!
   ========================================================================== */
function initPhotoPreviewer() {
  const fileInput = document.getElementById('gymPhotoFileInput');
  const heroImage = document.getElementById('mainGymHeroImg');
  const uploaderTrigger = document.getElementById('photoUploaderTrigger');

  if (!fileInput || !heroImage) return;

  if (uploaderTrigger) {
    uploaderTrigger.addEventListener('click', () => {
      fileInput.click();
    });

    // Drag and drop handlers
    uploaderTrigger.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploaderTrigger.style.borderColor = 'var(--accent-primary)';
      uploaderTrigger.style.transform = 'scale(1.02)';
    });

    uploaderTrigger.addEventListener('dragleave', () => {
      uploaderTrigger.style.borderColor = '';
      uploaderTrigger.style.transform = '';
    });

    uploaderTrigger.addEventListener('drop', (e) => {
      e.preventDefault();
      uploaderTrigger.style.borderColor = '';
      uploaderTrigger.style.transform = '';
      
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleImageFile(e.dataTransfer.files[0]);
      }
    });
  }

  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFile(e.target.files[0]);
    }
  });

  function handleImageFile(file) {
    if (!file.type.startsWith('image/')) {
      showToast('⚠️ Please upload a valid image file (JPG, PNG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      heroImage.src = dataUrl;

      // Update gallery item 1 as well
      const galleryItem1 = document.getElementById('galleryPreviewImg1');
      if (galleryItem1) {
        galleryItem1.src = dataUrl;
      }

      // Smooth scroll back to hero to preview
      window.scrollTo({ top: 0, behavior: 'smooth' });

      showToast('📸 Photo preview loaded! To make this permanent, save your file in assets/images/gym-hero.jpg');
    };
    reader.readAsDataURL(file);
  }
}

/* ==========================================================================
   8. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent-primary); font-size: 18px;"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

