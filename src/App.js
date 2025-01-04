import React, { useEffect, useState } from "react";
import TicketList from "./components/TicketList";
import { io } from "socket.io-client";

const App = () => {
  const [tickets, setTickets] = useState([]);

  // Initialize Socket.IO
  useEffect(() => {
    const socket = io("http://localhost:5000"); // Replace with your backend URL if different

    // Handle connection
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server:", socket.connected); // true
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server:", socket.connected); // false
    });

    // Listen for order updates
    socket.on("orderUpdated", (updatedOrder) => {
      console.log("Received updated order:", updatedOrder);

      setTickets((prevTickets) => {
        const existingTicketIndex = prevTickets.findIndex(
          (ticket) => ticket.id === updatedOrder.id
        );

        if (existingTicketIndex !== -1) {
          // Update existing ticket
          const updatedTickets = [...prevTickets];
          updatedTickets[existingTicketIndex] = updatedOrder;
          return updatedTickets;
        } else {
          // If the updated order is not found, add it to the list
          return [...prevTickets, updatedOrder];
        }
      });
    });

    // Listen for new order creation
    socket.on("orderCreated", (newOrder) => {
      console.log("Received new order:", newOrder);

      // Add the new order to the tickets list
      setTickets((prevTickets) => [...prevTickets, newOrder]);
    });

    // Cleanup
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 text-white text-center py-4">
        <h1 className="text-2xl font-bold">Kitchen Display System</h1>
      </header>
      <main className="p-4">
        {/* Pass the tickets state to the TicketList component */}
        <TicketList tickets={tickets} />
      </main>
    </div>
  );
};

export default App;
