import React from "react";
import Ticket from "./Ticket";

const TicketList = () => {
  const orders = [
    {
      id: 2,
      orderItems: [
        { quantity: 2, name: "Burger", spiceLevel: "Medium" },
        { quantity: 1, name: "Fries", spiceLevel: "Mild" },
      ],
      tableNumber: "3",
    },
    {
      id: 3,
      orderItems: [
        { quantity: 3, name: "Sushi", spiceLevel: "Hot" },
        { quantity: 1, name: "Miso Soup", spiceLevel: "Medium" },
      ],
      tableNumber: "8",
    },
    {
      id: 3,
      orderItems: [
        { quantity: 3, name: "Sushi", spiceLevel: "Hot" },
        { quantity: 1, name: "Miso Soup", spiceLevel: "Medium" },
      ],
      tableNumber: "8",
    },
    {
      id: 2,
      orderItems: [
        { quantity: 2, name: "Burger", spiceLevel: "Medium" },
        { quantity: 1, name: "Fries", spiceLevel: "Mild" },
      ],
      tableNumber: "3",
    },
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
      {orders.map((order) => (
        <Ticket
          key={order.id}
          id={order.id}
          orderItems={order.orderItems}
          tableNumber={order.tableNumber}
          color={order.color}
        />
      ))}
    </div>
  );
};

export default TicketList;
