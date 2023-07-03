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

// as the actual value you want to access
export const CartContext = createContext({
  items: [],
  isOpen: false,
  addItemToCart: () => null,
  setIsOpen: () => null,
  totalItemsQty: 0,
});

// as the actual component
export const CartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [totalItemsQty, setTotalItemsQty] = useState(0);

  const addItemToCart = (product) => {
    setItems(addCartItem(items, product));
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

  const value = {
    isOpen,
    setIsOpen,
    items,
    addItemToCart,
    totalItemsQty,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
