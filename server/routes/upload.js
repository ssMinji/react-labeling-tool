import express from 'express';
import { getConnection } from '../main';

const router = express.Router();

/* 
    POST /api/upload
    ERROR CODES
        1: NOT LOGGED IN
        2: EMPTY FILES
*/

router.post('/', (req, res) => {
    // CHECK LOGIN STATUS
    if(typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }

    let userID = req.session.loginInfo.uid;

    // CHECK CONTENTS VALID1
    if(typeof req.body.files.length === 0) {
        return res.status(400).json({
            error: "EMPTY FILES",
            code: 2
        });
    }

    let files = req.body.files;
    //let d = new Date();
    //let nowDate = d.getDate() + '/' + (d.getMonth()+1) + '/' + String(d.getFullYear()).slice(2);

    getConnection((conn) => {
        files.forEach((file) => {
            conn.query('INSERT INTO item (url, user_uid) VALUES (?, ?)', [file, userID],
                (err) => {
                    if(err) throw err;
                    
                })
        });
        conn.release();
        return res.status(200).json({ success: true});
    });

})

export default router;

