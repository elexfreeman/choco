import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'searchDay'})
export class SearchDayPipe implements PipeTransform {
    transform(input: number): string {
        let text: string;
        if (input == 1) text = 'за 1 день - ';
        if (input == 2) text = '2 дня - ';
        if (input == 3) text = '3 дня - ';
        if (input == 4) text = '4 дня - ';
        if (input > 4) text = input + ' дней - ';
        return text;
    }
}