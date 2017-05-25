var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var pkg = require('./package.json');

// bundle dependencies in separate vendor bundle
var vendorPackages = Object.keys(pkg.dependencies).filter(function (el) {
  return el.indexOf('font') === -1; // exclude font packages from vendor bundle
});

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    index: [
      'babel-polyfill',
      './app/index'
    ],
    vendor: vendorPackages
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'http://localhost:3001/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    sourceMapFilename: '[file].map'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor' + outputFileTemplateSuffix + '.js',
      minChunks: Infinity
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new ExtractTextPlugin("style.[hash].css", {
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  resolveLoader: {
    'fallback': path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: __dirname
    },
    {
      test: /\.css?$/,
      loader: ExtractTextPlugin.extract(
        'style',
        'css?sourceMap&modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss'
      ),
      exclude: /node_modules/,
      include: __dirname
    },
    {
      test: /\.json?$/,
      loader: 'json',
      exclude: /node_modules/,
      include: path.join(__dirname, 'app')
    },
    {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
      loader: 'url-loader',
      query: {
        name: '[hash].[ext]',
        limit: 10000,
      },
    },
    {
      test: /\.(eot|ttf|wav|mp3)$/,
      loader: 'file-loader',
      query: {
        name: '[hash].[ext]',
      },
    }]
  },
  postcss: function (webpack) {
    return [
      require("postcss-import")({ addDependencyTo: webpack }),
      require("postcss-url")(),
      require("postcss-cssnext")(),
      require("postcss-assets")({loadPaths: ['app/']}),
      require("postcss-browser-reporter")(),
      require("postcss-reporter")(),
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  },
};
