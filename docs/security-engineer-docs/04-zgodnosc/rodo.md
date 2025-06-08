---
id: "rodo"
title: "Rodo"
sidebar_position: 1
---

RODO (Rozporządzenie o Ochronie Danych Osobowych), znane także jako GDPR (General Data Protection Regulation), to kluczowy akt prawny w zakresie ochrony danych osobowych w Unii Europejskiej. Dla Security Engineera oznacza obowiązek wdrażania środków technicznych i organizacyjnych, które zapewniają zgodność systemów IT z zasadami ochrony danych.

## 📘 Czym jest RODO?

- Unijne rozporządzenie obowiązujące od 25 maja 2018 roku
- Ma zastosowanie do każdej organizacji przetwarzającej dane osobowe obywateli UE
- Dotyczy danych klientów, pracowników, użytkowników – wszelkich osób fizycznych
- Naruszenia RODO mogą skutkować karami do 20 milionów euro lub 4% rocznego obrotu firmy

## 🔒 Główne zasady RODO

- **Legalność i przejrzystość** – dane muszą być przetwarzane zgodnie z prawem i jasno komunikowane
- **Ograniczenie celu** – dane mogą być wykorzystywane tylko do jasno określonych celów
- **Minimalizacja danych** – zbieraj tylko dane niezbędne
- **Dokładność danych** – dane muszą być aktualne
- **Ograniczenie przechowywania** – dane nie mogą być przechowywane dłużej niż to konieczne
- **Integralność i poufność** – dane muszą być chronione przed nieautoryzowanym dostępem
- **Rozliczalność** – organizacja musi być w stanie wykazać zgodność z zasadami

## 🔧 Rola Security Engineera

- Zapewnienie, że systemy spełniają wymogi Privacy by Design i Privacy by Default
- Wdrażanie mechanizmów anonimizacji, pseudonimizacji i szyfrowania danych
- Ustalanie polityk dostępu do danych osobowych (np. tylko dla uprawnionych ról)
- Implementacja logowania i monitorowania przetwarzania danych osobowych
- Współpraca z Inspektorem Ochrony Danych (IOD/DPO) w zakresie bezpieczeństwa technicznego
- Reakcja na incydenty związane z naruszeniem danych – zgodnie z art. 33 i 34 RODO

## ⚠️ Najczęstsze ryzyka i błędy

- Przesyłanie danych osobowych bez szyfrowania (np. mailem lub w URL)
- Niezabezpieczone formularze kontaktowe
- Brak kontroli dostępu do baz danych i logów
- Brak logów zmian i dostępu do danych
- Nieaktualne uprawnienia (np. dostęp dla byłych pracowników)
- Niewystarczająca reakcja na żądania użytkowników (prawo do usunięcia, przeniesienia danych itd.)

## ✅ Dobre praktyki

- Wdrażaj szyfrowanie „end-to-end” oraz zabezpieczaj kopie zapasowe
- Regularnie testuj systemy pod kątem nieszczelności danych
- Twórz rejestry operacji przetwarzania i zasobów IT
- Uwzględniaj RODO w testach aplikacji i przeglądach architektury
- Prowadź szkolenia zespołu IT i developerów w zakresie przetwarzania danych osobowych

> RODO to nie tylko obowiązek prawny – to standard dbania o zaufanie klientów i bezpieczeństwo informacji, które są coraz częściej celem ataków.
