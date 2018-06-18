import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import sinon from 'sinon';

import { formatTime } from 'utils/datetime';

import Schedule from './index';

describe('Schedule component', () => {
  let clock;

  afterEach(() => {
    if (clock) {
      clock.restore();
    }
  });

  it('should render null when no schedule items are provided', () => {
    const wrapper = shallow(
      <Schedule
        getSchedule={() => {}}
      />
    );

    expect(wrapper).toBeEmptyRender();
  });

  it('should render a message when the schedule items are empty', () => {
    const scheduleItems = fromJS([]);

    const wrapper = shallow(
      <Schedule
        getSchedule={() => {}}
        scheduleItems={scheduleItems}
      />
    );

    expect(wrapper).toHaveText('No schedule found');
  });

  it('should render schedule table when there are schedule items', () => {
    const now = new Date();

    const scheduleItems = fromJS([
      {
        Timestamp: now,
        ScheduledTime: new Date('2018-06-16T15:43'),
        Trip: '123',
        Origin: 'Narnia',
        Destination: 'Neverland',
        Status: 'On Time',
      },
      {
        Timestamp: now,
        ScheduledTime: new Date('2018-06-16T16:00'),
        Trip: '456',
        Origin: 'Narnia',
        Destination: 'The Upside Down',
        Status: 'Delayed',
        Lateness: 300,
      },
      {
        Timestamp: now,
        ScheduledTime: new Date('2018-06-16T16:30'),
        Trip: '789',
        Origin: 'Narnia',
        Destination: 'The Matrix',
        Status: 'Boarding',
        Track: '4',
      },
    ]);

    const wrapper = shallow(
      <Schedule
        getSchedule={() => {}}
        scheduleItems={scheduleItems}
        lastUpdated={now}
      />
    );

    expect(wrapper.find('Schedule__TableHeaderCell')).toHaveLength(6);

    expect(wrapper.find('Schedule__TableHeaderCell').at(0).children())
      .toHaveText('Time');

    expect(wrapper.find('Schedule__TableHeaderCell').at(1).children())
      .toHaveText('Origin');

    expect(wrapper.find('Schedule__TableHeaderCell').at(2).children())
      .toHaveText('Destination');

    expect(wrapper.find('Schedule__TableHeaderCell').at(3).children())
      .toHaveText('Train #');

    expect(wrapper.find('Schedule__TableHeaderCell').at(4).children())
      .toHaveText('Track #');

    expect(wrapper.find('Schedule__TableHeaderCell').at(5).children())
      .toHaveText('Status');

    expect(wrapper.find('Schedule__TableBodyRow')).toHaveLength(scheduleItems.size);

    wrapper.find('Schedule__TableBodyRow').forEach(
      (row, index) => {
        expect(row.find('Schedule__TableCell')).toHaveLength(6);

        const item = scheduleItems.get(index);

        const date = new Date(item.get('ScheduledTime'));

        if (item.get('Lateness')) {
          date.setSeconds(date.getSeconds() + item.get('Lateness'));
        }

        expect(row.find('Schedule__TableCell').at(0).children()).toHaveText(
          formatTime({ date })
        );

        expect(row.find('Schedule__TableCell').at(1).children()).toHaveText(
          item.get('Origin')
        );

        expect(row.find('Schedule__TableCell').at(2).children()).toHaveText(
          item.get('Destination')
        );

        expect(row.find('Schedule__TableCell').at(3).children()).toHaveText(
          item.get('Trip')
        );

        expect(row.find('Schedule__TableCell').at(4).children()).toHaveText(
          item.get('Track') || 'TBD'
        );

        expect(row.find('Schedule__TableCell').at(5).children()).toHaveText(
          item.get('Status')
        );
      }
    );
  });

  it('should check for schedule on mounting', () => {
    const getSchedule = jest.fn();

    shallow(
      <Schedule
        getSchedule={getSchedule}
      />
    );

    expect(getSchedule).toHaveBeenCalled();
  });

  it('should check for schedule on an interval', () => {
    const getSchedule = jest.fn();

    clock = sinon.useFakeTimers();

    shallow(
      <Schedule
        getSchedule={getSchedule}
      />
    );

    expect(getSchedule).toHaveBeenCalledTimes(1);

    clock.tick((1000 * 60) + 1);

    expect(getSchedule).toHaveBeenCalledTimes(2);
  });

  it('should clear its interval handle on unmounting', () => {
    jest.spyOn(window, 'clearInterval');

    const wrapper = shallow(
      <Schedule
        getSchedule={() => {}}
      />
    );

    wrapper.unmount();

    expect(window.clearInterval).toHaveBeenCalled();
  });
});
