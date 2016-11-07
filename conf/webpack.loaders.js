var path = require('path');

module.exports = [
	{
		test: /\.js?$/,
		loader: 'babel-loader',
		exclude: /(node_modules|bower_components|public)/,
		query: {
			presets: ['react', 'es2015']
		}
	},
	{
		test: /\.jsx?$/,
		exclude: /(node_modules|bower_components|public)/,
		loader: 'babel-loader',
		query: {
			presets: ['react', 'es2015']
		}
	},
	{
		test: path.join(__dirname, 'src'),
		exclude: /(node_modules|bower_components|public)/,
		loader: 'babel-loader',
		query: {
			presets: ['react', 'es2015']
		}
	},
	{
		test: /\.json?$/,
		// exclude: /(node_modules)/,
		loader: 'json',
	},
	{
		test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
		exclude: /(node_modules|bower_components)/,
		loader: "file"
	},
	{
		test: /\.(woff|woff2)$/,
		exclude: /(node_modules|bower_components)/,
		loader: "url?prefix=font/&limit=5000"
	},
	{
		test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
		exclude: /(node_modules|bower_components)/,
		loader: "url?limit=10000&mimetype=application/octet-stream"
	},
	{
		test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
		exclude: /(node_modules|bower_components)/,
		loader: "url?limit=10000&mimetype=image/svg+xml"
	},
	{
		test: /\.gif/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?limit=10000&mimetype=image/gif"
	},
	{
		test: /\.jpg/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?limit=10000&mimetype=image/jpg"
	},
	{
		test: /\.png/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?limit=10000&mimetype=image/png"
	}
];