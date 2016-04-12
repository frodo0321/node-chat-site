var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res, next) {
    res.render('login.html', { csrfToken: req.csrfToken() });
});


router.post('/', function(req, res, next) {
    User.findOne({username: req.body.username})
        .then(function(user) {
            if (user) {
                if (user.verifyPassword(req.body.password)) {
                    user.updateLoginDate();
                    req.session.user=user;
                    req.session.save();
                    res.json({status: "success"});
                }
                else {
                    res.json({status: 'invalid password'});
                }
            }
            else {
                res.json({status: 'invalid user'});
            }
        })
    ;
});

module.exports = router;
