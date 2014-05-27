'use strict';

var traceur = require('traceur');
var Test = traceur.require(__dirname + '/../models/test.js');
var Content = traceur.require(__dirname + '/../models/content.js');
var _ = require('lodash');

exports.edit = (req, res)=>{
  Content.findByContentId(req.params.contentId, content=>{
    res.render('tests/new', {content:content, title: 'WEB: Create/Edit Test'});
  });
};

exports.create = (req, res)=>{
  var test = new Test(req.session.courseId, req.body.contentId, req.body.contentTitle, req.body.qAndA);
  test.save(()=>{
    res.render('courses/edit');
  });
};

exports.index = (req, res)=>{
  var courseId = req.params.courseId;
  var contentTitle = req.params.contentTitle;
  Content.findByCourseIdAndTitle(courseId, contentTitle, content=>{
    var contentId = content._id.toString();
    Test.findByCourseIdAndContentId(courseId, contentId, test=>{
      res.render('tests/index', {content:content, test:test, title: 'WEB: Quiz'});
    });
  });
};

exports.grade = (req, res)=>{
  var answers = _(req.body).toArray().value();
  var testId = req.params.testId;

  Test.findByTestId(testId, test=>{
    test.gradeTest(answers, (correct, total, grade)=>{
      res.render('tests/testalert', {correct:correct, total:total, grade:grade});
    });
  });
};
