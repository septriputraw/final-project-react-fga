import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SET_PRODUCTS,
    SET_LOGIN,
    SET_LOADING, // New action type
} from './actions';

const initialState = {
    products: [],
    cart: [],
    isLoggedIn: false,
    isLoading: false, // New loading state
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, isLoading: action.payload }; // Handle loading state
        case SET_PRODUCTS:
            return { ...state, products: action.payload, isLoading: false }; // Set products and stop loading
        case ADD_TO_CART:
            { const existingItem = state.cart.find(item => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    cart: state.cart.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            }
            return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] }; }
        case REMOVE_FROM_CART:
            return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
        case SET_LOGIN:
            return { ...state, isLoggedIn: action.payload };
        default:
            return state;
    }
};

export default reducer;
