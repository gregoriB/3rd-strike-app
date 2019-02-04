import { createStore, combineReducers } from 'redux';
import switchChar from './reducers/switchCharReducer';
import mapChars from './reducers/mapCharsReducer';

const store = createStore(combineReducers({mapChars, switchChar}), {});

export default store;