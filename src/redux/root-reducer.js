import {combineReducers} from 'redux';
import urlReducer from './url/url.reducer'; 
import chainsReducer from './chains/chains.reducer';
export default combineReducers({
    url:urlReducer,
    chains:chainsReducer,
})