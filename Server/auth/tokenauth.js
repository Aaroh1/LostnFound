const jwt=require("jsonwebtoken");
const secret="ChomtasaSemcret1231231233297y4u0832u74e80231";
const model=require('../models/USER');
module.exports= (req,res,next)=>{
    console.log("REQUEST FOR SECRET")  
  try{
        const token=req.headers.cookie?.split('token=')[1];
        if(!token)
        return res.redirect('/');
        decoded=jwt.verify(token,secret);
        // console.log(decoded);
        model.findOne({email:decoded.useremail}).then((user)=>
        {
        req.user=user.email;}
        );
        next();
      } catch(err) {
        console.log(err)
        return res.redirect('/login');
      }
    };