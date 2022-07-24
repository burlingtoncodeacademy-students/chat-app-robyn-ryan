import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Chat from "./components/Chat/Chat";
// import Cars from "./components/Cars/Cars";
// import OuterSpace from "./components/OuterSpace/OuterSpace";
import "./App.css";

function App() {
  const [room, setRoom] = useState("main");
  const [roomName, setRoomName] = useState('')
  useEffect(()=>{
    if (room==='cars'){ setRoomName('Car Talk chat room')}
    else if (room==='outerspace'){ setRoomName('Outer Space chat room')}
    else { setRoomName('Main chat room')}
  }, [room])
    
  return (
    <Router>
      <h1>You are in the {roomName} </h1>
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
        <Route
          path="/"
          element={<Chat room={room} fetchPath='main' />}
        />
        <Route
          path="/cars"
          element={<Chat room={room} fetchPath='cars' />}
        />
        <Route
          path="/outerspace"
          element={<Chat room={room} fetchPath='outerspace' />}
        />
      </Routes>
    </Router>
  );
}
export default App;

/* 
To Do:
! populate other components
! filter messages by room
! format messages
! css
*/
