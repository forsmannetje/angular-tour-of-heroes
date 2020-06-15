import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [RouterTestingModule]
        });

        fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
    });

    it('has a link to the dashboard', () => {
        const links = fixture.debugElement.queryAll(By.css('a'));
        const link = links.find((elem) => elem.attributes.href === '/dashboard');

        expect(link.nativeElement.textContent).toBe('Dashboard');
    });

    it('has a link to the heroes', () => {
        const links = fixture.debugElement.queryAll(By.css('a'));
        const link = links.find((elem) => elem.attributes.href === '/heroes');

        expect(link.nativeElement.textContent).toBe('Heroes');
    });
});
