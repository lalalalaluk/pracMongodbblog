var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: '主頁' });
});

router.get('/reg', function(req, res) {
  res.render('register', { title: '註冊' });
});

router.post('/reg', function(req, res) {
  
});

router.get('/login', function(req, res) {
  res.render('login', { title: '登入' });
});

router.get('/login', function(req, res) {
  
});

router.get('/post', function(req, res) {
  res.render('post', { title: '發表' });
});

router.post('/post', function(req, res) {

});

router.get('/logout', function(req, res) {

});
module.exports = router;
