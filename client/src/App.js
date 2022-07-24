import React, { useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import "./App.css";

function App() {
  const [room, setRoom] = useState("main");
  const [roomName, setRoomName] = useState("Main");
  return (
    <Router>
      <h2>You are in the {roomName} chat room </h2>
      <nav>
        <Link
          to="/"
          onClick={() => {
            setRoom("main");
            setRoomName("Main ");
          }}
        >
          Main Chat
        </Link>
        <Link
          to="/cars"
          onClick={() => {
            setRoom("cars");
            setRoomName("Car Talk");
          }}
        >
          Car Talk
        </Link>
        <Link
          to="/outerspace"
          onClick={() => {
            setRoom("outerspace");
            setRoomName("Outer Space");
          }}
        >
          Outer Space
        </Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <Chat
              room={room}
              setRoom={setRoom}
              setRoomName={setRoomName}
              fetchPath="main"
            />
          }
        />
        <Route
          path="/cars"
          element={
            <Chat
              room={room}
              setRoom={setRoom}
              setRoomName={setRoomName}
              fetchPath="cars"
            />
          }
        />
        <Route
          path="/outerspace"
          element={
            <Chat
              room={room}
              setRoom={setRoom}
              setRoomName={setRoomName}
              fetchPath="outerspace"
            />
          }
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
