const express = require("express")
const bodyParser = require("body-parser");
const p = require("./models/USER");
const ITEM=require("./models/ITEM");
const mongoose = require("mongoose");
/* const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose"); */
const bcrypt=require("bcrypt");
const app = express();
const cors=require('cors');
const multer  = require('multer');
// const { default: User } = require("../Client/src/Components/User");
mongoose.connect('mongodb://localhost:27017/LnF', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connection Successful"))
    .catch((err) => console.log(err));

/* app.use(session({
    secret: "Our Little semcret!",
    resave: false,
    saveUninitialized: false,
}));


app.use(passport.initialize());
app.use(passport.session()); */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './img')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,uniqueSuffix+" "+file.originalname);

  }
})

const upload= multer({storage:storage});


app.use(express.json());
app.use(bodyParser.urlencoded(
  {
      extended: true
  }
));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.post("/Upload",upload.single('item'),async(req,res)=>{
  const newItem=new ITEM({
    item:req.file.filename,
    location:req.body.location,
    desc:req.body.desc,
    type:req.body.type,
    date:req.body.date
  })
  const I=await newItem.save();
  if(I)
  res.send("HELLO")
  else
  res.send("ERROR")
})

app.post("/login",async (req,res)=>{
  const data =await p.findOne({email:req.body.email})
    if(data)
    {
      console.log(data);
      bcrypt.compare(req.body.pass,data.password,(err,result)=>{
      if(err||!result)
      res.send("Error1");
      else
      res.send("http://localhost:3000/User");
    })}
    else
    res.send("Error2");
  
});


app.post("/register", async (req,res)=>{
  console.log("POST REQUEST MADE");
  const d=await p.findOne({$or:[{email:req.body.email},{roll:req.body.roll}]})
    if(!d)
    {
      bcrypt.hash(req.body.pass,10).then(function(hash){
        const newUser=new p({
          email:req.body.email,
          name:req.body.name,
          hostel:req.body.hostel,
          room:req.body.room,
          roll:req.body.roll,
          phone:req.body.phone,
          password:hash
        })
        newUser.save((err)=>{
          if(err)
          console.log(err);
          else
          console.log("Data Saved in DB");
        })
        res.send("http://localhost:3000/User");
      })     
  }
      else
      {
        res.status(500).send("duplicate err");
      }

})

app.get("/getAllItems",async (req,res)=>{
  const items=await ITEM.find({});
  if(items)
    res.send(items);
  else
    res.status(500).json("ERROR");
})

app.listen(3001, () => {
  console.log("Server is Running! Listening at port 3001");
});