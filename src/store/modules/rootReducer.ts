import { combineReducers } from '@reduxjs/toolkit';

import recados from './recados/RecadosSlice';

export const rootReducer = combineReducers({
  recados,
});