import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions';

const ProductDetail = () => {
    const { id } = useParams();
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();

    const product = products.find(p => p.id === Number(id));

    // add to cart only if user is logged in
    const isLoggedIn = useSelector(state => state.isLoggedIn);

    const handleAddToCart = () => {
        if (!isLoggedIn) {
            return (
                alert('Please login to add to cart')
            );
        }
        dispatch(addToCart(product));
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
                <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
                <Link to="/" className="btn btn-secondary ms-2">Back to Home</Link>
            </div>
        </div>
    );
};

export default ProductDetail;
