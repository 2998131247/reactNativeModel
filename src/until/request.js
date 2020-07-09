import axios from 'axios';

const http = axios.create({
    baseURL: 'http://114.67.103.122:8868',
    // baseURL: 'http://192.168.0.115:8868',
    timeout: 10000
});

//请求拦截处理
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

//返回拦截处理
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default http;