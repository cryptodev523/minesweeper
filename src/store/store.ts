import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import boardSlice from '../stage/stageSlice';
import watcher from './saga';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: combineReducers({
    board: boardSlice,
  }),
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

sagaMiddleware.run(watcher);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
