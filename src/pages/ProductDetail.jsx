import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions';

const ProductDetail = () => {
    const { id } = useParams();
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();

    const product = products.find(p => p.id === Number(id));

    // Check if user is logged in
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const token = localStorage.getItem('token');

    const [quantity, setQuantity] = useState(1);
    const [availableQuantity, setAvailableQuantity] = useState(product ? product.quantity : 0);

    useEffect(() => {
        // Set the available quantity from the product when component mounts
        if (product) {
            setAvailableQuantity(product.quantity);
        }
    }, [product]);

    // Increment quantity
    const handleIncrementQuantity = () => {
        if (quantity < availableQuantity) {
            setQuantity(quantity + 1);
        }
    };

    // Decrement quantity
    const handleDecrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // Add to cart function
    const handleAddToCart = () => {
        if (!token) {
            alert('Please login to add to cart');
            window.location.href = '/login';
            return;
        }

        // Dispatch action to add the product with the specified quantity
        dispatch(addToCart({ ...product, quantity }));

        // Update local storage for available products
        const localProducts = JSON.parse(localStorage.getItem('products')) || [];
        const updatedProducts = localProducts.map(p => {
            if (p.id === product.id) {
                return { ...p, quantity: p.quantity - quantity }; // Deduct the quantity
            }
            return p;
        });
        localStorage.setItem('products', JSON.stringify(updatedProducts));

        alert('Added to cart');
    };

    if (!product) return <div>Product not found</div>;

    return (
        <div className="card">
            <img src={product.image} className="card-img-top" alt={product.title} />
            <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">${product.price}</p>
                <p className="card-text">Available Quantity: {availableQuantity}</p>
                <button className="btn btn-danger me-2" onClick={handleDecrementQuantity}>-</button>
                <span>{quantity}</span>
                <button className="btn btn-primary ms-2" onClick={handleIncrementQuantity}>+</button>
                <br />
                <br />
                <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
                <Link to="/" className="btn btn-secondary ms-2">Back to Home</Link>
            </div>
        </div>
    );
};

export default ProductDetail;
