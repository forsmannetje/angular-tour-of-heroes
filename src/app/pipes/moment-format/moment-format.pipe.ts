import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'mf',
    pure: true
})
export class MomentFormatPipe implements PipeTransform {
    transform(value: any, ...args: any[]): string | undefined {
        const format = args[0];

        if (moment.isMoment(value)
            && value.isValid()
            && typeof format === 'string') {

            return value.format(format);
        }

        return undefined;
    }
}
