import React from 'react';

const Alerts = () => {
    const alertData = [
        { id: 1, message: 'Device 1: Screen Sharing Detected', timestamp: '2025-01-28 10:00 AM' },
        { id: 2, message: 'Device 2: Irregular Gaze Pattern', timestamp: '2025-01-28 10:05 AM' },
    ];

    return (
        <div>
            <h2>Suspicious Activity Alerts</h2>
            <ul>
                {alertData.map((alert) => (
                    <li key={alert.id}>
                        <strong>{alert.message}</strong> <span>({alert.timestamp})</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Alerts;
