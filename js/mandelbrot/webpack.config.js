var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    mandelbrot: './index.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    libraryTarget: 'var',
    library: '[name]'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.glsl$/,
        loader: 'shader'
      }
    ]
  },
  glsl: {
    chunkPath: __dirname + '/glsl/chunks'
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
