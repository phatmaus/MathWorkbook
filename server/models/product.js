var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
    name: String,
    stock: Number,
    imageUrl: String
});
ProductSchema.path("name").required(true, "Name cannot be blank");
ProductSchema.path("stock").required(true, "Stock cannot be null");
ProductSchema.path("imageUrl").required(true, "Image Url cannot be blank");

var Products = mongoose.model('Products', ProductSchema);
