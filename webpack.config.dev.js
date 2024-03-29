const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {

  devtool: 'source-map',

  output: {
    pathinfo: true,
    publicPath: '/',
    filename: '[name].js',
  },

  devServer: {
    host: 'localhost',
    overlay: true,
    watchOptions: {
      poll: true,
    }
  }

});
