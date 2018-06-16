import { connect } from 'react-redux';

import Schedule from 'components/Schedule';
import injectSaga from 'utils/injectSaga';
import {
  getSchedule,
} from 'actions';

import * as selectors from 'selectors';

import saga from './saga';

function mapStateToProps(state) {
  return {
    scheduleItems: selectors.getSchedule(state),
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
