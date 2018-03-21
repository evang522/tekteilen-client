import React from 'react';
import {shallow,mount} from 'enzyme';


import {Projects} from '../Components/Projects';


describe('<App/>', () => {
  it ('Should render without crashing on a smoke test', () => {
    shallow(<Projects dispatch={jest.fn()}/>);
  })
});

