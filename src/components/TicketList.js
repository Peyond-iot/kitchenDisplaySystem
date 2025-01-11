import React, { useState, useEffect } from "react";
import Ticket from "./Ticket";
import VerticalTab from "./VerticalTab";
import socket from "../socket"; // Import the socket instance

const TicketList = () => {
  // States to hold ongoing and completed orders
  const [ongoingOrders, setOngoingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("Active");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Fetch orders from the backend when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "https://backend-nwcq.onrender.com/api/orders"
        ); // Backend API endpoint
        const data = await response.json();

        // Separate ongoing and completed orders
        const ongoing = data.filter((order) => order.status !== "completed");
        const completed = data.filter((order) => order.status === "completed");

        setOngoingOrders(ongoing);
        setCompletedOrders(completed);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders(); // Trigger the fetch when the component mounts

    // Listen for new order creation from the server
    socket.on("newOrderCreated", (newOrder) => {
      console.log("New order created:", newOrder);

      // Add the new order to ongoing orders
      setOngoingOrders((prevOrders) => [...prevOrders, newOrder]);
    });

    return () => {
      // Clean up the socket listener when the component unmounts
      socket.off("newOrderCreated");
    };
  }, []);

  // Function to handle finish and update the respective states
  const handleFinish = (ticketId) => {
    // Find the order and determine the new status
    const order = ongoingOrders.find((order) => order._id === ticketId);

    if (!order) return;

    let newStatus;
    switch (order.status) {
      case "pending":
        newStatus = "in-preparation";
        break;
      case "in-preparation":
        newStatus = "completed";
        break;
      case "completed":
        return; // Already completed, no action needed
      default:
        newStatus = "pending";
    }

    // Update the status in the backend
    fetch(`https://backend-nwcq.onrender.com/api/orders/${ticketId}`, {
      method: "PUT",
      body: JSON.stringify({ status: newStatus }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        // Update the state based on the new status
        if (newStatus === "completed") {
          // Move to completed orders
          setOngoingOrders((prevOrders) =>
            prevOrders.filter((order) => order._id !== ticketId)
          );
          setCompletedOrders((prevCompletedOrders) => [
            ...prevCompletedOrders,
            { ...order, status: newStatus },
          ]);
        } else {
          // Update ongoing orders with the new status
          setOngoingOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === ticketId ? { ...order, status: newStatus } : order
            )
          );
        }
      })
      .catch((error) => {
        console.error("Error updating ticket status:", error);
      });
  };

  return (
    <div>
      <main className="flex flex-1 p-0">
        <VerticalTab onTabChange={handleTabChange} />
        <div className="w-full  bg-gray-100 shadow-lg ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {activeTab === "Active" ? (
              ongoingOrders.length > 0 ? (
                ongoingOrders.map((order) => (
                  <Ticket
                    key={order._id}
                    id={order._id}
                    orderItems={order.orderItems}
                    tableNumber={order.tableNumber}
                    status={order.status}
                    onFinish={handleFinish}
                  />
                ))
              ) : (
                <p>No ongoing orders yet.</p> // If no ongoing orders, show a message
              )
            ) : activeTab === "Completed" ? (
              completedOrders.length > 0 ? (
                completedOrders.map((order) => (
                  <Ticket
                    key={order._id}
                    id={order._id}
                    orderItems={order.orderItems}
                    tableNumber={order.tableNumber}
                    status={order.status}
                    onFinish={handleFinish}
                  />
                ))
              ) : (
                <p>No completed orders yet.</p> // If no completed orders, show a message
              )
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TicketList;
