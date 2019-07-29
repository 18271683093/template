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
      filename: 'tpl/tpl.html', //打包好后，新建的html名字为first.html
      // template: './src/index.html', //以src下面的index.html为模板去创建新的html文件
      template: './src/view/template/index.tpl', //以src下面的index.html为模板去创建新的html文件
      // inject: false,
      // template: './src/template/index.ejs', //ejs模板 需要配置ejs.loader
      title: "test",
      path: "first",
      name: '123124',
      data: '454564457'
    }),
  ],
  // mode: "development",
  module: {
    // loaders: [
    //   { test: /\.tpl$/, loader: "swig-loader" }
    // ]
    rules: [
      {
        test: /\.tpl$/,
        use: ['swig-loader']
      },
      // {
      //   test: /\.ejs$/,
      //   use: ['ejs-loader']
      // }, 
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }

    ]
  }
})