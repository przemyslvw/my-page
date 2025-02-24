import os

# Ścieżka do katalogu projektu Docusaurus
base_dir = 'my-pihole-docs'
docs_dir = os.path.join(base_dir, 'docs')

# Spis treści kursu
chapters = [
    ('intro.md', '# 📖 Wstęp\n\n- Czym jest Pi-hole?\n- Dlaczego warto korzystać z Pi-hole?\n- Wymagania sprzętowe i systemowe\n- Przegląd funkcji Pi-hole'),
    ('rozdzial-1-przygotowanie.md', '# 🛠️ Rozdział 1: Przygotowanie środowiska\n\n- Wybór sprzętu\n- Przygotowanie karty SD\n- Konfiguracja sieci\n- Ustawienia systemu'),
    ('rozdzial-2-instalacja.md', '# ⚡ Rozdział 2: Instalacja Pi-hole\n\n- Instalacja krok po kroku\n- Konfiguracja podstawowa\n- Ustawienie statycznego IP'),
    ('rozdzial-3-konfiguracja-sieci.md', '# 🌐 Rozdział 3: Konfiguracja sieci\n\n- Ustawienie Pi-hole jako DNS\n- Konfiguracja DHCP\n- Dodawanie wyjątków\n- Blokowanie reklam'),
    ('rozdzial-4-zarzadzanie-monitorowanie.md', '# 🔍 Rozdział 4: Zarządzanie i monitorowanie\n\n- Przegląd interfejsu\n- Statystyki i logi\n- Zarządzanie listami\n- Zmiana ustawień DNS'),
    ('rozdzial-5-zabezpieczenia-optymalizacja.md', '# 🔒 Rozdział 5: Zabezpieczenia i optymalizacja\n\n- Ustawienie hasła\n- Blokowanie złośliwych domen\n- Konfiguracja firewall\n- Aktualizacje'),
    ('rozdzial-6-zaawansowane-funkcje.md', '# 📊 Rozdział 6: Zaawansowane funkcje\n\n- Integracja z Unbound\n- VPN z WireGuard\n- Czarne i białe listy\n- Własne listy blokujące'),
    ('rozdzial-7-rozwiazywanie-problemow.md', '# 🧑‍💻 Rozdział 7: Rozwiązywanie problemów\n\n- Najczęstsze błędy\n- Analiza logów\n- Naprawa problemów z DNS\n- Przywracanie ustawień'),
    ('rozdzial-8-scenariusze-zastosowania.md', '# 💡 Rozdział 8: Scenariusze zastosowania\n\n- Sieć domowa\n- Mała firma\n- Urządzenia mobilne\n- Smart TV i gry'),
    ('zalaczniki.md', '# 📁 Załączniki\n\n- Przydatne listy blokujące\n- Słownik pojęć\n- Narzędzia do analizy sieci')
]

# Tworzenie struktury katalogów
os.makedirs(docs_dir, exist_ok=True)

# Generowanie plików .md
for filename, content in chapters:
    file_path = os.path.join(docs_dir, filename)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("✅ Pliki zostały wygenerowane w katalogu 'my-pihole-docs/docs/'")
