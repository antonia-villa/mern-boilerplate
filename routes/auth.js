require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var bcrypt = require('bcrypt');
// Used for creating and sending tokens and protecting backend routes
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

// POST /auth/login route - returns a JWT
router.post('/login', function(req, res, next) {
  console.log('/auth/login post route', req.body);
  //First, try and find the user
  User.findOne({email: req.body.email}, function(err, user){
  	// If no user object or user does not have a password
  	if(!user || !user.password){
  		return res.status(404).send({error: true, message: 'User Not Found'})
  	}

  	// compare entered password with password in database
  	var passwordMatch = bcrypt.compareSync(req.body.password, user.password);
  	if(passwordMatch){
  		// Password passed verification
		//Make a token and send it to the caller
		var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
			// calculated in seconds
			expiresIn: 60*60*24 //Expire in 24 hours
		});

		res.send({user:user, token:token})
  	}
  	else {
  		// Bad password - fails verification
  		res.status(401).send({error: true, message: 'Password failed verification'});
  	}
  })
});


// POST /auth/signup route - create a user in the DB and then log them in
router.post('/signup', function(req, res, next) {
  console.log('/auth/signup post route', req.body);
  User.findOne({ email: req.body.email}, function(err, user){
  	if(user){
  		return res.status(400).send({error: true, message: 'User already exists! Please login.'});
  	}
  	else {
  		console.log('req body', req.body);
  		User.create(req.body, function(err, user){
  			if(err) {
  				return res.status(503).send({error:true, message:'Database error: '+ err.message})
  			}
  			else {
  				//Make a token and send it to the caller
  				var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
  					// calculated in seconds
  					expiresIn: 60*60*24 //Expire in 24 hours
  				});

  				res.send({user:user, token:token});
  			}
  		});
  	}
  });
});

// This is checked on a browser refresh
router.post('/me/from/token', function(req, res, next) {
  // check header or url parameters or post parameters for token
  console.log('find user from token', req.body);
  var token = req.body.token || req.query.token;
  if(!token){
  	return res.status(418).send({error:true, message: "You must be a teapot."})
  }

  //Get the user from the token
  jwt.verify(token,process.env.JWT_SECRET, function(err, user){
  	if(err){
  		return res.status(500).send({error: true, message: 'JWT Verification Error -' + err});
  	}

  	User.findById({
  		'_id': user._id
  	}, function(err, user){
  		if(err){
  			return res.status(500).send({error: true, message: 'Database Error -' + err.message});
  		}
  		else if (!user) {
  			return res.status(404).send({error: true, message: 'User unable to be found from token'});
  		}

  				//Make a token and send it to the caller
		var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
			// calculated in seconds
			expiresIn: 60*60*24 //Expire in 24 hours
		});

		res.send({user:user, token:token});

  	});
  });
});

module.exports = router;
