import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, addQuantity, subtractQuantity, checkoutCart } from '../redux/actions';

const Cart = () => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleAddQuantity = (productId) => {
        dispatch(addQuantity(productId));
    };

    const handleSubtractQuantity = (productId) => {
        dispatch(subtractQuantity(productId));
    };

    const handleCheckout = () => {
        dispatch(checkoutCart());
        alert('Checkout successful!');
        // Uncomment the next line to redirect after checkout
        // window.location.href = '/';
    };

    return (
        <div>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="row">
                    {cart.map(item => (
                        <div className="col-md-4 mb-3" key={item.id}>
                            <div className="card">
                                <img src={item.image} className="card-img-top" alt={item.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">${item.price}</p>
                                    <div className="d-flex align-items-center">
                                        <button className="btn btn-danger me-2" onClick={() => handleSubtractQuantity(item.id)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button className="btn btn-primary ms-2" onClick={() => handleAddQuantity(item.id)}>+</button>
                                    </div>
                                    <p className="card-text mt-2">Total: ${item.price * item.quantity}</p>
                                    <button className="btn btn-danger" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="col-md-12">
                        <h4>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h4>
                        <button className="btn btn-primary" onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
