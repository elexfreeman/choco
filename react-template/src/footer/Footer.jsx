import React from 'react';

import FooterLink from './FooterLink';

const Footer = () => {

  return (<div className='footer columns'>
    <div className="column col-3 col-xs-12 col-sm-12">
      <div className='head'>Информация</div>
      <FooterLink caption={'О нас'}/>
      <FooterLink caption={'Клиентский сервис'}/>
      <FooterLink caption={'Политика использования'}/>
      <FooterLink caption={'Карта сайта'}/>
      <FooterLink caption={'Заказы и возврат'}/>
      <FooterLink caption={'Свяжтесь с нами'}/>
      

    </div>
    <div className="column col-3 col-xs-12 col-sm-12">
      <div className='head'>Почему покупают у нас</div>
      <FooterLink caption={'Доставка и возврат'}/>
      <FooterLink caption={'Безопасность покупки'}/>
      <FooterLink caption={'Международная доставка'}/>
      <FooterLink caption={'Групповые покупки'}/>
    </div>
    <div className="column col-3 col-xs-12 col-sm-12">
      <div className='head'>Личный кабинет</div>
      <FooterLink caption={'Вход'}/>
      <FooterLink caption={'Корзина'}/>
      <FooterLink caption={'Мои желания'}/>
      <FooterLink caption={'Отслеживание доставки'}/>
      <FooterLink caption={'Помощь'}/>
    </div>
    <div className="column col-3 col-xs-12 col-sm-12">
      <div className='head'>Новости</div>
    </div>
  </div>)

}

export default Footer;
