import React from 'react';
import { shallow } from 'enzyme';
import Autocomplete from './Autocomplete';

const defaultOptions = [
  {
    value: 1,
    label: 'Option 1',
  },
  {
    value: 2,
    label: 'Option 2',
  },
];

const moreOptions = [
  {
    value: 3,
    label: 'Option 3',
  },
  {
    value: 4,
    label: 'Option 4',
  },
];

const props = {
  classes: {},
  onChange: () => {},
  defaultOptions,
  loadOptions: () => moreOptions,
  handleClear: () => {},
  clearPatient: false,
  placeholder: 'Assigned to',
  disabled: false,
};

describe('Testing Autocomplete', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<Autocomplete {...props} />);
  });

  test('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
