// Action Types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_LOGIN = 'SET_LOGIN';
export const SET_LOADING = 'SET_LOADING'; // New action type
export const GET_CART = 'GET_CART';
export const CLEAR_CART = 'CLEAR_CART';

// tambah quantity pada product
export const ADD_QUANTITY = 'ADD_QUANTITY';
export const SUBTRACT_QUANTITY = 'SUBTRACT_QUANTITY';
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';

// Action creators
export const CHECKOUT_CART = 'CHECKOUT_CART';

export const checkoutCart = () => (dispatch, getState) => {
    const { cart, products } = getState();
    
    // Kurangi kuantitas produk di store berdasarkan isi keranjang
    const updatedProducts = products.map(product => {
        const cartItem = cart.find(item => item.id === product.id);
        // console.log('====================================');
        // console.log('cartItem :>> ', cartItem);
        // console.log('====================================');
        if (cartItem) {
            return {
                ...product,
                quantity: product.quantity - cartItem.quantity // Kurangi kuantitas produk
            };
        }
        return product;
    });
    // console.log('====================================');
    // console.log(updatedProducts);
    // console.log('====================================');
    // Simpan produk yang diperbarui ke localStorage
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Kosongkan keranjang setelah checkout
    localStorage.removeItem('cart');
    
    // Dispatch action untuk mengupdate Redux store
    dispatch({ type: CHECKOUT_CART, payload: updatedProducts });
};

export const addQuantity = (productId) => ({
    type: ADD_QUANTITY,
    payload: productId,
});

export const subtractQuantity = (productId) => ({
    type: SUBTRACT_QUANTITY,
    payload: productId,
});

export const clearCart = () => ({
    type: CLEAR_CART,
});

// Action creators
export const addToCart = (product) => (dispatch, getState) => {
    const cart = getState().cart;
    
    // Check if the product already exists in the cart
    const existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
        // If it exists, increase the quantity
        dispatch({
            type: 'UPDATE_CART_QUANTITY',
            payload: { ...existingProduct, quantity: existingProduct.quantity + 1 }
        });
    } else {
        // If it doesn't exist, add it to the cart
        dispatch({
            type: 'ADD_TO_CART',
            payload: { ...product, quantity: 1 }
        });
    }
};


export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId,
});

export const setProducts = (products) => ({
    type: SET_PRODUCTS,
    // payload: products,
    payload: products.map(product => ({ ...product, quantity: 20 })),
});

// get cart
export const getCart = (cart) => ({
    type: GET_CART,
    payload: cart,
});

export const setLogin = (status) => ({
    type: SET_LOGIN,
    payload: status,
});

export const setLoading = (status) => ({ // New action creator
    type: SET_LOADING,
    payload: status,
});
