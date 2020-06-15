import { Component, OnInit } from '@angular/core';

import { Hero } from '../models/hero.model';
import { HeroService } from '../services/hero/hero.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];

    constructor(private heroService: HeroService) {
    }

    ngOnInit(): void {
        this.heroService.getAllHeroes()
            .subscribe(heroes => this.heroes = heroes.slice(1, 5));
    }
}
