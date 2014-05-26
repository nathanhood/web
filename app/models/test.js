'use strict';

var tests = global.nss.db.collection('tests');
// var Mongo = require('mongodb');
// var _ = require('lodash');
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
}

module.exports = Test; //exporting Class out
