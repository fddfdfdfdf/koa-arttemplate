const Koa=require('koa');
const path=require('path');
const cluster = require('cluster');
const compress = require('koa-compress')
const numCPUs = require('os').cpus().length;
// const static = require('koa-static');
const staticCache = require('koa-static-cache')
const bodyParser = require('koa-bodyparser')
const render = require('koa-art-template');
const routers = require('./routers/index');
//实例化
const app=new Koa();

//解析参数
app.use(bodyParser())
//请求压缩
app.use(compress({
    filter: function (content_type) {
        return /text/i.test(content_type)
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
}))
// 配置静态web服务的中间件
// app.use(static(__dirname+'/public'));
// 静态缓存
app.use(staticCache(
    path.join(__dirname, 'public'),
    {
        dynamic:true,
        gzip:true,
        maxAge: 365 * 24 * 60 * 60
    })
)
//模板引擎
render(app, {
    root: path.join(__dirname, 'views'),   // 视图的位置
    extname: '.html',  // 后缀名
    debug: process.env.NODE_ENV !== 'production',  //是否开启调试模式
    cache:true,
    compress:true,
    minimize: true,
    escape:true,
    htmlMinifier: true,
    htmlMinifierOptions: {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        // automatically merged at runtime: rules.map(rule => rule.test)
        ignoreCustomFragments: []
    }
});
//路由中间件
app.use(async (ctx, next)=>{
    await next();
})
/*启动路由*/
app.use(routers.routes())
    .use(routers.allowedMethods());

//多线程
if (cluster.isMaster) {
    console.log(`主进程 ${process.pid} 正在运行`);
    // 衍生工作进程。
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`工作进程 ${worker.process.pid} 已退出`);
    });
} else {
    // 工作进程可以共享任何 TCP 连接。
    // 在本例子中，共享的是 HTTP 服务器。
    app.listen(9000,()=>{
        console.log('server is starting at port 9000');
    });
}
