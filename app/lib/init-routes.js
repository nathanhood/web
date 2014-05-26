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
  var contents = traceur.require(__dirname + '/../routes/contents.js');
  var tests = traceur.require(__dirname + '/../routes/tests.js');

  app.get('/', dbg, home.index);
  app.get('/help', dbg, home.help);

  app.post('/users/register', dbg, users.register);
  app.post('/users/login', dbg, users.login);
  app.get('/student', dbg, users.student);
  app.get('/teacher', dbg, users.teacher);

  app.get('/student/courses/:courseId', dbg, courses.index);//student side - course index
  app.get('/courses/edit', dbg, courses.edit);//teacher side
  app.post('/courses/create', dbg, courses.create);

  app.get('/teacher/:courseId/content', dbg, contents.new);
  app.post('/teacher/:courseId/content/create', dbg, contents.create);

  app.get('/teacher/:contentId/test', dbg, tests.edit);
  app.post('/teacher/:contentId/test/create', dbg, tests.create);

  console.log('Routes Loaded');
  fn();
}
