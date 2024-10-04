// Action Types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_LOGIN = 'SET_LOGIN';
export const SET_LOADING = 'SET_LOADING'; // New action type

// Action creators
export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product,
});

export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId,
});

export const setProducts = (products) => ({
    type: SET_PRODUCTS,
    payload: products,
});

export const setLogin = (status) => ({
    type: SET_LOGIN,
    payload: status,
});

export const setLoading = (status) => ({ // New action creator
    type: SET_LOADING,
    payload: status,
});
