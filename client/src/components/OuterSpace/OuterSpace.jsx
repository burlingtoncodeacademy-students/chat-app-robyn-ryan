import React, { useState, useEffect } from "react";

function OuterSpace(props) {
  const [ user, setUser ] = useState("")
  const [ body, setBody ] = useState("")

async function submitForm(e) {
  e.preventDefault()
  console.log(user)
  console.log(body)
  console.log(props.room)
  fetch('http://localhost:8000/api/message/new-message', {
    headers: {
      'Content-Type': 'application/json'
    },
      method: "POST",
      body: JSON.stringify({
        user: user,
        body: body,
        date: new Date(),
        room: props.room
      })
    })
    .then(function(res){ console.log(res) })
    .catch(function(res){ console.log(res) })
  }


  return (
    <div>
      <form  method="POST" onSubmit={submitForm}>
        <input type="text" placeholder="username" name="user" onChange={(e) => setUser(e.target.value)}/>
        <input type="text" placeholder="message" name="body" onChange={(e) => setBody(e.target.value)}/>
        <input type="submit" />
      </form>
    </div>
  )
}

export default OuterSpace