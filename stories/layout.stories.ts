import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/shared/components/layout';
import { renderIcon } from '../src/core/icon-helpers';

type LayoutArgs = {
  direction: 'auto' | 'horizontal' | 'vertical';
};

const meta: Meta<LayoutArgs> = {
  title: 'Components/Layout',
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['auto', 'horizontal', 'vertical'] }
  },
  args: {
    direction: 'vertical'
  }
};

export default meta;

type Story = StoryObj<LayoutArgs>;

export const Playground: Story = {
  render: ({ direction }) => html`
    <ui-layout direction=${direction} style="height: 360px; border: 1px solid hsl(var(--border)); border-radius: 8px; overflow: hidden;">
      <ui-layout-header>Header</ui-layout-header>
      <ui-layout direction="horizontal" style="flex: 1;">
        <ui-layout-sidebar style="width: 180px;">Sidebar</ui-layout-sidebar>
        <ui-layout-main style="padding: 16px;">Main content</ui-layout-main>
      </ui-layout>
      <ui-layout-footer>Footer</ui-layout-footer>
    </ui-layout>
  `
};

export const AppShell: Story = {
  render: () => html`
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
              ${renderIcon('home', { width: 16, height: 16 })}
              Overview
            </div>
            <div class="sidebar-item">
              ${renderIcon('grid', { width: 16, height: 16 })}
              Inventory
            </div>
            <div class="sidebar-item">
              ${renderIcon('bar-chart-2', { width: 16, height: 16 })}
              Reports
            </div>
          </div>
          <div class="sidebar-label">Operations</div>
          <div class="sidebar-section">
            <div class="sidebar-item">
              ${renderIcon('activity', { width: 16, height: 16 })}
              Automations
            </div>
            <div class="sidebar-item">
              ${renderIcon('shield', { width: 16, height: 16 })}
              Health
            </div>
            <div class="sidebar-item">
              ${renderIcon('settings', { width: 16, height: 16 })}
              Settings
            </div>
          </div>
        </ui-layout-sidebar>
        <ui-layout-main style="padding: 20px; background: hsl(var(--muted) / 0.12);">
          <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px;">
            ${['Latency', 'Throughput', 'Errors'].map(label => html`
              <div style="padding: 16px; border-radius: 10px; border: 1px solid hsl(var(--border)); background: hsl(var(--background));">
                <div style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">${label}</div>
                <div style="font-size: 1.4rem; font-weight: 600; margin-top: 6px;">${label === 'Errors' ? '0.04%' : '42.8ms'}</div>
              </div>
            `)}
          </div>
          <div style="margin-top: 16px; padding: 18px; border-radius: 12px; border: 1px dashed hsl(var(--border)); background: hsl(var(--background));">
            <strong style="display: block; margin-bottom: 8px;">Release timeline</strong>
            <div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px;">
              ${['Research', 'Build', 'Launch', 'Review'].map(stage => html`
                <div style="padding: 10px 12px; border-radius: 999px; background: hsl(var(--muted) / 0.25); text-align: center; font-size: 0.78rem;">
                  ${stage}
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
  `
};

export const SplitFocus: Story = {
  render: () => html`
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
          ${['Brief review', 'Legal signoff', 'Content QA', 'Schedule'].map((task, index) => html`
            <div style="padding: 12px 14px; border-radius: 10px; background: hsl(var(--background)); border: 1px solid hsl(var(--border));">
              <div style="font-size: 0.78rem; color: hsl(var(--muted-foreground));">Step ${index + 1}</div>
              <div style="font-weight: 600; margin-top: 4px;">${task}</div>
            </div>
          `)}
        </div>
      </ui-layout-sidebar>
    </ui-layout>
  `
};

export const VerticalStacks: Story = {
  render: () => html`
    <ui-layout direction="vertical" style="height: 380px; border: 1px solid hsl(var(--border)); border-radius: 12px; overflow: hidden;">
      <ui-layout-header>
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <strong>Studio</strong>
          <span style="font-size: 0.8rem; color: hsl(var(--muted-foreground));">3 drafts</span>
        </div>
      </ui-layout-header>
      <ui-layout-main style="padding: 18px; background: hsl(var(--muted) / 0.1);">
        <div style="display: grid; gap: 12px;">
          ${['Hero concept', 'Product grid', 'CTA experiments'].map(item => html`
            <div style="padding: 16px; border-radius: 12px; background: hsl(var(--background)); border: 1px solid hsl(var(--border));">
              <div style="font-weight: 600;">${item}</div>
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
  `
};

export const MediaPanel: Story = {
  render: () => html`
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
  `
};
