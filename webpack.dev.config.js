/// <binding ProjectOpened='Hot' />
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  devServer: {
    contentBase: './build',
    port: 3000,
    colors: true,
    historyApiFallback: true,
    inline: true,
    hot: true
  },
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    './app/index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: 'http://localhost:3000/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    sourceMapFilename: '[file].map'
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
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
      loaders: [
        'style',
        'css?sourceMap&modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
        'postcss'
      ],
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
        name: '[path][name].[ext]?[hash]',
        limit: 10000
      },
    },
    {
      test: /\.(eot|ttf|wav|mp3)$/,
      loader: 'file-loader',
      query: {
        name: '[path][name].[ext]?[hash]'
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
