import React, { useState } from "react";

const VerticalTab = () => {
  const [activeTab, setActiveTab] = useState("Active");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-1/12 p-4 bg-gray-300 shadow-lg  mr-0">
      <button
        onClick={() => handleTabClick("Active")}
        className={`w-full py-2 px-4 text-left text-lg font-medium  mb-2 rounded-md ${
          activeTab === "Active"
            ? "bg-blue-500 text-white"
            : "hover:bg-blue-100 text-gray-700"
        }`}
      >
        Active
      </button>
      <button
        onClick={() => handleTabClick("Completed")}
        className={`w-full py-2 px-4 text-left text-lg font-medium mb-2 rounded-md ${
          activeTab === "Completed"
            ? "bg-blue-500 text-white"
            : "hover:bg-blue-100 text-gray-700"
        }`}
      >
        Completed
      </button>
    </div>
  );
};

export default VerticalTab;
