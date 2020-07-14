import express from 'express';
import { getConnection } from '../main';

const router = express.Router();

/*
    GET /api/label
*/
router.get('/', (req, res) => {
    getConnection((conn) => {
        conn.query('SELECT * FROM item WHERE user_uid = ? AND status = 1', [req.session.loginInfo.uid], 
            (err, result) => {
                if(err) throw err;
                res.json(result);

            });
    });
});

export default router;