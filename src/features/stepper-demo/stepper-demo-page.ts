import { BaseComponent } from '../../core/base-component';
import { stepperDemoHTML } from './stepper-demo-page.html';
import { stepperDemoCSS } from './stepper-demo-page.css';
import '../../shared/components/button';
import '../../shared/components/stepper';
import '../../layouts/app-layout';

const interactiveSteps = [
	{ title: 'Project setup', description: 'Name, team, and scope' },
	{ title: 'Permissions', description: 'Invite collaborators' },
	{ title: 'Brand kit', description: 'Logo and colors' },
	{ title: 'Integrations', description: 'Connect tools' },
	{ title: 'Launch', description: 'Review and publish' }
];

const compactSteps = [
	{ title: 'Connect' },
	{ title: 'Customize' },
	{ title: 'Publish' }
];

const verticalSteps = [
	{ title: 'Account details', description: 'Personal information' },
	{ title: 'Billing', description: 'Plan and payment method' },
	{ title: 'Security', description: 'Password and MFA' },
	{ title: 'Preferences', description: 'Notifications and access' }
];

const statusSteps = [
	{ title: 'Collect data', description: 'Import the latest dataset', state: 'complete' },
	{ title: 'Validate', description: 'Spot missing fields', state: 'warning' },
	{ title: 'Resolve issues', description: 'Fix invalid entries', state: 'error' },
	{ title: 'Publish', description: 'Share with the team', state: 'upcoming' }
];

const interactiveContent = [
	{
		title: 'Project setup',
		copy: 'Create the workspace, define the team, and lock in the scope.',
		bullets: ['Workspace name + region', 'Invite core collaborators', 'Set the delivery timeline']
	},
	{
		title: 'Permissions',
		copy: 'Assign roles and access boundaries for internal and external teams.',
		bullets: ['Owner and editor roles', 'Approval workflows', 'Audit logging enabled']
	},
	{
		title: 'Brand kit',
		copy: 'Upload logo assets and align the design system palette.',
		bullets: ['Primary + accent colors', 'Typography presets', 'Asset library sync']
	},
	{
		title: 'Integrations',
		copy: 'Connect your analytics, CRM, and deployment pipelines.',
		bullets: ['Analytics provider', 'CRM webhooks', 'CI/CD automation']
	},
	{
		title: 'Launch',
		copy: 'Finalize content and publish to production.',
		bullets: ['Final review checklist', 'Stakeholder sign-off', 'Go-live switch']
	}
];

class StepperDemoPage extends BaseComponent {
	private activeIndex = 2;

	async connectedCallback(): Promise<void> {
		super.connectedCallback();
		await customElements.whenDefined('ui-stepper');
		this.render();
		this.setupSteppers();
		this.setupControls();
	}

	private setupSteppers(): void {
		const interactive = this.shadowRoot!.getElementById('interactiveStepper') as HTMLElement | null;
		const compact = this.shadowRoot!.getElementById('compactStepper') as HTMLElement | null;
		const vertical = this.shadowRoot!.getElementById('verticalStepper') as HTMLElement | null;
		const status = this.shadowRoot!.getElementById('statusStepper') as HTMLElement | null;

		interactive?.setAttribute('steps', JSON.stringify(interactiveSteps));
		interactive?.setAttribute('active', String(this.activeIndex));

		compact?.setAttribute('steps', JSON.stringify(compactSteps));
		compact?.setAttribute('active', '2');

		vertical?.setAttribute('steps', JSON.stringify(verticalSteps));
		vertical?.setAttribute('active', '3');

		status?.setAttribute('steps', JSON.stringify(statusSteps));
		status?.setAttribute('active', '2');
	}

	private setupControls(): void {
		const prev = this.shadowRoot!.getElementById('prevStep');
		const next = this.shadowRoot!.getElementById('nextStep');
		const interactive = this.shadowRoot!.getElementById('interactiveStepper') as HTMLElement | null;

		const updateStatus = () => {
			const status = this.shadowRoot!.getElementById('interactiveStatus');
			const content = this.shadowRoot!.getElementById('interactiveContent');
			if (status) status.textContent = `Step ${this.activeIndex} of ${interactiveSteps.length}`;
			if (interactive) interactive.setAttribute('active', String(this.activeIndex));
			if (content) {
				const step = interactiveContent[this.activeIndex - 1];
				content.innerHTML = `
					<h3>${step.title}</h3>
					<p>${step.copy}</p>
					<ul>${step.bullets.map(item => `<li>${item}</li>`).join('')}</ul>
				`;
			}
		};

		prev?.addEventListener('click', () => {
			this.activeIndex = Math.max(1, this.activeIndex - 1);
			updateStatus();
		});

		next?.addEventListener('click', () => {
			this.activeIndex = Math.min(interactiveSteps.length, this.activeIndex + 1);
			updateStatus();
		});

		interactive?.addEventListener('step-change', (event: Event) => {
			const detail = (event as CustomEvent).detail as { index: number } | undefined;
			if (detail?.index) {
				this.activeIndex = detail.index;
				updateStatus();
			}
		});

		updateStatus();
	}

	render(): void {
		this.shadowRoot!.innerHTML = `
			<style>${stepperDemoCSS}</style>
			${stepperDemoHTML}
		`;
	}
}

customElements.define('stepper-demo-page', StepperDemoPage);
