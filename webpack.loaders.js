const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

const HTMLLoader = {
  	test: /\.html$/,
  	include: path.resolve(__dirname, 'resources/html/includes'),
  	use: ['raw-loader']
};

const CSSLoader = {
	test: /\.scss$/,
	use: ['style-loader', MiniCssExtractPlugin.loader, {loader: 'css-loader', options: {url: false}}, 'postcss-loader', 'sass-loader']
}

const JSLoader = {
	test: /\.(js|jsx)$/,
	exclude: /node_modules/,
	use: {
	  loader: "babel-loader"
	}
}

const TypescriptLoader = {
	test: /\.tsx?$/,
	use: {
	  loader: "awesome-typescript-loader"
	}
}

const SourcemapLoader = {
	enforce: "pre",
	test: /\.js$/,
	use: {
	  loader: "source-map-loader"
	}
}

module.exports = {
	HTMLLoader: HTMLLoader,
	CSSLoader: CSSLoader,
	JSLoader: JSLoader,
	TypescriptLoader: TypescriptLoader,
	SourcemapLoader: SourcemapLoader
}