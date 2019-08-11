const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const mulit = require('../config/mulit-dev-config')
const mulitConfig = mulit();

module.exports = merge(common, {
  entry: mulitConfig.entry,
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    host: 'localhost',
    inline: true,
    stats: "errors-only",
    overlay: true,
    open: true
  },
  plugins: [
    ...mulitConfig.htmlArr
  ],
  mode: "devlopment",
  module: {
    rules: [
      {
        test: /\.tpl$/,
        use: ['swig-loader', 'html-loader']
      },
      {
        test: /\.ejs$/,
        use: ['ejs-loader']
      },//建议使用ejs模板
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }

    ]
  }
})