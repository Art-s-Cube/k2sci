module.exports = {
  extends: ['plugin:hydrogen/recommended'],
  rules: {
    'hydrogen/prefer-image-component': 'on',
    'no-useless-escape': 'on',
    'no-case-declarations': 'off',
    // TODO: Remove jest plugin from hydrogen/eslint-plugin
    'jest/no-deprecated-functions': 'off',
  },
};
