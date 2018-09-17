import React from 'react';

const ProductItem = ({caption, columns}) => {
  let class_name = 'column col-sm-6 col-xs-6  col-md-6 col-lg-'+ columns+ ' col-'+ columns;
  return (<div className={class_name}>
    <div className='product'>
      <div className='p-badge'>Новый</div>
      <img className='img-responsive' src='http://rouse.one/images/uploadimg/NggyDkAkrem_dlya_lica_ayva.jpg'/>
      <div className='price'>2 000 руб.</div>
      <div className='caption'>{caption}</div>
      <div className='button-container'>
        <button className='btn btn-primary to_cart btn-lg'>
          <i className="fa fa-cart-plus" aria-hidden="true"></i>&nbsp; В корзину
        </button>
      </div>
    </div>
  </div>)

}

export default ProductItem;
