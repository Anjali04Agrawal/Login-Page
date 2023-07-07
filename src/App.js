import { useEffect } from 'react';
import React, { useState } from 'react';
import './App.css';
import { FaSyncAlt } from 'react-icons/fa';
import profile from './image/profile1.jpeg';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === '123' && userCaptcha === captcha) {
      setLoggedIn(true);
      setErrorMessage('');
    } else if (!username || !password) {
      setErrorMessage('Please enter username and password.');
    } else if (userCaptcha !== captcha) {
      setErrorMessage('Invalid CAPTCHA.');
    } else {
      setLoggedIn(false);
      setErrorMessage('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
    setUserCaptcha('');
  };

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setUserCaptcha('');
  };

  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captcha;
  };

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  if (loggedIn) {
    return (
      <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
        <h1 className="text-center mb-4">Hello, {username}</h1>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <img src={profile} alt="profile" className="profile" />
      <h1 className="text-center mb-4">Login Page</h1>
      <div className="form-group">
        <label className="input-label">Username:</label>
        <input
          className="form-control"
          placeholder="enter your username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      <div className="form-group">
        <label className="input-label">Password:</label>
        <div className="password-input-container">
        <input
          className="form-control password-input"
          placeholder="enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
          </div>
          </div>
        <div className="form-group">
          <label className="input-label">CAPTCHA:</label>
          <div className="captcha-container">
            <span className="captcha">{captcha}</span>
            <div className="refresh-icon" onClick={refreshCaptcha}>
              <FaSyncAlt />
            </div>
          </div>
          <input
            className="form-control"
            placeholder="enter captcha"
            type="text"
            value={userCaptcha}
            onChange={(e) => setUserCaptcha(e.target.value)}
          />
      </div>
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
      <p className="error-message">{errorMessage}</p>
    </div>
    </div>
  );
}

export default App;