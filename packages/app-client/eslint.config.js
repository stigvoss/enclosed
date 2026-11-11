import antfu from '@antfu/eslint-config';

export default antfu({
  stylistic: {
    semi: true,
  },

  rules: {
    // Would reformat most of the code base without improving it
    'antfu/reasonable-newline': 'off',
    // The catalog is not enforced in package.json files
    'pnpm/json-enforce-catalog': 'off',
    // Keeps the shadcn-style component types as upstream formats them
    'style/operator-linebreak': 'off',
    // To allow export on top of files
    'ts/no-use-before-define': ['error', { allowNamedExports: true, functions: false }],
    'curly': ['error', 'all'],
    'vitest/consistent-test-it': ['error', { fn: 'test' }],
    'ts/consistent-type-definitions': ['error', 'type'],
    'style/brace-style': ['error', '1tbs', { allowSingleLine: false }],
    'unused-imports/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
    }],
  },
});
