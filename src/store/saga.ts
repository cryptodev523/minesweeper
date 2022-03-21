import { PayloadAction } from '@reduxjs/toolkit';
import { EventChannel, eventChannel } from 'redux-saga';
import { fork, apply, call, put, take, takeLatest } from 'redux-saga/effects';

import { setMap, setStatus, setLoading } from '../stage/stageSlice';
import SocketClient from '../services';
import * as types from './types';

function createSocketChannel(socket: WebSocket) {
  return eventChannel((emit) => {
    const onMessage = (event: MessageEvent) => {
      emit(event.data);
    };

    const errorHandler = (errorEvent: Event) => {
      emit(new Error(errorEvent.type));
    };

    socket.addEventListener('message', onMessage);
    socket.addEventListener('error', errorHandler);

    const unsubscribe = () => {
      socket.removeEventListener('message', onMessage);
    };

    return unsubscribe;
  });
}

function* getMap(socket: WebSocket) {
  yield apply(socket, socket.send, ['map']);
}

function* connect() {
  const socket: WebSocket = yield call(SocketClient.connect);
  const socketChannel: EventChannel<unknown> = yield call(createSocketChannel, socket);

  return { socket, socketChannel };
}

function* watchGame() {
  const { socket, socketChannel } = yield call(connect);

  while (true) {
    try {
      const response: string = yield take(socketChannel);

      if (response.includes('new:')) {
        yield fork(getMap, socket);
        yield put(setStatus(response.replace('new: ', '')));
      }
      if (response.includes('map:')) {
        yield put(setMap(response.replace('map:', '')));
      }
      if (response.includes('open:')) {
        yield fork(getMap, socket);
        yield put(setStatus(response.replace('open: ', '')));
      }
    } catch (err) {
      socketChannel.close();
      throw new Error(`Websocket error: ${err}`);
    }
  }
}

function* newGame(action: PayloadAction<string>) {
  try {
    yield apply(SocketClient.socket, SocketClient.socket.send, [action.payload]);
    yield put(setLoading(true));
  } catch (err) {
    yield put(setLoading(false));
  }
}

export default function* watcher() {
  yield takeLatest(types.INITIALIZE_GAME, watchGame);
  yield takeLatest(types.START_GAME, newGame);
}
