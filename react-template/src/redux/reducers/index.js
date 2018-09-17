import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import cart from './cart';
import userInfoReducer from './userInfo';


export default combineReducers({
   // routing: routerReducer,
    cart, userInfoReducer
});
