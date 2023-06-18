import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function Message() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/getAllMessages')
      .then(result => {
        setMessages(result.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3002/deleteMessage/${id}`)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Messages</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Sender</th>
            <th>Recipient</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {messages.map(message => (
            <tr key={message._id}>
              <td>{message.sender}</td>
              <td>{message.recipient}</td>
              <td>{message.message}</td>
              <td>
                <Link to={`/messages/update/${message._id}`}>Edit</Link> |{' '}
                <button onClick={() => handleDelete(message._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Message;


