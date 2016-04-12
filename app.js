var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');
var mongoose = require('mongoose');
var csrf=require('csurf');

mongoose.connection.on("open", function(){
    console.log("mongodb is connected!!");
});
mongoose.connect('mongodb://localhost:27017/chat');

//controllers
var routes={
    index: require('./routes/index'),
    users: require('./routes/users'),
//    register: require('./routes/register'),
//    login: require('./routes/login'),
//    logout: require('./routes/logout'),
    conversations: require('./routes/conversation'),
};

var middleware={
    auth: require('./middleware/auth/app'),
    chat: require('./middleware/chat/app')
};

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
//app.engine('jade', require('jade').__express);

app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({secret: 'fewqffewffewrgvw'}));
app.use(csrf({cookie:true}));


app.use('/api', middleware.auth);
app.use('/api', middleware.chat);


//allow angular to handle routing
app.use('*', routes.index);
//app.use('/u', routes.users);
//app.use('/c', routes.conversations);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
