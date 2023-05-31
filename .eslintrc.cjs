/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // 添加组件命名忽略规则 需要忽略的组件名 避免路由组件命名报错，业务组件还是需要使用mutilple-word命名方式
    "vue/multi-word-component-names": ["error",{
      "ignores": ["index"]
    }]
  }
}
