// so here we are going to create a signIn as well as signUp pages so that user can sign in or login

// remember -> meaning of signIn is that user is already registered

// so first we are going to create signup

import express from "express"
import { Response , Request } from "express";
import { TotalSum } from "../db";
import { User } from "../db";
import zod, { string } from "zod"
import jwt from "jsonwebtoken"
const router = express.Router()
const JWT_TOKEN = "MACK06062003"

// now here i am gonna to make zod

const newUser = zod.object({
    username:zod.string().email(),
    password:zod.string()
})

// now here we are going to make a signup

router.post("/signup" , async(req:Request , res:Response)=>{
    let {success} = newUser.safeParse(req.body)
    if(!success){
        return res.status(400).json({
            msg:"You had not inserted a data || You have inserted a Invalid data"
        })
    }

    let oldUser = await User.findOne({
        username : req.body.username
    })

    if(oldUser){
        res.json({
            msg: "User with this username is already regestired"
        })
    }

    let username = req.body.username;
    let password = req.body.password;

    const user = await User.create({
        username:username,
        password:password
    })

    // const userid = user._id

    const token = jwt.sign({
        userid:user._id
    },JWT_TOKEN)

    res.json({
        msg:"User signed successfully!!!!",
        token : token
    })


})


// now we are going to create the signin route 

const signinVerification = zod.object({
    username:zod.string().email(),
    password:zod.string(),
})



router.post("/signin" ,async(req:Request , res:Response)=>{
    // so first we will make a verification using zod

    const {success} = signinVerification.safeParse(req.body);
    if(!success){
        return res.status(400).json({
            msg:"You had not inserted a data || You have inserted a Invalid data"
        })
    }

  
    // now we are going to check that kahin iss username wala pehele se to koi username present nahi hai na

    const userChecker = await User.findOne({
        username:req.body.username,
        password:req.body.password

    })

    // we are going to give the token and username to the user who is trying to sign in and trying to get the data

    if(userChecker){
        const token = jwt.sign({
            userid : userChecker._id
        } , JWT_TOKEN)
    

   
       res.json({
         msg:"Welcome back sir",
         token:token
       })

    }

    res.status(400).json({
        msg : "User not found"
    })
    

})

export default router