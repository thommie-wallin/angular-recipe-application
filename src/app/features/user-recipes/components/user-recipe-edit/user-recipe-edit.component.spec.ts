import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRecipeEditComponent } from './user-recipe-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('UserRecipeEditComponent', () => {
  let component: UserRecipeEditComponent;
  let fixture: ComponentFixture<UserRecipeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRecipeEditComponent, BrowserAnimationsModule],
      providers: [
        HttpClient,
        HttpHandler,
        provideRouter([]),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRecipeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
