import React from 'react';
import './Styles/Statistics.css';

const Statistics = () => {
    const statistics = {
        totalStudents: 150,
        activeExams: 90,
        examsPassed: 60,
        examsFailed: 30,
    };

    return (
        <div>
            <h2>User Statistics</h2>
            <p>Total Students: {statistics.totalStudents}</p>
            <p>Active Exams: {statistics.activeExams}</p>
            <p>Exams Passed: {statistics.examsPassed}</p>
            <p>Exams Failed: {statistics.examsFailed}</p>
        </div>
    );
};

export default Statistics;
