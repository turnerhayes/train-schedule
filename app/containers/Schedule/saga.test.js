/* eslint-disable redux-saga/yield-effects */

import { all, call, put, takeEvery } from 'redux-saga/effects';
import { getSchedule as getScheduleAPI } from 'api/schedule';

import {
  updateSchedule,
  GET_SCHEDULE,
} from 'actions';

import ScheduleSaga, {
  getScheduleSaga,
} from './saga';

describe('Schedule container', () => {
  describe('root saga', () => {
    it('should generate an all effect to watch for GET_SCHEDULE actions', () => {
      const gen = ScheduleSaga();

      const next = gen.next();

      expect(next.done).toBeFalsy();

      expect(next.value).toEqual(all([
        takeEvery(GET_SCHEDULE, expect.any(Function)),
      ]));
    });
  });

  describe('getScheduleSaga', () => {
    it('should pull schedule data via the API', () => {
      const gen = getScheduleSaga();

      let next = gen.next();

      expect(next.done).toBeFalsy();

      expect(next.value).toEqual(call(getScheduleAPI));

      next = gen.next([]);

      expect(next.done).toBeFalsy();

      expect(next.value).toEqual(put(updateSchedule({ schedule: [] })));

      next = gen.next();

      expect(next.done).toBeTruthy();
    });
  });
});
