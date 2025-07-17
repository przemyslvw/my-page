---
id: "a09-logging-monitoring-opis"
title: "Opis podatności i jej wpływ"
sidebar_position: 41
---

# 📝 Opis podatności i jej wpływ – Security Logging and Monitoring Failures (A09:2025)

## 🔍 Czym jest ta podatność?

**Security Logging and Monitoring Failures** to kategoria zagrożeń wynikających z braku odpowiedniego rejestrowania zdarzeń bezpieczeństwa, ich analizy i szybkiego reagowania. Obejmuje to:

- brak logów dla istotnych zdarzeń (np. logowania, błędów autoryzacji),
- brak integracji z systemami SIEM/SOAR,
- niewłaściwe przechowywanie lub formatowanie logów,
- nieodpowiednie alertowanie w czasie incydentu.

---

## 🚨 Przykłady typowych błędów

- Brak logowania prób dostępu do konta administracyjnego.
- Niewykrywanie nietypowej aktywności (np. 1000 zapytań w sekundę).
- Brak informacji o błędach JWT, CSRF, CORS.
- Logi zapisywane tylko lokalnie, bez redundancji lub rotacji.
- Brak rozdzielenia logów technicznych od logów bezpieczeństwa.

---

## 🎯 Potencjalny wpływ na aplikację i organizację

- **Opóźnione wykrycie ataku** – brak sygnałów ostrzegawczych skutkuje długim czasem detekcji (np. ransomware wykryty po 3 dniach).
- **Utrudnione dochodzenie po incydencie** – brak logów uniemożliwia analizę wektorów ataku.
- **Brak zgodności z regulacjami** – np. RODO, ISO 27001, NIS2 wymagają logowania i monitorowania.
- **Ułatwione działania dla atakującego** – brak śladów pozwala na dłuższe utrzymanie się w systemie (*persistence*).

---

## 📌 Statystyki i znaczenie

- Średni czas wykrycia incydentu wg raportu IBM X-Force: **~207 dni**.
- 70% organizacji nie analizuje aktywnie logów w czasie rzeczywistym.
- Ponad 90% ataków da się zauważyć wcześniej, gdyby logi były prawidłowo monitorowane.

---

## 🛡️ Dlaczego warto to naprawić?

Skuteczny system logowania i monitoringu to nie tylko element dobrej praktyki, ale jeden z filarów detekcji i reakcji na incydenty. Działa jako:

- narzędzie wczesnego ostrzegania,
- podstawa audytu i forensics,
- zabezpieczenie zgodności z regulacjami.

Brak właściwego logowania to zaproszenie dla atakujących do działania w cieniu – bez strachu przed wykryciem.

