var express = require('express');
var router = express.Router();
var Conversation = require('../models/conversation');
var Message = require('../models/message');

//get messages
router.get('/', function(req, res, next) {
    //get messages by range
    console.log(req.params);
    //Messages.getMessagesByRange({minRange: 0, maxRange: 10}).then
/*   Message.findOne({username: req.body.username
    })
        .then(function(message) {
            if (user) {
                res.json({status: "already_exists"});
            }
            else {
                res.json({status: "ok"});
            }
        })
    ;*/
    res.json({status: "success", messages: [{blah: "blah"},{blahhh: "blahhhhh"}]});
    })
;

router.post('/', function(req, res, next) {
    console.log(req.body);
    if(req.session.user) {
        Conversation.findOne({_id: req.body.conversationId})
        .then(function(convo) {
            console.log("CREATING MESSAGE");
            Message.createMessage({message: req.body.message, sender: req.session.user._id, conversation: convo}).then(function(message) {
                console.log(message);
                res.json({status: "success", message: {message: message.message, sender: message.sender, timestamp: message.timestamp}});
                }, function(err) {
                    res.json({status: "error"});
                });
        });
    }
    else {
        res.json({status: "not logged in"});
    }
})
;

module.exports=router;
