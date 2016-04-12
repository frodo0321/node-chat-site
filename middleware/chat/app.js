var express=require('express');
var router = express.Router();

var controllers={
    conversation: require('./controllers/conversation'),
    message: require('./controllers/message'),
}

router.use('/conversation', controllers.conversation);
router.use('/message', controllers.message);

module.exports=router;
