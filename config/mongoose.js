var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function () {
    var db = mongoose.connect(config.db);
    console.log('database running at' + config.db);
    require('../app/models/user.server.model');
    return db;
};