import React, { useState, useEffect } from 'react'
import './Chat.css'

function Home(props) {
  console.log(props.roomMessages)
  console.log(props.room)

  const [ user, setUser ] = useState("")
  const [ body, setBody ] = useState("")
  const [render, setRender] = useState(true)
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    //fetches information from a local API route set up on the server
    async function getData(){
      let res = await fetch(`http://localhost:8000/api/messages/${props.fetchPath}`)
      let data = await res.json();
      setRoomMessages(data)
    }
    getData()
  }, [setRoomMessages, render, props.room]);


async function submitForm(e) {
  e.preventDefault()
  fetch('http://localhost:8000/api/messages/new-message', {
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
    if (render===true){
      setRender(false)
    } else {
      setRender(true)
    }
  }

     
      return (
        <div>
      <table className="message-display">
        <tbody>
        {roomMessages.map((message) => {
          console.log(message.user)
     return (
       <tr key={message._id}>
         <td>date: {message.date.slice(0, 10)}<br/>user name: {message.user}</td>
         <td>{message.body}</td>

        </tr>
     )
        })}
        </tbody>
      </table>
      
      
       <form  method="POST" onSubmit={submitForm}>
         <input type="text" placeholder="username" name="user" onChange={(e) => setUser(e.target.value)}/>
         <input type="text" placeholder="message" name="body" onChange={(e) => setBody(e.target.value)}/>
         <button type="submit">Send</button>
       </form>
     </div>)
    
  
  

  
}

export default Home