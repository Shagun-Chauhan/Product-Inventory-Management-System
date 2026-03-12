import React from "react"
import { Plus, X } from "lucide-react"
import { updateProduct } from "../api/productAPI"

function EditModal({ allProducts, setAllProducts, productId, editForm, setEditForm, showEditModal, setShowEditModal }) {

  if (!showEditModal) return null

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    })

  }

  const handleUpdate = async () => {
    try {
      let res = await updateProduct(productId, editForm)
      if (res.data.success) {
        alert(`${res.data.message}`);
        let newupdatedProducts=allProducts.map((product) => (
          product._id === productId ? { ...product, ...editForm } : product
        ))
        setAllProducts(newupdatedProducts)
        setShowEditModal(false);
      }
    } catch (error) {
      console.error(error);
      alert("Error updating product");
    }
  }

  return (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

    <div className="bg-white w-[520px] rounded-2xl shadow-xl p-8 relative">

      {/* Close Icon */}
      <button
        type="button"
        onClick={() => setShowEditModal(false)}
        className="absolute top-5 right-5 text-gray-500 hover:text-black"
      >
        <X size={22} />
      </button>

      <h2 className="text-2xl font-semibold mb-8">
        Update Product
      </h2>

      <form className="grid grid-cols-2 gap-x-6 gap-y-5">

        {/* Product Name */}
        <div className="flex flex-col gap-2 col-span-2">
          <label className="text-sm font-medium text-gray-600">
            Product Name
          </label>
          <input
            name="productName"
            value={editForm.productName || ""}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">
            Category
          </label>
          <input
            name="category"
            value={editForm.category || ""}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Quantity */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">
            Quantity
          </label>
          <input
            name="quantity"
            value={editForm.quantity || ""}
            onChange={handleChange}
            type="number"
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Cost Price */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">
            Cost Price
          </label>
          <input
            name="costPrice"
            value={editForm.costPrice || ""}
            onChange={handleChange}
            type="number"
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Selling Price */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">
            Selling Price
          </label>
          <input
            name="sellingPrice"
            value={editForm.sellingPrice || ""}
            onChange={handleChange}
            type="number"
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2 col-span-2">
          <label className="text-sm font-medium text-gray-600">
            Description
          </label>
          <input
            name="description"
            value={editForm.description || ""}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6 col-span-2">

          <button
            type="button"
            onClick={() => setShowEditModal(false)}
            className="px-5 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            className="bg-black text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800"
            onClick={handleUpdate}
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