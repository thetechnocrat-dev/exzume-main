var path = require('path');

module.exports = {
  context: __dirname,
  entry: './views/react/main.jsx',
  output: {
    path: path.join(__dirname, 'public', 'javascripts'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react'],
        },
      },
      {
        test: /\.node$/,
        loader: 'node-loader',
      },
    ],
  },
  devtool: 'source-map',
};
