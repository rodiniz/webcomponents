import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/shared/components/tooltip';

type TooltipArgs = {
  text: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  trigger: 'hover' | 'click';
  disabled: boolean;
};

const meta: Meta<TooltipArgs> = {
  title: 'Components/Tooltip',
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Tooltip text content'
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip position relative to trigger'
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click'],
      description: 'How to trigger the tooltip'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the tooltip'
    }
  },
  args: {
    text: 'This is a tooltip',
    position: 'top',
    trigger: 'hover',
    disabled: false
  }
};

export default meta;
type Story = StoryObj<TooltipArgs>;

export const Playground: Story = {
  render: ({ text, position, trigger, disabled }) => html`
    <div style="padding: 2rem; display: flex; justify-content: center; align-items: center;">
      <div style="position: relative;">
        <ui-button variant="primary">Hover me</ui-button>
        <ui-tooltip
          text=${text}
          position=${position}
          trigger=${trigger}
          ?disabled=${disabled}
        ></ui-tooltip>
      </div>
    </div>
  `
};

export const Positions: Story = {
  render: () => html`
    <div style="padding: 2rem; display: grid; grid-template-columns: repeat(2, 1fr); gap: 4rem; justify-items: center; align-items: center;">
      <div style="position: relative;">
        <ui-button variant="primary">Top</ui-button>
        <ui-tooltip text="Tooltip on top" position="top" trigger="hover"></ui-tooltip>
      </div>
      <div style="position: relative;">
        <ui-button variant="primary">Bottom</ui-button>
        <ui-tooltip text="Tooltip on bottom" position="bottom" trigger="hover"></ui-tooltip>
      </div>
      <div style="position: relative;">
        <ui-button variant="primary">Left</ui-button>
        <ui-tooltip text="Tooltip on left" position="left" trigger="hover"></ui-tooltip>
      </div>
      <div style="position: relative;">
        <ui-button variant="primary">Right</ui-button>
        <ui-tooltip text="Tooltip on right" position="right" trigger="hover"></ui-tooltip>
      </div>
    </div>
  `
};

export const HoverTrigger: Story = {
  render: () => html`
    <div style="padding: 2rem; text-align: center;">
      <p style="margin-bottom: 1rem; color: gray;">Hover over the button to see the tooltip</p>
      <div style="position: relative; display: inline-block;">
        <ui-button variant="secondary">Hover Trigger</ui-button>
        <ui-tooltip text="This tooltip appears on hover" position="top" trigger="hover"></ui-tooltip>
      </div>
    </div>
  `
};

export const ClickTrigger: Story = {
  render: () => html`
    <div style="padding: 2rem; text-align: center;">
      <p style="margin-bottom: 1rem; color: gray;">Click the button to toggle the tooltip</p>
      <div style="position: relative; display: inline-block;">
        <ui-button variant="secondary">Click Trigger</ui-button>
        <ui-tooltip text="This tooltip appears on click" position="top" trigger="click"></ui-tooltip>
      </div>
    </div>
  `
};

export const Disabled: Story = {
  render: () => html`
    <div style="padding: 2rem; text-align: center;">
      <p style="margin-bottom: 1rem; color: gray;">Tooltip is disabled</p>
      <div style="position: relative; display: inline-block;">
        <ui-button variant="secondary" disabled>Disabled</ui-button>
        <ui-tooltip text="This tooltip is disabled" position="top" trigger="hover" disabled></ui-tooltip>
      </div>
    </div>
  `
};

export const LongContent: Story = {
  render: () => html`
    <div style="padding: 2rem; display: flex; justify-content: center; align-items: center;">
      <div style="position: relative;">
        <ui-button variant="primary">Hover for info</ui-button>
        <ui-tooltip
          text="This is a longer tooltip with more detailed information about the action"
          position="top"
          trigger="hover"
        ></ui-tooltip>
      </div>
    </div>
  `
};
