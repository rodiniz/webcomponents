import{b as r}from"./iframe-Ck3e-F9w.js";import"./button-C3WNtjOb.js";import{a as t,I as e}from"./icons-lgEBa0uT.js";import"./preload-helper-C1FmrZbK.js";import"./ui-component-base-BJ0AM59x.js";import"./state-CVS5rq8K.js";import"./template-1VJuhrPW.js";import"./unsafe-html-7KbQsD9c.js";import"./theme-DBvyg58T.js";import"./icon-helpers-uywyl4Wq.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./class-builders-BssWg5Cc.js";const O={title:"Components/Icons",tags:["autodocs"],argTypes:{search:{control:"text"}},args:{search:""}},a={render:({search:s})=>{const n=s?t.filter(i=>i.toLowerCase().includes(s.toLowerCase())):t;return r`
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px;">
        ${n.map(i=>r`
          <div style="display: flex; flex-direction: column; align-items: center; padding: 12px; border: 1px solid #eee; border-radius: 8px;">
            <ui-button variant="ghost" size="sm" icon=${i}></ui-button>
            <span style="margin-top: 8px; font-size: 11px; color: #666; text-align: center; word-break: break-all;">${i}</span>
          </div>
        `)}
      </div>
    `}},o={render:()=>{const s=[{alias:"success",icon:e.success},{alias:"error",icon:e.error},{alias:"warning",icon:e.warning},{alias:"info",icon:e.info},{alias:"close",icon:e.close},{alias:"delete",icon:e.delete},{alias:"edit",icon:e.edit},{alias:"settings",icon:e.settings}];return r`
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        ${s.map(({alias:n,icon:i})=>r`
          <div style="display: flex; align-items: center; gap: 8px; padding: 8px 16px; border: 1px solid #eee; border-radius: 8px;">
            <ui-button variant="primary" size="sm" icon=${i}></ui-button>
            <code style="font-size: 13px;">${n}</code>
          </div>
        `)}
      </div>
      <p style="margin-top: 16px; font-size: 14px; color: #666;">
        Use <code>ICON_ALIASES.aliasName</code> for semantic icon names.
      </p>
    `}};var l,p,c;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: ({
    search
  }) => {
    const filteredIcons = search ? ICONS.filter(icon => icon.toLowerCase().includes(search.toLowerCase())) : ICONS;
    return html\`
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px;">
        \${filteredIcons.map(icon => html\`
          <div style="display: flex; flex-direction: column; align-items: center; padding: 12px; border: 1px solid #eee; border-radius: 8px;">
            <ui-button variant="ghost" size="sm" icon=\${icon}></ui-button>
            <span style="margin-top: 8px; font-size: 11px; color: #666; text-align: center; word-break: break-all;">\${icon}</span>
          </div>
        \`)}
      </div>
    \`;
  }
}`,...(c=(p=a.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var d,m,x;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => {
    const examples = [{
      alias: 'success',
      icon: ICON_ALIASES.success
    }, {
      alias: 'error',
      icon: ICON_ALIASES.error
    }, {
      alias: 'warning',
      icon: ICON_ALIASES.warning
    }, {
      alias: 'info',
      icon: ICON_ALIASES.info
    }, {
      alias: 'close',
      icon: ICON_ALIASES.close
    }, {
      alias: 'delete',
      icon: ICON_ALIASES.delete
    }, {
      alias: 'edit',
      icon: ICON_ALIASES.edit
    }, {
      alias: 'settings',
      icon: ICON_ALIASES.settings
    }];
    return html\`
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        \${examples.map(({
      alias,
      icon
    }) => html\`
          <div style="display: flex; align-items: center; gap: 8px; padding: 8px 16px; border: 1px solid #eee; border-radius: 8px;">
            <ui-button variant="primary" size="sm" icon=\${icon}></ui-button>
            <code style="font-size: 13px;">\${alias}</code>
          </div>
        \`)}
      </div>
      <p style="margin-top: 16px; font-size: 14px; color: #666;">
        Use <code>ICON_ALIASES.aliasName</code> for semantic icon names.
      </p>
    \`;
  }
}`,...(x=(m=o.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};const w=["AllIcons","IconAliases"];export{a as AllIcons,o as IconAliases,w as __namedExportsOrder,O as default};
