// Initialize AOS
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
  });
}

// Sticky Navigation
if (document.querySelector('.navbar-sticky')) {
  window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar-sticky');
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
    });
  }
}

// Navigation links - only handle desktop navigation
const navLinks = document.querySelectorAll('nav .hidden.md\\:flex a[href^="#"]:not(.gallery-item)');
if (navLinks.length > 0) {
  navLinks.forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const sectionId = this.getAttribute('href').substring(1);
      scrollToSection(sectionId);
    });
  });
}

// Before/After Slider
const sliders = document.querySelectorAll('.before-after-slider');
if (sliders.length > 0) {
  sliders.forEach((slider) => {
    slider.addEventListener('mousemove', function (e) {
      const rect = slider.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;

      const afterImg = slider.querySelector('.after-img');
      if (afterImg) {
        afterImg.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
      }
    });

    slider.addEventListener('mouseleave', function () {
      const afterImg = slider.querySelector('.after-img');
      if (afterImg) {
        afterImg.style.clipPath = 'inset(0 50% 0 0)';
      }
    });
  });
}

// Price Calculator
function calculatePrice() {
  const serviceType = document.getElementById('serviceType');
  if (serviceType) {
    const area = document.getElementById('area');
    if (area) {
      const totalPriceElement = document.getElementById('totalPrice');
      if (totalPriceElement) {
        const serviceTypeContainer = serviceType.closest('.input-group');
        if (serviceTypeContainer) {
          // Update visual state
          if (serviceType.value) {
            serviceTypeContainer.classList.add('has-value');
          } else {
            serviceTypeContainer.classList.remove('has-value');
          }

          // Calculate price
          if (serviceType.value && area.value) {
            const pricePerUnit = parseFloat(serviceType.selectedOptions[0].dataset.price);
            const total = pricePerUnit * parseFloat(area.value);
            totalPriceElement.textContent = total.toLocaleString('pl-PL');
          } else {
            totalPriceElement.textContent = '0';
          }
        }
      }
    }
  }
}

// Initialize service type visual state on page load
document.addEventListener('DOMContentLoaded', function () {
  const serviceType = document.getElementById('serviceType');
  if (serviceType) {
    const serviceTypeContainer = serviceType.closest('.input-group');
    if (serviceTypeContainer) {
      // Set initial state
      if (serviceType.value) {
        serviceTypeContainer.classList.add('has-value');
      }

      // Update state on change
      serviceType.addEventListener('change', function () {
        if (this.value) {
          serviceTypeContainer.classList.add('has-value');
        } else {
          serviceTypeContainer.classList.remove('has-value');
        }
      });
    }
  }
});

// Form Validation
function validateField(fieldId, errorId, validationFn, errorMessage) {
  const field = document.getElementById(fieldId);
  if (field) {
    const error = document.getElementById(errorId);
    if (error) {
      if (!validationFn(field.value)) {
        error.textContent = errorMessage;
        error.style.display = 'block';
        field.style.borderColor = '#ef4444';
        return false;
      } else {
        error.style.display = 'none';
        field.style.borderColor = '#059669';
        return true;
      }
    }
  }
}

function validateName(name) {
  return name.length >= 2;
}

function validatePhone(phone) {
  const phoneRegex = /^[0-9]{9,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

function validateEmail(email) {
  if (email === '') return true; // Email is optional
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Real-time validation
const nameField = document.getElementById('name');
if (nameField) {
  nameField.addEventListener('input', function () {
    validateField('name', 'nameError', validateName, 'Proszę podać imię i nazwisko (min. 2 znaki)');
  });
}

const phoneField = document.getElementById('phone');
if (phoneField) {
  phoneField.addEventListener('input', function () {
    validateField('phone', 'phoneError', validatePhone, 'Proszę podać prawidłowy numer telefonu (min. 9 cyfr)');
  });
}

const emailField = document.getElementById('email');
if (emailField) {
  emailField.addEventListener('input', function () {
    validateField('email', 'emailError', validateEmail, 'Proszę podać prawidłowy adres e-mail');
  });
}

// Form submission
function submitForm(event) {
  event.preventDefault();

  const nameValid = validateField('name', 'nameError', validateName, 'Proszę podać imię i nazwisko (min. 2 znaki)');
  const phoneValid = validateField(
    'phone',
    'phoneError',
    validatePhone,
    'Proszę podać prawidłowy numer telefonu (min. 9 cyfr)'
  );
  const emailValid = validateField('email', 'emailError', validateEmail, 'Proszę podać prawidłowy adres e-mail');

  if (nameValid && phoneValid && emailValid) {
    // Simulate form submission
    setTimeout(() => {
      const successMessage = document.getElementById('successMessage');
      if (successMessage) {
        successMessage.style.display = 'block';
      }
      const contactForm = document.getElementById('contactForm');
      if (contactForm) {
        contactForm.reset();
      }

      // Hide success message after 5 seconds
      setTimeout(() => {
        if (successMessage) {
          successMessage.style.display = 'none';
        }
      }, 5000);
    }, 1000);
  }
}

// Initialize gallery when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Image Modal Functionality
  const modal = document.getElementById('imageModal');
  if (modal) {
    const modalImg = document.getElementById('modalImage');
    if (modalImg) {
      const modalCaption = document.getElementById('modalCaption');
      if (modalCaption) {
        const closeModal = document.getElementById('closeModal');
        if (closeModal) {
          // Function to open modal
          function openModal(imgSrc, caption) {
            modalImg.src = imgSrc;
            modalImg.alt = caption;
            modalCaption.textContent = caption;

            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';
          }

          // Function to close modal
          function closeModalHandler() {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
          }

          // Open modal when clicking on gallery items
          const galleryItems = document.querySelectorAll('.gallery-item');
          if (galleryItems.length > 0) {
            galleryItems.forEach((item) => {
              // Prevent default action for any click on the link
              item.addEventListener(
                'click',
                function (e) {
                  e.preventDefault();
                  e.stopPropagation();
                  e.stopImmediatePropagation();

                  const imgSrc = this.getAttribute('data-image');
                  const caption = this.getAttribute('data-caption');
                  if (imgSrc) {
                    openModal(imgSrc, caption);
                  }
                  return false;
                },
                true
              ); // Use capture phase to ensure we catch the event first
            });
          }

          // Close modal when clicking the close button
          closeModal.addEventListener('click', closeModalHandler);

          // Close modal when clicking outside the image
          modal.addEventListener('click', function (e) {
            if (e.target === modal) {
              closeModalHandler();
            }
          });

          // Close modal with Escape key
          document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
              closeModalHandler();
            }
          });
        }
      }
    }
  }
});

// Mobile menu functionality
function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.remove('translate-x-0');
    mobileMenu.classList.add('-translate-x-full');
    document.body.style.overflow = '';
  }
}

function openMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.remove('-translate-x-full');
    mobileMenu.classList.add('translate-x-0');
    document.body.style.overflow = 'hidden';
  }
}

function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    if (mobileMenu.classList.contains('-translate-x-full')) {
      openMobileMenu();
    } else {
      closeMobileMenu();
    }
  }
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const closeMobileMenuButton = document.getElementById('close-mobile-menu');
  const mobileMenu = document.getElementById('mobile-menu');

  // Initialize menu as closed
  if (mobileMenu) {
    mobileMenu.classList.add('-translate-x-full');
  }

  // Toggle menu on button click
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', function (e) {
      e.preventDefault();
      toggleMobileMenu();
    });
  }

  // Close menu on close button click
  if (closeMobileMenuButton) {
    closeMobileMenuButton.addEventListener('click', closeMobileMenu);
  }

  // Close menu when clicking on a nav link
  document.querySelectorAll('#mobile-menu a[href^="#"]').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (!mobileMenu || !mobileMenuButton) return;

    const isClickInsideMenu = mobileMenu.contains(e.target);
    const isMenuButton = mobileMenuButton.contains(e.target);
    const isMenuOpen = !mobileMenu.classList.contains('-translate-x-full');

    if (!isClickInsideMenu && !isMenuButton && isMenuOpen) {
      closeMobileMenu();
    }
  });

  // Close menu with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('-translate-x-full')) {
      closeMobileMenu();
    }
  });
});

// Smooth rotating text effect
document.addEventListener('DOMContentLoaded', function () {
  const words = ['elewacji!', 'kostki!', 'dachu!'];
  let currentIndex = 0;
  const rotatingText = document.getElementById('rotating-text');
  let isAnimating = false;

  // Initial setup
  if (rotatingText) {
    rotatingText.style.opacity = '1';

    function rotateText() {
      if (isAnimating) return;
      isAnimating = true;

      // Fade out
      rotatingText.style.opacity = '0';

      // Wait for fade out to complete
      setTimeout(() => {
        // Change text
        currentIndex = (currentIndex + 1) % words.length;
        rotatingText.textContent = words[currentIndex];

        // Fade in
        setTimeout(() => {
          rotatingText.style.opacity = '1';
          isAnimating = false;
        }, 50);
      }, 500);
    }

    // Start the rotation after initial load
    setTimeout(() => {
      // Change text every 2.5 seconds (2s visible + 0.5s transition)
      setInterval(rotateText, 2500);
    }, 2000); // Initial delay before first rotation
  }
});

// Smooth page load
document.addEventListener('DOMContentLoaded', function () {
  // Add fade-in effect when page loads
  document.body.style.opacity = '0';
  setTimeout(function () {
    document.body.style.transition = 'opacity 0.5s ease-in';
    document.body.style.opacity = '1';
  }, 100);
});
