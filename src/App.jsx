import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setLoading } from './redux/actions';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import axios from 'axios';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            dispatch(setLoading(true)); // Set loading to true
            try {
                const response = await axios.get('https://fakestoreapi.com/products?limit=20'); // Fetch at least 20 products
                dispatch(setProducts(response.data));
                localStorage.setItem('products', JSON.stringify(response.data));
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                dispatch(setLoading(false)); // Set loading to false
            }
        };

        const localProducts = JSON.parse(localStorage.getItem('products'));
        if (localProducts) {
            dispatch(setProducts(localProducts));
        } else {
            fetchProducts();
        }
    }, [dispatch]);

    return (
        <Router>
            <Navbar />
            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
