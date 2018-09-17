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
@Pipe({name: 'cautes'})
export class CautesPipe implements PipeTransform {
    transform(input: number): string {
        let text: string;
        if (input == 1) text = '1 каюта';
        if (input == 2) text = '2 каюты';
        if (input == 3) text = '3 каюты';
        if (input == 4) text = '4 каюты';
        if (input > 4) text = input + ' кают';
        return text;
    }
}