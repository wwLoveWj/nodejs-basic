<!--
 * @Description: 
 * @Author: Wu Wei
 * @Date: 2024-04-19 16:39:37
 * @LastEditTime: 2024-04-19 20:20:11
 * @LastEditors: Wu Wei
 * @FilePath: \nodejs-basic\006中间件的使用\README.md
-->
## 中间件的定义
```
app.use([path,] callback [, callback...])
app.all([path,] callback [, callback...])
```
## 中间件的分类
1. 应用级中间件
   > app.use((req, res, next) => {next()});   // 三个参数
   
2. 路由级中间件
   > // routes/userRoutes 文件夹
    const router = express.Router();  //使用 express.Router() 注册子路由
    router.xxx   // router的用法和app完全相同, 具体代码如下
    // app.js 文件
    const userRouter = require('./routes/userRoutes');
    app.use('/api/xxx', userRouter);  使用app.use注册子路由

3. 错误处理中间件
   > app.use((err, req, res, next) => {
        return res.status(errcode).json({
            status: 'error',
        });
    });   // 错误处理中间件需要传入4个参数

4. 内置中间件
   > app.use(express.json())  // 解析request body
     app.use(express.static(`${__dirname}/public`)); // 解析静态资源

5. 第三方中间件
   > const xss = require('xss-clean');  //防止跨站脚本攻击（XSS
    const hpp = require('hpp');   //防止 HTTP 参数污染攻击。
    const cors = require('cors');   //用于处理跨域请求
    const rateLimit = require('express-rate-limit');  //限制请求速率，防止滥用或恶意攻击
    const helmet = require('helmet');   //设置各种 HTTP 头来抵御一些常见的 web 安全问题
    const morgan = require('morgan');   //记录 HTTP 请求日志
    app.use(xss())

6. 自定义中间件
   1. 全局中间件
   > app.use((req, res, next) => {  // 自定义全局中间件
        req.query.a = 1
        console.log('全局路由中间件1')
        next()
    });

    app.use((req, res, next) => {   // app.use 注册中间件可以注册多个
        console.log('全局路由中间件3')
        next()
        }, (req, res, next) => {
        console.log('全局路由中间件4')
        next()
    });
    app.use('/api1', (req, res) => {  
       // '/api1'指定在什么请求路径上注册中间件，（可能需要在这个路径上做一些安全的校验等等）
        console.log('全局路由中间件5')
        return res.status(200).json({ 
            status: 'hello'
        });
    });

    ```
    app.get('/api3/:id', (req, res) => {  // 为指定路径指定get、 post、delete、 patch方法
        return res.status(200).json({
            status: 'hello get'
        });
    });
        
    app.delete('/api3/:id', (req, res) => {
        return res.status(200).json({
            status: 'hello delete'
        });
    });
 
    // 同上简写
    app
    .route('/api4/:id') 
    .get((req, res) => {  // 链式判断请求方法 get
        return res.status(200).json({
        status: 'hello get'
        });
    })
    .delete((req, res) => {  // delete
        return res.status(200).json({
        status: 'hello delete'
        });
    });
   ```
   > app.all('*', (req, res, next) => { // 如果路由都没命中执行此中间件    * 表示匹配所有路径
       next(new Error(`Can't find ${req.originalUrl} on this server!`));
   })
   2. 局部中间件

    ---
    -------

    <mark>注意:</mark>
    一定要在路由之前注册中间件
    客户端发送过来的请求，可以连续调用多个中间件进行处理
    执行完中间件的业务代码后，不要忘记调用next()函数
    为了防止代码逻辑混乱，调用next()函数后不要再写额外的代码
    连续调用多个中间件时，多个中间件之间，共享req、res对象
