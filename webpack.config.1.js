var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/main.js',
  output: {
    path: __dirname,
    filename: 'build.js'
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
      }, {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  }
}
