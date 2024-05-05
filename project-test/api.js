const authorize = require('./authorize');

const router = require('express').Router();

router.get('/hello', (req, res) => {
    res.json(["Hello!", req.user]);
    });

router.get('/admin', authorize, (req, res) => {
    res.json(["Admin page", req.user]);
    });


module.exports = router;