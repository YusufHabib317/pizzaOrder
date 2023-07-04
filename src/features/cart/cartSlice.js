import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      //   state.cart = state.cart.push(action.payload);
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearItem(state, action) {
      state.cart = [];
    },
  },
});

export const username = (state) => state.user.username;

export const {
  addItem,
  clearItem,
  decreaseItemQuantity,
  increaseItemQuantity,
  deleteItem,
} = cartSlice.actions;

export const getCart = (state) => state.cart.cart;

export const getTotalItemsQuantities = (state) =>
  state.cart.cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

export const getTotalItemsPrice = (state) =>
  state.cart.cart.reduce((sum, item) => {
    return sum + item.totalPrice;
  }, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

export default cartSlice.reducer;
