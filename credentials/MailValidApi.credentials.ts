import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class MailValidApi implements ICredentialType {
	name = 'mailValidApi';

	displayName = 'MailValid API';

	icon: Icon = { light: 'file:mailvalid.svg', dark: 'file:mailvalid.dark.svg' };

	documentationUrl = 'https://mailvalid.io/docs/';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description:
				'Your MailValid API key (starts with mv_live_). Create one at https://mailvalid.io/dashboard/api-keys — new accounts get 100 free credits.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://mailvalid.io/api/v1',
			url: '/credits',
		},
	};
}
