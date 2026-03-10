const express = require("express");
const router = express.Router();
const {addProduct,updateProduct,getOneProduct} = require("../controller/productController");

router.get("/",(req,res)=>{
    res.send("Product route is working....")
})

router.put("/update",updateProduct)

router.post("/add",addProduct)

router.get("/getoneproduct",getOneProduct)

module.exports = router;