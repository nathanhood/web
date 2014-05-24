'use strict';

// var contents = global.nss.db.collection('contents');
// var Mongo = require('mongodb');
// var _ = require('lodash');


class Content{
  constructor(title, courseId){
    this.courseId = courseId;
    this.title = title;
    this.files = [];
    this.links = [];
    this.videos = []; 
  }
}

module.exports = Content; //exporting Class out
