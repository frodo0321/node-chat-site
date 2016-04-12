var express = require('express');
var router = express.Router();
var User = require('../../../models/user');
var Conversation = require('../models/conversation');
var urlPattern=require('url-pattern');

router.get('/', 
    function(req, res, next) {
        if (req.query.recent_conversations) {
            Conversation.recentConversations(req.session.user, req.query.recent_conversations)
                .then(function(convos) {
                    conversations=convos.map(function(convo) {return {name: convo.name, id: convo._id}});
                    res.json({conversations: conversations});
                })
            ;
        }
        else {
            res.json({status: false});
        }
    }
);

router.post('/', function(req, res, next) {
    //create conversation
    console.log(req.body);
    if(req.session.user==null) {
        res.json({status: "not logged in"});
    }
    else {
        User.findOne({username: req.body.user}).exec().then(function(user) {
            if (user) {
                console.log(req.session.user._id);
                console.log(user._id);
                Conversation.createConversation({users: [req.session.user._id, user._id]}).then(function(convo) {
                    console.log(convo);
                    res.json({status: "success", id: convo._id});
                }, function(err) {
                    console.log(err);
                    res.json({status: "error"});
                });
            }
            else {
                res.json({status: "user does not exist"});
            }
        }, function(err) {
            console.log(err);
            res.json({status: "error"});
        });
    }
    //Conversation.createConversation({users: [req.session.user._id]})
    //    .then(function(convo) {
            
    //    })
    //;
    //add users to conversation

    //change conversation name

});


module.exports=router;
