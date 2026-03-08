import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/shared/components/button';
import { ICONS, ICON_ALIASES } from '../src/lib/icons';

type IconStoryArgs = {
  search: string;
};

const meta: Meta<IconStoryArgs> = {
  title: 'Components/Icons',
  tags: ['autodocs'],
  argTypes: {
    search: { control: 'text' }
  },
  args: {
    search: ''
  }
};

export default meta;

type Story = StoryObj<IconStoryArgs>;

export const AllIcons: Story = {
  render: ({ search }) => {
    const filteredIcons = search 
      ? ICONS.filter(icon => icon.toLowerCase().includes(search.toLowerCase()))
      : ICONS;
    
    return html`
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px;">
        ${filteredIcons.map(icon => html`
          <div style="display: flex; flex-direction: column; align-items: center; padding: 12px; border: 1px solid #eee; border-radius: 8px;">
            <ui-button variant="ghost" size="sm" icon=${icon}></ui-button>
            <span style="margin-top: 8px; font-size: 11px; color: #666; text-align: center; word-break: break-all;">${icon}</span>
          </div>
        `)}
      </div>
    `
  }
};

export const IconAliases: Story = {
  render: () => {
    const examples = [
      { alias: 'success', icon: ICON_ALIASES.success },
      { alias: 'error', icon: ICON_ALIASES.error },
      { alias: 'warning', icon: ICON_ALIASES.warning },
      { alias: 'info', icon: ICON_ALIASES.info },
      { alias: 'close', icon: ICON_ALIASES.close },
      { alias: 'delete', icon: ICON_ALIASES.delete },
      { alias: 'edit', icon: ICON_ALIASES.edit },
      { alias: 'settings', icon: ICON_ALIASES.settings },
    ];
    
    return html`
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        ${examples.map(({ alias, icon }) => html`
          <div style="display: flex; align-items: center; gap: 8px; padding: 8px 16px; border: 1px solid #eee; border-radius: 8px;">
            <ui-button variant="primary" size="sm" icon=${icon}></ui-button>
            <code style="font-size: 13px;">${alias}</code>
          </div>
        `)}
      </div>
      <p style="margin-top: 16px; font-size: 14px; color: #666;">
        Use <code>ICON_ALIASES.aliasName</code> for semantic icon names.
      </p>
    `
  }
};
