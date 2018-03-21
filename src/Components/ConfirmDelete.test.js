import React from 'react';
import {shallow, mount} from 'enzyme';

import {ConfirmDelete} from './ConfirmDelete';


describe('<ConfirmDelete/>', () => {
  it('Should render correctly with a smoke test', () => {
    shallow(<ConfirmDelete/>);
  })
})