import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRecipeCreateComponent } from './user-recipe-create.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserRecipeCreateComponent', () => {
  let component: UserRecipeCreateComponent;
  let fixture: ComponentFixture<UserRecipeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRecipeCreateComponent, BrowserAnimationsModule],
      providers: [
        HttpClient,
        HttpHandler,
        provideRouter([]),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRecipeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
