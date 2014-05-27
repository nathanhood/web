'use strict';

var users = global.nss.db.collection('users');
var Mongo = require('mongodb');
var _ = require('lodash');
var bcrypt = require('bcrypt');

class User{
  constructor(fields, files, userName){
    this.email = fields.email[0];
    this.password = fields.password[0];
    this.userName = userName;
    this.firstName = fields.firstName[0];
    this.lastName = fields.lastName[0];
    this.age = fields.age[0];
    this.gender = fields.gender[0];
    this.interests = fields.interests[0];
    this.qualifications = fields.qualifications[0];
    this.bio = fields.bio[0];
    this.courses = [];
    this.currentCourses = [];
    this.completeCourses = [];
    this.image = files.image[0].originalFilename;
  }

  register(fn){
    users.findOne({email:this.email}, (err, u)=>{
      users.findOne({userName:this.userName}, (err, u2)=>{
        if(u || u2){//if user email or username exists,
          fn(null);
        }else{
          this.password = bcrypt.hashSync(this.password, 8); //hashed/encrypted version of password
          users.save(this, (err, u)=>{
            fn(u);
          });
        }
      });
    });
  }

  login(user, fn){
    var isMatch = bcrypt.compareSync(user.password, this.password); //(entered password, db password)
    if(isMatch){
      fn(this);
    }else{
      fn(null);
    }
  }

  save(fn){
    users.save(this, ( )=>{
      fn();
    });
  }

  static findByUserName(userName, fn) {
    users.findOne({userName:userName}, (err, user)=>{
      user = _.create(User.prototype, user);
      fn(user);
    });
  }

  static findByUserEmail(email, fn){
    users.findOne({email:email}, (err, user)=>{
      user = _.create(User.prototype, user);
      fn(user);
    });
  }

  static findByUserId(userId, fn){
    userId = Mongo.ObjectID(userId);
    users.findOne({_id:userId}, (err, user)=>{
        user = _.create(User.prototype, user);
        fn(user);
    });
  }

}

module.exports = User; //exporting Class out
