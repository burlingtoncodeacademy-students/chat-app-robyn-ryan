import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Cars from "./components/Cars/Cars";
import OuterSpace from "./components/OuterSpace/OuterSpace";
import "./App.css";

function App() {
  const [room, setRoom] = useState("main");
  const [render, setRender] = useState(true)
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    //fetches information from a local API route set up on the server
    async function getData(){
      let res = await fetch("http://localhost:8000/api/message/all-messages")
      let data = await res.json();
      setAllMessages(data)
      console.log(data)
    }
    getData()
  }, [setAllMessages, render]);
    /* fetch("http://localhost:8000/api/message/all-messages")
      .then((res) => {
        return res.json();
      })
      .then(data => {
        setAllMessages(data);
      });
  } */
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
        <Route
          path="/"
          element={<Home room={room} allMessages={allMessages} setRender={setRender} render={render}/>}
        />
        <Route
          path="/cars"
          element={<Cars room={room} allMessages={allMessages} />}
        />
        <Route
          path="/outerspace"
          element={<OuterSpace room={room} allMessages={allMessages} />}
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
