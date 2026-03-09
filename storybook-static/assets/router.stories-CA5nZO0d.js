import{b as r}from"./iframe-Ck3e-F9w.js";import"./preload-helper-C1FmrZbK.js";const L={title:"Core/Router",tags:["autodocs"]},e=(Q,W)=>{const c=Q.split("/"),u=W.split("/");if(c.length!==u.length)return!1;const p={};for(let t=0;t<c.length;t++){const h=c[t],l=u[t];if(h.startsWith(":"))p[h.slice(1)]=l;else if(h!==l)return!1}return p},s={render:()=>r`
    <div>
      <h3>Static Route: /home</h3>
      <pre><code>routePath: '/home'
path: '/home'
result: ${JSON.stringify(e("/home","/home"))}</code></pre>
      
      <h3>Mismatch</h3>
      <pre><code>routePath: '/home'
path: '/about'
result: ${JSON.stringify(e("/home","/about"))}</code></pre>
    </div>
  `},o={render:()=>r`
    <div>
      <h3>Route with ID parameter: /recording/:id</h3>
      <pre><code>routePath: '/recording/:id'
path: '/recording/123'
result: ${JSON.stringify(e("/recording/:id","/recording/123"))}</code></pre>

      <h3>Different ID</h3>
      <pre><code>routePath: '/recording/:id'
path: '/recording/abc'
result: ${JSON.stringify(e("/recording/:id","/recording/abc"))}</code></pre>

      <h3>Length mismatch (no match)</h3>
      <pre><code>routePath: '/recording/:id'
path: '/recording/123/edit'
result: ${JSON.stringify(e("/recording/:id","/recording/123/edit"))}</code></pre>
    </div>
  `},a={render:()=>r`
    <div>
      <h3>Multiple parameters: /users/:userId/posts/:postId</h3>
      <pre><code>routePath: '/users/:userId/posts/:postId'
path: '/users/1/posts/42'
result: ${JSON.stringify(e("/users/:userId/posts/:postId","/users/1/posts/42"))}</code></pre>

      <h3>With string IDs</h3>
      <pre><code>routePath: '/users/:userId/posts/:postId'
path: '/users/abc/posts/xyz'
result: ${JSON.stringify(e("/users/:userId/posts/:postId","/users/abc/posts/xyz"))}</code></pre>
    </div>
  `},d={render:()=>r`
    <div>
      <h3>Nested route: /dashboard/:section/analytics</h3>
      <pre><code>routePath: '/dashboard/:section/analytics'
path: '/dashboard/sales/analytics'
result: ${JSON.stringify(e("/dashboard/:section/analytics","/dashboard/sales/analytics"))}</code></pre>

      <h3>Different section</h3>
      <pre><code>routePath: '/dashboard/:section/analytics'
path: '/dashboard/users/analytics'
result: ${JSON.stringify(e("/dashboard/:section/analytics","/dashboard/users/analytics"))}</code></pre>
    </div>
  `},n={render:()=>r`
    <div>
      <h3>Root route: /</h3>
      <pre><code>routePath: '/'
path: '/'
result: ${JSON.stringify(e("/","/"))}</code></pre>
    </div>
  `},i={render:()=>r`
    <div>
      <h3>Note: Query params are NOT handled by matchRoute</h3>
      <p>matchRoute only handles path parameters. Query strings (?id=123) should be handled separately.</p>
      <pre><code>routePath: '/recording/:id'
path: '/recording/123?token=abc'
result: ${JSON.stringify(e("/recording/:id","/recording/123?token=abc"))}</code></pre>
    </div>
  `};var m,g,y;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => html\`
    <div>
      <h3>Static Route: /home</h3>
      <pre><code>routePath: '/home'
path: '/home'
result: \${JSON.stringify(testMatchRoute('/home', '/home'))}</code></pre>
      
      <h3>Mismatch</h3>
      <pre><code>routePath: '/home'
path: '/about'
result: \${JSON.stringify(testMatchRoute('/home', '/about'))}</code></pre>
    </div>
  \`
}`,...(y=(g=s.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var b,f,P;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => html\`
    <div>
      <h3>Route with ID parameter: /recording/:id</h3>
      <pre><code>routePath: '/recording/:id'
path: '/recording/123'
result: \${JSON.stringify(testMatchRoute('/recording/:id', '/recording/123'))}</code></pre>

      <h3>Different ID</h3>
      <pre><code>routePath: '/recording/:id'
path: '/recording/abc'
result: \${JSON.stringify(testMatchRoute('/recording/:id', '/recording/abc'))}</code></pre>

      <h3>Length mismatch (no match)</h3>
      <pre><code>routePath: '/recording/:id'
path: '/recording/123/edit'
result: \${JSON.stringify(testMatchRoute('/recording/:id', '/recording/123/edit'))}</code></pre>
    </div>
  \`
}`,...(P=(f=o.parameters)==null?void 0:f.docs)==null?void 0:P.source}}};var R,S,N;a.parameters={...a.parameters,docs:{...(R=a.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => html\`
    <div>
      <h3>Multiple parameters: /users/:userId/posts/:postId</h3>
      <pre><code>routePath: '/users/:userId/posts/:postId'
path: '/users/1/posts/42'
result: \${JSON.stringify(testMatchRoute('/users/:userId/posts/:postId', '/users/1/posts/42'))}</code></pre>

      <h3>With string IDs</h3>
      <pre><code>routePath: '/users/:userId/posts/:postId'
path: '/users/abc/posts/xyz'
result: \${JSON.stringify(testMatchRoute('/users/:userId/posts/:postId', '/users/abc/posts/xyz'))}</code></pre>
    </div>
  \`
}`,...(N=(S=a.parameters)==null?void 0:S.docs)==null?void 0:N.source}}};var I,O,v;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => html\`
    <div>
      <h3>Nested route: /dashboard/:section/analytics</h3>
      <pre><code>routePath: '/dashboard/:section/analytics'
path: '/dashboard/sales/analytics'
result: \${JSON.stringify(testMatchRoute('/dashboard/:section/analytics', '/dashboard/sales/analytics'))}</code></pre>

      <h3>Different section</h3>
      <pre><code>routePath: '/dashboard/:section/analytics'
path: '/dashboard/users/analytics'
result: \${JSON.stringify(testMatchRoute('/dashboard/:section/analytics', '/dashboard/users/analytics'))}</code></pre>
    </div>
  \`
}`,...(v=(O=d.parameters)==null?void 0:O.docs)==null?void 0:v.source}}};var J,$,M;n.parameters={...n.parameters,docs:{...(J=n.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => html\`
    <div>
      <h3>Root route: /</h3>
      <pre><code>routePath: '/'
path: '/'
result: \${JSON.stringify(testMatchRoute('/', '/'))}</code></pre>
    </div>
  \`
}`,...(M=($=n.parameters)==null?void 0:$.docs)==null?void 0:M.source}}};var D,z,x;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => html\`
    <div>
      <h3>Note: Query params are NOT handled by matchRoute</h3>
      <p>matchRoute only handles path parameters. Query strings (?id=123) should be handled separately.</p>
      <pre><code>routePath: '/recording/:id'
path: '/recording/123?token=abc'
result: \${JSON.stringify(testMatchRoute('/recording/:id', '/recording/123?token=abc'))}</code></pre>
    </div>
  \`
}`,...(x=(z=i.parameters)==null?void 0:z.docs)==null?void 0:x.source}}};const T=["StaticRoute","ParameterizedRoute","MultipleParameters","NestedParameterizedRoute","RootRoute","PathWithQueryParams"];export{a as MultipleParameters,d as NestedParameterizedRoute,o as ParameterizedRoute,i as PathWithQueryParams,n as RootRoute,s as StaticRoute,T as __namedExportsOrder,L as default};
