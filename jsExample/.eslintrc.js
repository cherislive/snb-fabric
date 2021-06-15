module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {},
};

// const path = require('path');

// console.log(require.resolve(path.join(__dirname, '../', 'dist/eslint')));
// module.exports = {
//   extends: [require.resolve(path.join(__dirname, '../', 'dist/eslint'))],
//   globals: {
//     page: true,
//   },
//   rules: {
//     'no-console': 1,
//     'no-unused-vars': 0,
//     'no-redeclare': 0,
//     'no-empty-character-class': 0,
//     'no-misleading-character-class': 0,
//     'no-dupe-keys': 0,
//     'no-control-regex': 0,
//     'object-shorthand': 0,
//     'no-script-url': 0,
//     'no-restricted-globals': 0,
//     'no-global-assign': 0,
//   },
// };
