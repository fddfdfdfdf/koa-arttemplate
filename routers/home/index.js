const Router = require('koa-router')

const router = new Router()

function sleep(second) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                name: '张三',
                h: '<h2>这是一个h2</h2>',
                num: 20,
                data: ['11111111','2222222222','33333333333']
            });
        }, second);
    })
}
router.get('/', async (ctx, next) => {
    let list = await sleep(2000);

     ctx.render('index',{
        list:list
    });
    // ctx.body = 'home';
})

router.get('/ddd', async (ctx, next) => {
    ctx.body = 'ddd';
})

module.exports = router.routes()