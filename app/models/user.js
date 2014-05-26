'use strict';

var users = global.nss.db.collection('users');
var Mongo = require('mongodb');
var _ = require('lodash');
var bcrypt = require('bcrypt');

class User{
  constructor(obj){
    this.email = obj.email;
    this.password = obj.password;
    this.userName = obj.userName;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.age = obj.age;
    this.gender = obj.gender;
    this.interests = obj.interests;
    this.qualifications = obj.qualifications;
    this.bio = obj.bio;
    this.courses = [];
    this.completeCourses = [];
    this.picture = obj.image;
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
