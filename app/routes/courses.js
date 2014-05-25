'use strict';

var traceur = require('traceur');
var Course = traceur.require(__dirname + '/../models/course.js');
var multiparty = require('multiparty');
var fs = require('fs');

exports.index = (req, res)=>{
  res.render('courses/index', {title:'WEB: Create Content'});
};

exports.edit = (req, res)=>{
  Course.findByCourseId(req.session.courseId, (course)=>{
    console.log(course);
    res.render('courses/edit', {course:course, title:'WEB: Create Course'});
  });

};

exports.create = (req, res)=>{
  var form = new multiparty.Form();

  form.parse(req, (err, fields, files)=>{
    var title = fields.title.join();
    var summary = fields.summary.join();
    var img = files.image[0].originalFilename;

    fs.mkdirSync(`${__dirname}/../static/img/${req.session.userId}`);
    fs.mkdirSync(`${__dirname}/../static/img/${req.session.userId}/${title}`);
    fs.renameSync(files.image[0].path, `${__dirname}/../static/img/${req.session.userId}/${title}/${img}`);

    var course = new Course(req.session.userId, title, summary, img);
    course.save(()=>{
      req.session.courseId = course._id;
      res.redirect('/courses/edit');
    });
  });
};
