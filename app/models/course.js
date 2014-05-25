'use strict';

var courses = global.nss.db.collection('courses');
var Mongo = require('mongodb');
var _ = require('lodash');


class Course{
  constructor(userId, title, summary, image){
    this.teacherId = userId;
    this.title = title;
    this.summary = summary;
    this.image = image;
    this.date = new Date();
    this.students = [];
    this.contentIds = [];
    this.contentTitles = [];
    this.testIds = [];
  }

  save(fn){
    courses.save(this, ()=>{
      fn();
    });
  }

  static findByCourseId(courseId, fn){
    courseId = Mongo.ObjectID(courseId);
    courses.findOne({_id:courseId}, (err, course)=>{
      course = _.create(Course.prototype, course);
      fn(course);
    });
  }

 }

module.exports = Course; //exporting Class out
