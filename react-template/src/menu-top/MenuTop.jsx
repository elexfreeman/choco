import React, {Component} from 'react';

import SearchTop from './Search';
import MenuButton from './MenuButton';
import CartButton from './CartButton';


class MenuTop extends Component {
  render() {
    return (<header className="navbar">
      <div className="container grid-xl">
        <div className="columns">
          <div className="column col-xs-2 col-sm-3 col-md-3">
            <div className='logo'>
              <span>Rouse</span>.One
            </div>
          </div>

          <div className="column col-xs-1 col-sm-5 col-md-5 col-lg-8">
            <SearchTop/>
          </div>

          <div className="column col-xs-9 col-sm-4 col-md-4 col-lg-2 text-right">
            <span>
              <CartButton/>
            </span>

            <MenuButton/>
          </div>
        </div>
      </div>

    </header>);
  }
}

export default MenuTop;
