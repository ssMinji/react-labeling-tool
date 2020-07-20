import express from 'express';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import api from './routes';
import mysql from 'mysql';

let dbconfig = require(__dirname + '/config/db-config.json');
let pool = mysql.createPool(dbconfig);

//connection SUCCESS CHECK
export const getConnection = (callback) => {
    pool.getConnection((err, conn) => {
        if(err) throw err;
        else callback(conn);
        console.log('SQL DATABASE IS CONNECTED');
    
    });
}

const app = express();
const port = 3001;
const devPort = 4000;

app.use(session({
    secret: 'abrain$1234',
    resave: false,
    saveUninitialized: true
}));

app.use(morgan('dev'));
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use('/api', api);

app.use('/', express.static(path.join(__dirname, './../public')));

// support client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../public/index.html'))
});

// handle error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log('Express is listenging on port', port);
});

if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    )
}
