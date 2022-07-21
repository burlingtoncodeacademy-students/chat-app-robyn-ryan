import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './components/Home/Home'
import Cars from './components/Cars/Cars'
import OuterSpace from "./components/OuterSpace/OuterSpace";
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
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/outerspace" element={<OuterSpace />} />
      </Routes>
    </Router>
  );
}
export default App;
