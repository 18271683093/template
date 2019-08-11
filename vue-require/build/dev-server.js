const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./webpack.dev.conf.js');


// webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
// const server = new webpackDevServer(compiler, options);

// server.listen(5000, 'localhost', () => {
//   console.log('dev server listening on port 5000');
// });