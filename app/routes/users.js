/* jshint unused:false */

'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');
var Course = traceur.require(__dirname + '/../models/course.js');
var multiparty = require('multiparty');
var fs = require('fs');

exports.confirmation = (req, res)=>{
  User.findByUserId(req.session.userId, user=>{
    res.render('home/navigation', {user:user, title:'WEB: Welcome'});
  });
};

exports.register = (req, res)=>{
  var form = new multiparty.Form();

  form.parse(req, (err, fields, files)=>{
    var userName = fields.userName[0].split(' ').map(w=>w.trim()).map(w=>w.toLowerCase()).join('');

    var user = new User(fields, files, userName);
    var filePath = files.image[0].path;
    var fileName = files.image[0].originalFilename;
    user.register(u=>{
      if(u){
        fs.mkdirSync(`${__dirname}/../static/img/${u._id}`);
        fs.renameSync(filePath, `${__dirname}/../static/img/${u._id}/${fileName}`);//need to normalize filepath
        req.session.userId = u._id;
        res.redirect('/confirmation');
      }else{
        req.session.userId = null; //message - account already exists
        res.redirect('/');
      }
    });
  });
};

exports.login = (req, res)=>{
  User.findByUserEmail(req.body.email, user=>{
    if(user){
      user.login(req.body, u=>{
        if(u){
          req.session.userId = u._id;
          res.redirect('/confirmation');
        }else{
          req.session.userId = null; //message - incorrect password
          res.redirect('/');
        }
      });
    }else{
      res.redirect('/'); //message - no account. please register
    }
  });
};

exports.logout = (req, res)=>{
  req.session = null;
  res.redirect('/');
};

exports.profile = (req, res)=>{
  User.findByUserName(req.params.userName, user=>{
    Course.findAllByUserId(user._id, courses=>{
      res.render('users/profile', {user:user, courses:courses, title:`WEB: ${user.userName}`});
    });
  });
};

exports.learn = (req, res)=>{
  User.findByUserId(req.session.userId, user=>{
    Course.findAllCourses({}, courses=>{
      res.render('users/student', {user:user, courses:courses, title:'WEB: Student'});
    });
  });
};

exports.teach = (req, res)=>{
  User.findByUserId(req.session.userId, user=>{
      res.render('users/teacher', {user:user, title:'WEB: Teacher'});
  });
};
