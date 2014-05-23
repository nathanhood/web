'use strict';

var traceur = require('traceur');
var dbg = traceur.require(__dirname + '/route-debugger.js');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var users = traceur.require(__dirname + '/../routes/users.js');
  var courses = traceur.require(__dirname + '/../routes/courses.js');

  app.get('/', dbg, home.index);
  app.get('/help', dbg, home.help);

  app.post('/users/register', dbg, users.register);
  app.post('/users/login', dbg, users.login);
  app.get('/student', dbg, users.student);
  app.get('/teacher', dbg, users.teacher);

  app.get('/courses/:courseId', dbg, courses.index);
  app.get('/teacher/courses/create', dbg, courses.form);

  console.log('Routes Loaded');
  fn();
}
