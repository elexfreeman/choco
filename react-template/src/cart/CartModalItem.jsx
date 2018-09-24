import React from 'react';
import {rest_server} from "../models/settings";
import {pricePipe} from "../base/pipes/price_pipe";

const CartModalItem = ({item, onDelete}) => {
    return (<tr>
        <td><img className='product-img'
                 src={rest_server + 'img/w128/' + item.main_img.split('/')[item.main_img.split('/').length - 1]}/></td>
        <td style={{width: '30%'}} className='product-caption'>{item.caption}</td>
        <td>{item.count} шт.</td>
        <td>{pricePipe(item.price)} руб.</td>
        <td>{pricePipe(item.price * item.count)} руб.</td>

    </tr>)

}
export default CartModalItem;
