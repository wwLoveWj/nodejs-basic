//在学习本章之前你必须理解什么是跨域？
// 协议域名端口号有其一存在不同就会造成跨域

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/cors",(req,res)=>{
    res.send("我解决跨域了？")
})
app.listen(3001,()=>{
    console.log("我把端口启动在3001")
});
