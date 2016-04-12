var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res, next) {
    console.log(req.query);
    if (req.query.username_available) {
        User.findOne({username: req.query.username_available})
            .then(function(user) {
                if (user) {
                    res.json({status: false});
                }
                else {
                    res.json({status: true});
                }
            })
        ;
    }
    else if (req.query.recent_users) {
        User.recentUsers(req.query.recent_users).then(function(users) {
            usernames=users.map(function(u) {return u.username});
            res.json(usernames);
        });
    }
    else {
        res.status(400).send('Bad Request!');
    }
});

module.exports = router;
