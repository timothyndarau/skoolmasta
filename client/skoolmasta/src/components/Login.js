

//       <div className="form signin" onSubmit={handleLogin}>
//         <h2>Sign In</h2>
//         <div className="inputBox">
//           <input type="text" name="username" className="login-username" required="required" />
//           <i className="fa-regular fa-user"></i>
//           <span>username</span>
//         </div>
//         <div className="inputBox">
//           <input type="password" name="password" className="login-password" required="required" />
//           <i className="fa-solid fa-lock"></i>
//           <span>password</span>
//         </div>
//         <div className="inputBox">
//           <input type="submit" value="Login" />
//         </div>
//         <p>Not Registered ? <a href="#" className="create">Create an account</a></p>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', { username, password });
      console.log(response.data); // Handle successful login
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle login error
    }
  };

  useEffect(() => {
    // This effect runs when the component mounts
    // You can perform any initialization tasks here
    console.log('Login component mounted');
    
    // If you need to perform any cleanup when the component unmounts,
    // return a function from the effect
    return () => {
      console.log('Login component unmounted');
      // Perform cleanup tasks here
    };
  }, []); // The empty dependency array ensures this effect runs only once on component mount

  return (
    <div className="container">
      <div className="form signin" onSubmit={handleLogin}>
        <h2>Sign In</h2>
        <div className="inputBox">
          <input
            type="text"
            name="username"
            className="login-username"
            required="required"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <i className="fa-regular fa-user"></i>
          <span>username</span>
        </div>
        <div className="inputBox">
          <input
            type="password"
            name="password"
            className="login-password"
            required="required"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i className="fa-solid fa-lock"></i>
          <span>password</span>
        </div>
        <div className="inputBox">
          <input type="submit" value="Login" />
        </div>
        <p>Not an Admin ? <a href="/signup" className="create">Create an account</a></p>
      </div>
    </div>
  );
};

export default Login;
