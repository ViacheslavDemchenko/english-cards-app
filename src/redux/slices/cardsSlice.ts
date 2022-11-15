import { createSlice } from '@reduxjs/toolkit';
import { getData } from '../../utils';

const initialState = {
  cards: getData(),
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {

  }
});

export default cardsSlice.reducer;