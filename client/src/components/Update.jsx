import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    inStock: true,
  });

  // Fetch product data on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/product/get/${id}`);
        if (res.data.product) {
          setProduct(res.data.product);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("Failed to load product data.");
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCheckboxChange = () => {
    setProduct({ ...product, inStock: !product.inStock });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        `http://localhost:3001/product/update/${id}`,
        product,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success) {
        alert("Update Successfully");
        navigate("/");
      } else {
        alert("Update failed");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating product");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={product.inStock}
              onChange={handleCheckboxChange}
              className="w-4 h-4"
            />
            <span>In Stock</span>
          </label>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
