import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

const CHECK_INTERVAL_IN_MILLISECONDS = 1000 * 10000/*60*/;

const cellStyles = `
  border: 1px solid black;
  text-align: center;
  padding: 0.2em 0.5em;
`;

const Table = styled.table`
  border-collapse: collapse;
`;

const TableCell = styled.td`
  ${cellStyles}
`;

const TableHeaderCell = styled.th`
  ${cellStyles}
`;

class Schedule extends React.PureComponent {
  static propTypes = {
    scheduleItems: ImmutablePropTypes.listOf(
      ImmutablePropTypes.map
    ).isRequired,
    getSchedule: PropTypes.func.isRequired,
  }

  static defaultProps = {
    scheduleItems: List(),
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
    <tr>
      <TableCell
        colSpan={5}
      >
        No schedule found
      </TableCell>
    </tr>
  )

  renderItems = () => this.props.scheduleItems.map(
    (item, index) => (
      <tr
        key={index}
      >
        <TableCell
          key="Time"
        >
          {item.get('ScheduledTime').format('LT')}
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
      </tr>
    )
  ).toArray()

  render() {
    if (!this.props.scheduleItems) {
      return null;
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
          <tbody>
            {
              this.props.scheduleItems.isEmpty() ?
                this.renderEmpty() :
                this.renderItems()
            }
            <tr>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Schedule;
