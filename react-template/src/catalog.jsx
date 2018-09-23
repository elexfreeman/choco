import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import CartButton from './cart/CartButton';


import store from './redux/store';


import {onGetCart} from "./redux/actions/cart";
import Catalog from "./catalog/Catalog";
// Корзина
/*загружаем ее*/
store.dispatch(onGetCart());


render(<Provider store={store}>
      <CartButton />
</Provider>, document.getElementById('cart_button'));



render(<Provider store={store}>
      <Catalog />
</Provider>, document.getElementById('catalog'));


