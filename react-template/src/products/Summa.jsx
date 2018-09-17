import React from 'react';
import {connect} from 'react-redux';

const Summa = ({price, count}) => {

  return (<div className='price'>Итого: {price * count} руб.</div>)

}
export default Summa;
