var express = require('express');
var router = express.Router();
var User = require('../models/user');
var urlPattern=require('url-pattern');

router.get('/', function(req, res, next) {
    console.log("FEQFFGEG");
    res.render('register.html', { csrfToken: req.csrfToken() });
});


router.post('/', function(req, res, next) {
    User.findOne({username: req.body.username})
        .then(function(user) {
            if (user) {
                res.json({status: "already_exists"});
            }
            else {
                User.createUser({username: req.body.username, password: req.body.password}).then(function(u) {
                    req.session.user=u;
                    req.session.save;
                    res.json({status: "success", user: u.username})
                }, function(err) {console.log(err)});
                //console.log('GHUOGUOGOG');
                //console.log(req.session.user);
                //req.session.save();
                //res.json({status: "ok"});
            }    
        }, function(err) {console.log(err)}
        )
    ;
});

module.exports = router;
