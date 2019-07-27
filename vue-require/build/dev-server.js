const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const merge = require('webpack-merge');

const config = require('./webpack.dev.js');
const parts = require('./part.js');
// const options = merge({}, () => {

//   parts.page({ title: "Webpack demo" }),
//     parts.page({ title: "Another demo", path: "another" })
// }

// );

// webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
// const server = new webpackDevServer(compiler, options);

// server.listen(5000, 'localhost', () => {
//   console.log('dev server listening on port 5000');
// });