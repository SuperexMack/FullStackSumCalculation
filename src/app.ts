import express from "express"
const app = express()
import Sum from "./MainCalculation"
import SignIn from "./verification/user"
import getData from "./verification/getData"
app.use(express.json())
const PORT = 9000

app.use("/v1/getdata" , Sum);
app.use("/v1" , SignIn)
app.use("/v1/mydata" , getData)

app.listen(PORT , ()=>{
    console.log(`your server is running on the port number ${PORT}`)
})