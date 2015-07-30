module.exports = (function () {
    var mongoose = require('mongoose');
    var Products = mongoose.model('Products');

    return {
        showAvailiable: function (req, res) {
            Products.find({}, function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(results);
                }
            })
        },
        add: function (req, res) {
            console.log("name:", req.body.name);
            Products.find({
                name: req.body.name
            }, function (err, results) {
                console.log(results.length);
                if (results.length > 0) {
                    res.json({
                        errors: {
                            name: {
                                message: "Name allready exists"
                            }
                        }
                    })
                } else {
                    var newProduct = new Products(req.body);
                    newProduct.save(function (err) {
                        if (err) {
                            res.json({
                                errors: newProduct.errors
                            })
                        } else {
                            res.sendStatus(200);
                        }
                    })
                }
            })
        }
    }
})();
