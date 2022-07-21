import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Cars from "./components/Cars/Cars";
import OuterSpace from "./components/OuterSpace/OuterSpace";
import "./App.css";

function App() {
  const [room, setRoom] = useState("main");

  return (
    <Router>
      <nav>
        <Link to="/" onClick={() => setRoom("main")}>
          Main Chat
        </Link>
        <Link to="/cars" onClick={() => setRoom("cars")}>
          Car Talk
        </Link>
        <Link to="/outerspace" onClick={() => setRoom("outerspace")}>
          Outer Space
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home room={room} />} />
        <Route path="/cars" element={<Cars room={room} />} />
        <Route path="/outerspace" element={<OuterSpace room={room} />} />
      </Routes>
    </Router>
  );
}
export default App;
