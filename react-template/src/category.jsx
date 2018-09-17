import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import CartButton from './cart/CartButton';
import ProductOrderCategory from './cart/ProductOrderCategory';

import store from './redux/store';

import './styles/main.scss';
import {onGetCart} from "./redux/actions/cart";
// Корзина
/*загружаем ее*/
store.dispatch(onGetCart());


render(<Provider store={store}>
      <CartButton />
</Provider>, document.getElementById('cart_button'));

// render(<Provider store={store}>
//   <div className='product-page'>
//     <div className='product-info container'>
//       <ProductOrder productId={5} price={200}/>
//       <ProductOrder productId={1} price={200}/>
//       <ProductOrder productId={2} price={200}/>
//     </div>
//   </div>
// </Provider>, document.getElementById('cart'));

let products = document.getElementsByClassName('product_order_category');
Array.prototype.forEach.call(products, (el) => {

  render(<Provider store={store}>
    <ProductOrderCategory productId={el.getAttribute('product_id')}/>
  </Provider>, el)
});
