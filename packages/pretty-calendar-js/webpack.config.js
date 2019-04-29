const fs = require('fs');
const path = require('path');

const prod = process.env.NODE_ENV === 'production';

const loaders = require('./webpack.loaders.js');
const plugins = require('./webpack.plugins.js');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    port: 3000,
    writeToDisk: true
  },
  mode: prod ? 'production' : 'development',
  devtool: prod ? false : 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: './app.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  entry: {
    app: [
      './src/js/index.ts', 
      './src/scss/main.scss'
    ]
  },
  module: {
    rules: [
      loaders.CSSLoader,
      loaders.JSLoader,
      loaders.TypescriptLoader,
      loaders.SourcemapLoader,
    ]
  },
  plugins: [
    plugins.CSSPlugin,
    plugins.HTMLPlugin
  ]
};