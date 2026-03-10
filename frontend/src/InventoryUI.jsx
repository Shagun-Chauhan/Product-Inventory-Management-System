import { Plus, Edit, Trash2, Package, Search } from "lucide-react";

export default function InventoryUI() {
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
            <h2 className="text-3xl font-bold">128</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500 text-sm">Low Stock</p>
            <h2 className="text-3xl font-bold text-red-500">12</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500 text-sm">Categories</p>
            <h2 className="text-3xl font-bold">8</h2>
          </div>
        </div>

        {/* Add Product Form */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add Product</h2>

          <div className="grid md:grid-cols-5 gap-4">
            <input
              placeholder="Product Name"
              className="border rounded-lg p-2"
            />

            <input
              placeholder="Category"
              className="border rounded-lg p-2"
            />

            <input
              placeholder="Cost Price"
              type="number"
              className="border rounded-lg p-2"
            />
            <input
              placeholder="Selling Price"
              type="number"
              className="border rounded-lg p-2"
            />

            <input
              placeholder="Quantity"
              type="number"
              className="border rounded-lg p-2"
            />
             <input
              placeholder="Description"
              className="border rounded-lg p-2"
            />
            <button className="bg-black text-white rounded-lg flex items-center justify-center gap-2">
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
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 font-medium">Wireless Mouse</td>
                  <td>Electronics</td>
                  <td>$900</td>
                  <td>$1500</td>
                  <td>120</td>
                  <td>New Mouse</td>
                  <td>
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-lg text-sm">
                      In Stock
                    </span>
                  </td>
                  <td className="flex gap-3 py-3">
                    <button className="text-blue-600 hover:scale-110">
                      <Edit className="w-4 h-4" />
                    </button>

                    <button className="text-red-600 hover:scale-110">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>

                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 font-medium">Keyboard</td>
                  <td>Electronics</td>
                  <td>$1500</td>
                  <td>$2500</td>
                  <td>10</td>
                  <td>New keyboard</td>
                  <td>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-lg text-sm">
                      Low Stock
                    </span>
                  </td>
                  <td className="flex gap-3 py-3">
                    <button className="text-blue-600 hover:scale-110">
                      <Edit className="w-4 h-4" />
                    </button>

                    <button className="text-red-600 hover:scale-110">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
