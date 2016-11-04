var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'app.js'
  },
  devtool: 'inline-source-map',
  target: 'node', // in order to ignore built-in modules like path, fs, etc. 
  externals: [nodeExternals()], 
  module: {
    loaders: [
      {
        test: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
