
/**
	* Node.js Login Boilerplate
	* More Info : http://kitchen.braitsch.io/building-a-login-system-in-node-js-and-mongodb/
	* Copyright (c) 2013-2016 Stephen Braitsch
**/

var http = require('http');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var helmet = require('helmet');
//var MongoStore = require('connect-mongo')(session);

var app = express();

app.locals.pretty = true;
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/server/views');
app.set('view engine', 'pug');
app.use(helmet());
app.disable('x-powered-by');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('stylus').middleware({ src: __dirname + '/public' }));
app.use(express.static(__dirname + '/public'));


app.use(session({
	secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
	resave: true,
	saveUninitialized: true,
	keys: ['user', 'pass', 'usertype'],
	cookie: { maxAge: new Date(Date.now() + 60 * 60 * 1000) }//,
	})
);
 
require('./server/routes')(app);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
