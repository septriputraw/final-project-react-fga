import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../redux/actions';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    // cek jika user sudah login
    // jika sudah login, redirect ke home page
    // jika belum login, tampilkan form login
    const isLoggedIn = localStorage.getItem('token');
    const loginState = useSelector(state => state.isLoggedIn);
    if (isLoggedIn) {
        window.location.href = '/';
    }

    // api call to login fakestoreapi
    const login = async () => {
        try {
            const response = await axios.post('https://fakestoreapi.com/auth/login', {
                username,
                password
            });
            // console.log('====================================');
            // console.log('Login response:', response.data);
            // console.log('====================================');
            // save token to local storage
            localStorage.setItem('token', response.data.token);
            dispatch(setLogin(true));
            // redirect to home page
            window.location.href = '/';
        } catch (error) {
            console.error("Error logging in:", error);
        }
    }

    const handleLogin = (e) => {
        e.preventDefault();
        // Basic validation (can be enhanced)
        if (username === '' || password === '') {
            alert('Please enter username and password');
            return;
        }
        login();
    };

    return (
        <div className="w-50 mx-auto mt-5">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;
