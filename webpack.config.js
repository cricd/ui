const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/src/app/index.js')
  ],
  //Config options on how to interpret requires imports
  resolve: {
    extensions: ["", ".js", ".jsx"]
    //node_modules: ["web_modules", "node_modules"]  (Default Settings)
  },
  //Server Configuration options
  devServer: {
    contentBase: 'src/www',  //Relative directory for base of server
    devtool: 'eval',
    hot: true,        //Live-reload
    inline: true
  },
  devtool: 'eval',
  output: {
    path: buildPath,    //Path of output file
    filename: 'app.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      '__NEXTBALLPROCESSOR_URL__': JSON.stringify(process.env.NEXTBALLPROCESSOR_URL) || JSON.stringify('next-ball-processor:3004'),
      '__SCOREPROCESSOR_URL__': JSON.stringify(process.env.SCOREPROCESSOR_URL) || JSON.stringify('score-processor:3002'),
      '__CHANGEPUBLISHER_URL__': JSON.stringify(process.env.CHANGEPUBLISHER_URL) || JSON.stringify('change-publisher:3100'),
      '__ENTITYSTORE_URL__': JSON.stringify(process.env.ENTITYSTORE_URL) || JSON.stringify('entities:1337'),
      '__EVENTAPI_URL__': JSON.stringify(process.env.EVENTAPI_URL) || JSON.stringify('event-api:4567'),
    }),
    // Enabled Superagent
    new webpack.DefinePlugin({ "global.GENTLY": false }),
    //Enables Hot Modules Replacement
    new webpack.HotModuleReplacementPlugin(),
    //Allows error warnings but does not stop compiling. Will remove when eslint is added
    new webpack.NoErrorsPlugin(),
    //Moves files
    new TransferWebpackPlugin([
      { from: 'www' }
    ], path.resolve(__dirname, "src"))
  ],
  module: {
    //Loaders to interpret non-vanilla javascript code as well as most other extensions including images and text.
    preLoaders: [
      {
        //Eslint loader
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, "src/app")],
        exclude: [nodeModulesPath]
      },
    ],
    loaders: [
      {
        //React-hot loader and
        test: /\.(js|jsx)$/,  //All .js and .jsx files
        loaders: ['react-hot-loader/webpack', 'babel'], //react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath]
      },
       {
        test: /(\.scss|\.css)$/,
        loaders: ['style', 'css', 'sass'],
      },
    ]
  },
  //eslint config options. Part of the eslint-loader package
  eslint: {
    configFile: '.eslintrc.json'
  },
  sassLoader: {
    includePaths: [
      './node_modules'
    ]
  }
};
