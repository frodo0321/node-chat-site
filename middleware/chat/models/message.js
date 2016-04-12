var mongoose = require('mongoose');
var schema=mongoose.Schema;
var passwordHash = require('password-hash');
var escape=require('escape-html');
var Conversation = require('./conversation');
//var User = require('./user');

function dateToString (date) {
    return new Date(date);
}


var messageSchema=new schema({
    message: {type: String, set: escape, maxlength: [500]},
    conversation: {type: schema.Types.ObjectId, ref: 'Conversation'},
    sender: {type: schema.Types.ObjectId, ref: 'User'},
    timestamp: {type: Date, get: dateToString },
    usersUnread: [{type: schema.Types.ObjectId, ref: 'User'}],
});

messageSchema.statics.createMessage=function(args) {
    //args message, conversation, sender, usersUnread=conversation.users-sender
    args=args || {};
    args.conversation=args.conversation || {};
    var message=new this();
    message.message=args.message;
    message.conversation=args.conversation._id;
    message.sender=args.sender;
    message.timestamp=Date.now();
    message.usersUnread=args.conversation.users;
    console.log(message.usersUnread);
    message.usersUnread.pull(message.sender);
    return message.save();
};


messageSchema.statics.recentMessages=function(n, callback) {
    return Messages.find().sort('-date').limit(n).exec(callback); 
}

messageSchema.statics.getMessagesByRange=function(args, callback) {
    return Messages.find().sort('-date').skip(args.minRange).limit(args.maxRange-args.minRange).exec(callback); 
}

var Message=mongoose.model('Message', messageSchema);

module.exports=Message;
