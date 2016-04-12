var express = require('express');
var router = express.Router();

// GET home page. 
//router.get('/', function(req, res, next) {
//    req.session.user=undefined;
//    res.redirect('/');
    //res.render('logout.html', { title: 'Express' });
//});

router.post('/', function(req, res, next) {
    req.session.user=undefined;
    res.json({status: 'success'});
});

module.exports = router;
