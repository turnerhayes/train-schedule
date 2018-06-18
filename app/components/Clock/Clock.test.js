import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Clock from './index';

describe('Clock component', () => {
  let clock;

  afterEach(() => {
    if (clock) {
      clock.restore();
    }
  });

  it('should show the current time', () => {
    const now = new Date('2018-06-17T03:20');

    sinon.useFakeTimers(now.getTime());

    const wrapper = shallow(
      <Clock />
    );

    expect(wrapper.find('span')).toHaveText('3:20 AM');
  });

  it('should update when the time changes', () => {
    const now = new Date('2018-06-17T21:59:59');

    clock = sinon.useFakeTimers(now.getTime());

    const wrapper = shallow(
      <Clock />
    );

    expect(wrapper.find('span')).toHaveText('9:59 PM');

    // Tick forward 1 second
    clock.tick(1000);

    wrapper.update();

    expect(wrapper.find('span')).toHaveText('10:00 PM');
  });

  it('should clear its interval handle on unmounting', () => {
    jest.spyOn(window, 'clearInterval');

    const wrapper = shallow(
      <Clock />
    );

    wrapper.unmount();

    expect(window.clearInterval).toHaveBeenCalled();
  });
});
