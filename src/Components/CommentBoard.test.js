import React from 'react';
import {shallow,mount} from 'enzyme';
import {CommentBoard} from './CommentBoard';



describe('<CommentBoard/>', () => {
  it('Should render correctly on a smoke test', () => {
    shallow(<CommentBoard />);
  })
})