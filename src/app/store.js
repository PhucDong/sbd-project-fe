import { configureStore } from '@reduxjs/toolkit';
import managementReducer from '../features/management/managementSlice';

export const store = configureStore({
  reducer: {
    management: managementReducer,
  },
});
