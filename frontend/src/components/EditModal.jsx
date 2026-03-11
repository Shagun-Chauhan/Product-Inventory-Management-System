import React from "react"
import { Plus, X } from "lucide-react"
import { updateProduct } from "../api/productAPI"

function EditModal({allProducts, setAllProducts, productId, editForm, setEditForm, showEditModal, setShowEditModal }) {

  if (!showEditModal) return null

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdate = async ()=>{
   try {
    let res = await updateProduct(productId, editForm)
    if (res.data.success) {
      alert(`${res.data.message}`);
      setShowEditModal(false);
      setAllProducts(allProducts.map((product) => (
        product._id === productId ? { ...product, ...editForm } : product
      )))
    }
   } catch (error) {
    console.error(error);
    alert("Error updating product");
   }
  }

  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

      <div className="bg-white w-[500px] rounded-2xl shadow-xl p-6 relative">

        {/* Close Icon */}
        <button
          type="button"
          onClick={() => setShowEditModal(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-6">
          Update Product
        </h2>

        <form className="grid gap-4">

          <input
            name="productName"
            value={editForm.productName}
            onChange={handleChange}
            placeholder="Product Name"
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            name="category"
            value={editForm.category}
            onChange={handleChange}
            placeholder="Category"
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            name="costPrice"
            value={editForm.costPrice}
            onChange={handleChange}
            placeholder="Cost Price"
            type="number"
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            name="sellingPrice"
            value={editForm.sellingPrice}
            onChange={handleChange}
            placeholder="Selling Price"
            type="number"
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            name="quantity"
            value={editForm.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            type="number"
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            name="description"
            value={editForm.description}
            onChange={handleChange}
            placeholder="Description"
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <div className="flex justify-end gap-3 mt-4">

            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800"
              onClick={(e)=>{
                e.preventDefault();
                handleUpdate();
              }}
            >
              <Plus size={16} />
              Update Product
            </button>

          </div>

        </form>

      </div>

    </div>

  )
}

export default EditModal