"use strict";(self.webpackChunkmy_page=self.webpackChunkmy_page||[]).push([[5337],{28453:(e,i,o)=>{o.d(i,{R:()=>t,x:()=>s});var n=o(96540);const a={},r=n.createContext(a);function t(e){const i=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function s(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:t(e.components),n.createElement(r.Provider,{value:i},e.children)}},74506:e=>{e.exports=JSON.parse('{"permalink":"/blog/esp32-Tarlogic","editUrl":"https://github.com/przemyslvw/my-page/edit/master/blog/2025-03-09-podatnoscesp32/index.md","source":"@site/blog/2025-03-09-podatnoscesp32/index.md","title":"Tarlogic wykrywa ukryt\u0105 funkcj\u0119 w popularnym chipie ESP32, kt\xf3ra mo\u017ce zagrozi\u0107 milionom urz\u0105dze\u0144 IoT","description":"Wprowadzenie","date":"2025-03-09T00:00:00.000Z","tags":[{"inline":true,"label":"ESP32","permalink":"/blog/tags/esp-32"},{"inline":true,"label":"ESP-IDF","permalink":"/blog/tags/esp-idf"},{"inline":true,"label":"Arduino","permalink":"/blog/tags/arduino"},{"inline":true,"label":"PlatformIO","permalink":"/blog/tags/platform-io"},{"inline":true,"label":"MicroPython","permalink":"/blog/tags/micro-python"},{"inline":true,"label":"CircuitPython","permalink":"/blog/tags/circuit-python"},{"inline":true,"label":"ESPHome","permalink":"/blog/tags/esp-home"},{"inline":true,"label":"IoT","permalink":"/blog/tags/io-t"}],"readingTime":1.245,"hasTruncateMarker":false,"authors":[{"name":"Przemys\u0142aw Majdak","title":"Full-Stack Developer, Automation Engineer & Web Security Specialist","url":"https://www.majdak.online","bio":"In\u017cynier aplikacji internetowych, specjalista ds. automatyzacji test\xf3w i bezpiecze\u0144stwa IT.","socials":{"github":"https://github.com/przemyslvw","instagram":"https://www.instagram.com/przemas.ts","x":"https://x.com/przemyslvw","garmin":"https://connect.garmin.com/modern/profile/396bbbd1-edbd-4fd4-a780-132723eef739"},"imageURL":"https://avatars.githubusercontent.com/u/31745530?v=4","key":"przemyslvw","page":null}],"frontMatter":{"slug":"esp32-Tarlogic","title":"Tarlogic wykrywa ukryt\u0105 funkcj\u0119 w popularnym chipie ESP32, kt\xf3ra mo\u017ce zagrozi\u0107 milionom urz\u0105dze\u0144 IoT","authors":["przemyslvw"],"tags":["ESP32","ESP-IDF","Arduino","PlatformIO","MicroPython","CircuitPython","ESPHome","IoT"],"date":"2025-03-09T00:00:00.000Z"},"unlisted":false,"prevItem":{"title":"\ud83d\udd17 System Link 16 \u2013 Podstawy i Zastosowanie","permalink":"/blog/system-link-16"},"nextItem":{"title":"Systemy Walki Radioelektronicznej (REB)","permalink":"/blog/jamming-reb"}}')},79673:(e,i,o)=>{o.r(i),o.d(i,{assets:()=>c,contentTitle:()=>s,default:()=>p,frontMatter:()=>t,metadata:()=>n,toc:()=>l});var n=o(74506),a=o(74848),r=o(28453);const t={slug:"esp32-Tarlogic",title:"Tarlogic wykrywa ukryt\u0105 funkcj\u0119 w popularnym chipie ESP32, kt\xf3ra mo\u017ce zagrozi\u0107 milionom urz\u0105dze\u0144 IoT",authors:["przemyslvw"],tags:["ESP32","ESP-IDF","Arduino","PlatformIO","MicroPython","CircuitPython","ESPHome","IoT"],date:new Date("2025-03-09T00:00:00.000Z")},s="Tarlogic wykrywa ukryt\u0105 funkcj\u0119 w popularnym chipie ESP32, kt\xf3ra mo\u017ce zagrozi\u0107 milionom urz\u0105dze\u0144 IoT",c={authorsImageUrls:[void 0]},l=[{value:"Wprowadzenie",id:"wprowadzenie",level:2},{value:"Czym jest ESP32?",id:"czym-jest-esp32",level:2},{value:"Odkrycie Tarlogic",id:"odkrycie-tarlogic",level:2},{value:"Potencjalne zagro\u017cenia",id:"potencjalne-zagro\u017cenia",level:2},{value:"Reakcja spo\u0142eczno\u015bci i producenta",id:"reakcja-spo\u0142eczno\u015bci-i-producenta",level:2},{value:"Wnioski",id:"wnioski",level:2}];function d(e){const i={h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i.h2,{id:"wprowadzenie",children:"Wprowadzenie"}),"\n",(0,a.jsx)(i.p,{children:"Zesp\xf3\u0142 badawczy z firmy Tarlogic Security odkry\u0142 nieudokumentowan\u0105 funkcj\u0119 w mikrokontrolerze ESP32, szeroko stosowanym w urz\u0105dzeniach IoT. To odkrycie rodzi powa\u017cne obawy dotycz\u0105ce bezpiecze\u0144stwa milion\xf3w urz\u0105dze\u0144 na ca\u0142ym \u015bwiecie. \uea015\uea02"}),"\n",(0,a.jsx)(i.h2,{id:"czym-jest-esp32",children:"Czym jest ESP32?"}),"\n",(0,a.jsx)(i.p,{children:"ESP32 to seria niskokosztowych, energooszcz\u0119dnych mikrokontroler\xf3w z wbudowanym Wi-Fi i Bluetooth, opracowanych przez chi\u0144sk\u0105 firm\u0119 Espressif Systems. Od momentu wprowadzenia na rynek w 2016 roku, ESP32 znalaz\u0142 zastosowanie w szerokiej gamie urz\u0105dze\u0144, od inteligentnych dom\xf3w po sprz\u0119t medyczny. \uea0113\uea02"}),"\n",(0,a.jsx)(i.h2,{id:"odkrycie-tarlogic",children:"Odkrycie Tarlogic"}),"\n",(0,a.jsx)(i.p,{children:"Podczas konferencji RootedCON 2025, badacze z Tarlogic przedstawili wyniki swoich bada\u0144 nad ESP32. Odkryli oni nieudokumentowane komendy w firmware Bluetooth tego chipu, kt\xf3re mog\u0105 umo\u017cliwi\u0107 atakuj\u0105cym przej\u0119cie kontroli nad urz\u0105dzeniami, modyfikacj\u0119 pami\u0119ci oraz podszywanie si\u0119 pod inne urz\u0105dzenia Bluetooth. \uea0121\uea02"}),"\n",(0,a.jsx)(i.h2,{id:"potencjalne-zagro\u017cenia",children:"Potencjalne zagro\u017cenia"}),"\n",(0,a.jsx)(i.p,{children:"Wykorzystanie tych ukrytych funkcji stwarza szereg zagro\u017ce\u0144:\uea0125\uea02"}),"\n",(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsxs)(i.li,{children:["\n",(0,a.jsxs)(i.p,{children:[(0,a.jsx)(i.strong,{children:"Ataki typu impersonation"}),": Atakuj\u0105cy mog\u0105 podszywa\u0107 si\u0119 pod zaufane urz\u0105dzenia, uzyskuj\u0105c nieautoryzowany dost\u0119p do system\xf3w.\uea0129\uea02"]}),"\n"]}),"\n",(0,a.jsxs)(i.li,{children:["\n",(0,a.jsxs)(i.p,{children:[(0,a.jsx)(i.strong,{children:"Trwa\u0142e infekcje"}),": Mo\u017cliwo\u015b\u0107 modyfikacji pami\u0119ci pozwala na wprowadzenie z\u0142o\u015bliwego kodu, kt\xf3ry przetrwa restart urz\u0105dzenia.\uea0133\uea02"]}),"\n"]}),"\n",(0,a.jsxs)(i.li,{children:["\n",(0,a.jsxs)(i.p,{children:[(0,a.jsx)(i.strong,{children:"Ataki na \u0142a\u0144cuch dostaw"}),": Ukryte komendy mog\u0105 by\u0107 wykorzystane do wprowadzenia backdoor\xf3w na etapie produkcji, co stanowi zagro\u017cenie dla ca\u0142ego ekosystemu IoT. \uea0138\uea02"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(i.h2,{id:"reakcja-spo\u0142eczno\u015bci-i-producenta",children:"Reakcja spo\u0142eczno\u015bci i producenta"}),"\n",(0,a.jsx)(i.p,{children:"Odkrycie Tarlogic spotka\u0142o si\u0119 z szerokim echem w spo\u0142eczno\u015bci bezpiecze\u0144stwa. Jednak do tej pory producent ESP32, firma Espressif Systems, nie wyda\u0142a oficjalnego o\u015bwiadczenia w tej sprawie. \uea0146\uea02"}),"\n",(0,a.jsx)(i.h2,{id:"wnioski",children:"Wnioski"}),"\n",(0,a.jsx)(i.p,{children:"Odkrycie ukrytej funkcji w chipie ESP32 podkre\u015bla potrzeb\u0119 ci\u0105g\u0142ego monitorowania i audytu bezpiecze\u0144stwa urz\u0105dze\u0144 IoT. U\u017cytkownicy i producenci powinni by\u0107 \u015bwiadomi potencjalnych zagro\u017ce\u0144 i podejmowa\u0107 odpowiednie \u015brodki w celu zabezpieczenia swoich urz\u0105dze\u0144.\uea0153\uea02"})]})}function p(e={}){const{wrapper:i}={...(0,r.R)(),...e.components};return i?(0,a.jsx)(i,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}}}]);