module.exports = (function () {
    var mongoose = require('mongoose');
    var Question = mongoose.model('Question');

    return {
        add: function (req, res) {
            (function addQuestion(body) {
                var question = new Question(body);
                question.answers = [];
                if (question.question.length >= 10) {
                    question.save(function (err) {
                        if (err) {
                            res.sendStatus("400");
                        } else {
                            res.sendStatus("200");
                        }
                    })
                } else {
                    res.sendStatus("401");
                }
            }(req.body))

        },
        get: function (req, res) {
            (function getQuestions() {
                Question.find({}).populate("answers").exec(function foundQuestions(err, results) {
                    if (err) {
                        res.sendStatus("400");
                    } else {
                        res.json(results);
                    }
                })
            }())

        }
    }
})();
