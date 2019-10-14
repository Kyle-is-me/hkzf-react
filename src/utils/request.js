import axios from 'axios'
import {baseURL} from './url'



// 定义公共url
const instance = axios.create({
    baseURL: baseURL   
  });

export default instance