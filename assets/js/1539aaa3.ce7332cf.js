"use strict";(self.webpackChunkmy_page=self.webpackChunkmy_page||[]).push([[1479],{1197:(e,r,s)=>{s.r(r),s.d(r,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>n,metadata:()=>a,toc:()=>h});const a=JSON.parse('{"id":"kurswireshark/08/02","title":"Po\u0142\u0105czenie Wiresharka z Tshark","description":"Tshark to linuksowa wersja Wiresharka dzia\u0142aj\u0105ca w trybie tekstowym. Umo\u017cliwia analiz\u0119 ruchu sieciowego bez potrzeby korzystania z interfejsu graficznego.","source":"@site/docs/kurswireshark/08/02.md","sourceDirName":"kurswireshark/08","slug":"/kurswireshark/08/02","permalink":"/docs/kurswireshark/08/02","draft":false,"unlisted":false,"editUrl":"https://github.com/przemyslvw/my-page/edit/master/docs/kurswireshark/08/02.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2},"sidebar":"tutorialSidebar","previous":{"title":"Wprowadzenie do integracji narz\u0119dzi","permalink":"/docs/kurswireshark/08/01"},"next":{"title":"Integracja Wiresharka z Zeek (dawniej Bro)","permalink":"/docs/kurswireshark/08/03"}}');var i=s(4848),t=s(8453);const n={sidebar_position:2},o="Po\u0142\u0105czenie Wiresharka z Tshark",c={},h=[{value:"<strong>Przyk\u0142ady u\u017cycia Tsharka:</strong>",id:"przyk\u0142ady-u\u017cycia-tsharka:",level:4}];function k(e){const r={br:"br",h1:"h1",h4:"h4",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.header,{children:(0,i.jsx)(r.h1,{id:"po\u0142\u0105czenie-wiresharka-z-tshark",children:"Po\u0142\u0105czenie Wiresharka z Tshark"})}),"\n",(0,i.jsx)(r.p,{children:"Tshark to linuksowa wersja Wiresharka dzia\u0142aj\u0105ca w trybie tekstowym. Umo\u017cliwia analiz\u0119 ruchu sieciowego bez potrzeby korzystania z interfejsu graficznego."}),"\n",(0,i.jsx)(r.h4,{id:"przyk\u0142ady-u\u017cycia-tsharka:",children:(0,i.jsx)(r.strong,{children:"Przyk\u0142ady u\u017cycia Tsharka:"})}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.strong,{children:"Przechwycenie pakiet\xf3w na danym interfejsie:"}),(0,i.jsx)(r.br,{}),"\n","tshark -i eth0 -w capture.pcap"]}),"\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.strong,{children:"Filtrowanie pakiet\xf3w w czasie rzeczywistym:"}),(0,i.jsx)(r.br,{}),"\n",'tshark -i eth0 -Y "http.request"']}),"\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.strong,{children:"Analiza zapisanych pakiet\xf3w:"}),(0,i.jsx)(r.br,{}),"\n",'tshark -r capture.pcap -Y "tcp.flags.syn == 1"']}),"\n"]})]})}function d(e={}){const{wrapper:r}={...(0,t.R)(),...e.components};return r?(0,i.jsx)(r,{...e,children:(0,i.jsx)(k,{...e})}):k(e)}},8453:(e,r,s)=>{s.d(r,{R:()=>n,x:()=>o});var a=s(6540);const i={},t=a.createContext(i);function n(e){const r=a.useContext(t);return a.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function o(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:n(e.components),a.createElement(t.Provider,{value:r},e.children)}}}]);