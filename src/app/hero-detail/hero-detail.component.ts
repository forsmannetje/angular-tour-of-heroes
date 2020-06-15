import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Hero } from '../models/hero.model';
import { HeroService } from '../services/hero/hero.service';

@Component({
    selector: 'my-hero-detail',
    templateUrl: './hero-detail.component.html'
})
export class HeroDetailComponent implements OnInit {
    @Input() hero: Hero;
    @Output() close = new EventEmitter();
    error: any;
    navigated = false; // true if navigated here

    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            if (params['id'] !== undefined) {
                const id = +params['id'];
                this.navigated = true;
                this.heroService.findHeroById(id).subscribe(hero => (this.hero = hero));
            } else {
                this.navigated = false;
                this.hero = new Hero();
            }
        });
    }

    save(): void {
        this.heroService.store(this.hero).subscribe(hero => {
            this.hero = hero; // saved hero, w/ id if new
            this.goBack(hero);
        }, error => (this.error = error)); // TODO: Display error message
    }

    goBack(savedHero: Hero = null): void {
        this.close.emit(savedHero);
        if (this.navigated) {
            window.history.back();
        }
    }
}
