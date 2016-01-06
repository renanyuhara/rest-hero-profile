try {
	var express  = require('express');
	var app      = express();
	var bodyparser = require('body-parser');
	var mongoose = require("mongoose");
	var passport = require("passport");
	var flash = require("connect-flash");

	var morgan = require("morgan");
	var cookieParser = require("cookie-parser");
	var session = require("express-session");

	mongoose.connect('mongodb://localhost:27017/rest_test');

	require('./config/passport')(passport); // pass passport for configuration

	app.use(morgan('dev'));
	app.use(cookieParser());
	app.set('view engine', 'ejs');

	app.use(bodyparser.json());
	app.use(bodyparser.urlencoded({ extended : true}));

	app.use(function(req,res,next) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-app-token');
		next();
	});
	
	app.use(express.static(__dirname + '/public'));

	require('./app/routes.js')(app, passport, express);
	
	var porta = process.env.PORT || 8089;
	app.listen(porta);

	console.log("Rodando na porta " + porta);

} catch(err) {
	console.log("Error : " + err.message);
}
