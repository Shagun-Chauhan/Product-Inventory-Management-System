const mongoose  = require("mongoose")
const productSchema = new mongoose.Schema({
    productName : {
        type:String,
        required:true
    },
    description : {
        type:String,
    },
    costPrice : {
        type:Number,
        required:true
    },
    sellingPrice : {
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    quantity : {
        type:Number,
        required:true
    }

})


const products = mongoose.model("products",productSchema);

module.exports = products;