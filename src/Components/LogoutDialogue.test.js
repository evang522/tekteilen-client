import React from 'react';
import {mount,shallow} from 'enzyme';
import {LogoutDialogue} from './LogoutDialogue';

describe('<LogoutDialgoue/>', () => {
  it('Should render correctly on a smoke test', () => {
    shallow(<LogoutDialogue/>);
  })
});