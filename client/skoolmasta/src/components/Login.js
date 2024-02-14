// login.js

document.addEventListener("DOMContentLoaded", function () {
    // Step 1: Add event listeners to toggle between login and create account forms
    let login = document.querySelector(".login");
    let create = document.querySelector(".create");
    let container = document.querySelector(".container");
  
    login.onclick = function () {
      container.classList.add("signinForm");
    };
  
    create.onclick = function () {
      container.classList.remove("signinForm");
    };
  
    // Step 2: Form validation for sign-up
    function validateSignupForm() {
      let password = document.querySelector(".signup-password").value;
      let confirmPassword = document.querySelector(".confirm-password").value;
  
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return false;
      }
      return true;
    }
  
    // Step 3: Form validation for login
    function validateLoginForm() {
      let username = document.querySelector(".login-username").value;
      let password = document.querySelector(".login-password").value;
  
      // Perform any additional validation if needed
  
      return true;
    }
  
    // Step 4: Add event listeners for form submissions
    document.querySelector(".signup-form").addEventListener("submit", function (event) {
      if (!validateSignupForm()) {
        event.preventDefault(); // Prevent form submission if validation fails
      }
    });
  
    document.querySelector(".login-form").addEventListener("submit", function (event) {
      if (!validateLoginForm()) {
        event.preventDefault(); // Prevent form submission if validation fails
      }
    });
  
    // Step 5: Append the provided HTML code to the document's body
    document.body.innerHTML += 
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
    ;
  });
  