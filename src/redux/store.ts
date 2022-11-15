import { configureStore  } from '@reduxjs/toolkit';
import cardsSlice from './slices/cardsSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    cards: cardsSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;