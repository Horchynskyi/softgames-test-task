const path = require('path');
const address = require('address');

const ip_adress = address.ip(); // your ip for convenient test on mobile

const commonConfig = {
	entry: ['./ts/index.ts'],

	module: {
		rules: [
			{ test: /\.([cm]?ts|tsx)$/, loader: 'ts-loader' },
			// {
			// 	test: /\.tsx?$/,
			// 	use: 'ts-loader',
			// 	include: [path.resolve(__dirname, 'js')],
			// },
		],
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
		// historyApiFallback: {
		// 	rewrites: [
		// 		{ from: /.*\/dist\/app\.js/, to: './app.js' },
		// 		{ from: /.*/, to: './static/devIndex.html' },
		// 	],
		// },
	},

	devtool: 'source-map',

	plugins: [
		// new webpack.ProvidePlugin({
		// 	PIXI: 'pixi.js',
		// }),
		// new DefinePlugin({
		// 	__ENVIRONMENT__: `"DEV"`,
		// }),
	],
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
		// minimizer: [new TerserPlugin({ extractComments: false })],
	},

	plugins: [
		// new webpack.ProvidePlugin({
		// 	PIXI: 'pixi.js',
		// }),
		// new CleanWebpackPlugin(),
		// new DefinePlugin({
		//     __ENVIRONMENT__: `"PROD"`,
		// }),
		// new PostCompile(() => {
		//     replaceOutHtml("./dist");
		//     fs.unlinkSync("./dist/app.js");
		//     console.log('Build completed!');
		// }),
	],
};

module.exports = [devConfig, prodConfig];
