import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateMessage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipient, setRecipient] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3002/getMessages/${id}`)
      .then(res => {
        const message = res.data;
        setRecipient(message.recipient);
        setResponse(message.response);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const data = {
          recipient: recipient,
          response: response
        };
    
        await axios.put(`http://localhost:3002/respondToMessage/${id}`, data);
        navigate('/messages');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Reply Commit</h2>
      <form onSubmit={handleSubmit}>
        <label>
          recipient:
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </label>
        <br />
        <label>
          response:
          <input
            type="text"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Reply</button>
      </form>
    </div>
  );
}

export default UpdateMessage;
