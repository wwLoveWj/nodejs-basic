/*
 * @Description: 
 * @Author: Wu Wei
 * @Date: 2024-04-19 15:07:10
 * @LastEditTime: 2024-04-19 15:08:34
 * @LastEditors: Wu Wei
 * @FilePath: \nodejs-basic\my-vue\src\request\api.js
 */
import request from './index';

const URLS = {
  uploadImage: '/upload/file',
};

export const uploadImage = (data) => request({ method: 'post', url: URLS.uploadImage, data });

