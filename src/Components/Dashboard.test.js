import React from 'react';
import {shallow,mount} from 'enzyme';
import {Dashboard} from './Dashboard';


describe('<Dashboard/>', () => {
  it('Should render correctly on a smoke test', () => {
    shallow(<Dashboard dispatch={jest.fn()} projects={['project1']} />);
  })
})