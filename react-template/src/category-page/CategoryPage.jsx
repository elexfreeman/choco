import React from 'react';

import MenuLeft from '../menu-left/MenuLeft';
import BaseHead from '../base/BaseHead';
import Products from '../products/Products';
import BlogRows from '../blog/BlogRows';
import Footer from '../footer/Footer';
import Bread from '../base/Bread';
import CategoryCover from "./CategoryCover";

const CategoryPage = () => {

    return (<div className="category-page">
        <div className="center-container-wrap-g">

            <div className="container grid-xl center-container">
                <Bread caption={'Декоративная косметика'}/>
                <div className="columns">
                    <div className="col-menu-left column col-xs-12 col-sm-12 col-lg-4 col-xl-4 col-3">
                        <MenuLeft/>
                    </div>
                    <div className="column col-xs-12 col-md-12 col-sm-12 col-lg-8 col-xl-8 col-9">
                        <CategoryCover/>
                        <Products columns={4}/>
                    </div>
                </div>
            </div>
        </div>

        <div className='center-container-wrap-w'>
            <div className="container grid-xl center-container">
                <BaseHead caption={'Популярные среди женшин вашего города'}/>
                <div className="columns">
                    <Products columns={3}/>
                </div>
                <BlogRows/>
                <Footer/>
            </div>
        </div>

    </div>)
}

export default CategoryPage;
