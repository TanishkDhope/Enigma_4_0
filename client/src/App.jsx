import { useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ExamPage from "./pages/ExamPage";
import Login from "./pages/login";
import SignUp from "./pages/SignUp";
//import AdminDashboard from "./pages/Admin Pages/AdminDashboard";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        <Navbar />
        <main className="flex-grow">
          <Routes> 
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/exam/:examId" element={<ExamPage />} />  
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;