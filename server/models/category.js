var mongoose = require('mongoose');
var CategorySchema = new mongoose.Schema({
    name: String
});

var Products = mongoose.model('Category', CategorySchema);
