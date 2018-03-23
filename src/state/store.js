import { createStore, applyMiddleware, combineReducers } from "redux";
import {reducers} from './reducers';
import thunk from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import {reducer as toastrReducer} from 'react-redux-toastr';

const rootReducer = combineReducers({
  reducers,
  form:formReducer,
  toastr:toastrReducer

})

export default createStore(rootReducer, applyMiddleware(thunk));