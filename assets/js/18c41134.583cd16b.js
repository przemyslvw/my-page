"use strict";(self.webpackChunkmy_page=self.webpackChunkmy_page||[]).push([[9262],{3591:(e,n,s)=>{s.r(n),s.d(n,{Highlight:()=>c,assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>d});const a=JSON.parse('{"id":"tutorial-basics/markdown-features","title":"Markdown Features","description":"Docusaurus supports Markdown and a few additional features.","source":"@site/docs/tutorial-basics/markdown-features.mdx","sourceDirName":"tutorial-basics","slug":"/tutorial-basics/markdown-features","permalink":"/docs/tutorial-basics/markdown-features","draft":false,"unlisted":false,"editUrl":"https://github.com/przemyslvw/my-page/edit/master/docs/tutorial-basics/markdown-features.mdx","tags":[],"version":"current","sidebarPosition":4,"frontMatter":{"sidebar_position":4},"sidebar":"tutorialSidebar","previous":{"title":"Create a Blog Post","permalink":"/docs/tutorial-basics/create-a-blog-post"},"next":{"title":"Deploy your site","permalink":"/docs/tutorial-basics/deploy-your-site"}}');var t=s(4848),r=s(8453);const o={sidebar_position:4},i="Markdown Features",l={},c=({children:e,color:n})=>(0,t.jsx)("span",{style:{backgroundColor:n,borderRadius:"20px",color:"#fff",padding:"10px",cursor:"pointer"},onClick:()=>{alert(`You clicked the color ${n} with label ${e}`)},children:e}),d=[{value:"Front Matter",id:"front-matter",level:2},{value:"Links",id:"links",level:2},{value:"Images",id:"images",level:2},{value:"Code Blocks",id:"code-blocks",level:2},{value:"Admonitions",id:"admonitions",level:2},{value:"MDX and React Components",id:"mdx-and-react-components",level:2}];function u(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",img:"img",p:"p",pre:"pre",strong:"strong",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"markdown-features",children:"Markdown Features"})}),"\n",(0,t.jsxs)(n.p,{children:["Docusaurus supports ",(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.a,{href:"https://daringfireball.net/projects/markdown/syntax",children:"Markdown"})})," and a few ",(0,t.jsx)(n.strong,{children:"additional features"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"front-matter",children:"Front Matter"}),"\n",(0,t.jsxs)(n.p,{children:["Markdown documents have metadata at the top called ",(0,t.jsx)(n.a,{href:"https://jekyllrb.com/docs/front-matter/",children:"Front Matter"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-text",metastring:'title="my-doc.md"',children:"// highlight-start\n---\nid: my-doc-id\ntitle: My document title\ndescription: My document description\nslug: /my-custom-url\n---\n// highlight-end\n\n## Markdown heading\n\nMarkdown text with [links](./hello.md)\n"})}),"\n",(0,t.jsx)(n.h2,{id:"links",children:"Links"}),"\n",(0,t.jsx)(n.p,{children:"Regular Markdown links are supported, using url paths or relative file paths."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-md",children:"Let's see how to [Create a page](/create-a-page).\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-md",children:"Let's see how to [Create a page](./create-a-page.md).\n"})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Result:"})," Let's see how to ",(0,t.jsx)(n.a,{href:"/docs/tutorial-basics/create-a-page",children:"Create a page"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"images",children:"Images"}),"\n",(0,t.jsx)(n.p,{children:"Regular Markdown images are supported."}),"\n",(0,t.jsxs)(n.p,{children:["You can use absolute paths to reference images in the static directory (",(0,t.jsx)(n.code,{children:"static/img/majdakonline.png"}),"):"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-md",children:"![Docusaurus logo](/img/majdakonline.png)\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"Docusaurus logo",src:s(9820).A+"",width:"243",height:"282"})}),"\n",(0,t.jsx)(n.p,{children:"You can reference images relative to the current file as well. This is particularly useful to colocate images close to the Markdown files using them:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-md",children:"![Docusaurus logo](./img/majdakonline.png)\n"})}),"\n",(0,t.jsx)(n.h2,{id:"code-blocks",children:"Code Blocks"}),"\n",(0,t.jsx)(n.p,{children:"Markdown code blocks are supported with Syntax highlighting."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-md",children:'```jsx title="src/components/HelloDocusaurus.js"\nfunction HelloDocusaurus() {\n  return <h1>Hello, Docusaurus!</h1>;\n}\n```\n'})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",metastring:'title="src/components/HelloDocusaurus.js"',children:"function HelloDocusaurus() {\n  return <h1>Hello, Docusaurus!</h1>;\n}\n"})}),"\n",(0,t.jsx)(n.h2,{id:"admonitions",children:"Admonitions"}),"\n",(0,t.jsx)(n.p,{children:"Docusaurus has a special syntax to create admonitions and callouts:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-md",children:":::tip[My tip]\n\nUse this awesome feature option\n\n:::\n\n:::danger[Take care]\n\nThis action is dangerous\n\n:::\n"})}),"\n",(0,t.jsx)(n.admonition,{title:"My tip",type:"tip",children:(0,t.jsx)(n.p,{children:"Use this awesome feature option"})}),"\n",(0,t.jsx)(n.admonition,{title:"Take care",type:"danger",children:(0,t.jsx)(n.p,{children:"This action is dangerous"})}),"\n",(0,t.jsx)(n.h2,{id:"mdx-and-react-components",children:"MDX and React Components"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.a,{href:"https://mdxjs.com/",children:"MDX"})," can make your documentation more ",(0,t.jsx)(n.strong,{children:"interactive"})," and allows using any ",(0,t.jsx)(n.strong,{children:"React components inside Markdown"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"export const Highlight = ({children, color}) => (\n  <span\n    style={{\n      backgroundColor: color,\n      borderRadius: '20px',\n      color: '#fff',\n      padding: '10px',\n      cursor: 'pointer',\n    }}\n    onClick={() => {\n      alert(`You clicked the color ${color} with label ${children}`)\n    }}>\n    {children}\n  </span>\n);\n\nThis is <Highlight color=\"#25c2a0\">Docusaurus green</Highlight> !\n\nThis is <Highlight color=\"#1877F2\">Facebook blue</Highlight> !\n"})}),"\n","\n",(0,t.jsxs)(n.p,{children:["This is ",(0,t.jsx)(c,{color:"#25c2a0",children:"Docusaurus green"})," !"]}),"\n",(0,t.jsxs)(n.p,{children:["This is ",(0,t.jsx)(c,{color:"#1877F2",children:"Facebook blue"})," !"]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(u,{...e})}):u(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>i});var a=s(6540);const t={},r=a.createContext(t);function o(e){const n=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),a.createElement(r.Provider,{value:n},e.children)}},9820:(e,n,s)=>{s.d(n,{A:()=>a});const a=s.p+"assets/images/majdakonline-b73948a3e838b7c75fb4e0ed2a85c34a.png"}}]);