var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var UserSchema = new Schema( {
    name: String,
    branch: String,
    college: String,
    email: {
        type: String,
        index: true
    },
    username: {
        type: String,
        unique: true
    },
    password: String,
    salt: String
});

UserSchema.pre('save',
    function (next) {
    if (this.password) {
        //var md5 = crypto.createHash('md5');
        //this.password = md5.update(this.password).digest('hex');

        this.salt = crypto.randomBytes(16).toString('hex');
        this.password = crypto.pbkdf2Sync(this.password, this.salt, 1000, 64).toString('hex');
    }
    
    next();
}
);

UserSchema.methods.authenticate = function (password) {
    //var md5 = crypto.createHash('md5');
    //md5 = md5.update(password).digest('hex');
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.password === hash;
};

mongoose.model('User', UserSchema);