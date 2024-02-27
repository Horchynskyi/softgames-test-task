const path = require('path');
const address = require('address');

const ip_adress = address.ip(); // your ip for convenient test on mobile

const commonConfig = {
	entry: ['./ts/index.ts'],

	module: {
		rules: [{ test: /\.([cm]?ts|tsx)$/, loader: 'ts-loader' }],
	},

	resolve: {
		extensions: ['.js', '.ts'],
	},

	externals: {
		tslib: 'tslib',
		anime: 'anime',
	},
};

const devConfig = {
	...commonConfig,

	name: 'development',

	mode: 'development',

	output: {
		path: path.join(__dirname, '/dist/'),
		filename: 'app.js',
	},

	devServer: {
		static: path.join(__dirname, '/dist/'),
		host: ip_adress,
		compress: true,
		port: 9004,
		open: {
			app: {
				name: 'Chrome',
			},
		},
	},

	devtool: 'source-map',
};

const prodConfig = {
	...commonConfig,

	name: 'production',

	mode: 'production',

	output: {
		path: path.join(__dirname, '/dist/'),
		filename: 'app.js',
		publicPath: './',
	},

	optimization: {
		minimize: true,
	},
};

module.exports = [devConfig, prodConfig];
