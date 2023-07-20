import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import "./navigation.styles.scss";
import { signOutUser } from "../../utils/firebase.utils";
import { CartContext } from "../../context/cart.context";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { isOpen, setIsOpen } = useContext(CartContext);

  return (
    <>
      <div
        className="navigation"
        onClick={() => {
          if (isOpen) setIsOpen(false);
        }}
      >
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
