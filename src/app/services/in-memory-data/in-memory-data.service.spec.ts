import { InMemoryDataService } from './in-memory-data.service';

describe('InMemoryDbService', () => {
    it('returns a list of predefined heroes', () => {
        expect(new InMemoryDataService().createDb().heroes.find((hero) => hero.name === 'RubberMan')).toBeDefined();
    });
});
