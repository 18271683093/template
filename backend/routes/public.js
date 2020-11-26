'use strict'

const Router = require('koa-router')
const jwt = require('jsonwebtoken')
const config = require('../config')
const controllers = require('../controllers/public')

const router = new Router()
router.prefix('/api')

router.get('/login',controllers.login)

module.exports = router