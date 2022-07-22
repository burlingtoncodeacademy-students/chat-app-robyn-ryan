import React, { useState, useEffect } from 'react'

function Home(props) {
  console.log(props.allMessages)
  console.log(props.room)

  const [ user, setUser ] = useState("")
  const [ body, setBody ] = useState("")
  


async function submitForm(e) {
  e.preventDefault()
  console.log(props.render)
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
    if (props.render===true){
      props.setRender(false)
    } else {
      props.setRender(true)
    }
  }

     
      return (
        <div>
      <table className="message-display">
        <tbody>
        {props.allMessages.map((message) => {
          console.log(message.user)
     return (
       <tr key={message._id}>
         <td>{message.user}</td>
         <td>{message.date}</td>
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