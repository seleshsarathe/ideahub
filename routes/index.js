var express = require('express');
var router = express.Router();
const userModel = require("./users")
const imageModel = require("./images")
const expressSession = require("express-session")
const passport = require("passport")
const passportLocal = require('passport-local');
const multer = require("multer")
const download = require("image-downloader")
const mongoose = require('mongoose');
const sendMail = require("../nodemailer");
const { logging } = require('googleapis/build/src/apis/logging');
const LocalStrategy = passportLocal.Strategy;
passport.use(new LocalStrategy(userModel.authenticate()));



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/uploads')
  },
  filename: function (req, file, cb) {
    const fn = Date.now() + Math.round(Math.random() * 1E9)+file.originalname
    cb(null, fn)
  }
})

const profilepic = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/profilepic')
  },
  filename: function (req, file, cb) {
    const fn = Date.now() + Math.round(Math.random() * 1E9)+file.originalname
    cb(null, fn)
  }
})

const propic = multer({storage:profilepic})
const upload = multer({storage:storage})



router.post('/pin', isLoggedIn,upload.single("pin"),async function (req, res, next) {
  
  path = req.file.destination.slice(6)
  filename = path +"/"+ req.file.filename
  
  const newPin = await imageModel.create({
    pin: filename,
    title: req.body.title,
    description: req.body.desc,
    website:req.body.website,
    createduser:req.user._id
  })
    const loggedInUser = req.user 
    loggedInUser.pins.push(newPin._id)
    loggedInUser.save()
    res.redirect("/home")
  })



/* GET home page. */
router.post('/forget',async function(req, res, next) {
  user = await userModel.findOne({email:req.body.email})
  console.log(req.body.email)
  console.log(user)
  if(user){
    user.otp = Math.floor(Math.random()*100000)
    user.exp = Date.now() + 3600000
    await user.save()
    sendMail(user.email,user._id,user.otp)
    console.log("mail sent")
  }
});

router.get('/', isLogedOut,function(req, res, next) {
  console.log("heloo===========")
  res.render('index', { title: 'Express' });
});

router.get('/editprofile',isLoggedIn,async function(req, res, next) {
  res.render('edit',{user:req.user} );
});

router.post('/profilephoto',isLoggedIn,propic.single('file'),async function(req, res, next) {
  console.log("uploaded?")
  if(req.file){
    path = req.file.destination.slice(6)
    filename = path +"/"+ req.file.filename
  }
  
  const loggedInUser = req.user
  if(req.file){
    loggedInUser.profilepic = filename
  }
  loggedInUser.name = req.body.naam
  loggedInUser.email = req.body.email
  loggedInUser.username = req.body.username
  loggedInUser.save()
  res.redirect("/profile")
});

router.get('/change/:id/:otp',async function(req, res, next) {
  user = await userModel.findOne({_id:req.params.id})
  console.log(user)
  console.log(Date.now(),user.exp)
  console.log("link is lol")
  if(user.exp === 69){
  res.render("change",{id:user._id,state:"lol",otp:req.params.otp,pic:user})
  }
  else if(Date.now()>user.exp){
    res.render("change",{id:user._id,state:"link",otp:req.params.otp,pic:user})
  }
  else{
    res.render("change",{id:user._id,state:"ok",otp:req.params.otp,pic:user})
  }
});

router.post('/changepassword',async function(req, res, next) {
  user = await userModel.findOne({_id:req.body.id})
  console.log(user)
  if(Date.now()>user.exp){
    console.log("link expires")
  }
  else if(user.otp != req.body.otp){
    console.log("otp is lol")
  }
  else{
    user.exp = 69
    user.setPassword(req.body.password, function(err, user){
      user.save()
      res.redirect("/")
    })
  }
});

router.get('/profilealbums',isLoggedIn, function(req, res, next) {
  saved = req.user.savedpins
  saved.reverse()
  var pins = {}
  album = req.user.albums
  album.forEach((deta)=>{
    pins[deta] = []
  })
    saved.forEach((data)=>{
      console.log(data)
    pins.allpins.push(data.pin)
    // console.log(pins)
    if(data.sharedto != "allpins"){
      pins[data.sharedto].push(data.pin)
    }
  
  })
  console.log(pins)

  res.send(pins)
})

router.post('/publicalbums',async function(req, res, next) {
  console.log(req.body.username,"==============================username")
  sav = await userModel.findOne({_id:req.body.username})
  saved = sav.savedpins
  console.log(saved,"-----------------------------------------PUBLICALBUM")
  saved.reverse()
  var pins = {}
  album = sav.albums
  album.forEach((deta)=>{
    pins[deta] = []
  })
  // console.log(pins)
  saved.forEach((data)=>{
    pins.allpins.push(data.pin)
    // console.log(pins)
    if(data.sharedto != "allpins"){
      pins[data.sharedto].push(data.pin)
    }
  })
  console.log(pins)

  res.send(pins)
})

router.get('/profile',isLoggedIn,async function(req, res, next) {
  var pins = []
  user =  await req.user.populate("pins")
  console.log(user,"USERDATA")
  user.savedpins.reverse()
  pice = true
  res.render('profile', {user,pice,url:req.protocol + '://' + req.get('host') + req.originalUrl});
});

router.get('/deletecomment/:id/:img',isLoggedIn,async function(req, res, next) {
  imageModel.findByIdAndUpdate({_id:req.params.img},{$pull:{comment:{_id:req.params.id}}}).
  then((save)=>{
    res.redirect("back")
  })

})

router.post('/editpost/',isLoggedIn,async function(req, res, next) {
  image = await imageModel.findOne({_id:req.body.id})
  console.log(image)
  console.log(req.body.website,req.body.title,req.body.description)
  image.website = req.body.website,
  image.title = req.body.title,
  image.description = req.body.description
  image.save()
  res.send("hehe")
})


router.post('/getpindetails',isLoggedIn,async function(req, res, next) {
  image = await imageModel.findOne({_id:req.body.id})
  res.send(image)
})

router.get('/profile/:id',async function(req, res, next) {
  var pice = null
  if(req.user){
    user = await userModel.findOne({_id:req.params.id}).populate("pins")
    var pice = true 
    if(req.params.id === String(req.user._id)){
      user.savedpins.reverse()
      res.render('profile', {user,pice,url:req.protocol + '://' + req.get('host') + req.originalUrl});
      console.log(`${pice} profile`)  
    }
    else{
      user =  await userModel.findOne({_id:req.params.id}).populate("pins")
      console.log(user,"USERDATA")
      user.savedpins.reverse()
      if(req.user){
        var userid = req.user._id
      }
      else{
        var userid = false
      }
      console.log(`${pice} profile copy`)
      res.render('profile copy', {user,pice,userid,pic:req.user.profilepic,url:req.protocol + '://' + req.get('host') + req.originalUrl});
    
    }
  }
  else{
    pic = `/images/profilepic/default.jpeg`
    user =  await userModel.findOne({_id:req.params.id}).populate("pins")
    user.savedpins.reverse()
    if(req.user){
      var userid = req.user._id
    }
    else{
      var userid = false
    }
    var pice = null
    console.log(pice,"----------------------------------------------------------------------------------pice")
    res.render('profile copy', {user,pice,userid,pic});
  
  }
});


router.get('/pin-builder',isLoggedIn, function(req, res, next) {
  res.render('createpin',{pic:req.user});
});

const pins = []
router.get('/savedpins/:name',isLoggedIn,async function(req, res, next) {
  loggedInUser = req.user
  console.log(loggedInUser.savedpins)
  if(req.params.name === "allpins"){
    show = false
  }
  else{
    show = true
  }
  res.render("savedpins",{show,pin:loggedInUser.savedpins,name:req.params.name})

});

router.get('/savedpins/:name/:id',async function(req, res, next) {
  console.log(req.params.id)
  loggedInUser = await userModel.findOne({_id:req.params.id})
  console.log(loggedInUser)
  show = false
  res.render("savedpins",{show,pin:loggedInUser.savedpins,name:req.params.name})

});

router.post('/addalbum',isLoggedIn,async function(req, res, next) {
  var user = req.user
  console.log(user)
  user.albums.push(req.body.nama)
  user.save()
  res.send("added album")
});

router.post('/addname',isLoggedIn,async function(req, res, next) {
  var user = req.user
  console.log(user)
  user.name = req.body.nama
  console.log(user.name)
  user.save()
  res.send("added name")

});
// var pens = []
// function hehe(data){
//   p = {"title":data.title,"pin":data.pins}
//   pens.push(p)
// }

// var pins = {}
router.get('/search/:property',async function(req, res, next) {
  var pins = []
  titles = await imageModel.find({})
  titles.forEach((data)=>{
    title = data.title.split(" ")
    desc = data.description.split(" ")
    if(title.includes(req.params.property) || desc.includes(req.params.property)){
      const pens = {"title":title,"pic":data.pin,id:data._id}
      pins.push(pens)
    }
  })
  console.log(pins)
res.render("home-search",{deta:pins,user:req.user})
});

router.post('/delete/album',isLoggedIn,async function(req, res, next) {
  console.log(req.body.nama)
  loggedInUser = await userModel.findOneAndUpdate({_id:req.user._id},{$pull:{albums:req.body.nama}})
  loggedInUser.savedpins.forEach((data)=>{
    if(data.sharedto === req.body.nama){
      data.sharedto = "allpins"
    }
  })
  loggedInUser.save()
  res.send("sex")
})

router.post('/comment',isLoggedIn,async function(req, res, next) {
  var loggedInUser = req.user
  var comments = {
    user: loggedInUser._id,
    comment: req.body.comment,
  }
  var image = await imageModel.findOne({pin:req.body.id})
  image.comment.push(comments)
  image.save()
  res.send("added comment")



});
router.post('/download', function(req, res, next) {
  const download = require('image-downloader');

  const options = {
    url: req.body.url,
    dest: process.env.USERPROFILE + "/Downloads"
    };
  
  download.image(options)
    .then(({ filename }) => {
      console.log('Saved to', filename); // saved to /path/to/dest/image.jpg
    })
    .catch((err) => console.error(err));
    
});

router.post('/save',isLoggedIn,isLoggedIn, async function(req, res, next) {
  var loggedInUser = req.user
  var pinn = {pin:req.body.id,sharedto:req.body.sharedto,pinid:req.body.pinid}
  console.log(pinn)
  loggedInUser.savedpins.push(pinn)
  await loggedInUser.save()
  console.log(loggedInUser.savedpins)
  console.log(pinn.pinid)

  res.send("saved")

});
router.post('/setpwsd',isLoggedIn, async function(req, res, next) {
  var loggedInUser = req.user
  loggedInUser.changePassword(req.body.oldpwsd, req.body.newpwsd, function(err){
    console.log("changed password successfullt")
    res.redirect("/profile")
  })

})

router.post('/checkid', async function(req, res, next) {
  var loggedInUser = await userModel.findOne({username:req.body.id})
  if(req.user){
    if(req.user.username === req.body.id){
      loggedInUser = null
    }
  }
  console.log(loggedInUser)
  res.send(loggedInUser)
  })


router.post('/unsave',isLoggedIn, async function(req, res, next) {
  req.user.savedpins.forEach((data)=>{
    if (req.body.id === data.pin){
      userModel.findByIdAndUpdate({_id:req.user._id},{$pull:{savedpins:{_id:data._id}}}).then((save)=>{
        save.save()
        res.send(save)

      })

    }
  })
});

router.post('/follow',isLoggedIn, async function(req, res, next) {
  var loggedInUser = req.user
  console.log(req.body.username,"------------------------------------------------------------------------------------------following")
  var userToFollow = await userModel.findOne({username:req.body.username})
  loggedInUser.following.push(userToFollow._id)
  await loggedInUser.save()
  userToFollow.followers.push(loggedInUser._id)
  await userToFollow.save()
  res.send("followed")
  
});

router.post('/unfollow',isLoggedIn, async function(req, res, next) {
  console.log(req.body.username,"------------------------------------------------------------------------------------------unfollowing")
  var userToFollow = await userModel.findOne({username:req.body.username})
  var loggedInUser = await userModel.findOneAndUpdate({_id:req.user._id},{$pull:{following:userToFollow._id}})
  await loggedInUser.save()
  var userToFollow = await userModel.findOneAndUpdate({username:req.body.username},{$pull:{followers:req.user._id}})
  await userToFollow.save()
  res.send("unfollowed")

});
var coment = []

async function getcomment(data){
  data.comment.forEach((deta)=>{
    userModel.findOne({_id:deta.user}).then((deta)=>{
      var cumnt = {
        username:deta.username,
        pic:deta.profilepic,
        comment:deta.comment,
      }
      coment.push(cumnt)
      console.log(cumnt,"function")
    })
  })
}

router.get('/pin/:id',async function(req, res, next) {
  const coment = []
  const pin = await imageModel.findOne({_id:req.params.id}).populate({path: "comment",populate:{path:"user"}}).populate("createduser")
  console.log(pin.comment)
  console.log(req.user)
if(req.user){ 
  var loggedInUser = req.user
  var save = loggedInUser.savedpins.some(e=> e.pin === pin.pin)
}
else{
  var loggedInUser = ""
  var save = ""
}
usr = pin.createduser
if(usr){
  console.log(coment,"ifuser")
  res.render('pins',{pin:pin,pfile:usr,userid:pin.createduser._id,save:save,username:usr.username,followers:usr.followers.length,user:loggedInUser,url:req.protocol + '://' + req.get('host') + req.originalUrl});
}
else{
    console.log(coment)
    res.render('pins',{pin:pin,pfile:false,userid:"0",username:"pintrester",save:save,followers:"69",user:loggedInUser,url:req.protocol + '://' + req.get('host') + req.originalUrl});
  }
}); 

router.get('/pin/delete/:id',async function(req, res, next) {
  pin = await imageModel.findOneAndDelete({_id:req.params.id})
  console.log(pin)
  userModel.findByIdAndUpdate({_id:req.user._id},{$pull:{savedpins:{_id:pin.pins}}}).then((save)=>{
    save.save()
  })
  userModel.findByIdAndUpdate({_id:req.user._id},{$pull:{pins:pin._id}}).then((save)=>{
    save.save()
  })
  res.redirect("/home")
})

router.get('/home', function(req, res, next) {
  imageModel.find({},(err,user)=>{
    if(req.user){
      var pic = req.user
    }
    else{
      pic = false
    }
    res.render("home",{user,pic})
  })
})

router.post("/login",passport.authenticate("local",{
  successRedirect:"/home",
  failureRedirect: "/"
}),function(req,res) { 
  
})

router.post("/signup",isLogedOut,function(req,res){
  const newUser = new userModel({
    username: req.body.username,
    age: req.body.age,
    email: req.body.email,
    profilepic: "/images/profilepic/default.jpeg"
  })
  userModel.register(newUser,req.body.password)
  .then(async function(data){
    data.albums.push("allpins")
    data.save()
    console.log(data)
    passport.authenticate("local")(req,res,function(){
      res.redirect("/home")
    })
  })
})

router.get("/logout",function(req,res,next){
  req.logout(function(err){
    res.redirect("/")
  })
})

function isLoggedIn(req,res,next){
  if (req.isAuthenticated()){
    return next()
  }
  else{
    res.redirect("/")
  }
}
function isLogedOut(req,res,next){
  if (req.isAuthenticated()){
    res.redirect("/home")
  }
  else{
    return next()
  }
}

// router.use((req, res, next) => {
//   res.status(404).redirect("/");
// });

module.exports = router;
