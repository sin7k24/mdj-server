const express = require('express');
const md2HtmlController = require('../controllers/md2HtmlController');
const mdController = require('../controllers/mdController');
const searchController = require('../controllers/searchController');
const historyController = require('../controllers/historyController');
const imgController = require('../controllers/imgController');

const router = express.Router();
const myLogger = function (req, res, next) {
    console.log('LOGGED : ', req.originalUrl)
    next()
  }
router.use(myLogger);

router.get('/md2html/:year?/:month?', md2HtmlController.get);

router.get('/md/:year/:month/:day', mdController.get);
router.post('/md', mdController.post);

router.post('/img', imgController.post);

router.post('/search', searchController.post);

router.get('/years', historyController.get);

module.exports = router;