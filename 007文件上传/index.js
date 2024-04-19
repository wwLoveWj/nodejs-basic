/*
 * @Description: 
 * @Author: Wu Wei
 * @Date: 2024-04-17 20:47:59
 * @LastEditTime: 2024-04-19 15:35:57
 * @LastEditors: Wu Wei
 * @FilePath: \nodejs-basic\007文件上传\index.js
 */
// 1.引入文件上传收集包
const multer = require("multer");
// 2.配置：上传文件会保护这个目录
const upload = multer({ dest: "upload/" });
// uploads表示目录名，你也可以设置其他的

const express = require("express");
const cors = require("cors")
const app = express();

app.use(cors())
//开放upload静态文件
var path = require('path');
app.use(express.static(path.join(__dirname, 'upload')));//将静态资源托管，这样才能在浏览器上直接访问预览图片或则html页面

const router = require("./router");
// 第三步：设置服务器
// 3. 使用
// 这个路由使用第二个参数 .upload.single表示单文件上传， 
// 'corer' 表示要上传的文件在本次上次数据中的键名。对应于前端页面上的：
//  <input type="file" name='corer'/>
app.use(router);

// app.post("/upload", upload.single("corer"), (req, res) => {
//   // 如何获取请求端的数据：
//   // req.file 记录了文件上传的信息
//   // req.body 记录了其它普通参数（非文件）的信息
//   console.log(req.body);
//   console.log(req.file);
//   res.send({ name: "我是post响应过去的数据formdata" });
// });

app.listen(8899, () => {
  console.log("端口开启在8899");
});
