var mongoose = require('mongoose');
var CustomerSchema = new mongoose.Schema({
    name: String,
    createdDate: Number
});
var Customer = mongoose.model('Customers', CustomerSchema);
