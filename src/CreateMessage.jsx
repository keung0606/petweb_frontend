import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateMessage() {
  const navigate = useNavigate();
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3002/sendMessage', {
        sender,
        message
      });
      navigate('/messages');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Message</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Sender Name:
          <input
            type="text"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
          />
        </label>
        <br />
        <label>
          Message:
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateMessage;

