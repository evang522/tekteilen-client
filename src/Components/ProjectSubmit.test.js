import React from 'react';
import {shallow} from 'enzyme';
import {ProjectSubmit} from './ProjectSubmit';


describe('<ProjectSubmit/>', () => {
  it('Should render successfully with a smoke test', () => {
    shallow(<ProjectSubmit/>);
  })
})