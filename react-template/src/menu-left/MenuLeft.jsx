import React, {Component} from 'react';
import Head from './Head';
import BaseHead from '../base/BaseHead';
import SpecialProduct from './SpecialProduct';


class MenuLeft extends Component {
  render() {
    return (<div className='menu-left'>
        <Head />
        <div className='menu'>
          <div className='item'>
            Декоративная косметика
          </div>
          <div className='item'>
            Уход за волосами
          </div>
          <div className='item'>
            Уход за глазами
          </div>
          <div className='item'>
            Уход за губами
          </div>
        </div>
        <BaseHead caption={'Акции'}/>
        <SpecialProduct caption={'Крем для лица Айва 5мл'} oldPrice={200} newPrice={170} description={'Описание продукта Описание продукта Описание продукта Описание продукта'} />
        <SpecialProduct caption={'Крем для лица Айва 5мл'} oldPrice={200} newPrice={170} description={'Описание продукта'} />
        <SpecialProduct caption={'Крем для лица Айва 5мл'} oldPrice={200} newPrice={170} description={'Описание продукта'} />
        <SpecialProduct caption={'Крем для лица Айва 5мл'} oldPrice={200} newPrice={170} description={'Описание продукта'} />
    </div>)
  }
}
export default MenuLeft;
