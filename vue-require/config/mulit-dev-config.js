const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('../config/config')
//动态添加入口

const getEntries = (pattern, len) => {
  var fileList = glob.sync(pattern)
  return fileList.reduce((previous, current) => {
    var filePath = path.parse(current)
    var withoutSuffix = filePath.dir + '/' + filePath.name
    previous[withoutSuffix.slice(len)] = current
    return previous
  }, {})
}

// getEntries(`${config.viewUrl}**/*{${config.templateSuffix}}`, config.viewUrl.length);
// getEntries(`${config.assetsUrl}**/*${config.jsExt}`, config.assetsUrl.length);
const addjsfile = p => {
  var filePath = path.parse(p);
  return filePath.dir + '/js/' + filePath.name;
}
const setEntry = () => {
  //配置页面
  var htmlEntries = getEntries(`${config.viewUrl}**/*{${config.templateSuffix}}`, config.viewUrl.length);
  var jsEntries = getEntries(`${config.assetsUrl}**/*${config.jsExt}`, config.assetsUrl.length);
  var htmlPluginsArr = [], entryArr = {};
  //判断入口文件即视图入口
  //规则 如果视图路径下 对应 静态目录下 的 文件路径相同，即判断为对应的关联文件
  for (htmlEntry in htmlEntries) {
    const htmlPlugin = {
      filename: htmlEntry + '.html',
      template: htmlEntries[htmlEntry],
      chunks: ['vendor'],
      inject: true,
      hash: config.ishash,
      cache: true,
      chunksSortMode: 'manual',
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }
    // 遍历判断注入每个页面对应的JS文件
    for (jsEntry in jsEntries) {
      // eg 去掉后缀后： src/demo/index === src/demo/index ，则把生成的JS文件注入到HTML中
      if (htmlEntry === jsEntry) {
        //入口js
        let key = addjsfile(jsEntry)
        htmlPlugin.chunks.push(key);
        entryArr[key] = jsEntries[jsEntry];
      }
    }

    htmlPluginsArr.push(new HtmlWebpackPlugin(htmlPlugin))

  }
  return {
    entry: entryArr,
    htmlArr: htmlPluginsArr
  };
}
console.log(setEntry())
module.exports = setEntry;

