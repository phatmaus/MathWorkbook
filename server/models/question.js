var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var QuestionSchema = new mongoose.Schema({
    question: String,
    description: String,
    userName: String,
    answers: [{
        type: Schema.Types.ObjectId,
        ref: "Answer"
    }],
    createdTimeStamp: Number
});

var Questions = mongoose.model('Question', QuestionSchema);
