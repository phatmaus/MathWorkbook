var mongoose = require('mongoose');
var OrderSchema = new mongoose.Schema({
    customerName: String,
    product: String,
    ammount: Number,
    dateCreated: Number
});
var Orders = mongoose.model('Orders', OrderSchema);
