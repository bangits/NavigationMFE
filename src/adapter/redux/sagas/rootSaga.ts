import { all } from '@redux-saga/core/effects';
import authSagas from './logOut';

export default function* rootSaga() {
  yield all([...authSagas]);
}
