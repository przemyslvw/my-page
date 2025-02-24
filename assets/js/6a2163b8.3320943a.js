"use strict";(self.webpackChunkmy_page=self.webpackChunkmy_page||[]).push([[2932],{5557:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>t,contentTitle:()=>l,default:()=>z,frontMatter:()=>r,metadata:()=>a,toc:()=>c});var a=n(8755),s=n(4848),o=n(8453);const r={slug:"/kurs-pihole",title:"Kompleksowy przewodnik po Pi-hole!",authors:["przemyslvw"],tags:["pihole","ochrona-sieci","bezpiecze\u0144stwo","sie\u0107","poradnik"],date:new Date("2024-10-10T00:00:00.000Z")},l="\ud83d\ude80 Kompletny kurs Pi-hole \u2013 Zadbaj o czyst\u0105 i bezpieczn\u0105 sie\u0107!",t={authorsImageUrls:[void 0]},c=[{value:"\u2705 <strong>Dlaczego warto skorzysta\u0107 z kursu?</strong>",id:"-dlaczego-warto-skorzysta\u0107-z-kursu",level:2},{value:"\ud83d\udcd6 <strong>Co znajdziesz w kursie?</strong>",id:"-co-znajdziesz-w-kursie",level:2},{value:"\ud83d\udcd8 Wprowadzenie",id:"-wprowadzenie",level:3},{value:"\ud83d\udee0\ufe0f Przygotowanie \u015brodowiska",id:"\ufe0f-przygotowanie-\u015brodowiska",level:3},{value:"\u26a1 Instalacja Pi-hole",id:"-instalacja-pi-hole",level:3},{value:"\ud83c\udf10 Konfiguracja sieci",id:"-konfiguracja-sieci",level:3},{value:"\ud83d\udd0d Zarz\u0105dzanie i monitorowanie",id:"-zarz\u0105dzanie-i-monitorowanie",level:3},{value:"\ud83d\udd12 Zabezpieczenia i optymalizacja",id:"-zabezpieczenia-i-optymalizacja",level:3},{value:"\ud83d\udcca Zaawansowane funkcje",id:"-zaawansowane-funkcje",level:3},{value:"\ud83e\uddd1\u200d\ud83d\udcbb Rozwi\u0105zywanie problem\xf3w",id:"-rozwi\u0105zywanie-problem\xf3w",level:3},{value:"\ud83d\udca1 Scenariusze zastosowania",id:"-scenariusze-zastosowania",level:3},{value:"\ud83d\udcc1 Za\u0142\u0105czniki",id:"-za\u0142\u0105czniki",level:3},{value:"\ud83d\udca5 <strong>Gotowy, aby przej\u0105\u0107 kontrol\u0119 nad swoj\u0105 sieci\u0105?</strong>",id:"-gotowy-aby-przej\u0105\u0107-kontrol\u0119-nad-swoj\u0105-sieci\u0105",level:2}];function d(e){const i={a:"a",br:"br",em:"em",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(i.p,{children:["Chcesz pozby\u0107 si\u0119 reklam z ca\u0142ej sieci, zwi\u0119kszy\u0107 prywatno\u015b\u0107 i zabezpieczy\u0107 domow\u0105 lub firmow\u0105 infrastruktur\u0119? \ud83d\udca1",(0,s.jsx)(i.br,{}),"\n","Nasz ",(0,s.jsx)(i.strong,{children:"kompleksowy kurs Pi-hole"})," jest w\u0142a\u015bnie dla Ciebie! \ud83c\udf89"]}),"\n",(0,s.jsxs)(i.h2,{id:"-dlaczego-warto-skorzysta\u0107-z-kursu",children:["\u2705 ",(0,s.jsx)(i.strong,{children:"Dlaczego warto skorzysta\u0107 z kursu?"})]}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:["\ud83d\udd25 ",(0,s.jsx)(i.strong,{children:"Proste instrukcje krok po kroku"})," \u2013 nawet je\u015bli jeste\u015b pocz\u0105tkuj\u0105cy, poradzisz sobie bez problemu."]}),"\n",(0,s.jsxs)(i.li,{children:["\ud83d\udee1\ufe0f ",(0,s.jsx)(i.strong,{children:"Blokowanie reklam i tracker\xf3w"})," \u2013 koniec z nachalnymi banerami na wszystkich urz\u0105dzeniach."]}),"\n",(0,s.jsxs)(i.li,{children:["\ud83c\udf10 ",(0,s.jsx)(i.strong,{children:"Skalowalno\u015b\u0107"})," \u2013 sprawdza si\u0119 zar\xf3wno w domowej sieci, jak i w ma\u0142ych firmach."]}),"\n",(0,s.jsxs)(i.li,{children:["\ud83d\udcca ",(0,s.jsx)(i.strong,{children:"Analiza i monitorowanie sieci"})," \u2013 sprawd\u017a, kto generuje najwi\u0119cej ruchu i jakie strony s\u0105 najcz\u0119\u015bciej odwiedzane."]}),"\n",(0,s.jsxs)(i.li,{children:["\ud83e\uddf0 ",(0,s.jsx)(i.strong,{children:"Zaawansowane funkcje"})," \u2013 VPN z WireGuard, w\u0142asne listy blokuj\u0105ce czy lokalny resolver DNS z Unbound."]}),"\n"]}),"\n",(0,s.jsx)(i.hr,{}),"\n",(0,s.jsxs)(i.h2,{id:"-co-znajdziesz-w-kursie",children:["\ud83d\udcd6 ",(0,s.jsx)(i.strong,{children:"Co znajdziesz w kursie?"})]}),"\n",(0,s.jsx)(i.h3,{id:"-wprowadzenie",children:"\ud83d\udcd8 Wprowadzenie"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Czym jest Pi-hole i dlaczego warto go u\u017cywa\u0107?"}),"\n",(0,s.jsx)(i.li,{children:"Wymagania sprz\u0119towe i podstawy dzia\u0142ania."}),"\n"]}),"\n",(0,s.jsx)(i.h3,{id:"\ufe0f-przygotowanie-\u015brodowiska",children:"\ud83d\udee0\ufe0f Przygotowanie \u015brodowiska"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Konfiguracja Raspberry Pi lub innego serwera."}),"\n",(0,s.jsx)(i.li,{children:"Przygotowanie systemu i ustawienia sieciowe."}),"\n"]}),"\n",(0,s.jsx)(i.h3,{id:"-instalacja-pi-hole",children:"\u26a1 Instalacja Pi-hole"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Pe\u0142na instrukcja krok po kroku."}),"\n",(0,s.jsx)(i.li,{children:"Konfiguracja interfejsu webowego i ustawienie statycznego IP."}),"\n"]}),"\n",(0,s.jsx)(i.h3,{id:"-konfiguracja-sieci",children:"\ud83c\udf10 Konfiguracja sieci"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Ustawienie Pi-hole jako g\u0142\xf3wnego DNS."}),"\n",(0,s.jsx)(i.li,{children:"Konfiguracja DHCP i zarz\u0105dzanie urz\u0105dzeniami w sieci."}),"\n"]}),"\n",(0,s.jsx)(i.h3,{id:"-zarz\u0105dzanie-i-monitorowanie",children:"\ud83d\udd0d Zarz\u0105dzanie i monitorowanie"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Przegl\u0105d interfejsu."}),"\n",(0,s.jsx)(i.li,{children:"Analiza statystyk i log\xf3w DNS."}),"\n",(0,s.jsx)(i.li,{children:"Optymalizacja list blokuj\u0105cych."}),"\n"]}),"\n",(0,s.jsx)(i.h3,{id:"-zabezpieczenia-i-optymalizacja",children:"\ud83d\udd12 Zabezpieczenia i optymalizacja"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Konfiguracja zapory sieciowej."}),"\n",(0,s.jsx)(i.li,{children:"Blokowanie z\u0142o\u015bliwych domen."}),"\n",(0,s.jsx)(i.li,{children:"Ustawienia prywatno\u015bci."}),"\n"]}),"\n",(0,s.jsx)(i.h3,{id:"-zaawansowane-funkcje",children:"\ud83d\udcca Zaawansowane funkcje"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Integracja z Unbound."}),"\n",(0,s.jsx)(i.li,{children:"VPN z WireGuard."}),"\n",(0,s.jsx)(i.li,{children:"W\u0142asne czarne i bia\u0142e listy domen."}),"\n"]}),"\n",(0,s.jsx)(i.h3,{id:"-rozwi\u0105zywanie-problem\xf3w",children:"\ud83e\uddd1\u200d\ud83d\udcbb Rozwi\u0105zywanie problem\xf3w"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Najcz\u0119stsze b\u0142\u0119dy i sposoby ich naprawy."}),"\n",(0,s.jsx)(i.li,{children:"Analiza log\xf3w i przywracanie ustawie\u0144."}),"\n"]}),"\n",(0,s.jsx)(i.h3,{id:"-scenariusze-zastosowania",children:"\ud83d\udca1 Scenariusze zastosowania"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"Pi-hole w sieci domowej."}),"\n",(0,s.jsx)(i.li,{children:"Wykorzystanie w ma\u0142ych firmach."}),"\n",(0,s.jsx)(i.li,{children:"Zabezpieczenie urz\u0105dze\u0144 mobilnych i Smart TV."}),"\n"]}),"\n",(0,s.jsx)(i.h3,{id:"-za\u0142\u0105czniki",children:"\ud83d\udcc1 Za\u0142\u0105czniki"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:["Przydatne listy blokuj\u0105ce z ",(0,s.jsx)(i.a,{href:"https://firebog.net/",children:"Firebog"}),"."]}),"\n",(0,s.jsx)(i.li,{children:"S\u0142ownik poj\u0119\u0107."}),"\n",(0,s.jsx)(i.li,{children:"Narz\u0119dzia do analizy sieci."}),"\n"]}),"\n",(0,s.jsx)(i.hr,{}),"\n",(0,s.jsxs)(i.h2,{id:"-gotowy-aby-przej\u0105\u0107-kontrol\u0119-nad-swoj\u0105-sieci\u0105",children:["\ud83d\udca5 ",(0,s.jsx)(i.strong,{children:"Gotowy, aby przej\u0105\u0107 kontrol\u0119 nad swoj\u0105 sieci\u0105?"})]}),"\n",(0,s.jsxs)(i.p,{children:["Kliknij poni\u017cej, aby rozpocz\u0105\u0107 kurs i dowiedzie\u0107 si\u0119, jak ",(0,s.jsx)(i.strong,{children:"Pi-hole"})," mo\u017ce zmieni\u0107 spos\xf3b, w jaki korzystasz z Internetu! \ud83d\ude80"]}),"\n",(0,s.jsxs)(i.p,{children:["\ud83d\udc49 ",(0,s.jsx)(i.a,{href:"/docs/category/kurs-pihole",children:(0,s.jsx)(i.strong,{children:"Rozpocznij kurs Pi-hole teraz!"})})]}),"\n",(0,s.jsx)(i.hr,{}),"\n",(0,s.jsxs)(i.p,{children:["\ud83d\udce2 ",(0,s.jsx)(i.strong,{children:"Podziel si\u0119 swoj\u0105 opini\u0105!"})," Je\u015bli masz pytania lub chcesz podzieli\u0107 si\u0119 swoj\u0105 konfiguracj\u0105, zostaw komentarz pod postem. \ud83d\udcac"]}),"\n",(0,s.jsx)(i.p,{children:"#PiHole #Bezpiecze\u0144stwo #BlokowanieReklam #DNS #Sie\u0107 #OpenSource #Poradnik"}),"\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.strong,{children:"Autor:"})," ",(0,s.jsx)(i.em,{children:"Przemys\u0142aw Majdak"}),(0,s.jsx)(i.br,{}),"\n",(0,s.jsx)(i.strong,{children:"Data publikacji:"})," 10 pa\u017adziernik 2024"]})]})}function z(e={}){const{wrapper:i}={...(0,o.R)(),...e.components};return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,i,n)=>{n.d(i,{R:()=>r,x:()=>l});var a=n(6540);const s={},o=a.createContext(s);function r(e){const i=a.useContext(o);return a.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function l(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),a.createElement(o.Provider,{value:i},e.children)}},8755:e=>{e.exports=JSON.parse('{"permalink":"/blog/kurs-pihole","editUrl":"https://github.com/przemyslvw/my-page/edit/master/blog/2025-02-20-kurspihole/index.md","source":"@site/blog/2025-02-20-kurspihole/index.md","title":"Kompleksowy przewodnik po Pi-hole!","description":"Chcesz pozby\u0107 si\u0119 reklam z ca\u0142ej sieci, zwi\u0119kszy\u0107 prywatno\u015b\u0107 i zabezpieczy\u0107 domow\u0105 lub firmow\u0105 infrastruktur\u0119? \ud83d\udca1","date":"2024-10-10T00:00:00.000Z","tags":[{"inline":false,"label":"Pi-hole","permalink":"/blog/tags/pihole","description":"Blokowanie reklam i ochrona sieci przy u\u017cyciu Pi-hole."},{"inline":false,"label":"Ochrona Sieci","permalink":"/blog/tags/ochrona-sieci","description":"Techniki i narz\u0119dzia ochrony sieci komputerowych."},{"inline":true,"label":"bezpiecze\u0144stwo","permalink":"/blog/tags/bezpieczenstwo"},{"inline":true,"label":"sie\u0107","permalink":"/blog/tags/siec"},{"inline":true,"label":"poradnik","permalink":"/blog/tags/poradnik"}],"readingTime":1.85,"hasTruncateMarker":true,"authors":[{"name":"Przemys\u0142aw Majdak","title":"Full-Stack Developer, Automation Engineer & Web Security Specialist","url":"https://www.majdak.online","bio":"In\u017cynier aplikacji internetowych, specjalista ds. automatyzacji test\xf3w i bezpiecze\u0144stwa IT.","socials":{"x":"https://x.com/przemyslvw","github":"https://github.com/przemyslvw","instagram":"https://www.instagram.com/przemas.ts","garmin":"https://connect.garmin.com/modern/profile/396bbbd1-edbd-4fd4-a780-132723eef739"},"imageURL":"https://avatars.githubusercontent.com/u/31745530?v=4","key":"przemyslvw","page":null}],"frontMatter":{"slug":"/kurs-pihole","title":"Kompleksowy przewodnik po Pi-hole!","authors":["przemyslvw"],"tags":["pihole","ochrona-sieci","bezpiecze\u0144stwo","sie\u0107","poradnik"],"date":"2024-10-10T00:00:00.000Z"},"unlisted":false,"prevItem":{"title":"Do\u0142\u0105czyli\u015bmy do ISSA Polska!","permalink":"/blog/do\u0142\u0105czamy-do-issa-polska"},"nextItem":{"title":"Podatno\u015b\u0107 na jamming w kamerach Xiaomi","permalink":"/blog/podatno\u015b\u0107-na-jamming-w-kamerach-xiaomi"}}')}}]);