import { Plus, Edit, Trash2, Package, Search } from "lucide-react";
import axios from 'axios'
import { useEffect, useState } from "react";
import EditPopup from "./EditPopup";

export default function InventoryUI() {
  const [productData , setProductData] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isOpen,setIsOpen] = useState(false);
  const [editProduct, setEditProduct] = useState({});
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    costPrice: "",
    sellingPrice: "",
    quantity: "",
    description: ""
  });
  useEffect(()=>{
  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/products/getallproducts");
      setProductData(res.data.productData);
      setAllProducts(res.data.productData)
    } catch (error) {
      console.log(error);
    }
  };

  fetchProducts();
  },[])

  const handleChange = (e)=>{
      e.preventDefault();
      setFormData({
        ...formData,
        [e.target.name] : e.target.value
      });
  }

  const submitHandler = async()=>{
    try{
    const res = await axios.post("/api/products/add",formData)
    }
    catch(error){
      console.log(error);
    }
  }

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete("/api/products/delete", {
        data: { id }
      });
  
      if(res.data.success){
        setProductData((prev)=>prev.filter((product)=>product._id!==id))
      }
  
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e)=>{
      const value = e.target.value.toLowerCase();
      const filtered =  allProducts.filter((product) =>
        product.productName.toLowerCase().includes(value) || product.category.toLowerCase().includes(value) 
      );
      setProductData(filtered);
  }
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Product Inventory</h1>
          </div>

        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500 text-sm">Total Products</p>
            <h2 className="text-3xl font-bold">{productData.length}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500 text-sm">Low Stock</p>
            <h2 className="text-3xl font-bold text-red-500">{productData.filter((product)=>product.quantity<10).length}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500 text-sm">Categories</p>
            <h2 className="text-3xl font-bold">{new Set(productData.map((product)=>product.category)).size}</h2>
          </div>
        </div>

        {/* Add Product Form */}
        <form onSubmit={submitHandler}>
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add Product</h2>
          <div className="grid md:grid-cols-5 gap-4">
            <input
              name="productName"
              placeholder="Product Name"
              className="border rounded-lg p-2"
              value={formData.productName}
              onChange={handleChange}
            />

            <input
              name="category"
              placeholder="Category"
              className="border rounded-lg p-2"
              value={formData.category}
              onChange={handleChange}
            />

            <input
              name="costPrice"
              placeholder="Cost Price"
              type="number"
              className="border rounded-lg p-2"
              value={formData.costPrice}
              onChange={handleChange}
            />
            <input
              name="sellingPrice"
              placeholder="Selling Price"
              type="number"
              className="border rounded-lg p-2"
              value={formData.sellingPrice}
              onChange={handleChange}
            />

            <input
              name="quantity"
              placeholder="Quantity"
              type="number"
              className="border rounded-lg p-2"
              value={formData.quantity}
              onChange={handleChange}
            />
             <input
               name="description"
              placeholder="Description"
              className="border rounded-lg p-2"
              value={formData.description}
              onChange={handleChange}
            />
            <button className="bg-black text-white rounded-lg flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
</form>
        {/* Product Table */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Inventory List</h2>

            <div className="flex items-center border rounded-lg px-3 py-2 gap-2">
              <Search className="w-4 h-4 text-gray-500" />
              <input
              onChange={handleSearch}
                placeholder="Search products..."
                className="outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr 
                className="border-b text-gray-600">
                  <th className="py-3">Product</th>
                  <th>Category</th>
                  <th>Cost Price</th>
                  <th>Selling Price</th>
                  <th>Quantity</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productData.map((product)=>(
                  <tr 
                  key = {product._id}
                  className="border-b hover:bg-gray-50">
                  <td className="py-3 font-medium">{product.productName}</td>
                  <td>{product.category.toUpperCase()}</td>
                  <td>{product.costPrice}</td>
                  <td>{product.sellingPrice}</td>
                  <td>{product.quantity}</td>
                  <td>{product.description}</td>
                  <td>
                    {product.quantity > 10 ?
                      ( <span className="bg-green-100 text-green-600 px-2 py-1 rounded-lg text-sm">
                        In Stock
                    </span>) : (
                       <span className="bg-red-100 text-red-600 px-2 py-1 rounded-lg text-sm">
                        Low Stock
                    </span>
                    )
                    }
                   
                  </td>
                  <td className="flex gap-3 py-3">
                    <button
                    className="text-blue-600 hover:scale-110"
                    onClick={()=>{
                      setEditProduct(product)
                      setIsOpen(true)
                    }}
                    >
                      <Edit className="w-4 h-4" />
                    </button>


                    {isOpen && <EditPopup 
                    isOpen = {isOpen}
                    setIsOpen = {setIsOpen}
                    editProduct = {editProduct}
                    setEditProduct={setEditProduct}
                    productData = {productData}
                    setProductData = {setProductData}
                    />}

                    <button 
                    onClick={()=>handleDelete(product._id)}
                    className="text-red-600 hover:scale-110">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
                
                ))
              }
               </tbody>
           </table>
          </div>
        </div>
      </div>
    </div>
  );
}
