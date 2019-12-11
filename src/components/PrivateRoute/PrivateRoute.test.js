import React from 'react';
import { shallow } from 'enzyme';
import EditIcon from '@material-ui/icons/Edit';
import PrivateRoute from './PrivateRoute';


const props = {
  component: <EditIcon />,
  location: {},
  auth: { isLoggedIn: () => true },
};

describe('Testing PrivateRoute', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<PrivateRoute {...props} />);
  });

  test('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
