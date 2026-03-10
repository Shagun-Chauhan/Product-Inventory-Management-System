const express=require("express");
const dbConnect = require('./dbConnect')
const port = 3000;

const app = express();

dbConnect();
//atlas password : 6pnfSdm4nlVmWlov

app.get("/",(req,res)=>{
    res.send("Backend is runnning")
})
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})