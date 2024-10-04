import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Placeholder } from 'react-bootstrap'; // Import Placeholder from react-bootstrap

const HomePage = () => {
    const products = useSelector(state => state.products);
    const isLoading = useSelector(state => state.isLoading); // Get loading state

    // Create skeleton loading placeholders
    const skeletonLoader = (
        <div className="row">
            {[...Array(6)].map((_, index) => (
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

    return (
        <div className="row">
            {products.map(product => (
                <div className="col-md-3 mb-3" key={product.id}>
                    <Card>
                        <Card.Img variant="top" src={product.image} alt={product.title} />
                        <Card.Body>
                            <Card.Title>{product.title}</Card.Title>
                            <Card.Text>${product.price}</Card.Text>
                            <Link to={`/product/${product.id}`} className="btn btn-primary">View Details</Link>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default HomePage;
