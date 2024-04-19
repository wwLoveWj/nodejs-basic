/*
 * @Description: 
 * @Author: Wu Wei
 * @Date: 2024-04-17 15:41:22
 * @LastEditTime: 2024-04-19 16:50:43
 * @LastEditors: Wu Wei
 * @FilePath: \nodejs-basic\006中间件的使用\index.js
 */
const express = require("express");
const cors = require("cors");

const app = express();
// 设置接受的请求信息，设置跨域
app.use(cors());

app.get("/cors", (req, res) => {
  res.send("我解决跨域了？");
});
app.listen(3001, () => {
  console.log("我把端口启动在3001");
});
