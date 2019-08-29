const Router = require('koa-router')
const router1 = require('./home/index')
const router2 = require('./user/index')

var router = new Router()
// router.prefix =  '/api';

router.use('', router1);
router.use('/user', router2);

module.exports = router