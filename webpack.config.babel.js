import path from 'path';

export default {
	devTool: 'eval',
	entry: './src/index',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel'],
			include: __dirname,
			exclude: /node_modules/
		}]
	}
};