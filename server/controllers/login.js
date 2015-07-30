module.exports = (function () {
    var mongoose = require('mongoose');
    var Login = mongoose.model('Login');

    return {
        login: function (req, res) {
            if (!!req.body.userName && req.body.userName.length > 0) {
                req.session.userData = {}
                req.session.userData.name = req.body.userName;
                req.session.userData.userType = "user";
                req.session.userData.serverId = 42;

                var login = new Login({
                        userName: req.body.userName,
                        loginTime: Date.now()
                    }) //log user logging in

                login.save(function (err) {
                    res.json({
                        sessionId: req.sessionID,
                        serverId: 42,
                        userType: "user",
                        userName: req.session.userData.name
                    })
                })
            } else {
                res.sendStatus(400);
            }
        },
        logout: function (req, res) {
            req.session.destroy();
            res.sendStatus(200);
        },
        check: function (req, res) {
            if (!!req.session.userData) {
                (function _checkLoginSuccess() {
                    res.json({
                        sessionId: req.sessionID,
                        serverId: 42,
                        userType: "user",
                        userName: req.session.userData.name
                    })
                }(req.session.userData))

            } else {
                (function _checkLoginFailiure() {
                    res.sendStatus(400);
                }())
            }
        }
    }
})();
