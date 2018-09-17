import React from 'react';
import PriceFormatter from '../formatters/PriceFormater'

/*this.props.visible = 'active'*/
const CartSumma = ({products}) => {


    function Summa() {
        let res = 0;
        products.map((item)=> (res+=item.count*item.price));
        return res;
    }

    return (<div className='summa'>
        Итого: <PriceFormatter price={Summa()} /> руб.
    </div>)

};


export default CartSumma;
