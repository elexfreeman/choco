import React from 'react';



const Bread = ({caption}) => {

  return (<ul className="breadcrumb">
    <li className="breadcrumb-item">
      <a href="/">Главная</a>
    </li>
    <li className="breadcrumb-item">
      <a>{caption}</a>
    </li>

  </ul>)

}

export default Bread;
