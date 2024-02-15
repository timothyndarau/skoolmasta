// login.js
import React from 'react';

function Login() {
  return (
      <div class="container">
        <div class="form signup">
          <h2>Sign Up</h2>
          <div class="inputBox">
            <input type="text" class="signup-username" required="required" />
            <i class="fa-regular fa-user"></i>
            <span>username</span>
          </div>
          <div class="inputBox">
            <input type="text" class="signup-email" required="required" />
            <i class="fa-regular fa-envelope"></i>
            <span>email address</span>
          </div>
          <div class="inputBox">
            <input type="password" class="signup-password" required="required" />
            <i class="fa-solid fa-lock"></i>
            <span>create password</span>
          </div>
          <div class="inputBox">
            <input type="password" class="confirm-password" required="required" />
            <i class="fa-solid fa-lock"></i>
            <span>confirm password</span>
          </div>
          <div class="inputBox">
            <input type="submit" value="Create Account" />
          </div>
          <p>Already a member ? <a href="#" class="login">Log in</a></p>
        </div>
  
        <div class="form signin">
          <h2>Sign In</h2>
          <div class="inputBox">
            <input type="text" class="login-username" required="required" />
            <i class="fa-regular fa-user"></i>
            <span>username</span>
          </div>
          <div class="inputBox">
            <input type="password" class="login-password" required="required" />
            <i class="fa-solid fa-lock"></i>
            <span>password</span>
          </div>
          <div class="inputBox">
            <input type="submit" value="Login" />
          </div>
          <p>Not Registered ? <a href="#" class="create">Create an account</a></p>
        </div>
      </div>
    );
}
export default Login;
