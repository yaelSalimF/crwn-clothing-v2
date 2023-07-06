import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
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

// as the actual component
export const CartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [totalItemsQty, setTotalItemsQty] = useState(0);
  const [totalItemsAmount, setTotalItemsAmount] = useState(0);

  const addItemToCart = (product) => {
    setItems(addCartItem(items, product));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setItems(removeCartItem(items, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToRemoveId) => {
    setItems(clearCartItem(items, cartItemToRemoveId));
  };

  useEffect(() => {
    if (items && items.length > 0) {
      const newCartCount = items.reduce(
        (total, cartItem) => total + cartItem.quantity,
        0
      );
      setTotalItemsQty(newCartCount);
    }
  }, [items]);

  useEffect(() => {
    if (items && items.length > 0) {
      const newCartAmount = items.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0
      );
      setTotalItemsAmount(newCartAmount);
    }
  }, [items]);

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
