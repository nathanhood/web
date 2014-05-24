'use strict';

// var traceur = require('traceur');
// var Course = traceur.require(__dirname + '/../models/course.js');


exports.index = (req, res)=>{
    res.render('courses/index', {title:'WEB: Create Content'});
};

exports.edit = (req, res)=>{
    res.render('courses/edit', {title:'WEB: Create Course'});
};
