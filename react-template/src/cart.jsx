import React from 'react';
import {render} from 'react-dom';
// redux
import {Provider} from 'react-redux';
import store from './redux/store';

import CartButton from "./cart/CartButton";
import {onGetCart} from './redux/actions/cart';
import UserCart from "./user/UserCart";
import {getUserInfo} from "./models/user_model";


// Корзина
/*загружаем ее*/
store.dispatch(onGetCart());



/*todo Проверка на регистрацию юзера*/
getUserInfo().then(user => {
    document.location.replace('/user/cart');
}).catch(e => {

    let cart_container = document.getElementById('cart_container');
    render(
        <Provider store={store}>
            <UserCart isLK={false}/>
        </Provider>
        , cart_container);


// кнопка корзины
    render(<Provider store={store}>
        <CartButton/>
    </Provider>, document.getElementById('cart_button'));

});
