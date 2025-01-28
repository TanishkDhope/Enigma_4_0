import React from "react";

const Monitoring = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Real-Time Monitoring</h2>
      {/* Placeholder for monitoring chart */}
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 shadow-md">
        <p className="text-gray-500 text-center mb-4">
          <span className="text-lg font-medium text-gray-700">Device Activity Monitor</span>
        </p>
        <div className="flex justify-center items-center h-40 bg-gray-200 rounded-lg">
          <p className="text-gray-400">[Chart Placeholder]</p>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;