const express = require("express")
const bodyParser = require("body-parser");
const p = require("./models/USER");
const ITEM=require("./models/ITEM");
const mongoose = require("mongoose");
const env=require("dotenv");
const jwt=require("jsonwebtoken");
const auth=require('./auth/tokenauth');
const bcrypt=require("bcrypt");
const app = express();
const cors=require('cors');
const secret="ChomtasaSemcret1231231233297y4u0832u74e80231";
const multer  = require('multer');
const USER = require("./models/USER");
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
    cb(null, './public/img')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,uniqueSuffix+" "+file.originalname);

  }
})

const upload= multer({storage:storage});

app.use('/public',express.static('public'))
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

app.get("/Home",auth,async(req,res)=>{
  res.status(200);
});

app.post("/login",async (req,res)=>{
  const data =await p.findOne({email:req.body.email})
    if(data)
    {
      console.log(data);
      bcrypt.compare(req.body.pass,data.password,(err,result)=>{
        console.log("password matcheS!")
      if(err||!result)
      res.send("Error1");
      else
      {
        const token=jwt.sign({id: data._id},
          secret,
          {
              expiresIn:"10h",
          });
          res.cookie('userToken', token) 
          console.log("cookie sent!")
          res.send("/Home?q="+data.email);
      }
    })}
    else
    res.send("Error2");
  
});


app.post("/register", async (req,res)=>{
  console.log("POST REQUEST MADE");
  const d=await p.findOne({$or:[{email:req.body.email},{roll:req.body.roll}]})
    if(!d)
    {
      bcrypt.hash(req.body.pass,10).then(async function(hash){
        const newUser=new p({
          email:req.body.email,
          name:req.body.name,
          hostel:req.body.hostel,
          room:req.body.room,
          roll:req.body.roll,
          phone:req.body.phone,
          password:hash
        })
        await newUser.save((err)=>{
          if(err)
          console.log(err);
          else
          console.log("Data Saved in DB");
        })
        const token=jwt.sign({id: newUser._id},
          secret,
          {
              expiresIn:"10h",
          });
          res.cookie('userToken', token) 
          console.log("cookie sent!")
          res.send("/Home?q="+newUser.email);
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

app.get("/UserPage",auth,async(req,res)=>{
    const currentUser=await USER.findOne({_id:req.query.id});
    if(currentUser)
    {
      res.send(currentUser);
    }
    else
     res.status(500).send("ERROR");
})

app.listen(3001, () => {
  console.log("Server is Running! Listening at port 3001");
});