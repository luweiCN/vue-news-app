// https://eslint.org/docs/user-guide/configuring

module.exports = {
  parser: 'babel-eslint',
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'html',
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'elo-last': 0, // 不检测文件末尾是否有空行
    'space-before-function-paren': 0 // 在function左侧括号是否需要空格
  }
}
