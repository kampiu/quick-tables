module.exports = {
	extends: [
		"airbnb",
		"prettier",
		"plugin:compat/recommended",
		"plugin:react/recommended",
		"plugin:import/typescript",
		"plugin:markdown/recommended",
	],
	env: {
		browser: true,
		node: true,
		jasmine: true,
		es6: true,
	},
	settings: {
		react: {
			version: "detect",
		},
		polyfills: ["Promise", "URL"],
		"import/resolver": {
			typescript: {},
		},
	},
	parser: "@typescript-eslint/parser",
	plugins: ["react", "@babel", "@typescript-eslint", "react-hooks", "unicorn", "markdown"], // https://github.com/typescript-eslint/typescript-eslint/issues/46#issuecomment-470486034
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			rules: {
				"@typescript-eslint/no-unused-vars": [2, { args: "none" }],
				"no-unused-expressions": "off",
				"@typescript-eslint/no-unused-expressions": 2,
				"@typescript-eslint/consistent-type-imports": [
					2,
					{ disallowTypeAnnotations: false },
				],
			},
		},
		{
			// In v2, explicitly apply eslint-plugin-markdown's `markdown`
			// processor on any Markdown files you want to lint.
			files: ["components/*/demo/*.md"],
			processor: "markdown/markdown",
		},
		{
			files: ["components/**/demo/*.tsx"],
			rules: {
				"import/no-extraneous-dependencies": 0,
				"no-console": 0,
				"compat/compat": 0,
				"react/no-unstable-nested-components": 0,
				"jsx-a11y/control-has-associated-label": 0,
				"class-methods-use-this": 0,
				"react/no-access-state-in-setstate": 0,
			},
		},
	],
	rules: {
		"react/jsx-one-expression-per-line": 0,
		"react/prop-types": 0,
		"react/forbid-prop-types": 0,
		"react/jsx-indent": 0,
		"react/jsx-wrap-multilines": ["error", { declaration: false, assignment: false }],
		"react/jsx-filename-extension": 0,
		"react/state-in-constructor": 0,
		"react/jsx-props-no-spreading": 0,
		"react/destructuring-assignment": 0, // TODO: remove later
		"react/require-default-props": 0,
		"react/sort-comp": 0,
		"react/display-name": 0,
		"react/static-property-placement": 0,
		"react/jsx-no-bind": 0, // Should not check test file
		"react/no-find-dom-node": 0,
		"react/no-unused-prop-types": 0,
		"react/default-props-match-prop-types": 0,
		"react-hooks/rules-of-hooks": 2, // Checks rules of Hooks
		"react/function-component-definition": 0,
		"react/no-unused-class-component-methods": 0,
		"import/extensions": 0,
		"import/no-cycle": 0,
		"import/no-extraneous-dependencies": [
			0,
			{
				devDependencies: [
					"site/**",
					"tests/**",
					"scripts/**",
					"**/*.test.js",
					"**/__tests__/*",
					"*.config.js",
					"**/*.md",
				],
			},
		],
		"jsx-a11y/no-static-element-interactions": 0,
		"jsx-a11y/anchor-has-content": 0,
		"jsx-a11y/click-events-have-key-events": 0,
		"jsx-a11y/anchor-is-valid": 0,
		"jsx-a11y/no-noninteractive-element-interactions": 0,
		"jsx-a11y/label-has-for": 0,
		"comma-dangle": ["error", "always-multiline"],
		"consistent-return": 0,
		"no-param-reassign": 0,
		"no-underscore-dangle": 0,
		"no-plusplus": 0,
		"no-continue": 0,
		"no-restricted-globals": 0,
		"max-classes-per-file": 0,
		"unicorn/better-regex": 2,
		"unicorn/prefer-string-trim-start-end": 2,
		"unicorn/expiring-todo-comments": 2,
		"unicorn/no-abusive-eslint-disable": 0,
		indent: [
			2,
			"tab",
			{
				SwitchCase: 1,
			},
		], // 强制使用一致的缩进
		"jsx-quotes": [2, "prefer-double"], // 强制在 JSX 属性中使用一致的单引号或双引号
		"no-use-before-define": 0,
		"@typescript-eslint/no-use-before-define": 2,
		"no-shadow": 0,
		"@typescript-eslint/no-shadow": [2, { ignoreTypeValueShadow: true }],
		"no-undef": 0,
	},
	globals: {
		gtag: true,
	},
}
