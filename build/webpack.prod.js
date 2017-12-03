const merge = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyjsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = merge(baseConfig, {
  output: {
    path: resolve('dist'),
    filename: 'static/js/[name].[chunkhash:8].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: {
            loader: 'css-loader',
          },
          publicPath:'/'
        }),
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'stylus-loader']
        })
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader' //此处不能用loader: 'css-loader',因为插件没有loader这个属性
            }),
            stylus: ExtractTextPlugin.extract({
              use: ['css-loader', 'stylus-loader']
            })
          },
          transformToRequire:{
            video: 'src',
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      }
    ]
  },
  plugins: [
    //创建一个在编译时可以配置的全局常量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    //构建前清空dist
    new CleanPlugin(['dist'], {
      root: resolve('')
    }),
    //根据html模板生成index.html
    new HtmlPlugin({
      template: resolve('app/index.html'),
      filename: 'index.html',
      inject: true
    }),
    //复制静态文件
    new CopyPlugin([
      {
        from: resolve('static'),
        to: 'static/css/',
        ignore: ['.*']
      }
    ]),
    //根据代码内容生成hash作为模块下标
    new webpack.HashedModuleIdsPlugin(),
    //压缩js
    new UglifyjsPlugin({
      sourceMap: true,
      uglifyOptions: {
        compress:true,
        warnings: false
      }
    }),
    //提取css
    new ExtractTextPlugin({
      filename: 'static/css/[name].[contenthash:8].css'
    }),
    //压缩css并删除重复样式
    new OptimizeCssPlugin(),
    //
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vender',
      minChunks: function (module, count) {
        //任何引入的node_modules下的模块都会被打包到vender
        return module.resource && (/\.js$/).test(module.resource) && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vender'] //从vender中抽取
    })
  ]
})