"use strict";(self.webpackChunkmy_page=self.webpackChunkmy_page||[]).push([[5795],{28453:(e,r,n)=>{n.d(r,{R:()=>o,x:()=>a});var i=n(96540);const t={},s=i.createContext(t);function o(e){const r=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function a(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),i.createElement(s.Provider,{value:r},e.children)}},63531:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>c,contentTitle:()=>a,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"kurswireshark/10/03","title":"Tworzenie efektywnych filtr\xf3w w Wireshark","description":"Dobrze skonfigurowane filtry pozwalaj\u0105 szybciej wykrywa\u0107 anomalie i podejrzane aktywno\u015bci:","source":"@site/docs/kurswireshark/10/03.md","sourceDirName":"kurswireshark/10","slug":"/kurswireshark/10/03","permalink":"/docs/kurswireshark/10/03","draft":false,"unlisted":false,"editUrl":"https://github.com/przemyslvw/my-page/edit/master/docs/kurswireshark/10/03.md","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"sidebar_position":3},"sidebar":"tutorialSidebar","previous":{"title":"Strategie efektywnego monitorowania ruchu sieciowego","permalink":"/docs/kurswireshark/10/02"},"next":{"title":"Reagowanie na incydenty wykryte w Wireshark","permalink":"/docs/kurswireshark/10/04"}}');var t=n(74848),s=n(28453);const o={sidebar_position:3},a="Tworzenie efektywnych filtr\xf3w w Wireshark",c={},l=[];function w(e){const r={br:"br",h1:"h1",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.header,{children:(0,t.jsx)(r.h1,{id:"tworzenie-efektywnych-filtr\xf3w-w-wireshark",children:"Tworzenie efektywnych filtr\xf3w w Wireshark"})}),"\n",(0,t.jsx)(r.p,{children:"Dobrze skonfigurowane filtry pozwalaj\u0105 szybciej wykrywa\u0107 anomalie i podejrzane aktywno\u015bci:"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.strong,{children:"Filtrowanie ruchu na danym porcie"})," (np. SSH na porcie 22):",(0,t.jsx)(r.br,{}),"\n","tcp.port == 22"]}),"\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.strong,{children:"Wykrywanie pakiet\xf3w z nieznanych \u017ar\xf3de\u0142:"}),(0,t.jsx)(r.br,{}),"\n","ip.src != 192.168.1.0/24"]}),"\n",(0,t.jsxs)(r.li,{children:[(0,t.jsx)(r.strong,{children:"Filtrowanie du\u017cych pakiet\xf3w (np. DDoS flood):"}),(0,t.jsx)(r.br,{}),"\n","frame.len > 1500"]}),"\n"]})]})}function d(e={}){const{wrapper:r}={...(0,s.R)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(w,{...e})}):w(e)}}}]);