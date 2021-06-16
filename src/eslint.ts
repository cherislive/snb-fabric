/** @format */
import * as path from 'path';
import * as fs from 'fs';
// import tsEslintConfig from './tsEslintConfig';

const isTsProject = fs.existsSync(path.join(process.cwd() || '.', './tsconfig.json'));

const isJsMoreTs = async (path = 'src') => {
  const fg = require('fast-glob');
  const jsFiles = await fg(`${path}/src/**/*.{js,jsx}`, { deep: 3 });
  const tsFiles = await fg(`${path}/src/**/*.{ts,tsx}`, { deep: 3 });
  return jsFiles.length > tsFiles.length;
};

if (isTsProject) {
  try {
    isJsMoreTs(process.cwd()).then((jsMoreTs) => {
      if (!jsMoreTs) return;
      console.log('这是一个 TypeScript 项目，如果不是请删除 tsconfig.json');
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  root: true,
  globals: {
    page: true,
    Vue: false,
    _: false,
    $: true,
    test: false,
    expect: false,
    describe: false,
    afterEach: false,
    beforeEach: false,
    it: false,
    jest: false,
    publicPath: false,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    // mocha: true,
    // jest: true,
    // jasmine: true,
    // jquery: true,
  },
  extends: [
    'eslint:recommended',
    // 'prettier',
    'airbnb-base',
    // '@vue/standard',
    'plugin:vue/essential',
    'plugin:vue/recommended',
    'plugin:sonarjs/recommended',
    // "plugin:vue/vue3-recommended"
  ],
  plugins: ['json', 'sonarjs'],
  parserOptions: {
    // "parser": "babel-eslint",
    parser: isTsProject ? '@typescript-eslint/parser' : '@babel/eslint-parser',
    sourceType: 'module',
    ecmaVersion: 8,
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      jsx: true,
    },
    codeFrame: false,
  },
  rules: {
    'no-return-await': 'off',
    'import/no-unresolved': 0,
    indent: [
      'warn',
      2,
      {
        // 缩进
        SwitchCase: 1,
        ignoredNodes: ['TemplateLiteral'],
      },
    ],
    'no-console': 1,
    'template-curly-spacing': 'off', // 保持模板文字内部空间的一致性
    'no-restricted-globals': ['error', 'event', 'fdescribe'], // 该规则允许您指定您不希望在应用程序中使用的全局变量名称。
    // "quotes": ["error", "single"],
    quotes: [
      // 此规则强制一致使用反引号，双引号或单引号
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    semi: ['error', 'always'],
    // 'semi': [
    //   2,
    //   'never',
    //   {
    //     'beforeStatementContinuationChars': 'never'
    //   }
    // ],
    'max-len': ['error', { code: 150 }], // 此规则强制执行最大行长度以增加代码的可读性和可维护性。一行的长度定义为该行中的 Unicode 字符数。
    'no-unused-expressions': [
      2,
      {
        // 该规则旨在消除对程序状态没有影响的未使用的表达式
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    'prefer-destructuring': ['error', { object: true, array: false }], // 强制使用解构而不是通过成员表达式访问属性
    'func-names': ['error', 'as-needed'], // 强制或禁止使用命名函数表达式 如果名称不能在 ES6 环境中自动分配，则要求函数表达式具有名称
    'no-param-reassign': ['error', { props: false }], // 规则旨在防止由功能参数的修改或重新分配引起的意外行为
    'no-unused-vars': ['error', { vars: 'local', args: 'none' }], // 该规则旨在消除未使用的变量，函数和函数的参数。
    'one-var-declaration-per-line': ['error', 'initializations'], // 规则在变量声明周围执行一致的换行符。这条规则忽略了for循环条件中的变量声明。
    'one-var': 'off',
    // "camelcase": "off",
    'no-shadow': 'off', // 该规则旨在消除阴影变量声明
    // "no-continue": "off",
    // "no-plusplus": "off",
    // "operator-linebreak": "off",
    'no-restricted-syntax': 'off', // 此规则不允许指定（即用户定义）语法
    // "no-underscore-dangle": "off",
    'no-mixed-operators': 'off',
    // "no-control-regex": "off",
    'consistent-return': 'off', // 规则要求return语句总是或永远不指定值
    'max-depth': ['error', 5], // 此规则强制执行嵌套块的最大深度，以降低代码复杂度
    'global-require': 'off', // 此规则要求所有调用require()都位于模块的顶层
    // 'generator-star-spacing': 'off', // 该规则旨在强化*发生器功能的间距。

    'import/no-dynamic-require': 'off',
    'import/no-cycle': 'off',
    'import/extensions': 0,
    // 'import/extensions': [
    //   'error',
    //   'always',
    //   {
    //     ts: 'never',
    //     js: 'never',
    //     jsx: 'never',
    //     vue: 'never',
    //     json: 'never',
    //   },
    // ],
    'import/prefer-default-export': 'off',

    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 5, // 3
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always',
      },
    ],
    'vue/name-property-casing': ['error', 'kebab-case'],

    'vue/attribute-hyphenation': 0,
    'vue/html-self-closing': 0,
    'vue/component-name-in-template-casing': 0,
    'vue/html-closing-bracket-spacing': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/no-unused-components': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/no-use-v-if-with-v-for': 0,
    'vue/no-parsing-error': 0,
    'no-tabs': 0,
    'no-delete-var': 2,
    'prefer-const': [
      2,
      {
        ignoreReadBeforeAssign: false,
      },
    ],
    'sonarjs/no-duplicate-string': 'off',
    'sonarjs/cognitive-complexity': ['warn', 30],
    'sonarjs/prefer-immediate-return': 'off',
    'sonarjs/no-collapsible-if': 'off',
    'sonarjs/no-identical-functions': 'warn',
    'sonarjs/no-duplicated-branches': 'warn',
    'sonarjs/no-same-line-conditional': 'warn',
    'sonarjs/no-small-switch': 'warn',
    'sonarjs/no-inverted-boolean-check': 'warn',
    'sonarjs/no-extra-arguments': 'warn',
    'sonarjs/prefer-object-literal': 'warn',
    'sonarjs/no-all-duplicated-branches': 'warn',
    ...(isTsProject
      ? {
          '@typescript-eslint/interface-name-prefix': 0,
        }
      : {}),
  },
};
