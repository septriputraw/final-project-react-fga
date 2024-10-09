import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Placeholder } from 'react-bootstrap'; // Import Placeholder from react-bootstrap
import { addToCart, setProducts } from '../redux/actions';

const HomePage = () => {
    const products = useSelector(state => state.products); // Get products from redux
    const isLoading = useSelector(state => state.isLoading); // Get loading state
    const isLoggedIn = useSelector(state => state.isLoggedIn); // Get logged-in state
    const cart = useSelector(state => state.cart); // Get cart from redux
    const dispatch = useDispatch();

    // Get products from Redux
    

    // console.log('Products from Redux:', products);
    
    // Check if token exists in localStorage to confirm login
    const token = localStorage.getItem('token');

    // Skeleton loader (Placeholder) for loading state
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

    // Handle adding products to cart
    const handleAddToCart = (product) => {
        if (!token) {
            // Redirect to login if user is not logged in
            alert('Please login to add to cart');
            window.location.href = '/login';
        } else {
            // Get the current cart from Redux and localStorage
            const cartInLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProduct = cartInLocalStorage.find(item => item.id === product.id);
    
            if (existingProduct) {
                // Product already in cart, increase the quantity
                existingProduct.quantity += 1;
            } else {
                // Product not in cart, add new product with quantity 1
                cartInLocalStorage.push({ ...product, quantity: 1 });
            }
    
            // Update localStorage with the new cart data
            localStorage.setItem('cart', JSON.stringify(cartInLocalStorage));
    
            // Dispatch Redux action to update the cart state
            dispatch(addToCart({ ...product, quantity: (existingProduct ? existingProduct.quantity : 1) }));
    
            alert('Added to cart');
        }
    };    

    useEffect(() => {
        let storedProducts = JSON.parse(localStorage.getItem('products'));
        // console.log('====================================');
        // console.log('Stored products:', storedProducts);
        // console.log('====================================');

        if (!storedProducts) {
            // If no products in localStorage, fetch from API
            console.log('====================================');
            console.log('Fetching products from API');
            console.log('====================================');
            fetch('https://fakestoreapi.com/products')
                .then(res => res.json())
                .then(data => {
                    dispatch(setProducts(data));
                    localStorage.setItem('products', JSON.stringify(data)); // Save to localStorage
                })
                .catch(error => console.error('Failed to fetch products:', error));
        } else {
            // If products are in localStorage, set them in Redux
            console.log('====================================');
            console.log('Setting products from localStorage');
            console.log('====================================');
            dispatch(setProducts(storedProducts));
        }
    }, [dispatch]);

    // Handle displaying loading skeleton if data is still loading
    if (isLoading || !products) {
        return skeletonLoader;
    }

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
                            {/* Show product quantity */}
                            <Card.Text>Quantity: {product.quantity}</Card.Text>
                            {/* Add to Cart and View Details buttons */}
                            <div className="d-flex justify-content-between">
                                <button className="btn btn-secondary" onClick={() => handleAddToCart(product)}>Add to Cart</button>
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
