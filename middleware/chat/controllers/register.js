var express = require('express');
var router = express.Router();
var User = require('../models/user');
var urlPattern=require('url-pattern');

router.get('/', function(req, res, next) {
    console.log("FEQFFGEG");
    res.render('register.html', { csrfToken: req.csrfToken() });
});


router.post('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    User.findOne({username: req.body.username})
        .then(function(user) {
            if (user) {
                res.json({status: "already_exists"});
            }
            else {
                req.session.user=User.createUser({username: req.body.username, password: req.body.password});
                req.session.save();
                res.json({status: "ok"});
            }    
        })
    ;
});

module.exports = router;
