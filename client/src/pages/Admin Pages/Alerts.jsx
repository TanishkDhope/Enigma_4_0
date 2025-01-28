import React from 'react';

const Alerts = () => {
    const alertData = [
        { id: 1, message: 'Device 1: Screen Sharing Detected', timestamp: '2025-01-28 10:00 AM' },
        { id: 2, message: 'Device 2: Irregular Gaze Pattern', timestamp: '2025-01-28 10:05 AM' },
    ];

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                Suspicious Activity Alerts
            </h2>
            <ul className="space-y-4">
                {alertData.map((alert) => (
                    <li
                        key={alert.id}
                        className="p-4 bg-white border border-gray-300 rounded-lg flex flex-col shadow-sm hover:shadow-lg transition-shadow duration-200"
                    >
                        <p className="font-semibold text-red-600">{alert.message}</p>
                        <span className="text-sm text-gray-500 mt-2">{alert.timestamp}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Alerts;
