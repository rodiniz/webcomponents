import{b as r}from"./iframe-Ck3e-F9w.js";import"./layout-D8UPBAOM.js";import"./preload-helper-C1FmrZbK.js";import"./ui-component-base-BJ0AM59x.js";import"./template-1VJuhrPW.js";import"./unsafe-html-7KbQsD9c.js";import"./validators-OS32PDZK.js";import"./theme-DBvyg58T.js";const V={title:"Components/Layout",tags:["autodocs"],argTypes:{direction:{control:"select",options:["auto","horizontal","vertical"]}},args:{direction:"vertical"}},i={render:({direction:e})=>r`
    <ui-layout direction=${e} style="height: 360px; border: 1px solid hsl(var(--border)); border-radius: 8px; overflow: hidden;">
      <ui-layout-header>Header</ui-layout-header>
      <ui-layout direction="horizontal" style="flex: 1;">
        <ui-layout-sidebar style="width: 180px;">Sidebar</ui-layout-sidebar>
        <ui-layout-main style="padding: 16px;">Main content</ui-layout-main>
      </ui-layout>
      <ui-layout-footer>Footer</ui-layout-footer>
    </ui-layout>
  `},t={render:()=>r`
    <ui-layout direction="vertical" style="height: 420px; border: 1px solid hsl(var(--border)); border-radius: 12px; overflow: hidden;">
      <ui-layout-header>
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <strong style="font-size: 0.95rem;">Atlas Console</strong>
          <div style="display: flex; gap: 8px;">
            <span style="padding: 4px 10px; border-radius: 999px; background: hsl(var(--muted) / 0.2);">v2.4</span>
            <span style="padding: 4px 10px; border-radius: 999px; background: hsl(var(--muted) / 0.2);">Staging</span>
          </div>
        </div>
      </ui-layout-header>
      <ui-layout direction="horizontal" style="flex: 1;">
        <ui-layout-sidebar style="width: 240px; flex: 0 0 240px; border-right: 1px solid hsl(var(--border)); background: linear-gradient(180deg, hsl(222 47% 22%), hsl(220 52% 14%)); color: rgba(255, 255, 255, 0.78);">
          <div class="sidebar-label">Workspace</div>
          <div class="sidebar-section">
            <div class="sidebar-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M4 12l8-8 8 8" />
                <path d="M6 10v10h12V10" />
              </svg>
              Overview
            </div>
            <div class="sidebar-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="7" height="7" rx="1.5" />
                <rect x="14" y="4" width="7" height="7" rx="1.5" />
                <rect x="3" y="13" width="7" height="7" rx="1.5" />
                <rect x="14" y="13" width="7" height="7" rx="1.5" />
              </svg>
              Inventory
            </div>
            <div class="sidebar-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M4 19V5" />
                <path d="M4 19h16" />
                <path d="M8 15V9" />
                <path d="M12 19V7" />
                <path d="M16 15v-4" />
              </svg>
              Reports
            </div>
          </div>
          <div class="sidebar-label">Operations</div>
          <div class="sidebar-section">
            <div class="sidebar-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 2v4" />
                <path d="M12 18v4" />
                <path d="M4.93 4.93l2.83 2.83" />
                <path d="M16.24 16.24l2.83 2.83" />
                <path d="M2 12h4" />
                <path d="M18 12h4" />
                <path d="M4.93 19.07l2.83-2.83" />
                <path d="M16.24 7.76l2.83-2.83" />
              </svg>
              Automations
            </div>
            <div class="sidebar-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 3l7 3v6c0 4.5-3.1 7.6-7 9-3.9-1.4-7-4.5-7-9V6l7-3z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              Health
            </div>
            <div class="sidebar-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.7 1.7 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .3 1.7 1.7 0 0 0-.84 1.47V21a2 2 0 1 1-4 0v-.08a1.7 1.7 0 0 0-.84-1.47 1.7 1.7 0 0 0-1-.3 1.7 1.7 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.3-1 1.7 1.7 0 0 0-1.47-.84H3a2 2 0 1 1 0-4h.08a1.7 1.7 0 0 0 1.47-.84 1.7 1.7 0 0 0 .3-1 1.7 1.7 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6c.33 0 .66-.1 1-.3A1.7 1.7 0 0 0 10.84 2.8V2a2 2 0 1 1 4 0v.08c0 .62.33 1.2.84 1.47.34.2.67.3 1 .3a1.7 1.7 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c0 .33.1.66.3 1 .2.33.3.66.3 1s-.1.66-.3 1-.3.67-.3 1z" />
              </svg>
              Settings
            </div>
          </div>
        </ui-layout-sidebar>
        <ui-layout-main style="padding: 20px; background: hsl(var(--muted) / 0.12);">
          <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px;">
            ${["Latency","Throughput","Errors"].map(e=>r`
              <div style="padding: 16px; border-radius: 10px; border: 1px solid hsl(var(--border)); background: hsl(var(--background));">
                <div style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">${e}</div>
                <div style="font-size: 1.4rem; font-weight: 600; margin-top: 6px;">${e==="Errors"?"0.04%":"42.8ms"}</div>
              </div>
            `)}
          </div>
          <div style="margin-top: 16px; padding: 18px; border-radius: 12px; border: 1px dashed hsl(var(--border)); background: hsl(var(--background));">
            <strong style="display: block; margin-bottom: 8px;">Release timeline</strong>
            <div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px;">
              ${["Research","Build","Launch","Review"].map(e=>r`
                <div style="padding: 10px 12px; border-radius: 999px; background: hsl(var(--muted) / 0.25); text-align: center; font-size: 0.78rem;">
                  ${e}
                </div>
              `)}
            </div>
          </div>
        </ui-layout-main>
      </ui-layout>
      <ui-layout-footer>
        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem;">
          <span>Last sync 2 minutes ago</span>
          <span>12 active services</span>
        </div>
      </ui-layout-footer>
    </ui-layout>
  `},a={render:()=>r`
    <ui-layout direction="horizontal" style="height: 360px; border: 1px solid hsl(var(--border)); border-radius: 12px; overflow: hidden;">
      <ui-layout-main style="padding: 24px;">
        <div style="max-width: 320px;">
          <div style="font-size: 0.75rem; color: hsl(var(--muted-foreground)); text-transform: uppercase; letter-spacing: 0.08em;">Campaign</div>
          <h3 style="margin: 8px 0 12px; font-size: 1.3rem;">Launch the winter catalog</h3>
          <p style="margin: 0; color: hsl(var(--muted-foreground)); line-height: 1.5;">Draft messaging, coordinate handoff with design, and prepare the launch checklist.</p>
          <div style="display: flex; gap: 8px; margin-top: 14px;">
            <span style="padding: 6px 10px; border-radius: 999px; background: hsl(var(--muted) / 0.2);">In progress</span>
            <span style="padding: 6px 10px; border-radius: 999px; background: hsl(var(--muted) / 0.2);">Due Friday</span>
          </div>
        </div>
      </ui-layout-main>
      <ui-layout-sidebar style="width: 45%; padding: 24px; background: hsl(var(--muted) / 0.12); color: hsl(var(--foreground));">
        <div style="display: grid; gap: 10px;">
          ${["Brief review","Legal signoff","Content QA","Schedule"].map((e,w)=>r`
            <div style="padding: 12px 14px; border-radius: 10px; background: hsl(var(--background)); border: 1px solid hsl(var(--border));">
              <div style="font-size: 0.78rem; color: hsl(var(--muted-foreground));">Step ${w+1}</div>
              <div style="font-weight: 600; margin-top: 4px;">${e}</div>
            </div>
          `)}
        </div>
      </ui-layout-sidebar>
    </ui-layout>
  `},d={render:()=>r`
    <ui-layout direction="vertical" style="height: 380px; border: 1px solid hsl(var(--border)); border-radius: 12px; overflow: hidden;">
      <ui-layout-header>
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <strong>Studio</strong>
          <span style="font-size: 0.8rem; color: hsl(var(--muted-foreground));">3 drafts</span>
        </div>
      </ui-layout-header>
      <ui-layout-main style="padding: 18px; background: hsl(var(--muted) / 0.1);">
        <div style="display: grid; gap: 12px;">
          ${["Hero concept","Product grid","CTA experiments"].map(e=>r`
            <div style="padding: 16px; border-radius: 12px; background: hsl(var(--background)); border: 1px solid hsl(var(--border));">
              <div style="font-weight: 600;">${e}</div>
              <div style="margin-top: 6px; font-size: 0.85rem; color: hsl(var(--muted-foreground));">Updated 2 hours ago</div>
            </div>
          `)}
        </div>
      </ui-layout-main>
      <ui-layout-footer>
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 0.85rem;">Auto-save enabled</span>
          <span style="padding: 4px 10px; border-radius: 999px; background: hsl(var(--muted) / 0.2);">Preview</span>
        </div>
      </ui-layout-footer>
    </ui-layout>
  `},o={render:()=>r`
    <ui-layout direction="horizontal" style="height: 360px; border: 1px solid hsl(var(--border)); border-radius: 12px; overflow: hidden;">
      <ui-layout-main style="padding: 0;">
        <div style="height: 100%; background: linear-gradient(135deg, hsl(var(--muted) / 0.5), hsl(var(--muted) / 0.1)); display: grid; place-items: center;">
          <div style="width: 70%; height: 60%; border-radius: 18px; border: 1px dashed hsl(var(--border)); display: grid; place-items: center; color: hsl(var(--muted-foreground));">
            Media preview
          </div>
        </div>
      </ui-layout-main>
      <ui-layout-sidebar style="width: 260px; background: hsl(var(--background)); color: hsl(var(--foreground)); padding: 18px; border-left: 1px solid hsl(var(--border));">
        <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: hsl(var(--muted-foreground));">Details</div>
        <h4 style="margin: 8px 0 12px;">Summer reel</h4>
        <div style="display: grid; gap: 8px; font-size: 0.85rem;">
          <div style="display: flex; justify-content: space-between;"><span>Duration</span><span>38s</span></div>
          <div style="display: flex; justify-content: space-between;"><span>Format</span><span>MP4</span></div>
          <div style="display: flex; justify-content: space-between;"><span>Status</span><span>Ready</span></div>
        </div>
        <div style="margin-top: 16px; padding: 12px; border-radius: 10px; background: hsl(var(--muted) / 0.2); font-size: 0.8rem;">
          Drop assets here to update the preview.
        </div>
      </ui-layout-sidebar>
    </ui-layout>
  `};var s,n,l;i.parameters={...i.parameters,docs:{...(s=i.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: ({
    direction
  }) => html\`
    <ui-layout direction=\${direction} style="height: 360px; border: 1px solid hsl(var(--border)); border-radius: 8px; overflow: hidden;">
      <ui-layout-header>Header</ui-layout-header>
      <ui-layout direction="horizontal" style="flex: 1;">
        <ui-layout-sidebar style="width: 180px;">Sidebar</ui-layout-sidebar>
        <ui-layout-main style="padding: 16px;">Main content</ui-layout-main>
      </ui-layout>
      <ui-layout-footer>Footer</ui-layout-footer>
    </ui-layout>
  \`
}`,...(l=(n=i.parameters)==null?void 0:n.docs)==null?void 0:l.source}}};var p,u,h;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => html\`
    <ui-layout direction="vertical" style="height: 420px; border: 1px solid hsl(var(--border)); border-radius: 12px; overflow: hidden;">
      <ui-layout-header>
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <strong style="font-size: 0.95rem;">Atlas Console</strong>
          <div style="display: flex; gap: 8px;">
            <span style="padding: 4px 10px; border-radius: 999px; background: hsl(var(--muted) / 0.2);">v2.4</span>
            <span style="padding: 4px 10px; border-radius: 999px; background: hsl(var(--muted) / 0.2);">Staging</span>
          </div>
        </div>
      </ui-layout-header>
      <ui-layout direction="horizontal" style="flex: 1;">
        <ui-layout-sidebar style="width: 240px; flex: 0 0 240px; border-right: 1px solid hsl(var(--border)); background: linear-gradient(180deg, hsl(222 47% 22%), hsl(220 52% 14%)); color: rgba(255, 255, 255, 0.78);">
          <div class="sidebar-label">Workspace</div>
          <div class="sidebar-section">
            <div class="sidebar-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M4 12l8-8 8 8" />
                <path d="M6 10v10h12V10" />
              </svg>
              Overview
            </div>
            <div class="sidebar-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="7" height="7" rx="1.5" />
                <rect x="14" y="4" width="7" height="7" rx="1.5" />
                <rect x="3" y="13" width="7" height="7" rx="1.5" />
                <rect x="14" y="13" width="7" height="7" rx="1.5" />
              </svg>
              Inventory
            </div>
            <div class="sidebar-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M4 19V5" />
                <path d="M4 19h16" />
                <path d="M8 15V9" />
                <path d="M12 19V7" />
                <path d="M16 15v-4" />
              </svg>
              Reports
            </div>
          </div>
          <div class="sidebar-label">Operations</div>
          <div class="sidebar-section">
            <div class="sidebar-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 2v4" />
                <path d="M12 18v4" />
                <path d="M4.93 4.93l2.83 2.83" />
                <path d="M16.24 16.24l2.83 2.83" />
                <path d="M2 12h4" />
                <path d="M18 12h4" />
                <path d="M4.93 19.07l2.83-2.83" />
                <path d="M16.24 7.76l2.83-2.83" />
              </svg>
              Automations
            </div>
            <div class="sidebar-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 3l7 3v6c0 4.5-3.1 7.6-7 9-3.9-1.4-7-4.5-7-9V6l7-3z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              Health
            </div>
            <div class="sidebar-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.7 1.7 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .3 1.7 1.7 0 0 0-.84 1.47V21a2 2 0 1 1-4 0v-.08a1.7 1.7 0 0 0-.84-1.47 1.7 1.7 0 0 0-1-.3 1.7 1.7 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.3-1 1.7 1.7 0 0 0-1.47-.84H3a2 2 0 1 1 0-4h.08a1.7 1.7 0 0 0 1.47-.84 1.7 1.7 0 0 0 .3-1 1.7 1.7 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6c.33 0 .66-.1 1-.3A1.7 1.7 0 0 0 10.84 2.8V2a2 2 0 1 1 4 0v.08c0 .62.33 1.2.84 1.47.34.2.67.3 1 .3a1.7 1.7 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c0 .33.1.66.3 1 .2.33.3.66.3 1s-.1.66-.3 1-.3.67-.3 1z" />
              </svg>
              Settings
            </div>
          </div>
        </ui-layout-sidebar>
        <ui-layout-main style="padding: 20px; background: hsl(var(--muted) / 0.12);">
          <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px;">
            \${['Latency', 'Throughput', 'Errors'].map(label => html\`
              <div style="padding: 16px; border-radius: 10px; border: 1px solid hsl(var(--border)); background: hsl(var(--background));">
                <div style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">\${label}</div>
                <div style="font-size: 1.4rem; font-weight: 600; margin-top: 6px;">\${label === 'Errors' ? '0.04%' : '42.8ms'}</div>
              </div>
            \`)}
          </div>
          <div style="margin-top: 16px; padding: 18px; border-radius: 12px; border: 1px dashed hsl(var(--border)); background: hsl(var(--background));">
            <strong style="display: block; margin-bottom: 8px;">Release timeline</strong>
            <div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px;">
              \${['Research', 'Build', 'Launch', 'Review'].map(stage => html\`
                <div style="padding: 10px 12px; border-radius: 999px; background: hsl(var(--muted) / 0.25); text-align: center; font-size: 0.78rem;">
                  \${stage}
                </div>
              \`)}
            </div>
          </div>
        </ui-layout-main>
      </ui-layout>
      <ui-layout-footer>
        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem;">
          <span>Last sync 2 minutes ago</span>
          <span>12 active services</span>
        </div>
      </ui-layout-footer>
    </ui-layout>
  \`
}`,...(h=(u=t.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var v,c,g;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => html\`
    <ui-layout direction="horizontal" style="height: 360px; border: 1px solid hsl(var(--border)); border-radius: 12px; overflow: hidden;">
      <ui-layout-main style="padding: 24px;">
        <div style="max-width: 320px;">
          <div style="font-size: 0.75rem; color: hsl(var(--muted-foreground)); text-transform: uppercase; letter-spacing: 0.08em;">Campaign</div>
          <h3 style="margin: 8px 0 12px; font-size: 1.3rem;">Launch the winter catalog</h3>
          <p style="margin: 0; color: hsl(var(--muted-foreground)); line-height: 1.5;">Draft messaging, coordinate handoff with design, and prepare the launch checklist.</p>
          <div style="display: flex; gap: 8px; margin-top: 14px;">
            <span style="padding: 6px 10px; border-radius: 999px; background: hsl(var(--muted) / 0.2);">In progress</span>
            <span style="padding: 6px 10px; border-radius: 999px; background: hsl(var(--muted) / 0.2);">Due Friday</span>
          </div>
        </div>
      </ui-layout-main>
      <ui-layout-sidebar style="width: 45%; padding: 24px; background: hsl(var(--muted) / 0.12); color: hsl(var(--foreground));">
        <div style="display: grid; gap: 10px;">
          \${['Brief review', 'Legal signoff', 'Content QA', 'Schedule'].map((task, index) => html\`
            <div style="padding: 12px 14px; border-radius: 10px; background: hsl(var(--background)); border: 1px solid hsl(var(--border));">
              <div style="font-size: 0.78rem; color: hsl(var(--muted-foreground));">Step \${index + 1}</div>
              <div style="font-weight: 600; margin-top: 4px;">\${task}</div>
            </div>
          \`)}
        </div>
      </ui-layout-sidebar>
    </ui-layout>
  \`
}`,...(g=(c=a.parameters)==null?void 0:c.docs)==null?void 0:g.source}}};var y,x,m;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => html\`
    <ui-layout direction="vertical" style="height: 380px; border: 1px solid hsl(var(--border)); border-radius: 12px; overflow: hidden;">
      <ui-layout-header>
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <strong>Studio</strong>
          <span style="font-size: 0.8rem; color: hsl(var(--muted-foreground));">3 drafts</span>
        </div>
      </ui-layout-header>
      <ui-layout-main style="padding: 18px; background: hsl(var(--muted) / 0.1);">
        <div style="display: grid; gap: 12px;">
          \${['Hero concept', 'Product grid', 'CTA experiments'].map(item => html\`
            <div style="padding: 16px; border-radius: 12px; background: hsl(var(--background)); border: 1px solid hsl(var(--border));">
              <div style="font-weight: 600;">\${item}</div>
              <div style="margin-top: 6px; font-size: 0.85rem; color: hsl(var(--muted-foreground));">Updated 2 hours ago</div>
            </div>
          \`)}
        </div>
      </ui-layout-main>
      <ui-layout-footer>
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 0.85rem;">Auto-save enabled</span>
          <span style="padding: 4px 10px; border-radius: 999px; background: hsl(var(--muted) / 0.2);">Preview</span>
        </div>
      </ui-layout-footer>
    </ui-layout>
  \`
}`,...(m=(x=d.parameters)==null?void 0:x.docs)==null?void 0:m.source}}};var b,f,k;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => html\`
    <ui-layout direction="horizontal" style="height: 360px; border: 1px solid hsl(var(--border)); border-radius: 12px; overflow: hidden;">
      <ui-layout-main style="padding: 0;">
        <div style="height: 100%; background: linear-gradient(135deg, hsl(var(--muted) / 0.5), hsl(var(--muted) / 0.1)); display: grid; place-items: center;">
          <div style="width: 70%; height: 60%; border-radius: 18px; border: 1px dashed hsl(var(--border)); display: grid; place-items: center; color: hsl(var(--muted-foreground));">
            Media preview
          </div>
        </div>
      </ui-layout-main>
      <ui-layout-sidebar style="width: 260px; background: hsl(var(--background)); color: hsl(var(--foreground)); padding: 18px; border-left: 1px solid hsl(var(--border));">
        <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: hsl(var(--muted-foreground));">Details</div>
        <h4 style="margin: 8px 0 12px;">Summer reel</h4>
        <div style="display: grid; gap: 8px; font-size: 0.85rem;">
          <div style="display: flex; justify-content: space-between;"><span>Duration</span><span>38s</span></div>
          <div style="display: flex; justify-content: space-between;"><span>Format</span><span>MP4</span></div>
          <div style="display: flex; justify-content: space-between;"><span>Status</span><span>Ready</span></div>
        </div>
        <div style="margin-top: 16px; padding: 12px; border-radius: 10px; background: hsl(var(--muted) / 0.2); font-size: 0.8rem;">
          Drop assets here to update the preview.
        </div>
      </ui-layout-sidebar>
    </ui-layout>
  \`
}`,...(k=(f=o.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};const L=["Playground","AppShell","SplitFocus","VerticalStacks","MediaPanel"];export{t as AppShell,o as MediaPanel,i as Playground,a as SplitFocus,d as VerticalStacks,L as __namedExportsOrder,V as default};
