import { Map, List, fromJS } from 'immutable';
import moment from 'moment';

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
          ScheduledTime: moment.unix(item.ScheduledTime),
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
      return state.set('items', prepareScheduleItems(action.payload.schedule))
        .set('lastUpdated', new Date());
    }

    default: return state;
  }
}
