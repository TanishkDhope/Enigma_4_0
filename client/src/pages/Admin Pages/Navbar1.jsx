import React, { useState } from 'react';
import './Styles/navbar1.css';
import Statistics from './Statistics';
import Monitoring from './Monitoring';
import Alerts from './Alerts';
import MCQForm from './MCQForm';

const navbar1 = () => {
    // Define a state to track which component should be displayed
    const [activeComponent, setActiveComponent] = useState(null);

    // Render the component based on the activeComponent state
    const renderComponent = () => {
        switch (activeComponent) {
            case 'MCQForm':
                return <MCQForm />;
            case 'statistics':
                return <Statistics />;
            case 'monitoring':
                return <Monitoring />;
            case 'alerts':
                return <Alerts />;
            default:
                return null; // Default to nothing or Home
        }
    };

    return (
        <div>
            <header className="navbar1">
                <div className="navbar1-title">Admin Dashboard</div>
                <div className="navbar1-actions">
                    <button className="action-button" onClick={() => setActiveComponent('MCQForm')}>Add EXAM</button>
                    <button className="action-button" onClick={() => setActiveComponent('statistics')}>Statistics</button>
                    <button className="action-button" onClick={() => setActiveComponent('monitoring')}>Monitoring</button>
                    <button className="action-button" onClick={() => setActiveComponent('alerts')}>Alerts</button>
                    <button className="action-button">Profile</button>
                    <button className="action-button">Logout</button>
                </div>
            </header>
            {/* Render the active component */}
            <div className="content">
                {renderComponent()}
            </div>
        </div>
    );
};

export default navbar1;
