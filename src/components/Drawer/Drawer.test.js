import React from 'react';
import { shallow } from 'enzyme';
import Drawer from './Drawer';

const props = {
  mobileOpen: false,
  role: 'ROLE_PHARMACIST',
  toggleHandler: () => {},
};

describe('Testing Drawer', () => {
  const wrapper = shallow(<Drawer {...props} />);
  test('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
