import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
// import Login from './Login';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// // const isLoggedIn = localStorage.getItem('isLoggedIn');
// // const userId = localStorage.getItem('userId');

// root.render(
//   <React.StrictMode>
//     {/* <Router>
//       <Routes>
//         <Route path="/" element={isLoggedIn ? <App userId={userId} /> : <Login />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router> */}
//     <App />
//   </React.StrictMode>

// );


createRoot(document.getElementById('root')).render(<App />)