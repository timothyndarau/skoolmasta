import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/signup', { username, password, email });
      console.log(response.data); // Handle successful sign-up
      setFormData({ username, password, email });
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle sign-up error
    }
  };

  useEffect(() => {
    console.log('SignUp component mounted maradda');
    
    return () => {
      console.log('SignUp component unmounted radda');
      // Perform cleanup tasks here if needed
    };
  }, []);

  return (
    <div className="container">
      <div className="form signup">
        <h2>Sign Up</h2>
        <div className="inputBox">
          <input
            type="text"
            name="username"
            className="signup-username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <i className="fa-regular fa-user"></i>
          <span>username</span>
        </div>
        <div className="inputBox">
          <input
            type="text"
            name="email"
            className="signup-email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <i className="fa-regular fa-envelope"></i>
          <span>email address</span>
        </div>
        <div className="inputBox">
          <input
            type="password"
            name="password"
            className="signup-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i className="fa-solid fa-lock"></i>
          <span>create password</span>
        </div>
        <div className="inputBox">
          <input
            type="password"
            name="confirmPassword"
            className="confirm-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <i className="fa-solid fa-lock"></i>
          <span>confirm password</span>
        </div>
        <div className="inputBox">
          <input type="submit" value="Create Account" onClick={handleSignup} />
        </div>
        <p>Already an Admin ? <a href="/login" className="login">Log in</a></p>
      </div>
    </div>
  );
};

export default SignUp;