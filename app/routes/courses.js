'use strict';

var traceur = require('traceur');
var Course = traceur.require(__dirname + '/../models/course.js');
var Content = traceur.require(__dirname + '/../models/content.js');
var multiparty = require('multiparty');
var fs = require('fs');

exports.index = (req, res)=>{
  res.render('courses/index', {title:'WEB: Create Content'});
};

exports.edit = (req, res)=>{
  Course.findByCourseId(req.session.courseId, (course)=>{
    Content.findAllByCourseId(req.session.courseId, (contents)=>{
      res.render('courses/edit', {course:course, contents:contents, title:'WEB: Create Course'});
    });
  });

};

exports.create = (req, res)=>{
  var form = new multiparty.Form();

  form.parse(req, (err, fields, files)=>{
    var title = fields.title.join();
    var summary = fields.summary.join();
    var img = files.image[0].originalFilename;

    if(!fs.existsSync(`${__dirname}/../static/img/${req.session.userId}`)){//checking if userId dir was made during login
      fs.mkdirSync(`${__dirname}/../static/img/${req.session.userId}`);
    }

    if(!fs.existsSync(`${__dirname}/../static/img/${req.session.userId}/${title}`)){//checking if directory for course already exists
      fs.mkdirSync(`${__dirname}/../static/img/${req.session.userId}/${title}`);
      fs.renameSync(files.image[0].path, `${__dirname}/../static/img/${req.session.userId}/${title}/${img}`);//need to normalize filepath

      var course = new Course(req.session.userId, title, summary, img);
      course.save(()=>{
        req.session.courseId = course._id;
        res.redirect('/courses/edit');
      });
    }else{
      res.redirect('/courses/edit');//need to write error message for user
    }
  });
};
