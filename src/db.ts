// This file is going to make a schema
import mongoose from "mongoose";
const schema = mongoose.Schema

let URL_LINK = "mongodb://localhost:27017/TotalSum"

main()
.then(()=>{
    console.log(`Your database is connected`)
})

.catch((err)=>{
    console.log(err)
})


async function main(){
    await mongoose.connect(URL_LINK)
}


const Mysum  = new schema({
    NumberFirst:Number,
    NumberSecond:Number,
    Finalsum: Number,
    ownerData : {
        type:schema.Types.ObjectId,
        ref:"Mysum",
        required :true
    }
})

// now below we are going to make a user data which consist of username and password with the value of sum

const MYUser = new schema({
    username : String,
    password:String,
  
})

export const  TotalSum = mongoose.model("TotalSum" , Mysum);
export const User = mongoose.model("User" , MYUser)


