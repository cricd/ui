var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: { path: './build/', filename: 'index.js' },
    
    module: {
        loaders: [
             { test: /\.js$/,
                 exclude: /node_modules/, 
                 loader: 'babel-loader?presets[]=es2015&presets[]=react'
             },
            {
                test: /(\.scss|\.css)$/,
                loaders: ['style', 'css']
            }

        ]
    }
}

