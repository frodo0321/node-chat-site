var mongoose=require('mongoose')
var User=require('./user');
var Conversation=require('./conversation');
var Message=require('./message');

process.on('SIGINT', function() {mongoose.disconnect();console.log("mongodb is disconnected!");});
mongoose.connection.on("open", function(){
    console.log("mongodb is connected!!");

    function createConvo(names) {User.find().where('username').in(names).exec()
        .then(function(users) {
                console.log(users);
                Conversation.createConversation({name:names.join(' '),users:users})
                    .then(function(convo) {
                        console.log(convo);
                    }, function(err) {console.log(err);})
        });}
    //find all conversations where USER is a member
    function findConvo(username) {
        Conversation.find().populate('users', null, {username:username}).exec()
            .then(function(convos) {
                console.log(convos.filter(function(convo){return convo.users.length;}));
            });
    }
    //much easier
    function findIdConvo(id) {
        Conversation.find({users: mongoose.Types.ObjectId('56effe7d51ae4b261f4a8561')}).exec()
            .then(function(convos) {console.log("QWQWQWQ");console.log(convos);}, function(err) {console.log("OPPOOOPP");console.log(err)});
    }
    //findIdConvo();
    //createConvo(["Po", "Bob"]);
    //findConvo("Alice");

    //  MESSAGE

    function createMessage(sender, message, convo) {
        User.findOne({username:sender}).exec()
            .then(function(user) {
                //mock convo
                sender=user;
                return Conversation.findOne().exec();
            })
            .then(function(conversation) {
                convo=conversation;
                return Message.createMessage({message:message, sender:sender, conversation:convo});
            })
            .then(function(message) {
                console.log("WEEWQE");
                console.log(convo);
                console.log(message);
            }).catch(function(err) {
                console.log(err);
            });
            
    }
        //Message.createMessage({message })
    createMessage("Bob", "Hello", 0);


});
mongoose.connect('mongodb://localhost:27017/chat');
//alice: 56effe7d51ae4b261f4a8561


