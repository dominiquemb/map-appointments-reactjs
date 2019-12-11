import React from 'react';
import { shallow } from 'enzyme';
import Form from './FormCard';

const fields = [
  {
    title: 'Test FormCard component',
    fields: [
      {
        id: 'field1',
        name: 'field1',
        label: 'Field 1',
        type: 'text',
        validateAs: 'string',
        defaultVal: '',
        required: true,
      },
      {
        id: 'field2',
        name: 'field2',
        label: 'Field 2',
        type: 'autocomplete',
        validateAs: 'number',
        defaultVal: '',
        required: true,
        customProps: {
          defaultOptions: [{ label: 'Dummy', value: 1 }],
          handleClear: () => {},
          clearPatient: false,
          loadOptions: () => [{ label: 'Dummy 2', value: 2 }],
          disabled: false,
        },
      },
      {
        id: 'field3',
        name: 'field3',
        label: 'Field 3',
        type: 'upload',
        validateAs: 'mixed',
        defaultVal: '',
        required: true,
      },
      {
        id: 'field4',
        name: 'field4',
        label: 'Field 4',
        type: 'select',
        placeholder: 'Select option',
        validateAs: 'number',
        defaultVal: '',
        required: true,
        customProps: {
          inputProps: {
            name: 'field4',
            id: 'field4',
          },
          data: [{ label: 'Dummy', value: 1 }],
        },
      },
    ],
  },
];

const props = {
  fields,
  onSubmit: () => {},
  columns: 2,
  spacing: 32,
};
describe('Testing Form', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<Form {...props} />);
  });

  test('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
