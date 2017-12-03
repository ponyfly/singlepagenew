const express = require('express')
const webpack = require('webpack')
const wdm = require('webpack-dev-middleware')
const whm = require('webpack-hot-middleware')
const path = require('path')
const opn = require('opn')

const devConfig = require('./webpack.dev')

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

const app = express()
const compiler = webpack(devConfig) //加载配置，返回一个用于编译打包的对象(没有进行打包)
//生成dev中间件
const devMiddleware = wdm(compiler, { //在内存中编译打包，不会生成本地文件

})
app.use(devMiddleware)

//监听内存中的资源，一旦有变化，自动编译修改的模块，将新生成的模块推送到浏览器端
const hotMiddleware = whm(compiler, { //在内存中编译打包，不会生成本地文件

})
//挂载到express根目录
app.use(hotMiddleware)

const staticMiddleware = express.static(resolve('static'))
app.use('/static', staticMiddleware)

const port = '8098'
app.listen(port)

opn('http://localhost:' + port)