import { useState } from "react";
import { Test } from "./pages/test";

import SignUp from "./pages/SignUp";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Test />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
