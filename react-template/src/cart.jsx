import React from 'react';
import {render} from 'react-dom';
// redux
import {Provider} from 'react-redux';

import {BrowserRouter} from 'react-router-dom';

import store from './redux/store';


import './styles/main.scss';

import CartButton from "./cart/CartButton";
import {onGetCart} from './redux/actions/cart';
import UserCart from "./user/UserCart";


// Корзина
/*загружаем ее*/
store.dispatch(onGetCart());


let cart_container = document.getElementById('cart_container');

render(
    <Provider store={store}>
        <BrowserRouter>
            <UserCart/>
        </BrowserRouter>
    </Provider>
    , cart_container);


// кнопка корзины
render(<Provider store={store}>
    <CartButton/>
</Provider>, document.getElementById('cart_button'));
