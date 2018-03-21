import React from 'react';
import {shallow,mount} from 'enzyme';

import {Homepage} from './Homepage';

describe('<Homepage/>', () => {
  it('should render correctly on a smoke test', () => {
    shallow(<Homepage />);
  })
})