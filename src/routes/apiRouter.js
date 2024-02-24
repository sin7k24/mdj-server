const express = require('express');
const path = require('path'); 
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


var multer  = require('multer');
// 格納場所と新しくつけるファイル名の定義
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'img');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({ storage: storage });

router.get('/md2html/:year?/:month?', md2HtmlController.get);

router.get('/md/:year/:month/:day', mdController.get);
router.post('/md', mdController.post);

router.post('/img', upload.single('name'), imgController.post);

router.post('/search', searchController.post);

router.get('/years', historyController.get);

module.exports = router;