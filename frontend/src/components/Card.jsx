import React, { useState } from "react";
import { useEffect } from "react";
const Card = ({ submitted, onReset }) => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState("");

  let filteredData = data.filter((item)=>{
    return item.category.toLowerCase().includes(category.toLowerCase());
  })

  const deletenote = async ({ id }) => {
    const response = await fetch("http://localhost:3000/datadelete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id,
      }),
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
      <div className=" h-[10vh] flex flex-col justify-center text-center items-center" style={{ backgroundColor: "#D4C9BE" }}>
        <div className="w-2/8 py-2 rounded-md shadow-lg  border-gray-600" style={{ backgroundColor: "#9ACBD0" }}>
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="border-2 border-black rounded-md p-2 m-2"
              placeholder="Search by category"
            />
          </label>
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center" style={{ backgroundColor: "#D4C9BE" }}>
        {filteredData.length === 0 && (
          <div className=" flex items-center text-3xl  h-[11vh] font-bold text-red-500">
           No Note available
          </div>
        )}
        {filteredData &&
          filteredData.map((item) => (
            <div
              key={item._id}
              className="w-2/7 h-[55vh] ml-10 mt-10  rounded-xl my-10 p-5 " 
              style={{ backgroundColor: "#D3CA79" }}
            >
              <div>
                <div className="flex   justify-between items-center">
                  <div className="text-3xl w-4/7 font-bold mb-3 mt-2 break-words">
                    {item.name}
                  </div>
                  <div className="break-words w-3/7 text-xl mb-3 mt-2">
                    {" "}
                    <b>CATEGORY</b> : {item.category}
                  </div>
                </div>
                <div className="break-words">
                  <p>{item.desc}</p>
                </div>

                <div className="mt-2 mb-2">
                  {new Date() >= new Date(item.deadLineAt) ? (
                    <div className=" font-bold text-red-500">
                      Deadline Passed                      
                    </div>
                  ) : (
                    <div className="text-green-600">Deadline Not Passed</div>
                  )}
                </div>
                <div className="flex justify-between">
                  <div>
                    {" "}
                    {new Date(item.deadLineAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </div>
                  <div>
                    <button
                      onClick={() => deletenote({ id: item._id })}
                      className="bg-red-500 p-2  rounded-md"
                    >
                      Delete Note
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
export default Card;
