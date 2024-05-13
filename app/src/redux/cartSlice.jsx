import { createSlice } from '@reduxjs/toolkit'
const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.push(action.payload)
        },
        deleteFromCart(state, action) {
            const indexToDelete = state.findIndex(item => item.id === action.payload.id);
            if (indexToDelete !== -1) {
                const newState = [...state];
                newState.splice(indexToDelete, 1); 
                return newState;
            }
            return state;
        }
    }
})

export const { addToCart, deleteFromCart } = cartSlice.actions

export default cartSlice.reducer;
