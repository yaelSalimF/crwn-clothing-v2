import { CART_ACTION_TYPES } from "./cart.types";

const INITIAL_STATE = {
  items: [],
  isOpen: false,
};

export const cartReducer = (state = INITIAL_STATE, action = {}) => {
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
        items: payload,
      };
    default:
      return state;
  }
};
