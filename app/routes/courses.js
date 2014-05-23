'use strict';

// var traceur = require('traceur');
// var Course = traceur.require(__dirname + '/../models/course.js');


exports.index = (req, res)=>{
    res.render('courses/index', {title:'WEB: Courses'});
};

exports.form = (req, res)=>{
    res.render('courses/form', {title:'WEB: Create Course'});
};
