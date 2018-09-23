import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

/*import ProductControler from './controlers/ProductControler';*/

import ProductOrder from './cart/ProductOrder';
import CartButton from './cart/CartButton';
import ProductOrderCategory from './cart/ProductOrderCategory';

import store from './redux/store';


import {onGetCart} from "./redux/actions/cart";
import ProductImg from "./product_img/ProductImg";

// Корзина
/*загружаем ее*/
store.dispatch(onGetCart());

// кнопка корзины
render(<Provider store={store}>
    <CartButton/>
</Provider>, document.getElementById('cart_button'));

// добавление товара в корзину
let product_order = document.getElementById('product_order');
render(<Provider store={store}>
    <ProductOrder productId={product_order.getAttribute('product_id')} price={product_order.getAttribute('price')}/>
</Provider>, product_order);


// список продуктов
let products = document.getElementsByClassName('product_order_category');

Array.prototype.forEach.call(products, (el) => {
    render(<Provider store={store}>
        <ProductOrderCategory productId={el.getAttribute('product_id')}/>
    </Provider>, el)
});

// добавление товара в корзину
let product_img = document.getElementById('product_img');
render(
    <div>
        <ProductImg
            caption={product_img.getAttribute('caption')}
            img={product_img.getAttribute('img')}
            main_img={product_img.getAttribute('main_img')}/>
    </div>
    , product_img);
