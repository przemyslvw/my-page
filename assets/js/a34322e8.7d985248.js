"use strict";(self.webpackChunkmy_page=self.webpackChunkmy_page||[]).push([[8819],{28453:(n,e,a)=>{a.d(e,{R:()=>t,x:()=>s});var r=a(96540);const i={},o=r.createContext(i);function t(n){const e=r.useContext(o);return r.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function s(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:t(n.components),r.createElement(o.Provider,{value:e},n.children)}},43906:(n,e,a)=>{a.r(e),a.d(e,{assets:()=>c,contentTitle:()=>s,default:()=>d,frontMatter:()=>t,metadata:()=>r,toc:()=>l});const r=JSON.parse('{"id":"kurswireshark/06/04","title":"Wykrywanie tunelowania danych","description":"Tunelowanie danych to technika wykorzystywana zar\xf3wno do legalnych, jak i nielegalnych cel\xf3w. Mo\u017ce s\u0142u\u017cy\u0107 do obej\u015bcia restrykcji sieciowych, ale tak\u017ce do ukrywania nieautoryzowanej komunikacji.","source":"@site/docs/kurswireshark/06/04.md","sourceDirName":"kurswireshark/06","slug":"/kurswireshark/06/04","permalink":"/docs/kurswireshark/06/04","draft":false,"unlisted":false,"editUrl":"https://github.com/przemyslvw/my-page/edit/master/docs/kurswireshark/06/04.md","tags":[],"version":"current","sidebarPosition":4,"frontMatter":{"sidebar_position":4},"sidebar":"tutorialSidebar","previous":{"title":"Analiza ruchu Tor","permalink":"/docs/kurswireshark/06/03"},"next":{"title":"Analiza anomalii w ruchu szyfrowanym","permalink":"/docs/kurswireshark/06/05"}}');var i=a(74848),o=a(28453);const t={sidebar_position:4},s="Wykrywanie tunelowania danych",c={},l=[{value:"<strong>Popularne metody tunelowania danych:</strong>",id:"popularne-metody-tunelowania-danych:",level:4}];function u(n){const e={br:"br",h1:"h1",h4:"h4",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...(0,o.R)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.header,{children:(0,i.jsx)(e.h1,{id:"wykrywanie-tunelowania-danych",children:"Wykrywanie tunelowania danych"})}),"\n",(0,i.jsx)(e.p,{children:"Tunelowanie danych to technika wykorzystywana zar\xf3wno do legalnych, jak i nielegalnych cel\xf3w. Mo\u017ce s\u0142u\u017cy\u0107 do obej\u015bcia restrykcji sieciowych, ale tak\u017ce do ukrywania nieautoryzowanej komunikacji."}),"\n",(0,i.jsx)(e.h4,{id:"popularne-metody-tunelowania-danych:",children:(0,i.jsx)(e.strong,{children:"Popularne metody tunelowania danych:"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"Tunelowanie przez DNS"})," \u2013 wykorzystywane do obej\u015bcia firewalli:",(0,i.jsx)(e.br,{}),"\n",'dns.qry.name contains ".tunnel"']}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"Tunelowanie przez ICMP (ping tunneling)"})," \u2013 ukrywanie danych w pakietach ping:",(0,i.jsx)(e.br,{}),"\n","icmp and frame.len > 100"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.strong,{children:"Tunelowanie przez HTTPS"})," \u2013 nietypowy ruch HTTPS u\u017cywany do ukrywania danych:",(0,i.jsx)(e.br,{}),"\n",'tls.handshake.extensions_server_name contains "proxy"']}),"\n"]})]})}function d(n={}){const{wrapper:e}={...(0,o.R)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(u,{...n})}):u(n)}}}]);