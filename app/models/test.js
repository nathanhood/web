'use strict';

var tests = global.nss.db.collection('tests');
var Mongo = require('mongodb');
var _ = require('lodash');
// var bcrypt = require('bcrypt');

class Test{
  constructor(courseId, contentId, contentTitle, qAndA){
    this.courseId = courseId;
    this.contentId = contentId;
    this.contentTitle = contentTitle;
    this.qAndA = qAndA;
  }

  save(fn){
    tests.save(this, ()=>{
      fn();
    });
  }

  gradeTest(answers, fn){
    // answers = _(answers).toArray();
    console.log(answers);
    var correct = 0;
    var incorrect = 0;
    for(var i = 0; i < this.qAndA.length; i++){
      console.log(this.qAndA[i][5].value);
      if(answers[i] === this.qAndA[i][5].value){
        correct += 1;
      }else{
        incorrect += 1;
      }
    }
    console.log(correct);
    console.log(incorrect);
    var total = correct + incorrect;
    var grade = correct / total;
    grade = Math.floor(grade * 100);

    // var returnObj = {};
    // returnObj.correct = correct;
    // returnObj.total = total;
    // returnObj.grade = grade;
    fn(correct, total, grade);
  }

  static findByCourseIdAndContentId(courseId, contentId, fn){
    tests.findOne({courseId:courseId, contentId:contentId}, (err, test)=>{
      fn(test);
    });
  }

  static findByTestId(testId, fn){
    testId = Mongo.ObjectID(testId);
    tests.findOne({_id:testId}, (err, test)=>{
      test = _.create(Test.prototype, test);
      fn(test);
    });
  }
}

module.exports = Test; //exporting Class out
