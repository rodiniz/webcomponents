import{r as h,b as g,A as b}from"./iframe-Ck3e-F9w.js";import{n as p,U as d,t as P}from"./ui-component-base-BJ0AM59x.js";import{c as v}from"./template-1VJuhrPW.js";import{t as f}from"./theme-DBvyg58T.js";var m=Object.defineProperty,$=Object.getOwnPropertyDescriptor,c=(t,e,a,n)=>{for(var s=n>1?void 0:n?$(e,a):e,i=t.length-1,o;i>=0;i--)(o=t[i])&&(s=(n?o(e,a,s):o(s))||s);return n&&s&&m(e,a,s),s};let r=class extends d{constructor(){super(...arguments),this.total=0,this.currentPage=1,this.pageSize=10,this.handleClick=t=>{const a=t.target.closest(".page-btn");if(!a||a.disabled)return;const n=a.dataset.page;if(n==="prev")this.handlePageChange(this.currentPage-1);else if(n==="next")this.handlePageChange(this.currentPage+1);else if(n){const s=parseInt(n,10);isNaN(s)||this.handlePageChange(s)}}}get totalPages(){return Math.ceil(this.total/this.pageSize)}handlePageChange(t){t<1||t>this.totalPages||t===this.currentPage||(this.currentPage=t,this.emit("page-change",{page:t,pageSize:this.pageSize,total:this.total,totalPages:this.totalPages}))}getPageNumbers(){const t=this.totalPages,e=this.currentPage;if(t<=7)return Array.from({length:t},(n,s)=>s+1);const a=[];return e<=3?a.push(1,2,3,4,"...",t):e>=t-2?a.push(1,"...",t-3,t-2,t-1,t):a.push(1,"...",e-1,e,e+1,"...",t),a}render(){const t=this.totalPages,e=this.currentPage,a=this.getPageNumbers(),n=(e-1)*this.pageSize+1,s=Math.min(e*this.pageSize,this.total),i=this.total>0?`Showing ${n} to ${s} of ${this.total}`:"No results",o=l=>{if(l==="...")return g`<button class="page-btn ellipsis" disabled>...</button>`;const u=l===e;return g`
        <button 
          class=${v({"page-btn":!0,active:u})}
          data-page="${l}"
          aria-label="Page ${l}"
          aria-current=${u?"page":b}
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
    `}};r.styles=[h(f)];c([p({type:Number})],r.prototype,"total",2);c([p({type:Number,attribute:"current-page"})],r.prototype,"currentPage",2);c([p({type:Number,attribute:"page-size"})],r.prototype,"pageSize",2);r=c([P("ui-pagination")],r);
