import React from 'react';
import Categories from "../categories/Categories";

const Manufacturer = () => {

    return (<div className="manufacturer">
        <div className='cover-container'>
            <div className="container">
                <div className="columns">
                    <div className="column col-3 col-md-12 col-sm-12">
                        <img className='m-logo' src='https://static.wixstatic.com/media/9d44ba_e51416c4af7048ae886d3e2c00ddcf03~mv2.jpg/v1/fill/w_135,h_128,al_c,q_80,usm_0.66_1.00_0.01/9d44ba_e51416c4af7048ae886d3e2c00ddcf03~mv2.webp' />
                    </div>
                    <div className="column col-6  col-md-12 col-sm-12">
                        <h1>Мастерская MARCH</h1>
                        <h2>магазин, в котором Вы можете заказать и купить ремесленный шоколад ручной работы в Самаре</h2>
                    </div>
                    <div className="column col-3 col-md-12 col-sm-12">
                        <div className='m-phone'><i className="fa fa-phone" aria-hidden="true"></i> +7 927 005 08 55</div>
                        <div className='m-address'>Самара. ул.Фрунзе, 110</div>
                    </div>
                </div>
            </div>
        </div>

       <Categories />

    </div>)
};

export default Manufacturer;
