var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AnswerSchema = new mongoose.Schema({
    answer: String,
    details: String,
    userName: String,
    _question: {
        type: Schema.ObjectId,
        ref: "Question"
    },
    createdTimeStamp: Number,
    likes: Number
});

var Answers = mongoose.model('Answer', AnswerSchema);
