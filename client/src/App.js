import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Main Chat</Link>
        <Link to="/cars">Car Talk</Link>
        <Link to="/outerspace">Outer Space</Link>
      </nav>
      <Routes>
        {/* <Route path="/" element={<Main />} /> */}
        {/* <Route path="/cars" element={<Cars />} /> */}
        {/* <Route path="/outerspace" element={<OuterSpace />} /> */}
      </Routes>
    </Router>
  );
}
export default App;
