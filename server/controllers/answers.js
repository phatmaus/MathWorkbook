module.exports = (function () {
    var mongoose = require('mongoose');
    var Answer = mongoose.model('Answer');
    var Question = mongoose.model('Question');

    return {
        add: function (req, res) {
            if (req.body.answer.length >= 5) {
                Question.findOne({
                    _id: req.body._question
                }, function (err, question) {
                    var answer = new Answer(req.body);
                    answer.likes = 0;
                    question.answers.push(answer);

                    answer.save(function (err) {
                        question.save(function (err) {
                            if (err) {
                                res.sendStatus("400");
                            } else {
                                res.sendStatus("200");
                            }
                        })
                    })
                })
            } else {
                res.sendStatus("401");
            }
        },
        get: function (req, res) {
            (function getAnswers() {
                Answer.find({}, function foundAnswers(err, results) {
                    if (err) {
                        res.sendStatus("400");
                    } else {
                        res.json(results);
                    }
                })
            }())
        },
        like: function (req, res) {
            Answer.findOne({
                _id: req.body._id
            }, function (err, answer) {
                if (err) {
                    res.sendStatus("400");
                } else {
                    answer.likes += 1;
                    answer.save(function (err) {
                        if (err) {
                            res.sendStatus("400");
                        } else {
                            res.sendStatus("200");
                        }

                    })
                }
            })
        }
    }
})();
