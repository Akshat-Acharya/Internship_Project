import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-bold tracking-wide">Product App</h2>
      <div className="space-x-4 flex items-center">
        <Link
          to="/"
          className="hover:bg-blue-700 px-3 py-1 rounded transition duration-200"
        >
          Home
        </Link>
        <Link
          to="/getProduct"
          className="hover:bg-blue-700 px-3 py-1 rounded transition duration-200"
        >
          Get Products
        </Link>
        <Link
          to="/addProduct"
          className="hover:bg-blue-700 px-3 py-1 rounded transition duration-200"
        >
          Add Product
        </Link>
        <Link
          to="/login"
          className="hover:bg-blue-700 px-3 py-1 rounded transition duration-200"
        >
          Login
        </Link>

        {/* If logged in, show logout */}
        {localStorage.getItem("token") && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition duration-200"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
