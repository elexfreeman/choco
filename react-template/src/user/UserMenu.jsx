import React from 'react';
import NavLink from "react-router-dom/es/NavLink";


const UserMenu = ({}) => {

    return ( <div className="col-menu-left column col-xs-12 col-sm-12 col-lg-4 col-xl-4 col-3">
        <div className='menu-left'>
            <div className='head'>Личный кабинет</div>
            <div className='menu'>
                <div className='item'>
                    <a href='/'>На главную</a>
                </div>
                <div className='item'>
                    <NavLink to='/'>Заказы</NavLink>
                </div>
                <div className='item'>
                    <NavLink to='/cart'>Корзина</NavLink>
                </div>
                <div className='item'>
                    <a onClick={()=>{
                        localStorage.removeItem('apiKey');
                        location.reload();
                    }}>Выход</a>
                </div>
            </div>
        </div>
    </div>)

}

export default UserMenu;
