// src/App.js
import React from "react";
import TicketList from "./components/TicketList";
import VerticalTab from "./components/VerticalTab";
import HorizontalTab from "./components/HorizontalTab";
const App = () => {
  return (
    <div className=" bg-gray-100 flex flex-col">
      {/* Horizontal Tab */}
      <div className="bg-gray-200  shadow-lg p-0 ">
        <HorizontalTab />
      </div>

      {/* Content Section */}

      <TicketList />
    </div>
  );
};

export default App;
