const User = require("../models/authModel");
const express = require("express")
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const zod = require('zod')

const signupBody = zod.object({
   email: zod.string().email(),
	password: zod.string().min(6),
   role: zod.string().optional()
})

authRouter.post('/signup', async (req,res)=>{
   const body = signupBody.safeParse(req.body);

   if (!body.success) {
  return res.status(400).json({ 
   message: "Email/Password must be in string" 
     });
  }

   const { email, password, role } = body.data;
   const user = await User.findOne({
      email
   })

   if(!user){ 
   const hashedPassword = await bcrypt.hash(password, 10);
   console.log(hashedPassword)
   try{
    const newUser = await User.create({
      email: email,
      password: hashedPassword,
      role: role
   })
   const token = jwt.sign({email},process.env.JWT_SECRET)
    res.status(200).json({
      success: true,
      message: "SignUp Succeded",
      token,
      user: {
        _id: newUser._id, 
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      },
    });
   }catch(e){
    res.status(403).json({
        message: "Error while signing up"
    })
    console.log(e);
   }
}else{
    res.status(403).json({
         message: "Enter unique email"
      })
}

})

const signinBody = zod.object({
   email: zod.string().email(),
	password: zod.string(),
})

authRouter.post('/signin', async (req,res) => {
   const body = signinBody.safeParse(req.body);

   if (!body.success) {
   return res.status(400).json({ message: "Email/Password must be in string" });
  }

   const { email, password } = body.data;
   const user = await User.findOne({ email });
    if ( user ) {
      const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        res.status(403).json({
         message: "Invalid Credentials"
        })
    }
      const token = jwt.sign({
         id: user._id
      }, process.env.JWT_SECRET);

      res.status(200).json({
      success: true,
      message: "SigIn Succeded",
      token,
      user: {
        id: user._id, 
        name: user.name,
        email: user.email,
        role: user.role
      },
    });
   } else{
      res.status(403).json({
         message: "Incorrect credentials"
      })
   }
    
})

module.exports = {
    authRouter: authRouter
}