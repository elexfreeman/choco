import React from 'react';
import CategoriesItem from "./CategoriesItem";

const Categories = () => {

    return (<div className='categories'>

        <div className="container">
            <div className="columns">
                <div className="column col-4 col-lg-6 col-md-6 col-sm-12">
                   <CategoriesItem />
                </div>
                <div className="column col-4 col-lg-6 col-md-6 col-sm-12">
                    <CategoriesItem />
                </div>
                <div className="column col-4 col-lg-6 col-md-6 col-sm-12">
                    <CategoriesItem />
                </div>
                <div className="column col-4 col-lg-6 col-md-6 col-sm-12">
                    <CategoriesItem />
                </div>
                <div className="column col-4 col-lg-6 col-md-6 col-sm-12">
                    <CategoriesItem />
                </div>
                <div className="column col-4 col-lg-6 col-md-6 col-sm-12">
                    <CategoriesItem />
                </div>
                <div className="column col-4 col-lg-6 col-md-6 col-sm-12">
                    <CategoriesItem />
                </div>


            </div>
        </div>



        </div>)
};

export default Categories;
