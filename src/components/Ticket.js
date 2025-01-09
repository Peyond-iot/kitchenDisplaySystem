import React, { useState, useEffect } from "react";

const Ticket = ({ id, orderItems, tableNumber, status, onFinish }) => {
  // Generate random color when the component mounts
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // State for random color
  const [color, setColor] = useState("");

  // Set the random color when the component mounts
  useEffect(() => {
    setColor(getRandomColor());
  }, []);

  const [finishButtonState, setFinishButtonState] = useState({
    color: "bg-gray-500 hover:bg-gray-400", // Default color for pending
  });

  // Handle finish button click (Finish => Completed)
  const handleFinishClick = () => {
    // Change status on button click
    if (status === "pending") {
      setFinishButtonState({ color: "bg-yellow-500 hover:bg-yellow-400" });
    } else if (status === "in-preparation") {
      setFinishButtonState({ color: "bg-green-500 hover:bg-green-400" });
    }

    if (onFinish) {
      onFinish(id); // Call the onFinish function (to update the backend or do other tasks)
      console.log(id);
    }
  };

  return (
    <div className="p-4 rounded-lg shadow-md text-black">
      {/* Order and Table Section */}
      <div
        className={`p-2 rounded-t-lg ${color ? "" : "bg-gray-800"}`}
        style={{
          backgroundColor: color || "#2d3748",
        }}
      >
        <h2 className="text-lg font-bold text-white">Order #{id}</h2>
        <p className="text-lg font-bold text-white">Table: {tableNumber}</p>
      </div>

      {/* Order Items List */}
      <div
        className="mt-0 p-2 rounded-lg"
        style={{
          backgroundColor: "white",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Light shadow for contrast
        }}
      >
        <ul>
          {orderItems.length > 0 ? (
            orderItems.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center text-sm py-1"
              >
                <span className="w-1/5 font-medium text-gray-800">
                  {item.quantity}x
                </span>
                <span className="w-3/5 font-medium text-gray-800">
                  {item.name}
                </span>
                <span className="w-1/5 font-medium text-gray-800 ">
                  {item.spiceLevel}
                </span>
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-300">No items in this order.</li>
          )}
        </ul>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex  gap-4">
        <button
          className={`w-full px-4 py-2  text-white rounded-lg hover:bg-blue-400 focus:outline-none ${finishButtonState.color}`}
          onClick={handleFinishClick}
        >
          {status}
        </button>
      </div>
    </div>
  );
};

export default Ticket;
