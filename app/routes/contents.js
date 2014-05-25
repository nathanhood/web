'use strict';

var traceur = require('traceur');
var Content = traceur.require(__dirname + '/../models/content.js');
var Course = traceur.require(__dirname + '/../models/course.js');


exports.new = (req, res)=>{
  res.render('contents/new', {stage:req.query.title, courseId:req.params.courseId, title:`WEB: ${req.query.title}`});
};

exports.create = (req, res)=>{
  var content = new Content(req.params.courseId, req.body.title, req.body.bodyText, req.body.resources, req.body.videos);
  Course.findByCourseId(req.session.courseId, course=>{
    content.save(()=>{
      course.contentTitles.push(content.title);
      course.contentIds.push(content._id);
      course.save(()=>{
        res.render('contents/edit', {course:course});
      });
    });
  });
};
