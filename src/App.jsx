// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import './App.css';

const App = () => {
    return (
        <UserProvider>
            <Router>
                <header style={{display: 'flex', justifyContent: 'center'}}>
                    <h1>Shibui Data Dashboard</h1> {/* Title or branding */}
                </header>
                <main className='display-container'>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/" element={<Login />} /> {/* Redirect to login by default */}
                    </Routes>
                </main>
                <footer>
                    <p>&copy; 2024 Shibui</p> {/* Footer content */}
                </footer>
            </Router>
        </UserProvider>
    );
};

export default App;
