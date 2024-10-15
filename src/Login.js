import React, { useState } from 'react';
import { useUser } from './UserContext';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation for demo purposes
    if (username === 'admin' && password === 'admin123') {
      login(username); // Call the login function from UserContext
      navigate('/dashboard'); // Redirect to dashboard on successful login
    } else {
      alert('Invalid credentials');
    }
  };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true); // Set loading to true before the API call

//     try {
//         const response = await fetch('http://localhost:3002/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 username: username,
//                 password: password,
//             }),
//         });

//         const data = await response.json(); // Always parse the response, even on error

//         if (!response.ok) {
//             throw new Error(data.error || 'Network response was not ok');
//         }

//         if (data.success) {
//             login(username);
//             navigate('/dashboard');
//         } else {
//             alert(data.error || 'Invalid credentials');
//         }
//     } catch (error) {
//         console.error('Error during login:', error);
//         alert(`An error occurred: ${error.message}`); // Include error message for debugging
//     } finally {
//         setIsLoading(false); // Reset loading state regardless of success or failure
//     }
// };

  
//   In your return statement for the component
 

  return (
    
    <div className='login-page'>
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
    </div>
  );
}

export default Login;
