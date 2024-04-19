import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:8899',
  timeout: 60 * 1000, // 请求超时时间
});

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data;
  }
  return Promise.reject(error);
};

request.interceptors.request.use((config) => {
  return config;
}, errorHandler);

request.interceptors.response.use((response) => {
  return response.data;
}, errorHandler);

export default request;
