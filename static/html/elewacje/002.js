// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
});

// Sticky Navigation
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar-sticky');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({
    behavior: 'smooth',
  });
}

// Navigation links
document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const sectionId = this.getAttribute('href').substring(1);
    scrollToSection(sectionId);
  });
});

// Before/After Slider
document.querySelectorAll('.before-after-slider').forEach((slider) => {
  slider.addEventListener('mousemove', function (e) {
    const rect = slider.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;

    const afterImg = slider.querySelector('.after-img');
    afterImg.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
  });

  slider.addEventListener('mouseleave', function () {
    const afterImg = slider.querySelector('.after-img');
    afterImg.style.clipPath = 'inset(0 50% 0 0)';
  });
});

// Price Calculator
function calculatePrice() {
  const serviceType = document.getElementById('serviceType');
  const area = document.getElementById('area').value;
  const totalPriceElement = document.getElementById('totalPrice');

  if (serviceType.value && area) {
    const pricePerUnit = parseFloat(serviceType.selectedOptions[0].dataset.price);
    const total = pricePerUnit * parseFloat(area);
    totalPriceElement.textContent = total.toLocaleString('pl-PL');
  } else {
    totalPriceElement.textContent = '0';
  }
}

// Form Validation
function validateField(fieldId, errorId, validationFn, errorMessage) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);

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
document.getElementById('name').addEventListener('input', function () {
  validateField('name', 'nameError', validateName, 'Proszę podać imię i nazwisko (min. 2 znaki)');
});

document.getElementById('phone').addEventListener('input', function () {
  validateField('phone', 'phoneError', validatePhone, 'Proszę podać prawidłowy numer telefonu (min. 9 cyfr)');
});

document.getElementById('email').addEventListener('input', function () {
  validateField('email', 'emailError', validateEmail, 'Proszę podać prawidłowy adres e-mail');
});

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
      document.getElementById('successMessage').style.display = 'block';
      document.getElementById('contactForm').reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        document.getElementById('successMessage').style.display = 'none';
      }, 5000);
    }, 1000);
  }
}

// Mobile menu toggle (basic implementation)
document.querySelector('.md\\:hidden button').addEventListener('click', function () {
  // Mobile menu implementation would go here
  alert('Menu mobilne - implementacja w pełnej wersji');
});

// Add loading animation on page load
window.addEventListener('load', function () {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});
