import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Hero } from '../../models/hero.model';

@Injectable()
export class HeroService {
    private heroesUrl = 'app/heroes'; // URL to web api

    private static handleError(res: HttpErrorResponse | any) {
        const message: string = res.error || 'Server error';

        console.error(message);
        return throwError(message);
    }

    constructor(private http: HttpClient) {
    }

    getAllHeroes() {
        return this.http
            .get<Hero[]>(this.heroesUrl)
            .pipe(map(data => data), catchError(HeroService.handleError));
    }

    findHeroById(id: number): Observable<Hero> {
        return this.getAllHeroes().pipe(
            map(heroes => heroes.find(hero => hero.id === id))
        );
    }

    store(hero: Hero) {
        if (hero.id) {
            return this.update(hero);
        }
        return this.addNew(hero);
    }

    delete(hero: Hero) {
        const url = `${this.heroesUrl}/${hero.id}`;

        return this.http
            .delete<Hero>(url)
            .pipe(catchError(HeroService.handleError));
    }

    private addNew(hero: Hero) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this.http
            .post<Hero>(this.heroesUrl, hero, { headers })
            .pipe(catchError(HeroService.handleError));
    }

    private update(hero: Hero) {
        const url = `${this.heroesUrl}/${hero.id}`;
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this.http
            .put<Hero>(url, hero, { headers })
            .pipe(catchError(HeroService.handleError));
    }
}
