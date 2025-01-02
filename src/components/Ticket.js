import React, { useState } from "react";

const Ticket = ({ id, orderItems, tableNumber, color, onFinish }) => {
  // Handle ticket completion (optional functionality)
  const handleFinish = () => {
    if (onFinish) {
      onFinish(id); // Call the provided onFinish function
    }
  };

  const [buttonState, setButtonState] = useState({
    label: "Start",
    color: "bg-green-500 hover:bg-green-400",
  });

  const handleClick = () => {
    setButtonState({
      label: "Preparing",
      color: "bg-yellow-500 hover:bg-yellow-400",
    });
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
      <div className="mt-4 flex justify-end gap-2">
        <button
          className={`w-1/2 px-4 py-2 text-white rounded-lg focus:outline-none ${buttonState.color}`}
          onClick={handleClick}
        >
          {buttonState.label}
        </button>
        <button
          className="w-1/2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 focus:outline-none"
          onClick={handleFinish}
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default Ticket;
