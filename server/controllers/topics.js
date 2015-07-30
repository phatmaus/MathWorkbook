module.exports = (function () {
    var mongoose = require('mongoose');
    var Topic = mongoose.model('Topic');

    return {
        add: function (req, res) {
            var topic = new Topic(req.body);
            topic.save(function (err) {
                if (err) {
                    res.sendStatus("400");
                } else {
                    res.sendStatus("200");
                }
            })
        }
    }
})();
