import React from 'react';

const OfferItem = ({view, text1, text2, text3}) => {
  if (view == 1) {
    return (<div className="column col-lg-6 col-md-12 col-xs-12">
      <div className='offer-item'>
        <div className='text-1'>{text1}</div>
        <div className='text-2'>{text2}</div>
        <div className='text-3'>{text3}</div>
      </div>
    </div>)
  } else {
    return (<div className="column col-lg-6 col-md-12  col-xs-12">
      <div className='offer-item'>
        <div className='text-2'>{text2}</div>
        <div className='text-1'>{text1}</div>
        <div className='text-3'>{text3}</div>
      </div>
    </div>)
  }

}

export default OfferItem;
