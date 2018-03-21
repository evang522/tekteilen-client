import React from 'react';
import {mount,shallow} from 'enzyme';
import {MembersList} from './MembersList';


describe('<MembersList/>', () => {
  it('Should render correctly on a smoketest', () => {
    shallow(<MembersList project={{volunteers: ['hello']}}/>);
  })
})