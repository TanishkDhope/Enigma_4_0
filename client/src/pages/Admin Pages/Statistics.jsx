import React from "react";

const Statistics = () => {
  const statistics = {
    totalStudents: 150,
    activeExams: 90,
    examsPassed: 60,
    examsFailed: 30,
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">User Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Students */}
        <div className="p-4 bg-indigo-50 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-medium text-gray-700">Total Students</h3>
          <p className="text-3xl font-bold text-indigo-600">{statistics.totalStudents}</p>
        </div>

        {/* Active Exams */}
        <div className="p-4 bg-green-50 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-medium text-gray-700">Active Exams</h3>
          <p className="text-3xl font-bold text-green-600">{statistics.activeExams}</p>
        </div>

        {/* Exams Passed */}
        <div className="p-4 bg-blue-50 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-medium text-gray-700">Exams Passed</h3>
          <p className="text-3xl font-bold text-blue-600">{statistics.examsPassed}</p>
        </div>

        {/* Exams Failed */}
        <div className="p-4 bg-red-50 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-medium text-gray-700">Exams Failed</h3>
          <p className="text-3xl font-bold text-red-600">{statistics.examsFailed}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;