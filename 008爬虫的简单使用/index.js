/*
 * @Description:
 * @Author: Wu Wei
 * @Date: 2024-04-25 14:02:54
 * @LastEditTime: 2024-04-25 14:30:12
 * @LastEditors: Wu Wei
 * @FilePath: \nodejs-basic\008爬虫的简单使用\index.js
 */
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const cheerio = require("cheerio"); // 类似jq，在node环境下操作dom
const puppeteer = require('puppeteer');//puppeteer是chrome团队开发的一个node库，可以通过api来控制浏览器的行为(模拟浏览器)，比如点击、跳转、刷新，在控制台执行javascript脚本等。通过这个工具可以用来处理爬虫、制动签到、网页截图、生成pdf、自动化测试等。

const app = express();
app.use(cors());

// 请求获取接口数据

// 前端发请求：
//   XMLHttpRequest：axios
//   Fetch

// Node.js 发请求
// tcp  模块，最麻烦
// http 模块，
// const http = require('http')
// http.request()
// 为了方便，也有一些封装好的第三方库：request、axios
// axios 既可以在浏览器使用也可以在 Node 中使用
// 1. 都是 JavaScript
// 2. 在不同的平台做了适配，浏览器：XMLHttpRequest，Node：http

app.get("/userInfo", async (req, res) => {
  const getPage = async () => {
    const { data } = await axios.get("https://item.jd.com/100016777690.html", {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36 Edg/99.0.1150.36",
      },
    });
    // data 是什么？字符串
    console.log('抓取网页成功')
    fs.writeFileSync('jd.html', data)
    return data;
  };

  const main = async () => {
    const pageData = await getPage();
    const $ = cheerio.load(pageData);
    console.log(`
        标题：${$(".sku-name").text().trim()}
        价格：${$(".price").text().trim()}
    `);
  };

  main();
  const pageData = await getPage();
  const $ = cheerio.load(pageData);
  res.send({
    标题: $(".sku-name").text().trim(),
    价格: $(".price").text().trim(),
  });
});


;(async () => {
  // 1. 打开浏览器
  const browser = await puppeteer.launch()

  // 2. 新建一个标签页
  const page = await browser.newPage()

  // 3. 输入地址敲回车
  await page.goto('https://item.jd.com/100016777690.html')

  // 4. 操作：
  //    对加载完毕的网页进行截图
  await page.screenshot({ path: '100016777690.png' })

  // 5. 关闭浏览器
  await browser.close()
})()

app.listen(3001, () => {
  console.log("我把端口启动在3001");
});
