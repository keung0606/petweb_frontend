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
            <th>Message(Enter Personal info, Address, Phone)</th>
            <th>Recipient</th>
            <th>Response</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {messages.map(message => (
            <tr key={message._id}>
              <td>{message.sender}</td>
              <td>{message.message}</td>
              <td>{message.recipient}</td>
              <td>{message.response}</td>
              <td>
                <Link to={`/updateMessage/${message._id}`} className="btn_add">Reply Message</Link> |{' '}
                <button onClick={() => handleDelete(message._id)} >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/" className="btn_add">Last Page</Link>
    </div>
  );
}

export default Message;


