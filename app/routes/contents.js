'use strict';

// var traceur = require('traceur');
// var Course = traceur.require(__dirname + '/../models/course.js');


exports.new = (req, res)=>{
    res.render('contents/new', {title:'WEB: New Stage'});
};
