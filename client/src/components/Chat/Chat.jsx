import React, { useState, useEffect } from "react";
import "./Chat.css";

function Home(props) {

 
  const [user, setUser] = useState("");
  const [body, setBody] = useState("");
  const [render, setRender] = useState(true);
  const [roomMessages, setRoomMessages] = useState([]);

   //fetches information from a local API route set up on the server; fetchPath declared in the router in App.js
  useEffect(() => {
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

  // This gathers the form input when "send" button is clicked and posts the message data to the database
  async function submitForm(e) {
    e.preventDefault();
    e.target.reset(); // clear user input on submit
    fetch("http://localhost:8000/api/messages/new-message", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        user: user, // From the form input
        body: body, // From the form input
        date: new Date(), // The date is generated when form is submitted
        room: props.room, // From the "room" passed in through props from App.js
      }),
    })
      .then(function (res) { // Wait for fetch, then re-render message display
        if (render === true) {
          setRender(false);
        } else {
          setRender(true);
        }
      })
      .catch(function (res) {
      });
  }
  
  // Transforms the date into a user-friendly format
  function getDate(date) {
    const today = new Date(); // Today's date
    const newDate = new Date(date); // Date of message
    let timeFrame = "am";
    let minutes = newDate.getMinutes(); // Formatting for minutes
    if (minutes<10){
      minutes = '0' + minutes;
    } 
    let hours = newDate.getHours(); // Formatting for hours
    if (hours > 12) {
      hours = hours - 12;
      timeFrame = "pm";
    }
    if ( // If the message was submitted today, do not show month/day
      newDate.getDate() === today.getDate() &&
      newDate.getMonth() === today.getMonth()
    ) {
      return `${hours}:${minutes} ${timeFrame}`;
    } 
    else { // If the message was NOT submitted today, show month/day
      let day = `${newDate.getMonth()}/${newDate.getDate()}`;
      return `${day} ${hours}:${minutes} ${timeFrame}`;
    }    
  }

    return (
    <>

    {/* Display the received messages */}
    <div id="message-display">
      <table className="message-display">
        <tbody>
        {/* Map over the messages and display them in a table */}
        {roomMessages.map((message) => {
          return (
            <tr key={message._id}>
              <td>
                    {/* Inline styles for the date and user name */}
                    <span style={{color: "#003049"}}>{getDate(message.date)}</span>
                    <br />
                    <span style={{color: "#335c67"}}>user name: {message.user}</span>
                  </td>
                <td>{message.body}</td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>

    {/* Form for inputing a new message */}
    <div id="message-input">
      <form method="POST" onSubmit={submitForm}>
        <input
          type="text"
          placeholder="username"
          name="user"
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <input
          className="message-input"
          type="text"
          placeholder="message"
          name="body"
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
    </>
  );
}

export default Home;
