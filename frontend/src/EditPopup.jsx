import { X } from "lucide-react";
import axios from 'axios'

export default function EditPopup({
    editProduct,
    setEditProduct,
    isOpen,
    setIsOpen,
    productData,
    setProductData}) {
    if(!isOpen) return null;
    const handleChange = (e)=>{
        e.preventDefault();
            setEditProduct({
                ...editProduct,
                [e.target.name] : e.target.value
            })
        }

    const handleUpdate = async()=>{
            try {
            const res = await axios.put("/api/products/update", editProduct);
            const updatedProducts = productData.map((product)=>product._id === editProduct._id ? editProduct : product)
            setProductData(updatedProducts)
            setIsOpen(false);
            }catch(error){
                console.log(error);
            }
    }
  return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    
          <div className="bg-white rounded-2xl shadow-xl w-[500px] p-6 relative">
    
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-black"
            >
              <X />
            </button>
    
            <h2 className="text-2xl font-semibold mb-6">
              Edit Product
            </h2>
    
            <div className="grid grid-cols-2 gap-4">
    
              <input
                name="productName"
                value={editProduct.productName}
                onChange={handleChange}
                placeholder="Product Name"
                className="border p-2 rounded-lg"
              />
    
              <input
                name="category"
                value={editProduct.category}
                onChange={handleChange}
                placeholder="Category"
                className="border p-2 rounded-lg"
              />
    
              <input
                type="number"
                name="costPrice"
                value={editProduct.costPrice}
                onChange={handleChange}
                placeholder="Cost Price"
                className="border p-2 rounded-lg"
              />
    
              <input
                type="number"
                name="sellingPrice"
                value={editProduct.sellingPrice}
                onChange={handleChange}
                placeholder="Selling Price"
                className="border p-2 rounded-lg"
              />
    
              <input
                type="number"
                name="quantity"
                value={editProduct.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="border p-2 rounded-lg"
              />
    
              <input
                name="description"
                value={editProduct.description}
                onChange={handleChange}
                placeholder="Description"
                className="border p-2 rounded-lg col-span-2"
              />
    
            </div>
    
            <div className="flex justify-end gap-3 mt-6">
    
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
    
              <button
              onClick={handleUpdate}
                className="px-4 py-2 bg-black text-white rounded-lg"
              >
                Update Product
              </button>
    
            </div>
    
          </div>
        </div>
      );
}