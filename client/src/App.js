import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import "./App.css";
import outerspaceAd from "./images/james-webb-teleimg.jpeg";
import doggoSpaAd from "./images/doggo-spa-day.png";

function App() {
  const [room, setRoom] = useState("main");
  const [roomName, setRoomName] = useState("Main");

  useEffect(() => {
    if (room === "cars") {
      setRoomName("Car Talk chat room");
    } else if (room === "outerspace") {
      setRoomName("Outer Space chat room");
    } else {
      setRoomName("Main chat room");
    }
  }, [room]);

  // This is the timer for changing the ad beneath the navigation
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

  return (
    <div id="wrapper">
      <Router>
        <div id="h1">
          <h1>
            Chit-Chat: <span style={{ fontSize: "14pt" }}>the Chatty App</span>
          </h1>
        </div>
        <div id="h2">
          <h2>{roomName} Room</h2>
        </div>
        <div id="nav">
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
        </div>
        <div id="ad">
          <img src={ad} alt="ad image" />
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
