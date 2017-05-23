var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    './client/src/index.jsx',
  ],
  output: {
<<<<<<< HEAD
    path: path.join(__dirname, '/client/dist'),

=======
    path: path.join(__dirname, 'client/dist'),
>>>>>>> f7501673b58269be7107a54f93f167a29192fca5
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
    // js
      {
        exclude: '/node_modules/',
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['lodash'],
            presets: ['es2015', 'react', 'stage-2'],
          },
        },
      },
    // CSS
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
};
