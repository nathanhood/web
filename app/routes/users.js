'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');
var multiparty = require('multiparty');
// var fs = require('fs');

exports.register = (req, res)=>{
  var form = new multiparty.Form();

  form.parse(req, (err, fields, files)=>{
    console.log(fields);
    console.log(files);
    // var user = new User(req.body);
    // user.register(u=>{
    //   if(u){
    //     req.session.userId = u._id;
    //   }else{
    //     req.session.userId = null; //message - account already exists
    //   }
    //   res.redirect('/');
    // });
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

exports.student = (req, res)=>{
    User.findByUserId(req.session.userId, user=>{
        res.render('users/student', {user:user, title:'WEB: Student'});
    });
};

exports.teacher = (req, res)=>{
    User.findByUserId(req.session.userId, user=>{
        res.render('users/teacher', {user:user, title:'WEB: Teacher'});
    });
};
