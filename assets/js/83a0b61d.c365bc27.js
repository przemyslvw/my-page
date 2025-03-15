"use strict";(self.webpackChunkmy_page=self.webpackChunkmy_page||[]).push([[9868],{28058:(n,a,e)=>{e.r(a),e.d(a,{assets:()=>c,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"kurswireshark/10/06","title":"Automatyzacja monitorowania i reagowania","description":"Korzystanie z narz\u0119dzi IDS/IPS (np. Suricata, Snort) do automatycznej analizy pakiet\xf3w*","source":"@site/docs/kurswireshark/10/06.md","sourceDirName":"kurswireshark/10","slug":"/kurswireshark/10/06","permalink":"/docs/kurswireshark/10/06","draft":false,"unlisted":false,"editUrl":"https://github.com/przemyslvw/my-page/edit/master/docs/kurswireshark/10/06.md","tags":[],"version":"current","sidebarPosition":6,"frontMatter":{"sidebar_position":6},"sidebar":"tutorialSidebar","previous":{"title":"Przyk\u0142ady szybkiego reagowania na incydenty","permalink":"/docs/kurswireshark/10/05"},"next":{"title":"Dokumentowanie Analizy Sieci i Raportowanie Wynik\xf3w","permalink":"/docs/category/dokumentowanie-analizy-sieci-i-raportowanie-wynik\xf3w"}}');var r=e(74848),t=e(28453);const o={sidebar_position:6},s="Automatyzacja monitorowania i reagowania",c={},d=[{value:"<strong>Podsumowanie</strong>",id:"podsumowanie-7",level:3}];function l(n){const a={br:"br",h1:"h1",h3:"h3",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.R)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a.header,{children:(0,r.jsx)(a.h1,{id:"automatyzacja-monitorowania-i-reagowania",children:"Automatyzacja monitorowania i reagowania"})}),"\n",(0,r.jsxs)(a.ul,{children:["\n",(0,r.jsx)(a.li,{children:(0,r.jsx)(a.strong,{children:"Korzystanie z narz\u0119dzi IDS/IPS (np. Suricata, Snort) do automatycznej analizy pakiet\xf3w"})}),"\n",(0,r.jsxs)(a.li,{children:[(0,r.jsx)(a.strong,{children:"Tworzenie skrypt\xf3w do monitorowania ruchu za pomoc\u0105 Tshark"}),":",(0,r.jsx)(a.br,{}),"\n",'tshark -i eth0 -Y "tcp.flags.syn == 1 and tcp.flags.ack == 0" -w scan_alert.pcap']}),"\n",(0,r.jsx)(a.li,{children:(0,r.jsx)(a.strong,{children:"Integracja z SIEM (Security Information and Event Management) do analizy log\xf3w"})}),"\n"]}),"\n",(0,r.jsx)(a.h3,{id:"podsumowanie-7",children:(0,r.jsx)(a.strong,{children:"Podsumowanie"})}),"\n",(0,r.jsx)(a.p,{children:"Efektywne monitorowanie i reagowanie na incydenty w Wireshark pozwala na minimalizacj\u0119 ryzyka i szybsz\u0105 detekcj\u0119 zagro\u017ce\u0144. W kolejnym rozdziale om\xf3wimy metody dokumentowania analizy sieci i raportowania wynik\xf3w!"})]})}function u(n={}){const{wrapper:a}={...(0,t.R)(),...n.components};return a?(0,r.jsx)(a,{...n,children:(0,r.jsx)(l,{...n})}):l(n)}},28453:(n,a,e)=>{e.d(a,{R:()=>o,x:()=>s});var i=e(96540);const r={},t=i.createContext(r);function o(n){const a=i.useContext(t);return i.useMemo((function(){return"function"==typeof n?n(a):{...a,...n}}),[a,n])}function s(n){let a;return a=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:o(n.components),i.createElement(t.Provider,{value:a},n.children)}}}]);