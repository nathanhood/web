'use strict';

exports.index = (req, res)=>{
  res.render('home/index', {title: 'WEB: Where Education Begins'});
};

exports.help = (req, res)=>{
  res.render('home/help', {title: 'Node.js: Help'});
};
