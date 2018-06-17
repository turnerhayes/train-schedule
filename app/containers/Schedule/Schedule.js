import { connect } from 'react-redux';

import Schedule from 'components/Schedule';
import injectSaga from 'utils/injectSaga';
import {
  getSchedule,
} from 'actions';

import * as selectors from 'selectors';

import saga from './saga';

function mapStateToProps(state) {
  let scheduleItems = selectors.getSchedule(state);
  let lastUpdated = selectors.getLastScheduleUpdate(state);

  if (scheduleItems) {
    scheduleItems = scheduleItems.sort(
      (a, b) => a.get('ScheduledTime') - b.get('ScheduledTime')
    );
  }

  return {
    scheduleItems,
    lastUpdated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSchedule() {
      dispatch(getSchedule());
    },
  };
}

export default injectSaga({
  key: 'Schedule',
  saga,
})(connect(mapStateToProps, mapDispatchToProps)(Schedule));
