var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, 'app/index.jsx'),
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: [ '', '.js', '.jsx' ],
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Schengen Calculator'
    })
  ],
  module: {
    loaders: [
      {
        exclude:  /(node_modules|bower_components)/,
        test:     /\.jsx?$/,
        loaders: [
          'react-hot',
          'babel'
        ]
      }
    ]
  }
};
