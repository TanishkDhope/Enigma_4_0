import { useState } from "react";
import { Test } from "./pages/test";
import  Login  from "./pages/login";

import SignUp from "./pages/SignUp";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Test />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
