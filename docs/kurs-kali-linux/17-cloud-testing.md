---
id: "cloud-testing"
title: "☁️ Testowanie aplikacji w chmurze (AWS, Azure, GCP)"
sidebar_position: 17
---

# ☁️ Testowanie aplikacji w chmurze (AWS, Azure, GCP)

Aplikacje wdrażane w chmurze często cierpią na błędne konfiguracje oraz niewłaściwie skonfigurowane uprawnienia, co może prowadzić do przejęcia zasobów, wycieku danych oraz eskalacji uprawnień w środowisku chmurowym.

---

## 🔍 Błędne konfiguracje chmury

### **1️⃣ Publiczne zasoby S3 w AWS**
Amazon S3 to popularna usługa przechowywania danych, ale często zdarza się, że zasoby są udostępnione publicznie.

#### **1.1 Wyszukiwanie publicznych bucketów S3**
```bash
aws s3 ls s3://example-bucket --no-sign-request
```
Jeśli bucket jest publiczny, można pobrać jego zawartość:
```bash
aws s3 cp s3://example-bucket/secrets.txt . --no-sign-request
```
Rozwiązanie: **Ustaw polityki dostępu do bucketów S3 na `private` i ogranicz dostęp tylko do autoryzowanych użytkowników.**

#### **1.2 Sprawdzanie błędnie skonfigurowanych CDN (CloudFront)**
Jeśli serwer backendowy jest publicznie dostępny, można spróbować go wywołać bezpośrednio:
```bash
curl -I https://backend.example.com
```
Jeśli serwer odpowiada, oznacza to, że może być podatny na ataki SSRF lub eksfiltrację danych.

---

### **2️⃣ Niewłaściwe konfiguracje baz danych w chmurze**
Bazy danych w chmurze często są błędnie skonfigurowane, umożliwiając nieautoryzowany dostęp.

#### **2.1 Wyszukiwanie otwartych baz danych MongoDB**
```bash
nmap -p 27017 --script mongodb-info example.com
```
Jeśli baza zwraca dane, można próbować uzyskać dostęp:
```bash
mongo --host example.com --port 27017
show dbs;
```
Rozwiązanie: **Włącz autoryzację i ogranicz dostęp do bazy do konkretnych adresów IP.**

#### **2.2 Sprawdzanie publicznych baz danych w Google Cloud**
Google Cloud SQL może być podatne, jeśli nie wymusza autoryzacji IP:
```bash
gcloud sql instances list --project=my-project
```
Jeśli instancja jest widoczna publicznie, można spróbować nawiązać połączenie:
```bash
gcloud sql connect my-instance --user=root
```
Rozwiązanie: **Ustaw ograniczenia dostępu i wymuś uwierzytelnianie kluczem.**

---

## 🔵 Testowanie Microsoft Azure

### **3️⃣ Enumeracja zasobów Azure (bez uwierzytelnienia)**

Wyciek subskrypcji lub tenant ID może pozwolić na enumerację zasobów:

```bash
# Instalacja Azure CLI w Kali
sudo apt install -y azure-cli

# Logowanie i lista subskrypcji
az login
az account list --output table
```

#### **3.1 Wyszukiwanie publicznych Azure Storage Containers**
Analogicznie do S3 — Azure Blob Storage bywa konfigurowane jako publiczne:

```bash
# Sprawdzenie dostępu anonimowego do kontenera
curl -s "https://<storage-account>.blob.core.windows.net/<container>?restype=container&comp=list"
```

Jeśli zwróci listę plików — kontener jest publiczny.

Narzędzie do automatycznej enumeracji:
```bash
# MicroBurst — toolkit do Azure pentestów
git clone https://github.com/NetSPI/MicroBurst.git
cd MicroBurst
# Wyszukiwanie otwartych storage accounts
Invoke-EnumerateAzureBlobs -Base company-name
```

---

#### **3.2 Atak na Azure Entra ID (dawniej Azure AD)**

Enumeracja użytkowników przez publiczny endpoint:
```bash
# Sprawdzenie czy domena używa Azure AD
curl -s "https://login.microsoftonline.com/<domena.com>/.well-known/openid-configuration"

# Enumeracja kont użytkowników (wymaga tokenu)
az ad user list --query "[].{Name:displayName,UPN:userPrincipalName}" --output table
```

#### **3.3 Eskalacja uprawnień przez Service Principal**
Jeśli uzyskasz dostęp do Service Principal z nadmiernymi uprawnieniami:
```bash
# Sprawdzenie uprawnień bieżącego SP
az role assignment list --assignee <client-id> --output table

# Próba dodania roli Owner do zasobu
az role assignment create --assignee <client-id> --role Owner --scope /subscriptions/<sub-id>
```

Rozwiązanie: **Stosuj zasadę least privilege dla Service Principals, regularnie audytuj role w Azure RBAC.**

---

#### **3.4 Azure Key Vault — wykrywanie wrażliwych danych**
Key Vault przechowuje sekrety, certyfikaty i klucze. Błędna konfiguracja pozwala na ich odczyt:
```bash
# Lista Key Vaultów w subskrypcji
az keyvault list --output table

# Próba odczytu sekretów (jeśli mamy uprawnienia)
az keyvault secret list --vault-name <vault-name>
az keyvault secret show --vault-name <vault-name> --name <secret-name>
```

Rozwiązanie: **Ogranicz dostęp do Key Vault przez Azure RBAC, włącz Soft Delete i Purge Protection.**

---

## 🔥 IAM Privilege Escalation
IAM (Identity and Access Management) jest kluczowym mechanizmem kontroli dostępu w chmurze, ale niewłaściwe konfiguracje mogą pozwolić atakującym na eskalację uprawnień.

### **3️⃣ Wyszukiwanie nadmiernych uprawnień IAM w AWS**
Jeśli użytkownik ma możliwość modyfikowania własnych uprawnień, może uzyskać dostęp administracyjny:
```bash
aws iam list-policies --scope Local
```
Jeśli znajdziemy politykę `iam:PutUserPolicy`, można dodać własne uprawnienia:
```bash
aws iam put-user-policy --user-name hacker --policy-name escalated --policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Action":"*","Resource":"*"}]}'
```
Teraz użytkownik `hacker` ma pełne uprawnienia.

Rozwiązanie: **Ograniczenie uprawnień IAM poprzez zasady `least privilege`.**

---

### **4️⃣ Przejęcie roli IAM w Google Cloud**
Jeśli użytkownik może edytować role IAM, może dodać się do grupy administratorów:
```bash
gcloud projects add-iam-policy-binding my-project \
    --member=user:hacker@example.com --role=roles/owner
```
Teraz `hacker@example.com` ma pełne uprawnienia do projektu.

Rozwiązanie: **Używanie zasad `deny policy` i regularny audyt uprawnień IAM.**

---

## 🔐 Jak zabezpieczyć aplikacje w chmurze?
✅ **Regularnie audytuj konfiguracje S3, baz danych i usług sieciowych.**
✅ **Ogranicz uprawnienia IAM do absolutnego minimum.**
✅ **Włącz monitoring i alertowanie dla nietypowych działań.**
✅ **Używaj narzędzi typu AWS GuardDuty, Google Security Command Center do wykrywania zagrożeń.**
✅ **Blokuj dostęp do metadanych instancji (`169.254.169.254`) w ramach ochrony przed SSRF.**
✅ **Dla Azure: użyj Microsoft Defender for Cloud do wykrywania misconfiguracji.**
✅ **Regularnie audytuj Azure RBAC — unikaj nadmiarowych ról Owner/Contributor dla Service Principals.**

---

Testowanie aplikacji w chmurze jest kluczowe dla bezpieczeństwa infrastruktury IT. Kolejnym krokiem będzie analiza podatności **Case Studies i ćwiczenia praktyczne**! 🚀
