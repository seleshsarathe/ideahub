const mongoose = require("mongoose")
const plm = require("passport-local-mongoose")

mongoose.connect("mongodb://0.0.0.0:27017/ideashub")

const userSchema = mongoose.Schema({
  username:String,
  age:Number,
  name:String,
  profilepic:String,
  email:String,
  password:String,
  otp:Number,
  exp:Number,
  pins:[{type: mongoose.Schema.Types.ObjectId, ref:"images" }] ,
  following:[{type: mongoose.Schema.Types.ObjectId, ref:"images" }] ,
  followers:[{type: mongoose.Schema.Types.ObjectId, ref:"images" }] ,
  savedpins:[{pin:String , sharedto:String,pinid:String}],
  albums:Array

})

userSchema.plugin(plm)

module.exports = mongoose.model("user",userSchema)
