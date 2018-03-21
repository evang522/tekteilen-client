import React from 'react';
import {shallow,mount} from 'enzyme';
import Loader from './Loader';


describe('<Loader/>', () => {
  it('Should render correctly on a smoke test', () => {
    shallow(<Loader/>);
  })
});