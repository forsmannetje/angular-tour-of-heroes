import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, PartialObserver, throwError } from 'rxjs';
import { Hero } from '../../models/hero.model';
import { HeroService } from './hero.service';
import SpyObj = jasmine.SpyObj;

describe('HeroService', () => {

    let heroService: HeroService;
    let httpClient: SpyObj<HttpClient>;

    // My preference
    // Simplest way to create services
    // Will give compiler error if HeroService is missing deps
    beforeEach(() => {
        httpClient = jasmine.createSpyObj<HttpClient>('HttpClient', ['get', 'post', 'put', 'delete']);
        heroService = new HeroService(httpClient);
    });

    // // Alternative 1, using TestBed with our own spy.
    // // Will give a runtime error if HeroService is not creatable by the injector because of unsatisfied deps
    // // Does not change the way tests are written
    // beforeEach(() => {
    //     TestBed.configureTestingModule({
    //         providers: [
    //             HeroService,
    //             {
    //                 provide: HttpClient,
    //                 useValue: jasmine.createSpyObj<HttpClient>('HttpClient', ['get', 'post', 'put', 'delete'])
    //             }
    //         ]
    //     });
    //
    //     heroService = TestBed.inject(HeroService);
    //     httpClient = TestBed.inject(HttpClient) as SpyObj<HttpClient>;
    // });

    // // Alternative 2 (more complex), using HttpTestingController
    // // Will give a runtime error if HeroService is not creatable by the injector because of unsatisfied deps
    // // Changes the way tests are written because we need to instrument the HttpTestingController
    // let httpMock: HttpTestingController;
    //
    // beforeEach(() => {
    //     TestBed.configureTestingModule({
    //         imports: [HttpClientTestingModule],
    //         providers: [HeroService]
    //     });
    //
    //     heroService = TestBed.inject(HeroService);
    //     httpMock = TestBed.inject(HttpTestingController);
    // });

    describe('getAllHeroes', () => {
        it('returns a list of heroes', (done: DoneFn) => {
            const expected: Hero[] = [];
            httpClient.get.and.returnValue(of(expected));

            heroService.getAllHeroes().subscribe(completingObserver(
                (next) => {
                    expect(httpClient.get).toHaveBeenCalledWith('app/heroes');
                    expect(next).toBe(expected);
                },
                done
            ));
        });

        describe('errors', () => {
            it('throws an exception with text Server Error', (done: DoneFn) => {
                httpClient.get.and.returnValue(throwError('Something went horribly wrong'));
                heroService.getAllHeroes().subscribe(errorObserver(
                    (error) => {
                        expect(httpClient.get).toHaveBeenCalledWith('app/heroes');
                        expect(error).toBe('Server error');
                    },
                    done
                ));
            });

            it('throws a specific error', (done: DoneFn) => {
                httpClient.get.and.returnValue(throwError({ error: '404 Not found' }));
                heroService.getAllHeroes().subscribe(errorObserver(
                    (error) => {
                        expect(httpClient.get).toHaveBeenCalledWith('app/heroes');
                        expect(error).toBe('404 Not found');
                    },
                    done
                ));
            });
        });
    });

    describe('findHeroById', () => {
        it('returns a hero', (done: DoneFn) => {
            const list: Hero[] = [
                {
                    id: 1,
                    name: 'Bombastic'
                }
            ];
            httpClient.get.and.returnValue(of(list));
            heroService.findHeroById(1).subscribe(completingObserver(
                (next) => {
                    expect(httpClient.get).toHaveBeenCalledWith('app/heroes');
                    expect(next).toBe(list[0]);
                },
                done
            ));
        });

        it('returns undefined', (done: DoneFn) => {
            const list: Hero[] = [
                {
                    id: 1,
                    name: 'Bombastic'
                }
            ];
            httpClient.get.and.returnValue(of(list));
            heroService.findHeroById(2).subscribe(completingObserver(
                (next) => {
                    expect(httpClient.get).toHaveBeenCalledWith('app/heroes');
                    expect(next).toBeUndefined();
                },
                done
            ));
        });

        describe('errors', () => {
            it('throws an exception with text Server Error', (done: DoneFn) => {
                httpClient.get.and.returnValue(throwError('Something went horribly wrong'));
                heroService.findHeroById(1).subscribe(errorObserver(
                    (error) => {
                        expect(httpClient.get).toHaveBeenCalledWith('app/heroes');
                        expect(error).toBe('Server error');
                    },
                    done
                ));
            });

            it('throws a specific error', (done: DoneFn) => {
                httpClient.get.and.returnValue(throwError({ error: '404 Not found' }));
                heroService.findHeroById(1).subscribe(errorObserver(
                    (error) => {
                        expect(httpClient.get).toHaveBeenCalledWith('app/heroes');
                        expect(error).toBe('404 Not found');
                    },
                    done
                ));
            });
        });
    });

    describe('store', () => {
        const storedHero: Hero = {
            id: 10,
            name: 'The amazing Someone'
        };

        describe('new', () => {
            const newHero: Hero = {
                id: 0, // Tricking the if statement
                name: 'The amazing Someone'
            };

            it('creates a new hero', (done: DoneFn) => {
                httpClient.post.and.returnValue(of(storedHero));
                heroService.store(newHero).subscribe(completingObserver(
                    () => {
                        expect(httpClient.post).toHaveBeenCalledWith(
                            'app/heroes',
                            newHero,
                            { headers: new HttpHeaders().set('Content-Type', 'application/json') }
                        );
                    },
                    done
                ));
            });

            describe('errors', () => {
                it('throws an exception with text Server Error', (done: DoneFn) => {
                    httpClient.post.and.returnValue(throwError('Something went horribly wrong'));
                    heroService.store(newHero).subscribe(errorObserver(
                        (error) => {
                            expect(httpClient.post).toHaveBeenCalledWith(
                                'app/heroes',
                                newHero,
                                { headers: new HttpHeaders().set('Content-Type', 'application/json') }
                            );
                            expect(error).toBe('Server error');
                        },
                        done
                    ));
                });

                it('throws a specific error', (done: DoneFn) => {
                    httpClient.post.and.returnValue(throwError({ error: '404 Not found' }));
                    heroService.store(newHero).subscribe(errorObserver(
                        (error) => {
                            expect(httpClient.post).toHaveBeenCalledWith(
                                'app/heroes',
                                newHero,
                                { headers: new HttpHeaders().set('Content-Type', 'application/json') }
                            );
                            expect(error).toBe('404 Not found');
                        },
                        done
                    ));
                });
            });
        });

        describe('update', () => {
            it('updates an existing hero', (done: DoneFn) => {
                httpClient.put.and.returnValue(of(storedHero));
                heroService.store(storedHero).subscribe(completingObserver(
                    () => {
                        expect(httpClient.put).toHaveBeenCalledWith(
                            'app/heroes/10',
                            storedHero,
                            { headers: new HttpHeaders().set('Content-Type', 'application/json') }
                        );
                    },
                    done
                ));
            });

            describe('errors', () => {
                it('throws an exception with text Server Error', (done: DoneFn) => {
                    httpClient.put.and.returnValue(throwError('Something went horribly wrong'));
                    heroService.store(storedHero).subscribe(errorObserver(
                        (error) => {
                            expect(httpClient.put).toHaveBeenCalledWith(
                                'app/heroes/10',
                                storedHero,
                                { headers: new HttpHeaders().set('Content-Type', 'application/json') }
                            );
                            expect(error).toBe('Server error');
                        },
                        done
                    ));
                });

                it('throws a specific error', (done: DoneFn) => {
                    httpClient.put.and.returnValue(throwError({ error: '404 Not found' }));
                    heroService.store(storedHero).subscribe(errorObserver(
                        (error) => {
                            expect(httpClient.put).toHaveBeenCalledWith(
                                'app/heroes/10',
                                storedHero,
                                { headers: new HttpHeaders().set('Content-Type', 'application/json') }
                            );
                            expect(error).toBe('404 Not found');
                        },
                        done
                    ));
                });
            });
        });
    });

    describe('delete', () => {
        const deletedHero: Hero = {
            id: 10,
            name: 'The amazing Someone'
        };

        it('deletes the hero', (done: DoneFn) => {
            httpClient.delete.and.returnValue(of(deletedHero));
            heroService.delete(deletedHero).subscribe(completingObserver(
                (next) => {
                    expect(httpClient.delete).toHaveBeenCalledWith('app/heroes/10');
                    expect(next).toBe(deletedHero);
                },
                done
            ));
        });

        describe('errors', () => {
            it('throws an exception with text Server Error', (done: DoneFn) => {
                httpClient.delete.and.returnValue(throwError('Something went horribly wrong'));
                heroService.delete(deletedHero).subscribe(errorObserver(
                    (error) => {
                        expect(httpClient.delete).toHaveBeenCalledWith('app/heroes/10');
                        expect(error).toBe('Server error');
                    },
                    done
                ));
            });

            it('throws a specific error', (done: DoneFn) => {
                httpClient.delete.and.returnValue(throwError({ error: '404 Not found' }));
                heroService.delete(deletedHero).subscribe(errorObserver(
                    (error) => {
                        expect(httpClient.delete).toHaveBeenCalledWith('app/heroes/10');
                        expect(error).toBe('404 Not found');
                    },
                    done
                ));
            });
        });
    });
});

function completingObserver<T>(nextFn: (next: T) => void, done: DoneFn): PartialObserver<T> {
    return {
        next: nextFn,
        complete: done,
        error: fail
    };
}

function errorObserver<T>(errorFn: (error: any) => void, done: DoneFn): PartialObserver<T> {
    return {
        complete: fail,
        error: (error) => {
            errorFn(error);
            done();
        }
    };
}
