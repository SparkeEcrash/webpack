const path = require('path');
//the path in output option has to be set with "require('path')"
//path.resolve(__dirname) gets the root directory of the project folder which will be where the 'build' folder is created

/*
	1. 'entry' is the file where webpack first reads to start building,
	2. 'mode' is whether webpack will build the bundle.js in 'development' mode (longer with detail) or 'production' mode (minified to maximum)
	3. 'output' is where the bundle.js file will be after building ('in the build folder of the root directory')
		a. You need publicPath to be set to 'dist/' to tell webpack which folders (and path address) the bundled images (or other linked resources) are
		b. the [contenthash] is to update the file name after each build because some web browsers cache js and css files and use cached files when loading the website. If there is an update to the js or css file and the cached file needs to be updated a different name will trigger the browser to download the file with a new different name and update the cached files. The hash within the bundled file name will only change if webpack detects a change in the js or css files it uses to build. 
		c. You do not need [contenthash] if mode is in development because there is no need to think about outside users browsers caching our web files that are created in development mode
	4. 'modules' is where you load the 'loaders' like 'babel-loader' for webpack to be able to understand and load 'babel'
		a. 'use' is which loader to use ('babel-loader' will read through the option property to go through the preset lists of dependencies that babel will use to transpile OR you can have a separate '.babelrc' file that you can use in place of an options property)
		b. 'use' will always read the loaders in the array from right to left starting with the last element in array to the first
		c. 'test' is where which files should be transpiled for the loader
		d. 'css-loader' opens the css file and 'style-loader' understands the styling rules in the css file
*/


// LIST OF PLUGIN DOCS
// https://webpack.js.org/plugins/

// CONFIGURATION MODE DOCS
// https://webpack.js.org/configuration/mode/

// const TerserPlugin = require('terser-webpack-plugin');
// minifies the kilobyte size of the bundle.js file in output
// unlike Uglify.JS plugin, the Tereser plugin supports ES 2015+ (ES6+) code
// NOT NEEDED IN DEVELOPMENT MODE BECAUES WE DO NOT NEED MIINIFIED JS FILES WHILE DEVELOPING

// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// the order of the css rules that are written in styles.css depends on the order
// of the imported components js or css files as a result of reading through
// index.js
// NOT NEEDED IN DEVELOPMENT MODE BECAUSE WE DO NOT WANT SEPARATE CSS FILES WHILE DEVELOPING

const HtmlWebpackPlugin = require('html-webpack-plugin');
// this creates a new html file that will have proper links to the
// css and javascript files that contain the most recent hash code 
// values in their file names

// you can write your own html templates for the html pages for JS frameworks like handlebars, ejs, or pug
// documentation is at...
// https://github.com/jantimon/html-webpack-plugin

// WEBPACK DEV SERVER
// webpack-dev-server is a downloaded dependency that sets up
// a new localhost server and with configurations set in
// in webpack config within "devServer" option
// IT WILL ALSO NOT BUILD ANY NEW FILES IN THE DIST FOLDER
// WHICH WILL REQUIRE "WEBPACK" COMMAND IN PACKAGE.JSON

module.exports = {
	entry: {
		'hello-world': './src/index.js',
		'amiibo': './src/index_two.js'
		//you need to use new url addresses for localhost servers with multiple html pages
		// 1. http://localhost:9000/hello-world.html 
		// ** name of 'hello-world.html' from new HtmlWebpackPlugin()
		// 2. http://localhost:900/amiibo.html
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, './dist'),
		publicPath: ''	
		// publicPath: 'dist/'	
		// *NOTE: dist/ is not necessary if the index.html file is built using HtmlWebpackPlugin and is also inside the dist folder as well
	},
	mode: 'development', //'none' 'development' or 'production'
	//sets process.env.NODE_ENV on DefinePlugin to value specified 
	// it enables different sets of plugins for each mode (sourcemaps is enabled in development)
	// you can trace errors back to its proper file source in mode 'development'
	devServer: {
		// this are options related to running webpack-dev-server
		// when you run npm run webpack-dev-server it will load using these options
		// and with the prefix --hot it will auto update the browsers with changes
		// in codes
		contentBase: path.resolve(__dirname, './dist'),
		index: 'hello-world.html',
		port: 9000
	},
	module: {
		rules: [
			{
				test: /\.(png|jpg)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.css$/,
				use: [
					// MiniCssExtractPlugin.loader, 'css-loader'
					'style-loader', 'css-loader'
				]
			},
			{
				test: /\.scss$/,
				use: [
					// MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
					'style-loader', 'css-loader', 'sass-loader'
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/env'],
						plugins: ['transform-class-properties']
					}
				}
			},
			{
				test: /\.hbs$/,
				use: [
					'handlebars-loader'
				]
			}
		]
	},
	plugins: [
		// new TerserPlugin(),
				// *** not necessary because we do not want minified files while developing 
		// new MiniCssExtractPlugin({
		// 	filename: 'styles.css'
		// }),
				// *** not necessary because we do not want separate css files while developing
		// new CleanWebpackPlugin({
		// 	cleanOnceBeforeBuildPatterns: [
		// 		'**/*',	//this one line is the default setting
		// 		path.join(process.cwd(), 'build/**/*') //this will also clean up the build folder
		// 	]
		// }),
				// *** not necessary if we are running webpack-dev-server
		new HtmlWebpackPlugin({
			//configure options for the webpack generated html file here
			filename: 'hello-world.html',
			chunks: ['hello-world'],
			title: 'Hello world',
			template: 'src/index.hbs',
			// filename: 'subfolder/custom_filename.html',
			// the generated html file will be within the 'dist' folder and within the 'subfolder' folder
			meta: {
				description: 'Some description'
			}
		}),
		new HtmlWebpackPlugin({
			//configure options for the webpack generated html file here
			filename: 'amiibo.html',
			chunks: ['amiibo'],
			title: 'Amiibo',
			template: 'src/index.hbs',
			// filename: 'subfolder/custom_filename.html',
			// the generated html file will be within the 'dist' folder and within the 'subfolder' folder
			meta: {
				description: 'Some description 2'
			}
		})
	]
};