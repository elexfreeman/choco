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
@Pipe({name: 'replaceImgUrl'})
export class replaceImgUrl implements PipeTransform {
    transform(input: string): string {
       input = input.replace(/\'/g, '"');
       return input.replace(/src="/g, 'src="https://kruiz.online');
    }
}