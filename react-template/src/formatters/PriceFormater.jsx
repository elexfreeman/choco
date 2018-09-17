import React from 'react';
/*форматирует цену*/
const PriceFormatter = ({price}) => {

    function transform(input_price) {
        let price = Number.prototype.toFixed.call(parseFloat(input_price) || 0, 0);
        //заменяем точку на запятую
        let price_sep = price.replace(/(\D)/g, ",");
        //добавляем пробел как разделитель в целых
        price_sep = price_sep.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

        return price_sep;
    }
      return (<span>{transform(price)}</span>)


};


export default PriceFormatter;
