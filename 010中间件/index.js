const express = require("express");

// 1. 什么是中间件
/**
 * 中间件是一个可访问请求对象（req）和响应对象（res）的函数，
 * 在 Express 应用的请求-响应循环里，下一个内联的中间件通常用变量 next 表示。
 * 中间件的功能包括：
 * 执行任何代码。
 * 修改请求和响应对象。
 * 终结请求-响应循环。
 * 调用堆栈中的下一个中间件。
 */
/**
 *  注意：如果当前中间件没有终结请求-响应循环，则必须调用 next() 方法将控制权交给下一个中间件，否则请求就会挂起。
 * 使用可选则挂载路径，可在应用级别或路由级别装载中间件。可装载一系列中间件函数，在挂载点创建一个中间件系统栈。
 */

// 2.应用级中间件
const app = express();

// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function (req, res, next) {
  console.log("Time:", Date.now());
  next();
});

// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
app.use("/user/:id", function (req, res, next) {
  console.log("Request Type:", req.method);
  next();
});

// 路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
app.get("/user/:id", function (req, res, next) {
  res.send("USER");
});

// 3. 路由级中间件
const router = express.Router();

// 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
router.use(function (req, res, next) {
  console.log("Time:", Date.now());
  next();
});

// 一个中间件栈，显示任何指向 /user/:id 的 HTTP 请求的信息
router.use(
  "/user/:id",
  function (req, res, next) {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  function (req, res, next) {
    console.log("Request Type:", req.method);
    next();
  }
);

// 将路由挂载至应用
app.use("/", router);

// 4. 错误处理中间件
// 错误处理中间件有 4 个参数，定义错误处理中间件时必须使用这 4 个参数。
// 即使不需要 next 对象，也必须在签名中声明它，否则中间件会被识别为一个常规中间件，不能处理错误。
// 错误处理中间件和其他中间件定义类似，只是要使用 4 个参数，而不是 3 个，其签名如下： (err, req, res, next)。
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// 5. 内置中间件
// express.static 是 Express 唯一内置的中间件，它基于 serve-static，负责在 Express 应用中提供静态资源。
// 每个应用可有多个静态目录。
// app.use(express.static('public'));
// app.use(express.static('uploads'));
// app.use(express.static('files'));

// 6.第三方中间件
/**
 * var express = require('express');
 * var app = express();
 * var cookieParser = require('cookie-parser');
 * // 加载 cookie 解析中间件
 * app.use(cookieParser());
 */

app.listen(3000, () => {
  console.log("端口开启在3000");
});

// 注意事项：局部中间件、全局中间件，局部中间件可定义多个
/*一定要在路由之前注册中间件：
客户端发送过来的请求，可以连续调用多个中间件进行处理
执行完中间件的业务代码之后，不要忘记调用next()函数
为了防止代码逻辑混乱，调用next()函数后不要再写额外的代码
连续调用多个中间件时，多个中间件之间，共享req和res对象
*/
// 本总结抄袭自：原文链接：https://blog.csdn.net/u011413061/article/details/50518069
