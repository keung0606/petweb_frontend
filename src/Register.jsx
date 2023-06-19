import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupCode, setSignupCode] = useState('');
  const navigate = useNavigate(); // Access the navigate function

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      username,
      password,
      signupCode,
    };
    // Make an HTTP POST request to the server for registration
    fetch('http://localhost:3002/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <div>
          <label>Sign in code (if you have):</label>
          <input type="text" placeholder="Signup Code" value={signupCode} onChange={(e) => setSignupCode(e.target.value)} />
        </div>
        <button type="submit" className="btn-primary">Register</button>
      </form>
      <Link to="/login" className="btn_add">Login</Link>
    </div>
  );
}

export default Register;

