import { Plus, Edit, Trash2, Package, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { addProduct, getAllProducts, deleteProduct, updateProduct } from "./api/productAPI";
import EditModal from "./components/EditModal";

export default function InventoryUI() {
  const [products, setProducts] = useState([]);
  const [productsCopy, setProductsCopy] = useState();

  const [formData, setFormData] = useState({
    productName: "",
    costPrice: "",
    sellingPrice: "",
    category: "",
    description: "",
    quantity: ""
  })
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({})
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data.productData);
      setProductsCopy(response.data.productData);
    } catch (error) {
      console.error(error)
    }
  }

  const handleAddProduct = async () => {
    try {
      let res = await addProduct(formData);
      if (res.data.success) {
        alert(`${res.data.message}`);
        fetchProducts();
        setFormData({
          productName: "",
          costPrice: "",
          sellingPrice: "",
          category: "",
          description: "",
          quantity: ""
        })
      }
    }
    catch (error) {
      console.error(error);
      alert("Error adding product");
    }
  }

  const handleDelete = async (id) => {
    try {
      let res = await deleteProduct({ id });
      if (res.data.success) {
        alert(`${res.data.message}`);
        fetchProducts();
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting product");
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleSearch=(e)=>{
    let value = e.target.value.toLowerCase();
    let filtered=productsCopy.filter((product)=>(
      product.productName.toLowerCase().includes(value) ||
      product.category.toLowerCase().includes(value)||
      product.description.toLowerCase().includes(value)
    ))
    setProducts(filtered);
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
            <h2 className="text-3xl font-bold">{products.length}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500 text-sm">Low Stock</p>
            <h2 className="text-3xl font-bold text-red-500">{products.filter((product) => product.quantity < 11).length}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500 text-sm">Categories</p>
            <h2 className="text-3xl font-bold">{new Set(products.map((product) => product.category)).size}</h2>
          </div>
        </div>

        {/* Add Product Form */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add Product</h2>

          <div className="grid md:grid-cols-5 gap-4">
            <input
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Product Name"
              className="border rounded-lg p-2"
            />

            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="border rounded-lg p-2"
            />

            <input
              name="costPrice"
              value={formData.costPrice}
              onChange={handleChange}
              placeholder="Cost Price"
              type="number"
              className="border rounded-lg p-2"
            />
            <input
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleChange}
              placeholder="Selling Price"
              type="number"
              className="border rounded-lg p-2"
            />

            <input
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              type="number"
              className="border rounded-lg p-2"
            />
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="border rounded-lg p-2"
            />
            <button className="bg-black text-white rounded-lg flex items-center justify-center gap-2"
              onClick={handleAddProduct}>
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Inventory List</h2>

            <div className="flex items-center border rounded-lg px-3 py-2 gap-2">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                placeholder="Search products..."
                className="outline-none"
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-gray-600">
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
              {
                products.map((product) => (
                    <tr key={product._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 font-medium">{product.productName}</td>
                      <td>{product.category}</td>
                      <td>{product.costPrice}</td>
                      <td>{product.sellingPrice}</td>
                      <td>{product.quantity}</td>
                      <td>{product.description}</td>
                      <td>
                        {product.quantity > 10 ?
                          (<span className="bg-green-100 text-green-600 px-2 py-1 rounded-lg text-sm">
                            In Stock</span>) :
                          (<span className="bg-red-100 text-red-600 px-2 py-1 rounded-lg text-sm">
                            Low Stock
                          </span>)}
                      </td>
                      <td className="flex gap-3 py-3">
                        <button className="text-blue-600 hover:scale-110"
                          onClick={() => {
                            setSelectedProductId(product._id)
                            setEditForm(product)
                            setShowEditModal(true)
                          }}>
                          <Edit className="w-4 h-4" />
                        </button>

                        {showEditModal &&
                          (
                            <EditModal
                              productId={product._id}
                              allProducts={products}
                              setAllProducts={setProducts}
                              editForm={editForm}
                              setEditForm={setEditForm}
                              showEditModal={showEditModal}
                              setShowEditModal={setShowEditModal} />
                          )}

                        <button className="text-red-600 hover:scale-110"
                          onClick={() => { handleDelete(product._id) }}>
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

