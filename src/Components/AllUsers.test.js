import React from 'react';
import {mount,shallow} from 'enzyme';
import {AllUsers} from './AllUsers';


describe('<AllUsers/>', () => {
  it('Should render correctly on a smoke test', () => {
    shallow(<AllUsers dispatch={jest.fn()}/>);
  })
})