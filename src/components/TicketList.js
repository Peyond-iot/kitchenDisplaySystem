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
  // console.log(orderss[0]._id);
  //console.log(orderss[0].orderItems.quantity);
  //console.log(orderss[0].orderItems.name);
  //console.log(orderss[0].orderItems.spiceLevel);
  //console.log(orderss[0].tableNumber);
  //const orders = [
  //  {
  //   id: 10,
  //    orderItems: [
  //      { quantity: 2, name: "Burger", spiceLevel: "Medium" },
  //      { quantity: 1, name: "Fries", spiceLevel: "Mild" },
  //    ],
  //    tableNumber: "3",
  //  },
  // ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {orders.length > 0 ? (
        orders.map((order) => (
          <Ticket
            key={order._id}
            id={order._id}
            orderItems={order.orderItems}
            tableNumber={order.tableNumber}
          />
        ))
      ) : (
        <p>No orders yet.</p> // If no orders, show a message
      )}
    </div>
  );
};

export default TicketList;
