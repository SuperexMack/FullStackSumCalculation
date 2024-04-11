// in this page we are going to create the Authentication
// now here i want to make a middleware which will check that the user jo request bhej raha hai wo valid user hai ya nahi aagar hai to theek warna error

import express , { Router } from "express"
import {Request , Response ,NextFunction} from "express"
const JWT_TOKEN = "MACK06062003"
import jwt from "jsonwebtoken"

declare global {
    namespace Express {
      interface Request {
        userid?: string; // Add userid property to Request interface
      }
    }
  }

const authMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    const authmiddle = req.headers.authorization
    if(!(authmiddle) || !(authmiddle.startsWith('Bearer '))){
        console.log(authmiddle)
        return res.status(403).json({
            msg:"Something went wrong during auth"
        })
    }

    const token = authmiddle.split(' ')[1]
    try{
        const decoded:any = jwt.verify(token , JWT_TOKEN)

        if(decoded.userid){
            req.userid  = decoded.userid
            next();

        }

        else{
            res.status(400).json({
                msg:"Something went wrong you  need to do something"
            })
        }
    }
    catch (error) {
        // Handle token verification error
        return res.status(403).json({
            msg: "Token verification failed"
        });
    }

}

export default authMiddleware