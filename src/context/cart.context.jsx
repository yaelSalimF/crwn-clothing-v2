import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.util";

const addCartItem = (cartItems, productToAdd) => {
  if (cartItems && cartItems.length > 0) {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productToAdd.id
    );

    if (existingCartItem) {
      return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};
const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToRemoveId) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemoveId);
};

// as the actual value you want to access
export const CartContext = createContext({
  items: [],
  isOpen: false,
  addItemToCart: () => null,
  removeItemFromCart: () => null,
  clearItemFromCart: () => null,
  setIsOpen: () => null,
  totalItemsQty: 0,
  totalItemsAmount: 0,
});

//actions
export const CART_ACTION_TYPES = {
  SET_CART_IS_OPEN: "SET_CART_IS_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_IS_OPEN:
      return {
        ...state,
        isOpen: payload,
      };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  items: [],
  isOpen: false,
  totalItemsQty: 0,
  totalItemsAmount: 0,
};

// as the actual component
export const CartProvider = ({ children }) => {
  const [{ items, isOpen, totalItemsAmount, totalItemsQty }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartAmount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        items: newCartItems,
        totalItemsQty: newCartCount,
        totalItemsAmount: newCartAmount,
      })
    );
  };

  const setIsOpen = (toggleVal) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_IS_OPEN, toggleVal));
  };

  const addItemToCart = (product) => {
    const newCartItems = addCartItem(items, product);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(items, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToRemoveId) => {
    const newCartItems = clearCartItem(items, cartItemToRemoveId);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    isOpen,
    setIsOpen,
    items,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    totalItemsQty,
    totalItemsAmount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
