module.exports = (function () {
    var mongoose = require('mongoose');
    var Customers = mongoose.model('Customers');

    return {
        show: function (req, res) {
            Customers.find({}, function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(results);
                }
            })
        },
        add: function (req, res) {
            Customers.create(req.body, function (err) {
                if (err) {
                    res.sendStatus(400);
                } else {
                    res.sendStatus(200);
                }
            })
        },
        remove: function (req, res) {
            Customers.remove({
                _id: req.body._id
            }, function (err) {
                if (err) {
                    res.sendStatus(400);
                } else {
                    res.sendStatus(200);
                }
            })
        }
    }
})();
