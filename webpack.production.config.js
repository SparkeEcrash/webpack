const path = require('path');
//the path in output option has to be set with "require('path')"
//path.resolve(__dirname) gets the root directory of the project folder which will be where the 'build' folder is created

/*
	1. 'entry' is the file where webpack first reads to start building,
	2. 'mode' is whether webpack will build the bundle.js in 'development' mode (longer with detail) or 'production' mode (minified to maximum)
	3. 'output' is where the bundle.js file will be after building ('in the build folder of the root directory')
		a. You need publicPath to be set to 'dist/' to tell webpack which folders (and path address) the bundled images (or other linked resources) are
		b. the [contenthash] is to update the file name after each build because some web browsers cache js and css files and use cached files when loading the website. If there is an update to the js or css file and the cached file needs to be updated a different name will trigger the browser to download the file with a new different name and update the cached files. The hash within the bundled file name will only change if webpack detects a change in the js or css files it uses to build. 
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
// NOT NEEDED IF MODE IS SET TO PRODUCTION IN CONFIG BECAUSE WEBPACK DOES IT BY DEFAULT

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// the order of the css rules that are written in styles.css depends on the order
// of the imported components js or css files as a result of reading through
// index.js

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// this is used to clean up the dist output folder in order to erase
// cached files of previous builds which will be replaced by new ones
// when updated files with a different [contenthash] code replaces the
// older ones

const HtmlWebpackPlugin = require('html-webpack-plugin');
// this creates a new html file that will have proper links to the
// css and javascript files that contain the most recent hash code 
// values in their file names

// you can write your own html templates for the html pages for JS frameworks like handlebars, ejs, or pug
// documentation is at...
// https://github.com/jantimon/html-webpack-plugin

module.exports = {
	// entry: './src/index.js',
	// BELOW IS USED FOR MULTIPLE ENTRY POINTS
	entry: {
		'hello-world': './src/index.js',
		'amiibo': './src/index_two.js'
	},
	output: {
		// filename: 'bundle.[contenthash].js',
		filename: '[name].[contenthash].js',
		// name grabs name of file
		path: path.resolve(__dirname, './dist'),
		publicPath: ''	
		// publicPath: 'dist/'	
		// *NOTE: dist/ is not necessary if the index.html file is built using HtmlWebpackPlugin and is also inside the dist folder as well
	},
	mode: 'production', //'none' 'development' or 'production'
	//sets process.env.NODE_ENV on DefinePlugin to value specified 
	// it enables different sets of plugins for each mode (sourcemaps is enabled in development)
	// you can trace errors back to its proper file source in mode 'development'
	optimization: {
		//the default splitting will only occur when the shared dependencies exceed 70 kilobytes like lodash
		splitChunks: {
			chunks: "all",
			minSize: 10000
			//the splitting will occur when shared dependencies exceed 10000 bytes
		}
	},
	// this is to handle Code Splitting
	// we do not want to load the same Javascript or CSS Code multiple 
	// times for each page if they are shared across multiple pages
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
					MiniCssExtractPlugin.loader, 'css-loader'
				]
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
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
		new MiniCssExtractPlugin({
			// filename: 'styles.[contenthash].css'
			filename: '[name].[contenthash].css'
		}),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [
				'**/*',	//this one line is the default setting
				path.join(process.cwd(), 'build/**/*') //this will also clean up the build folder
			]
		}),
		new HtmlWebpackPlugin({
			//configure options for the webpack generated html file here
			filename: 'hello-world.html',
			chunks: ['hello-world', 'amiibo~hello-world'],
			// the chunk property here notes which resources are going to be linked with this generated HTML page
			// the properties come form the values that are set in the entry setting of this webpack config at the start
			// You need 1. the index_two.js file that gets compiled from entry 'amiibo'
			// You need 2. the shared 'vendors~amiibo~hello-world' javascript file generated from creating chunk in the 'optimization' setting
			// which are used in other pages and designed for code splitting (browser caching)
			// ** 2. You need to match the file name here to whatever was created in the dist folder for the shared chunk
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
			title: 'Amiibo',
			chunks: ['amiibo', 'amiibo~hello-world'], 
			// the chunk property here notes which resources are going to be linked with this generated HTML page
			// the properties come form the values that are set in the entry setting of this webpack config at the start
			// You need 1. the index_two.js file that gets compiled from entry 'amiibo'
			// You need 2. the shared 'vendors~amiibo~hello-world' javascript file generated from creating chunk in the 'optimization' setting
			// which are used in other pages and designed for code splitting (browser caching)
			// ** 2. You need to match the file name here to whatever was created in the dist folder for the shared chunk
			template: 'src/index.hbs',
			// filename: 'subfolder/custom_filename.html',
			// the generated html file will be within the 'dist' folder and within the 'subfolder' folder
			meta: {
				description: 'Some description 2'
			}
		})
	]
};