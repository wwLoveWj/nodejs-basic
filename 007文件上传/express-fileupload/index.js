// 第一步，引入express
var express = require("express");

// 第二步，创建服务器应用程序，即原来的http.createServer()
var app = express();

// 渲染upload-file.html页面
//会直接去下载相应的模板页面
app.get('/upload-file.html', function (request, response) {
    require('fs').readFile('./index.html', function (err, data) {
        response.send(data);
    });
});

// 监听端口，相当于原来的server.listen()
app.listen(8989, function () {
    console.log("app is running at port 8989.");
});
