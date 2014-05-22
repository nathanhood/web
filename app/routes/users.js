'use strict';

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

exports.login = (req, res)=>{
  user.register(u=>{
    if(u){
      req.session.userId = u._id;
    }else{
      req.session.userId = null;
    }
    res.redirect('/');
  });
};
