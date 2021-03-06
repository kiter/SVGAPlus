const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
  mode: 'development',

  entry: {
    index: './dev/index/index.ts',
    lottery: './dev/lottery/index.ts',
    sprite22: './dev/22/index.ts',
  },

  resolve: {
    extensions: ['.js', '.ts']
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env', {
                  useBuiltIns: 'entry',
                  modules: 'auto',
                  loose: false,
                  corejs: {
                    version: 3,
                    proposals: true
                  },
                  targets: [
                    "last 3 Chrome major versions",
                    "last 2 Firefox major versions",
                    "last 2 Safari major versions",
                    "last 2 Edge major versions",
                    "last 1 IE major versions",
                    "last 3 ChromeAndroid major versions",
                    "last 2 iOS major versions"
                  ]
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },

  devServer: {
    contentBase: './',
    compress: true,
    historyApiFallback: true,
    https: false,
    port: 5000,
    quiet: true,
    disableHostCheck: true,
    host: '0.0.0.0'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './dev/index/index.html',
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      template: './dev/lottery/index.html',
      chunks: ['lottery'],
      filename: 'lottery.html'
    }),

    new HtmlWebpackPlugin({
      template: './dev/22/index.html',
      chunks: ['sprite22'],
      filename: '22.html'
    }),

    new FriendlyErrorsPlugin(),

    new webpack.DefinePlugin({
      'process.env.IS_WORKER_BUILD': false
    })
  ]
}
