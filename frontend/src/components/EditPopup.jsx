import { X } from "lucide-react";
import { updateProduct } from "../services/productService";

export default function EditPopup({
  editProduct,
  setEditProduct,
  isOpen,
  setIsOpen,
  productData,
  setProductData,
  showToast
}) {
  if (!isOpen) return null;

  const handleChange = (e) => {
    setEditProduct({
      ...editProduct,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async () => {
    try {
      await updateProduct(editProduct);

      const updatedProducts = productData.map((product) =>
        product._id === editProduct._id ? editProduct : product
      );

      setProductData(updatedProducts);
      setIsOpen(false);
      showToast("Product updated successfully", "success");
    } catch (error) {
      showToast("Failed to update product","error");    
    }

  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 relative">

        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-5 top-5 text-gray-500 hover:text-black transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Edit Product
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Product Name
            </label>
            <input
              name="productName"
              value={editProduct.productName}
              onChange={handleChange}
              placeholder="Enter product name"
              className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Category
            </label>
            <input
              name="category"
              value={editProduct.category}
              onChange={handleChange}
              placeholder="Enter category"
              className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Cost Price
            </label>
            <input
              type="number"
              name="costPrice"
              value={editProduct.costPrice}
              onChange={handleChange}
              placeholder="Enter cost price"
              className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Selling Price
            </label>
            <input
              type="number"
              name="sellingPrice"
              value={editProduct.sellingPrice}
              onChange={handleChange}
              placeholder="Enter selling price"
              className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={editProduct.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              name="description"
              value={editProduct.description}
              onChange={handleChange}
              placeholder="Enter description"
              rows="3"
              className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={() => setIsOpen(false)}
            className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Update Product
          </button>

        </div>

      </div>
    </div>
  );
}