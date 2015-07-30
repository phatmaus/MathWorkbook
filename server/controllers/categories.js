module.exports = (function () {
    var mongoose = require('mongoose');
    var Categories = mongoose.model('Category');

    return {
        get: function (req, res) {
            Categories.find({}, function (err, results) {
                if (err) {
                    res.sendStatus(400);
                } else {
                    res.json(results);
                }
            })
        }
    }
})();
