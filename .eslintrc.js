module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: 'eslint:recommended',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'no-unused-vars': 0,
    'no-console': 0,
    'no-useless-escape': 0,
    'no-control-regex': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // 命名的函数忽略括号前的空格检测
    'space-before-function-paren': ["error", {
      "anonymous": "always",
      "named": "ignore",
      "asyncArrow": "always"
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}

