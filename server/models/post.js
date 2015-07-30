var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostSchema = new mongoose.Schema({
    content: String,
    _topic: {
        type: Schema.ObjectId,
        ref: "Topic"
    }
});

var Products = mongoose.model('Post', PostSchema);
