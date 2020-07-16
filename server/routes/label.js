import express from 'express';
import { getConnection } from '../main';

const router = express.Router();

/*
    FARMER SIDE
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

router.post('/doLabel', (req, res) => {
    // console.log(req.body.files);
    let categoryCode;
    let labelCode;
    let comment = req.body.files.comment;
    let itemID = req.body.files.itemID;
    getConnection((conn) => {
        conn.query('SELECT value FROM common_code WHERE name= ?', [req.body.files.category],
            (err, result) => {
                if(err) throw err;
                let rows = JSON.parse(JSON.stringify(result[0]));
                categoryCode = rows.value;

                conn.query('SELECT value FROM common_code WHERE name = ?', [req.body.files.label],
                    (err, result) => {
                        if (err) throw err;
                        let rows = JSON.parse(JSON.stringify(result[0]));
                        labelCode = rows.value;

                        //console.log('result !!!', categoryCode, 2, labelCode, comment, itemID);

                        conn.query('UPDATE item SET category = ?, status = ?, label = ?, comment = ? WHERE (id = ?)', [categoryCode, 2, labelCode, comment, itemID],
                            (err, result) => {
                                if (err) throw err;
                                return res.status(200).json({ success: true });
                            })
                    }) 
            })
        conn.release();
    })
});

/*
    EXPERT SIDE
    GET /api/getLabel
*/
router.get('/getLabel', (req, res) => {
    let categoryName;
    let labelName;
    let datas;
    getConnection((conn) => {
        conn.query('SELECT * FROM item WHERE status = 2', 
            (err, result) => {
                if(err) throw err;
                // 각각의 row에 대해 label값, category값 대체 필요
                datas = JSON.parse(JSON.stringify(result[0]));
                let query = 'SELECT name FROM common_code \
                            WHERE value = ? \
                            AND pid = (SELECT id FROM common_code WHERE name=?)'
                conn.query(query, [datas.category, 'CATEGORY'], 
                    (err, result) => {
                        if (err) throw err;
                        let rows = JSON.parse(JSON.stringify(result[0]));
                        categoryName = rows.name;

                        conn.query(query, [datas.label, 'LABEL'], 
                            (err, result) => {
                                if (err) throw err;
                                let rows = JSON.parse(JSON.stringify(result[0]));
                                labelName = rows.name;
                                
                                datas['category'] = categoryName;
                                datas['label'] = labelName;
                                console.log('type', typeof(datas))

                            })
                    })
                res.json(result);
            });
    });
});

export default router;