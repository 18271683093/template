const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    // vendor: ["jquery"], //配置公共库
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  output: {
    filename: '[name]/js/index.[hash].js',
    path: path.resolve(__dirname, "../dist")
  },
  resolve: {  //resolve字段最常用的就是 alias （别名）属性，用来把一些冗长的路径替换为简单的字符，以便js中引入模块时更简洁
    alias: {
      'img': path.resolve(__dirname, '../src/assets'),
    }
  },
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000, // 模块的最小体积
      minChunks: 1, // 模块的最小被引用次数
      maxAsyncRequests: 5, // 按需加载的最大并行请求数
      maxInitialRequests: 3, // 一个入口最大并行请求数
      automaticNameDelimiter: '~', // 文件名的连接符
      name: true,
      cacheGroups: { // 缓存组
        // common: {
        //   name: "common",
        //   chunks: "all",
        //   minSize: 1,
        //   priority: 0
        // },
        // 首先: 打包node_modules中的文件
        vendors: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10
        }
      }
    }
  }

}