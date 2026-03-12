const express = require("express");
const router = express.Router();
const {addProduct,updateProduct,getOneProduct, getAllProducts, deleteProduct} = require("../controller/productController");

router.get("/",(req,res)=>{
    res.send("Product route is working....")
})

router.put("/update",updateProduct)

router.post("/add",addProduct)

router.get("/getoneproduct",getOneProduct)

router.get("/getallproducts",getAllProducts)

router.delete("/delete", deleteProduct)


module.exports = router;