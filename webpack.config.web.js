const { getConfig } = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { join } = require('path');

const PORT = 4445;

const webConfig = getConfig({

  output: {},
  entry: {},

  target: 'web',

  devServer: {
    contentBase: join(__dirname, 'build'),
    port: PORT,
    hot: true,
    inline: true,
    disableHostCheck: true,
  },

  output: {
    libraryTarget: 'var',
  },

  entry: {
    app: [
      `./src/renderer/`
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Wexond',
      template: 'app.html',
      filename: `app.html`,
      chunks: ['app'],
    })
  ]
});

module.exports = webConfig;
