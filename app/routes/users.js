'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');

exports.register = (req, res)=>{
  var user = new User(req.body);
  user.register(u=>{
    if(u){
      req.session.userId = u._id;
    }else{
      req.session.userId = null;
    }
    res.redirect('/');
  });
};

// exports.login = (req, res)=>{
//   user.register(u=>{
//     if(u){
//       req.session.userId = u._id;
//     }else{
//       req.session.userId = null;
//     }
//     res.redirect('/');
//   });
// };
