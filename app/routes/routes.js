const express = require('express');
const router = express.Router();
const consumer = require('./consumer');

router.use((req,res,next)=>{
    if (req.headers['app-origins']) {
        next();
    } else {
        res.json('direct access not allowed');
    }
});

router.use('/consumer',consumer);
module.exports = router;
