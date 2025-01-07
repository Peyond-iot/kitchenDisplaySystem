// src/components/HorizontalTab.js
import React, { useState } from "react";

const HorizontalTab = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    //  onSearch(event.target.value); // Send search term to the parent component
  };

  return (
    <div className="flex justify-end items-center  shadow-md p-3">
      {/* Search Input */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="border rounded-lg px-3 py-1 text-sm w-full"
        />
      </div>
    </div>
  );
};

export default HorizontalTab;
