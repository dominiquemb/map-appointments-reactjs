import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';


const props = {
  from: {},
  auth: { isLoggedIn: () => true, login: () => ({ token: '' }) },
};

describe('Testing LoginForm', () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = shallow(<LoginForm {...props} />);
  });

  test('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
