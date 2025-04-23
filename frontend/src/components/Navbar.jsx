import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleclick = async (e) => {
    const response = await fetch("http://localhost:3000/logout", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      toast.success(data.message);
      navigate("/login");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="bg-[#D29F80]">
      <nav className="flex flex-col sm:flex-row justify-between items-center px-4 py-3 sm:px-10 sm:py-5">
        {/* Logo Section */}
        <div className="text-white font-bold text-2xl sm:text-3xl">
          <h1>To-Do List</h1>
        </div>

        {/* Logout Button */}
        <div className="mt-3 sm:mt-0">
          <button
            onClick={handleclick}
            className="rounded-full bg-blue-800 px-6 py-2 text-white font-medium hover:bg-blue-900 transition"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;