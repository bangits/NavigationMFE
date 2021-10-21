import { fork, takeLatest } from 'redux-saga/effects';
import { logoutActions, logoutTypes } from '../actions';

function* logOut(action: ReturnType<typeof logoutActions.loginRequest>) {}

function* watchLogOutRequest() {
  yield takeLatest(logoutTypes.LOG_OUT, logOut);
}

const logOutSagas = [fork(watchLogOutRequest)];

export default logOutSagas;
