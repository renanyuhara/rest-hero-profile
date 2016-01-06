module.exports = function(app, passport, express) {
	var mongoose = require('mongoose');
	var jwt = require("jsonwebtoken");
	var superSecret = 'supersenhaativarformadeumcocodegelo';

	app.get('/', function(req,res) {
		var resultado = {
			head: 5,
			torso: 40,
			right_arm: 15,
			right_hand: 5,
			right_leg : 25,
			right_foot : 5,
			left_arm : 15,
			left_hand : 5,
			left_leg: 25,
			left_foot : 5
		};
		res.status(202).json(resultado);
	});

	var apiRouter = express.Router();

	apiRouter.post('/authenticate', function(req,res) {

	});

	apiRouter.use(function(req, res, next) {
		console.log('Somebody just came to our app!');

		// check header or url parameters or post parameters for token
		var token = req.body.token || req.query.token || req.headers['x-app-token'];

		// decode token
		if (token) {

			// verifies secret and checks exp
			jwt.verify(token, superSecret, function(err, decoded) {      
				if (err) {
					return res.json({ success: false, message: 'Failed to authenticate token.' });   
				} else {
					// if everything is good, save to request for use in other routes
					req.decoded = decoded;    
					next(); // make sure we go to the next routes and don't stop here
				}
			});

		} else {

			// if there is no token
			// return an HTTP response of 403 (access forbidden) and an error message
			return res.status(403).send({ 
				success: false, 
				message: 'No token provided.' 
			});

		}
	});	

	apiRouter.get('/', function(req,res) {
		res.json({ message: 'hooray! welcome to our api'});
	});

	app.use('/api', apiRouter);

	app.get('/test1', function(req,res) {
		res.status(202).json({result : "Rota bem maneira", debug: "rota:/test1"});
	});

	app.route('/hero')
		.get(function(req,res) {
			var resultado = '';

			resultado = req.query['id'] || 'default';
			
			/*
			if (req.param('id') != undefined) {
				resultado = req.param('id');
			} else {
				resultado = 'no_id'
			}
			*/
			var _header = 'no_header';			
			if (req.headers['x-app-token'] != undefined) {
				_header = req.headers['x-app-token'];
			}
			res.status(200).json({result : resultado, header : _header});
		})
		.post(function(req,res) {
			res.status(200).json({result : "Entrou no post do /hero"});
		})
		.put(function(req,res) {
			res.status(200).json({result : "Entrou no put do /hero"});
		})
		.delete(function(req,res) {
			res.status(200).json({result : "Entrou no delete do /hero"});
		});
/*
	app.all('*', function(req, res) {
		var erro = { error : "Página não encontrada" };
		res.status(404).json(erro);
	});
*/
};