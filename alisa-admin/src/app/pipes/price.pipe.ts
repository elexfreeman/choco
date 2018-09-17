import {Pipe, PipeTransform} from '@angular/core';

/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'price'})
export class PricePipe implements PipeTransform {
    transform(input_price): string {
        let price = Number.prototype.toFixed.call(parseFloat(input_price) || 0, 0);
        //заменяем точку на запятую
        let price_sep = price.replace(/(\D)/g, ",");
        //добавляем пробел как разделитель в целых
        price_sep = price_sep.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

        return price_sep;
    }
}