'use strict';

var traceur = require('traceur');
var Test = traceur.require(__dirname + '/../models/test.js');
var Content = traceur.require(__dirname + '/../models/content.js');

exports.edit = (req, res)=>{
  Content.findByContentId(req.session.courseId, content=>{
    res.render('tests/new', {content:content, title: 'WEB: Create/Edit Test'});
  });
};

exports.create = (req, res)=>{
  var test = new Test(req.session.courseId, req.body.contentId, req.body.contentTitle, req.body.qAndA);
  test.save(()=>{
    res.render('courses/edit');
  });
};
