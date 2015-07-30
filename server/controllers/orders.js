module.exports = (function () {
    var mongoose = require('mongoose');
    var Orders = mongoose.model('Orders');
    var Products = mongoose.model('Products');

    return {
        show: function (req, res) {
            Orders.find({}, function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(results);
                }
            })
        },
        add: function (req, res) {
            Products.findOne({
                    name: req.body.product
                },
                function (err, results) {
                    console.log("stock:", results, " ammount:", req.body.ammount);
                    if (err || results.stock < req.body.ammount) {
                        res.sendStatus(501);
                    } else {
                        Products.update({
                            name: req.body.product
                        }, {
                            $inc: {
                                stock: -req.body.ammount
                            }
                        }, function (err) {
                            if (err) {
                                (function () {
                                    res.sendStatus(500);
                                }())
                            } else {
                                Orders.create(req.body, function (err) {
                                    if (err) {
                                        (function () {
                                            res.sendStatus(500);
                                        }())
                                    } else {
                                        (function () {
                                            res.json({
                                                newStock: results.stock - req.body.ammount
                                            });
                                        }())
                                    }
                                })
                            }
                        })
                    }
                }

            )
        }
    }
}())
