const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: './build/',
    filename: 'index.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      '__SCOREPROCESSOR_URL__': JSON.stringify(process.env.SCOREPROCESSOR_URL) || JSON.stringify('score-processor:3002'),
      '__CHANGEPUBLISHER_URL__': JSON.stringify(process.env.CHANGEPUBLISHER_URL) || JSON.stringify('change-publisher:3100'),
    }),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader?presets[]=es2015&presets[]=react',
    }, {
      test: /(\.scss|\.css)$/,
      loaders: ['style', 'css', 'sass'],
    },
    ],
  },
};
