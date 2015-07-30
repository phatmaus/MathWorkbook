var express = require("express");
var path = require("path");
var app = express();
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, "./client/static")));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use(bodyParser.json());

app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

require('./server/config/mongoose.js');

app.use(session({
    secret: 'codingdojo12',
    store: new MongoStore({
        url: 'mongodb://localhost/BlackBelt',
        autoReconnect: true,
        cookie: {
            maxAge: 60 * 60 * 10000
        }
    })
}));

require("./server/config/routes.js")(app);

var server = app.listen(80, function () {});
