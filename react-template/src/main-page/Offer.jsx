import React from 'react';
import OfferItem from './OfferItem';

const Offer = ({}) => {

  return (<div className="columns offer">

    <OfferItem view={2} text1={'10% скидка'} text2={'Специальное предложение'} text3={'При покупке онлайн'}/>

    <OfferItem view={1} text1={'Бесплатная доставка'} text2={'при заказе от 1 000 руб'} text3={'предложение распространяется на все товары'}/>

  </div>)
}

export default Offer;
