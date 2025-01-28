import React, { useState } from 'react';
import Navbar1 from './Navbar1'; // Adjust path if needed
import Monitoring from './Monitoring'; // Adjust path if needed
import Alerts from './Alerts'; // Adjust path if needed
import Statistics from './Statistics'; // Adjust path if needed
import Settings from './Settings'; // Adjust path if needed
import MCQForm from './MCQForm'; // Adjust path if needed
import { Routes, Route } from 'react-router-dom';
//import './AdminDashboard.css';

const AdminDashboard = () => {


    return (
        <div className="admin-dashboard">
            <Navbar1 />
            <main className="content">
                <Routes>
                    <Route path="/Monitoring" element={<Monitoring />} />
                    <Route path="/alerts" element={<Alerts />} />
                    <Route path="/statistics" element={<Statistics />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/MCQForm" element={<MCQForm />} />
                </Routes>
            </main>
        </div>
    );
};

export default AdminDashboard;
