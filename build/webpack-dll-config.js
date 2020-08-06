const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
	mode: "development",
	entry: {
		dll: ["@vue", "@axios", "@fastclick"]
	},
	output: {
		path: path.resolve(__dirname, "../dll"),
		filename: "[name].[chunkhash:5].js",
		publicPath: "",
		library: "[name]_library"
	},
	// module: {
	// 	rules: [
	// 		{
	// 			test: /\.js$/,
	// 			use: ["babel-loader"],
	// 			exclude: /node_modules/
	// 		},
	// 		{
	// 			test: /\.(css|less)$/,
	// 			use: ["css-loader"]
	// 		}
	// 	]
	// },
	plugins: [
		new CleanWebpackPlugin(),
		new webpack.DllPlugin({
			context: __dirname,
			name:　"[name]_library",
			path: path.resolve(__dirname, "../dll/[name]-manifest.json")
		})
	],
	devtool: "inline-source-map",
	resolve: {
		// 别名
		alias: {
			"@vue": path.resolve(__dirname, "../lib/vue.min.js"),
			// "@commom": path.resolve(__dirname, "../lib/commom.js"),
			"@axios": path.resolve(__dirname, "../lib/axios.min.js"),
			"@fastclick": path.resolve(__dirname, "../lib/fastclick.min.js")
		},
		extensions: [".js", ".json", ".vue", ".less"]
	}
}