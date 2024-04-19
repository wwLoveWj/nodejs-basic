/*
 * @Description: 
 * @Author: Wu Wei
 * @Date: 2024-04-12 22:39:57
 * @LastEditTime: 2024-04-17 15:58:14
 * @LastEditors: Wu Wei
 * @FilePath: \nodejs-basic\002配置cors等跨域配置\index.js
 */
//在学习本章之前你必须理解什么是跨域？
// 协议域名端口号有其一存在不同就会造成跨域

const express = require("express");
const cors = require("cors");

const app = express();
// 设置接受的请求信息，设置跨域
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  //  res.header("Access-Control-Max-Age", "3600");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With,X_Requested_With,Content-Type"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  //res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// app.use(cors());

app.get("/cors", (req, res) => {
  res.send("我解决跨域了？");
});
app.listen(3001, () => {
  console.log("我把端口启动在3001");
});
