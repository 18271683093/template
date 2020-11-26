const Koa = require('koa')
const bodyParser = require('koa-bodyparser')()
const static = require('koa-static-router')

const config = require('./config')
const {publicRouter,privateRouter} = require('./routes')
const { loggerMiddleware } = require('./middlewares/logger')
const { errorHandler,responseHandler }  = require('./middlewares/response')

const app = new Koa();

// Logger 
app.use(loggerMiddleware)

// Error Handler
app.use(errorHandler)

// Global Middlewares
app.use(bodyParser)
app.use(static({dir:config.public , router:'/public'}))

// app.use(static({ dir:'./src/dist' , router:'/web'}))

// backend Routes
app.use(publicRouter.routes(),publicRouter.allowedMethods())
app.use(privateRouter.routes(),privateRouter.allowedMethods())


// Response 
app.use(responseHandler)

module.exports = app

