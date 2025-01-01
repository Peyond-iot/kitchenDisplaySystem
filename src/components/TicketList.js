import React from "react";
import Ticket from "./Ticket";

const TicketList = () => {
  const orders = [
    {
      id: 1,
      orderItems: ["Pizza", "Pasta"],
      tableNumber: "5",
      color: "#FF5733",
    },
    {
      id: 2,
      orderItems: ["Burger", "Fries"],
      tableNumber: "3",
      color: "#33FF57",
    },
    {
      id: 3,
      orderItems: ["Sushi", "Miso Soup"],
      tableNumber: "8",
      color: "#3357FF",
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
