module.exports = {
  root: true,
  rules: {
    quotes: [2, 'single'],
    'unused-imports/no-unused-imports-ts': 2,
  },
  env: {
    node: true,
    browser: true,
  },
  globals: {
    test: true,
  },
  plugins: ['@typescript-eslint', 'unused-imports'],
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
};
