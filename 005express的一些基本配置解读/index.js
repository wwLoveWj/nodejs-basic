/*
 * @Description: 
 * @Author: Wu Wei
 * @Date: 2024-04-17 14:22:26
 * @LastEditTime: 2024-04-17 20:47:08
 * @LastEditors: Wu Wei
 * @FilePath: \nodejs-basic\005express的一些基本配置解读\index.js
 */
const express = require("express");
const logger = require('morgan') // 日志模块  use之后会在控制台打印接口的请求日志
const favicon = require('serve-favicon') // 网站图标

const  bodyParser = require('body-parser');
const path = require("path");

const app = express(); // 把express对象，当函数调用后，返回一个应用程序的服务器对象给app
//服务器的配置：
app.use(logger('dev')) // 'dev',在服务器运行时，显示访问的日志的格式。

// 静态资源的访问目录，可以配置多个不同的目录
app.use(express.static(__dirname + "/public"))

// 自定义网站小图标，或者直接在public下放一个favicon.ico文件。
console.log(__dirname+"/public/icon/favicon.ico","ico路径");
// icon不生效，不知道为啥
// ico格式图片的生成网站：https://boke112.com/tools/toico/
app.use(favicon(__dirname + '/public/icon/favicon.ico')) // __dirname, 表示项目的根目录，/myapp + '/public/icon/icon.webp'
// app.use(favicon(path.join(__dirname, 'public', 'vite.svg')))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//bodyParser用于解析客户端请求的body中的内容，内部使用JSON编码处理，url编码处理以及对于文件的上传处理。

app.get("/test",(req,res)=>{
    console.log("ok");
    res.send("我只是一个测试接口")
})
app.listen(8888,()=>{
    console.log("服务器运行于 http://127.0.0.1:8888")
})
