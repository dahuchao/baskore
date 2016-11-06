var path = require('path')
var nodeExternals = require('webpack-node-externals')

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8888";

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: "bundle.js"
    },
    devtool: "inline-source-map",
    // externals: [nodeExternals()],
    module: {
        loaders: [
            {
                test: path.join(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
	devServer: {
		contentBase: "./public",
		// do not print bundle build stats
		noInfo: true,
		// enable HMR
		hot: false,
		// embed the webpack-dev-server runtime into the bundle
		inline: false,
		// serve index.html in place of 404 responses to allow HTML5 history
		historyApiFallback: true,
		port: PORT,
		host: HOST
	}
}