const express = require('express');
const router = express.Router();
const md2HtmlController = require('../controllers/md2HtmlController');

router.get('/md2html/:year?/:month?', md2HtmlController.get);

module.exports = router;