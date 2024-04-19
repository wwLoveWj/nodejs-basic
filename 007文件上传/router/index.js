/*
 * @Description: 
 * @Author: Wu Wei
 * @Date: 2024-04-19 14:53:36
 * @LastEditTime: 2024-04-19 15:46:13
 * @LastEditors: Wu Wei
 * @FilePath: \nodejs-basic\007文件上传\router\index.js
 */
var express = require('express');
var router = express.Router();//路由模块对请求进行区分隔离

var fs = require('fs'); //文件
var multer = require('multer');   //上传文件中间件
var md5 = require('md5');


// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// 接收到文件后输出的保存路径（若不存在则需要创建）
		cb(null, 'upload/');
	},
	filename: function (req, file, cb) {
		// 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
		// file.originalname   是文件名+后缀
		// file.originalname.substring(file.originalname.lastIndexOf("."))  这里是拿到文件的后缀
		cb(null, md5(Date.now() + file.originalname) + file.originalname.substring(file.originalname.lastIndexOf(".")));  //对当前时间戳 加文件名取MD5 加上后缀名
		// cb(null, Date.now() + "-" + file.originalname);
	}
});
// 创建文件夹  使用此代码就是为了让我们查找磁盘中是否有该文件夹，如果没有，可以自动创建，而不是我们提前手动创建好。如果不使用此代码，则我们再使用该文件夹之前，需要手动创建好当前文件夹
var createFolder = function (folder) {
	try {
		// 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
		// 如果文件路径不存在将会抛出错误"no such file or directory"
		fs.accessSync(folder);
	} catch (e) {
		// 文件夹不存在，以同步的方式创建文件目录。
		fs.mkdirSync(folder);
	}
};

var uploadFolder = './upload/';   //文件按照日期分割创建文件夹
createFolder(uploadFolder);
// 创建 multer 对象
var upload = multer({ storage });


/* 请求接口 */
// 上传前端页面演示请查看my-vue/src/views/Upload.vue
router.post('/upload/file', upload.single('file'), function (req, res, next) {
	const file = req.file;
	console.log('文件类型：%s', file.mimetype);
	console.log('原文件名：%s', file.originalname);
	console.log('文件大小：%s', file.size);
	console.log('保存路径：%s', file.path);
    
	// 接收文件成功后返回数据给前端
	res.send({ ...file, url: `http://localhost:8899/${file.filename}` });
    // 由于我们设置了app.use(express.static(path.join(__dirname, 'upload')))，这是我们在app.js托管的静态资源，访问时路径要去掉upload
});

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

module.exports = router;

