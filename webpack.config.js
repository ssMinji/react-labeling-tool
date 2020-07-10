const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        './src/index.js',
        './src/style.css'
    ],
    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ["@babel/react", "@babel/env"],
                    plugins: ["react-hot-loader/babel"]
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[hash].[ext]'
                }
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'src/')
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
          'process.env':{
            'NODE_ENV': JSON.stringify('production')
          }
        })
    ]
};