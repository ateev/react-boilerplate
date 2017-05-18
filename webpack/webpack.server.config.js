var webpack = require('webpack');
var fs = require('fs');
var path = require('path');

var nodeModules = {};

fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });


module.exports =
{
  name: 'server',
  target: 'node',
  entry: './src/server.js',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/js/',
    filename: '[name].js',
  },
  node: {
    __dirname: false,
  },
  externals: nodeModules,
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /(\.js$|\.jsx$)/,
        exclude: /node_modules/,
        use: 'eslint-loader',
      },
      {
        test: /(\.js$|\.jsx$)/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /(\.css|\.scss)$/,
        exclude: /node_modules/,
        use: 'null-loader',
      },
      {
        test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: /node_modules/,
        use: 'file-loader',
      },
      {
        test: /\.(png|jpg|svg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=8192',
      },
    ],
  },
};
