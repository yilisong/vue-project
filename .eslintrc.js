module.exports = {
  root: true,
  extends: 'eslint-config-yundun-fe',
  settings: {
    'import/resolver': {
      webpack: {
        config: 'config/webpack.conf.prod.js'
      }
    }
  },
  rules: {
    'import/prefer-default-export': 'off',
    'func-style': 'off',
    // Backend api argument not what you expected
    camelcase: 'off',
    'max-len': 'off',
    'no-unneeded-ternary': 'off'
  }
}
