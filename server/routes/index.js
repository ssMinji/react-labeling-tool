import express from 'express';
import account from './account';
import upload from './upload';
import label from './label';

const router = express.Router();

router.use('/*', (req, res, next) => {
    res.setHeader("Expires", "-1");
    res.setHeader("Cache-Control", "must-revalidate, private");
    next();
});

router.use('/account', account);
router.use('/upload', upload);
router.use('/label', label);

export default router;