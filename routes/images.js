const mongoose = require("mongoose")

mongoose.connect("mongodb://0.0.0.0:27017/ideashub")

const imageSchema = mongoose.Schema({
  createduser:{type: mongoose.Schema.Types.ObjectId, ref:"user" },
  pin:String,
  title:String,
  description:String,
  comment :[{
    user:{type: mongoose.Schema.Types.ObjectId, ref:"user" },
    comment:String
  }],
  website:String
})


module.exports = mongoose.model("images",imageSchema)
