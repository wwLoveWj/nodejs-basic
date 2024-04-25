/*
 * @Description:
 * @Author: Wu Wei
 * @Date: 2024-04-25 19:51:06
 * @LastEditTime: 2024-04-25 20:36:42
 * @LastEditors: Wu Wei
 * @FilePath: \nodejs-basic\009fs的相关文件操作\file.js
 */
const express = require("express");
const fs = require("fs");

const router = express.Router();

router.get("/createFile", (req, res) => {
  fs.writeFile("name.txt", "今天天气好好", (err) => {
    console.log(err);
  });
  res.send({ msg: "文件创建成功" });
});

// 往已创建的文件夹中追加内容
router.get("/addFile", (req, res) => {
  fs.appendFile("name.txt", "你好呀", (err) => {
    console.log(err);
  });
  res.send({ msg: "文件追加写入成功" });
});

router.get("/read", (req, res) => {
    let data;
  fs.readFile("04.重命名和移动_修改名字.txt", "utf8", (err, data) => {
    if (err) throw err;
    data = data
    console.log(data,"文件数据");
  });
  res.send({ msg: "文件读取成功" ,data});
});

router.get("/remove", (req, res) => {
  fs.unlink("04.重命名和移动_修改名字.txt", (err) => {
    console.log(err);
  });
  res.send({ msg: "文件删除成功" });
});

// 5. 导出路由模块
module.exports = router;
