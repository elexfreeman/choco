import React from 'react';
import Slider from './Slider'

import MenuLeft from '../menu-left/MenuLeft';

import Offer from './Offer';

import BaseHead from '../base/BaseHead';
import Products from '../products/Products';
import BlogRows from '../blog/BlogRows';
import Footer from '../footer/Footer';

const MainPage = () => {

  return (<div className="main-page">
  <div className="center-container-wrap-g">
    <div className="container grid-xl center-container">
      <div className="columns">
        <div className="col-menu-left column col-xs-12 col-sm-12 col-lg-4 col-xl-4 col-3">
          <MenuLeft/>
        </div>
        <div className="column col-xs-12 col-md-12 col-sm-12 col-lg-8 col-xl-8 col-9">
          <Offer/>
          <BaseHead caption={'Новые поступления'}/>
          <Products columns={4}/>
        </div>
      </div>
    </div>
  </div>

  <div className='center-container-wrap-w'>
    <div className="container grid-xl center-container">
        <BaseHead caption={'Популярные среди женшин вашего города'}/>
      <div className="columns">
        <Products  columns={3}/>
      </div>
      <BlogRows />
      <Footer />
    </div>
  </div>

  </div>)
}

export default MainPage;
