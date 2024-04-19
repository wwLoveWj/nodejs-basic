/*
 * @Description: 
 * @Author: Wu Wei
 * @Date: 2024-04-17 15:41:22
 * @LastEditTime: 2024-04-19 19:43:04
 * @LastEditors: Wu Wei
 * @FilePath: \nodejs-basic\006中间件的使用\index.js
 */
const express = require("express");
const cors = require("cors");
// 1,导入自定义的中间件模块
const bodyParser = require('./custom-body-parser')//向外导出解析请求体数据的中间件函数

const app = express();
// 设置接受的请求信息，设置跨域
app.use(cors());

// 2,注册自定义的中间件模块
app.use(bodyParser)// 解析表单数据的中间件

app.post('/user', (req, res) => {
    console.log("路由接口:", req.body)
    res.send(req.body)
})
app.get('/user', (req, res) => {
    console.log(req.query,"路由接口get:")
    res.send(req.query)
})

app.listen(3001, () => {
  console.log("我把端口启动在3001");
});
