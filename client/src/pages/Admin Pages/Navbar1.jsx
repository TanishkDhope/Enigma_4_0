import React, { useState } from "react";
import Statistics from "./Statistics";
import Monitoring from "./Monitoring";
import Alerts from "./Alerts";
import MCQForm from "./MCQForm";

const Navbar1 = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const renderComponent = () => {
    switch (activeComponent) {
      case "MCQForm":
        return <MCQForm />;
      case "statistics":
        return <Statistics />;
      case "monitoring":
        return <Monitoring />;
      case "alerts":
        return <Alerts />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="flex justify-between items-center bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 rounded-lg font-medium transition duration-300"
            onClick={() => setActiveComponent("MCQForm")}
          >
            Add EXAM
          </button>
          <button
            className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 rounded-lg font-medium transition duration-300"
            onClick={() => setActiveComponent("statistics")}
          >
            Statistics
          </button>
          <button
            className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 rounded-lg font-medium transition duration-300"
            onClick={() => setActiveComponent("monitoring")}
          >
            Monitoring
          </button>
          <button
            className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 rounded-lg font-medium transition duration-300"
            onClick={() => setActiveComponent("alerts")}
          >
            Alerts
          </button>
          <button className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 rounded-lg font-medium transition duration-300">
            Profile
          </button>
          <button className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-medium transition duration-300">
            Logout
          </button>
        </div>
      </header>

      {/* Dynamic Content */}
      <main className="p-6">
        <div className="bg-white shadow-md rounded-lg p-4">{renderComponent()}</div>
      </main>
    </div>
  );
};

export default Navbar1;
