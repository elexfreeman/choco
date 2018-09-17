import React, {Component} from 'react';


// кнопка корзины в главном меню
class UserOrders extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.onChangeB = this.onChangeB.bind(this);

    }


    onChangeB(e) {
        this.setState({[e.target.name]: e.target.value})
    }


    render() {
        return (<div className='user-orders'>
            <div className='base-head'>Мои заказы</div>
            <div className="container orders-container">
                <a href='#'>
                    <div className="columns">
                        <div className="column col-1 col-md-12">№ <b>9928</b><br/>от 02.01.2018</div>
                        <div className="column col-5 col-md-12">
                            <figure className="avatar avatar-lg badge" data-badge="8" data-initial="YZ">
                                <img src="/img/chokok1.jpg" alt="YZ"/>
                            </figure>
                            <figure className="avatar avatar-lg badge" data-badge="8" data-initial="YZ">
                                <img src="/img/chokok1.jpg" alt="YZ"/>
                            </figure>
                            <figure className="avatar avatar-lg badge" data-badge="8" data-initial="YZ">
                                <img src="/img/chokok1.jpg" alt="YZ"/>
                            </figure>
                            <figure className="avatar avatar-lg badge" data-badge="8" data-initial="YZ">
                                <img src="/img/chokok1.jpg" alt="YZ"/>
                            </figure>
                        </div>
                        <div className="column col-2 col-md-12">
                            <span className="label label-primary">Ожидает оплаты</span>
                        </div>
                        <div className="column col-4 col-md-12 text-right summa">
                            12 000 руб <i className="icon icon-arrow-right"></i>
                        </div>
                    </div>
                </a>
                <hr/>
                <a href='#'>
                    <div className="columns">
                        <div className="column col-1 col-md-12">№ 9928<br/>от 02.01.2018</div>
                        <div className="column col-5 col-md-12">
                            <figure className="avatar avatar-lg badge" data-badge="8" data-initial="YZ">
                                <img src="/img/chokok1.jpg" alt="YZ"/>
                            </figure>
                            <figure className="avatar avatar-lg badge" data-badge="8" data-initial="YZ">
                                <img src="/img/chokok1.jpg" alt="YZ"/>
                            </figure>
                            <figure className="avatar avatar-lg badge" data-badge="8" data-initial="YZ">
                                <img src="/img/chokok1.jpg" alt="YZ"/>
                            </figure>
                            <figure className="avatar avatar-lg badge" data-badge="8" data-initial="YZ">
                                <img src="/img/chokok1.jpg" alt="YZ"/>
                            </figure>
                        </div>
                        <div className="column col-2 col-md-12">
                            <span className="label label-primary">Ожидает оплаты</span>
                        </div>
                        <div className="column col-4 col-md-12 text-right summa">
                            12 000 руб <i className="icon icon-arrow-right"></i>
                        </div>
                    </div>
                </a>
                <hr/>
                <a href='#'>
                    <div className="columns">
                        <div className="column col-1 col-md-12">№ 9928<br/>от 02.01.2018</div>
                        <div className="column col-5 col-md-12">
                            <figure className="avatar avatar-lg badge" data-badge="8" data-initial="YZ">
                                <img src="/img/chokok1.jpg" alt="YZ"/>
                            </figure>
                            <figure className="avatar avatar-lg badge" data-badge="8" data-initial="YZ">
                                <img src="/img/chokok1.jpg" alt="YZ"/>
                            </figure>
                            <figure className="avatar avatar-lg badge" data-badge="8" data-initial="YZ">
                                <img src="/img/chokok1.jpg" alt="YZ"/>
                            </figure>
                            <figure className="avatar avatar-lg badge" data-badge="8" data-initial="YZ">
                                <img src="/img/chokok1.jpg" alt="YZ"/>
                            </figure>
                        </div>
                        <div className="column col-2 col-md-12">
                            <span className="label label-primary">Ожидает оплаты</span>
                        </div>
                        <div className="column col-4 col-md-12 text-right summa">
                            12 000 руб <i className="icon icon-arrow-right"></i>
                        </div>
                    </div>
                </a>
            </div>
        </div>)
    }
}


export default UserOrders;
