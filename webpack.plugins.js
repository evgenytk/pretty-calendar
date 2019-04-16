const _HtmlWebpackPlugin = require('html-webpack-plugin');
const _MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CSSPlugin = new _MiniCssExtractPlugin({
  filename: './css/main.css'
});

const HTMLPlugin = new _HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html'
})

module.exports = {
  CSSPlugin: CSSPlugin,
  HTMLPlugin: HTMLPlugin
}
