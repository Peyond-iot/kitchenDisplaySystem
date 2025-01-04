// src/App.js
import React from "react";
import TicketList from "./components/TicketList";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 text-white text-center py-4">
        <h1 className="text-2xl font-bold">Kitchen Display System</h1>
      </header>
      <main className="p-4">
        {/* Render the TicketList component */}
        <TicketList />
      </main>
    </div>
  );
};

export default App;
