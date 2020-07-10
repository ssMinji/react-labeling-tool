import express from 'express';
import { getConnection } from '../main';

const router = express.Router();

router.post('/upload', (req, res) => {
    let files = req.body.files;
    //let d = new Date();
    //let nowDate = d.getDate() + '/' + (d.getMonth()+1) + '/' + String(d.getFullYear()).slice(2);

    getConnection((conn) => {
        files.forEach((file) => {
            conn.query('INSET INTO item (url) VALUES (?)', [file],
                (err) => {
                    if(err) throw err;
                    return res.status(200).json({ success: true});
                })
        });
        conn.release();
    });

})



