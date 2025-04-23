import React, { useEffect } from "react";
import Navbar from "./Navbar.jsx";
import Card from "./Card.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = () => {
  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [date, setDate] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [submitData, setSubmitData] = React.useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/dataadd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name, desc, date, category }),
    });
    const data = await response.json();
    if (data.success) {
      toast.success(data.message, { autoClose: 3000 });
      setName("");
      setDesc("");
      setDate("");
      setCategory("");
      setSubmitData(true);
    }
  };

  const handleReset = () => {
    setSubmitData(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        if (!data.success) {
          navigate("/login");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-[#D4C9BE] px-4 py-6 overflow-x-hidden">
        <form
          onSubmit={submit}
          className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-4"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Work Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="Enter your work name"
            />
          </div>
          <div>
            <label
              htmlFor="desc"
              className="block text-sm font-medium text-gray-700"
            >
              Work Description
            </label>
            <input
              type="text"
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="Enter your work description"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="Enter category"
            />
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Completion Date & Time
            </label>
            <input
              type="datetime-local"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>

        <div className="mt-8 w-full max-w-md">
          <h2 className="text-xl font-bold text-center mb-4">NOTES</h2>
          <Card submitData={submitData} onReset={handleReset} />
        </div>
      </div>
    </>
  );
};

export default Main;
