var webpack = require('webpack');
var path = require('path');
var loaders = require('./conf/webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// // global css
// loaders.push({
//   test: /\.css$/,
//   exclude: /[\/\\]src[\/\\]/,
//   loaders: ['style?sourceMap', 'css']
// });
// // local scss modules
// loaders.push({
//   test: /\.scss$/,
//   exclude: /[\/\\](node_modules|public)[\/\\]/,
//   loaders: [
//     'style?sourceMap', 'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base' +
//     '64:5]',
//     'postcss',
//     'sass'
//   ]
// });

// // local css modules
// loaders.push({
//   test: /\.css$/,
//   exclude: /[\/\\](node_modules|bower_components|public)[\/\\]/,
//   loaders: [
//     'style?sourceMap', 'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base' +
//     '64:5]'
//   ]
// });

module.exports = {
  entry: [
    // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './src/app.js'
  ],
  output: {
    path: path.join(__dirname, '/public'),
    publicPath: '/',
    filename: 'app.js'
  },
  // resolve: {
  //   extensions: ['', '.js', '.jsx']
  // },
  devtool: "inline-source-map",
  module: {
    loaders
    // loaders: [
    //   {
    //     test: /\.js$/,
    //     loaders: ['babel'],
    //     exclude: /node_modules/
    //   }
    // ]
  },
  devServer: {
    contentBase: "./public",
    // do not print bundle build stats
    noInfo: true,
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    // port: "8888",
    // host: "127.0.0.1"
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // new HtmlWebpackPlugin(),
  ],
  node: {
    // console: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}