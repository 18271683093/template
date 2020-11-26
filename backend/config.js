var path = require('path');

module.exports = {
    port:1000,
    public:path.resolve(__dirname,"./util/test"),
    logPath: path.resolve(__dirname, './logs/koa-template.log'),
    secret:"zrainy.com"
}