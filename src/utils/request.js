import axios from 'axios'
import {baseURL} from './url'

import { Toast } from 'antd-mobile';

// 定义公共url
const instance = axios.create({
    baseURL: baseURL   
  });



//设置请求拦截器
// Add a request interceptor
instance.interceptors.request.use(function (config) {
  Toast.loading('加载中...',0)
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
}); 


// 设置响应拦截器
// Add a response interceptor
instance.interceptors.response.use(function (response) {
  Toast.hide()
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});



export default instance