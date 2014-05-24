'use strict';

// var traceur = require('traceur');
// var Content = traceur.require(__dirname + '/../models/content.js');


exports.new = (req, res)=>{
  res.render('contents/new', {title:`WEB: ${req.query.title}`});
};

exports.addResource = (req, res)=>{
  console.log('hello');
  // res.render('contents/addresource');
};

// exports.create = (req, res)=>{
//   var content = new Content(req.body.title, req.params.courseId);
//   res.redirect('courses/create');
// };
