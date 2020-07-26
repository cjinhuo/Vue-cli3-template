const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  publicPath: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  chainWebpack: (config) => {
    config.devtool('source-map')
    config.resolve.alias.set('src', resolve('@'))
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        BlankLayout: [path.resolve(resolve('./src/layouts/BlankLayout')), 'default']
      })
    ]
  },
  devServer: {
    proxy: {
      '/api': {
        target: ' https://www.easy-mock.com/mock/',
        changeOrigin: true,
        pathRewrite: { '^/api': '5b7a5611f0e3593f36141420' }
      }
    }
  },
  css: {
    modules: false,
    sourceMap: true
  }
}
