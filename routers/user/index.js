const Router = require('koa-router')

const router = new Router()

router.get('/', async (ctx, next) => {
    ctx.body = 'user';
})

router.get('/users', async (ctx, next) => {
    ctx.body = 'users';
})

module.exports = router.routes()