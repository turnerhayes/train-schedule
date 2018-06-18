import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import DateDisplay from './index';

describe('DateDisplay component', () => {
  let clock;

  afterEach(() => {
    if (clock) {
      clock.restore();

      clock = undefined;
    }
  });

  it('should show the current date', () => {
    const now = new Date('2018-06-17T15:20');

    sinon.useFakeTimers(now.getTime());

    const wrapper = shallow(
      <DateDisplay />
    );

    expect(wrapper.find('div > div').first()).toHaveText('Sunday');
    expect(wrapper.find('div > div').at(1)).toHaveText('6-17-2018');
  });

  it('should update when the date changes', () => {
    const now = new Date('2018-06-17T23:59:59');

    clock = sinon.useFakeTimers(now.getTime());

    const wrapper = shallow(
      <DateDisplay />
    );

    expect(wrapper.find('div > div').first()).toHaveText('Sunday');
    expect(wrapper.find('div > div').at(1)).toHaveText('6-17-2018');

    // Tick forward 1 second
    clock.tick(1000);

    wrapper.update();

    expect(wrapper.find('div > div').first()).toHaveText('Monday');
    expect(wrapper.find('div > div').at(1)).toHaveText('6-18-2018');
  });

  it('should clear its interval handle on unmounting', () => {
    jest.spyOn(window, 'clearInterval');

    const wrapper = shallow(
      <DateDisplay />
    );

    wrapper.unmount();

    expect(window.clearInterval).toHaveBeenCalled();
  });
});
