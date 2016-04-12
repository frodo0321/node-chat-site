var express = require('express');
var router = express.Router();
var Conversation = require('../models/conversation');
var Message=require('../models/message');

/* GET home page. */
router.get('/:id', function(req, res, next) {
    //req.session.user='admin';
    Message.find().where('conversation').equals(req.params.id).populate('sender').exec()
    .then(function(messages) {
        Conversation.findOne().where('_id').equals(req.params.id).exec()
        .then(function(conversation) {
            res.render('conversation.html', {session_user: req.session.user, conversation: conversation, messages: messages, csrfToken: req.csrfToken()});
        });
    });

});

router.post('/:id', function(req, res, next) {
    //req.body.conversation_id
    //req.body.message
    //req.session.user._id
    console.log("CREATING MESSAGE");

    Conversation.findOne({_id: req.params.id}).exec()
        .then(function(convo) {

            var params={message:req.body.message, conversation:convo, sender:req.session.user._id};
            console.log(params);
            Message.createMessage(params)
                .then(function(message) {
                    res.json(message);
                }, function(err) {console.log(err);});
        });
    
    
});

module.exports = router;
