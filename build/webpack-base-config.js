const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const Utils = require("./utils.js");

const entryFile = Utils.getEntryFiles(path.resolve(__dirname, "../src/js/"));
let htmlwebpackpluginArr = [];
console.log(__dirname)

for (let file in entryFile) {
	console.log(file)
	htmlwebpackpluginArr.push(new HtmlWebpackPlugin({
		title: "Document",
		filename: `html/${file}.html`,
		template: path.resolve(__dirname, `../src/html/${file}.ejs`),
		minify: {
			// removeComments: true,
			// collapseWhitespace: true
		},
		chunks: [file],
		// alwaysWriteToDisk: true, // 写入磁盘 要配合html-webpack-harddisk-plugin使用
		injectScripts: [
            path.resolve(__dirname, "../lib/flexible.js")
        ],
	}))
}

module.exports = {
	mode: "development",
	entry: entryFile,
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "js/[name].[chunkhash:5].js",
		publicPath: "/",
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: ["babel-loader"],
				exclude: /node_modules/
			},
			{
				test: /\.(css|less)$/,
				use: ["css-loader"]
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("development")
		}),
		new CleanWebpackPlugin(),
		/*
			https://blog.csdn.net/qq_32842925/article/details/83053860
			多个new htmlWebpackPlugin()
		*/
		...htmlwebpackpluginArr,
		new webpack.DllReferencePlugin({
			context: __dirname,
			// manifest: path.resolve(__dirname, "../dll/dll-manifest.json")
			manifest: require("../dll/dll-manifest.json"),
			name: "dll_library"
		}),
		new HtmlWebpackTagsPlugin({
			tags: ["../dll/dll-manifest.js"],
			append: false
		}),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: "commom"
		// })
	],
	devtool: "inline-source-map",
	resolve: {
		// 别名
		alias: {
			// "@commom": path.resolve(__dirname, "../lib/commom.js")
		},
		extensions: [".js", ".json", ".vue", ".less"]
	}
}