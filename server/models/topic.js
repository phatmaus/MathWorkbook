var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TopicSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }]
});

TopicSchema.path("name").required(true);
TopicSchema.path("description").required(true);
TopicSchema.path("category").required(true);

var Products = mongoose.model('Topic', TopicSchema);
