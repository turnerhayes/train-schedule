import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import * as immutableMatchers from 'jest-immutable-matchers';

import createReducer from 'reducers';
import {
  updateSchedule,
  getSchedule,
} from 'actions';

import Schedule from './index';
const configuredMockStore = configureStore();

function mockStore(...args) {
  const store = configuredMockStore(...args);

  store.injectedReducers = {};
  store.injectedSagas = {};
  store.runSaga = () => {};

  return store;
}

beforeAll(() => {
  jest.addMatchers(immutableMatchers);
});

function unixTimestamp(date) {
  return Math.floor(date.getTime() / 1000);
}

describe('Schedule container', () => {
  it('should return the correct props', () => {
    const reducer = createReducer();

    const now = new Date();

    const scheduleItem1 = {
      Timestamp: unixTimestamp(now),
      ScheduledTime: unixTimestamp(new Date('2018-06-16T17:03')),
      Origin: 'Narnia',
      Destination: 'Neverland',
      Lateness: 0,
      Status: 'All Aboard',
    };

    const scheduleItem2 = {
      Timestamp: unixTimestamp(now),
      // Intentionally place the earlier one later to test sorting
      ScheduledTime: unixTimestamp(new Date('2018-06-16T15:03')),
      Origin: 'Narnia',
      Destination: 'Neverland',
      Lateness: 0,
      Status: 'All Aboard',
    };

    const schedule = [
      scheduleItem1,
      scheduleItem2,
    ];

    const action = updateSchedule({ schedule });

    const state = reducer(undefined, action);

    const store = mockStore(state);

    const wrapper = shallow(
      (
        <Schedule />
      ),
      {
        context: {
          store,
        },
      }
    );

    expect(wrapper.dive().prop('scheduleItems')).toEqualImmutable(
      fromJS([
        Object.assign(
          {},
          scheduleItem2,
          {
            // Convert it from a Unix timestamp
            ScheduledTime: new Date(scheduleItem2.ScheduledTime * 1000),
          }
        ),
        Object.assign(
          {},
          scheduleItem1,
          {
            // Convert it from a Unix timestamp
            ScheduledTime: new Date(scheduleItem1.ScheduledTime * 1000),
          }
        ),
      ])
    );
  });

  it('should dispatch a GET_SCHEDULE action when the getSchedule prop is called', () => {
    const reducer = createReducer();

    const action = updateSchedule({ schedule: [] });

    const state = reducer(undefined, action);

    const store = mockStore(state);

    jest.spyOn(store, 'dispatch');

    const wrapper = shallow(
      (
        <Schedule />
      ),
      {
        context: {
          store,
        },
      }
    );

    wrapper.dive().prop('getSchedule')();

    expect(store.dispatch).toHaveBeenCalledWith(getSchedule());
  });
});

