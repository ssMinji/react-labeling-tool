import express, { response } from 'express';
import { getConnection } from '../main';
import { resolve } from 'path';

const router = express.Router();

/*
    ***********FARMER SIDE************
    GET UPLOADED FILES: GET /api/label
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

/*
    LABEL: POST /api/label/doLabel
 */
router.post('/doLabel', (req, res) => {
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
    ***********EXPERT SIDE************
    GET LABELED FILES: GET /api/label/getLabel
*/
async function getNameByCode(result, conn) {
    return new Promise((resolve, reject) => {
        let data = JSON.parse(JSON.stringify(result));
        let query = 'SELECT name FROM common_code \
                    WHERE value = ? \
                    AND pid = (SELECT id FROM common_code WHERE name=?)'
        conn.query(query, [data.category, 'CATEGORY'], 
            (err, results) => {
                if (err) throw err;
                let rows = JSON.parse(JSON.stringify(results[0]));
                let categoryName = rows.name;

                conn.query(query, [data.label, 'LABEL'], 
                    (err, results) => {
                        if (err) throw err;
                        let rows = JSON.parse(JSON.stringify(results[0]));
                        let labelName = rows.name;
                        
                        data['category'] = categoryName;
                        data['label'] = labelName;
                        resolve(data);
                    });
            })
    });
}

async function getResult(results, conn) {
    const data = await Promise.all(
        results.map(result => {
            return getNameByCode(result, conn);
        })
        
    );
    return data;
}

router.get('/getLabel', (req, res) => {
    getConnection((conn) => {
        conn.query('SELECT * FROM item WHERE status = 2', 
            (err, results) => {
                if(err) throw err;
                
                getResult(results, conn).then((data) => {
                    res.json(data);
                })
            })
        conn.release();
    })
});


/* 
    LABEL VERIFY: POST /api/label/doVerify
*/
router.post('/doVerify', (req, res) => {
    let files = req.body.files; // itemID, label, comment
    let userID = req.session.loginInfo.uid;
    getConnection((conn) => {
        conn.query('SELECT value FROM common_code WHERE name = ?', [files.label],
            (err, result) => {
                if(err)  throw err;
                let rows = JSON.parse(JSON.stringify(result[0]));
                let labelCode = rows.value; 

                conn.query('INSERT INTO review (item_id, label, comment, uploader_uid, reviewer_uid) VALUES (?, ?, ?, ?, ?)', 
                    [files.itemID, labelCode, files.comment, files.uploader_uid, userID], 
                    (err) => {
                        if(err) throw err;
                    })
                conn.query('UPDATE item SET status = ? WHERE (id = ?)' , [3, files.itemID], 
                    (err, result) => {
                        if(err) throw err;
                        return res.status(200).json({ success: true });
                    })
            })
        conn.release();
    })
})

export default router;