import { all } from 'redux-saga/effects';
import sagaAuth from './auth/saga';
import sagaUser from './user/saga';

export default function* rootSaga() {
  return yield all([sagaAuth, sagaUser]);
}
