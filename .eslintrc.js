module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
	},
	ignorePatterns: ['dist/**', 'node_modules/**', 'scripts/**'],
	overrides: [
		{
			files: ['./credentials/**/*.ts'],
			plugins: ['eslint-plugin-n8n-nodes-base'],
			extends: ['plugin:n8n-nodes-base/credentials'],
			rules: {
				// This rule wants a camelCase docs-site slug and is, per its own
				// description, "only applicable to nodes in the main repository".
				// Community nodes must use a full HTTP URL (enforced by the
				// sibling rule cred-class-field-documentation-url-not-http-url).
				'n8n-nodes-base/cred-class-field-documentation-url-miscased': 'off',
			},
		},
		{
			files: ['./nodes/**/*.ts'],
			plugins: ['eslint-plugin-n8n-nodes-base'],
			extends: ['plugin:n8n-nodes-base/nodes'],
		},
	],
};
