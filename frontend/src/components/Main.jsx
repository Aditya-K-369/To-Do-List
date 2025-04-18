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
    const response = await fetch("http://localhost:3000/dataadd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: name,
        desc: desc,
        date: date,
        category: category,
      }),
    });
    const data = await response.json();
    if (data.success) {
      toast(data.message, { autoClose: 3000 });
    }
    setName("");
    setDesc("");
    setDate("");
    setCategory("");
    setSubmitData(true);
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
  }, []);

  return (
    <>
      <Navbar></Navbar>

      <div className="h-[60vh] flex flex-col justify-center text-center items-center" style={{ backgroundColor: "#D4C9BE" }}>
        <div className="w-2/8 py-10 rounded-md shadow-lg  border-gray-600 " style={{ backgroundColor: "#9ACBD0" }}>
          <div>
            <div>
              <label htmlFor="name">
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  className="border-2 border-black rounded-md p-2 m-2"
                  placeholder="Enter your work name"
                />
              </label>
            </div>
            <div>
              <label htmlFor="name-desc">
                <input
                  type="text"
                  name="name-desc"
                  id="name-desc"
                  required
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                  className="border-2 border-black rounded-md p-2 m-2"
                  placeholder="Enter your work description"
                />
              </label>
            </div>
            <div>
              <label htmlFor="category    ">
                <input
                  type="text"
                  name="category"
                  id="category"
                  required
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  className="border-2 border-black rounded-md p-2 m-2"
                  placeholder="Enter category"
                />
              </label>
            </div>
            <div>
              <label htmlFor="date">
                <div>Completion Date & Time</div>
                <input
                  type="datetime-local"
                  name="date"
                  id="date"
                  required
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  className="border-2 border-black rounded-md p-2 m-2"
                />
              </label>
            </div>
            <div>
              <button
                onClick={submit}
                className="rounded-[20vw] bg-blue-800 px-8 py-2 text-white font-medium"
              >
                submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <>
      <div className="font-bold text-3xl mt-auto text-center p-3" style={{backgroundColor:"#D4C9BE"}} >
        NOTES
      </div>
      </>
      <Card submitData={submitData} onReset={handleReset}></Card>
    </>
  );
};

export default Main;
