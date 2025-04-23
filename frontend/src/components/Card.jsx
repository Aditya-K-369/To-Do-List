import React, { useState, useEffect } from "react";
import "../App.css";
const Card = ({ submitted, onReset }) => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState("");

  const filteredData = data.filter((item) =>
    item.category.toLowerCase().includes(category.toLowerCase())
  );

  const deletenote = async ({ id }) => {
    const response = await fetch("http://localhost:3000/datadelete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    setRefresh(!refresh);
  };

  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:3000/dataget", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setData(data);

      onReset();
      const timer = setInterval(() => {
        setDate(new Date());
      }, 1000);
    }
    getData();
  }, [submitted, onReset, refresh]);

  return (
    <>
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          name="category"
          id="category"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="search-input "
          placeholder="Search by category"
        />
      </div>

      {/* Task Cards */}
      <div className="card-container">
        {filteredData.length === 0 && (
          <div className="no-notes">No Notes Available</div>
        )}
        {filteredData.map((item) => (
          <div key={item._id} className="card">
            <div className="card-header">
              <h3 className="card-title">{item.name}</h3>
              <p className="card-category">
                <b>Category:</b> {item.category}
              </p>
            </div>
            <p className="card-description">{item.desc}</p>
            <div className="card-footer">
              <p className="card-deadline">
                {new Date(item.deadLineAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
              <button
                onClick={() => deletenote({ id: item._id })}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;