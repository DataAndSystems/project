/*
 * @Author: your name
 * @Date: 2021-08-16 13:36:34
 * @LastEditTime: 2021-08-16 13:58:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project\srm-gauge-miniprogram\src\setupProxy.js
 */
const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    // proxy第一个参数为要代理的路由
    // 第二参数中target为代理后的请求网址，changeOrigin是否改变请求头，其他参数请看官网
    app.use('/scale-wechat', createProxyMiddleware({
        target: 'http://localhost:3001/',
        changeOrigin: true
    }))
}