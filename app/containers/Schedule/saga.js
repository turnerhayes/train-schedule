import { all, takeEvery, put, call } from 'redux-saga/effects';

import {
  GET_SCHEDULE,
  updateSchedule,
} from 'actions';
import {
  getSchedule,
} from 'api/schedule';

function* getScheduleSaga() {
  const schedule = yield call(getSchedule);
  yield put(updateSchedule({ schedule }));
}

function* watchForGetSchedule() {
  yield takeEvery(GET_SCHEDULE, getScheduleSaga);
}

export default function* rootSaga() {
  yield all([
    call(watchForGetSchedule),
  ]);
}
