import { all } from 'redux-saga/effects';
import { loginSagaWatcher } from './sagas/authSaga';

export function* rootSaga() {
  yield all([loginSagaWatcher()]);
}