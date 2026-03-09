import{b as a}from"./iframe-Ck3e-F9w.js";import"./stepper-CTUFtMcY.js";import"./preload-helper-C1FmrZbK.js";import"./ui-component-base-BJ0AM59x.js";import"./template-1VJuhrPW.js";import"./unsafe-html-7KbQsD9c.js";import"./validators-OS32PDZK.js";import"./theme-DBvyg58T.js";const p=[{title:"Account",description:"Create your account"},{title:"Profile",description:"Complete profile details"},{title:"Finish",description:"Review and submit"}],g={title:"Components/Stepper",tags:["autodocs"],argTypes:{active:{control:{type:"number",min:1,max:3,step:1}},orientation:{control:"select",options:["horizontal","vertical"]},size:{control:"select",options:["sm","md","lg"]}},args:{active:2,orientation:"horizontal",size:"md"}},t={render:({active:r,orientation:s,size:n})=>a`
    <ui-stepper .steps=${p} .active=${r} orientation=${s} size=${n}></ui-stepper>
  `};var e,o,i;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`{
  render: ({
    active,
    orientation,
    size
  }) => html\`
    <ui-stepper .steps=\${steps} .active=\${active} orientation=\${orientation} size=\${size}></ui-stepper>
  \`
}`,...(i=(o=t.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};const y=["Playground"];export{t as Playground,y as __namedExportsOrder,g as default};
