var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LoginSchema = new mongoose.Schema({
    userName: String,
    loginTime: Number
});

var Logins = mongoose.model('Login', LoginSchema);
