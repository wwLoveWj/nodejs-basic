/**
 * 6. 自定义中间件：自己手动模拟一个类似于express.urlencoded这样的中间件，来解析POST提交到服务器的表单数据。
 * 定义中间件：
 * 1.监听req的data事件
 * 2.监听req的end事件
 * 3.使用querystring模块解析请求体数据
 * 4.将解析出来的数据对象挂载为req.body
 * 5.将自定义中间件封装为模块
 */
const qs = require('querystring')

const bodyParser = (req, res, next) => {
    // 定义具体的业务逻辑
    // 1. 定义一个 str 字符串，专门用来存储客户端发送过来的请求体数据
    let str = ''

    // 2. 监听 req 的data事件
    req.on('data', (chunk) => {
        // 如果数据量比较大，无法一次性发送完毕，则客户端会把数据切割后，分批发送到服务器。
        // data事件会触发多次，需要手动对接收到的数据进行拼接
        str += chunk
    })

    // 3. 监听 req 对象的 end 事件
    req.on('end', () => {
        // 在str中存放的就是完整的请求体数据
        // 上游的中间件和下游的中间件及路由之间，共享同一份req和res
        req.body = qs.parse(str)
        console.log("中间件", req.body)
        next()
    })
}

module.exports = bodyParser

//全局中间件
// app.use((req, res, next) => {
//   // 中间件的业务逻辑
//  const time = Date.now();
//  // 为req添加属性
//  req.startTime = time; //这样我们下级在使用的时候都能拿到这个时间req.startTime
// 	next()
// })

// 局部中间件
// 这里所定义的mw，就是指向一个中间件函数
// const mw = function(req, res, next) {
//     // 中间件的处理
//     // ......
//     // 必须调用next函数，把流转关系交给下一个中间件
//     next();
// }

// 调用多个局部中间件,可以按顺序传入局部中间件函数、
// app.get('/user/more', mw1, mw2, (req,res)=>{
//     res.send('调用了局部生效中间件')
// })

// 也可以用数组传入
// app.get('/user/more', [mw1,mw2], (req,res)=>{
//   res.send('调用了局部生效中间件')
// })                    
// 原文链接：https://blog.csdn.net/weixin_41950078/article/details/128019289
