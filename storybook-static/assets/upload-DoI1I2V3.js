import{r as f,i as c,b as o}from"./iframe-Ck3e-F9w.js";import{n as r,U as g,t as u}from"./ui-component-base-BJ0AM59x.js";import{r as d}from"./state-CVS5rq8K.js";import{c as m}from"./template-1VJuhrPW.js";import{r as v}from"./icon-helpers-uywyl4Wq.js";import{t as y}from"./theme-DBvyg58T.js";var D=Object.defineProperty,$=Object.getOwnPropertyDescriptor,l=(e,s,t,p)=>{for(var a=p>1?void 0:p?$(s,t):s,n=e.length-1,h;n>=0;n--)(h=e[n])&&(a=(p?h(s,t,a):h(a))||a);return p&&a&&D(s,t,a),a};let i=class extends g{constructor(){super(...arguments),this.accept="",this.multiple=!1,this.disabled=!1,this.label="Drag and drop files here",this.helper="",this.name="",this.files=[],this.isDragging=!1,this.handleDragOver=e=>{e.preventDefault(),this.disabled||(this.isDragging=!0)},this.handleDragLeave=e=>{e.preventDefault(),this.isDragging=!1},this.handleDrop=e=>{var t;if(e.preventDefault(),this.isDragging=!1,this.disabled)return;const s=(t=e.dataTransfer)==null?void 0:t.files;s&&this.processFiles(Array.from(s))},this.handleInputChange=e=>{const s=e.target;s.files&&this.processFiles(Array.from(s.files))}}get value(){return this.files.map(e=>e.name).join(", ")}get filesValue(){return this.files}set filesValue(e){this.setFiles(e)}clear(){this.files=[]}setFiles(e){this.files=e,this.emit("files-change",{files:this.files})}processFiles(e){let s;this.multiple?s=[...this.files,...e]:s=e,this.files=s,this.emit("files-change",{files:s})}removeFile(e){this.files=this.files.filter((s,t)=>t!==e),this.emit("files-change",{files:this.files})}render(){const e=m({upload:!0,dragging:this.isDragging,disabled:this.disabled,"has-files":this.files.length>0});return o`
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
          <div class="upload-icon">${v("upload",{width:24,height:24})}</div>
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
    `}};i.styles=[f(y),c`
      /* ensure container is positioned so input does not float outside */
      .upload {
        position: relative;
        margin: 2rem 0;
      }
    `];l([r({type:String})],i.prototype,"accept",2);l([r({type:Boolean})],i.prototype,"multiple",2);l([r({type:Boolean})],i.prototype,"disabled",2);l([r({type:String})],i.prototype,"label",2);l([r({type:String})],i.prototype,"helper",2);l([r({type:String})],i.prototype,"name",2);l([d()],i.prototype,"files",2);l([d()],i.prototype,"isDragging",2);i=l([u("ui-upload")],i);
