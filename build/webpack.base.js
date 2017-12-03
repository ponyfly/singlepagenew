const path = require('path')

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = {
  entry: "./app/js/main.js", //入口文件
  output: {
    path: resolve('dist'),
    filename: "[name].js"
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': resolve('app'),
      '@comp': resolve('app/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: resolve('tmp'),
          }
        },
        include: [resolve('app')],
        exclude: '/node_modules/'
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
            name: 'static/imgs/[name].[hash:8].[ext]'
          }
        }
      },
      {
        test: /\.(woff2?| eot|ttf|otf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'static/fonts/[name].[hash:8].[ext]'
          }
        }
      }
    ]
  }
}