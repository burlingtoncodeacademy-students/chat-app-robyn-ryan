import React, { useState, useEffect } from "react";
import "./Chat.css";

function Home(props) {
  console.log(props.fetchPath);
  const [user, setUser] = useState("");
  const [body, setBody] = useState("");
  const [render, setRender] = useState(true);
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    //fetches information from a local API route set up on the server; fetchPath declared in the router in App.js
    async function getData() {
      let res = await fetch(
        `http://localhost:8000/api/messages/${props.fetchPath}`
      );
      let data = await res.json();
      setRoomMessages(data);
    }
    getData();
  }, [render, props.fetchPath]);

  

  //fetchPath is the only 'stable' room-based variable; to avoid resetting header and room on refresh, attach them to fetchPath, which is attached to the page's path
  if (props.fetchPath === "cars") {
    props.setRoom("cars");
    props.setRoomName("Car Talk");
  } else if (props.fetchPath === "outerspace") {
    props.setRoom("outerspace");
    props.setRoomName("Outer Space");
  } else {
    props.setRoom("main");
    props.setRoomName("Main");
  }

  async function submitForm(e) {
    e.preventDefault();
    e.target.reset();
    // clear user input on submit
    fetch("http://localhost:8000/api/messages/new-message", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        user: user,
        body: body,
        date: new Date(),
        room: props.room,
      }),
    })
      .then(function (res) {
        //WAIT for fetch, then re-render
        if (render === true) {
          setRender(false);
        } else {
          setRender(true);
        }
      })
      .catch(function (res) {
        console.log(res);
      });
  }
  

  function getDate(date) {
    const today = new Date();
    const newDate = new Date(date);
    let timeFrame = "am";
    let minutes = newDate.getMinutes();
    if (minutes<10){
      minutes = '0' + minutes;
    } 
    let hours = newDate.getHours();
    if (hours > 12) {
      hours = hours - 12;
      timeFrame = "pm";
    }
    if (
      newDate.getDate() === today.getDate() &&
      newDate.getMonth() === today.getMonth()
    ) {
      return `${hours}:${minutes} ${timeFrame}`;
    } else {
      let day = `${newDate.getMonth()}/${newDate.getDate()}`;
      return `${day} ${hours}:${minutes} ${timeFrame}`;
    }
    
  }

  return (
    <div>
      <table className="message-display">
        <tbody>
          {roomMessages.map((message) => {
            return (
              <tr key={message._id}>
                <td>
                  {getDate(message.date)}
                  <br />
                  user name: {message.user}
                </td>
                <td>{message.body}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <form method="POST" onSubmit={submitForm}>
        <input
          type="text"
          placeholder="username"
          name="user"
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="text"
          placeholder="message"
          name="body"
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Home;
