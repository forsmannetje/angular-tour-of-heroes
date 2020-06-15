import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/hero.model';
import { HeroService } from '../services/hero/hero.service';

@Component({
    selector: 'my-heroes',
    templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {
    heroes: Hero[];
    selectedHero: Hero;
    addingHero = false;
    error: any;

    constructor(private heroService: HeroService) {
    }

    ngOnInit(): void {
        this.loadHeroes();
    }

    addHero(): void {
        this.addingHero = true;
        this.selectedHero = null;
    }

    close(savedHero: Hero): void {
        this.addingHero = false;
        if (savedHero) {
            this.loadHeroes();
        }
    }

    async deleteHero(hero: Hero, event: any): Promise<void> {
        event.stopPropagation();
        try {
            if (this.selectedHero === hero) {
                this.selectedHero = null;
            }
            await this.heroService.delete(hero).toPromise();
            this.loadHeroes();
        } catch (error) {
            this.error = error;
        }
    }

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
        this.addingHero = false;
    }

    private async loadHeroes(): Promise<void> {
        try {
            this.heroes = await this.heroService.getAllHeroes().toPromise();
        } catch (error) {
            this.error = error;
        }
    }
}
