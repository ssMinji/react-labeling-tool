import express from 'express';
import { getConnection } from '../main';

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
    DO LABEL: POST /api/label/doLabel
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
    GET LABELED FILES: GET /api/label/getLabel
*/
async function getNameByCode(result, conn) {
    return new Promise((resolve, reject) => {
        let data = JSON.parse(JSON.stringify(result));
        let query = 'SELECT name FROM common_code WHERE value = ? AND pid = (SELECT id FROM common_code WHERE name=?)'
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
    ***********EXPERT SIDE***************
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
});

/* 
    ***********FOR EVERYONE************
    GET VERIFIED ITEM: GET /api/label/getVerified
*/
async function getNameByCodeVerified(result, conn) {
    return new Promise((resolve, reject) => {
        let data = JSON.parse(JSON.stringify(result));
        let query = 'SELECT name FROM common_code WHERE value = ? AND pid = (SELECT id FROM common_code WHERE name=?)'
        conn.query(query, [data.category, 'CATEGORY'], 
            (err, results) => {
                if (err) throw err;
                let rows = JSON.parse(JSON.stringify(results[0]));
                let categoryName = rows.name;

                conn.query(query, [data.upload_label, 'LABEL'], 
                    (err, results) => {
                        if (err) throw err;
                        let rows = JSON.parse(JSON.stringify(results[0]));
                        let uploadLabelName = rows.name;

                        conn.query(query, [data.review_label, 'LABEL'],
                            (err, results) => {
                                if(err) throw err;
                                let rows = JSON.parse(JSON.stringify(results[0]));
                                let reviewLabelName = rows.name;

                                data['category'] = categoryName;
                                data['upload_label'] = uploadLabelName;
                                data['review_label'] = reviewLabelName;
                                resolve(data);
                            })
                        
                        
                    });
            })
    });
}

async function getResultVerified(results, conn) {
    const data = await Promise.all(
        results.map(result => {
            return getNameByCodeVerified(result, conn);
        })
    );
    return data;
}

router.get('/getVerified', (req, res) => {
    getConnection((conn) => {
        let query = "SELECT i.id as upload_id, url, category, i.date as upload_date, i.label as upload_label,\n" +
                            "i.comment as upload_comment, i.user_uid as upload_uid, r.comment as review_comment,\n" +
                            "r.date as review_date, r.label as review_label, reviewer_uid \n" +
                    "FROM jeju.item AS i\n" +
                    "JOIN\n" +
                    "(SELECT * FROM jeju.review WHERE item_id IN (SELECT id FROM jeju.item WHERE status=3)) AS r\n" +
                    "ON i.id = r.item_id;";
        conn.query(query, 
            (err, results) => {
                if(err) throw err;
                
                getResultVerified(results, conn).then((data) => {
                    res.json(data);
                })
            })
        conn.release();
    })
})

export default router;