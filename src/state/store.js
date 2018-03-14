import { createStore, applyMiddleware, combineReducers } from "redux";
import {reducers} from './reducers';
import thunk from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  reducers,
  form:formReducer

})

export default createStore(rootReducer, applyMiddleware(thunk));