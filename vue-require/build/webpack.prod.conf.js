const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = require('../config/config');
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
      filename: '[name]/css/index.[hash].css',
      publicPath: '/'
    })
  ],
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tpl$/,
        use: ['swig-loader']
      },
      {
        test: /\.ejs$/,
        use: ['ejs-loader']
      },//建议使用ejs模板
      // {
      //   test: /\.html$/,
      //   use: {
      //     loader: 'html-loader',
      //     options: {
      //       // ignoreCustomFragments: [],
      //       root: path.resolve(__dirname, 'src/assets'),
      //       attrs: ['img:src']
      //     }
      //   }
      // },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'url-loader',
        options: {
          // 把较小的图片转换成base64的字符串内嵌在生成的js文件里
          limit: 1024 * 1, //10000
          // 路径和生产环境下的不同，要与修改后的publickPath相结合
          // name: '[name].[hash].[ext]?[hash:7]',
          // name: '[name].[ext]',
          name (file) {
            // console.log(file)
            // E:\2019\template\vue-require\src\view\entry\test\img\webpack.jpg
            // if (process.env.NODE_ENV === 'development') {
            //   return '[path][name].[ext]';
            // }
            const relativePath = path.relative(config.viewUrl, file);
            var repath = path.relative(config.distname, relativePath);
            var p = path.parse(relativePath);

            return p.dir + '/' + p.name + '.[contenthash].[ext]';
          },
          publicPath: "/"
          //  path.resolve(process.cwd(), 'dist')
          // outputPath: (url, resourcePath, context) => {
          //   // `resourcePath` is original absolute path to asset
          //   // `context` is directory where stored asset (`rootContext`) or `context` option

          //   // To get relative path you can use
          //   const relativePath = path.relative(context, resourcePath);
          //   console.log(url)
          //   console.log(resourcePath)
          //   console.log(context)
          //   // if (/my-custom-image\.png/.test(resourcePath)) {
          //   //   return `other_output_path/${url}`;
          //   // }
          //   // if (/images/.test(context)) {
          //   //   return `image_output_path/${url}`;
          //   // }
          //   // return `${resourcePath}/${context}/${url}`;
          //   return path.relative(config.viewUrl, relativePath);
          // },
          // publicPath: (url, resourcePath, context) => {
          //   const relativePath = path.relative(config.viewUrl, path.relative(context, resourcePath));
          //   return path.relative(config.distname, relativePath) + '?[hash]';
          // }, //会在打包后图片路径拼上该设置
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
        // publicPath: "/"
      },
      // {
      //   test: /\.less$/,
      //   use: [MiniCssExtractPlugin.loader, 'css-loader?minimize', 'postcss-loader', 'less-loader']
      // }

    ]
  }
})