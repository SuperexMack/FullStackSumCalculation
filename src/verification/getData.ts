import authMiddleware from "./Authmiddleware";
import jwt from "jsonwebtoken";
import { Request , Response , Router } from "express";
import { TotalSum } from "../db";
const router = Router()

router.get("/getmydata" , authMiddleware ,async(req:Request , res:Response)=>{
    try{
        const userdata = await TotalSum.find({
            ownerData  : req.userid
        })

        if(userdata.length === 0){
            return res.status(400).json({
                msg : "No data found for the user"
            })
        } else {
            // If data is found, return it as JSON
            return res.status(200).json({
                msg: "Data found for the user",
                data: userdata.map(data => ({
                   
                    field1: data.NumberFirst,
                    field2: data.NumberSecond,
                    field3: data. Finalsum
                    
                }))
            });
        }
    } catch(error) {
        console.error("Error:", error);
        return res.status(500).json({
            msg: "Internal Server Error"
        });
    }
})

export default router;
