const products = require("../model/products");

const addProduct = async (req,res)=>{
    try {
        const data = req.body;
        if(!data.productName || !data.costPrice || !data.sellingPrice || !data.category || !data.quantity){
            return res.status(400).json({
                success:false,
                message:"Please fill all the required fields"
            })
        }
        const productData = await products.insertOne(data);
        if(productData){
            return res.status(200).json({
                success:true,
                message:"Product added successfully"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: error.message
        })
    }
}


const updateProduct  = async (req,res)=>{
  try {
    const data = req.body;
    let response = await products.updateOne({productName : data.productName},{
        $set:{
            productName : data.productName,
            description : data.description,
            quantity:data.quantity,
            costPrice : data.costPrice,
            sellingPrice:data.sellingPrice,
        }
    })
    if(response.modifiedCount > 0){
        return res.status(200).json({
            success:true,
            message:"Product Updated Successfully"
        })
    }
    return res.status(400).json({
        success:false,
        message : "Product not found"
    })
  } catch (error) {
    return res.status(500).json({
        succes:false,
        message : error.message
    })
  }
}

const getOneProduct = async (req,res)=>{
    try{
    const data = req.body;
    let productData = await products.findOne({productName : data.productName});
    if(productData){
        return res.status(200).json({
            success:true,
            message:"Product found successfully",
            productData
        })
    }
    return res.status(400).json({
        success:false,
        message:"Product not found"
    })
}catch(error){
    return res.status(500).json({
        success:false,
        message:error.message
    })
}
}

const getAllProducts = async(req, res)=>{
    try {
        let productData= await products.find({});
        if(productData){
            return res.status(200).json({
                success:true,
                message:"Products found successfully",
                productData
            })
        }
        return res.status(400).json({
            success:false,
            message:"No products found"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const deleteProduct = async (req, res)=>{
    try{
       const data=req.body;
       let response=await products.deleteOne({productName : data.productName});
       if(response.deletedCount > 0){
        return res.status(200).json({
            success:true,
            message: "Product deleted successfully",
            totalCount : response.deletedCount
        })
    }
    return res.status(400).json({
        success:false,
        message : "Product not found"
    })
}
catch(err){
    return res.status(500).json({
        success:false,
        message : err.message
    })
}
}

module.exports = {addProduct,updateProduct,getOneProduct,getAllProducts,deleteProduct}