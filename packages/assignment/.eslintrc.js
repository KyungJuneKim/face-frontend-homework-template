module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@emotion', '@typescript-eslint', 'prettier', 'react-hooks'],
  extends: ['airbnb', 'prettier', 'plugin:@typescript-eslint/recommended'],
  rules: {
    '@emotion/syntax-preference': ['error', 'object'],
    '@emotion/no-vanilla': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'max-lines': ['warn', { skipComments: true }],
    'max-lines-per-function': ['warn', { max: 200, skipComments: true }],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsForRegex: ['^draft$', 'Draft$'],
      },
    ],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-fragments': ['error', 'element'],
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': [
      'warn',
      { additionalHooks: 'useRecoilCallback' },
    ],
  },
};
