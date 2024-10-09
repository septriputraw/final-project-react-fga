import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SET_PRODUCTS,
    SET_LOGIN,
    SET_LOADING,
    GET_CART,
    CLEAR_CART,
    ADD_QUANTITY,
    SUBTRACT_QUANTITY,
    UPDATE_CART_QUANTITY,
    CHECKOUT_CART,
} from './actions';

const initialState = {
    products: [],
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    isLoggedIn: !!localStorage.getItem('token'),
    isLoading: false,
};

// Helper function to save cart to localStorage
const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

// Helper function to update cart in localStorage and return new state
const updateCartState = (state, newCart) => {
    saveCartToLocalStorage(newCart);
    return {
        ...state,
        cart: newCart,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, isLoading: action.payload };

        case SET_PRODUCTS:
            return { ...state, products: action.payload, isLoading: false };

        case ADD_TO_CART: {
            const existingProduct = state.cart.find(item => item.id === action.payload.id);
            const newCart = existingProduct 
                ? state.cart.map(item => 
                    item.id === action.payload.id 
                        ? { ...item, quantity: item.quantity + 1 } 
                        : item
                )
                : [...state.cart, { ...action.payload, quantity: 1 }];

            return updateCartState(state, newCart);
        }

        case UPDATE_CART_QUANTITY: {
            const newCart = state.cart.map(item =>
                item.id === action.payload.id
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
            return updateCartState(state, newCart);
        }

        case GET_CART:
            return { ...state, cart: action.payload };

        case REMOVE_FROM_CART: {
            const newCart = state.cart.filter(item => item.id !== action.payload);
            return updateCartState(state, newCart);
        }

        case SET_LOGIN:
            return { ...state, isLoggedIn: action.payload };

        case ADD_QUANTITY: {
            const newCart = state.cart.map(item => 
                item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
            );
            return updateCartState(state, newCart);
        }

        case SUBTRACT_QUANTITY: {
            const newCart = state.cart.map(item => 
                item.id === action.payload && item.quantity > 1 
                    ? { ...item, quantity: item.quantity - 1 } 
                    : item
            );
            return updateCartState(state, newCart);
        }

        case CLEAR_CART:
            saveCartToLocalStorage([]); // Clear localStorage
            return { ...state, cart: [] }; // Reset cart state

        case CHECKOUT_CART:
            return { ...state, products: action.payload, cart: [] }; // Empty cart after checkout

        default:
            return state;
    }
};

export default reducer;
