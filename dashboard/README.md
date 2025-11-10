# Monitor Danych w Czasie Rzeczywistym

## 📋 Opis Projektu

Profesjonalna strona internetowa typu "one page" z layoutem fullscreen, zaprojektowana do monitorowania danych w czasie rzeczywistym z 5 różnych źródeł poprzez iframe-y.

## ✨ Zaimplementowane Funkcjonalności

### Obecne Możliwości:
- ✅ **Layout Fullscreen** - Strona wykorzystuje 100% dostępnej przestrzeni ekranu
- ✅ **5 Iframe-ów** - Układ z 1 dużym iframe-em na górze i 4 mniejszymi na dole
- ✅ **Konfiguracja URL** - Modal do edycji URL-i wszystkich iframe-ów
- ✅ **LocalStorage** - Automatyczne zapisywanie ustawień URL-i
- ✅ **Odświeżanie** - Przycisk do odświeżania każdego iframe osobno
- ✅ **Responsywny Design** - Dostosowuje się do różnych rozmiarów ekranu
- ✅ **Powiadomienia** - Wizualne powiadomienia o akcjach użytkownika
- ✅ **Animacje** - Płynne przejścia i efekty hover
- ✅ **Nowoczesny UI** - Gradient w fioletowych odcieniach, zaokrąglone rogi

## 🎯 Funkcjonalności UI

### Layout Iframe-ów:
```
┌─────────────────────────────────┐
│         Panel 1 (Duży)          │
│                                 │
├────────────┬────────────────────┤
│  Panel 2   │     Panel 3        │
├────────────┼────────────────────┤
│  Panel 4   │     Panel 5        │
└────────────┴────────────────────┘
```

### Dostępne Akcje:
1. **⚙️ Konfiguracja** - Kliknij ikonę koła zębatego w prawym górnym rogu
2. **🔄 Odświeżanie** - Każdy panel ma przycisk do odświeżenia zawartości
3. **💾 Zapisywanie** - URL-e są automatycznie zapisywane w przeglądarce
4. **🔄 Reset** - Przywrócenie domyślnych URL-i

## 📁 Struktura Projektu

```
/
├── index.html          # Główna strona HTML
├── css/
│   └── style.css      # Style CSS
├── js/
│   └── script.js      # Logika JavaScript
└── README.md          # Dokumentacja
```

## 🚀 Jak Używać

### Pierwszy Start:
1. Otwórz `index.html` w przeglądarce
2. Kliknij przycisk ⚙️ w prawym górnym rogu
3. Wpisz URL-e stron, które chcesz monitorować
4. Kliknij "Zapisz Ustawienia"

### Zmiana URL-i:
1. Kliknij przycisk ⚙️
2. Edytuj URL-e w formularzu
3. Zatwierdź przyciskiem "Zapisz Ustawienia"

### Odświeżanie Panelu:
- Kliknij przycisk 🔄 na wybranym panelu

### Reset Ustawień:
- W modalu konfiguracji kliknij "Resetuj"

## 🎨 Personalizacja

### Zmiana Kolorów:
Edytuj gradient w pliku `css/style.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Zmiana Domyślnych URL-i:
Edytuj obiekt `defaultUrls` w pliku `js/script.js`:
```javascript
const defaultUrls = {
    iframe1: 'https://twoj-url-1.com',
    iframe2: 'https://twoj-url-2.com',
    // ...
};
```

### Zmiana Układu:
Edytuj grid w `css/style.css`:
```css
.iframe-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 2fr 1fr 1fr;
}
```

## 📱 Responsywność

- **Desktop**: Układ 1 duży + 4 małe (2x2)
- **Mobile**: Układ pionowy 5 iframe-ów jeden pod drugim
- **Tablet**: Automatyczne dostosowanie

## 💾 Przechowywanie Danych

- **LocalStorage**: URL-e iframe-ów są zapisywane lokalnie w przeglądarce
- **Klucze**: `iframe1Url`, `iframe2Url`, `iframe3Url`, `iframe4Url`, `iframe5Url`
- **Automatyczny zapis**: Ustawienia są przywracane przy każdym otwarciu strony

## ⚠️ Ważne Uwagi

### CORS (Cross-Origin Resource Sharing):
- Niektóre strony mogą blokować wyświetlanie w iframe-ach
- Jeśli strona nie ładuje się, sprawdź czy nie ma błędów CORS w konsoli przeglądarki
- Problemy z CORS są zależne od konfiguracji serwera źródłowego

### X-Frame-Options:
- Niektóre strony używają nagłówka X-Frame-Options aby zablokować iframe-y
- W takim przypadku trzeba znaleźć alternatywne źródło danych

## 🔧 Technologie

- **HTML5** - Struktura semantyczna
- **CSS3** - Nowoczesne style, Grid Layout, Flexbox
- **Vanilla JavaScript** - Bez dodatkowych bibliotek
- **LocalStorage API** - Przechowywanie ustawień
- **Iframe API** - Osadzanie zewnętrznych stron

## 📊 Przykładowe Zastosowania

- 📈 Dashboard analityczny z wykresami
- 📺 Monitorowanie wielu kamer/streamów
- 💹 Śledzenie rynków finansowych
- 📊 Wizualizacja danych IoT
- 🗺️ Mapa + panele informacyjne

## 🆘 Rozwiązywanie Problemów

### Iframe nie ładuje się:
1. Sprawdź URL w konsoli deweloperskiej (F12)
2. Sprawdź błędy CORS lub X-Frame-Options
3. Spróbuj użyć alternatywnego URL

### Ustawienia nie zapisują się:
1. Sprawdź czy localStorage jest włączone w przeglądarce
2. Sprawdź czy nie używasz trybu prywatnego/incognito

### Strona nie wyświetla się poprawnie:
1. Wyczyść cache przeglądarki
2. Sprawdź czy wszystkie pliki są załadowane (DevTools → Network)

## 🎯 Następne Kroki (Możliwe Rozszerzenia)

- [ ] Dodanie możliwości zmiany układu iframe-ów (drag & drop)
- [ ] Eksport/import konfiguracji
- [ ] Tryb pełnoekranowy dla pojedynczych paneli
- [ ] Automatyczne odświeżanie w określonych interwałach
- [ ] Obsługa wielu profili z różnymi zestawami URL-i
- [ ] Ciemny motyw (dark mode)
- [ ] Wskaźniki ładowania dla iframe-ów

## 📝 Licencja

Projekt jest dostępny do swobodnego użytku i modyfikacji.

---

**Utworzono**: 2025-11-09
**Wersja**: 1.0.0
