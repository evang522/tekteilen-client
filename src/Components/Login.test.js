import React from 'react';
import {mount,shallow} from 'enzyme';
import {Login} from './Login';


describe('<Login/>', () => {
  it('Should render correctly on a smoke test', () => {
    shallow(<Login/>)
  })
})