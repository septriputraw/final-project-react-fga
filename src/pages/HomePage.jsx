import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, Placeholder } from 'react-bootstrap'; // Import Placeholder from react-bootstrap
import { addToCart } from '../redux/actions';

const HomePage = () => {
    const products = useSelector(state => state.products);
    const isLoading = useSelector(state => state.isLoading); // Get loading state
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const dispatch = useDispatch();

    // get product id from product 
    const { id } = useParams();
    const product = products.find(p => p.id === Number(id));
    

    // cek apakah user sudah login
    const token = localStorage.getItem('token');

    // Create skeleton loading placeholders
    const skeletonLoader = (
        <div className="row">
            {[...Array(8)].map((_, index) => (
                <div className="col-md-3 mb-3" key={index}>
                    <Card>
                        <Placeholder xs={12} style={{ height: '200px' }} /> {/* Placeholder for image */}
                        <Card.Body>
                            <Placeholder xs={6} style={{ height: '20px' }} /> {/* Placeholder for title */}
                            <Placeholder xs={4} style={{ height: '20px' }} /> {/* Placeholder for price */}
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    );

    if (isLoading) {
        return skeletonLoader; // Show skeleton loaders while loading
    }

    const handleAddToCart = () => {
        if (!token) {
            return (
                alert('Please login to add to cart', window.location.href = '/login')
            );
        }
        dispatch(addToCart(product));
        alert('Added to cart');
    };

    return (
        <div className="row">
            {products.map(product => (
                <div className="col-md-3 mb-4" key={product.id}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={product.image} alt={product.title} style={{ height: '200px', objectFit: 'cover' }} />
                        <Card.Body className="d-flex flex-column justify-content-between">
                            <Card.Title style={{ fontSize: '1rem' }} className="text-truncate">
                                {product.title}
                            </Card.Title>
                            <Card.Text>${product.price}</Card.Text>
                            <div className="d-flex justify-content-between">
                                <button className="btn btn-secondary" onClick={handleAddToCart}>Add to Cart</button>
                                <Link to={`/product/${product.id}`} className="btn btn-primary">View Details</Link>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default HomePage;
