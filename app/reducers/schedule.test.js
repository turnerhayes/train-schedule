import { fromJS } from 'immutable';
import sinon from 'sinon';
import * as immutableMatchers from 'jest-immutable-matchers';

import {
  updateSchedule,
} from 'actions';

import reducer from './schedule';

beforeAll(() => {
  jest.addMatchers(immutableMatchers);
});

function unixTimestamp(date) {
  return Math.floor(date.getTime() / 1000);
}

describe('schedule reducer', () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it('should handle an UPDATE_SCHEDULE action', () => {
    const now = new Date();

    const unixNow = unixTimestamp(now);

    const time1 = unixTimestamp(new Date('2018-04-26T06:30'));
    const time2 = unixTimestamp(new Date('2018-04-26T06:45'));

    const schedule = [
      {
        Timestamp: unixNow,
        Trip: '123',
        ScheduledTime: time1,
        Lateness: 0,
        Origin: 'Narnia',
        Destination: 'Neverland',
      },
      {
        Timestamp: unixNow,
        Trip: '234',
        ScheduledTime: time2,
        Lateness: 0,
        Origin: 'Narnia',
        Destination: 'Neverland',
      },
    ];

    const action = updateSchedule({ schedule });

    const state = reducer(undefined, action);

    expect(state.get('items')).toEqualImmutable(
      fromJS(schedule).map(
        (item) => item.set(
          'ScheduledTime',
          // Convert back from Unix timestamp to JS date
          new Date(item.get('ScheduledTime') * 1000)
        )
      )
    );

    expect(state.get('lastUpdated')).toEqual(now);
  });

  it('should not change items if the schedule is the same', () => {
    const now = new Date();

    const unixNow = unixTimestamp(now);

    const time1 = unixTimestamp(new Date('2018-04-26T06:30'));
    const time2 = unixTimestamp(new Date('2018-04-26T06:45'));

    const schedule = [
      {
        Timestamp: unixNow,
        Trip: '123',
        ScheduledTime: time1,
        Lateness: 0,
        Origin: 'Narnia',
        Destination: 'Neverland',
      },
      {
        Timestamp: unixNow,
        Trip: '234',
        ScheduledTime: time2,
        Lateness: 0,
        Origin: 'Narnia',
        Destination: 'Neverland',
      },
    ];

    const action = updateSchedule({ schedule });

    const state1 = reducer(undefined, action);

    const state2 = reducer(state1, action);

    expect(state2.get('items')).toBe(state1.get('items'));

    expect(state2.get('lastUpdated')).toEqual(now);
  });
});
