import { Map, List, fromJS, is } from 'immutable';

import {
  UPDATE_SCHEDULE,
} from 'actions';

const initialState = Map({
  items: List(),
});

function prepareScheduleItems(items) {
  return fromJS(
    items.map(
      (item) => {
        const transformedItem = {
          ...item,
          // ScheduledTime is a Unix timestamp (seconds); convert
          // it to milliseconds (JS time value)
          ScheduledTime: new Date(item.ScheduledTime * 1000),
        };

        delete transformedItem.TimeStamp;

        return transformedItem;
      }
    )
  );
}

export default function scheduleReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SCHEDULE: {
      const items = prepareScheduleItems(action.payload.schedule);

      if (!is(items, state.get('items'))) {
        // eslint-disable-next-line no-param-reassign
        state = state.set('items', items);
      }

      return state.set('lastUpdated', new Date());
    }

    default: return state;
  }
}
