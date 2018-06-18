import { all, takeEvery, put, call } from 'redux-saga/effects';

import {
  GET_SCHEDULE,
  updateSchedule,
} from 'actions';
import {
  getSchedule,
} from 'api/schedule';

export function* getScheduleSaga() {
  const schedule = yield call(getSchedule);
  yield put(updateSchedule({ schedule }));
}

export default function* rootSaga() {
  yield all([
    takeEvery(GET_SCHEDULE, getScheduleSaga),
  ]);
}
