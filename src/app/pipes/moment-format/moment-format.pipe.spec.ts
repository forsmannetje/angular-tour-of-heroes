import { MomentFormatPipe } from './moment-format.pipe';
import * as moment from 'moment';

describe('MomentFormatPipe', () => {
    describe('returns undefined', () => {
        it('when input is not a moment', () => {
            expect(new MomentFormatPipe().transform('2020-06-05', 'dd-mm-yy')).toBeUndefined();
        });

        it('when input is not a valid moment', () => {
            expect(new MomentFormatPipe().transform(moment('bla'), 'dd-mm-yy')).toBeUndefined();
        });

        it('when format is not defined', () => {
            expect(new MomentFormatPipe().transform(moment(), undefined)).toBeUndefined();
        });
    });

    it('returns a formatted string', () => {
        expect(new MomentFormatPipe().transform(moment([2020, 5, 5]), 'DD-MM-yy')).toBe('05-06-2020');
        expect(new MomentFormatPipe().transform(moment([2020, 5, 5, 14, 51]), 'HH:mm')).toBe('14:51');
    });
});
