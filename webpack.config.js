var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: './js/main.js',
    buddhabrot: './js/buddhabrot.js',
    attractor: './js/attractor.jsx'
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
      }
    ]
  },
  stats: {
    colors: true
  },
  // devtool: 'source-map'
};
