import{r as O,i as B,b as o}from"./iframe-6s-sIqo3.js";import{n as c,t as R}from"./property-C_0pZ1Mq.js";import{r as U}from"./state-vQ8fJvXj.js";import{c as A}from"./template-BbtPzLcA.js";import{t as I}from"./theme-CCP9F1YV.js";import"./preload-helper-C1FmrZbK.js";import"./unsafe-html-BsqWkz84.js";var M=Object.defineProperty,q=Object.getOwnPropertyDescriptor,s=(t,r,l,n)=>{for(var e=n>1?void 0:n?q(r,l):r,m=t.length-1,b;m>=0;m--)(b=t[m])&&(e=(n?b(r,l,e):b(e))||e);return n&&e&&M(r,l,e),e};let i=class extends B{constructor(){super(...arguments),this.text="",this.position="top",this.trigger="hover",this.disabled=!1,this.isVisible=!1,this.triggerElement=null}connectedCallback(){this.setAttribute("data-ui","tooltip"),super.connectedCallback()}firstUpdated(){this.triggerElement=this.parentElement,this.triggerElement&&!this.disabled&&(this.trigger==="hover"?(this.triggerElement.addEventListener("mouseenter",()=>this.show()),this.triggerElement.addEventListener("mouseleave",()=>this.hide())):this.trigger==="click"&&(this.triggerElement.addEventListener("click",t=>{t.stopPropagation(),this.isVisible?this.hide():this.show()}),document.addEventListener("click",()=>this.hide())))}show(){this.disabled||(this.isVisible=!0)}hide(){this.isVisible=!1}render(){const t=A({tooltip:!0,[this.position]:!0,visible:this.isVisible,disabled:this.disabled});return o`
      <div class=${t}>
        <div class="tooltip-content">${this.text}</div>
        <div class="tooltip-arrow"></div>
      </div>
    `}};i.styles=[O(I)];s([c({type:String})],i.prototype,"text",2);s([c({type:String,reflect:!0})],i.prototype,"position",2);s([c({type:String,reflect:!0})],i.prototype,"trigger",2);s([c({type:Boolean,reflect:!0})],i.prototype,"disabled",2);s([U()],i.prototype,"isVisible",2);i=s([R("ui-tooltip")],i);const W={title:"Components/Tooltip",tags:["autodocs"],argTypes:{text:{control:"text",description:"Tooltip text content"},position:{control:"select",options:["top","bottom","left","right"],description:"Tooltip position relative to trigger"},trigger:{control:"select",options:["hover","click"],description:"How to trigger the tooltip"},disabled:{control:"boolean",description:"Disable the tooltip"}},args:{text:"This is a tooltip",position:"top",trigger:"hover",disabled:!1}},a={render:({text:t,position:r,trigger:l,disabled:n})=>o`
    <div style="padding: 2rem; display: flex; justify-content: center; align-items: center;">
      <div style="position: relative;">
        <ui-button variant="primary">Hover me</ui-button>
        <ui-tooltip
          text=${t}
          position=${r}
          trigger=${l}
          ?disabled=${n}
        ></ui-tooltip>
      </div>
    </div>
  `},p={render:()=>o`
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
  `},d={render:()=>o`
    <div style="padding: 2rem; text-align: center;">
      <p style="margin-bottom: 1rem; color: gray;">Hover over the button to see the tooltip</p>
      <div style="position: relative; display: inline-block;">
        <ui-button variant="secondary">Hover Trigger</ui-button>
        <ui-tooltip text="This tooltip appears on hover" position="top" trigger="hover"></ui-tooltip>
      </div>
    </div>
  `},u={render:()=>o`
    <div style="padding: 2rem; text-align: center;">
      <p style="margin-bottom: 1rem; color: gray;">Click the button to toggle the tooltip</p>
      <div style="position: relative; display: inline-block;">
        <ui-button variant="secondary">Click Trigger</ui-button>
        <ui-tooltip text="This tooltip appears on click" position="top" trigger="click"></ui-tooltip>
      </div>
    </div>
  `},g={render:()=>o`
    <div style="padding: 2rem; text-align: center;">
      <p style="margin-bottom: 1rem; color: gray;">Tooltip is disabled</p>
      <div style="position: relative; display: inline-block;">
        <ui-button variant="secondary" disabled>Disabled</ui-button>
        <ui-tooltip text="This tooltip is disabled" position="top" trigger="hover" disabled></ui-tooltip>
      </div>
    </div>
  `},v={render:()=>o`
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
  `};var h,y,f;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(f=(y=a.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var x,T,k;p.parameters={...p.parameters,docs:{...(x=p.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(k=(T=p.parameters)==null?void 0:T.docs)==null?void 0:k.source}}};var C,E,H;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => html\`
    <div style="padding: 2rem; text-align: center;">
      <p style="margin-bottom: 1rem; color: gray;">Hover over the button to see the tooltip</p>
      <div style="position: relative; display: inline-block;">
        <ui-button variant="secondary">Hover Trigger</ui-button>
        <ui-tooltip text="This tooltip appears on hover" position="top" trigger="hover"></ui-tooltip>
      </div>
    </div>
  \`
}`,...(H=(E=d.parameters)==null?void 0:E.docs)==null?void 0:H.source}}};var $,S,w;u.parameters={...u.parameters,docs:{...($=u.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => html\`
    <div style="padding: 2rem; text-align: center;">
      <p style="margin-bottom: 1rem; color: gray;">Click the button to toggle the tooltip</p>
      <div style="position: relative; display: inline-block;">
        <ui-button variant="secondary">Click Trigger</ui-button>
        <ui-tooltip text="This tooltip appears on click" position="top" trigger="click"></ui-tooltip>
      </div>
    </div>
  \`
}`,...(w=(S=u.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var P,j,L;g.parameters={...g.parameters,docs:{...(P=g.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => html\`
    <div style="padding: 2rem; text-align: center;">
      <p style="margin-bottom: 1rem; color: gray;">Tooltip is disabled</p>
      <div style="position: relative; display: inline-block;">
        <ui-button variant="secondary" disabled>Disabled</ui-button>
        <ui-tooltip text="This tooltip is disabled" position="top" trigger="hover" disabled></ui-tooltip>
      </div>
    </div>
  \`
}`,...(L=(j=g.parameters)==null?void 0:j.docs)==null?void 0:L.source}}};var _,D,V;v.parameters={...v.parameters,docs:{...(_=v.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(V=(D=v.parameters)==null?void 0:D.docs)==null?void 0:V.source}}};const X=["Playground","Positions","HoverTrigger","ClickTrigger","Disabled","LongContent"];export{u as ClickTrigger,g as Disabled,d as HoverTrigger,v as LongContent,a as Playground,p as Positions,X as __namedExportsOrder,W as default};
