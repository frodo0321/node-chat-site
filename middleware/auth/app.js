var express=require('express');
var router = express.Router();

var models={
    user: require('./models/user')
}

var controllers={
    register: require('./controllers/register'),
    login: require('./controllers/login'),
    logout: require('./controllers/logout'),
    user: require('./controllers/user'),
}

router.use('/register', controllers.register);
router.use('/login', controllers.login);
router.use('/logout', controllers.logout);
router.use('/user', controllers.user);

module.exports=router;
