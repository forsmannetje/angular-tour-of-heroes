import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
    it('returns undefined for non strings', () => {
        expect(new CapitalizePipe().transform(false)).toBeUndefined();
        expect(new CapitalizePipe().transform(null)).toBeUndefined();
        expect(new CapitalizePipe().transform(10)).toBeUndefined();
    });

    it('capitalizes the first letter of a string', () => {
        expect(new CapitalizePipe().transform('foo')).toBe('Foo');
        expect(new CapitalizePipe().transform('bar')).toBe('Bar');
        expect(new CapitalizePipe().transform('the lazy fox')).toBe('The lazy fox');
    });

    it('lower cases the rest of the string', () => {
        expect(new CapitalizePipe().transform('MiXEd BaG')).toBe('Mixed bag');
        expect(new CapitalizePipe().transform('FOO BAR BAZ')).toBe('Foo bar baz');
        expect(new CapitalizePipe().transform('ComIt')).toBe('Comit');
    });
});
