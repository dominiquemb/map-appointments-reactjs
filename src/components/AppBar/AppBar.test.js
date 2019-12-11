import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import AppBar from './AppBar';


const props = {
  title: 'Welcome, John Doe',
  classes: {},
};

describe('Testing AppBar', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(
      <MemoryRouter keyLength={0}>
        <AppBar {...props} />
      </MemoryRouter>,
    );
  });

  test('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
