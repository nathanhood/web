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
  var q = {};
  q.question = req.body.question;
  q.answers = req.body.answers;
  q.correct = req.body.correct;
  var courseId = req.session.courseId;
  var contentId = req.params.contentId;

  Test.findByContentId(contentId, test=>{
    if(q.question.length > 0 && q.answers > 0){
      if(test){
        test.qAndA.push(q);
        test.save(()=>{
          res.send({test:test});
        });
      }else{
        Content.findByContentId(contentId, content=>{
          var test = new Test(courseId, contentId, content.title, q);
          test.save(()=>{
            res.send({test:test});
          });
        });
      }
    }else{
      res.send({test:test});
    }
  });
};

exports.deleteQuestion = (req, res)=>{
  var qI = req.body.questionIndex;
  Test.findByContentId(req.params.contentId, test=>{
    var newTest = test.qAndA.splice(qI,1);
    console.log(newTest);
    test.save(()=>{
      res.send({test:test});
    });
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
