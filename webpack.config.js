var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app.js'
  },
  devtool: 'inline-source-map',
  target: 'node', 
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
