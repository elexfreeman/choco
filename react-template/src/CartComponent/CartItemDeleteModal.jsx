import React from 'react';


/*this.props.visible = 'active'*/
const CartItemDeleteModal = ({visible, onClose, item, onDelete}) => {

    return (<div>
        <div className={"modal " + visible}>
            <a onClick={onClose} className="modal-overlay" aria-label="Close"></a>
            <div className="modal-container">
                <div className="modal-header">
                    <a onClick={onClose} className="btn btn-clear float-right" aria-label="Close"></a>
                    <div className="modal-title h5">Удалить товар из корзины?</div>
                </div>
                <div className="modal-body">
                    <div className="content">
                        <table>
                            <thead>
                            <tr>
                                <th/>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <img className='product-img' src={'http://rouse.one/' + item.main_img}/>
                                </td>
                                <td>{item.caption}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-primary" onClick={onDelete}>Удалить</button>
                    <button className="btn btn-link" onClick={onClose}>Отмена</button>
                </div>
            </div>
        </div>
    </div>)


};


export default CartItemDeleteModal;
