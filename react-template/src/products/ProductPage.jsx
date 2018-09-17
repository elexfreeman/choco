import React from 'react';

import MenuLeft from '../menu-left/MenuLeft';
import Bread from '../base/Bread';
import ProductImg from './ProductImg';
import ProductInfo from './ProductInfo';
import ProductDetails from './ProductDetails';



const ProductPage = ({caption, availability}) => {

  return (<div className="product-page">

    <div className="center-container-wrap-g">
      <div className="container grid-xl center-container">
        <Bread caption={caption}/>
        <div className="columns">
          <div className="col-menu-left column col-xs-12 col-sm-12 col-lg-4 col-xl-4 col-3">
            <MenuLeft/>
          </div>
          <div className="column col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-9">
            <div className="columns">
              <ProductImg img={'http://rouse.one/images/uploadimg/NggyDkAkrem_dlya_lica_ayva.jpg'}/>
              <ProductInfo caption={caption}  availability={availability}/>
              <ProductDetails />
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>)

}

export default ProductPage;
