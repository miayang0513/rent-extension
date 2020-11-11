module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    // "space-before-function-paren": ["error", {
    //   "anonymous": "always",
    //   "named": "always",
    //   "asyncArrow": "always"
    // }]
  }
}