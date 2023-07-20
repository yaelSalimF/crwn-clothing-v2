import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartCount,
  selectCartIsOpen,
} from "../../store/cart/cart.selector";
import { setIsOpen } from "../../store/cart/cart.action";

const CartIcon = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectCartIsOpen);
  const totalItemsQty = useSelector(selectCartCount);
  const toggleIsCartOpen = () => dispatch(setIsOpen(!isOpen));

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{totalItemsQty}</span>
    </div>
  );
};

export default CartIcon;
