module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'eslint:recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 0,
    'react/jsx-one-expression-per-line': [0, { allow: 'single-child' }],
    'no-console': 'off',
    'react/prefer-stateless-function': [0, { ignoreComponents: true }],
    'react/destructuring-assignment': [0, 'never', { ignoreClassFields: true }],
    'no-param-reassign': 'off',
    'linebreak-style': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'max-len': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};