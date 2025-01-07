// src/App.js
import React from "react";
import TicketList from "./components/TicketList";
import VerticalTab from "./components/VerticalTab";
import HorizontalTab from "./components/HorizontalTab";
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Horizontal Tab */}
      <div className="bg-gray-200  shadow-lg p-0 ">
        <HorizontalTab />
      </div>

      <main className="flex flex-1 p-0">
        {/* Vertical Tab Section with subtle background and icons */}

        <VerticalTab />

        {/* Content Section */}
        <div className="flex-1  bg-gray-100 shadow-lg ">
          <TicketList />
        </div>
      </main>
    </div>
  );
};

export default App;
