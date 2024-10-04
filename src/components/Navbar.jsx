import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const cart = useSelector(state => state.cart);
    const isLoggedIn = useSelector(state => state.isLoggedIn);

    // jika sudah ada token dan sudah login, tambahkan tombol logout
    const token = localStorage.getItem('token');

    // handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };
    

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">E-commerce</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">Cart ({cart.length})</Link>
                        </li>
                    </ul>
                    {/* <Link className="btn btn-outline-primary" to="/login">{token ? 'Logout' : 'Login'}</Link> */}
                    {token ? (
                        <button className="btn btn-outline-primary" onClick={handleLogout}>Logout</button>
                    ) : (
                        <Link className="btn btn-outline-primary" to="/login">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
