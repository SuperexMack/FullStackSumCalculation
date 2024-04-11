// In this file i want to add 2 datas or we can say we are going to add to number

import { Response,Request, Router} from "express"
import Zod from "zod"
import express from "express"
const app = express()
const router = Router()
import {TotalSum} from "./db"
import { User } from "./db"
import authMiddleware from "./verification/Authmiddleware"


// so now we are going to create the Zod schema so that the user will not able to enter any rubbish data

const ValidData = Zod.object({
    NumberFirst : Zod.number(),
    NumberSecond  : Zod.number(),
})


// The below functiom will try to add 2 number 
const  AddData = (first:number , second:number):number=>{
   // so in the below paragraph i want to add 2 numbers entered by the user in the database
   let Answer = first + second;
   return Answer;
}

// now in the below line we are going to make a post request and after getting the post request  will allow the user to the value of his entered data as Sum

router.post("/getsum" , authMiddleware ,async(req:Request , res:Response)=>{
    
    // now we are going to validate the user input sended by the user using zod

    const {success} = ValidData.safeParse(req.body)
    
    if(!success){
        res.status(400).json({
            msg:"You had not inserted a data || You have inserted a Invalid data"
        })
    }


    let first = req.body.NumberFirst;
    let second = req.body.NumberSecond;
    let userid = req.userid

      // Now we are going to call the adder function so that it can add the datas
      let answer = AddData(first , second);

    await TotalSum.create({
        NumberFirst:first,
        NumberSecond:second,
        Finalsum: answer,
        ownerData : userid,
        
    })


    // now we are going to show this data to the user

    res.json({
        msg:`The Total sum is ${answer}`
    })

   

})


export default router