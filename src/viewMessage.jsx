import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function ViewMessage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/getAllMessages')
      .then(result => {
        setMessages(result.data);
      })
      .catch(err => console.log(err));
  }, []);


  return (
    <div>
      <h2>Send us a message you're interested any cats</h2>
      <Link to="/sendMessage" className="btn_add">Send Message</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Sender</th>
            <th>Message</th>
            <th>Recipient</th>
            <th>Response</th>
          </tr>
        </thead>
        <tbody>
          {messages.map(message => (
            <tr key={message._id}>
              <td>{message.sender}</td>
              <td>{message.message}</td>
              <td>{message.recipient}</td>
              <td>{message.response}</td>
            </tr>
          ))}
        </tbody>
        <Link to="/viewCats" className="btn_add">Last Page</Link>
      </table>
    </div>
  );
}

export default ViewMessage;