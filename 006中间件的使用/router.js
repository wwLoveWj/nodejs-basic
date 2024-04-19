/*
 * @Description: 
 * @Author: Wu Wei
 * @Date: 2024-04-19 19:48:21
 * @LastEditTime: 2024-04-19 20:09:19
 * @LastEditors: Wu Wei
 * @FilePath: \nodejs-basic\006中间件的使用\router.js
 */
//  https://blog.csdn.net/m0_48375854/article/details/122390823
  const express = require('express');
 
  let app = express();
  app.listen(8888);
   
  //创建路由实例，我们可以在该实例上自由的添加路由
  let usersRouter = express.Router();
  let orderRouter = express.Router();
   
  //添加两个路由到应用上
  app.use('/users', usersRouter);
  app.use('/order', orderRouter);
   
  //注意这时候再加路由，就可以不带前面的/users路径了
//   但是访问的时候需要加上，如：http://localhost:8888/users
  usersRouter.get('/', function (req, res) {
      res.send('用户首页');
  });
   
  usersRouter.get('/:id', function (req, res) {
      res.send(`${req.params.id} 用户信息`);
  });
   
  //注意这时候再加路由，就可以不带前面的/order路径了
  orderRouter.get('/', function (req, res) {
      res.send('订单首页');
  });
   
  orderRouter.get('/:id', function (req, res) {
      res.send(`${req.params.id} 订单信息`);
  });
 
