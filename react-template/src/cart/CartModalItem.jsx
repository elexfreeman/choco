import React from 'react';
import {connect} from 'react-redux';

const CartModalItem = ({item, onDelete}) => {
//<td><button onClick={onDelete(item.productId)} className="btn"><i className="icon icon-delete"></i></button></td>
  return (<tr>
    <td><img className='product-img' src={'http://rouse.one/'+ item.main_img} /></td>
    <td className='product-caption'>{item.caption}</td>
    <td>{item.count} шт.</td>

  </tr>)

}
export default CartModalItem;
