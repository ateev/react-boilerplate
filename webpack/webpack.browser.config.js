const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BabelEnginePlugin = require('babel-engine-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

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
    filename: './js/[name]-[hash].js',
  },
  node: {
    __dirname: false,
  },
  stats: {
    children: false,
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
        test: /\.(png|jpg|svg)$/,
        exclude: /node_modules/,
        use: 'url-loader?limit=8192',
      }, {
        test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: /node_modules/,
        use: 'file-loader',
      }, {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
    ],
  },
  mode: process.env.NODE_ENV || 'development',
  optimization: {
    splitChunks: {
      name: 'vendors',
      filename: './js/vendors-[hash].js',
      chunks: 'initial',
    },
  },
  plugins: [
    new webpack.IgnorePlugin(/(precomputed)/, /node_modules.+(elliptic)/),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV) || JSON.stringify('production'),
      },
    }),
    new HtmlWebpackPlugin({
      title: `Another Boilerplate`,
      template: './src/static/html/index.html',
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],
};

if (process.env.NODE_ENV === 'production') {
  // config only for prod env
  config.module.rules = [...config.module.rules, {
    test: /\.scss?$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'sass-loader',
      'postcss-loader',
    ],
  }, {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
    ],
  }];
  config.optimization.minimizer = [
    new UglifyJSPlugin({
      uglifyOptions: {
        output: { comments: false },
        compress: { warnings: false },
        sourceMap: true,
      },
    }),
  ];
  config.plugins = [...config.plugins,
    new CleanWebpackPlugin(['dist', 'build/js'], {
      verbose: true,
      dry: false,
      root: path.join(__dirname, '..'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash].css',
      allChunks: false,
    }),
    new BabelEnginePlugin({
      presets: ['env'],
    }, {
      verbose: false,
    }),
  ];
}

if (process.env.NODE_ENV === 'development') {
  // config only for dev env
  config.module.rules = [...config.module.rules, {
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  }, {
    test: /\.css$/,
    use: ['style-loader', 'css-loader', 'postcss-loader'],
  }];
  config.plugins = [...config.plugins, new webpack.HotModuleReplacementPlugin()];
  config.devtool = 'eval-source-map';
  config.watchOptions = {
    poll: true,
  };
  config.devServer = {
    hot: true,
    stats: {
      children: false,
    },
  };
  config.cache = true;
  config.entry.home.push('webpack-hot-middleware/client?quiet=true&overlayWarnings=false');
}

module.exports = config;
