const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/authen')

router.get('/chat', isAuthenticated, (req,res) => {
    res.render('Chat')
});

module.exports = router