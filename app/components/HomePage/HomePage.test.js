import React from 'react';
import { shallow } from 'enzyme';

import Schedule from 'containers/Schedule';

import HomePage from './index';

describe('HomePage component', () => {
  it('should render a home page with clock, date display and schedule components', () => {
    const wrapper = shallow(
      <HomePage />
    );

    expect(wrapper.find('Clock')).toExist();
    expect(wrapper.find('DateDisplay')).toExist();
    expect(wrapper.find(Schedule)).toExist();
  });
});
