import { combineReducers } from "@reduxjs/toolkit";

import recados from "./recados/RecadosSlice";
import users from "./user/UserSlice";

export const rootReducer = combineReducers({
  recados,
  users,
});

// const initialState = appReducer({}, {})

// const rootReducer = (state, action) => {
//   if (action.type === 'LOG_OUT') {
//     state = initialState
//   }

//   return appReducer(state, action)
// }
