var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

//mongodb新增的
var session = require('express-session');
var MongoStore= require('connect-mongo')(session);

app.use(session({
    secret: settings.cookieSecret,
    key:settings.db,
    cookie:{maxAge:1000*60*60*24*30},
    store: new MongoStore({
        db:settings.db,
        host:settings.host,
        port:settings.port
    })
}));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use("/public",express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
/*
app.use('/public/bootstrap/js', express.static(__dirname + '/public/bootstrap/js'));
app.use('/public/bootstrap/css/', express.static(__dirname + '/public/bootstrap/css/'));
app.use('/public/javascripts/', express.static(__dirname + '/public/javascripts/'));
app.use('/public/stylesheets/', express.static(__dirname + '/public/stylesheets/'));
*/

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
