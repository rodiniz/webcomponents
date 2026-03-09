import{b as p}from"./iframe-Ck3e-F9w.js";import"./pagination-DWUZQ7bE.js";import"./preload-helper-C1FmrZbK.js";import"./ui-component-base-BJ0AM59x.js";import"./template-1VJuhrPW.js";import"./unsafe-html-7KbQsD9c.js";import"./theme-DBvyg58T.js";const P={title:"Components/Pagination",tags:["autodocs"],argTypes:{total:{control:{type:"number",min:0,step:1}},currentPage:{control:{type:"number",min:1,step:1}},pageSize:{control:{type:"number",min:1,step:1}}},args:{total:137,currentPage:1,pageSize:10}},e={render:({total:a,currentPage:o,pageSize:i})=>p`
    <ui-pagination
      .total=${a}
      .currentPage=${o}
      .pageSize=${i}
    ></ui-pagination>
  `};var t,r,n;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: ({
    total,
    currentPage,
    pageSize
  }) => html\`
    <ui-pagination
      .total=\${total}
      .currentPage=\${currentPage}
      .pageSize=\${pageSize}
    ></ui-pagination>
  \`
}`,...(n=(r=e.parameters)==null?void 0:r.docs)==null?void 0:n.source}}};const S=["Playground"];export{e as Playground,S as __namedExportsOrder,P as default};
