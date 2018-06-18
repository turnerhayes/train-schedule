import React from 'react';
import { shallow } from 'enzyme';

import App from './index';

describe('App container', () => {
  it('should render a HomePage component', () => {
    const wrapper = shallow(
      <App />
    );

    expect(wrapper.find('HomePage')).toExist();
  });
});
