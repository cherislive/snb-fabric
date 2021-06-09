<!-- @format -->

# vue-fabric

一个包含 prettier，eslint，stylelint 的配置文件合集

A collection of configuration files containing prettier, eslint, stylelint

# Use

in `.eslintrc.js`

```js
module.exports = {
  extends: [require.resolve('snb-fabric/dist/eslint')],
  rules: {
    // your rules
  },
};
```

in `.stylelintrc.js`

```js
module.exports = {
  extends: [require.resolve('snb-fabric/dist/stylelint')],
  rules: {
    // your rules
  },
};
```

in `.prettierrc.js`

```js
const fabric = require('snb-fabric');

module.exports = {
  ...fabric.prettier,
};
```


