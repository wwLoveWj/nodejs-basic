/*
 * @Description:
 * @Author: Wu Wei
 * @Date: 2024-04-25 19:15:03
 * @LastEditTime: 2024-04-25 20:10:42
 * @LastEditors: Wu Wei
 * @FilePath: \nodejs-basic\009fs的相关文件操作\index.js
 */
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const file = require("./file.js");
const folder = require("./folder.js");

const app = express();
app.use(cors());
app.use("/file", file);
app.use("/folder", folder);

// 判断是文件夹还是文件
app.get("/fileOrFolder", (req, res) => {
  let isFile = false;
  fs.stat("./rename", (err, stats) => {
    if (stats.isFile()) {
      isFile = true;
      console.log("is file");
    } else {
      isFile = false;
      console.log("is dir");
    }
  });
  res.send({ msg: isFile ? "文件" : "文件夹", isFile });
});

app.listen(3001, () => {
  console.log("我把端口启动在3001");
});
