import { isFSA } from 'flux-standard-action';

import {
  GET_SCHEDULE,
  getSchedule,
  UPDATE_SCHEDULE,
  updateSchedule,
} from './schedule';

describe('Schedule actions', () => {
  it('should return a GET_SCHEDULE action', () => {
    const action = getSchedule();

    expect(isFSA(action)).toBeTruthy();

    expect(action).toEqual({
      type: GET_SCHEDULE,
    });
  });

  it('should return a UPDATE_SCHEDULE action', () => {
    const action = updateSchedule({ schedule: [] });

    expect(isFSA(action)).toBeTruthy();

    expect(action).toEqual({
      type: UPDATE_SCHEDULE,
      payload: { schedule: [] },
    });
  });
});
