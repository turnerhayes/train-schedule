/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';

import scheduleReducer from './schedule';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@5
 *
 */

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer({
  history,
  injectedReducers,
} = {}) {
  return connectRouter(history)(combineReducers({
    schedule: scheduleReducer,
    ...injectedReducers,
  }));
}
