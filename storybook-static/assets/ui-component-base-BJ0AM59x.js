import{f as u,u as o,a as d}from"./iframe-Ck3e-F9w.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const f=a=>(t,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(a,t)}):customElements.define(a,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const m={attribute:!0,type:String,converter:o,reflect:!1,hasChanged:u},b=(a=m,t,r)=>{const{kind:e,metadata:c}=r;let n=globalThis.litPropertyMetadata.get(c);if(n===void 0&&globalThis.litPropertyMetadata.set(c,n=new Map),e==="setter"&&((a=Object.create(a)).wrapped=!0),n.set(r.name,a),e==="accessor"){const{name:i}=r;return{set(s){const l=t.get.call(this);t.set.call(this,s),this.requestUpdate(i,l,a,!0,s)},init(s){return s!==void 0&&this.C(i,void 0,a,s),s}}}if(e==="setter"){const{name:i}=r;return function(s){const l=this[i];t.call(this,s),this.requestUpdate(i,l,a,!0,s)}}throw Error("Unsupported decorator location: "+e)};function g(a){return(t,r)=>typeof r=="object"?b(a,t,r):((e,c,n)=>{const i=c.hasOwnProperty(n);return c.constructor.createProperty(n,e),i?Object.getOwnPropertyDescriptor(c,n):void 0})(a,t,r)}class p extends d{connectedCallback(){const t=this.tagName.toLowerCase(),r=t.startsWith("ui-")?t.substring(3):t;this.setAttribute("data-ui",r),super.connectedCallback()}emit(t,r,e){const c=new CustomEvent(t,{detail:r,bubbles:(e==null?void 0:e.bubbles)??!0,composed:(e==null?void 0:e.composed)??!0,cancelable:(e==null?void 0:e.cancelable)??!1});return this.dispatchEvent(c)}}export{p as U,g as n,f as t};
