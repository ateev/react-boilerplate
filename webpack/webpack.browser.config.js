const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  name: 'client',
  entry: {
    home: ['./src/components/main-container/main-container.js'],
    vendors: [
      'react',
      'react-dom',
      'superagent',
      'react-redux',
      'react-router',
      'react-router-redux',
      'react-helmet',
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', 'build'),
    publicPath: '/js/',
    filename: './js/[name]-[chunkhash].js',
  },
  node: {
    __dirname: false,
  },
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
        use: [{
          loader: 'babel-loader',
        }],
      }, {
        test: /\.scss?$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      }, {
        test: /\.(png|jpg|svg)$/,
        exclude: /node_modules/,
        use: 'url-loader?limit=8192',
      }, {
        test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: /node_modules/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/(precomputed)/, /node_modules.+(elliptic)/),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: './js/vendors-[chunkhash].js',
      minChunks: Infinity,
    }),
    function () {
      this.plugin('done', (stats) => {
        require('fs').writeFileSync(
          path.join(__dirname, '..', 'src', 'stats.json'),
          JSON.stringify(stats.toJson().assetsByChunkName));
      });
    },
    new ExtractTextPlugin({
      filename: 'css/[name]-[chunkhash].css',
      allChunks: false,
    }),
    new CleanWebpackPlugin(['dist', 'build'], {
      verbose: true,
      dry: false,
      root: path.join(__dirname, '..'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV) || JSON.stringify('production'),
      },
    }),
    new UglifyJSPlugin({
      output: { comments: false },
      compress: { warnings: false },
      sourceMap: true,
    }),
  ],
};

if (process.env.NODE_ENV === 'development') {
  config.devtool = 'source-map';
}
module.exports = config;
