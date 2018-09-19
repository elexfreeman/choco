import React from 'react';
import {Link} from "react-router-dom";

const UserOrderBread = ({}) => {


    return (<ul className="breadcrumb">
        <li className="breadcrumb-item">
            <a href="/">Главная</a>
        </li>
        <li className="breadcrumb-item">
            <Link className="active" aria-current="true" to="/">
                Личный кабинет
            </Link>
        </li>
        <li className="breadcrumb-item"><a>Заказ №333</a></li>
    </ul>)

};

export default UserOrderBread;
