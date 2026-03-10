const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbConnect = async()=>{
  await  mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database connected")
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports  = dbConnect;