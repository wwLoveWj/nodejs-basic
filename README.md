<!--
 * @Description: 
 * @Author: Wu Wei
 * @Date: 2024-04-12 22:05:32
 * @LastEditTime: 2024-04-17 20:59:59
 * @LastEditors: Wu Wei
 * @FilePath: \nodejs-basic\README.md
-->
# nodejs-basic
一些基本的nodejs使用

在自己编写一些前端项目的时候经常需要自己编写后端语言，那么我们把nodejs作为我们的临时后端语言来编写一下，做一些简单的记录。


yarn add express-generator -g
express-generator:
            ---是express应用生成器，相当于express 的骨架，进入一个web项目中后，使用express xxx （项目名称）命令，能快速构建 xxx （项目名称）这个应用的目录结构。
express:       
            ---基于Node.js构建的流行Web框架。 我们将使用它来开发REST API。
body-parser:    
            ---Node.js请求主体解析中间件，该中间件在处理程序之前解析传入的请求主体，并使其在req.body属性下可用。 简而言之，它简化了传入请求。
cors:       ---另一种Express中间件，用于启用CORS（跨域资源共享）请求。

express-fileupload:
            ---用于上传文件的Simple Express中间件。 它解析multipart/form-data请求，提取文件（如果有），并在req.files属性下使它们可用。
morgan:     ---用于记录HTTP请求的Node.js中间件。
lodash      ---一个JavaScript库，为数组，数字，对象，字符串等提供实用程序功能。
