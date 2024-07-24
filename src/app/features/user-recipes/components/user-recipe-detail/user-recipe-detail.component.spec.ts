import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRecipeDetailComponent } from './user-recipe-detail.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

describe('UserRecipeDetailComponent', () => {
  let component: UserRecipeDetailComponent;
  let fixture: ComponentFixture<UserRecipeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRecipeDetailComponent, BrowserAnimationsModule],
      providers: [
        HttpClient,
        HttpHandler,
        provideRouter([]),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
