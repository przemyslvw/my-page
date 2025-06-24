        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        // Observe all fade-up elements
        document.querySelectorAll('.fade-up').forEach(el => {
            observer.observe(el);
        });

        // Observe testimonial bubbles
        document.querySelectorAll('.testimonial-bubble').forEach(el => {
            observer.observe(el);
        });

        // Before/After Slider functionality
        document.querySelectorAll('.before-after-slider').forEach(slider => {
            let isDragging = false;
            
            slider.addEventListener('mousedown', () => {
                isDragging = true;
            });
            
            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                
                const container = slider.parentElement;
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percentage = (x / rect.width) * 100;
                
                if (percentage >= 0 && percentage <= 100) {
                    slider.style.left = percentage + '%';
                    const afterImage = container.querySelector('[style*="clip-path"]');
                    if (afterImage) {
                        afterImage.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
                    }
                }
            });
            
            document.addEventListener('mouseup', () => {
                isDragging = false;
            });
        });

        // Price Calculator
        function updatePrice() {
            const surfaceType = document.getElementById('surfaceType');
            const area = document.getElementById('area');
            const priceDisplay = document.getElementById('calculatedPrice');
            
            if (surfaceType.value && area.value) {
                const pricePerM2 = parseInt(surfaceType.value);
                const totalArea = parseInt(area.value);
                const totalPrice = pricePerM2 * totalArea;
                
                priceDisplay.innerHTML = `
                    <div class="text-3xl font-bold">${totalPrice} zł</div>
                    <div class="text-sm opacity-75">Cena orientacyjna za ${totalArea} m²</div>
                `;
                
                // Save to localStorage
                localStorage.setItem('calculatorData', JSON.stringify({
                    surface: surfaceType.options[surfaceType.selectedIndex].text,
                    area: totalArea,
                    price: totalPrice
                }));
            } else {
                priceDisplay.innerHTML = 'Wybierz opcje aby obliczyć cenę';
            }
        }

        document.getElementById('surfaceType').addEventListener('change', updatePrice);
        document.getElementById('area').addEventListener('input', updatePrice);

        // Load saved calculator data
        window.addEventListener('load', () => {
            const savedData = localStorage.getItem('calculatorData');
            if (savedData) {
                const data = JSON.parse(savedData);
                // You can pre-fill the form if needed
            }
        });

        function requestQuote() {
            const data = localStorage.getItem('calculatorData');
            if (data) {
                const calculatorData = JSON.parse(data);
                document.getElementById('message').value = 
                    `Witam, chciałbym uzyskać wycenę dla:\n` +
                    `Typ usługi: ${calculatorData.surface}\n` +
                    `Powierzchnia: ${calculatorData.area} m²\n` +
                    `Orientacyjna cena: ${calculatorData.price} zł\n\n` +
                    `Proszę o kontakt w celu ustalenia szczegółów.`;
            }
            document.getElementById('kontakt').scrollIntoView({ behavior: 'smooth' });
        }

        // Form Validation
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function validatePhone(phone) {
            const re = /^[+]?[\d\s-()]{9,}$/;
            return re.test(phone);
        }

        function showError(fieldId, message) {
            const field = document.getElementById(fieldId);
            const errorDiv = document.getElementById(fieldId + 'Error');
            field.classList.add('error');
            errorDiv.textContent = message;
        }

        function clearError(fieldId) {
            const field = document.getElementById(fieldId);
            const errorDiv = document.getElementById(fieldId + 'Error');
            field.classList.remove('error');
            errorDiv.textContent = '';
        }

        // Image Modal Functionality
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const modalCaption = document.getElementById('modalCaption');
        const closeModal = document.getElementById('closeModal');
        
        // Open modal when clicking on gallery items
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const imgSrc = this.getAttribute('data-image');
                const caption = this.getAttribute('data-caption') || '';
                
                modalImg.src = imgSrc;
                modalImg.alt = caption;
                modalCaption.textContent = caption;
                
                // Show modal
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            });
        });
        
        // Close modal when clicking the close button
        closeModal.addEventListener('click', function() {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = ''; // Re-enable scrolling
        });
        
        // Close modal when clicking outside the image
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        });

        // Real-time validation
        document.getElementById('name').addEventListener('input', function() {
            if (this.value.trim().length < 2) {
                showError('name', 'Imię musi mieć co najmniej 2 znaki');
            } else {
                clearError('name');
            }
        });

        document.getElementById('email').addEventListener('input', function() {
            if (!validateEmail(this.value)) {
                showError('email', 'Wprowadź poprawny adres e-mail');
            } else {
                clearError('email');
            }
        });

        document.getElementById('phone').addEventListener('input', function() {
            if (!validatePhone(this.value)) {
                showError('phone', 'Wprowadź poprawny numer telefonu');
            } else {
                clearError('phone');
            }
        });

        document.getElementById('message').addEventListener('input', function() {
            if (this.value.trim().length < 10) {
                showError('message', 'Wiadomość musi mieć co najmniej 10 znaków');
            } else {
                clearError('message');
            }
        });

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            if (name.length < 2) {
                showError('name', 'Imię musi mieć co najmniej 2 znaki');
                isValid = false;
            }
            
            if (!validateEmail(email)) {
                showError('email', 'Wprowadź poprawny adres e-mail');
                isValid = false;
            }
            
            if (!validatePhone(phone)) {
                showError('phone', 'Wprowadź poprawny numer telefonu');
                isValid = false;
            }
            
            if (message.length < 10) {
                showError('message', 'Wiadomość musi mieć co najmniej 10 znaków');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Wysyłanie...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Dziękujemy za wiadomość! Skontaktujemy się z Państwem w ciągu 24 godzin.');
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector('.hero-bg');
            if (heroSection) {
                heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Add scroll-triggered animations to service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });

        // Initialize animations on page load
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });