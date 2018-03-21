import React from 'react';
import {shallow} from 'enzyme';
import {Navbar} from './Navbar';


describe('<Navbar/>', () => {
  it('Should render successfully on a smoke test', () => {
    shallow(<Navbar/>);
  })
})