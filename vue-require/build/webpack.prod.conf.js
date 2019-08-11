const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const mulit = require('../config/mulit-dev-config')
const mulitConfig = mulit();

module.exports = merge(common, {
  entry: mulitConfig.entry,
  devServer: {
    contentBase: './dist',
    hot: true,
    host: 'localhost'
  },
  plugins: [
    ...mulitConfig.htmlArr,
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    })
  ],
  mode: "production",
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
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      // {
      //   test: /\.less$/,
      //   use: [MiniCssExtractPlugin.loader, 'css-loader?minimize', 'postcss-loader', 'less-loader']
      // }

    ]
  }
})