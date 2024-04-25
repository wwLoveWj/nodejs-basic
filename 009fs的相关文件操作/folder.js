/*
 * @Description:
 * @Author: Wu Wei
 * @Date: 2024-04-25 19:51:06
 * @LastEditTime: 2024-04-25 20:49:19
 * @LastEditors: Wu Wei
 * @FilePath: \nodejs-basic\009fs的相关文件操作\folder.js
 */
const express = require("express");
const fs = require("fs");

const router = express.Router();

router.get("/readStream", (req, res) => {
  const readStream = fs.createReadStream('sample.txt', { start: 90, end: 99,highWaterMark:400,encoding:"utf-8" });
//   可以设置 highWaterMark ，默认值是64*1024KB，默认单位是 字节 ， 上面的代码就是 每次读取 400 字节
// highWaterMark 是 Node.js 中可读流和可写流的一个选项，用于设置缓冲区大小。对于可读流来说，它表示每次从底层资源读取数据时的最大字节数，默认值为 64KB。如果正在读取的数据超过了 highWaterMark 的大小，则会暂停读取，直到当前缓冲区中的数据被消费完毕，以保证内存不会被过度占用
  readStream.on("data",(chunk)=>{
    console.log(chunk)
    res.send({ msg: "截取字节流成功" ,data:chunk});
  })
  readStream.on("end",()=>{
    console.log("close")
  });

  
});

router.get("/create", (req, res) => {
    fs.mkdir("./rename", (err) => {
      console.log(err);
    });
    res.send({ msg: "创建文件夹成功" });
  });

router.get("/del", (req, res) => {
  fs.rmdir("./rename", (err) => {
    console.log(err);
  });

  res.send({ msg: "删除文件夹成功" });
});

router.get("/rename", (req, res) => {
  const { newName } = req.query;
  console.log(newName, "新路径", typeof newName);
  // fs.renameSync( path , newPath ) //同步 重命名
  fs.rename("./rewrite3333", newName, (err) => {
    if (err) throw err;
    console.log("修改成功");
    res.send({ msg: "文件夹重命名成功",newName });
  });

});

// 文件夹位置的移动
router.get("/move", (req, res) => {
  const { newName } = req.query;
  console.log(newName, "新路径", typeof newName);
  fs.rename(
    "./files/04.重命名和移动_修改名字.txt",
    "./04.重命名和移动_修改名字.txt",
    (err) => {
        if (err) throw err;
    }
  );
  res.send({ msg: "文件移动成功" });
});

// 文件夹的读取  该目录下的所有文件夹
router.get("/readdir", (req, res) => {
  let allFolder = "";
  fs.readdir("./", (err, data) => {
    if (err) throw err;
    allFolder = data;
    res.send({ msg: "文件夹读取成功", allFolder });
    console.log(data);
  });

});
// 5. 导出路由模块
module.exports = router;
