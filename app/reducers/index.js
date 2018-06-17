/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';

import scheduleReducer from './schedule';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer({
  injectedReducers,
} = {}) {
  return combineReducers({
    schedule: scheduleReducer,
    ...injectedReducers,
  });
}
