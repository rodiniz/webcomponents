import{b as t}from"./iframe-Ck3e-F9w.js";import"./tooltip-CsDM52S5.js";import"./preload-helper-C1FmrZbK.js";import"./ui-component-base-BJ0AM59x.js";import"./state-CVS5rq8K.js";import"./template-1VJuhrPW.js";import"./unsafe-html-7KbQsD9c.js";import"./validators-OS32PDZK.js";import"./theme-DBvyg58T.js";const z={title:"Components/Tooltip",tags:["autodocs"],argTypes:{text:{control:"text",description:"Tooltip text content"},position:{control:"select",options:["top","bottom","left","right"],description:"Tooltip position relative to trigger"},trigger:{control:"select",options:["hover","click"],description:"How to trigger the tooltip"},disabled:{control:"boolean",description:"Disable the tooltip"}},args:{text:"This is a tooltip",position:"top",trigger:"hover",disabled:!1}},i={render:({text:$,position:j,trigger:S,disabled:D})=>t`
    <div style="padding: 2rem; display: flex; justify-content: center; align-items: center;">
      <div style="position: relative;">
        <ui-button variant="primary">Hover me</ui-button>
        <ui-tooltip
          text=${$}
          position=${j}
          trigger=${S}
          ?disabled=${D}
        ></ui-tooltip>
      </div>
    </div>
  `},o={render:()=>t`
    <div style="padding: 2rem; display: grid; grid-template-columns: repeat(2, 1fr); gap: 4rem; justify-items: center; align-items: center;">
      <div style="position: relative;">
        <ui-button variant="primary">Top</ui-button>
        <ui-tooltip text="Tooltip on top" position="top" trigger="hover"></ui-tooltip>
      </div>
      <div style="position: relative;">
        <ui-button variant="primary">Bottom</ui-button>
        <ui-tooltip text="Tooltip on bottom" position="bottom" trigger="hover"></ui-tooltip>
      </div>
      <div style="position: relative;">
        <ui-button variant="primary">Left</ui-button>
        <ui-tooltip text="Tooltip on left" position="left" trigger="hover"></ui-tooltip>
      </div>
      <div style="position: relative;">
        <ui-button variant="primary">Right</ui-button>
        <ui-tooltip text="Tooltip on right" position="right" trigger="hover"></ui-tooltip>
      </div>
    </div>
  `},e={render:()=>t`
    <div style="padding: 2rem; text-align: center;">
      <p style="margin-bottom: 1rem; color: gray;">Hover over the button to see the tooltip</p>
      <div style="position: relative; display: inline-block;">
        <ui-button variant="secondary">Hover Trigger</ui-button>
        <ui-tooltip text="This tooltip appears on hover" position="top" trigger="hover"></ui-tooltip>
      </div>
    </div>
  `},r={render:()=>t`
    <div style="padding: 2rem; text-align: center;">
      <p style="margin-bottom: 1rem; color: gray;">Click the button to toggle the tooltip</p>
      <div style="position: relative; display: inline-block;">
        <ui-button variant="secondary">Click Trigger</ui-button>
        <ui-tooltip text="This tooltip appears on click" position="top" trigger="click"></ui-tooltip>
      </div>
    </div>
  `},n={render:()=>t`
    <div style="padding: 2rem; text-align: center;">
      <p style="margin-bottom: 1rem; color: gray;">Tooltip is disabled</p>
      <div style="position: relative; display: inline-block;">
        <ui-button variant="secondary" disabled>Disabled</ui-button>
        <ui-tooltip text="This tooltip is disabled" position="top" trigger="hover" disabled></ui-tooltip>
      </div>
    </div>
  `},l={render:()=>t`
    <div style="padding: 2rem; display: flex; justify-content: center; align-items: center;">
      <div style="position: relative;">
        <ui-button variant="primary">Hover for info</ui-button>
        <ui-tooltip
          text="This is a longer tooltip with more detailed information about the action"
          position="top"
          trigger="hover"
        ></ui-tooltip>
      </div>
    </div>
  `};var s,a,p;i.parameters={...i.parameters,docs:{...(s=i.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: ({
    text,
    position,
    trigger,
    disabled
  }) => html\`
    <div style="padding: 2rem; display: flex; justify-content: center; align-items: center;">
      <div style="position: relative;">
        <ui-button variant="primary">Hover me</ui-button>
        <ui-tooltip
          text=\${text}
          position=\${position}
          trigger=\${trigger}
          ?disabled=\${disabled}
        ></ui-tooltip>
      </div>
    </div>
  \`
}`,...(p=(a=i.parameters)==null?void 0:a.docs)==null?void 0:p.source}}};var d,u,g;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => html\`
    <div style="padding: 2rem; display: grid; grid-template-columns: repeat(2, 1fr); gap: 4rem; justify-items: center; align-items: center;">
      <div style="position: relative;">
        <ui-button variant="primary">Top</ui-button>
        <ui-tooltip text="Tooltip on top" position="top" trigger="hover"></ui-tooltip>
      </div>
      <div style="position: relative;">
        <ui-button variant="primary">Bottom</ui-button>
        <ui-tooltip text="Tooltip on bottom" position="bottom" trigger="hover"></ui-tooltip>
      </div>
      <div style="position: relative;">
        <ui-button variant="primary">Left</ui-button>
        <ui-tooltip text="Tooltip on left" position="left" trigger="hover"></ui-tooltip>
      </div>
      <div style="position: relative;">
        <ui-button variant="primary">Right</ui-button>
        <ui-tooltip text="Tooltip on right" position="right" trigger="hover"></ui-tooltip>
      </div>
    </div>
  \`
}`,...(g=(u=o.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var v,c,m;e.parameters={...e.parameters,docs:{...(v=e.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => html\`
    <div style="padding: 2rem; text-align: center;">
      <p style="margin-bottom: 1rem; color: gray;">Hover over the button to see the tooltip</p>
      <div style="position: relative; display: inline-block;">
        <ui-button variant="secondary">Hover Trigger</ui-button>
        <ui-tooltip text="This tooltip appears on hover" position="top" trigger="hover"></ui-tooltip>
      </div>
    </div>
  \`
}`,...(m=(c=e.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var y,b,h;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => html\`
    <div style="padding: 2rem; text-align: center;">
      <p style="margin-bottom: 1rem; color: gray;">Click the button to toggle the tooltip</p>
      <div style="position: relative; display: inline-block;">
        <ui-button variant="secondary">Click Trigger</ui-button>
        <ui-tooltip text="This tooltip appears on click" position="top" trigger="click"></ui-tooltip>
      </div>
    </div>
  \`
}`,...(h=(b=r.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var x,T,f;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => html\`
    <div style="padding: 2rem; text-align: center;">
      <p style="margin-bottom: 1rem; color: gray;">Tooltip is disabled</p>
      <div style="position: relative; display: inline-block;">
        <ui-button variant="secondary" disabled>Disabled</ui-button>
        <ui-tooltip text="This tooltip is disabled" position="top" trigger="hover" disabled></ui-tooltip>
      </div>
    </div>
  \`
}`,...(f=(T=n.parameters)==null?void 0:T.docs)==null?void 0:f.source}}};var k,H,C;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => html\`
    <div style="padding: 2rem; display: flex; justify-content: center; align-items: center;">
      <div style="position: relative;">
        <ui-button variant="primary">Hover for info</ui-button>
        <ui-tooltip
          text="This is a longer tooltip with more detailed information about the action"
          position="top"
          trigger="hover"
        ></ui-tooltip>
      </div>
    </div>
  \`
}`,...(C=(H=l.parameters)==null?void 0:H.docs)==null?void 0:C.source}}};const A=["Playground","Positions","HoverTrigger","ClickTrigger","Disabled","LongContent"];export{r as ClickTrigger,n as Disabled,e as HoverTrigger,l as LongContent,i as Playground,o as Positions,A as __namedExportsOrder,z as default};
