import React from 'react';

const CartModalItem = ({item, onDelete}) => {
  return (<tr>
    <td><img className='product-img' src={item.main_img} /></td>
    <td className='product-caption'>{item.caption}</td>
    <td>{item.count} шт.</td>

  </tr>)

}
export default CartModalItem;
