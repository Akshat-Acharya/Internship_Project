import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const GetProduct = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  const fetchgetData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/product/get");
      if (res.data) {
        alert("Get Data Success");
        setProducts(res.data.productData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchgetData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:3001/product/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProducts((prev) => prev.filter((product) => product._id !== id));
      } catch (error) {
        alert("Error deleting product");
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Product List</h2>
          <Link to="/addProduct">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition">
              Add Product
            </button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-600 border border-gray-200 rounded-xl">
            <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">In Stock</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">${product.price}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">
                      {product.inStock ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <Link to={`/updateProduct/${product._id}`}>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-xl text-xs">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-xl text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GetProduct;
