const webpack = require('webpack')
const webpackConfig = require('./webpack.prod')

console.log('开始打包');
webpack(webpackConfig, function (err, stats){
  console.log('打包完成');
})
