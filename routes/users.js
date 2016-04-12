var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Conversation = require('../models/conversation');

//var pattern = new urlPattern('(/:username)');

/* GET users listing. */
router.get('/:username', function(req, res, next) {
    User.findOne().where('username').equals(req.params.username).exec()
        .then(function(user) {
            //user=user;
            return Conversation.find().where('users').equals(user._id).limit(10).exec();
        }).then(function(conversations) {
            //conversations=conversations;
            return conversations;
        }).then(function(conversations) {
            return conversations;
        }, function(err) {
                console.log(err);
        }).then(function(conversations) {
            res.render('user.html', {csrfToken: req.csrfToken(), conversations:conversations, session_user: req.session.user, username: req.params.username});
        });
});

module.exports = router;
