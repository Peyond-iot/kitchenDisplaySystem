import React, { useState, useEffect } from "react";
import Ticket from "./Ticket";
import socket from "../socket"; // Import the socket instance

const TicketList = () => {
  //State to hold the orders
  const [orders, setOrders] = useState([]);

  // Fetch orders from the backend when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "https://backend-nwcq.onrender.com/api/orders"
        ); // Backend API endpoint
        const data = await response.json();
        setOrders(data); // Set fetched orders in state
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders(); // Trigger the fetch when the component mounts

    // Listen for new order creation from the server
    socket.on("newOrderCreated", (newOrder) => {
      console.log("New order created:", newOrder);
      setOrders((prevOrders) => [...prevOrders, newOrder]); // Add the new order to the state
    });

    // Clean up the socket listener when the component unmounts
    return () => {
      socket.off("newOrderCreated");
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Function to handle finish and remove completed ticket
  const handleFinish = (ticketId) => {
    // Get the current ticket status
    const order = orders.find((order) => order._id === ticketId);

    // Determine the new status based on the current status
    let newStatus;
    switch (order.status) {
      case "pending":
        newStatus = "in-preparation";
        break;
      case "in-preparation":
        newStatus = "completed";
        break;
      case "completed":
        newStatus = "completed"; // Status stays completed
        break;
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
        // Update status locally in the state
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === ticketId ? { ...order, status: newStatus } : order
          )
        );

        // If the status is "completed", remove the ticket after 1 second
        if (newStatus === "completed") {
          setTimeout(() => {
            setOrders((prevOrders) =>
              prevOrders.filter((ticket) => ticket._id !== ticketId)
            );
          }, 1000);
        }
      })
      .catch((error) => {
        console.error("Error updating ticket status:", error);
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {orders.length > 0 ? (
        orders.map((order) => (
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
        <p>No orders yet.</p> // If no orders, show a message
      )}
    </div>
  );
};

export default TicketList;
