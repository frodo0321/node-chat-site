var mongoose = require('mongoose');
var schema=mongoose.Schema;
var passwordHash = require('password-hash');
var escape=require('escape-html');


var conversationSchema=new schema({
    name: {type: String, set: escape, match: /^[a-zA-Z0-9_\s]*$/, minlength: 1, maxlength: 100},
    users: [{type: schema.Types.ObjectId, ref: 'User'}],
//    messages: [{type: schema.Types.ObjectId, ref: 'Message'}]
});

conversationSchema.statics.createConversation=function(args) {
    args=args || {};
//    if (args.name) {
//        if (!/^[a-zA-Z0-9_\s]*$/.test(args.name)) {throw new Error("Bad name!")}
//        var nameLength={min: 0, max: 100};
//        if (args.name.length<usernameLength.min || args.username.length>usernameLength.max){
//            throw new Error("Name has wrong length!");
//        }
//    }
    var conversation=new this();
    conversation.name=args.name || "Convesation";
    conversation.users=args.users;
    return conversation.save();
};

conversationSchema.statics.recentConversations=function(user, n, callback) {
    return Conversation.find({users: user}).sort('-date').limit(n).exec(callback);
}

var Conversation=mongoose.model('Conversation', conversationSchema);

module.exports=Conversation;
