import React, { useState, useEffect } from 'react'

function Home(props) {

  const [ user, setUser ] = useState("")
  const [ body, setBody ] = useState("")
  //const [ date, setDate ] = useState("")

async function submitForm(e) {
  e.preventDefault()
  console.log(user)
  console.log(body)
  //console.log(date)
  console.log(props.room)
  fetch('http://localhost:8000/api/message/new-message', {
    headers: {
      //'Accept': 'application/json',
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

export default Home