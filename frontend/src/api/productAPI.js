import axios from "axios"

export const getAllProducts = ()=>{
    return axios.get("/api/product/getallproducts");
}

// export const getProductByName = (name)=>{
//     return axios.get()
// }

export const addProduct = (data)=>{
    return axios.post("/api/product/add", data);
}

export const updateProduct = (id,data)=>{
    return axios.put("/api/product/update", {
        _id:id,
        ...data
    });
}

export const deleteProduct = (data)=>{
    return axios.delete("/api/product/delete", {data});
}