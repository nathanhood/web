'use strict';

var courses = global.nss.db.collection('courses');
var Mongo = require('mongodb');
var _ = require('lodash');


class Course{
  constructor(userId, title, userName, summary, image){
    this.teacherId = userId;
    this.title = title;
    this.userName = userName;
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

  static findAllByUserId(userId, fn) {
    userId = userId.toString();
    courses.find({teacherId:userId}).toArray((err, allCourses)=>{
      fn(allCourses);
    });
  }

  static findByCourseId(courseId, fn){
    courseId = Mongo.ObjectID(courseId);
    courses.findOne({_id:courseId}, (err, course)=>{
      course = _.create(Course.prototype, course);
      fn(course);
    });
  }

  static findAllCourses(emptyObj, fn){
    courses.find(emptyObj).toArray((err, courses)=>{
      fn(courses);
    });
  }

  static findByTitleAndUserName(userName, title, fn){
    courses.findOne({title:title, userName:userName}, (err, course)=>{
      fn(course);
    });
  }

 }

module.exports = Course; //exporting Class out
