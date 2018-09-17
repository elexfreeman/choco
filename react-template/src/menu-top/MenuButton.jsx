import React, {Component} from 'react';

class MenuButton extends Component {
  render() {
    return (<div className="dropdown dropdown-right">
      <div className="btn-group">
        <a href="#" className="btn dropdown-toggle btn-lg" tabindex="0">
          <i className="icon icon-menu"></i>
        </a>
        <ul className="menu">
          <li className="menu-item">
            <a href="#dropdowns">
              <div>
                <div className='menu-icon'>
                  <i className="fa fa-user-o" aria-hidden="true"></i>
                </div>
                <div className='menu-caption'>Личный кабинет</div>
              </div>
            </a>
            <a href="#dropdowns">
              <div>
                <div className='menu-icon'>
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                </div>
                <div className='menu-caption'>Корзина</div>
              </div>
            </a>
            <a href="#dropdowns">
              <div>
                <div className='menu-icon'>
                  <i className="fa fa-heart" aria-hidden="true"></i>
                </div>
                <div className='menu-caption'>
                  Мои желания</div>
              </div>
            </a>

          </li>
        </ul>
      </div>
    </div>)
  }
}
export default MenuButton;
