import React from 'react';
import {shallow,mount} from 'enzyme';
import {App} from '../App';



describe('<App/>', () => {
  it ('Should render without crashing on a smoke test', () => {
    shallow(<App dispatch={jest.fn()}/>);
  })
});

