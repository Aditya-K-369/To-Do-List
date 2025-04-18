import React from "react";
import { useNavigate } from "react-router-dom";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Navbar = () => {
  const navigate = useNavigate();
  const handleclick = async (e) => {
  const response = await fetch("http://localhost:3000/logout",{
    method:"DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if(data.success){
    toast(data.message);
    navigate('/login');
  }
  else{
    toast(data.message);
  } 
}
  return (
   
    <div style={{ backgroundColor: "#D29F80" }}>
      <nav className="navbar grid grid-cols-2 width-full">
        <div className=" text-white font-bold text-3xl ml-10  p-5"><h1>To-Do List</h1></div>
        <div className=" flex justify-end align-center mr-10 p-5">
            <button onClick={handleclick}className="rounded-[20vw] bg-blue-800 px-8 py-2 text-white font-medium" >Logout</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
