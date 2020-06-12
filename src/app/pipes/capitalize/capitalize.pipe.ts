import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalize',
    pure: true
})
export class CapitalizePipe implements PipeTransform {
    transform(value: any): string | undefined {
        if (typeof value === 'string') {
            return value.substring(0, 1).toLocaleUpperCase() + value.substring(1).toLocaleLowerCase();
        }

        return undefined;
    }
}
