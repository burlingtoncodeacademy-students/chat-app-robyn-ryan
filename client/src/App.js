import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Chat from "./components/Chat/Chat";
import "./App.css";

//Advertisement images
import outerspaceAd from "./images/james-webb-teleimg.jpeg";
import doggoSpaAd from "./images/doggo-spa-day.png";

function App() {
  // room and roomName are intially set to "main" and change when navlinks are clicked
  const [room, setRoom] = useState("main");
  const [roomName, setRoomName] = useState("Main");

  // Set the name of the room above the message display
  useEffect(() => {
    if (room === "cars") {
      setRoomName("Car Talk chat room");
    } else if (room === "outerspace") {
      setRoomName("Outer Space chat room");
    } else {
      setRoomName("Main chat room");
    }
  }, [room]);

  // The timer for changing the ad beneath the navigation
  const [ad, setAd] = useState(outerspaceAd);
  useEffect(() => {
    let adInterval = setInterval(() => {
      if (ad === outerspaceAd) {
        setAd(doggoSpaAd);
      } else {
        setAd(outerspaceAd);
      }
    }, 2500);
    return () => clearInterval(adInterval);
  }, [ad]);

  // Styling for navlink based on "active" status
  let activeStyle = {
    textDecoration: "none",
    color: "#CE7DA5",
    pointerEvents: "none",
  };

  let inactiveStyle = {
    textDecoration: "none",
  };

  return (
    // Grid wrapper
    <div id="wrapper">
      <Router>
        <div id="h1">
          <h1>
            Chit-Chat: <span style={{ fontSize: "14pt" }}>the Chatty App</span>
          </h1>
        </div>
        <div id="h2">
          <h2>{roomName} Room</h2> {/* See useEffect for setRoomName above */}
        </div>

        {/* The navigation is where the Room and Room Name are set based on the navlink clicked */}
        <div id="nav">
          <nav>
            <NavLink
              to="/"
              onClick={() => {
                setRoom("main");
                setRoomName("Main ");
              }}
              style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
            >
              Main Chat
            </NavLink>
            <NavLink
              to="/cars"
              onClick={() => {
                setRoom("cars");
                setRoomName("Car Talk");
              }}
              style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
            >
              Car Talk
            </NavLink>
            <NavLink
              to="/outerspace"
              onClick={() => {
                setRoom("outerspace");
                setRoomName("Outer Space");
              }}
              style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
            >
              Outer Space
            </NavLink>
          </nav>
        </div>

        {/* The advertisement image display */}
        <div id="ad">
          <img src={ad} alt="advertisement" />
        </div>

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
    </div>
  );
}
export default App;
