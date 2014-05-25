'use strict';

var contents = global.nss.db.collection('contents');
// var Mongo = require('mongodb');
// var _ = require('lodash');


class Content{
  constructor(courseId, title, bodyText, resources, videos){
    this.courseId = courseId;
    this.title = title;
    this.bodyText = bodyText;
    this.links = resources;
    this.videos = videos;
  }

  save(fn){
    contents.save(this, ( )=>{
      fn();
    });
  }
}

module.exports = Content; //exporting Class out
