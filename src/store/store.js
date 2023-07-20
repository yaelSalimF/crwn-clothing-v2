import {
  compose,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

// how to write a custom middleware
// const loggerMiddleware = (store) => (next) => (action) => {
//   if (!action.type) {
//     return next(action);
//   }

//   console.log("type", action.type);
//   console.log("payload", action.payload);
//   console.log("currentState", store.getState());

//   next(action);

//   console.log("next state: ", store.getState());
// };

const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
