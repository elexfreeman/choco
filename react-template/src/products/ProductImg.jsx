import React from 'react';



const ProductImg = ({img}) => {

  return (  <div className="product-img column col-xs-12 col-sm-12 col-lg-4 col-xl-4 col-4">
      <img className='img-responsive' src={img}/>
    </div>)

}

export default ProductImg;
