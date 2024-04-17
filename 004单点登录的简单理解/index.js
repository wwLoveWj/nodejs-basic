/*
 * @Description:
 * @Author: Wu Wei
 * @Date: 2024-04-13 17:40:33
 * @LastEditTime: 2024-04-13 18:57:20
 * @LastEditors: Wu Wei
 * @FilePath: \nodejs-basic\004单点登录的简单理解\index.js
 */
const express = require("express");
const session = require("express-session");
const fs = require("fs");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const appToMapUrl = {
  //A应用id
  "Rs6s2aHi": {
    url: "http://localhost:5174", //对应的应用地址
    secretKey: "%Y&*VGHJKLsjkas", //对应的secretKey
    token: "", //token
  },
  //B应用id
  "9LQ8Y3mB": {
    url: "http://localhost:5173", //对应的应用地址vue
    secretKey: "%Y&*FRTYGUHJIOKL", //对应的secretKey
    token: "", //token
  },
};

const app = express();
app.use(cors());
// 帮我们操作cookie  这注册完中间件之后就可以用session
app.use(
  session({
    secret: "wwlovewj%&*#@",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
const getToken = (appId) => {
  // 正常业务这个东西是存在redis里面的redis设置过期时间
  return jwt.sign({ appId }, appToMapUrl[appId].secretKey, { expiresIn: "1h" });
};

// 一进页面就要调一下登录接口
// 1.登陆过，直接返回token
// 2.没登录需要跳转登录页面
app.get("/login", (req, res) => {
  const appId = req.query.appId;
  console.log(appId)
  if (req.session.username) {
    //标识已经登陆过了
    let token;
    if (appToMapUrl[appId].token) {
    console.log(token,"vue");

        // 第一个登录的应用
      token = appToMapUrl[appId].token;
    } else {
      // 以后的应用都会走这里
      token = getToken(appId);
      appToMapUrl[appId].token = token;
    console.log(token,"react");

    }
    res.redirect(`${appToMapUrl[appId].url}?token=${token}`);
    return;
  }
  const html = fs.readFileSync("./sso.html", "utf-8");
  res.send(html);
});

// 登陆成功后的逻辑
app.get("/success", (req, res) => {
  const { username, password, appId } = req.query;
  //    判断账号密码对不对，
  //  生成token
  const token = getToken(appId);
  appToMapUrl[appId].token = token; //存一份token

  req.session.username = username; //有一个标识证明登录过了
  const url = appToMapUrl[appId].url;

  //    重定向回到原来的页面并且携带token和登录标识
//   console.log(username, password, appId);
  //    res.send("拿到了")
  res.redirect(`${url}?token=${token}`);
});

app.listen(3000, () => {
  console.log("3000端口已开启");
});
