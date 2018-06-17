import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import { formatTime } from 'utils/datetime';

import 'styles/dotmatrix.css';

// Check once per minute
const CHECK_INTERVAL_IN_MILLISECONDS = 1000 * 60;

const STATUS_BACKGROUND_COLORS = {
  'All Aboard': 'orange',
  'Now Boarding': 'lightgreen',
  Delayed: 'red',
};

const cellStyles = `
  border: 1px solid black;
  text-align: center;
  padding: 0.2em 0.5em;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TableCell = styled.td`
  ${cellStyles}
`;

const TableHeaderCell = styled.th`
  ${cellStyles}
`;

const TableBody = styled.tbody`
  font-size: 1.3em;
  text-transform: uppercase;
`;

const TableBodyRow = styled.tr`
  background-color: ${(props) => STATUS_BACKGROUND_COLORS[props.status]}
`;

const LastUpdatedNotice = styled.figcaption`
  font-size: 0.7em;
`;

class Schedule extends React.PureComponent {
  static propTypes = {
    scheduleItems: ImmutablePropTypes.listOf(
      ImmutablePropTypes.map
    ),
    getSchedule: PropTypes.func.isRequired,
    lastUpdated: PropTypes.instanceOf(Date),
  }

  componentDidMount() {
    this.props.getSchedule();

    this.scheduleInterval = setInterval(
      () => this.props.getSchedule(),
      CHECK_INTERVAL_IN_MILLISECONDS
    );
  }

  componentWillUnmount() {
    if (this.scheduleInterval) {
      clearInterval(this.scheduleInterval);
    }
  }

  renderEmpty = () => (
    <div>No schedule found</div>
  )

  renderItems = () => this.props.scheduleItems.map(
    (item) => {
      // Clone time so that we don't modify the item's time object
      // if there's a Lateness to add
      const time = new Date(item.get('ScheduledTime'));

      if (item.get('Lateness')) {
        time.setSeconds(time.getSeconds() + item.get('Lateness'));
      }

      return (
        <TableBodyRow
          key={`${item.get('Trip')}-${item.get('Time')}`}
          status={item.get('Status')}
        >
          <TableCell
            key="Time"
          >
            {formatTime({ date: time })}
          </TableCell>
          <TableCell
            key="Origin"
          >
            {item.get('Origin')}
          </TableCell>
          <TableCell
            key="Destination"
          >
            {item.get('Destination')}
          </TableCell>
          <TableCell
            key="Train #"
          >
            {item.get('Trip')}
          </TableCell>
          <TableCell
            key="Track #"
          >
            {item.get('Track') || 'TBD'}
          </TableCell>
          <TableCell
            key="Status"
          >
            {item.get('Status')}
          </TableCell>
        </TableBodyRow>
      );
    }
  ).toArray()

  render() {
    if (!this.props.scheduleItems) {
      return null;
    }

    if (this.props.scheduleItems.isEmpty()) {
      return this.renderEmpty();
    }

    return (
      <div>
        <Table>
          <thead>
            <tr>
              <TableHeaderCell
                key="Time"
              >
                Time
              </TableHeaderCell>
              <TableHeaderCell
                key="Origin"
              >
                Origin
              </TableHeaderCell>
              <TableHeaderCell
                key="Destination"
              >
                Destination
              </TableHeaderCell>
              <TableHeaderCell
                key="Train #"
              >
                Train #
              </TableHeaderCell>
              <TableHeaderCell
                key="Track #"
              >
                Track #
              </TableHeaderCell>
              <TableHeaderCell
                key="Status"
              >
                Status
              </TableHeaderCell>
            </tr>
          </thead>
          <TableBody
            className="dotmatrix"
          >
            {this.renderItems()}
          </TableBody>
        </Table>
        <LastUpdatedNotice>
          Last updated: {formatTime({ date: this.props.lastUpdated })}
        </LastUpdatedNotice>
      </div>
    );
  }
}

export default Schedule;
