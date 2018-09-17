import React from 'react';
import ProductItem from './ProductItem';

const Products = ({columns}) => {

  return (<div className="columns products">

    <ProductItem columns={columns} caption={'Крем для лица Айва 5мл Крем для лица Айва 5мл'}/>
    <ProductItem columns={columns} caption={'Крем для лица Айва 5мл'}/>
    <ProductItem columns={columns} caption={'Крем для лица Айва 5мл'}/>
    <ProductItem columns={columns} caption={'Крем для лица Айва 5мл'}/>
    <ProductItem columns={columns} caption={'Крем для лица Айва 5мл'}/>
    <ProductItem columns={columns} caption={'Крем для лица Айва 5мл'}/>

  </div>)
}

export default Products;
