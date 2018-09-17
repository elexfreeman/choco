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
@Pipe({name: 'searchNight'})
export class SearchNightPipe implements PipeTransform {
    transform(input: number): string {
        let text: string;
        if (input === 1) {
            text = '1 ночь';
        }
        if (input === 2) {
            text = '2 ночи';
        }
        if (input === 3) {
            text = '2 ночи';
        }
        if (input === 4) {
            text = '3 ночи';
        }
        if (input > 4) {
            text = input + ' ночей';
        }
        return text;
    }
}