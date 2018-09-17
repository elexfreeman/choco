import React from 'react';
import NavLink from "react-router-dom/es/NavLink";


const UserBread = ({caption}) => {

    return (<ul className="breadcrumb">
        <li className="breadcrumb-item">
            <a href="/">Главная</a>
        </li>
        <li className="breadcrumb-item">
            <NavLink to={'/'}>Личный кабинет</NavLink>
        </li>
        <li className="breadcrumb-item">
            <a >{caption}</a>
        </li>

    </ul>)

}

export default UserBread;
