import React, { useState, useEffect } from "react";
import Ticket from "./Ticket";

const TicketList = () => {
  //State to hold the orders
  const [orderss, setOrders] = useState([]);

  // Fetch orders from the backend when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders"); // Backend API endpoint
        const data = await response.json();
        setOrders(data); // Set fetched orders in state
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders(); // Trigger the fetch when the component mounts
  }, []); // Empty dependency array means this effect runs once when the component mounts
  // console.log(orderss[0]._id);
  //console.log(orderss[0].orderItems.quantity);
  //console.log(orderss[0].orderItems.name);
  //console.log(orderss[0].orderItems.spiceLevel);
  //console.log(orderss[0].tableNumber);
  const orders = [
    {
      id: 10,
      orderItems: [
        { quantity: 2, name: "Burger", spiceLevel: "Medium" },
        { quantity: 1, name: "Fries", spiceLevel: "Mild" },
      ],
      tableNumber: "3",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {orderss.map((order) => (
        <Ticket
          key={order._id}
          id={order._id}
          orderItems={order.orderItems}
          tableNumber={order.tableNumber}
        />
      ))}
    </div>
  );
};

export default TicketList;
