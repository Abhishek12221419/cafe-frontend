import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const frmRef = useRef();
  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: "",
    imgUrl: "",
  });
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(2);
  const [editId, setEditId] = useState();
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      setError("Loading...");
      const url = `${API_URL}/api/products/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url);
      setProducts(result.data.products);
      setTotalPages(Math.ceil(result.data.total / limit));
      setError();
    } catch (err) {
      console.log(err);
      setError("Failed to load products. Please try again.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, limit]);

  const handleDelete = async (id) => {
    try {
      const url = `${API_URL}/api/products/${id}`;
      await axios.delete(url);
      setError("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      console.log(err);
      setError("Failed to delete product");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!frmRef.current.checkValidity()) {
      frmRef.current.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/products`;
      await axios.post(url, form);
      setError("Product added successfully");
      fetchProducts();
      resetForm();
    } catch (err) {
      console.log(err);
      setError("Failed to add product");
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      productName: product.productName,
      description: product.description,
      price: product.price,
      imgUrl: product.imgUrl,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!frmRef.current.checkValidity()) {
      frmRef.current.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/products/${editId}`;
      await axios.patch(url, form);
      fetchProducts();
      setEditId();
      resetForm();
      setError("Product updated successfully");
    } catch (err) {
      console.log(err);
      setError("Failed to update product");
    }
  };

  const handleCancel = () => {
    setEditId();
    resetForm();
  };

  const resetForm = () => {
    setForm({
      productName: "",
      description: "",
      price: "",
      imgUrl: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-light text-cafe-800 mb-6 border-b pb-2 border-cafe-200">
        Product Management
      </h2>

      {/* Error/Success Message */}
      {error && (
        <div className={`mb-6 p-4 rounded-md ${
          error.includes("successfully") ? 
          "bg-green-100 text-green-700 border-l-4 border-green-500" : 
          "bg-red-100 text-red-700 border-l-4 border-red-500"
        }`}>
          {error}
        </div>
      )}

      {/* Product Form */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-cafe-200">
        <form ref={frmRef} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-cafe-700 mb-1">
                Product Name
              </label>
              <input
                id="productName"
                name="productName"
                value={form.productName}
                type="text"
                placeholder="Product Name"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-cafe-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-500"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-cafe-700 mb-1">
                Price
              </label>
              <input
                id="price"
                name="price"
                value={form.price}
                type="number"
                placeholder="Price"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-cafe-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-cafe-700 mb-1">
              Description
            </label>
            <input
              id="description"
              name="description"
              value={form.description}
              type="text"
              placeholder="Description"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-cafe-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-500"
            />
          </div>

          <div>
            <label htmlFor="imgUrl" className="block text-sm font-medium text-cafe-700 mb-1">
              Image URL
            </label>
            <input
              id="imgUrl"
              name="imgUrl"
              value={form.imgUrl}
              type="url"
              placeholder="Image URL"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-cafe-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-500"
            />
          </div>

          <div className="flex space-x-3 pt-2">
            {editId ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="bg-cafe-600 hover:bg-cafe-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Update Product
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-cafe-200 hover:bg-cafe-300 text-cafe-800 px-4 py-2 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleAdd}
                className="bg-cafe-600 hover:bg-cafe-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Add Product
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label htmlFor="search" className="sr-only">Search</label>
          <div className="relative">
            <input
              id="search"
              type="text"
              placeholder="Search products..."
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full px-4 py-2 border border-cafe-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-500"
            />
            <button
              onClick={fetchProducts}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-cafe-600 hover:bg-cafe-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="limit" className="text-sm font-medium text-cafe-700">
            Items per page:
          </label>
          <select
            id="limit"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border border-cafe-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cafe-500"
          >
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-cafe-200 mb-6">
        <table className="min-w-full divide-y divide-cafe-200">
          <thead className="bg-cafe-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cafe-700 uppercase tracking-wider">
                Product
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cafe-700 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cafe-700 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cafe-700 uppercase tracking-wider">
                Image
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-cafe-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-cafe-200">
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-cafe-600">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id} className="hover:bg-cafe-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cafe-800">
                    {product.productName}
                  </td>
                  <td className="px-6 py-4 text-sm text-cafe-600 max-w-xs truncate">
                    {product.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-cafe-600">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-16 h-16 bg-cafe-100 rounded-md overflow-hidden">
                      {product.imgUrl && (
                        <img src={product.imgUrl} alt={product.productName} className="w-full h-full object-cover" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-accent-500 hover:text-accent-700 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-cafe-200 pt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md ${page === 1 ? 'bg-cafe-100 text-cafe-400 cursor-not-allowed' : 'bg-cafe-200 hover:bg-cafe-300 text-cafe-700'}`}
        >
          Previous
        </button>
        <span className="text-sm text-cafe-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages || totalPages === 0}
          className={`px-4 py-2 rounded-md ${page === totalPages || totalPages === 0 ? 'bg-cafe-100 text-cafe-400 cursor-not-allowed' : 'bg-cafe-200 hover:bg-cafe-300 text-cafe-700'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}