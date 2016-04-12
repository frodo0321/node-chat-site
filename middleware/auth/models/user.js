var mongoose = require('mongoose');
var schema=mongoose.Schema;
var passwordHash = require('password-hash');
var ValidationError = mongoose.Error.ValidationError;
var ValidatorError  = mongoose.Error.ValidatorError;


function dateToString (date) {
    return new Date(date);
}

var errorMessage="{PATH} {TYPE} violated with {VALUE}";

var userSchema=new schema({
    username: {type: String, required: true, index: {unique: true}, match: /^[a-zA-Z0-9_]*$/, minlength:[1,errorMessage], maxlength:[20,errorMessage]},
    password: {type: String, required: true},
    admin: {type: Boolean, default: false},
    createdAt: {type: Date, get: dateToString},
    lastLogin: {type: Date, get: dateToString}
});

userSchema.statics.createUser=function(args) {
//    if (typeof args.username === 'undefined' || typeof args.password === 'undefined') {
//        throw new Error("Invalid arguments creating User");
//    }
//    if (!/^[a-zA-Z0-9_]*$/.test(args.username)) {throw new Error("Bad Username!")}
//    var usernameLength={min: 1, max: 20};
    var passwordLength={min: 8, max: 20};
    if (args.password.length<passwordLength.min || args.password.length>passwordLength.max){
        throw new ValidationError("Password Length Validation Error");//this).errors.password=new ValidatorError('password', 'Password length is not valid!', 'notvalid', this.password);
    }
//    if (args.password.length<passwordLength.min || args.password.length>passwordLength.max){
//        throw new Error("Password has wrong length!");
//    }
    var user=new this();
    user.username=args.username;
    user.password=passwordHash.generate(args.password);
    user.admin = args.admin || false;
    user.createdAt=Date.now();
    user.lastLogin=Date.now();
//    console.log(user);
    return user.save();
};
userSchema.statics.recentUsers=function(n, callback) {
    return User.find().sort('-date').limit(n).exec(callback); 
}

userSchema.methods.updateLoginDate=function() {
    this.lastLogin=Date.now();
};
userSchema.methods.verifyPassword=function(password) {
    return passwordHash.verify(password, this.password)
};

var User=mongoose.model('User', userSchema);

module.exports=User;
