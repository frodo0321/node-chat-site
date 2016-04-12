var express = require('express');
var router = express.Router();
var User=require('../models/user');

router.get('/', function(req, res, next) {
    User.recentUsers(10)
        .then(function(users) {
            //res.cookie("XSRF-TOKEN", req.csrfToken());
            res.render('index.html', {users: users, session_user: req.session.user, csrfToken: req.csrfToken() })
        }
    );
//    res.render('index.html', {users: undefined, user: req.session.user});
});

module.exports = router;
