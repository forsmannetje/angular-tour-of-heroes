import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { HeroService } from './services/hero.service';
import { HeroesComponent } from './heroes/heroes.component';
import { InMemoryDataService } from './services/in-memory-data.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
            dataEncapsulation: false,
            delay: 300,
            passThruUnknownUrl: true
        })
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        HeroSearchComponent,
        HeroesComponent,
        HeroDetailComponent,
    ],
    providers: [HeroService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
