import React from 'react';
import {connect} from 'react-redux';


import CartComponentTable from "./CartComponentTable";
import CartSumma from "./CartSumma";
import DeliveryComponent from "./DeliveryComponent";
// кнопка корзины в главном меню
const CartComponent = ({cart}) => {


    return (<div>
        <div className='cart-component'>
            <div className='container'>
                <h4>Корзина</h4>
                <CartComponentTable products={cart}/>
                <CartSumma products={cart}/>
            </div>
        </div>
    </div>)

};

function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}


export default connect(mapStateToProps)(CartComponent);
