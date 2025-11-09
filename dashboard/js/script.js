// Konfiguracja domyślnych URL-i
const defaultUrls = {
    iframe1: 'https://www.example.com',
    iframe2: 'https://www.example.com',
    iframe3: 'https://www.example.com',
    iframe4: 'https://www.example.com',
    iframe5: 'https://www.example.com'
};

// Funkcja do załadowania zapisanych URL-i z localStorage
function loadSavedUrls() {
    for (let i = 1; i <= 5; i++) {
        const savedUrl = localStorage.getItem(`iframe${i}Url`);
        const iframe = document.getElementById(`iframe${i}`);
        const urlInput = document.getElementById(`url${i}`);
        
        if (savedUrl) {
            iframe.src = savedUrl;
            urlInput.value = savedUrl;
        } else {
            iframe.src = defaultUrls[`iframe${i}`];
            urlInput.value = defaultUrls[`iframe${i}`];
        }
    }
}

// Funkcja do zapisania URL-i do localStorage
function saveUrls() {
    for (let i = 1; i <= 5; i++) {
        const urlInput = document.getElementById(`url${i}`);
        const url = urlInput.value.trim();
        
        if (url) {
            localStorage.setItem(`iframe${i}Url`, url);
            document.getElementById(`iframe${i}`).src = url;
        }
    }
    
    showNotification('✅ Ustawienia zapisane!', 'success');
    closeModal();
}

// Funkcja do resetowania URL-i do wartości domyślnych
function resetUrls() {
    if (confirm('Czy na pewno chcesz zresetować wszystkie URL-e do wartości domyślnych?')) {
        for (let i = 1; i <= 5; i++) {
            localStorage.removeItem(`iframe${i}Url`);
            document.getElementById(`iframe${i}`).src = defaultUrls[`iframe${i}`];
            document.getElementById(`url${i}`).value = defaultUrls[`iframe${i}`];
        }
        showNotification('🔄 Ustawienia zresetowane!', 'info');
    }
}

// Funkcja do odświeżania iframe
function refreshIframe(iframeNumber) {
    const iframe = document.getElementById(`iframe${iframeNumber}`);
    const currentSrc = iframe.src;
    iframe.src = '';
    setTimeout(() => {
        iframe.src = currentSrc;
    }, 100);
    showNotification(`🔄 Panel ${iframeNumber} odświeżony!`, 'info');
}

// Funkcja do pokazywania powiadomień
function showNotification(message, type = 'success') {
    // Usuń poprzednie powiadomienie jeśli istnieje
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Dodaj style
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    // Usuń po 3 sekundach
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Funkcje do zarządzania modalem
function openModal() {
    document.getElementById('settingsModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('settingsModal').style.display = 'none';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Załaduj zapisane URL-e przy starcie
    loadSavedUrls();
    
    // Przycisk ustawień
    document.getElementById('settingsBtn').addEventListener('click', openModal);
    
    // Przycisk zamknięcia modala
    document.querySelector('.close-btn').addEventListener('click', closeModal);
    
    // Przycisk zapisz
    document.getElementById('saveBtn').addEventListener('click', saveUrls);
    
    // Przycisk resetuj
    document.getElementById('resetBtn').addEventListener('click', resetUrls);
    
    // Zamknij modal po kliknięciu poza nim
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('settingsModal');
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Przyciski odświeżania
    document.querySelectorAll('.refresh-btn').forEach(button => {
        button.addEventListener('click', function() {
            const iframeNumber = this.getAttribute('data-iframe');
            refreshIframe(iframeNumber);
        });
    });
    
    // Obsługa Enter w inputach
    document.querySelectorAll('.url-input-group input').forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                saveUrls();
            }
        });
    });
});

// Dodaj style dla animacji powiadomień
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Obsługa błędów ładowania iframe
window.addEventListener('load', function() {
    document.querySelectorAll('iframe').forEach((iframe, index) => {
        iframe.addEventListener('error', function() {
            console.error(`Błąd ładowania iframe ${index + 1}`);
        });
    });
});
