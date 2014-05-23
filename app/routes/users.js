'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');

exports.register = (req, res)=>{
  var user = new User(req.body);
  user.register(u=>{
    if(u){
      req.session.userId = u._id;
    }else{
      req.session.userId = null; //message - account already exists
    }
    res.redirect('/');
  });
};

exports.login = (req, res)=>{
  User.findByUserEmail(req.body.email, user=>{
    if(user){
      user.login(req.body, u=>{
        if(u){
          req.session.userId = u._id;
        }else{
          req.session.userId = null; //message - incorrect password
        }
        res.redirect('/');
      });
    }else{
      res.redirect('/'); //message - no account. please register
    }
  });
};
