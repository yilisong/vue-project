module.exports = {
  /**
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'daoshu',
      script: 'index.js',
      env_stage: {
        API_ENV: 'test',
        NODE_ENV: 'production'
      },
      env_pre: {
        API_ENV: 'pre',
        NODE_ENV: 'production'
      },
      env_release: {
        API_ENV: 'release',
        NODE_ENV: 'production'
      }
    }
  ]
}
