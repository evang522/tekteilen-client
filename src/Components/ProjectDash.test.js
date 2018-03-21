import React from 'react';
import {shallow} from 'enzyme';
import {ProjectDash} from './ProjectDash';


describe('<ProjectDash/>', () => {
  it('Should render successfully with a smoke test', () => {
    shallow(<ProjectDash dispatch={jest.fn()}/>);
  })
})