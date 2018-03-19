import { compose, createStore, applyMiddleware, combineReducers } from "redux";
import {reducers} from './reducers';
import thunk from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  reducers,
  form:formReducer

})

export default createStore(rootReducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));