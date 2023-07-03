import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";
import { CartContext } from "../../context/cart.context";

const CartIcon = () => {
  const { isOpen, setIsOpen, totalItemsQty } = useContext(CartContext);
  return (
    <div className="cart-icon-container" onClick={() => setIsOpen(!isOpen)}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{totalItemsQty}</span>
    </div>
  );
};

export default CartIcon;
