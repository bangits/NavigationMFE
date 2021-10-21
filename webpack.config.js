const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const { configureSharedWebpack } = require('./webpack.shared');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'atom',
    projectName: 'navigation',
    webpackConfigEnv,
    argv
  });

  const isDevelopment = !webpackConfigEnv.WEBPACK_BUILD;

  return merge(defaultConfig, configureSharedWebpack(isDevelopment), {
    output: {
      publicPath: '/'
    },
    devServer: {
      port: webpackConfigEnv.port || 9003,
      host: '0.0.0.0' // To accept connections from outside container
    },
    externals: ['react', 'react-dom', /^@atom/]
  });
};
