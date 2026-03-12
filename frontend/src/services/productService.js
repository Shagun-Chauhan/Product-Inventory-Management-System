import api from './api'

export const getAllProducts = ()=>{
    return api.get("/products/getallproducts");
}

export const addProduct = (data)=>{
    return api.post("/products/add",data);
}

export const updateProduct = (data)=>{
    return api.put("/products/update",data);
}

export const deleteProduct = (id)=>{
    return api.delete("/products/delete",{
        data : {id}
    });
}