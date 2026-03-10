const express=require("express");
const dbConnect = require('./dbConnect')
const productRouter = require("./routes/productRoutes")
const port = 3000;

const app = express();
app.use(express.json());

//atlas password : 6pnfSdm4nlVmWlov

app.get("/",(req,res)=>{
    res.send("Backend is runnning")
})
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})

app.use("/product",productRouter);

dbConnect();