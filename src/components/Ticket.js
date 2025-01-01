import React from "react";

const Ticket = ({ id, orderItems, tableNumber, color, onFinish }) => {
  // Handle ticket completion (optional functionality)
  const handleFinish = () => {
    if (onFinish) {
      onFinish(id); // Call the provided onFinish function
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
        <h2 className="text-lg font-bold">Order #{id}</h2>
        <p className="text-sm">Table: {tableNumber}</p>
      </div>

      {/* Order Items List */}
      <div
        className="mt-2 p-4 rounded-lg"
        style={{
          backgroundColor: "white",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Light shadow for contrast
        }}
      >
        <ul>
          {orderItems.length > 0 ? (
            orderItems.map((item, index) => (
              <li key={index} className="text-sm">
                {item}
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
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 focus:outline-none"
          onClick={handleFinish}
        >
          Finish
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 focus:outline-none">
          Start
        </button>
      </div>
    </div>
  );
};

export default Ticket;
