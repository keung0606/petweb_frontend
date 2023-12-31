import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3002/auth/google';
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3002/login', {
        username: username,
        password: password,
      })
      .then((response) => {
        const { success, userStatus, id } = response.data;
        if (success) {
          if (userStatus === 1) {
            navigate('/viewCats', { state: { id } });
          } else if (userStatus === 0) {
            navigate('/');
          } else {
            setError('Invalid username or password');
          }
        } else {
          setError('Invalid username or password');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div class="container">
      <h2 class="title">Login</h2>
      <form onSubmit={handleSubmit} class="from_login">
        <div class="from_login2">
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        {error && <div>{error}</div>}
        <button type="submit" class="btn-primary">Login</button>
        <br />
        <Link to="/register" class="btn_add">Sign up for an Account</Link>
      </form>
    </div>
  );
}

export default Login;

