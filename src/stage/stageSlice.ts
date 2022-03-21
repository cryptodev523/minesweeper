import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store/store';

interface BoardState {
  isLoading: boolean;
  map: string[];
  status: string;
}

const initialState: BoardState = {
  isLoading: false,
  map: [],
  status: '',
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setMap(state, action: PayloadAction<string>) {
      if (action.payload) {
        state.map = action.payload.split('\n').filter((row: string[] | string) => !!row.length);
      }
      state.isLoading = false;
    },
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
  },
});

const { setLoading, setMap, setStatus } = boardSlice.actions;

const selectSelf = (state: RootState) => state.board;
const isLoadingSelector = createSelector(selectSelf, (state: BoardState) => state.isLoading);
const mapSelector = createSelector(selectSelf, (state: BoardState) => state.map);
const statusSelector = createSelector(selectSelf, (state: BoardState) => state.status);

export { setLoading, setMap, setStatus, isLoadingSelector, mapSelector, statusSelector };
export default boardSlice.reducer;
