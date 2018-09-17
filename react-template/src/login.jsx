import React from 'react';
import {render} from 'react-dom';
// redux
import {Provider} from 'react-redux';

import store from './redux/store';


import './styles/main.scss';


import CartButton from "./cart/CartButton";
import {onGetCart} from './redux/actions/cart';
import LoginComponent from "./login/LoginComponent";

// Корзина
/*загружаем ее*/
store.dispatch(onGetCart());


let login = document.getElementById('login');

render(
    <Provider store={store}>
       <LoginComponent/>
    </Provider>
    , login);


// кнопка корзины
render(<Provider store={store}>
    <CartButton/>
</Provider>, document.getElementById('cart_button'));
