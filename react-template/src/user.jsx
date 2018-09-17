/*личный кабинет с логином*/
import React from 'react';

import {render} from 'react-dom';
// redux
import {Provider} from 'react-redux';

import {BrowserRouter} from 'react-router-dom';

import store from './redux/store';


import './styles/main.scss';
import CartButton from "./cart/CartButton";
import {onGetCart} from './redux/actions/cart';
import {onUpdateUserData} from './redux/actions/userInfo';


import UserApp from './user/UserApp';

// Корзина
/*загружаем ее*/
store.dispatch(onGetCart());
store.dispatch(onUpdateUserData());


let user_container = document.getElementById('user_container');

render(
    <Provider store={store}>

            <UserApp/>

    </Provider>
    , user_container);


// кнопка корзины
render(
    <Provider store={store}>
        <CartButton/>
    </Provider>
    , document.getElementById('cart_button'));
