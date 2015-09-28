var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen("8080");

var drawboardSchema = require('./schema.js').schema;

io.on('connection', function (socket) {
    socket.on("login", function (data, callback) {
        var username = data.username;
        var password = data.password;
        
        drawboardSchema.User.findOne({ username: username, password: password }, function (err, user) {
            if (user) {
                callback({ success: true, msg: "OK!" });
            } else {
                callback({ success: false, msg: "Wrong credentials!" });
            }
        }); 
    });

    socket.on("register", function (data, callback) {
        var username = data.username;
        var password = data.password;
        
        drawboardSchema.User.findOne({ username: username }, function (err, user) {
            if (user) {
                callback({ success: false, msg: "Username already in use!" });
            } else {
                var user = new drawboardSchema.User({ username: username, password: password });
                user.save(function (err, document) {
                    if (err) {
                        callback({ success: false, msg: "An error occured while creating a new user!", err: err });
                    } else {
                        callback({ success: true, msg: "OK!" });
                    }
                });
            }
        });
    });
});

module.exports = app;