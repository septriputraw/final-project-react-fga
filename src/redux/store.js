import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

// Function to load cart from localStorage
const loadCartFromLocalStorage = () => {
    try {
        const serializedCart = localStorage.getItem('cart');
        if (serializedCart === null) {
            return undefined; // No cart data in localStorage
        }
        return JSON.parse(serializedCart);
    } catch (err) {
        console.error('Could not load cart from localStorage', err);
        return undefined;
    }
};

// Function to save cart to localStorage
const saveCartToLocalStorage = (cart) => {
    try {
        const serializedCart = JSON.stringify(cart);
        localStorage.setItem('cart', serializedCart);
    } catch (err) {
        console.error('Could not save cart to localStorage', err);
    }
};

// Function to load products from localStorage
const loadProductsFromLocalStorage = () => {
    try {
        const serializedProducts = localStorage.getItem('products');
        if (serializedProducts === null) {
            return []; // No product data in localStorage
        }
        return JSON.parse(serializedProducts);
    } catch (err) {
        console.error('Could not load products from localStorage', err);
        return [];
    }
};

// Function to save products to localStorage
const saveProductsToLocalStorage = (products) => {
    try {
        const serializedProducts = JSON.stringify(products);
        localStorage.setItem('products', serializedProducts);
    } catch (err) {
        console.error('Could not save products to localStorage', err);
    }
};

// Preloaded state including the products and cart from localStorage
const preloadedState = {
    cart: loadCartFromLocalStorage() || [], // Load cart from localStorage
    products: loadProductsFromLocalStorage(), // Load products from localStorage
    isLoggedIn: !!localStorage.getItem('token'),
    isLoading: false,
};

// Create the store with preloaded state
const store = configureStore({
    reducer,
    preloadedState, // Preload the products and cart state from localStorage
});

// Subscribe to store changes to save cart and products to localStorage
store.subscribe(() => {
    const state = store.getState();
    saveCartToLocalStorage(state.cart); // Save cart to localStorage
    saveProductsToLocalStorage(state.products); // Save products to localStorage
});

export default store;
