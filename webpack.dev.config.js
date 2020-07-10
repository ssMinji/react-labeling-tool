const webpack = require('webpack');
const path = require('path');

module.exports = {

    /* webpack-dev-server를 콘솔이 아닌 자바스크립트로 실행 할 땐, 
    HotReloadingModule 를 사용하기 위해선 dev-server 클라이언트와 
    핫 모듈을 따로 entry 에 넣어주어야 합니다. */
    
    entry: [
        './src/index.js',
        './src/style.css',
        'webpack-dev-server/client?http://0.0.0.0:4000', // 개발서버의 포트가 이 부분에 입력되어야 제대로 작동합니다
        'webpack/hot/only-dev-server'
    ],

    output: {
        path: '/', // public 이 아니고 /, 이렇게 하면 파일을 메모리에 저장하고 사용합니다
        filename: 'bundle.js'
    },

    // 개발서버 설정입니다
    devServer: {
        hot: true,
        filename: 'bundle.js',
        publicPath: '/',
        historyApiFallback: true,
        contentBase: './public',
        /* 모든 요청을 프록시로 돌려서 express의 응답을 받아오며,
        bundle 파일의 경우엔 우선권을 가져서 devserver 의 스크립트를 사용하게 됩니다 */
        proxy: {
            "**": "http://[::1]:3001" ,// express 서버주소
            secure: false,
            changeOrigin: true
        },
        stats: {
          // 콘솔 로그를 최소화 합니다
          assets: false,
          colors: true,
          version: false,
          hash: false,
          timings: false,
          chunks: false,
          chunkModules: false
        }
    },


    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        //new webpack.NoErrorsPlugin()
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module:{
        rules: [
            {
                test: /.js$/,
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
        // alias: {
        //     _: path.resolve(__dirname, 'src/'),
        //     Actions: path.resolve(__dirname, 'src/actions/'),
        //     Components: path.resolve(__dirname, 'src/components/'),
        //     Containers: path.resolve(__dirname, 'src/containers/'),
        //     Reducers: path.resolve(__dirname, 'src/reducers')
        // }
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'src/')
        ]
    }


};