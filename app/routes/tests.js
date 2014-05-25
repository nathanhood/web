'use strict';

var traceur = require('traceur');
// var Test = traceur.require(__dirname + '/../models/test.js');
var Content = traceur.require(__dirname + '/../models/content.js');

exports.edit = (req, res)=>{
  Content.findByContentId(req.session.courseId, content=>{
    res.render('tests/new', {courseId:req.session.courseId, content:content, title: 'WEB: Create/Edit Test'});
  });
};
