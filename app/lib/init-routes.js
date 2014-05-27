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
  app.post('/login', dbg, users.login);
  app.get('/logout', dbg, users.logout);
  app.get('/users/:userName', dbg, users.profile);
  app.get('/confirmation', dbg, users.confirmation);
  app.get('/learn', dbg, users.learn);
  app.get('/teach', dbg, users.teach);

  app.get('/users/:userName/:courseId', dbg, courses.index);//student side - course index
  app.get('/users/:userName/:courseTitle/preview', dbg, courses.preview);
  app.get('/courses/edit', dbg, courses.edit);//teacher side
  app.post('/courses/create', dbg, courses.create);

  app.get('/users/:userName/:courseId/:contentTitle', dbg, contents.index);
  app.get('/teacher/:courseId/content', dbg, contents.new);
  app.post('/teacher/:courseId/content/create', dbg, contents.create);

  app.get('/users/:userName/:courseId/:contentTitle/quiz', dbg, tests.index);
  app.get('/teacher/:contentId/test', dbg, tests.edit);
  app.post('/teacher/:contentId/test/create', dbg, tests.create);
  app.post('/learn/:testId/grade', dbg, tests.grade);

  console.log('Routes Loaded');
  fn();
}
