import React from 'react';
import {shallow} from 'enzyme';
import {RegisterForm} from './RegisterForm';


describe('<RegisterForm/>', () => {
  it('Should render successfully with a smoke test', () => {
    shallow(<RegisterForm dispatch={jest.fn()}/>);
  })
})