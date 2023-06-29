import { createContext, useState } from "react";

// as the actual value you want to access
export const CartContext = createContext({
  items: [],
  isOpen: false,
  setItems: () => null,
  setIsOpen: () => null,
});

// as the actual component
export const CartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const value = { isOpen, setIsOpen };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
