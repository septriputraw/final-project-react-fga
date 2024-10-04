import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/actions';

const Cart = () => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    // cek jika user sudah login
    // jika sudah login, tampilkan cart
    // jika belum login, tampilkan pesan "Please login to view cart"
    // jika cart kosong, tampilkan pesan "Your cart is empty"
    // jika cart tidak kosong, tampilkan list cart
    // setiap item di cart harus ada tombol remove
    // ketika tombol remove ditekan, item tersebut dihapus

    const isLoggedIn = useSelector(state => state.isLoggedIn);

    // get token from local storage
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login';
    }

    // jika ada token, tapi user belum login, redirect ke halaman login
    // if (!isLoggedIn
    //     && token) {
    //     window.location.href = '/login';
    // }

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    };

    return (
        <div>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul className="list-group">
                    {cart.map(item => (
                        <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                            {item.title} - ${item.price} (x{item.quantity})
                            <button className="btn btn-danger" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;
