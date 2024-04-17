const express = require("express");

const app = express();

app.get("/basic",(req,res)=>{
    res.send("我成功了？");
})

app.listen(3000,()=>{
    console.log("我启动了3000端口")
})
