import type { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class MailValid implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'MailValid',
		name: 'mailValid',
		icon: 'file:mailvalid.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description:
			'Verify email addresses with MailValid: syntax, DNS/MX, SMTP mailbox checks, disposable and role-based detection',
		defaults: {
			name: 'MailValid',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'mailValidApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://mailvalid.io/api/v1',
			headers: {
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get Bulk Job',
						value: 'getBulkJob',
						action: 'Get the status and results of a bulk verification job',
						routing: {
							request: {
								method: 'GET',
								url: '=/verify/bulk/{{$parameter.jobId}}',
							},
						},
					},
					{
						name: 'Get Credit Balance',
						value: 'getCredits',
						action: 'Get your current credit balance',
						routing: {
							request: {
								method: 'GET',
								url: '/credits',
							},
						},
					},
					{
						name: 'Submit Bulk Job',
						value: 'submitBulk',
						action: 'Submit a list of emails for asynchronous verification',
						routing: {
							request: {
								method: 'POST',
								url: '/verify/bulk',
								body: {
									emails:
										'={{ $parameter["emails"].split(/[\\s,;]+/).filter((e) => e.length > 0) }}',
									webhook_url: '={{ $parameter["webhookUrl"] || undefined }}',
								},
							},
						},
					},
					{
						name: 'Verify Email',
						value: 'verifyEmail',
						action: 'Verify a single email address',
						routing: {
							request: {
								method: 'POST',
								url: '/verify/single',
								body: {
									email: '={{ $parameter["email"] }}',
								},
							},
						},
					},
				],
				default: 'verifyEmail',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'name@example.com',
				description: 'The email address to verify. Costs 1 credit per fresh billable result.',
				displayOptions: {
					show: {
						operation: ['verifyEmail'],
					},
				},
			},
			{
				displayName: 'Emails',
				name: 'emails',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				required: true,
				default: '',
				placeholder: 'a@example.com, b@example.com',
				description:
					'Email addresses to verify, separated by commas, semicolons, or newlines. Poll the job with Get Bulk Job or pass a webhook URL.',
				displayOptions: {
					show: {
						operation: ['submitBulk'],
					},
				},
			},
			{
				displayName: 'Webhook URL',
				name: 'webhookUrl',
				type: 'string',
				default: '',
				placeholder: 'https://example.com/hooks/mailvalid',
				description:
					'Optional URL that receives a POST notification when the bulk job completes',
				displayOptions: {
					show: {
						operation: ['submitBulk'],
					},
				},
			},
			{
				displayName: 'Job ID',
				name: 'jobId',
				type: 'string',
				required: true,
				default: '',
				placeholder: '4e9f6c1a-1234-4a5b-8cde-0123456789ab',
				description: 'The ID of the bulk verification job, as returned by Submit Bulk Job',
				displayOptions: {
					show: {
						operation: ['getBulkJob'],
					},
				},
			},
		],
	};
}
