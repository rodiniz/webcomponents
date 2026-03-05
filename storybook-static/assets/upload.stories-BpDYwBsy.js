import{r as m,a as v,i as b,b as o}from"./iframe-Bw_KO9Y0.js";import{n,t as $}from"./property-BCdGWBue.js";import{r as g}from"./state-CPy2gvTm.js";import{c as y}from"./template-CWz1uxk0.js";import{t as D}from"./theme-Df5CjktT.js";import"./preload-helper-C1FmrZbK.js";import"./unsafe-html-rRkyaLOt.js";var C=Object.defineProperty,F=Object.getOwnPropertyDescriptor,a=(e,s,t,r)=>{for(var l=r>1?void 0:r?F(s,t):s,d=e.length-1,h;d>=0;d--)(h=e[d])&&(l=(r?h(s,t,l):h(l))||l);return r&&l&&C(s,t,l),l};let i=class extends b{constructor(){super(...arguments),this.accept="",this.multiple=!1,this.disabled=!1,this.label="Drag and drop files here",this.helper="",this.name="",this.files=[],this.isDragging=!1,this.handleDragOver=e=>{e.preventDefault(),this.disabled||(this.isDragging=!0)},this.handleDragLeave=e=>{e.preventDefault(),this.isDragging=!1},this.handleDrop=e=>{var t;if(e.preventDefault(),this.isDragging=!1,this.disabled)return;const s=(t=e.dataTransfer)==null?void 0:t.files;s&&this.processFiles(Array.from(s))},this.handleInputChange=e=>{const s=e.target;s.files&&this.processFiles(Array.from(s.files))}}connectedCallback(){this.setAttribute("data-ui","upload"),super.connectedCallback()}get value(){return this.files.map(e=>e.name).join(", ")}get filesValue(){return this.files}set filesValue(e){this.setFiles(e)}clear(){this.files=[]}setFiles(e){this.files=e,this.dispatchEvent(new CustomEvent("files-change",{detail:{files:this.files},bubbles:!0,composed:!0}))}processFiles(e){let s;this.multiple?s=[...this.files,...e]:s=e,this.files=s,this.dispatchEvent(new CustomEvent("files-change",{detail:{files:s},bubbles:!0,composed:!0}))}removeFile(e){this.files=this.files.filter((s,t)=>t!==e),this.dispatchEvent(new CustomEvent("files-change",{detail:{files:this.files},bubbles:!0,composed:!0}))}render(){const e=y({upload:!0,dragging:this.isDragging,disabled:this.disabled,"has-files":this.files.length>0});return o`
      <!-- container now has class "upload" and is positioned via CSS -->
      <div class=${e}
        @dragover=${this.handleDragOver}
        @dragleave=${this.handleDragLeave}
        @drop=${this.handleDrop}
      >
        <input
          type="file"
          class="upload-input"
          accept=${this.accept}
          ?multiple=${this.multiple}
          ?disabled=${this.disabled}
          @change=${this.handleInputChange}
        />
        <div class="upload-content">
          <div class="upload-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </div>
          <div class="upload-label">${this.label}</div>
          ${this.helper?o`<div class="upload-helper">${this.helper}</div>`:""}
        </div>
      </div>
      ${this.files.length>0?o`
        <div class="file-list">
          ${this.files.map((s,t)=>o`
            <div class="file-item">
              <span class="file-name">${s.name}</span>
              <span class="file-size">${(s.size/1024).toFixed(1)} KB</span>
              <button class="file-remove" @click=${()=>this.removeFile(t)}>×</button>
            </div>
          `)}
        </div>
      `:""}
    `}};i.styles=[m(D),v`
      /* ensure container is positioned so input does not float outside */
      .upload {
        position: relative;
        margin: 2rem 0;
      }
    `];a([n({type:String})],i.prototype,"accept",2);a([n({type:Boolean})],i.prototype,"multiple",2);a([n({type:Boolean})],i.prototype,"disabled",2);a([n({type:String})],i.prototype,"label",2);a([n({type:String})],i.prototype,"helper",2);a([n({type:String})],i.prototype,"name",2);a([g()],i.prototype,"files",2);a([g()],i.prototype,"isDragging",2);i=a([$("ui-upload")],i);const j={title:"Components/Upload",tags:["autodocs"],argTypes:{multiple:{control:"boolean"},disabled:{control:"boolean"}},args:{label:"Drag and drop files here",helper:"PNG, JPG, SVG",accept:".png,.jpg,.jpeg,.svg",multiple:!0,disabled:!1}},p={render:({label:e,helper:s,accept:t,multiple:r,disabled:l})=>o`
    <ui-upload
      label=${e}
      helper=${s}
      accept=${t}
      ?multiple=${r}
      ?disabled=${l}
      name="assets"
    ></ui-upload>
  `};var c,u,f;p.parameters={...p.parameters,docs:{...(c=p.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: ({
    label,
    helper,
    accept,
    multiple,
    disabled
  }) => html\`
    <ui-upload
      label=\${label}
      helper=\${helper}
      accept=\${accept}
      ?multiple=\${multiple}
      ?disabled=\${disabled}
      name="assets"
    ></ui-upload>
  \`
}`,...(f=(u=p.parameters)==null?void 0:u.docs)==null?void 0:f.source}}};const B=["Playground"];export{p as Playground,B as __namedExportsOrder,j as default};
