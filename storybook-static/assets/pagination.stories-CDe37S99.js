import{r as P,i as v,b as g,A as f}from"./iframe-Bw_KO9Y0.js";import{n as u,t as $}from"./property-BCdGWBue.js";import{c as S}from"./template-CWz1uxk0.js";import{t as y}from"./theme-Df5CjktT.js";import"./preload-helper-C1FmrZbK.js";import"./unsafe-html-rRkyaLOt.js";var z=Object.defineProperty,C=Object.getOwnPropertyDescriptor,c=(t,e,a,r)=>{for(var n=r>1?void 0:r?C(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(n=(r?o(e,a,n):o(n))||n);return r&&n&&z(e,a,n),n};let s=class extends v{constructor(){super(...arguments),this.total=0,this.currentPage=1,this.pageSize=10,this.handleClick=t=>{const a=t.target.closest(".page-btn");if(!a||a.disabled)return;const r=a.dataset.page;if(r==="prev")this.handlePageChange(this.currentPage-1);else if(r==="next")this.handlePageChange(this.currentPage+1);else if(r){const n=parseInt(r,10);isNaN(n)||this.handlePageChange(n)}}}connectedCallback(){this.setAttribute("data-ui","pagination"),super.connectedCallback()}get totalPages(){return Math.ceil(this.total/this.pageSize)}handlePageChange(t){t<1||t>this.totalPages||t===this.currentPage||(this.currentPage=t,this.dispatchEvent(new CustomEvent("page-change",{detail:{page:t,pageSize:this.pageSize,total:this.total,totalPages:this.totalPages},bubbles:!0,composed:!0})))}getPageNumbers(){const t=this.totalPages,e=this.currentPage;if(t<=7)return Array.from({length:t},(r,n)=>n+1);const a=[];return e<=3?a.push(1,2,3,4,"...",t):e>=t-2?a.push(1,"...",t-3,t-2,t-1,t):a.push(1,"...",e-1,e,e+1,"...",t),a}render(){const t=this.totalPages,e=this.currentPage,a=this.getPageNumbers(),r=(e-1)*this.pageSize+1,n=Math.min(e*this.pageSize,this.total),i=this.total>0?`Showing ${r} to ${n} of ${this.total}`:"No results",o=l=>{if(l==="...")return g`<button class="page-btn ellipsis" disabled>...</button>`;const h=l===e;return g`
        <button 
          class=${S({"page-btn":!0,active:h})}
          data-page="${l}"
          aria-label="Page ${l}"
          aria-current=${h?"page":f}
        >
          ${l}
        </button>
      `};return g`
      <div class="pagination-container" @click=${this.handleClick}>
        <div class="pagination-info">${i}</div>
        ${t>1?g`
        <nav class="pagination" role="navigation" aria-label="Pagination">
          <button 
            class="page-btn nav-btn" 
            ?disabled=${e===1}
            data-page="prev"
            aria-label="Previous page"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          ${a.map(o)}
          <button 
            class="page-btn nav-btn" 
            ?disabled=${e===t}
            data-page="next"
            aria-label="Next page"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </nav>
        `:""}
      </div>
    `}};s.styles=[P(y)];c([u({type:Number})],s.prototype,"total",2);c([u({type:Number,attribute:"current-page"})],s.prototype,"currentPage",2);c([u({type:Number,attribute:"page-size"})],s.prototype,"pageSize",2);s=c([$("ui-pagination")],s);const O={title:"Components/Pagination",tags:["autodocs"],argTypes:{total:{control:{type:"number",min:0,step:1}},currentPage:{control:{type:"number",min:1,step:1}},pageSize:{control:{type:"number",min:1,step:1}}},args:{total:137,currentPage:1,pageSize:10}},p={render:({total:t,currentPage:e,pageSize:a})=>g`
    <ui-pagination
      .total=${t}
      .currentPage=${e}
      .pageSize=${a}
    ></ui-pagination>
  `};var d,b,m;p.parameters={...p.parameters,docs:{...(d=p.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(m=(b=p.parameters)==null?void 0:b.docs)==null?void 0:m.source}}};const j=["Playground"];export{p as Playground,j as __namedExportsOrder,O as default};
