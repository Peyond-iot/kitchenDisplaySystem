import React, { useState, useEffect } from "react";
import { put } from "../utils/request";

const Ticket = ({ id, orderItems, tableNumber, ticketStatus, onFinish }) => {
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

  // Track the status of each item
  const [itemsStatus, setItemsStatus] = useState(
    orderItems.reduce((acc, item) => {
      // Use itemId as the key to track the status of each item
      acc[item._id] = item.status || "Pending"; // Default to Pending if no status
      return acc;
    }, {})
  );

  // Handle status change on button click
  const handleStatusChange = (itemId) => {
    console.log(itemId);
    const currentStatus = itemsStatus[itemId];
    console.log(currentStatus);
    let newStatus;
    // Update status based on the current status
    if (currentStatus === "Pending") {
      newStatus = "In Preparation";
    } else if (currentStatus === "In Preparation") {
      newStatus = "Completed";
    } else if (currentStatus === "Completed") {
      newStatus = "Served";
    } else {
      newStatus = "Pending";
    }
    console.log(newStatus);
    // Update local state
    setItemsStatus((prevState) => ({
      ...prevState,
      [itemId]: newStatus,
    }));
    const newData = {
      status: newStatus,
    };
    updateOrderItem(itemId, newData);
  };

  const updateOrderItem = async (itemId, newData) => {
    try {
      const updatedOrder = await put(`/orders/ordersItems/${itemId}`, newData);
      console.log("Updated order:", updatedOrder);
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  // Handle finish button click (Finish => Completed)
  const handleFinishClick = () => {
    // Change status on button click
    if (ticketStatus === "pending") {
      setFinishButtonState({ color: "bg-yellow-500 hover:bg-yellow-400" });
    } else if (ticketStatus === "in-preparation") {
      setFinishButtonState({ color: "bg-green-500 hover:bg-green-400" });
    }

    if (onFinish) {
      onFinish(id); // Call the onFinish function (to update the backend or do other tasks)
      console.log(id);
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500"; // Pending: Orange/Yellow
      case "In Preparation":
        return "bg-blue-500"; // In Preparation: Blue
      case "Completed":
        return "bg-green-500"; // Completed: Green
      case "Served":
        return "bg-green-700"; // Served: Dark Green
      default:
        return "bg-gray-500"; // Default: Gray for unknown status
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
              <li key={index} className="text-sm py-1">
                {/* Item Name and Status Button */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-800">
                      {item.quantity}x
                    </span>
                    <span className="font-medium text-gray-800">
                      {item.name}
                    </span>
                  </div>
                  <button
                    className={`min-w-[140px] w-[140px] px-4 py-1 mr-4 text-white rounded-lg focus:outline-none ${getStatusColor(
                      itemsStatus[item._id] || "Pending"
                    )}`}
                    onClick={() => handleStatusChange(item._id)}
                  >
                    {itemsStatus[item._id] || "Pending"}
                  </button>
                </div>

                {/* Spicy Level and notes */}
                <div className="ml-6 mt-1 text-sm text-gray-600">
                  {item.spiceLevel && (
                    <ul className="list-disc pl-4">
                      <li>{item.spiceLevel}</li>
                    </ul>
                  )}
                  {item.notes && (
                    <ul className="list-disc pl-4">
                      <li>{item.notes}</li>
                    </ul>
                  )}
                </div>
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-300">No items in this order.</li>
          )}
        </ul>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-4">
        <button
          className={`w-full px-4 py-2 text-white rounded-lg hover:bg-blue-400 focus:outline-none ${finishButtonState.color}`}
          onClick={() => handleFinishClick(id)}
        >
          {ticketStatus}
        </button>
      </div>
    </div>
  );
};

export default Ticket;
