const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const webpackBaseConfig = require("./webpack-base-config.js");

module.exports = merge(webpackBaseConfig, {
	
	devtool: "inline-source-map"
})