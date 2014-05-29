'use strict';

var contents = global.nss.db.collection('contents');
var Mongo = require('mongodb');
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

  static findAllByCourseId(courseId, fn){
    console.log(courseId);
    contents.find({courseId:courseId}).toArray((err, contents)=>{
      fn(contents);
    });
  }

  static findByContentId(contentId, fn){
    contentId = Mongo.ObjectID(contentId);
    contents.findOne({_id:contentId}, (err, content)=>{
      fn(content);
    });
  }

  static findByCourseIdAndTitle(courseId, title, fn){
    contents.findOne({courseId:courseId, title:title}, (err, content)=>{
      fn(content);
    });
  }


}

module.exports = Content; //exporting Class out
