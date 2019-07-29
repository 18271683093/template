const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  devtool: "inline-source-map",
  devServer: {
    contentBase: './dist',
    hot: true,
    host: 'localhost'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'first/first.html', //打包好后，新建的html名字为first.html
      template: './src/index.html', //以src下面的index.html为模板去创建新的html文件
      title: "test",
      path: "first"
    }),
  ],
  mode: "development",
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  }
})