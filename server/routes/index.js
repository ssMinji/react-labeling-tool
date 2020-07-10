import express from 'express';
import account from './account';

const router = express.Router();
router.use('/account', account);

router.use('/*', (req, res, next) => {
    res.setHeader("Expires", "-1");
    res.setHeader("Cache-Control", "must-revalidate, private");
    next();
});

export default router;