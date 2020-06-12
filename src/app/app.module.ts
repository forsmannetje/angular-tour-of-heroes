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
import { CapitalizePipe } from './pipes/capitalize/capitalize.pipe';
import { MomentFormatPipe } from './pipes/moment-format/moment-format.pipe';
import { HeroService } from './services/hero/hero.service';
import { HeroesComponent } from './heroes/heroes.component';
import { InMemoryDataService } from './services/in-memory-data/in-memory-data.service';

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

        CapitalizePipe,
        MomentFormatPipe
    ],
    providers: [
        HeroService,

        CapitalizePipe,
        MomentFormatPipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
