import { useContext } from "react";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss";
import { CartContext } from "../../context/cart.context";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
  const { items } = useContext(CartContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/checkout");
  };

  const cartContent =
    items?.length === 0 ? (
      <div className="empty-message">Empty Cart</div>
    ) : (
      <div className="cart-items">
        {items.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
    );
  return (
    <div className="cart-dropdown-container">
      {cartContent}
      <Button
        disabled={items?.length === 0}
        style={{ padding: "0 15px 0 15px" }}
        onClick={onClickHandler}
      >
        GO TO CHECKOUT
      </Button>
    </div>
  );
};

export default CartDropdown;
