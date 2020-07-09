const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
  app.use(proxy('/api', 
  {
    // target: "https://jsonplaceholder.typicode.com",//目标服务器
    // target:'http://summer.vaiwan.com',
    target:"http://192.168.0.2:8290",
    secure: false,//如果是https接口 需要配置这个参数为true
    changeOrigin: true,//默认false，是否需要改变原始主机头为目标URL
    pathRewrite: {
      "^/api": ""// 重写请求，比如我们源访问的是api，那么请求会被解析为/
    }
})) //可以配置多个代理
  app.use(proxy('/logins', 
    {
        target:"http://192.168.0.4:8673",//8673 8290
        secure: false,//如果是https接口 需要配置这个参数为true
        changeOrigin: true,//默认false，是否需要改变原始主机头为目标URL
        pathRewrite: {
          "^/logins": ""// 重写请求，比如我们源访问的是api，那么请求会被解析为/
        }
    }));
   
}