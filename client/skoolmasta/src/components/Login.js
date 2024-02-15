// Login.js
import React from 'react';
import axios from 'axios';

const Login = () => {
  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post('/api/login', { username, password });
      console.log(response.data); // Handle successful login
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle login error
    }
  };

  return (
    <div className="container">
      <div className="form signup">
        <h2>Sign Up</h2>
        <div className="inputBox">
          <input type="text" name="username" className="signup-username" required="required" />
          <i className="fa-regular fa-user"></i>
          <span>username</span>
        </div>
        <div className="inputBox">
          <input type="text" name="email" className="signup-email" required="required" />
          <i className="fa-regular fa-envelope"></i>
          <span>email address</span>
        </div>
        <div className="inputBox">
          <input type="password" name="password" className="signup-password" required="required" />
          <i className="fa-solid fa-lock"></i>
          <span>create password</span>
        </div>
        <div className="inputBox">
          <input type="password" name="confirmPassword" className="confirm-password" required="required" />
          <i className="fa-solid fa-lock"></i>
          <span>confirm password</span>
        </div>
        <div className="inputBox">
          <input type="submit" value="Create Account" />
        </div>
        <p>Already a member ? <a href="#" className="login">Log in</a></p>
      </div>

      <div className="form signin" onSubmit={handleLogin}>
        <h2>Sign In</h2>
        <div className="inputBox">
          <input type="text" name="username" className="login-username" required="required" />
          <i className="fa-regular fa-user"></i>
          <span>username</span>
        </div>
        <div className="inputBox">
          <input type="password" name="password" className="login-password" required="required" />
          <i className="fa-solid fa-lock"></i>
          <span>password</span>
        </div>
        <div className="inputBox">
          <input type="submit" value="Login" />
        </div>
        <p>Not Registered ? <a href="#" className="create">Create an account</a></p>
      </div>
    </div>
  );
};

export default Login;
