module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'react',
    'react-hooks',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: {},
      node: true,
    },
  },
  rules: {
    'semi': ['error', 'always'],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        pathGroups: [
          { pattern: 'react', group: 'external', position: 'before' },
          { pattern: '@/**', group: 'internal', position: 'after' },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
        warnOnUnassignedImports: false,
      },
    ],
  },
  ignorePatterns: ['node_modules/', 'dist/', '.expo/', '*.cjs'],
};
