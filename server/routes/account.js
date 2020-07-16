import express from 'express';
import { getConnection } from '../main';
import { get } from 'http';
//import bcrypt from 'bcrpytjs';

const router = express.Router();
const bcrypt = require('bcryptjs');
/*
    ACCOUNT SIGNUP: POST /api/account/signup
    ERROR CODES:
        1: BAD USERNAME
        2: BAD PASSWORD
        3: USERNAME ALREADY EXIST
*/
router.post('/signup', (req, res) => {

    let idRegex = /^[a-z0-9]+$/;

    if(!idRegex.test(req.body.uid)) {
        return res.status(400).json({
            error: "BAD USERNAME!!!",
            code: 1
        });
    }
    console.log(req.body);

    // CHECK PW LENGTH
    if(req.body.pw.length < 4 || typeof req.body.pw !== "string") {
        return res.status(400).json({
            error: "BAD PW!!!",
            code: 2
        });
    }

    getConnection((conn) => {
        conn.query('SELECT * FROM user WHERE uid = ? ', [req.body.uid],
            (err, result) => {
                if (err) throw err;
                if (result.length !== 0) {
                    return res.status(400).json({
                        error: "USER EXIST",
                        code: 3
                    });
                } 
                bcrypt.hash(req.body.pw, 10, (err, hash) => {
                    if(err) throw err;
                    const sql = "INSERT INTO user (password, name, uid, flag, date_of_birth, phone_num, email, company) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                    const values = [hash, req.body.username, req.body.uid, req.body.job, 
                                    req.body.dateOfBirth, req.body.phoneNum, req.body.email, req.body.company];
                    conn.query(sql, values, (err) => {
                        if(err) throw err;
                        return res.status(200).json({ success: true });
                    })
                });
            });
        
        conn.release();
    });

    
});

/* 
    ACCOUNT SIGNIN: POST /api/account/signin
    ERROR CODES:
        1: LOGIN FAILED
*/
router.post('/signin', (req, res) => {
    if (req.body.uid && req.body.password && req.body.job) {
        getConnection((conn) => {
            conn.query('SELECT * FROM user WHERE uid = ?', [req.body.uid], (err, result) => {
                if (err) throw err;
                if (result.length !== 0) {
                    let pw = result[0].password;
                    bcrypt.compare(req.body.password, pw, (err, result) => {
                        if(err) throw err;
                        conn.query('SELECT * FROM user WHERE uid = ? AND password = ? AND flag = ?', [req.body.uid, pw, req.body.job],
                            (err, result) => {
                                if (err) throw err;
                                if (result.length === 0) {
                                    return res.status(401).json({
                                        error: 'LOGIN FAILED',
                                        code: 1
                                    });
                                }

                                let rows = JSON.parse(JSON.stringify(result[0]))
                                let session = req.session;
                                
                                session.loginInfo = {
                                    _id: rows.id,
                                    uid: rows.uid
                                }

                                return res.json({
                                    success: true
                                });
                            });
                        
                    });
                }
            });
            conn.release();
        });
    }
});

router.get('/getinfo', (req, res) => {
    if (typeof req.session.loginInfo === "undefined") {
        return res.status(401).json({
            error: 1
        });
    }

    res.json({ info: req.session.loginInfo });
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => { if(err) throw err; });
    return res.json({ success: true });
});

export default router;